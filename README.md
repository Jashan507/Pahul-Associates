# Pahul Associates \- Premium Architecture Website

## Development Build Guide

---

## 📁 Project Structure

pahul-associates-website/

├── frontend/                    \# React app

│   ├── public/

│   │   ├── index.html

│   │   └── favicon.ico

│   ├── src/

│   │   ├── components/         \# Reusable components

│   │   │   ├── Header.jsx

│   │   │   ├── Hero.jsx

│   │   │   ├── Services.jsx

│   │   │   ├── Portfolio.jsx

│   │   │   ├── ProcessSlider.jsx

│   │   │   ├── CostCalculator.jsx

│   │   │   ├── InquiryForm.jsx

│   │   │   ├── Footer.jsx

│   │   │   └── LogoAnimation.jsx

│   │   ├── pages/              \# Page layouts

│   │   │   └── Home.jsx

│   │   ├── styles/             \# Global & component styles

│   │   │   ├── globals.css

│   │   │   ├── animations.css

│   │   │   └── responsive.css

│   │   ├── assets/             \# Provided assets

│   │   │   ├── videos/

│   │   │   │   ├── logo-animation.mp4

│   │   │   │   └── home-background.mp4

│   │   │   ├── images/

│   │   │   │   ├── logo.png

│   │   │   ├── favicons/

│   │   │   └── fonts/

│   │   ├── data/               \# Configuration files

│   │   │   └── config.json     \# Pricing, services, projects

│   │   ├── hooks/              \# Custom React hooks

│   │   │   ├── useScroll.js

│   │   │   └── useForm.js

│   │   ├── utils/              \# Helper functions

│   │   │   ├── animations.js

│   │   │   ├── validation.js

│   │   │   └── api.js

│   │   ├── App.jsx

│   │   └── main.jsx

│   ├── package.json

│   ├── vite.config.js

│   └── .env.example

│

├── backend/                     \# Node.js \+ Express server

│   ├── routes/

│   │   ├── inquiries.js

│   │   └── costEstimate.js

│   ├── controllers/

│   │   ├── inquiryController.js

│   │   └── estimateController.js

│   ├── models/

│   │   ├── Inquiry.js

│   │   └── CostEstimate.js

│   ├── middleware/

│   │   ├── validation.js

│   │   ├── errorHandler.js

│   │   ├── cors.js

│   │   └── rateLimit.js

│   ├── services/

│   │   ├── emailService.js

│   │   └── whatsappService.js

│   ├── config/

│   │   └── database.js

│   ├── server.js

│   ├── package.json

│   └── .env.example

│

├── assets/                      \# Project assets (PROVIDED)

│   ├── videos/

│   │   ├── Generate\_Another\_for\_Website\_O.mp4    \# Logo animation

│   │   └── home-background.mp4                   \# (You'll add this)

│   ├── images/

│   │   ├── Pahul\_Associates\_Logo.png             \# Main logo

│   │   └── project-placeholders/                 \# Mock project images

│   └── docs/

│       └── PRD.md                                \# Full documentation

│

├── docs/                        \# Documentation

│   ├── API.md                   \# API endpoints reference

│   ├── DEPLOYMENT.md            \# Deployment guide

│   ├── TROUBLESHOOTING.md       \# Common issues & fixes

│   └── CONTENT\_UPDATE.md        \# How to update content

│

├── .github/

│   └── workflows/

│       └── deploy.yml           \# CI/CD pipeline

│

├── README.md                    \# This file

├── .gitignore

└── package.json                 \# Root package.json (monorepo setup)

---

## 🎨 Asset Files (Provided)

All assets are in `/assets` folder. Here's what you have:

### **1\. Logo Animation Video**

