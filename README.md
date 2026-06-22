# Pahul Associates — Premium Architecture & Design Platform

A high-end, modern web application built for **Pahul Associates**, a premier architecture, interior design, and construction consultancy firm based in Ludhiana, Punjab. This platform combines a premium, immersive digital brand showcase with interactive web utilities and secure client communication channels.

---

## 🎨 Immersive User Experience (UX)

- **Cinematic Entrance**: A 3D-inspired logo draw-in and glow-burst entry sequence that seamlessly transitions into the landing experience on load.
- **Real-Time Cost Calculator**: An interactive estimation utility allowing clients to customize project types, area sizing (500–10,000 sq.ft), architectural complexity, and custom service add-ons with live price updates.
- **Curated Projects Showcase**: A visual gallery highlighting residential design, historical restoration, and modern commercial projects.
- **Interactive Micro-interactions**: Staggered scroll fades, snappy counter animations, and hover-triggered navigation.
- **Omnichannel Communication**: Dual-mode contact hub featuring a secure email portal and a sticky regional WhatsApp communication channel.

---

## 💻 Tech Stack

- **Frontend Core**: React 18+ powered by Vite for rapid loading speeds and compilation efficiency.
- **Motion & Physics**: Framer Motion for transitions and scroll-bound animations.
- **Backend API**: Node.js & Express RESTful service.
- **Database Engine**: Mongoose & MongoDB Atlas for lead logging and contact management.
- **Communications**: Nodemailer with SMTP integration for secure administrative mail forwarding.
- **Visual Design**: Vanilla CSS with custom tokens (Navy, Gold, and Champagne variables) for a responsive layout.

---

## ⚡ Performance Optimizations

- **Asset Compaction**: Optimized lightweight JPG/SVG profiles ensuring immediate above-the-fold rendering.
- **Render Stability**: Structured callback wrappers (`useCallback`) and stabilized state dependencies preventing React loop redraws.
- **Fixed Scroll Restoration**: Overrode default browser scroll memory (`window.history.scrollRestoration = 'manual'`) combined with viewport resets to ensure reloads always boot from the home page.
- **Count Animation Deceleration**: Tuned count counters using `easeOutCubic` curve deceleration over an `800ms` window to keep browser repaints at peak frame rates.

---

## 🔍 SEO Implementation

- **Structured Business Schema**: Embedded JSON-LD schema (type `Architect`) providing search crawlers with verified address, geolocation coordinates, and business hours.
- **Open Graph & Twitter Cards**: Configured social sharing tags to ensure links shared on social networks show your high-resolution brand logo and custom title card.
- **Target Keywords**: Optimized head elements to target search trends including *architects, home design, house plans, interior design, and construction consultants* in the Ludhiana/Punjab region.

---

## 🔒 Security Measures

- **Secure HTTP Headers**: Integrated `Helmet` middleware to protect the server from cross-site scripting (XSS), clickjacking, and mime-type sniffing.
- **Strict CORS Origin Control**: Restrained CORS policies to allow access only from authorized local development and production host domains.
- **Submission Rate Limiting**: Added `express-rate-limit` middleware, capping requests on `/api/inquiries` to block automated spam bots and DDoS mail-bombing attacks.
- **Dual-Layer Validation**: Strict frontend validation coupled with matching server-side validation to sanitize inputs and reject invalid data.
