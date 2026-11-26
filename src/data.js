/* --------------------------------------------------------------------------
   Al-Fatah Builders & Developers — homepage content
   Source: homepage content extraction (19 Nov 2026), https://www.alfatahbuilders.com/

   NOTE: no images / videos / fonts were taken from the live site. Every media
   reference below points either to an asset already shipped in /public/images
   or to the placeholder video of the "Al-Fatah-new" variant. Fonts and colours
   are unchanged.
   -------------------------------------------------------------------------- */

export const BRAND = {
  name: "Al-Fatah",
  descriptor: "Builders & Developers",
  lockup: "Al-Fatah — Builders & Developers",
  seoTitle: "Home - AlFatah Builders & Developers",
  seoDescription:
    "Al-Fatah Builders & Developers — residential and commercial projects in Karachi. In service since 1960, building with integrity, quality and trust.",
};

/* Local placeholder images (already in this repo) — swap these later. */
export const MEDIA = {
  hero: "/images/back.f53e9773.webp",
  director: "/images/Ahmed Mazhar.webp",
  project: [
    "/images/icon.jpg",
    "/images/building.jpg",
    "/images/pride.jpg",
    "/images/arcade.jpg",
    "/images/building cut.png",
  ],
  news: [
    "/images/news/apartments-with-elevators-in-karachi.webp",
    "/images/news/al-fatah-company-journey.webp",
    "/images/news/property-development-engineering.webp",
    "/images/news/apartments-with-rooftop-garden.webp",
    "/images/news/al-fatah-builders-goals.webp",
    "/images/news/brishna-heights-booking.webp",
  ],
  instagram: [
    "/images/A complete lifestyle, now at an exceptional value.From a private gym and kids play area to pea.webp",
    "/images/A complete lifestyle, now at an exceptional value.From a private gym and kids play area to pea.webp",
    "/images/A complete lifestyle, now at an exceptional value.From a private gym and kids play area to pea.webp",
  ],
  gallery: ["/images/icon.jpg", "/images/elevation.jpeg", "/images/brishna-heights-booking.webp"],
  finalCta: "/images/contact-elevation-8.webp",
};

/* Fallback video of the Al-Fatah-new variant — replace later. */
export const VIDEO = {
  src: "https://res.cloudinary.com/naifkddh/video/upload/v1795517038/Business_Avenue_by_Al_Fatah_Builders_and_Developers___TEASER.mp4",
};

/* 1. Header / navigation --------------------------------------------------- */
export const HEADER_CTA = { label: "Call Now", href: "tel:03112276442" };

export const PROJECT_MENU = [
  {
    group: "Coming Soon",
    links: [{ label: "Al Fatah Business Avenue", href: "/al-fatah-business-avenue/" }],
  },
  {
    group: "Ongoing Projects",
    links: [{ label: "Al Fatah Icon", href: "/al-fatah-icon/" }],
  },
  {
    group: "Past Projects",
    links: [
      { label: "Brishna Heights", href: "/brishna-heights/" },
      { label: "Al Fatah Arcade", href: "/al-fatah-arcade/" },
      { label: "Al Fatah Pride", href: "/al-fatah-pride/" },
      { label: "A Commercial Area Phase 2, DHA Karachi", href: "/our-projects/" },
      { label: "C-1-C, Saadi Commercial Lane, Phase 6, DHA, Karachi", href: "/our-projects/" },
      { label: "Jami Commercial Phase 6, DHA, Karachi", href: "/our-projects/" },
      { label: "Saba Square, Saba Commercial, Phase 5, DHA, Karachi", href: "/our-projects/" },
    ],
  },
];

/* `href` = working in-page anchor for this single-page build.
   `path`  = the exact destination from the source site, kept for wiring up
             the real pages later. */
export const navGroups = [
  { label: "Home", href: "#top", path: "/", items: [] },
  { label: "About Us", href: "#about", path: "/about-us/", items: [] },
  { label: "Services", href: "#projects", path: "/services/", items: [] },
  { label: "Our Projects", href: "#projects", path: "/our-projects/", items: PROJECT_MENU },
  { label: "Our News", href: "#news", path: "/our-news/", items: [] },
  { label: "Contact Us", href: "#contact", path: "/contact-us/", items: [] },
];