- **File:** `logo-animation.mp4 or logo-animation.webm`  
- **Duration:** 2-3 seconds  
- **Style:** Blueprint background with 3D building icon animation  
- **Usage:** Hero section logo animation (2-3 seconds play, then flies to header)  
- **Optimization:**  
  - Compress video for web (reduce to \~1-2MB)  
  - Use WebM format for better compression  
  - Provide fallback MP4

### **2\. Logo Image (Static)**

- **File:** `Pahul_Associates_Logo.png`  
- **Usage:** Header logo, footer, favicon  
- **Size:** Resize to 40px height for header, 80px for footer

### **3\. Home Background Video**

- **File:** `home-background.mp4`  
- **Usage:** Hero section background (30-40% opacity, looping)

### **4\. Project Mock Images**

- **Status:** AUTO-FETCH FROM INTERNET  
- **Source:** Unsplash/Pexels (FREE stock images)  
- **Size:** 400x300px (responsive in code)  
- **Format:** JPG/PNG (convert to WebP in code)  
- **Search Terms:**  
  - "Modern apartment design"  
  - "Interior design living room"  
  - "Commercial office space"  
  - "Luxury home renovation"  
  - "Architectural design"  
  - "3D rendering building"

---

## 🛠️ Technology Stack

### **Frontend**

React 18+ (Vite for fast build)

Framer Motion (animations)

Three.js (3D elements, optional)

TailwindCSS (styling)

React Hook Form (form management)

Axios (HTTP client)

### **Backend**

Node.js 18+

Express.js 4+

MongoDB (Atlas for managed database)

SendGrid (email service)

JWT (authentication, Phase 2\)

### **Development Tools**

Git & GitHub (version control)

VS Code (editor)

Vite (build tool)

PostCSS (CSS processing)

ESLint (code quality)

Prettier (code formatting)

### **Deployment**

Vercel (frontend hosting)

Railway / Render (backend hosting)

MongoDB Atlas (database)

SendGrid (email service)

---

## 📦 Setup

### **Step 1: Setup Frontend**

cd frontend

npm install

cp .env.example .env.local

**Update `.env.local`:**

VITE\_API\_URL=http://localhost:3001

VITE\_WHATSAPP\_NUMBER=918195888500

### **Step 2: Setup Backend**

cd ../backend

npm install

cp .env.example .env

**Update `.env`:**

NODE\_ENV=development

PORT=3001

MONGODB\_URI=mongodb+srv://username:password@cluster.mongodb.net/pahul-db

SENDGRID\_API\_KEY=SG.xxxxx

JWT\_SECRET=your-random-secret-key

CORS\_ORIGIN=http://localhost:5173

EMAIL\_FROM=noreply@pahulassociates.com

### **Step 3: Start Development Servers**

**Terminal 1 \- Frontend:**

cd frontend

npm run dev

\# Opens at http://localhost:5173

**Terminal 2 \- Backend:**

cd backend

npm run dev

\# Runs at http://localhost:3001

---

## 🎯 Build Strategy (Important\!)

### **Phase 1: Base Structure (Day 1-2)**

#### Step 1: HTML/CSS Foundation

\# Create basic HTML structure (all sections skeleton)

\# \- Header (sticky)

\# \- Hero section

\# \- Stats section

\# \- Services section

\# \- Portfolio section

\# \- Process section

\# \- Cost calculator section

\# \- Inquiry form

\# \- Footer

\# Create CSS for:

\# \- Color variables (Navy, Gold, White, Gray)

\# \- Typography (heading, body, small)

\# \- Spacing utilities (padding, margin)

\# \- Responsive breakpoints

\# \- Basic button styles

#### Step 2: Component Structure

// Create empty React components with basic JSX

\<Header /\>

\<Hero /\>

\<Stats /\>

\<Services /\>

\<Portfolio /\>

\<ProcessSlider /\>

\<CostCalculator /\>

\<InquiryForm /\>

\<Footer /\>

#### Step 3: Configure Data

// Update src/data/config.json with:

// \- Services list

// \- Pricing structure

