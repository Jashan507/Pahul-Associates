const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ── MongoDB Setup (Optional) ──
let isMongoConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB successfully");
      isMongoConnected = true;
    })
    .catch((err) => {
      console.warn("MongoDB connection failed. Continuing without database store:", err.message);
    });
} else {
  console.log("No MONGODB_URI specified. Continuing without database store.");
}

// Define Inquiry Schema if MongoDB is used
const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  serviceOfInterest: String,
  projectBudget: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);

// ── Nodemailer Setup ──
let mailTransporter;

const initMailTransporter = async () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.EMAIL_PORT || "587", 10);
  const secure = process.env.EMAIL_SECURE === "true";

  if (user && pass) {
    // Custom SMTP server configured
    mailTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
    console.log(`Mail transporter initialized using SMTP (${host}:${port})`);
  } else {
    // No credentials provided. Try creating a test Ethereal account, fallback to console log
    try {
      console.log("No email credentials found in .env. Attempting to create Ethereal test mailer...");
      const testAccount = await nodemailer.createTestAccount();
      mailTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log("Ethereal test mailer initialized successfully.");
      console.log("Test emails can be previewed at the URL provided in server logs upon submission.");
    } catch (err) {
      console.warn("Could not initialize Ethereal mailer. Emails will be logged to the console:", err.message);
      mailTransporter = null;
    }
  }
};

initMailTransporter();

// ── API Endpoints ──

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    mongodbConnected: isMongoConnected,
    mailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS) || !!mailTransporter,
  });
});

// Inquiry Submission
app.post("/api/inquiries", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, serviceOfInterest, projectBudget, message } = req.body;

    // ── Server-Side Validation ──
    const errors = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 3) {
      errors.fullName = "Name is required and must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "A valid email address is required.";
    }

    // Phone check (basic check: digits and length)
    const cleanPhone = (phoneNumber || "").replace(/[\s-]/g, "");
    if (!phoneNumber || cleanPhone.length < 10) {
      errors.phoneNumber = "A valid phone number is required.";
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message = "Message is required and must be at least 10 characters.";
    }

    // If validation fails, return 400
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }

    // ── Save to Database (if connected) ──
    let savedInquiry = null;
    if (isMongoConnected) {
      try {
        const newInquiry = new Inquiry({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phoneNumber: cleanPhone,
          serviceOfInterest,
          projectBudget,
          message: message.trim(),
        });
        savedInquiry = await newInquiry.save();
        console.log(`Inquiry stored in MongoDB: ${savedInquiry._id}`);
      } catch (dbErr) {
        console.error("Failed to save inquiry to database:", dbErr.message);
        // Do not fail the request if DB fails; we still want to try sending the email.
      }
    }

    // ── Send Email ──
    const emailTo = process.env.EMAIL_TO || "pahulassociates03@gmail.com";
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const mailOptions = {
      from: process.env.EMAIL_USER ? `"Pahul Associates Web" <${process.env.EMAIL_USER}>` : '"Pahul Associates Web" <noreply@pahulassociates.com>',
      to: emailTo,
      subject: `New Inquiry - ${serviceOfInterest || "General Consultation"} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #1F3A5C; border-bottom: 2px solid #C9A962; padding-bottom: 10px; margin-top: 0;">New Client Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 35%;">Client Name:</td>
              <td style="padding: 8px 0; color: #222;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email Address:</td>
              <td style="padding: 8px 0; color: #222;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone Number:</td>
              <td style="padding: 8px 0; color: #222;"><a href="tel:${phoneNumber}">${phoneNumber}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Service of Interest:</td>
              <td style="padding: 8px 0; color: #222;">${serviceOfInterest || "General Consultation"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Project Budget:</td>
              <td style="padding: 8px 0; color: #222;">${projectBudget || "Not Specified"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Submitted On:</td>
              <td style="padding: 8px 0; color: #222;">${timestamp} (IST)</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #C9A962; border-radius: 4px;">
            <h4 style="margin: 0 0 10px 0; color: #1F3A5C;">Client Message:</h4>
            <p style="margin: 0; color: #444; line-height: 1.5; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0 15px 0;" />
          <p style="font-size: 12px; color: #888; text-align: center; margin: 0;">
            This is an automated notification from the Pahul Associates Website. Please follow up with the client within 24 hours.
          </p>
        </div>
      `,
    };

    if (mailTransporter) {
      try {
        const info = await mailTransporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        
        // If Ethereal test email, log the preview URL
        if (nodemailer.getTestMessageUrl(info)) {
          console.log("Ethereal Preview URL:", nodemailer.getTestMessageUrl(info));
        }
      } catch (mailErr) {
        console.error("Nodemailer failed to send email:", mailErr.message);
        // Fallback to console log of email details
        logEmailToConsole(mailOptions);
      }
    } else {
      // Fallback console log if no mailTransporter is configured
      logEmailToConsole(mailOptions);
    }

    res.status(200).json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiryId: savedInquiry ? savedInquiry._id : null,
    });
  } catch (err) {
    console.error("Server error handling inquiry:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "An unexpected error occurred while processing your request.",
    });
  }
});

// Helper for logging email to console when no SMTP is configured
function logEmailToConsole(options) {
  console.log("\n==================================================");
  console.log("📨 EMAIL NOTIFICATION (MOCKED / NO SMTP CREDENTIALS)");
  console.log("--------------------------------------------------");
  console.log(`TO:      ${options.to}`);
  console.log(`SUBJECT: ${options.subject}`);
  console.log("BODY (TEXT CONTENT):");
  // Basic HTML tag stripping for clean console logging
  const text = options.html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  console.log(text);
  console.log("==================================================\n");
}

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