/* 2. Hero ------------------------------------------------------------------ */
export const HERO = {
  brandLockup: "Al-Fatah — Builders & Developers",
  heading: "Modern Architecture",
  sub: "We are dedicated to bringing your dreams to life by crafting exceptional solutions tailored to your unique vision and aspirations.",
  cta: "Call Now",
  ctaHref: "tel:+923112276442",
};

/* 3. Director's Welcome (rendered by the video "Why" section) -------------- */
export const WELCOME = {
  eyebrow: "Welcome To",
  statement: "Al Fatah Builders & Developers",
  body:
    "We are in the service industry since 1960 as a corporate brokerage house at the Karachi stock exchange. In early 2000, we entered the construction sector with 50 years of experience in service. Our main contributions have been in the infrastructural development (residential and commercial) in the areas of Gulistan-e-Johar and DHA at the heart of the Metropolitan City of Karachi. Our clients enjoy services centered on human values, integrity, trust, and an assurance of responsibility all coupled with our expertise in construction, engineering & management. We feel delighted to say that our engineers, administrators, and professional managers are our biggest assets, backed by a highly trained and skillful team. This has made me confident enough to say that, with our versatile, adaptable, and technology-led efforts, we will meet the expected standards of our clients.",
  name: "AHMED MAZHAR",
  role: "DIRECTOR, AL FATAH BUILDERS & DEVELOPERS",
  cta: "About us",
  ctaHref: "/about-us/",
  question: "Have any question?",
  phone: "03112276442",
  phoneHref: "tel:+923112276442",
};

/* 3b. About (animated morph section — copy stays Al-Fatah's own) ----------- */
export const ABOUT = {
  eyebrow: "About",
  statement:
    "This isn't just about real estate. It's about identity, progress and finding alignment.",
  support:
    "Al Fatah Builders & Developers has been building in Gulistan-e-Johar and DHA since 2000 — work centred on human values, integrity, trust and an assurance of responsibility.",
  caption: "More within your space",
  clouds: [
    "/images/about/cloud-1-cropped.webp",
    "/images/about/cloud-2-full.webp",
  ],
  tiles: [
    "/images/about/af-arcade.webp",
    "/images/about/af-icon.webp",
    "/images/about/af-pride.webp",
    "/images/about/af-elevation.webp",
    "/images/about/af-building.webp",
    "/images/about/af-brishna.webp",
  ],
  slides: [
    "/images/about/af-cta.webp",
    "/images/about/af-building.webp",
    "/images/about/af-icon.webp",
    "/images/about/af-pride.webp",
    "/images/about/af-arcade.webp",
    "/images/about/af-brishna.webp",
    "/images/about/af-elevation.webp",
  ],
};

/* 4. Our Projects (rendered by the "Services" hover-row section) ----------- */
export const PROJECTS = {
  eyebrow: "Projects",
  titleLines: ["Our", "Projects"],
  intro:
    "We are dedicated to bringing your dreams to life by crafting exceptional solutions tailored to your unique vision and aspirations.",
  cta: "View All",
  ctaHref: "/our-projects/",
  mapHref: "https://share.google/mLAAaHSiIbbekoLa4",
  controls: ["Prev", "Next", "Drag", "Map"],
  rows: [
    {
      num: "01",
      label: "Al Fatah Business Avenue",
      location: "Karachi · Commercial & Corporate Landmark",
      spec: "Flagship Commercial & Corporate Tower",
      priceLabel: "Status",
      price: "Coming Soon",
      status: "Coming Soon",
      href: "/al-fatah-business-avenue/",
      image: "/images/elevation.jpeg",
    },
    {
      num: "02",
      label: "AL Fatah Icon",
      location: "Adjacent to Falcon Housing, Near Malir Cantt",
      spec: "Apartments | 4 Bed + Lounge · 1,740 Sq. Ft.",
      priceLabel: "From",
      price: "PKR 2.17 Crore",
      status: "Ongoing Project",
      href: "/al-fatah-icon/",
      image: MEDIA.project[0],
    },
    {
      num: "03",
      label: "Brishna Heights",
      location: "Gulistan-e-Johar, Karachi",
      spec: "Residential & Commercial Apartments",
      priceLabel: "Status",
      price: "Past Project · SBCA Approved",
      status: "Completed",
      href: "/brishna-heights/",
      image: MEDIA.project[1],
    },
    {
      num: "04",
      label: "AL Fatah Pride",
      location: "Gulistan-e-Johar, Karachi",
      spec: "Modern Family Residences & Amenities",
      priceLabel: "Status",
      price: "Past Project · Delivered",
      status: "Completed",
      href: "/al-fatah-pride/",
      image: MEDIA.project[2],
    },
    {
      num: "05",
      label: "AL Fatah Arcade",
      location: "DHA, Karachi",
      spec: "Commercial & Corporate Retail Spaces",
      priceLabel: "Status",
      price: "Past Project · Delivered",
      status: "Completed",
      href: "/al-fatah-arcade/",
      image: MEDIA.project[3],
    },
  ],
};