// \- Mock projects (with Unsplash image URLs)

// \- Company details

// \- Process steps

---

### **Phase 2: Frontend Development** 

#### Step 1: Header & Navigation

- [ ] Sticky header with logo  
- [ ] Navigation links  
- [ ] Mobile hamburger menu  
- [ ] Smooth scroll on link click  
- [ ] Active state highlighting

#### Step 2: Hero Section

- [ ] Logo animation (use provided MP4)  
- [ ] Video background with opacity overlay  
- [ ] Text overlay ("Transform Your Vision Into Reality")  
- [ ] "Explore Our Work" CTA button  
- [ ] Scroll indicator arrow  
- [ ] Skip animation button

**Key Implementation:**

// Hero.jsx

import logoVideo from '../assets/videos/logo-animation.mp4';

import backgroundVideo from '../assets/videos/home-background.mp4';

// Use Framer Motion for animations

#### Step 3: Stats Section

- [ ] Animated counter (0 → final number)  
- [ ] 3 stat cards in row (responsive)  
- [ ] Trigger animation on scroll into view

#### Step 4: Services Section

- [ ] 8 service cards (grid layout)  
- [ ] Icons for each service  
- [ ] Card hover effects  
- [ ] "Get More Details" CTA button

#### Step 5: Portfolio Section

- [ ] 6 project cards (3 columns → responsive)  
- [ ] Lazy load images  
- [ ] Image overlay on hover  
- [ ] Mock images from Unsplash (auto-fetch URLs)

**Implementation:**

// Use Unsplash API or direct URLs

const mockProjects \= \[

  {

    id: 1,

    title: "Luxury Apartment",

    category: "Residential 3D",

    image: "https://images.unsplash.com/photo-...?w=400\&h=300"

  },

  // ... 5 more projects

\];

#### Step 6: Process Slider

- [ ] 4-step carousel/slider  
- [ ] Next/Previous buttons  
- [ ] Dot navigation  
- [ ] Mobile swipe support  
- [ ] Auto-scroll (optional)

#### Step 7: Cost Calculator

- [ ] Project type dropdown  
- [ ] Area input \+ slider (500-10,000 sq.ft)  
- [ ] Complexity buttons (Basic, Standard, Premium, Luxury)  
- [ ] Add-ons checkboxes  
- [ ] Timeline dropdown  
- [ ] Live cost calculation & display  
- [ ] Breakdown button

**Critical Calculation Logic:**

const calculateCost \= (projectType, area, complexity, addOns, timeline) \=\> {

  // Base cost

  const baseRate \= pricingRates\[projectType\];

  const baseCost \= area \* baseRate;

  

  // Apply complexity

  const complexityMultiplier \= 1 \+ complexityPercentage\[complexity\];

  const complexityCost \= baseCost \* complexityMultiplier;

  

  // Add-ons

  const addOnsCost \= addOns.reduce((sum, addon) \=\> sum \+ addon.price, 0);

  

  // Timeline adjustment

  const timelineMultiplier \= 1 \+ timelineAdjustment\[timeline\];

  

  // Final cost

  return (complexityCost \+ addOnsCost) \* timelineMultiplier;

};

#### Step 8: Inquiry Form

- [ ] 6 input fields with validation  
- [ ] Error message display  
- [ ] Success/loading state  
- [ ] Smooth scroll to form from CTA  
- [ ] WhatsApp button (sticky on mobile)

#### Step 9: Footer

- [ ] Contact details  
- [ ] Quick links  
- [ ] Social media icons  
- [ ] Copyright text

#### Step 10: Animations & Polish

- [ ] Smooth scroll transitions (page-by-page)  
- [ ] Fade-in effects on scroll  
- [ ] Staggered animations for cards  
- [ ] Button hover effects  
- [ ] Loading states  
- [ ] Empty states

---

### **Phase 3: Backend Development**

#### Step 1: Server Setup

