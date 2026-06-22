require("dotenv").config();
const express    = require("express");
const cors       = require("cors");
const mongoose   = require("mongoose");
const nodemailer = require("nodemailer");
const helmet     = require("helmet");
const rateLimit  = require("express-rate-limit");

const PORT         = process.env.PORT || 3001;
const MONGODB_URI  = process.env.MONGODB_URI;
const EMAIL_TO     = process.env.EMAIL_TO || "pahulassociates03@gmail.com";
const IS_DEV       = process.env.NODE_ENV !== "production";

const PROD_ORIGINS = [
  "https://pahulassociates.com",
  "https://www.pahulassociates.com",
  "https://pahul-associates.vercel.app",
];

// ── App Setup ──────────────────────────────────────────────────────────────
const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: "10kb" }));

// CORS — allow any localhost port in dev, whitelist only in prod
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // non-browser / curl
    if (IS_DEV && /^http:\/\/localhost(:\d+)?$/.test(origin)) return callback(null, true);
    if (PROD_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin '${origin}' not allowed`), false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Rate-limit only the inquiry endpoint
app.use("/api/inquiries", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please try again after 15 minutes." },
}));

// ── MongoDB (optional) ─────────────────────────────────────────────────────
let isMongoConnected = false;

const inquirySchema = new mongoose.Schema({
  fullName:          { type: String, required: true },
  email:             { type: String, required: true },
  phoneNumber:       { type: String, required: true },
  serviceOfInterest: String,
  projectBudget:     String,
  message:           { type: String, required: true },
  createdAt:         { type: Date,   default: Date.now },
});

const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => { isMongoConnected = true; console.log("✅ MongoDB connected"); })
    .catch((err) => console.warn("⚠️  MongoDB skipped:", err.message));
} else {
  console.log("ℹ️  No MONGODB_URI — running without DB.");
}

// ── Nodemailer ─────────────────────────────────────────────────────────────
let mailTransporter = null;

const SMTP_DEFAULTS = { connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 10000 };

(async () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (user && pass) {
    mailTransporter = nodemailer.createTransport({
      host:   process.env.EMAIL_HOST || "smtp.gmail.com",
      port:   parseInt(process.env.EMAIL_PORT || "587", 10),
      secure: process.env.EMAIL_SECURE === "true",
      auth:   { user, pass },
      ...SMTP_DEFAULTS,
    });
    console.log(`✅ Mailer ready (${process.env.EMAIL_HOST || "smtp.gmail.com"})`);
  } else {
    try {
      const test = await nodemailer.createTestAccount();
      mailTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email", port: 587, secure: false,
        auth: { user: test.user, pass: test.pass },
        ...SMTP_DEFAULTS,
      });
      console.log("✅ Ethereal test mailer ready (emails won't reach real inboxes)");
    } catch {
      console.warn("⚠️  No mailer configured — emails will be printed to console.");
    }
  }
})();

// ── Validation ─────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInquiry({ fullName, email, phoneNumber, message }) {
  const errors = {};
  if (!fullName?.trim() || fullName.trim().length < 3)
    errors.fullName = "Name must be at least 3 characters.";
  if (!email?.trim() || !EMAIL_RE.test(email.trim()))
    errors.email = "A valid email address is required.";
  const cleanPhone = (phoneNumber || "").replace(/[\s-]/g, "");
  if (!phoneNumber || cleanPhone.length < 10)
    errors.phoneNumber = "A valid phone number is required.";
  if (!message?.trim() || message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return { errors, cleanPhone };
}

// ── Email Builder ──────────────────────────────────────────────────────────
function buildMailOptions({ fullName, email, phoneNumber, serviceOfInterest, projectBudget, message }) {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const row = (label, value) =>
    `<tr>
      <td style="padding:8px 0;font-weight:bold;color:#555;width:35%">${label}</td>
      <td style="padding:8px 0;color:#222">${value}</td>
    </tr>`;

  return {
    from: process.env.EMAIL_USER
      ? `"Pahul Associates Web" <${process.env.EMAIL_USER}>`
      : '"Pahul Associates Web" <noreply@pahulassociates.com>',
    to: EMAIL_TO,
    subject: `New Inquiry — ${serviceOfInterest || "General"} — ${fullName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:8px">
        <h2 style="color:#1F3A5C;border-bottom:2px solid #C9A962;padding-bottom:10px;margin-top:0">New Client Inquiry</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:15px">
          ${row("Client Name:", fullName)}
          ${row("Email:", `<a href="mailto:${email}">${email}</a>`)}
          ${row("Phone:", `<a href="tel:${phoneNumber}">${phoneNumber}</a>`)}
          ${row("Service:", serviceOfInterest || "General Consultation")}
          ${row("Budget:", projectBudget || "Not Specified")}
          ${row("Submitted:", `${timestamp} (IST)`)}
        </table>
        <div style="margin-top:20px;padding:15px;background:#f9f9f9;border-left:4px solid #C9A962;border-radius:4px">
          <h4 style="margin:0 0 10px;color:#1F3A5C">Message:</h4>
          <p style="margin:0;color:#444;line-height:1.5;white-space:pre-wrap">${message}</p>
        </div>
        <hr style="border:0;border-top:1px solid #eee;margin:25px 0 15px"/>
        <p style="font-size:12px;color:#888;text-align:center;margin:0">
          Automated notification — please follow up within 24 hours.
        </p>
      </div>`,
  };
}

// ── Routes ─────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({
    status: "healthy",
    mongodbConnected: isMongoConnected,
    mailConfigured: !!mailTransporter,
  });
});

app.get("/api/test-email", async (_req, res) => {
  try {
    if (process.env.RESEND_API_KEY) {
      console.log("Testing Resend API...");
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Pahul Associates test <onboarding@resend.dev>",
          to: process.env.EMAIL_TO || "pahulassociates03@gmail.com",
          subject: "Render Backend Resend API Verification",
          html: "<p>Testing email dispatch from live Render environment via Resend API.</p>",
        }),
      });
      const resendData = await resendRes.json();
      if (resendRes.ok) {
        return res.json({ success: true, provider: "Resend", messageId: resendData.id });
      } else {
        return res.status(500).json({ success: false, provider: "Resend", error: resendData });
      }
    }

    if (!mailTransporter) {
      return res.status(500).json({ success: false, error: "Mailer not configured" });
    }
    const info = await mailTransporter.sendMail({
      from: process.env.EMAIL_USER
        ? `"Pahul Associates test" <${process.env.EMAIL_USER}>`
        : '"Pahul Associates test" <noreply@pahulassociates.com>',
      to: process.env.EMAIL_TO || "pahulassociates03@gmail.com",
      subject: "Render Backend SMTP Verification",
      text: "Testing email dispatch from live Render environment.",
    });
    res.json({ success: true, provider: "SMTP", messageId: info.messageId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, stack: err.stack });
  }
});

app.post("/api/inquiries", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, serviceOfInterest, projectBudget, message } = req.body;
    const { errors, cleanPhone } = validateInquiry({ fullName, email, phoneNumber, message });

    if (Object.keys(errors).length)
      return res.status(400).json({ success: false, error: "Validation failed", details: errors });

    // Save to DB (non-blocking on failure)
    let inquiryId = null;
    if (isMongoConnected) {
      try {
        const doc = await new Inquiry({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phoneNumber: cleanPhone,
          serviceOfInterest,
          projectBudget,
          message: message.trim(),
        }).save();
        inquiryId = doc._id;
        console.log("📝 Inquiry saved:", inquiryId);
      } catch (dbErr) {
        console.error("DB save failed (continuing):", dbErr.message);
      }
    }

    // Send email
    const mailOptions = buildMailOptions({ fullName, email, phoneNumber, serviceOfInterest, projectBudget, message });
    let emailSent = false;

    // Try Resend API first if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        console.log("Using Resend API to dispatch email...");
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Pahul Associates Web <onboarding@resend.dev>",
            to: EMAIL_TO,
            subject: mailOptions.subject,
            html: mailOptions.html,
          }),
        });

        const resendData = await resendRes.json();
        if (resendRes.ok) {
          console.log("📧 Email sent via Resend:", resendData.id);
          emailSent = true;
        } else {
          console.error("Resend API failed:", resendData);
        }
      } catch (resendErr) {
        console.error("Resend connection failed:", resendErr.message);
      }
    }

    // Fallback to Nodemailer SMTP/Ethereal if Resend wasn't used or failed
    if (!emailSent) {
      if (mailTransporter) {
        try {
          const info = await mailTransporter.sendMail(mailOptions);
          console.log("📧 Email sent via SMTP:", info.messageId);
          const previewUrl = nodemailer.getTestMessageUrl(info);
          if (previewUrl) console.log("🔗 Preview:", previewUrl);
        } catch (mailErr) {
          console.error("Email failed via SMTP:", mailErr.message);
          logEmail(mailOptions);
        }
      } else {
        logEmail(mailOptions);
      }
    }

    res.json({ success: true, message: "Inquiry submitted successfully", inquiryId });
  } catch (err) {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ── Helpers ────────────────────────────────────────────────────────────────
function logEmail({ to, subject, html }) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  console.log("\n══════════════════════════════════════════");
  console.log("📨 EMAIL (no SMTP — console fallback)");
  console.log(`TO:      ${to}`);
  console.log(`SUBJECT: ${subject}`);
  console.log("BODY:", text);
  console.log("══════════════════════════════════════════\n");
}

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀 Server running → http://localhost:${PORT}`));