/* 4b. 3D Elevation Showcase (Al Fatah Business Avenue) ---------------------- */
export const ELEVATION = {
  eyebrow: "Coming Soon · 3D Elevation",
  titleLines: ["Al Fatah", "Business Avenue"],
  intro:
    "Explore the architectural night elevation of our upcoming flagship commercial and corporate landmark. Move your pointer or use the arrow keys to tilt the facade.",
  cta: "Book Inquiry",
  ctaHref: "#contact",
  image: "/images/elevation.jpeg",
  alt: "Night render of the Al Fatah Business Avenue tower",
  hint: "Interactive 3D View — Move cursor or ↑ ↓ ← → keys (Esc to reset)",
  meta: "Al Fatah Builders & Developers · Karachi",
};

/* 5. Why Choose Us (rendered by the animated "Steps" section) -------------- */
/* The source site listed INTEGRITY twice with broken numbering (/1,/3,/2,/3,/4).
   Duplicate removed, numbering corrected — see MAPPING.md. */
export const WHY_STEPS = {
  eyebrow: "Projects",
  titleLines: ["Why Choose", "Us."],
  cta: "About us",
  ctaHref: "/about-us/",
  items: [
    {
      num: "1",
      title: "BEST QUALITY",
      text: "We are the new emerging name in this industry, with an experienced team of individuals having immense experience in this field.",
    },
    {
      num: "2",
      title: "STRATEGY",
      text: "We are here to stay, we are expanding rapidly and soon we will be covering the whole of Pakistan and abroad too.",
    },
    {
      num: "3",
      title: "INTEGRITY",
      text: "We are in the services business from the 1960s for so long and we know how the services industry moves.",
    },
    {
      num: "4",
      title: "SUSTAINABILITY",
      text: "We have a great team of people who are experts in their fields we compose the gems together to create value for clients.",
    },
  ],
};

/* 6. News Feed (rendered by the OLD BlogSection) --------------------------- */
export const NEWS = {
  eyebrow: "Our News",
  heading: "News Feed",
  intro: "Practical reads on property, projects and ownership in Karachi from Al-Fatah Builders & Developers.",
  cta: "View All",
  ctaHref: "/our-news/",
  readMore: "Learn More",
};

export const blogPosts = [
  {
    date: "19 Nov",
    title: "Apartments With Elevators in Karachi: 7 Proven Perks",
    copy: "Apartments with elevators in Karachi make daily life easier. Learn how many lifts you need and what to check before you buy.",
    image: MEDIA.news[0],
    href: "/apartments-with-elevators-in-karachi-7-proven-perks/",
  },
  {
    date: "16 Nov",
    title: "From Corporate Brokerage To Real Estate Development: The Journey Of Al-Fatah Builders & Developers",
    copy: "Al-Fatah Builders & Developers moved from brokerage to construction. Explore its history, Karachi projects, and vision.",
    image: MEDIA.news[1],
    href: "/al-fatah-builders-developers/",
  },
  {
    date: "13 Nov",
    title: "The Role Of Engineering And Project Management In Successful Property Development",
    copy: "A property development company in Karachi relies on strong engineering and planning. Learn what shapes quality and timelines.",
    image: MEDIA.news[2],
    href: "/property-development-company-in-karachi/",
  },
  {
    date: "11 Nov",
    title: "Apartments With Rooftop Garden: 7 Proven Benefits",
    copy: "Apartments with rooftop garden bring fresh air, calm, and community. Learn the benefits and what to check before you buy.",
    image: MEDIA.news[3],
    href: "/apartments-with-rooftop-garden-7-proven-benefits/",
  },
  {
    date: "06 Nov",
    title: "Al-Fatah Builders and Developers Karachi: 5 Powerful Goals",
    copy: "Al-Fatah Builders and Developers Karachi aims to build homes for every Pakistani family. Explore its vision, mission, and values.",
    image: MEDIA.news[4],
    href: "/al-fatah-builders-and-developers-karachi/",
  },
  {
    date: "02 Nov",
    title: "Brishna Heights Booking Guide: 5 Steps for First-Time Buyers",
    copy: "Follow 5 easy steps to evaluate, verify, and make a Brishna Heights booking with greater confidence as a first-time buyer.",
    image: MEDIA.news[5],
    href: "/brishna-heights-booking-guide-for-buyers/",
  },
];