\# Initialize Express server

npm init \-y

npm install express mongodb dotenv cors helmet nodemailer joi

\# Create server.js with basic routes

#### Step 2: Database Connection

- [ ] Connect to MongoDB Atlas  
- [ ] Create Inquiry schema  
- [ ] Create indexes for queries  
- [ ] Test connection

#### Step 3: API Endpoints

**POST /api/inquiries** (Form submission)

- [ ] Validate input (Joi)  
- [ ] Sanitize data  
- [ ] Save to MongoDB  
- [ ] Send confirmation email  
- [ ] Send admin notification  
- [ ] Return success response

**POST /api/cost-estimate** (Optional \- can be frontend only)

- [ ] Receive calculation request  
- [ ] Validate inputs  
- [ ] Calculate cost  
- [ ] Return breakdown

#### Step 4: Email Service

- [ ] Setup SendGrid API  
- [ ] Create email templates  
- [ ] Implement async email sending  
- [ ] Add retry logic  
- [ ] Log email events

#### Step 5: Security & Middleware

- [ ] CORS configuration  
- [ ] Rate limiting  
- [ ] Input validation  
- [ ] Error handling  
- [ ] Logging

#### Step 6: Testing

- [ ] Test form submission  
- [ ] Test email delivery  
- [ ] Test error handling  
- [ ] Test rate limiting

---

### **Phase 4: Integration & Testing** 

- [ ] Connect frontend to backend  
- [ ] Test form submission end-to-end  
- [ ] Test WhatsApp integration  
- [ ] Test email notifications  
- [ ] Test on mobile devices  
- [ ] Cross-browser testing  
- [ ] Performance testing (Lighthouse)  
- [ ] Accessibility testing (WAVE)

---

### **Phase 5: Deployment**

#### Frontend (Vercel)

\# Push to GitHub

git add .

git commit \-m "Production build"

git push origin main

\# Vercel auto-deploys on push

\# Visit: pahulassociates.com

#### Backend (Railway/Render)

- [ ] Create account on Railway or Render  
- [ ] Connect GitHub repository  
- [ ] Set environment variables  
- [ ] Deploy  
- [ ] Test live endpoints

#### Domain & SSL

- [ ] Setup custom domain  
- [ ] SSL certificate (auto with Vercel)  
- [ ] Email verification for SendGrid  
- [ ] WhatsApp number verification

---

## 💡 Apply UI/UX Pro Max Skills to Apply Already Installed 

---

## 🎬 Animation Implementation

### **Logo Animation (Hero)**

// Using Framer Motion

\<motion.div

  initial={{ opacity: 0 }}

  animate={{ opacity: 1 }}

  transition={{ duration: 3 }}

\>

  {/\* SVG lines animate \*/}

  {/\* 3D building icon materializes \*/}

  {/\* Text fades in with stagger \*/}

  {/\* Then scale down and reposition to header \*/}

\</motion.div\>

### **Scroll Animations**

import { useInView } from 'framer-motion';

// When section scrolls into view:

// \- Fade in (opacity 0 → 1\)

// \- Slide up (translateY 30px → 0\)

// \- Stagger children (0.1s delay each)

### **Button Hover Effects**

button:hover {

  transform: scale(1.05);

  box-shadow: 0 8px 24px rgba(0,0,0,0.15);

  transition: all 0.3s ease-in-out;

}

button:active {

  transform: scale(0.98);

}

---

## 📊 Content Configuration (config.json)

This is how you manage ALL dynamic content without touching code:

{

  "company": {

    "name": "Pahul Associates",

    "phone": "+91 8195888500",

    "email": "pahulassociates03@gmail.com",

    "location": "Mullanpur, Ludhiana \- 141101"

  },

  "pricing": {

    "residential2d": 35,

    "residential3d": 45,

    "commercial": 65,

    "mixedUse": 70

  },

  "addOns": \[

    { "name": "Floor Plans", "price": 15000 },

    { "name": "3D Models", "price": 25000 },

    { "name": "Walkthroughs", "price": 40000 },

    { "name": "Animations", "price": 50000 }

  \],

  "services": \[

    { "id": 1, "name": "Interior Design", "icon": "sofa" },

    { "id": 2, "name": "Exterior Design", "icon": "building" },

    // ... 6 more services

  \],

  "projects": \[

    {

      "id": 1,

      "title": "Luxury Apartment",

      "category": "Residential 3D",

      "image": "https://images.unsplash.com/..."

    },

    // ... 5 more projects

  \],

  "process": \[

    { "step": 1, "title": "Consultation", "description": "..." },

    // ... 3 more steps

  \]

}

**To Update Content:**

1. Edit `config.json`  
2. Commit and push to GitHub  
3. Website auto-updates (no code changes needed\!)

---

## 🔗 Using MCP's (Model Context Protocol)

## Design & Prototyping

* Create UI components in **Figma** (use Figma Developer MCP)  
* Define color palette, typography, spacing  
* Export design tokens

Frontend Structure

* Build HTML skeleton with semantic markup  
* Style with CSS/Tailwind  
* Integrate hero video \+ logo animation (from assets)  
* Use mock images (Unsplash, Pexels)

Frontend Interactivity

* Smooth scrolling navigation  
* Form validation  
* Mobile responsiveness  
* Animations/transitions

Backend Setup (Using Supabase MCP)

* Contact form submission endpoint  
* User inquiry database  
* Authentication (if needed)  
* Real-time email notifications

API Testing (Using Postman MCP)

* Test all endpoints  
* Document API responses  
* Create API documentation

---

## 🧪 Testing Checklist

### **Frontend Testing**

- [ ] Logo animation plays on page load  
- [ ] Hero video loops with opacity  
- [ ] Stats counter animates on scroll  
- [ ] Services cards are responsive  
- [ ] Portfolio images lazy load  
- [ ] Process slider works (desktop & mobile)  
- [ ] Cost calculator calculates correctly  
- [ ] Form validation works  
- [ ] Form submission sends data to backend  
- [ ] WhatsApp button opens chat  
- [ ] All links navigate correctly  
- [ ] Mobile responsive (375px, 768px, 1200px)  
- [ ] Accessibility: WAVE check passes  
- [ ] Performance: Lighthouse score \> 90

### **Backend Testing**

- [ ] Server starts without errors  
- [ ] Database connection works  
- [ ] POST /api/inquiries succeeds  
- [ ] Validation rejects invalid data  
- [ ] Email sends successfully  
- [ ] CORS allows frontend requests  
- [ ] Rate limiting works  
- [ ] Error handling shows proper messages  
- [ ] Logs are created properly

### **End-to-End Testing**

- [ ] User fills form → receives confirmation email  
- [ ] Admin receives notification email  
- [ ] Cost calculator shows correct result  
- [ ] WhatsApp opens with message  
- [ ] Website loads in \< 3 seconds  
- [ ] No console errors  
- [ ] No network errors

---

## 🚀 Deployment Checklist

### **Before Going Live**

- [ ] All tests pass  
- [ ] No console errors/warnings  
- [ ] No hardcoded secrets in code  
- [ ] Environment variables configured  
- [ ] Domain name ready  
- [ ] Email templates tested  
- [ ] SSL certificate ready  
- [ ] Monitoring setup (Sentry)  
- [ ] Backup strategy in place  
- [ ] Disaster recovery plan

### **Launch** 

1. Push to production branch  
2. Vercel auto-deploys frontend  
3. Railway/Render deploys backend  
4. Verify website loads  
5. Test form submission  
6. Monitor error logs (Sentry)  
7. Notify Harwinder Singh  
8. Monitor user inquiries

### **Post-Launch**

