// Pahul Associates — Central Data Configuration

export const company = {
  name: "Pahul Associates",
  tagline: "25+ Years of Architectural Excellence",
  phone: "+91 8195888500",
  phoneRaw: "918195888500",
  email: "pahulassociates03@gmail.com",
  location: "Mullanpur, Ludhiana – 141101, Punjab",
  hours: "Monday–Saturday, 10 AM – 6 PM",
  whatsappMessage: "Hi Pahul Associates! I'm interested in your architectural services. Could you please provide more information?",
};

export const stats = [
  { value: 25, suffix: "+", label: "Years of Experience", icon: "🏛️" },
  { value: 250, suffix: "+", label: "Projects Completed", icon: "🏗️" },
  { value: 99, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
];

export const services = [
  {
    id: 1,
    name: "Interior Design",
    icon: "sofa",
    description:
      "Transform living and working spaces with innovative layouts that blend aesthetics with function.",
  },
  {
    id: 2,
    name: "Exterior Design",
    icon: "building",
    description:
      "Craft striking facades and outdoor environments that create a lasting first impression.",
  },
  {
    id: 3,
    name: "3D Modeling",
    icon: "cube",
    description:
      "Photorealistic 3D renderings and walkthroughs that bring your vision to life before construction.",
  },
  {
    id: 4,
    name: "Blueprint Designing",
    icon: "blueprint",
    description:
      "Precise technical drawings and construction documents meeting all regulatory standards.",
  },
  {
    id: 5,
    name: "2D Elevation",
    icon: "drafting",
    description:
      "Detailed elevation drawings that capture every design element for flawless execution.",
  },
  {
    id: 6,
    name: "Building Planning",
    icon: "plan",
    description:
      "Comprehensive architectural planning optimizing space utilization and structural integrity.",
  },
  {
    id: 7,
    name: "Renovation & Restoration",
    icon: "renovation",
    description:
      "Revitalize existing structures while preserving character and improving modern functionality.",
  },
  {
    id: 8,
    name: "Commercial Design",
    icon: "commercial",
    description:
      "Purpose-built commercial spaces designed to enhance productivity, branding, and customer experience.",
  },
];

export const projects = [
  {
    id: 1,
    title: "Luxury Apartment Complex",
    subtitle: "2000 sq.ft Residential",
    category: "Residential 3D",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Modern Office Tower",
    subtitle: "Commercial — 15,000 sq.ft",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Heritage Villa Renovation",
    subtitle: "Residential Restoration",
    category: "Renovation",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Boutique Hotel Lobby",
    subtitle: "Interior — 3,500 sq.ft",
    category: "Interior Design",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Penthouse Suite",
    subtitle: "Luxury Residential",
    category: "Residential 3D",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Corporate Headquarters",
    subtitle: "Mixed-Use — 25,000 sq.ft",
    category: "Mixed-Use",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80",
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Consultation",
    timeline: "1–2 Weeks",
    description:
      "We begin with an in-depth consultation to understand your vision, requirements, budget, and timeline. Our team listens carefully to capture every detail that makes your project unique.",
    icon: "chat",
  },
  {
    step: 2,
    title: "Design Development",
    timeline: "3–6 Weeks",
    description:
      "Our designers create detailed concepts, floor plans, and 3D renderings. We present multiple design options and refine them collaboratively until every element is perfect.",
    icon: "design",
  },
  {
    step: 3,
    title: "Approvals & Planning",
    timeline: "2–4 Weeks",
    description:
      "We handle all technical documentation, obtain necessary permits and regulatory approvals, and finalize material specifications to ensure a smooth construction phase.",
    icon: "approve",
  },
  {
    step: 4,
    title: "Execution & Handover",
    timeline: "8–20 Weeks",
    description:
      "Our team oversees every stage of execution to ensure the design is brought to life exactly as envisioned. Final quality checks are conducted before the grand handover.",
    icon: "handover",
  },
];

export const pricing = {
  residential2d: 35,
  residential3d: 45,
  commercial: 65,
  mixedUse: 70,
};

export const projectTypes = [
  { value: "residential2d", label: "Residential 2D", rate: 35 },
  { value: "residential3d", label: "Residential 3D", rate: 45 },
  { value: "commercial", label: "Commercial", rate: 65 },
  { value: "mixedUse", label: "Mixed-Use", rate: 70 },
];

export const complexityOptions = [
  { value: "basic", label: "Basic", multiplier: 0, color: "gray" },
  { value: "standard", label: "Standard", multiplier: 0.15, color: "gold" },
  { value: "premium", label: "Premium", multiplier: 0.35, color: "gold" },
  { value: "luxury", label: "Luxury", multiplier: 0.6, color: "gold" },
];

export const addOns = [
  { id: "floorPlans", name: "Floor Plans", price: 15000 },
  { id: "models3d", name: "3D Models", price: 25000 },
  { id: "walkthroughs", name: "Walkthroughs", price: 40000 },
  { id: "animations", name: "Animations", price: 50000 },
];

export const timelineOptions = [
  { value: "express", label: "1 Week (Express)", adjustment: 0.1 },
  { value: "standard", label: "2 Weeks (Standard)", adjustment: 0 },
  { value: "budget", label: "3+ Weeks (Budget)", adjustment: -0.05 },
];

export const budgetRanges = [
  "Below ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹10,00,000",
  "Above ₹10,00,000",
];