/* 7. Instagram Feed (rendered by the NEW Testimonials slider) -------------- */
export const INSTAGRAM = {
  handle: "alfatahgroupofficial",
  titleLines: ["alfatahgroupofficial", "50 Years of Experience in service."],
  bio: [
    "50 Years of Experience in service.",
    "🏘️ Residential & commercial projects",
    "📌 Al Fatah Icon | Under Construction",
    "For Booking & Details",
    "0311-2276441-3",
  ],
  cta: "Follow on Instagram",
  ctaHref: "https://www.instagram.com/alfatahgroupofficial/",
  posts: [
    {
      caption: "A complete lifestyle, now at an exceptional value.",
      detail:
        "From a private gym and kids' play area to peaceful rooftop spaces, a prayer area, and dedicated basement parking, Al Fatah Icon brings everything you need under one address. Originally priced at PKR 2.41 Crore, now available from just PKR 2.17 Crore.",
      tag: "Al Fatah Icon",
      href: "https://www.instagram.com/p/DdHR3_KCt8h/",
      image: MEDIA.instagram[0],
    },
    {
      caption: "Premium living is all about having more within your space.",
      detail:
        "Own a spacious 4 Bed + Lounge | 1,740 Sq. Ft. apartment at Al Fatah Icon for PKR 2.17 Crore, previously priced at PKR 2.41 Crore.",
      tag: "Al Fatah Icon",
      href: "https://www.instagram.com/reel/DdA2krLhEHK/",
      image:
        "https://res.cloudinary.com/naifkddh/video/upload/so_1,w_900,c_fill,ar_4:5,q_auto,f_jpg/v1795522034/Premium_living_is_all_about_having_more_within_your_space._From_a_rooftop_oasis_and_kids_play.jpg",
    },
    {
      caption: "A home is more than just the space you live in, it's the lifestyle that comes with it.",
      detail:
        "Al Fatah Icon brings together everything you need for comfortable modern living. Discover a lifestyle designed around convenience, comfort, and community. Al Fatah Icon, A Complete Lifestyle.",
      tag: "Al Fatah Icon",
      href: "https://www.instagram.com/reel/Dc6P9foApko/",
      image:
        "https://res.cloudinary.com/naifkddh/video/upload/so_1,w_900,c_fill,ar_4:5,q_auto,f_jpg/v1795522034/A_home_is_more_than_just_the_space_you_live_in_it_s_the_lifestyle_that_comes_with_it.Al_Fatah_I.jpg",
    },
  ],
  contact: {
    location: "Adjacent to Falcon Housing, Near Malir Cantt",
    mapHref: "https://share.google/mLAAaHSiIbbekoLa4",
    phone: "0311-2276441-3",
    phoneHref: "tel:03112276441",
    email: "info@alfatahbuilders.com",
    website: "https://www.alfatahbuilders.com/",
    linktree: "https://linktr.ee/alfatahgroup",
  },
};

/* 8. Membership & Approvals ------------------------------------------------ */
export const APPROVALS = {
  memberHeading: "Member of",
  member: "ABAD",
  memberLogo: "/images/abad-logo.png",
  memberHref: "https://abad.com.pk/",
  membershipNumber: "Membership Number: FM 1731",
  claim: "All Projects Are SBCA Approved.",
  approvalsHeading: "Approvals",
  approvals: [
    { label: "Cantonment Board Malir", logo: "/images/malir-board-logo.png" },
    { label: "NOC Approved", logo: "/images/noc-approved-logo.png" },
  ],
  intro: "Al Fatah Builders & Developers — in service since 1960.",
};