- [ ] Monitor error rates  
- [ ] Check email delivery  
- [ ] Monitor performance  
- [ ] Respond to inquiries  
- [ ] Collect user feedback  
- [ ] Plan Phase 2 features

---

## 📚 Important Files to Read

1. **PRD.md** \- Complete product requirements  
2. **docs/API.md** \- API endpoint reference  
3. **docs/DEPLOYMENT.md** \- Deployment guide  
4. **docs/CONTENT\_UPDATE.md** \- How to update content  
5. **docs/TROUBLESHOOTING.md** \- Common issues & fixes

---

## 🎓 Learning Resources

### **Frontend**

- React: [https://react.dev/learn](https://react.dev/learn)  
- Framer Motion: [https://www.framer.com/motion/](https://www.framer.com/motion/)  
- TailwindCSS: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)  
- Vite: [https://vitejs.dev/guide/](https://vitejs.dev/guide/)

### **Backend**

- Express.js: [https://expressjs.com/](https://expressjs.com/)  
- MongoDB: [https://www.mongodb.com/docs/](https://www.mongodb.com/docs/)  
- SendGrid: [https://sendgrid.com/docs/](https://sendgrid.com/docs/)

### **Deployment**

- Vercel: [https://vercel.com/docs](https://vercel.com/docs)  
- Railway: [https://docs.railway.app/](https://docs.railway.app/)  
- MongoDB Atlas: [https://docs.atlas.mongodb.com/](https://docs.atlas.mongodb.com/)

---

## 🆘 Common Issues & Solutions

### **Issue: Logo animation doesn't play**

**Solution:**

- Check video file path is correct  
- Verify MP4 format is supported  
- Check browser console for errors  
- Test in different browser

### **Issue: Form submission fails**

**Solution:**

- Check backend is running on port 3001  
- Verify CORS origin in .env  
- Check MongoDB connection  
- Look at server logs for errors

### **Issue: Emails not sending**

**Solution:**

- Verify SendGrid API key in .env  
- Check email addresses are correct  
- Verify sender email in templates  
- Check SendGrid activity log for bounces

### **Issue: Images not loading**

**Solution:**

- Check image URLs are valid (no 404\)  
- Use WebP format with fallback  
- Enable lazy loading  
- Compress images \< 100KB each

### **Issue: Mobile layout broken**

**Solution:**

- Test with Chrome DevTools (F12 → Device Mode)  
- Check breakpoints in CSS  
- Ensure font size ≥ 16px on inputs  
- Verify touch targets are 48px minimum

---

## 📞 Support & Questions

**For Issues During Development:**

1. Check TROUBLESHOOTING.md  
2. Review PRD.md for requirements  
3. Check console errors (F12)  
4. Check network tab for failed requests  
5. Review backend logs

**For Content Updates:**

1. Edit `src/data/config.json`  
2. Commit and push to GitHub  
3. Website auto-updates in \~1 minute

**For Design Changes:**

1. Update styles in component CSS files  
2. Test responsive (mobile/tablet/desktop)  
3. Check accessibility (WAVE tool)  
4. Commit and deploy

---

## ✅ Final Checklist Before Handoff

- [ ] Website live at custom domain  
- [ ] All features working  
- [ ] Mobile responsive  
- [ ] Emails sending  
- [ ] WhatsApp integration working  
- [ ] Cost calculator accurate  
- [ ] No console errors  
- [ ] Lighthouse score \> 90  
- [ ] Accessibility (WCAG AA) passed  
- [ ] Documentation complete  
- [ ] Backup system in place  
- [ ] Monitoring alerts configured  
- [ ] Team trained on content updates

---

## 📄 License & Credits

**Project:** Pahul Associates Website  
**Client:** Harwinder Singh  
**Developer:** Jashan  
**Year:** 2026

---

**For updates and changes, refer to PRD.md and other documentation files.**

**Happy coding\! 💻✨**  
