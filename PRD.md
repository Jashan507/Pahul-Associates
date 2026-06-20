# Product Requirements Document (PRD)

## Pahul Associates \- Premium Architecture & Design Website

---

## Table of Contents

1. [Executive Summary](#executive-summary)  
2. [Product Overview](#product-overview)  
3. [User Personas & Stories](#user-personas--stories)  
4. [Functional Requirements](#functional-requirements)  
5. [Frontend Design Specifications](#frontend-design-specifications)  
6. [Backend Requirements](#backend-requirements)  
7. [Database Schema](#database-schema)  
8. [API Specifications](#api-specifications)  
9. [Integration Requirements](#integration-requirements)  
10. [Performance & Security](#performance--security)  
11. [Deployment & Maintenance](#deployment--maintenance)  
12. [Success Metrics](#success-metrics)  
13. [Milestones](#timeline--milestones)

---

## Executive Summary

**Pahul Associates** is a premium architecture and interior design firm based in Mullanpur, Ludhiana with 25+ years of experience. This website serves as a **digital showcase** to attract high-value residential and commercial clients, facilitate project inquiries, and provide instant cost estimations.

**Primary Goals:**

- Present a premium, immersive brand experience  
- Enable real-time cost estimation for potential clients  
- Capture qualified leads through inquiry forms  
- Showcase portfolio of 250+ completed projects  
- Build trust through transparent pricing and client testimonials

**Target Users:**

- Residential clients seeking interior/exterior design  
- Commercial developers needing architectural planning  
- Architects and builders seeking consultations  
- Mobile-first users from Punjab, India region

**Key Success Metrics:**

- 50+ qualified inquiries/month  
- Average cost estimator completion rate: 60%+  
- Mobile traffic: 70%+ of total visits  
- Form submission rate: 8%+ of visitors  
- Page load time: \<2 seconds

---

## Product Overview

### Vision

Create a **bold, premium, immersive** architecture website that feels alive with 3D animations and motion interactions, reflecting the craftsmanship of Pahul Associates' projects.

### Scope

- **Website Type:** Single-page application (SPA) with smooth page-by-page transitions  
- **Platform:** Web (Desktop & Mobile)  
- **Browser Support:** Chrome, Firefox, Safari, Edge (latest 2 versions)  
- **Technology Stack:**  
  - Frontend: React 18+, Framer Motion (animations), Three.js (3D elements)  
  - Backend: Node.js \+ Express  
  - Database: MongoDB  
  - Hosting: Vercel (Frontend) \+ Railway/Render (Backend)  
  - Email: SendGrid / Nodemailer

### Core Features

1. **Animated Logo & Hero Section**  
2. **Live Cost Calculator**  
3. **Services Showcase**  
4. **Featured Projects Portfolio**  
5. **Process Slider**  
6. **Inquiry & Contact Forms**  
7. **WhatsApp Integration**  
8. **Admin Dashboard** (Optional Phase 2\)

---

## User Personas & Stories

### Persona 1: Residential Client (Rajesh, 35\)

**Goal:** Find an architect to design his 2000 sq.ft apartment  
**Behavior:**

- Browses on mobile (70% of time)  
- Wants to see examples of similar projects  
- Needs transparent pricing  
- Prefers WhatsApp communication  
- Makes decision based on portfolio quality and reviews

**Story:** "As a homeowner, I want to see project examples and get an instant cost estimate so I can decide if I can afford the design service."

---

### Persona 2: Commercial Developer (Priya, 42\)

**Goal:** Find architectural planning for a commercial complex  
**Behavior:**

- Desktop user, detailed research  
- Compares multiple firms  
- Needs to understand their process  
- Wants to speak with consultants directly  
- Values credentials and experience

**Story:** "As a developer, I want to understand the firm's process and see commercial projects so I can trust them with my complex project."

---

### Persona 3: Mobile Browser (Amit, 28\)

**Goal:** Quick check of pricing and services  
**Behavior:**

- Quick scrolls through website  
- Mobile-first experience essential  
- Expects smooth animations  
- Minimal form filling  
- Quick WhatsApp inquiry preferred

**Story:** "As a mobile user, I want a fast, smooth website experience where I can quickly get a cost estimate and send a message."

---

## Functional Requirements

### 1\. Hero Section with Logo Animation

**Requirement:** Display animated logo on page load

**Specifications:**

- **Duration:** 2-3 seconds  
- **Background:** Opaque overlay (70% opacity, light gray/white)  
- **Animation Style:** 3D blueprint aesthetic  
  - Lines draw themselves (gold color, geometric)  
  - Building icon materializes in 3D (navy \+ gold)  
  - Text appears with shadow/depth effect  
  - Blueprint grid background visible throughout  
- **Sequence:**  
  1. Full-screen logo animation plays  
  2. Logo scales down and flies to top-left header position  
  3. Opaque background fades to transparent  
  4. Hero content fades in (video background \+ CTA)  
  5. Navigation header becomes visible  
- **Skip Option:** User can click to skip animation (shows small "Skip" button bottom-right)  
- **Mobile:** Slightly faster animation (1.5-2 seconds), optimized for smaller screens

**User Actions:**

- Click anywhere: Skip to main page  
- Wait 2-3 seconds: Auto-proceed to main page  
- No animation loops (plays once per session)

---

### 2\. Header & Navigation

**Requirement:** Premium, sticky navigation bar

**Specifications:**

- **Position:** Sticky (fixed at top)  
- **Layout:**  
  - Left: Logo (scaled down from hero animation)  
  - Center: Navigation links (Desktop only)  
  - Right: WhatsApp button \+ CTA  
- **Navigation Links:**  
  - Home  
  - Services  
  - Portfolio  
  - Process  
  - Cost Estimate  
  - Contact  
- **Mobile Design:**  
  - Hamburger menu (3-line icon)  
  - Slide-out drawer navigation  
  - WhatsApp button remains sticky at bottom-right  
- **Scroll Behavior:**  
  - Shrinks on scroll down  
  - Expands on scroll up (smooth transition)  
  - Background color: Transparent → Light (0.95 opacity) on scroll  
- **Active State:** Highlight current section in nav

**Interactions:**

- Smooth 0.3s color/size transitions  
- Mobile drawer slides in from left  
- Click link → Scroll to section (smooth scroll)

---

### 3\. Hero Section (Main)

**Requirement:** Eye-catching landing section with video background

**Specifications:**

- **Background:**  
  - Video: House construction/architecture footage  
  - Duration: Looping video (10-20 seconds)  
  - Opacity: 30-40% (low opacity for text readability)  
  - Mobile: Static image fallback instead of video  
- **Content Overlay:**  
  - Headline: "Transform Your Vision Into Reality"  
  - Subheading: "25+ Years of Architectural Excellence"  
  - CTA Button: "Explore Our Work" (Gold color, hover effect)  
- **Layout:**  
  - Centered text  
  - Full viewport height (100vh)  
  - Responsive padding for mobile  
- **Animations:**  
  - Text fades in after logo animation ends  
  - Staggered animation: Headline → Subheading → CTA button (0.5s each)  
  - Button hover: Glow effect, slight scale up  
- **Scroll Indicator:** Animated arrow showing "scroll down" at bottom

**Interactions:**

- "Explore Our Work" button → Smooth scroll to Services/Portfolio  
- Scroll down → Proceed to next section

---

### 4\. Statistics Section

**Requirement:** Display firm's achievements and credibility

**Specifications:**

- **Section Layout:** 3 stat cards in a row (desktop), stacked (mobile)  
- **Stats Displayed:**  
  1. **25+** Years of Experience  
  2. **250+** Projects Completed  
  3. **99%** Client Satisfaction  
- **Card Design:**  
  - Background: Light (white) on desktop, slight shadow  
  - Icon: Animated counter from 0 → final number  
  - Duration: 1.5s counter animation  
  - Trigger: Animated when section scrolls into view  
- **Typography:**  
  - Large bold number (primary color: navy)  
  - Descriptive text (gray, smaller font)  
- **Spacing:** Equal padding, responsive margins  
- **Accessibility:** Semantic HTML, ARIA labels

**Animations:**

- Cards fade in on scroll (0.3s stagger)  
- Number counter animates from 0 to final value  
- Subtle scale effect on hover (desktop only)

---

### 5\. Services Section

**Requirement:** Showcase 8 architectural services with descriptions

**Specifications:**

- **Services Listed:**  
  1. Interior Design  
  2. Exterior Design  
  3. 3D Modeling  
  4. Blueprint Designing  
  5. 2D Elevation  
  6. Building Planning  
  7. Renovation & Restoration  
  8. Commercial Design  
- **Card Layout:**  
  - Grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)  
  - Card design: Light background, icon, title, brief description  
  - Icons: SVG or Font Awesome (relevant icons for each service)  
- **Card Content:**  
  - Icon (60x60px)  
  - Service name (bold, navy color)  
  - Brief description (2-3 lines, gray text)  
  - "Learn More" link (gold color, underline on hover)  
- **CTA:**  
  - Large "Get More Details" button below all cards  
  - Action: Opens inquiry form with service type pre-selected  
- **Hover Effects:**  
  - Card: Subtle shadow increase, slight scale (1.02)  
  - Background: Slight color change (light gold tint)  
  - Duration: 0.3s smooth transition

**Animations:**

- Cards slide in from bottom on scroll (staggered 0.1s each)  
- Icons have subtle rotation animation on hover  
- "Learn More" link has underline animation

**Mobile Consideration:**

- Reduced icon size (40x40px)  
- Larger touch target (minimum 44x44px per accessibility)  
- Single column layout  
- CTA button full-width

---

### 6\. Featured Projects Section

**Requirement:** Showcase 6 completed projects with portfolio images

**Specifications:**

- **Project Grid:** 3 columns (desktop), 2 columns (tablet), 1 column (mobile)  
- **Project Card Contents:**  
  - **Image:** Architectural project image (400x300px desktop, responsive)  
  - **Overlay (on hover):**  
    - Subtle dark overlay (30% opacity)  
    - Project title (gold color)  
    - Category badge (e.g., "Residential 3D", "Commercial")  
    - "View Details" link (white text, gold underline)  
  - **Lazy Loading:** Images load as user scrolls  
- **Image Format:** WebP with JPG fallback  
- **Placeholders:** Skeleton loaders while images load  
- **Images:**  
  - Sourced from Unsplash/Pexels (architectural projects)  
  - Mock project names (e.g., "Luxury Apartment \- 2000 sq.ft", "Modern Office Complex")  
  - Easily updateable in JSON config

**Interactions:**

- Click card → Opens project detail modal or lightbox gallery  
- Hover: Overlay appears, text fades in  
- "View Details" → Shows full project details (optional for Phase 1\)

**Animations:**

- Cards fade in on scroll (staggered 0.1s)  
- Overlay fades in smoothly on hover (0.3s)  
- Image zoom slight effect on hover (1.05 scale)

**Responsive:**

- Mobile: Full-width cards, single column  
- Tablet: 2 columns  
- Desktop: 3 columns

---

### 7\. Our Process Section (Slider)

**Requirement:** Display 4-step project process interactively

**Specifications:**

- **Steps:**  
  1. **Consultation** \- Understanding your vision and requirements  
  2. **Design Development** \- Creating detailed designs and plans  
  3. **Approvals & Planning** \- Getting approvals and finalizing details  
  4. **Execution & Handover** \- Building and final project delivery  
- **Display Style:** Horizontal slider/carousel (desktop), scrollable (mobile)  
- **Step Card Contents:**  
  - Step number (large, gold, top-left)  
  - Title (bold, navy)  
  - Description (gray, 2-3 sentences)  
  - Timeline estimate (e.g., "2-4 weeks")  
  - Icon (relevant SVG)  
- **Navigation:**  
  - Desktop: Previous/Next buttons on sides  
  - Mobile: Swipe left/right OR dots at bottom for navigation  
  - Dots: Show active step (gold), inactive steps (light gray)  
- **Auto-Scroll:** Optional auto-advance every 5 seconds (can be paused on hover)  
- **Trigger Animation:** Slides animate when section scrolls into view

**Animations:**

- Slide transitions: Smooth 0.5s slide effect  
- Card fade-in: 0.3s opacity transition  
- Active indicator: Animated underline on step title  
- Counter animation (if showing timeline as steps)

**Mobile Consideration:**

- Full-width cards  
- Touch-friendly navigation (larger dots)  
- Swipe detection for smooth sliding  
- Simplified design (larger text, less info per card)

---

### 8\. Cost Estimation Section

**Requirement:** Interactive calculator for instant project cost estimation

**Specifications:**

#### 8.1 Calculator Structure

**Step 1: Project Type Selection**

- Dropdown menu: "Select Project Type"  
- Options:  
  - Residential 2D (₹35/sq.ft)  
  - Residential 3D (₹45/sq.ft)  
  - Commercial (₹65/sq.ft)  
  - Mixed-Use (₹70/sq.ft)  
- Default: Residential 3D  
- Change triggers update of price display

**Step 2: Area Input**

- Input field: "Area (sq.ft)"  
- Range slider: 500 \- 10,000 sq.ft (draggable)  
- Display: Input field shows current value in orange  
- Linked: Slider and input field sync bidirectionally  
- Validation: Prevent values \< 500 or \> 10,000

**Step 3: Design Complexity**

- 4 button options (Radio buttons or Tab style):  
  - Basic: \+0% (gray, unselected)  
  - Standard: \+15% (gold border, default selected)  
  - Premium: \+35% (gold border)  
  - Luxury: \+60% (gold border)  
- Visual feedback: Selected button has gold background, others are light  
- Hover effect: Slight scale, box-shadow

**Step 4: Additional Add-ons (Checkboxes)**

- Multiple selection allowed:  
  - ☐ Floor Plans (+₹15,000)  
  - ☐ 3D Models (+₹25,000)  
  - ☐ Walkthroughs (+₹40,000)  
  - ☐ Animations (+₹50,000)  
- Each checked → updates total cost in real-time  
- Unchecked checkbox removes price

**Step 5: Timeline Selection**

- Dropdown: "Select Timeline"  
- Options:  
  - 1 week (Express) → \+10% cost  
  - 2 weeks (Standard) → Normal price (default)  
  - 3+ weeks (Budget) → \-5% cost  
- Shows cost impact inline  
- Default: 2 weeks

**Cost Calculation Logic:**

Base Cost \= Area (sq.ft) × Rate per sq.ft

Complexity Cost \= Base Cost × (1 \+ Complexity Multiplier)

Add-ons Cost \= Sum of selected add-on prices

Timeline Multiplier \= 1 \+ Timeline Adjustment

Final Cost \= (Complexity Cost \+ Add-ons Cost) × Timeline Multiplier

**Example Calculation:**

Project Type: Residential 3D (₹45/sq.ft)

Area: 2000 sq.ft

Complexity: Standard (+15%)

Add-ons: Floor Plans (₹15k) \+ 3D Models (₹25k) \= ₹40k

Timeline: 2 weeks (no adjustment)

Base \= 2000 × 45 \= ₹90,000

With Complexity \= 90,000 × 1.15 \= ₹103,500

With Add-ons \= 103,500 \+ 40,000 \= ₹143,500

Final \= ₹143,500 × 1 \= ₹143,500

#### 8.2 Display & UI

**Result Display:**

- Box: Dark navy background with rounded corners  
- Title: "ESTIMATED PROJECT COST" (small gray text)  
- Amount: Large gold text (₹143,500)  
- Disclaimer: Small gray italic text: "\*This is an approximate estimate. Final cost may vary based on specific requirements and site complexity."  
- Breakdown button: "View Breakdown" (optional, shows itemized list)

**Live Update:**

- All calculations happen in real-time (no delay)  
- Result updates instantly as user changes any option  
- Smooth number transition animation (0.3s)

**Mobile Layout:**

- Single column, full-width inputs  
- Dropdown menus optimized for mobile (larger tap targets)  
- Result box adjusts to screen width with padding  
- Input field font: 16px minimum (prevents auto-zoom on iOS)

**Sticky Behavior (Mobile):**

- On mobile, cost result section becomes sticky when scrolled past  
- Remains visible at bottom with "Continue" CTA

#### 8.3 Interactions & Validations

**Input Validation:**

- Area field: Accept only numbers 500-10,000  
- Show error: "Please enter an area between 500-10,000 sq.ft"  
- Prevent non-numeric input  
- Validate on blur or real-time

**Disabled States:**

- If no project type selected: Show "Select a project type to get started"  
- All inputs disabled until project type selected  
- Re-enable on selection

**Error Messages:**

- Display inline, near affected field  
- Color: Red (\#E63946)  
- Font: Small (12px), italic

**Reset Option:**

- "Reset Calculator" button (small, at bottom)  
- Clears all inputs to defaults  
- Resets to Residential 3D, 2000 sq.ft, Standard, 2 weeks

**Accessibility:**

- Labels for all inputs (associated with tags)  
- ARIA labels for radio groups and checkboxes  
- Keyboard navigation: Tab through all elements  
- Screen reader compatible: Announce cost updates  
- Focus states: Clear 2px gold border on focus

#### 8.4 CTA Button

**Location:** Below cost result **Button Text:** "Get Detailed Consultation" **Action:** Scroll down to inquiry form OR open modal inquiry form **Style:**

- Full-width on mobile  
- Gold background (\#C9A962), navy text  
- Hover: Darker gold, slight scale (1.05)  
- Padding: 15px 40px

---

### 9\. Inquiry Form Section

**Requirement:** Capture lead information and send WhatsApp/Email

**Specifications:**

#### 9.1 Form Fields

**Form Layout:**

- 2-column layout (desktop), single column (mobile)  
- All fields except message: 1 column each  
- Message: Full-width, 2-column span

**Fields:**

1. **Full Name** (Required)  
     
   - Placeholder: "Your full name"  
   - Validation: Min 3 characters, max 50  
   - Type: Text input

   

2. **Email Address** (Required)  
     
   - Placeholder: "[your.email@example.com](mailto:your.email@example.com)"  
   - Validation: Valid email format  
   - Type: Email input

   

3. **Phone Number** (Required)  
     
   - Placeholder: "+91 9876543210"  
   - Validation: 10 digits for Indian numbers, starts with \+91  
   - Type: Tel input  
   - Formatting: Auto-format as user types

   

4. **Service of Interest** (Optional)  
     
   - Dropdown with options:  
     - Select a service...  
     - Interior Design  
     - Exterior Design  
     - 3D Modeling  
     - Blueprint Designing  
     - 2D Elevation  
     - Building Planning  
     - Renovation & Restoration  
     - Commercial Design  
     - Other  
   - Pre-populated if coming from "Get More Details" in Services section

   

5. **Project Budget** (Optional)  
     
   - Dropdown:  
     - Select budget range...  
     - Below ₹50,000  
     - ₹50,000 \- ₹1,00,000  
     - ₹1,00,000 \- ₹3,00,000  
     - ₹3,00,000 \- ₹10,00,000  
     - Above ₹10,00,000

   

6. **Message** (Required)  
     
   - Placeholder: "Tell us about your project..."  
   - Min: 10 characters, Max: 500 characters  
   - Type: Textarea  
   - Show character count (e.g., "45/500")

#### 9.2 Form Behavior

**Validation:**

- Real-time validation on blur  
- Show error message in red below field  
- Prevent form submission if invalid  
- Success state: Green checkmark next to field (optional)

**Mobile Optimization:**

- Single column layout  
- Larger font (16px minimum)  
- Larger input height (48px minimum, for touch)  
- Dropdown uses native mobile selector

**Submission:**

- Button text: "Send Inquiry"  
- Style: Gold background, navy text, full-width on mobile  
- Disabled state during submission  
- Show loading spinner while processing

**Success State:**

- Close form or show success message  
- Message: "Thank you\! We'll contact you within 24 hours."  
- Display for 3 seconds then clear/close form  
- Optional: "Send Another" button to reset form

**Error Handling:**

- If submission fails: Show error message  
- Message: "Something went wrong. Please try again or contact us at \[phone number\]"  
- Retry button enabled  
- Log error to Sentry/monitoring service

#### 9.3 WhatsApp Integration

**WhatsApp Button Location:**

- Fixed sticky button (bottom-right corner, mobile)  
- Regular button in form area (desktop)  
- Always visible

**WhatsApp Functionality:**

- Pre-filled message on click: "Hi Pahul Associates\! I'm interested in your architectural services. Could you please provide more information?"  
- Click → Opens WhatsApp Web (desktop) or WhatsApp app (mobile)  
- Phone number: \+91 8195888500  
- Message encoding: Proper URL encoding for special characters

**Button Style:**

- Green WhatsApp color (\#25D366)  
- Icon \+ Text "Chat on WhatsApp"  
- Hover: Slightly darker green, subtle glow  
- Mobile: Only icon visible, 60px circular button, bottom-right (50px from edges)  
- Sticky: Remains visible during scroll

---

### 10\. Contact Footer Section

**Requirement:** Display contact information and basic footer details

**Specifications:**

- **Background:** Navy blue (\#1F3A5C)  
- **Text Color:** White/Light  
- **Layout:** 3-column (desktop), single column (mobile)

**Column 1: Company Info**

- Logo (white version)  
- "Pahul Associates \- Premium Architecture & Design"  
- Tagline: "25+ Years of Excellence"

**Column 2: Quick Links**

- Home  
- Services  
- Portfolio  
- Process  
- Cost Estimate  
- Contact

**Column 3: Contact Details**

- Phone: \+91 8195888500  
- Email: [pahulassociates03@gmail.com](mailto:pahulassociates03@gmail.com)  
- Location: Mullanpur, Ludhiana \- 141101, Punjab  
- Hours: Monday-Saturday, 10 AM \- 6 PM (optional)

**Bottom Section:**

- Copyright: "© 2026 Pahul Associates. All rights reserved."  
- Social links: LinkedIn, Instagram (icons, if applicable)

---

## Frontend Design Specifications

### 1\. Color Palette

**Primary Colors:**

- **Navy Blue:** \#1F3A5C (Dark backgrounds, headings, primary text)  
- **Gold/Champagne:** \#C9A962 (Accents, CTAs, highlights)  
- **White:** \#FFFFFF (Light backgrounds, text on dark)  
- **Light Gray:** \#F5F5F5 (Secondary backgrounds)  
- **Dark Gray:** \#333333 (Body text)

**Accent Colors:**

- **Hover State Gold:** \#D4AF37 (Slightly darker gold for hover)  
- **Success Green:** \#27AE60 (Form success, checkmarks)  
- **Error Red:** \#E63946 (Form errors, validation)  
- **Blueprint Light:** \#E8E8E8 (Blueprint grid background)

**50/50 Balance:**

- Alternate sections between light and dark backgrounds  
- Section 1 (Hero): Light (with video)  
- Section 2 (Stats): Light  
- Section 3 (Services): Light  
- Section 4 (Portfolio): Light  
- Section 5 (Process): Dark navy  
- Section 6 (Cost Calc): Light  
- Section 7 (Inquiry): Dark navy  
- Section 8 (Footer): Navy

### 2\. Typography

**Font Family:**

- **Headings:** 'Poppins' or 'Inter' (Sans-serif, bold weights for premium feel)  
- **Body Text:** 'Open Sans' or 'Segoe UI' (Sans-serif, readable on all devices)  
- **Accent/Display:** 'Playfair Display' or similar serif (for premium section titles)

**Font Sizes:**

- **H1 (Hero Title):** 48px (desktop), 32px (mobile), weight: 700  
- **H2 (Section Titles):** 36px (desktop), 24px (mobile), weight: 700  
- **H3 (Subsection):** 24px (desktop), 18px (mobile), weight: 600  
- **H4 (Card Titles):** 18px (desktop), 16px (mobile), weight: 600  
- **Body:** 16px (desktop), 14px (mobile), weight: 400  
- **Small Text:** 14px (desktop), 12px (mobile), weight: 400  
- **Captions:** 12px, weight: 400

**Line Height:**

- Headings: 1.2  
- Body text: 1.6  
- Small text: 1.4

**Letter Spacing:**

- Headings: 0.5px  
- Body: 0.3px

### 3\. Spacing & Layout

**Grid System:** 12-column responsive grid

- **Desktop:** 1200px max-width, 24px gutter  
- **Tablet:** 768px max-width, 20px gutter  
- **Mobile:** 375px max-width, 16px gutter

**Padding/Margins:**

- **Section Padding:** 80px vertical (desktop), 40px (tablet), 24px (mobile)  
- **Card Padding:** 24px (desktop), 16px (mobile)  
- **Button Padding:** 15px 40px (desktop), 12px 24px (mobile)

### 4\. Button Styles

**Primary Button (CTA):**

- Background: Gold (\#C9A962)  
- Text: Navy (\#1F3A5C), weight: 600  
- Padding: 15px 40px  
- Border-radius: 4px  
- Transition: 0.3s all  
- Hover: Background darker (\#D4AF37), scale(1.05)  
- Active: Scale(0.98), darker background  
- Focus: 2px gold outline

**Secondary Button:**

- Background: Transparent  
- Border: 2px solid Gold  
- Text: Gold, weight: 600  
- Hover: Background light gold, text navy  
- Same padding and transitions

**Outline Button:**

- Background: Transparent  
- Border: 2px solid Navy  
- Text: Navy  
- Hover: Background navy, text white

**Disabled Button:**

- Opacity: 0.5  
- Cursor: Not-allowed  
- No hover effects

### 5\. Cards & Containers

**Service Card:**

- Background: White (\#FFFFFF)  
- Border: 1px solid \#E8E8E8  
- Border-radius: 8px  
- Padding: 24px  
- Box-shadow: 0px 2px 8px rgba(0,0,0,0.08)  
- Hover: Shadow increases to 0px 8px 16px rgba(0,0,0,0.12), scale(1.02)

**Project Card:**

- Background: White  
- Border-radius: 8px  
- Overflow: Hidden (for rounded image corners)  
- Box-shadow: 0px 4px 12px rgba(0,0,0,0.1)  
- Hover: Shadow increases, image slightly zoomed

**Process Card:**

- Background: White  
- Border-left: 4px solid Gold  
- Padding: 24px  
- Border-radius: 4px  
- Transition: 0.3s all

**Input Fields:**

- Background: White or \#F9F9F9  
- Border: 1px solid \#E8E8E8  
- Border-radius: 4px  
- Padding: 12px 16px  
- Font-size: 16px (prevents auto-zoom on iOS)  
- Focus: 2px gold outline, border color gold  
- Placeholder: \#999999, font-style: italic

### 6\. Animations & Micro-interactions

**Page Transitions:**

- Enter: Fade in \+ slight slide up (0.4s ease-out)  
- Exit: Fade out (0.2s ease-in)  
- Stagger child elements: 0.05-0.1s delay

**Scroll Animations:**

- Elements fade in on scroll into view (0.6s)  
- Slide up on scroll (50px transform)  
- Stagger children (0.1s each)

**Button Animations:**

- Hover: Scale(1.05), shadow increase (0.3s ease-in-out)  
- Click: Scale(0.98), instant feedback  
- Focus: Outline \+ background change (0.2s)

**Form Interactions:**

- Field focus: Border & shadow change to gold (0.2s)  
- Valid input: Green checkmark fades in (0.3s)  
- Error message: Slide down \+ fade in (0.3s), text color red  
- Submission: Button shows spinner, disabled state

**Slider/Carousel:**

- Slide transition: 0.5s cubic-bezier (ease-in-out)  
- Dot animation: Underline grows/shrinks (0.3s)  
- Next/Prev buttons: Hover with scale & color (0.3s)

**Logo Animation (Hero):**

- Blueprint background visible throughout (subtle gridlines)  
- Geometric lines draw themselves (1s SVG stroke-dasharray animation)  
- Building icon materializes with 3D depth (1.5s, ease-out)  
  - Navy blue structure appears first  
  - Gold accents layer on top  
  - Shadows/depth effects added last  
- Text fades in with slight scale (0.5s each, staggered)  
- Scale down and reposition to header (0.8s cubic-bezier)  
- Background fade to transparent (0.6s linear)

### 7\. Responsive Design Breakpoints

Mobile: 320px \- 767px

  \- Single column layouts

  \- Larger touch targets (48px minimum)

  \- Simplified animations (reduced motion)

  \- Full-width containers

Tablet: 768px \- 1023px

  \- 2-column grids

  \- Optimized spacing

  \- All animations enabled

Desktop: 1024px+

  \- Full layouts (3-4 columns)

  \- All animations

  \- Hover effects enabled

  \- Max-width container

### 8\. Accessibility

**WCAG 2.1 AA Compliance:**

- Minimum contrast ratio: 4.5:1 (text), 3:1 (graphics)  
- Focus indicators: Clear 2px visible outline  
- Alt text: All images with descriptive alt text  
- ARIA labels: Form inputs, buttons, interactive elements  
- Keyboard navigation: Full support, logical tab order  
- Semantic HTML: Proper heading hierarchy (h1 → h6)  
- Skip links: "Skip to main content" link  
- Motion: Respect prefers-reduced-motion setting

**Color Contrast Examples:**

- Navy (\#1F3A5C) on White (\#FFFFFF): 11.5:1 ✓  
- Gold (\#C9A962) on Navy: 6.2:1 ✓  
- Dark Gray (\#333333) on White: 12.6:1 ✓

### 9\. Performance Optimization

**Image Optimization:**

- Format: WebP with JPG fallback  
- Responsive images: srcset for different screen sizes  
- Lazy loading: Intersection Observer for images below fold  
- Size targets:  
  - Desktop: 1200px width max  
  - Tablet: 768px width max  
  - Mobile: 375px width max

**Code Splitting:**

- Separate bundles for different sections  
- Load hero animation bundle first (critical)  
- Lazy load other sections on demand

**Bundle Size Targets:**

- Initial load: \<100KB (gzipped)  
- Total bundle: \<500KB (gzipped)  
- Images: \<2MB total for above-fold content

---

## Backend Requirements

### 1\. Technology Stack

**Runtime:** Node.js 18+  
**Framework:** Express.js 4+  
**Database:** MongoDB 5+  
**Email Service:** SendGrid or Nodemailer  
**Environment:** .env configuration  
**API Format:** RESTful JSON APIs  
**Authentication:** JWT (for future admin panel)

### 2\. API Endpoints

#### 2.1 Inquiry Form Submission

**Endpoint:** `POST /api/inquiries`

**Request Body:**

{

  "fullName": "Rajesh Kumar",

  "email": "rajesh@example.com",

  "phoneNumber": "+91 9876543210",

  "serviceOfInterest": "Interior Design",

  "projectBudget": "₹1,00,000 \- ₹3,00,000",

  "message": "I'm interested in designing my 2000 sq.ft apartment."

}

**Validations:**

- Full Name: Required, min 3 chars, max 50 chars  
- Email: Required, valid email format  
- Phone: Required, valid Indian format (+91 \+ 10 digits)  
- Service: Optional, must be from predefined list  
- Budget: Optional, must be from predefined list  
- Message: Required, min 10 chars, max 500 chars

**Response (Success):**

{

  "success": true,

  "message": "Inquiry submitted successfully",

  "inquiryId": "inq\_123456789",

  "timestamp": "2026-06-20T14:30:00Z"

}

**Response (Error):**

{

  "success": false,

  "error": "Validation error",

  "details": {

    "email": "Invalid email format",

    "phoneNumber": "Phone number must be valid"

  }

}

**Actions:**

1. Validate all inputs  
2. Sanitize inputs (prevent XSS/injection)  
3. Store in MongoDB with timestamp  
4. Send confirmation email to user  
5. Send notification email to [pahulassociates03@gmail.com](mailto:pahulassociates03@gmail.com)  
6. Return success response  
7. Log to monitoring service

---

#### 2.2 Cost Estimation Endpoint (Optional)

**Endpoint:** `POST /api/cost-estimate`

**Request Body:**

{

  "projectType": "Residential 3D",

  "area": 2000,

  "complexity": "Standard",

  "addOns": \["Floor Plans", "3D Models"\],

  "timeline": "2 weeks"

}

**Response:**

{

  "success": true,

  "estimate": {

    "projectType": "Residential 3D",

    "baseRate": 45,

    "baseCost": 90000,

    "complexityMultiplier": 1.15,

    "complexityCost": 103500,

    "addOns": {

      "Floor Plans": 15000,

      "3D Models": 25000

    },

    "addOnsTotalCost": 40000,

    "timelineMultiplier": 1,

    "finalCost": 143500,

    "breakdown": {

      "base": 90000,

      "complexity": 13500,

      "addOns": 40000,

      "timelineAdjustment": 0

    }

  }

}

**Note:** This endpoint is optional for Phase 1\. Calculations can be done entirely frontend.

---

#### 2.3 Content Management Endpoint (Phase 2\)

**Endpoint:** `GET /api/content/services`

**Response:**

{

  "success": true,

  "services": \[

    {

      "id": 1,

      "name": "Interior Design",

      "description": "Transform spaces with aesthetic & functional layouts",

      "icon": "sofa"

    },

    ...

  \]

}

---

### 3\. Email Service Integration

#### 3.1 SendGrid Integration

**Configuration:**

- API Key: Stored in environment variable `SENDGRID_API_KEY`  
- From Email: `noreply@pahulassociates.com`  
- From Name: Pahul Associates

#### 3.2 Email Templates

**Template 1: User Confirmation Email**

- **To:** User's email  
- **Subject:** "Thank you for your inquiry \- Pahul Associates"  
- **Body:**  
    
  Hello \[Full Name\],  
    
  Thank you for reaching out to Pahul Associates\! We have received your inquiry.  
    
  Our team will review your request and contact you within 24 hours via WhatsApp or phone call at \[Phone Number\].  
    
  In the meantime, feel free to explore more of our services at \[Website URL\].  
    
  Best regards,  
    
  Pahul Associates Team  
    
  \+91 8195888500  
    
  pahulassociates03@gmail.com

**Template 2: Admin Notification Email**

- **To:** [pahulassociates03@gmail.com](mailto:pahulassociates03@gmail.com)  
- **Subject:** "New Inquiry \- \[Service Name\] \- \[Date\]"  
- **Body:**  
    
  New Inquiry Received:  
    
  Name: \[Full Name\]  
    
  Email: \[Email\]  
    
  Phone: \[Phone Number\]  
    
  Service: \[Service\]  
    
  Budget: \[Budget\]  
    
  Message: \[Message\]  
    
  Timestamp: \[Date & Time\]  
    
  Inquiry ID: \[ID\]  
    
  \---  
    
  Please follow up with the client within 24 hours.

**Implementation:**

- Use SendGrid API or Nodemailer  
- HTML templates with dynamic variables  
- Error handling: If email fails, log error and retry (up to 3 times)  
- Use queue (Bull/Kue) for async email sending

---

### 4\. Database Schema (MongoDB)

#### 4.1 Inquiries Collection

{

  \_id: ObjectId,

  fullName: String (required),

  email: String (required, indexed),

  phoneNumber: String (required),

  serviceOfInterest: String (optional),

  projectBudget: String (optional),

  message: String (required),

  ipAddress: String,

  userAgent: String,

  status: String (default: "new"), // new, contacted, converted, closed

  tags: \[String\],

  notes: String,

  source: String (default: "website"),

  createdAt: Date,

  updatedAt: Date,

  lastContactedAt: Date,

  followUpCount: Number (default: 0\)

}

**Indexes:**

- `{ email: 1, createdAt: -1 }`  
- `{ phoneNumber: 1 }`  
- `{ status: 1, createdAt: -1 }`  
- `{ createdAt: -1 }`

#### 4.2 Cost Estimates Collection (Optional)

{

  \_id: ObjectId,

  projectType: String,

  area: Number,

  complexity: String,

  addOns: \[String\],

  timeline: String,

  estimatedCost: Number,

  ipAddress: String,

  createdAt: Date

}

#### 4.3 Content Configuration Collection

{

  \_id: ObjectId,

  key: String (unique),

  value: Object,

  type: String, // "text", "number", "array", "object"

  updatedAt: Date,

  updatedBy: String

}

**Example Documents:**

// Services

{

  key: "services",

  value: \[

    { id: 1, name: "Interior Design", ... },

    ...

  \]

}

// Pricing

{

  key: "pricing.residential2d",

  value: { rate: 35, currency: "INR" }

}

---

### 5\. Security Requirements

#### 5.1 Input Validation & Sanitization

**Validation Libraries:**

- Use `joi` or `zod` for schema validation  
- Validate every input on server-side (never trust client)  
- Type checking, length limits, format checks

**Sanitization:**

- Remove HTML tags: Use `xss` library  
- Escape special characters  
- Normalize whitespace

**Example Validation:**

const inquirySchema \= Joi.object({

  fullName: Joi.string().min(3).max(50).required(),

  email: Joi.string().email().required(),

  phoneNumber: Joi.string().pattern(/^\\+91\\d{10}$/).required(),

  serviceOfInterest: Joi.string().optional(),

  projectBudget: Joi.string().optional(),

  message: Joi.string().min(10).max(500).required()

});

#### 5.2 CORS & CSRF Protection

**CORS:**

- Allow origin: Website URL only (not \*)  
- Allowed methods: GET, POST, OPTIONS  
- Allowed headers: Content-Type, Authorization  
- Credentials: Include (if needed)

**CSRF:**

- Use token-based CSRF protection  
- Verify token on form submission  
- Token expires after 1 hour

#### 5.3 Rate Limiting

**Goal:** Prevent abuse, spam, DoS attacks

**Implementation:**

- Use `express-rate-limit` middleware  
- Limit inquiries: 5 requests per IP per hour  
- Limit email: 10 emails per IP per hour  
- Whitelist trusted IPs (admin, internal services)

**Configuration:**

{

  windowMs: 60 \* 60 \* 1000, // 1 hour

  max: 5, // 5 requests per window

  message: "Too many inquiries from this IP, please try again later"

}

#### 5.4 API Security

**Authentication (Phase 2):**

- JWT tokens for admin endpoints  
- Token issued on login  
- Token expires after 24 hours  
- Refresh token mechanism

**HTTPS:**

- All requests must be HTTPS  
- Redirect HTTP to HTTPS  
- HSTS header enabled

**Sensitive Data:**

- Never log passwords, tokens, sensitive data  
- Encrypt sensitive data at rest  
- Use environment variables for secrets

**Headers Security:**

- `Strict-Transport-Security`  
- `X-Content-Type-Options: nosniff`  
- `X-Frame-Options: DENY`  
- `X-XSS-Protection: 1; mode=block`  
- `Referrer-Policy: strict-origin-when-cross-origin`

---

### 6\. Error Handling

**Error Classes:**

class ValidationError extends Error {

  constructor(message, details) {

    this.statusCode \= 400;

    this.details \= details;

  }

}

class NotFoundError extends Error {

  constructor(message) {

    this.statusCode \= 404;

  }

}

class ServerError extends Error {

  constructor(message) {

    this.statusCode \= 500;

  }

}

**Error Responses:**

{

  "success": false,

  "error": "Validation error",

  "statusCode": 400,

  "details": {

    "field": "error message"

  }

}

**Logging:**

- Use `winston` or `pino` for structured logging  
- Log errors with context (request ID, user info, stack trace)  
- Send critical errors to monitoring service (Sentry)  
- Store logs for 30 days

---

### 7\. Monitoring & Logging

**Services:**

- **Error Tracking:** Sentry or Bugsnag  
- **Performance Monitoring:** DataDog or New Relic (optional)  
- **Logging:** Winston to file \+ console  
- **Analytics:** Google Analytics (frontend events)

**Key Events to Log:**

- Form submissions  
- Email sends (success/failure)  
- API errors  
- Database errors  
- Server errors

---

## Database Schema

See Section 4 above (Backend Requirements).

---

## API Specifications

See Section 2 above (Backend Requirements).

---

## Integration Requirements

### 1\. Email Service (SendGrid/Nodemailer)

**Provider:** SendGrid (recommended) or Nodemailer with Gmail SMTP

**Configuration:**

// SendGrid

const sgMail \= require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID\_API\_KEY);

// Nodemailer

const transporter \= nodemailer.createTransport({

  service: 'gmail',

  auth: {

    user: process.env.EMAIL\_USER,

    pass: process.env.EMAIL\_PASSWORD

  }

});

**Email Features:**

- Templated HTML emails  
- Async sending (queue-based)  
- Retry mechanism (3 retries with exponential backoff)  
- Error logging

### 2\. WhatsApp Integration

**Implementation:**

- Client-side only using WhatsApp Web link  
- Format: `https://wa.me/918195888500?text=Pre-filled%20message`  
- URL encoding for special characters  
- No backend required for basic integration

**Future Enhancement (Phase 2):**

- WhatsApp Business API integration  
- Automated responses  
- Chat history tracking

### 3\. Form & Spreadsheet (Optional)

**Alternative to Email:**

- Google Sheets integration (optional)  
- Append inquiry data to Google Sheet  
- Use `google-sheets-api` library  
- One less dependency than email service

---

## Performance & Security

### 1\. Performance Targets

**Web Core Vitals:**

- **Largest Contentful Paint (LCP):** \< 2.5 seconds  
- **First Input Delay (FID):** \< 100 milliseconds  
- **Cumulative Layout Shift (CLS):** \< 0.1

**Page Load Metrics:**

- Initial load: \< 3 seconds (3G connection)  
- Time to Interactive (TTI): \< 4 seconds  
- First Contentful Paint (FCP): \< 1.8 seconds

**Backend:**

- API response time: \< 200ms (95th percentile)  
- Email send: \< 5 seconds  
- Database query: \< 100ms

### 2\. Optimization Strategies

**Frontend:**

- Code splitting (route-based)  
- Image optimization (WebP, lazy loading)  
- CSS minification  
- JavaScript minification & tree-shaking  
- Gzip compression  
- CDN for static assets  
- Browser caching headers

**Backend:**

- Database indexing  
- Query optimization  
- Connection pooling  
- Caching (Redis for frequent queries)  
- Async processing (queues for emails)  
- Horizontal scaling (multiple instances)

### 3\. Security Implementation

See Section 5 above (Backend Requirements).

### 4\. Backup & Disaster Recovery

**Database Backups:**

- Daily automated backups  
- 30-day retention  
- Test restore monthly  
- Geo-redundant backup storage

**Monitoring & Uptime:**

- 99.9% uptime target  
- Monitoring alerts (UptimeRobot, etc.)  
- Automated failover  
- Incident response plan

---

## Deployment & Maintenance

### 1\. Deployment Architecture

**Frontend:**

- **Hosting:** Vercel (recommended for Next.js/React)  
- **CDN:** Vercel Edge Network (built-in)  
- **Domain:** Custom domain with SSL  
- **Deployment:** Automatic on Git push to main branch

**Backend:**

- **Hosting:** Railway, Render, or AWS EC2  
- **Database:** MongoDB Atlas (managed service)  
- **Process Manager:** PM2 (for EC2) or built-in (for managed services)  
- **Port:** 3001 (or configurable)

**Environment:**

- Production: Stable, tested code  
- Staging: Pre-production testing  
- Development: Local development

### 2\. Environment Configuration

**File:** `.env` (never commit to Git)

\# Frontend

REACT\_APP\_API\_URL=https://api.pahulassociates.com

REACT\_APP\_WHATSAPP\_NUMBER=918195888500

\# Backend

NODE\_ENV=production

PORT=3001

MONGODB\_URI=mongodb+srv://...

SENDGRID\_API\_KEY=SG.xxx...

JWT\_SECRET=your-secret-key

CORS\_ORIGIN=https://pahulassociates.com

### 3\. CI/CD Pipeline

**Platform:** GitHub Actions (free with GitHub)

**Pipeline Steps:**

1. **Trigger:** Push to main branch  
2. **Install:** Install dependencies  
3. **Lint:** Run ESLint, Prettier  
4. **Test:** Run unit tests (if any)  
5. **Build:** Build production bundle  
6. **Deploy:** Deploy to Vercel/Railway  
7. **Smoke Test:** Test critical endpoints  
8. **Notify:** Slack notification on success/failure

**Configuration File:** `.github/workflows/deploy.yml`

### 4\. Monitoring & Alerts

**Services:**

- **Error Tracking:** Sentry (free tier available)  
- **Uptime:** UptimeRobot  
- **Performance:** Vercel Analytics (built-in)  
- **Logs:** Cloud Logging or ELK Stack

**Alerts:**

- High error rate (\> 5% in 5 minutes)  
- API response time \> 1 second  
- Server down  
- Database connection issues

---

## Success Metrics

### 1\. Business Metrics

- **Inquiries:** 50+ per month  
- **Conversion Rate:** 5-10% of visitors → inquiry submission  
- **Cost Per Lead:** \< ₹200 (if paid traffic)  
- **Lead Quality:** 40%+ qualified (budget \> ₹1,00,000)

### 2\. Technical Metrics

- **Website Performance:**  
    
  - Page load time: \< 2.5 seconds  
  - Bounce rate: \< 40%  
  - Average session duration: \> 2 minutes  
  - Pages per session: \> 3


- **Mobile:**  
    
  - Mobile traffic: 70%+ of total  
  - Mobile conversion: Within 5% of desktop


- **SEO:**  
    
  - Organic traffic: Increasing month-over-month  
  - Top 3 keywords: First page Google rankings  
  - Sitemap submitted, robots.txt present

### 3\. User Experience Metrics

- **Form Completion:**  
    
  - Inquiry form fill rate: \> 8% of visitors  
  - Calculator usage: \> 30% of visitors  
  - WhatsApp clicks: \> 15% of visitors


- **Engagement:**  
    
  - Time on cost calculator: \> 1 minute  
  - Portfolio section scroll: \> 80% completion  
  - Newsletter signup (if applicable): \> 5%

---

## Milestones

### Phase 1: MVP (Core Functionality) 

- ✓ Setup: Dev environment, Git, database  
- ✓ Frontend structure: Header, hero, basic sections  
- ✓ Logo animation: 3D SVG animation  
- ✓ Hero section: Video background, CTA button  
- ✓ Layout: Stats, Services, Portfolio grid  
- ✓ Cost calculator: All fields, live calculation  
- ✓ Process slider: Mobile-responsive  
- ✓ Inquiry form: Fields, validation, basic styling  
- ✓ WhatsApp integration: Button with pre-filled message  
- ✓ Footer: Contact details, links  
- ✓ Basic styling: Colors, typography, spacing

**Deliverables:**

- Working website (all sections functional)  
- Cost calculator demo  
- Inquiry form (email integration pending)  
- Deployed to Vercel (staging)

---

### Phase 1b: Polish & Backend

- ✓ Backend: Express server, MongoDB setup  
- ✓ Email integration: SendGrid configured  
- ✓ Form submission: API working, emails sending  
- ✓ Security: CORS, rate limiting, input validation  
- ✓ Error handling: Proper error messages  
- ✓ Testing: Manual testing all features  
- ✓ Performance: Image optimization, code splitting  
- ✓ Responsive design: Mobile, tablet, desktop testing  
- ✓ Accessibility: WCAG 2.1 AA compliance check  
- ✓ Deployment: Live domain setup

**Deliverables:**

- Production-ready website  
- Backend API fully functional  
- Email notifications working  
- Live at pahulassociates.com (or custom domain)

---

### Phase 2: Advanced Features \- Post-Launch

**Nice-to-Have (If timeline permits):**

- Admin dashboard for managing projects  
- Project detail pages (lightbox/modal)  
- Testimonials section (with reviews)  
- Blog section (for SEO)  
- Contact page alternative layout  
- Dark mode toggle  
- Animated counters with real data  
- Multi-language support (Punjabi, Hindi)

---

## Technical Checklist

### Frontend

- [ ] React app setup (Vite or Create React App)  
- [ ] Framer Motion for animations  
- [ ] Three.js for 3D elements  
- [ ] Responsive CSS/Tailwind  
- [ ] Form validation library (React Hook Form)  
- [ ] API client (Axios/Fetch)  
- [ ] Image optimization  
- [ ] Code splitting  
- [ ] Error boundary  
- [ ] Performance monitoring

### Backend

- [ ] Node.js \+ Express setup  
- [ ] MongoDB connection  
- [ ] Environment variables  
- [ ] Input validation (Joi/Zod)  
- [ ] Email service (SendGrid/Nodemailer)  
- [ ] CORS & security headers  
- [ ] Rate limiting  
- [ ] Error handling middleware  
- [ ] Logging (Winston)  
- [ ] Database indexes

### DevOps

- [ ] Git repository (GitHub)  
- [ ] `.gitignore` file  
- [ ] Environment configuration  
- [ ] GitHub Actions CI/CD  
- [ ] Vercel deployment  
- [ ] Railway/Render deployment  
- [ ] Domain setup \+ SSL  
- [ ] Email verification  
- [ ] Monitoring setup (Sentry)  
- [ ] Backup strategy

### Testing & Quality

- [ ] Manual testing checklist  
- [ ] Cross-browser testing  
- [ ] Mobile testing  
- [ ] Form submission testing  
- [ ] Email delivery testing  
- [ ] Performance testing (Lighthouse)  
- [ ] Security testing (OWASP)  
- [ ] Accessibility testing (WAVE)

### Documentation

- [ ] README.md (setup instructions)  
- [ ] API documentation  
- [ ] Database schema documentation  
- [ ] Deployment guide  
- [ ] Troubleshooting guide  
- [ ] Content update guide (JSON config)

---

## Content Management (JSON Configuration)

All dynamic content will be stored in JSON files for easy management:

**File:** `src/data/config.json`

{

  "company": {

    "name": "Pahul Associates",

    "tagline": "Premium Architecture & Design",

    "phone": "+91 8195888500",

    "email": "pahulassociates03@gmail.com",

    "location": "Mullanpur, Ludhiana \- 141101, Punjab"

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

    { "id": 1, "name": "Interior Design", "description": "...", "icon": "sofa" },

    ...

  \],

  "projects": \[

    { "id": 1, "title": "Luxury Apartment", "category": "Residential 3D", "image": "..." },

    ...

  \]

}

**How to Update:**

1. Edit `config.json`  
2. Commit and push to GitHub  
3. GitHub Actions auto-deploys  
4. Website updates without code changes

---

## Glossary

- **MVP:** Minimum Viable Product (core features only)  
- **SPA:** Single Page Application (no page reloads)  
- **CTA:** Call-to-Action button  
- **CORS:** Cross-Origin Resource Sharing  
- **JWT:** JSON Web Token (authentication)  
- **WCAG:** Web Content Accessibility Guidelines  
- **SEO:** Search Engine Optimization  
- **LCP/FID/CLS:** Core Web Vitals metrics

---

## Appendix

### A. Reference Websites

- 23DC Architects: Premium architecture portfolio inspiration  
- Vectr: Design animation reference  
- Framer: Animation techniques

### B. Tools & Libraries (To Install)

**Frontend:**

npm install react framer-motion three axios react-hook-form

**Backend:**

npm install express mongodb joi sendgrid dotenv cors helmet express-rate-limit

**Development:**

npm install \-D tailwindcss postcss autoprefixer eslint prettier

### C. Useful Resources

- React Documentation: [https://react.dev](https://react.dev)  
- Framer Motion: [https://www.framer.com/motion/](https://www.framer.com/motion/)  
- Express.js: [https://expressjs.com/](https://expressjs.com/)  
- MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)  
- Vercel Docs: [https://vercel.com/docs](https://vercel.com/docs)  
- SendGrid Docs: [https://sendgrid.com/docs/](https://sendgrid.com/docs/)

---

**END OF PRD**

*This document is a living document and will be updated as requirements evolve during development.*  