/* 9. Contact Block --------------------------------------------------------- */
export const CONTACT = {
  contactHeading: "Contact Us",
  phones: [
    { label: "021-35899471-5", href: "tel:02135899471" },
    { label: "0321-2496381", href: "tel:03212496381" },
    { label: "0311-2276441-3", href: "tel:03112276441" },
    { label: "0311-2276442", href: "tel:03112276442" },
  ],
  emailHeading: "Email",
  email: "info@alfatahbuilders.com",
  addressHeading: "Booking Address",
  address:
    "PLOT SB 5 & 8, REHMAN TOWN, SECTOR 44, SCHEME 33 UNIVERSITY ROAD, NEAR MALIR CANTT GATE NO 5, KARACHI.",
  mapHref: "https://maps.app.goo.gl/h14X4WW5o9g678cd6",
  formHeading: "Send us a message",
  submit: "Submit Now",
};

/* Final CTA (kept from the base repo) -------------------------------------- */
export const FINAL_CTA = {
  title: "A complete lifestyle,",
  titleEm: "now at an exceptional value.",
  sub: "Originally priced at PKR 2.41 Crore, now available from just PKR 2.17 Crore. Al Fatah Icon — A Complete Lifestyle.",
  cta: "Call Now",
  ctaHref: "tel:+923112276442",
};

/* 10. Footer --------------------------------------------------------------- */
export const FOOTER = {
  lockup: "Al-Fatah — Builders & Developers",
  intro:
    "We are in the service industry since 1960 as a corporate brokerage house at the Karachi stock exchange. In early 2000, we entered the construction sector with 50 years experience of in service.",
  addressHeading: "Our Address",
  addressPhone: "03112276441-3",
  addressPhoneHref: "tel:03112276441",
  email: "info@alfatahbuilders.com",
  address:
    "PLOT SB 5 & 8, REHMAN TOWN, SECTOR 44, SCHEME 33 UNIVERSITY ROAD, NEAR MALIR CANTT GATE NO 5, KARACHI.",
  extraLinksHeading: "Extra Links",
  extraLinks: [
    { label: "About Us", href: "/about-us/" },
    { label: "Services", href: "/services/" },
    { label: "Our Projects", href: "/our-projects/" },
    { label: "Our News", href: "/our-news/" },
    { label: "Contact Us", href: "/contact-us/" },
  ],
  galleryHeading: "Gallery",
  galleryItems: [
    {
      title: "Al Fatah Icon",
      description: "Malir Cantt · 4 Bed + Lounge",
      price: "PKR 2.17 Cr",
      badgeLabel: "Ongoing",
      badgeVariant: "success",
      imageSrc: MEDIA.gallery[0],
      href: "/al-fatah-icon/",
    },
    {
      title: "Business Avenue",
      description: "Karachi · Commercial Landmark",
      price: "Phase I",
      badgeLabel: "Coming Soon",
      badgeVariant: "warning",
      imageSrc: MEDIA.gallery[1],
      href: "/al-fatah-business-avenue/",
    },
    {
      title: "Brishna Heights",
      description: "Gulistan-e-Johar · Residential",
      price: "SBCA",
      badgeLabel: "Approved",
      badgeVariant: "success",
      imageSrc: MEDIA.gallery[2],
      href: "/brishna-heights/",
    },
  ],
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/AlFatahGroupOfficial/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/91136845/" },
    { label: "Instagram", href: "https://www.instagram.com/alfatahgroupofficial/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCI_vB3a-AAX3p4vIzK1J06w" },
    { label: "TikTok", href: "https://www.tiktok.com/@alfatahgroupofficial" },
  ],
  phoneHeading: "Phone Number",
  /* type: "telephone" = landline (rotary icon), "phone" = mobile handset icon */
  phones: [
    { label: "021-35899471-5", href: "tel:02135899471", type: "telephone" },
    { label: "0321-2496381", href: "tel:03212496381", type: "phone" },
    { label: "0311-2276441-3", href: "tel:03112276441", type: "phone" },
    { label: "0311-2276442", href: "tel:03112276442", type: "phone" },
  ],
  bookingHeading: "BOOKING ADDRESS",
  bookingAddress:
    "Plot Sb 5 & 8, Rehman Town, Sector 44, Scheme 33 University Road, Near Malir Cantt Gate No 5, Karachi.",
  bookingMapHref: "https://www.google.com/maps/search/?api=1&query=24.9510035,67.1411539",
  copyright: "Created by technexia.",
  creditLabel: "Created by technexia.",
  creditHref: "https://technexia.com/",
  legal: [
    { label: "Terms", href: "#terms" },
    { label: "Privacy policy", href: "#privacy" },
    { label: "Fair Housing Notice", href: "#fair-housing" },
    { label: "Reasonable Accommodation Notice", href: "#accommodation" },
    { label: "Operating Procedure", href: "#procedure" },
    { label: "Press", href: "#press" },
  ],
};

/* 12. FATAH AI — offline assistant (no API, no key, no network) ------------ */
export const FATAH_AI = {
  name: "Al-Fatah AI",
  status: "Online — instant answers",
  greeting:
    "Assalam-o-Alaikum! I'm Al-Fatah AI. Ask me about our projects, prices, location, approvals or booking a site visit — I'll answer instantly.",
  placeholder: "Type your question…",
  disclaimer:
    "Answers come from Al-Fatah's published information. Final price and availability are confirmed by our sales team.",
  whatsappLabel: "Talk to a human",
  missReply:
    "I don't have an exact answer for that yet. You can try one of the questions below, or speak to our team directly on WhatsApp:",
  chips: ["Prices", "Projects", "Location", "Approvals", "Site visit", "Contact"],
  intents: [
    {
      id: "greeting",
      label: "Greeting",
      keywords: ["hello", "hi", "hey", "salam", "assalam", "asalam", "aoa", "good morning", "good evening", "hy", "salaam"],
      examples: ["hello", "assalam o alaikum"],
      reply:
        "Wa Alaikum Assalam and welcome! Ask me about projects, prices, location, approvals or a site visit — I'll answer straight away.",
    },
    {
      id: "thanks",
      label: "Thanks",
      keywords: ["thanks", "thank", "thankyou", "shukriya", "shukria", "jazak", "jazakallah", "ok", "okay", "great", "perfect"],
      examples: ["thank you", "thanks a lot"],
      reply:
        "You're welcome! If anything else comes up I'm right here. To book a site visit, message our team on WhatsApp.",
    },
    {
      id: "projects",
      label: "Projects",
      keywords: ["project", "projects", "building", "buildings", "tower", "society", "scheme", "icon", "brishna", "business avenue", "avenue", "ongoing", "upcoming", "launch", "portfolio", "developments"],
      examples: ["what projects do you have", "tell me about al fatah icon", "which projects are available"],
      reply:
        "Our current projects:\n• **Al Fatah Icon** — near Malir Cantt, 4 Bed + Lounge, ongoing\n• **Business Avenue** — commercial landmark, Phase I (coming soon)\n• **Brishna Heights** — Gulistan-e-Johar, residential, SBCA approved\n\nTell me which one you'd like details on.",
    },
    {
      id: "prices",
      label: "Prices",
      keywords: ["price", "prices", "pricing", "rate", "rates", "cost", "costing", "budget", "pkr", "crore", "lakh", "payment", "payment plan", "installment", "instalment", "installments", "plan", "plans", "booking amount", "advance", "down payment", "expensive", "afford"],
      examples: ["what is the price", "how much does it cost", "installment plan", "booking amount"],
      reply:
        "Al Fatah Icon is currently offered from **PKR 2.17 Crore** (down from 2.41 Crore). Payment plans and booking amounts vary by unit — the exact figure and availability are confirmed by our sales team.\n\nI can connect you to them on WhatsApp if you'd like a written quote.",
    },
    {
      id: "location",
      label: "Location",
      keywords: ["location", "address", "where", "map", "maps", "google map", "directions", "reach", "near", "nearby", "malir", "scheme", "rehman town", "sector", "situated", "located", "site address"],
      examples: ["where is the project located", "what is the address", "how do i reach the site"],
      reply:
        "Plot SB 5 & 8, Rehman Town, Sector 44, Scheme 33, University Road — near Malir Cantt Gate No 5, Karachi.\n\nGoogle Maps: https://maps.app.goo.gl/h14X4WW5o9g678cd6",
    },
    {
      id: "approvals",
      label: "Approvals",
      keywords: ["approval", "approvals", "approved", "sbca", "noc", "abad", "legal", "legalities", "cantonment", "registered", "document", "documents", "registry", "allotment", "permission"],
      examples: ["is it sbca approved", "what approvals do you have", "is the project legal"],
      reply:
        "All projects are **SBCA approved**. We are a **member of ABAD** (Membership No. FM 1731) and hold Cantonment Board Malir approval with NOC approved status. Our team can share the documents on request.",
    },
    {
      id: "sitevisit",
      label: "Site visit",
      keywords: ["visit", "site visit", "tour", "see the site", "appointment", "timing", "timings", "office hours", "open", "meeting", "meet", "schedule"],
      examples: ["can i visit the site", "what are your office timings", "book a site visit"],
      reply:
        "Site visits are by appointment — our team will walk you through the project in person. Message us on WhatsApp with your preferred day and time and we'll confirm it.",
    },
    {
      id: "contact",
      label: "Contact",
      keywords: ["contact", "phone", "number", "call", "whatsapp", "email", "email address", "mail", "speak", "helpline", "mobile", "telephone", "reach you", "contact us"],
      examples: ["what is your contact number", "how can i contact you", "phone number"],
      reply:
        "You can reach us here:\n• Phone: 0311-2276441-3\n• Landline: 021-35899471-5\n• Email: info@alfatahbuilders.com\n• WhatsApp: +92 311 2276442",
    },
    {
      id: "about",
      label: "About Al-Fatah",
      keywords: ["about", "company", "history", "since", "1960", "experience", "who are you", "al fatah", "alfatah", "director", "trust", "vision", "mission", "background", "established"],
      examples: ["tell me about the company", "how long have you been in business", "who is al fatah"],
      reply:
        "Al Fatah Builders & Developers has been in the service industry since 1960, as a corporate brokerage house at the Karachi Stock Exchange, and entered construction in 2000. Our work is concentrated in Gulistan-e-Johar and DHA — residential and commercial development built on integrity, trust and responsibility.",
    },
    {
      id: "services",
      label: "Services",
      keywords: ["service", "services", "buy", "buying", "sell", "selling", "rent", "rental", "mortgage", "property management", "investment", "invest", "development", "construction", "plot", "flat", "apartment", "commercial"],
      examples: ["what services do you offer", "do you sell plots", "i want to invest"],
      reply:
        "We handle buy, sell, rent, property management, mortgage and development/construction — for both residential and commercial clients. Tell me what you're after and I'll point you in the right direction.",
    },
    {
      id: "units",
      label: "Unit sizes",
      keywords: ["bed", "beds", "bedroom", "bedrooms", "size", "sizes", "sqft", "sq ft", "square", "square feet", "marla", "yard", "floor", "floors", "lounge", "layout", "configuration", "how many rooms"],
      examples: ["what are the unit sizes", "how many bedrooms", "what configurations are available"],
      reply:
        "Al Fatah Icon offers **4 Bed + Lounge** units. Sizes in our other projects vary by floor and unit type — tell me which project interests you and our team will share the exact sizes and available floors.",
    },
    {
      id: "news",
      label: "News",
      keywords: ["news", "blog", "article", "articles", "update", "updates", "latest", "announcement"],
      examples: ["any news", "latest updates", "do you have a blog"],
      reply:
        "Our 'Our News' section carries the latest articles and updates — buying guides, project news and company announcements. Take a look there, or tell me which topic you'd like to know about.",
    },
    {
      id: "gallery",
      label: "Photos",
      keywords: ["photo", "photos", "picture", "pictures", "image", "images", "gallery", "video", "videos", "teaser", "render", "renders", "elevation"],
      examples: ["show me photos", "is there a video", "gallery"],
      reply:
        "The site has elevations, a gallery and the teaser video. If you want photos of a specific project (Icon / Business Avenue / Brishna Heights), tell me which one and our team will send the full set on WhatsApp.",
    },
    {
      id: "human",
      label: "Human handoff",
      keywords: ["human", "agent", "person", "representative", "sales", "salesperson", "advisor", "call me", "callback", "call back", "speak to someone", "talk to someone", "team"],
      examples: ["can i speak to a person", "call me back", "talk to your team"],
      reply:
        "Of course — tap the WhatsApp button below and our team will respond right away, or call us directly on 0311-2276441-3.",
    },
  ],
};

/* 11. Sticky / floating elements ------------------------------------------- */
export const STICKY = {
  whatsappLabel: "WhatsApp us",
  whatsappHref: "https://wa.me/923112276442",
  callLabel: "Call Now",
  callHref: "tel:03112276442",
};
