/* ==========================================================================
   Inner pages — content lifted from the live site (alfatahbuilders.com).
   Copy is verbatim from the WP pages; only markup/theme is ours.
   ========================================================================== */

const P = "/images/";

/* ---------------------------------------------------------------- ABOUT --- */
export const ABOUT_PAGE = {
  eyebrow: "About Us",
  title: "Al Fatah Builders & Developers",
  lead:
    "A name built on trust since 1960 — from a corporate brokerage house at the Karachi Stock Exchange to one of Karachi's most trusted names in residential and commercial development.",
  ceo: {
    heading: "Message from CEO",
    quote:
      "“I welcome you all to our official website, here you can have a complete tour of our company. Past projects, ongoing projects our services. And much more.”",
    body: [
      "We are in the service industry since 1960 as a corporate brokerage house at the Karachi Stock Exchange. In early 2000, we entered the construction sector with 50 years of experience in service.",
      "Our main contributions have been in the infrastructural development (residential and commercial) in the areas of Gulistan-e-Johar and DHA at the heart of the Metropolitan City of Karachi. Our clients enjoy services centered on human values, integrity, trust, and an assurance of responsibility all coupled with our expertise in construction, engineering & management.",
      "We feel delighted to say that our engineers, administrators, and professional managers are our biggest asset, who is backed by a highly trained and skillful team. This has made me confident enough to say that, with our versatile, adaptable, and technology-led efforts, we will meet the expected standards of our clients.",
    ],
    name: "Ahmed Mazhar",
    role: "CEO of Al Fatah Builders & Developers",
    image: P + "about-director.webp",
  },
  logos: {
    eyebrow: "Our Projects",
    title: "Four addresses, one standard",
    items: [
      { name: "Brishna Heights", href: "/brishna-heights/", image: P + "logo-brishna.webp" },
      { name: "Al Fatah Pride", href: "/al-fatah-pride/", image: P + "logo-pride.webp" },
      { name: "Al Fatah Arcade", href: "/al-fatah-arcade/", image: P + "logo-arcade.webp" },
      { name: "Al Fatah Icon", href: "/al-fatah-icon/", image: P + "logo-icon.webp" },
    ],
  },
  pillars: [
    {
      label: "Company Vision",
      image: P + "about-vision.webp",
      text:
        "The company's vision is to provide houses for every Pakistani. This is the vision and the aim of the company leadership — every Pakistani family should have his/her own house for the living, for this dream the company is working towards the masses.",
    },
    {
      label: "Company Mission",
      image: P + "about-mission.webp",
      text:
        "AL FATAH Builders & Developers, the mission is to provide a house for every Pakistani. In pursuit of our mission we are catering and targeting masses for our projects, our aim is to deliver the projects with all the basic necessity of life and utilities such as Electricity, Gas, Water, Sewerage and Security.",
    },
    {
      label: "Company Skills",
      image: P + "about-skills.webp",
      text:
        "AL FATAH Builders & Developers is in this business for decades now, we have a legacy behind us, we know the exceptions of this business. Our team makes us unique in this industry — we have the best Architecture, Engineers, Interior Designers, Skilled Labor and Suppliers and Management that makes a dream team altogether.",
    },
  ],
  gallery: [
    P + "work-construction.webp",
    P + "work-interior-1.webp",
    P + "about-elevation.webp",
    P + "work-planning.webp",
    P + "work-corridor.webp",
    P + "work-handover.webp",
  ],
};

/* -------------------------------------------------------------- SERVICES --- */
export const SERVICES_PAGE = {
  eyebrow: "Our Services",
  title: "We provide the best service ever",
  lead:
    "Start your application, request additional information, or schedule a visit today — we are the leaders in the construction industry.",
  intro:
    "We are in the service industry since 1960 as a corporate brokerage house at the Karachi Stock Exchange. In early 2000, we entered the construction sector with 50 years of experience in service. Our main contributions have been in the infrastructural development (residential and commercial) in the areas of Gulistan-e-Johar and DHA at the heart of the Metropolitan City of Karachi. Our clients enjoy services centered on human values, integrity, trust, and an assurance of responsibility all coupled with our expertise in construction, engineering & management.",
  hero: P + "about-elevation.webp",
  items: [
    {
      title: "Construction",
      image: P + "work-construction.webp",
      text: "We are a reliable name in the world of the construction industry, we develop an idea and execute for your dreams.",
    },
    {
      title: "Design",
      image: P + "work-drawing.webp",
      text: "Architectural drawings are the core of any project; we have an excellent and experienced team of architecture for your dream designs.",
    },
    {
      title: "Technical Consultancy",
      image: P + "work-elevation.webp",
      text: "We provide consultancy with our experienced team think tank behind — there are often projects which need consultancy services and we are up for the challenge.",
    },
    {
      title: "Project Management",
      image: P + "work-planning.webp",
      text: "If you need a professional and experienced team that takes your project to smooth execution, we do provide such services.",
    },
    {
      title: "Interior Designing",
      image: P + "work-interior-1.webp",
      text: "Interior designing becomes the necessity of today's modern world architecture; we provide the modern world interior designing.",
    },
    {
      title: "Skilled Labor",
      image: P + "work-finish.webp",
      text: "Skilled labor is the basic requirement of the construction site; we have an excellent team of skilled labor for your service.",
    },
  ],
  cta: { title: "Get in touch with us for free consultation", button: "Get Free Consultation", href: "/contact-us/" },
};

/* -------------------------------------------------------------- PROJECTS --- */
export const PROJECTS_PAGE = {
  eyebrow: "Our Projects",
  title: "Our Projects",
  lead:
    "Our projects reflect our commitment to quality, innovation, and customer satisfaction, creating residential and commercial spaces that inspire and endure.",
  filters: ["All", "Scheme 33", "Up Coming", "DHA", "Gulistan-e-Johar"],
  items: [
    {
      title: "A Commercial Area Phase 2, DHA Karachi",
      image: P + "prj-dha-commercial.webp",
      tag: "DHA",
      href: "/our-projects/",
    },
    {
      title: "C-1-C, Saadi Commercial Lane, Phase 6, DHA, Karachi",
      image: P + "prj-saadi.webp",
      tag: "DHA",
      href: "/our-projects/",
    },
    {
      title: "Al Fatah Arcade at Gulistan-e-Johar",
      image: P + "prj-arcade.webp",
      tag: "Gulistan-e-Johar",
      href: "/al-fatah-arcade/",
    },
    {
      title: "Al Fatah Pride at Gulistan-e-Johar",
      image: P + "prj-pride.webp",
      tag: "Gulistan-e-Johar",
      href: "/al-fatah-pride/",
    },
    {
      title: "Plot SB 01, Rehman Town, Sector 44, Scheme 33 University Road, Near Malir Cantt, Karachi",
      image: P + "prj-scheme33.webp",
      tag: "Scheme 33",
      href: "/brishna-heights/",
    },
    {
      title: "Saba Square, Saba Commercial, Phase 5, DHA, Karachi",
      image: P + "prj-saba.webp",
      tag: "DHA",
      href: "/our-projects/",
    },
  ],
};

/* ------------------------------------------------------ PROJECT DETAILS --- */
export const PROJECT_DETAILS = {
  "al-fatah-business-avenue": {
    slug: "al-fatah-business-avenue",
    title: "Al Fatah Business Avenue",
    kicker: "Premium Commercial Destination in Gulistan-e-Johar",
    status: "Coming Soon",
    lead:
      "785–1150 sqft offices, double-height showrooms, a 42-month easy installment plan and booking starting from just 4%.",
    chips: ["785–1150 sqft Offices", "Double Height Showrooms", "42 Months Easy Installment", "Booking From 4% Only"],
    hero: P + "ba-hero.webp",
    gallery: [
      P + "ba-1.webp",
      P + "ba-5.webp",
      P + "ba-2.webp",
      P + "ba-6.webp",
      P + "ba-3.webp",
      P + "ba-4.webp",
    ],
    body: [
      "Al-Fatah Business Avenue is a contemporary commercial development designed to meet the evolving needs of modern businesses. From startups and growing companies to established enterprises, the project offers flexible office spaces designed for productivity, accessibility, and long-term value.",
      "Located in the heart of Gulistan-e-Jauhar, Karachi, the project will feature modern architecture, a professional business environment, and essential facilities that support a seamless work experience.",
      "With office spaces ranging from 750 – 8500 sq ft, along with commercial showrooms, Al-Fatah Business Avenue presents an opportunity for businesses and investors to become part of a promising commercial destination.",
    ],
    details: [
      ["Location", "Munawar Chowrangi, Gulistan-e-Johar, Block 11, Karachi"],
      ["Parking", "Double Basement Car Parking"],
      ["Reception", "Corporate Reception & Lobby"],
      ["Security", "24/7 Security Guards"],
      ["Surveillance", "24/7 CCTV Surveillance"],
      ["Lifts", "3 Panoramic Lifts"],
      ["Safety", "Fire Fighting System"],
      ["Fitness", "Gymnasium"],
      ["Dining", "Cafeteria"],
      ["Recreation", "Rooftop Recreational Area"],
    ],
    map: "https://maps.google.com/?q=Munawar+Chowrangi+Gulistan+e+Johar+Block+11+Karachi",
  },

  "al-fatah-icon": {
    slug: "al-fatah-icon",
    title: "Al Fatah Icon",
    kicker: "Ongoing Project — Main University Road",
    status: "Under Construction",
    lead:
      "Welcome to Al Fatah Icon, a landmark project by Al Fatah Builders and Developers that sets new standards in modern living and investment opportunities.",
    chips: ["4 & 5 Room Apartments", "Semi Furnished", "1600 sq yards", "Booking In Process"],
    hero: P + "icon-1.webp",
    gallery: [
      P + "icon-1.webp",
      P + "icon-2.webp",
      P + "work-elevation-2.webp",
      P + "icon-3.webp",
      P + "icon-4.webp",
      P + "icon-5.webp",
      P + "icon-6.webp",
    ],
    body: [
      "Al-Fatah Icon features luxury, urban apartments with strong, contemporary structures with unmatched modern architecture. This one-of-a-kind development provides you with magnificent views and accessibility from Main University Road.",
      "Al-Fatah Icon inspires well-being and sophistication and provides you with the dream lifestyle, royal atmosphere, and premium location. The apartments at Al Fatah Icon elevate your elite lifestyle with the thoughtfulness of the layout and the meticulousness of finishes.",
      "While the walls, floors and ceilings befit your taste, these Al Fatah Icon residences ensure that beauty meets functionality with minimum space wastage and maximum efficiency.",
    ],
    facts: [
      ["Type", "4 and 5 Rooms Apartment, Commercial Shops and Showrooms"],
      ["Location", "Plot SB 5, Rehman Town, Main University Road, Near Malir Cantt Gate No 5, Karachi"],
      ["Surface Area", "1600 sq yards"],
      ["Booking", "In Process"],
    ],
    highlights: [
      "4 Years Easy Installment Plan",
      "Semi Furnished Apartments",
      "Safe & Secure Gated Project",
      "Basement Parking",
      "3 Imported Elevators",
      "Standby Generators",
    ],
    facilities: [
      "Fire fighting system",
      "Reception service",
      "Intercom service",
      "Rooftop garden",
      "American kitchen",
      "Wardrobes",
      "Wooden floor",
      "Fancy lights and fans",
      "False ceiling",
    ],
    apartmentTypes: ["Type A", "Type A1", "Type A2", "Type A3", "Type A4", "Type B", "Type B1", "Type B2"],
    map: "https://maps.app.goo.gl/vBUr2AWnFGjJzn9u6",
  },

  "brishna-heights": {
    slug: "brishna-heights",
    title: "Brishna Heights",
    kicker: "Past Project — Scheme 33, University Road",
    status: "Completed",
    lead:
      "Al Fatah Builders & Developers proudly present the new project for our loyal customers with the name of Brishna Heights.",
    chips: ["4 to 5 Room Apartments", "720 sq yards", "Gated Community", "Booking In Process"],
    hero: P + "br-1.webp",
    gallery: [
      P + "br-1.webp",
      P + "br-6.webp",
      P + "br-2.webp",
      P + "br-7.webp",
      P + "br-3.webp",
      P + "br-4.webp",
      P + "br-5.webp",
    ],
    body: [
      "The project is located in the heart of the city on a prime location Plot SB 01, Rehman Town, Sector 44, Scheme 33 University Road, Near Malir Cantt, Karachi.",
      "The project is exclusively for residential purposes and has all the basic amenities and features. The project lies under the secure Malir Cantt jurisdiction plus the project is a fully gated community which adds on the security feature to make it more safe and secure for the residents of the project.",
      "The project is equipped with all the amenities such as Electricity, Gas, Water and Sewerage.",
    ],
    facts: [
      ["Type", "4 to 5 Rooms Apartment, Commercial showrooms"],
      ["Location", "Plot SB 01, Rehman Town, Sector 44, Scheme 33 University Road, Near Malir Cantt, Karachi"],
      ["Surface Area", "720 sq yards"],
      ["Booking", "In Process"],
    ],
    highlights: [
      "Secure location of University Road near Malir Cantt, adjacent to Falcon Housing Society",
      "Individual Car Parking",
      "Backup Generator",
      "24 Hours CCTV Surveillance",
      "Imported Fast Elevators",
      "Reception Services",
      "Community Launch",
      "Located at Scheme 33",
      "Every apartment has a roadside view",
      "West Open",
    ],
    facilities: [
      "Wooden flooring in drawing room",
      "Red meranti solid wood frames",
      "False ceiling",
      "Modern fittings",
      "Grilling",
      "Gated Community",
      "Imported Lifts",
      "Flats: 4 to 5 Rooms Luxury Spacious Apartments",
    ],
    apartmentTypes: ["Type A – Daisy", "Type A1 – Orchid", "Type B – Tulip", "Type B1 – Violet"],
    map: "https://maps.google.com/?q=Rehman+Town+Sector+44+Scheme+33+University+Road+Karachi",
  },

  "al-fatah-pride": {
    slug: "al-fatah-pride",
    title: "Al Fatah Pride",
    kicker: "Past Project — Gulistan-e-Johar",
    status: "90% Work Done",
    lead:
      "Al Fatah Builders & Developers proudly present the new project for our loyal customers with the name of Al Fatah Pride: Most Luxurious Apartments.",
    chips: ["4 to 5 Room Apartments", "432 sq yards", "Basement Parking", "90% Work Done"],
    hero: P + "pr-1.webp",
    gallery: [P + "pr-1.webp", P + "pr-4.webp", P + "pr-2.webp", P + "pr-5.webp", P + "pr-3.webp"],
    body: [
      "The Project is located in the heart of the city on a prime location of Al Fatah Pride, SB 21, Block 1, Gulistan-e-Jauhar, Main University Road, Opposite NED University, Karachi.",
      "The project is exclusively for residential purposes and has all the basic amenities and features.",
    ],
    facts: [
      ["Type", "4 to 5 Rooms Apartment, Commercial Shops and Showrooms"],
      ["Location", "Plot SB 21, Block 1, Gulistan-e-Jauhar, Main University Road, Opposite NED University, Karachi"],
      ["Surface Area", "432 sq yards"],
      ["Booking", "In Process"],
    ],
    highlights: [
      "Shops & Showrooms with Basement Parking — perfect for brands and banks",
      "Flats: 4 to 5 Rooms",
      "Area: 432 sq yards",
      "Start Date: 1st October 2018",
      "Location: Gulistan-e-Johar",
    ],
    facilities: [
      "Luxurious Apartments",
      "Basement Car Parking",
      "24 Hours CCTV Surveillance",
      "Stand by Generator",
      "West Open",
      "Near By Safari Park / Askari Park",
      "90% Work Done",
      "All Amenities Available",
    ],
    map: "https://maps.google.com/?q=SB+21+Block+1+Gulistan-e-Jauhar+Main+University+Road+Karachi",
  },

  "al-fatah-arcade": {
    slug: "al-fatah-arcade",
    title: "Al Fatah Arcade",
    kicker: "Past Project — Gulistan-e-Johar, Block 4",
    status: "Finished",
    lead:
      "Al Fatah Builders & Developers proudly present the new project for our loyal customers with the name of Al Fatah Arcade: Most Luxurious Apartments.",
    chips: ["4 Room Apartments", "400 sq yards", "Ready for Possession", "Finished"],
    hero: P + "ar-1.webp",
    gallery: [P + "ar-1.webp", P + "ar-4.webp", P + "ar-2.webp", P + "ar-5.webp", P + "ar-3.webp", P + "ar-6.webp"],
    body: [
      "The Project is located in the heart of the city on a prime location of Gulistan-e-Johar, Block 4, Karachi.",
      "The project is exclusively for residential purposes and has all the basic amenities and features.",
    ],
    facts: [
      ["Type", "4 Rooms Apartment, Commercial Shops and Showrooms"],
      ["Location", "Plot SB 8, Block 4, Gulistan-e-Jauhar, Main University Road, Karachi"],
      ["Surface Area", "400 sq yards"],
      ["Status", "Finished"],
      ["Booking", "In Process"],
    ],
    highlights: [
      "Location: Gulistan-e-Johar, Block 4",
      "Near Mosamiyat",
      "Project Type: Flats and Shops",
      "Flats: 4 Rooms",
      "Surface Area: 400 sq yards",
    ],
    facilities: [
      "Luxurious Apartments",
      "Huge Front & Back Car Parking",
      "24 Hours CCTV Surveillance",
      "Stand by Generator with ATS Installed",
      "Near By Safari Park",
      "All Amenities Available",
      "Hi speed lift",
      "Ready for Possession",
    ],
    map: "https://maps.google.com/?q=Block+4+Gulistan-e-Jauhar+Main+University+Road+Karachi",
  },
};

export const PROJECT_ORDER = [
  "al-fatah-business-avenue",
  "al-fatah-icon",
  "brishna-heights",
  "al-fatah-pride",
  "al-fatah-arcade",
];

/* ------------------------------------------------------------------ NEWS --- */
export const NEWS_PAGE = {
  eyebrow: "Our News",
  title: "News Feed",
  lead: "Market insight, project updates and buyer guides from the Al Fatah team.",
  filters: ["All", "Al Fatah Icon", "Brishna Heights", "Al Fatah Business Avenue"],
  items: [
    {
      date: "11 Nov",
      cat: "Al Fatah Icon",
      title: "Apartments With Rooftop Garden: 7 Proven Benefits",
      excerpt: "City living brings convenience, but it can also feel crowded and loud. Many families miss…",
      image: P + "news-rooftop.webp",
      href: "/our-news/",
    },
    {
      date: "06 Nov",
      cat: "Al Fatah Icon",
      title: "Al-Fatah Builders and Developers Karachi: 5 Powerful Goals",
      excerpt: "A home is more than walls and a roof. It is safety, routine, and a…",
      image: P + "prj-overview.webp",
      href: "/our-news/",
    },
    {
      date: "02 Nov",
      cat: "Brishna Heights",
      title: "Brishna Heights Booking Guide: 5 Steps for First-Time Buyers",
      excerpt: "Buying an apartment for the first time can feel exciting, but it also requires careful…",
      image: P + "br-6.webp",
      href: "/our-news/",
    },
    {
      date: "29 Oct",
      cat: "Brishna Heights",
      title: "Brishna Heights Price and Payment Plan: 7 Smart Tips to Make the Best Investment!",
      excerpt: "Buying an apartment is a major financial decision, so buyers should understand the price and…",
      image: P + "news-typeab-real.webp",
      href: "/our-news/",
    },
    {
      date: "26 Oct",
      cat: "Al Fatah Icon",
      title: "Al Fatah Icon Commercial Shops: 5 Secrets Smart Investors Can't Afford to Miss!",
      excerpt: "Commercial property can be an important choice for business owners and investors who want a…",
      image: P + "work-elevation.webp",
      href: "/our-news/",
    },
    {
      date: "23 Oct",
      cat: "Al Fatah Icon",
      title: "Al Fatah Icon Floor Plans: 8 Hidden Details You Must Check Before Buying!",
      excerpt: "A floor plan decides how your family lives every day. Two apartments of the same…",
      image: P + "work-corridor.webp",
      href: "/our-news/",
    },
    {
      date: "22 Oct",
      cat: "Brishna Heights",
      title: "Brishna Heights Floor Plans: 6 Layout Factors That Could Make or Break Your Purchase!",
      excerpt: "The floor plan is the first thing a smart buyer should study. It decides how…",
      image: P + "news-floorplan.webp",
      href: "/our-news/",
    },
    {
      date: "19 Oct",
      cat: "Brishna Heights",
      title: "Brishna Heights 4-Room vs 5-Room: 6 Factors That Could Change Your Decision!",
      excerpt: "Choosing the right apartment is an important family decision. Home size affects comfort, privacy, storage…",
      image: P + "work-interior-4.webp",
      href: "/our-news/",
    },
    {
      date: "12 Oct",
      cat: "Al Fatah Icon",
      title: "Al Fatah Icon Construction Progress: 7 Signs Your Investment Is Taking Shape!",
      excerpt: "Buying an apartment under construction takes trust, and trust grows when you can see real…",
      image: P + "news-progress-real.webp",
      href: "/our-news/",
    },
    {
      date: "09 Oct",
      cat: "Al Fatah Icon",
      title: "Al Fatah Icon Booking Documents: 6 Hidden Details Every Buyer Should Know!",
      excerpt: "Booking documents decide ownership, terms, payments and buyer details — check them before you sign.",
      image: P + "news-docs-real.webp",
      href: "/our-news/",
    },
    {
      date: "26 Sep",
      cat: "Al Fatah Icon",
      title: "Al Fatah Icon Type A vs Type B Apartments: What Actually Changes",
      excerpt: "Two layouts, one address — here is how the Type A and Type B apartments differ in daily use.",
      image: P + "work-drawing.webp",
      href: "/our-news/",
    },
    {
      date: "20 Sep",
      cat: "Al Fatah Business Avenue",
      title: "What Is The Best Office Location In Karachi?",
      excerpt: "Access, parking and footfall decide an office address more than rent does. Here is how to judge.",
      image: P + "work-office.webp",
      href: "/our-news/",
    },
  ],
};

/* --------------------------------------------------------------- CONTACT --- */
export const CONTACT_PAGE = {
  eyebrow: "Contact Us",
  title: "Let's talk about your next home",
  lead: "To discuss us about work with us you can contact us — or send us a message and our team will get back to you.",
  email: "info@alfatahbuilders.com",
  phones: ["021-35899471-5", "0321-2496381", "0311-2276441-3", "0311-2276442"],
  address:
    "Plot SB 5 & 8, Rehman Town, Sector 44, Scheme 33 University Road, Near Malir Cantt Gate No 5, Karachi.",
  mapHref: "https://www.google.com/maps/search/?api=1&query=24.9510035,67.1411539",
  hours: "9:00 a.m. – 6:00 p.m",
  hoursDays: "Monday – Sunday",
};

/* ----------------------------------------------------------------- TERMS --- */
export const TERMS_PAGE = {
  eyebrow: "Legal",
  title: "Terms & Conditions",
  effective: "Effective Date: 27 Dec 2025",
  intro:
    "Welcome to Al Fatah Builders. By accessing or using our website alfatahbuilders.com, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.",
  sections: [
    {
      heading: "1. Nature of Business",
      body: "Al Fatah Builders is a real estate development company operating in Pakistan. The information provided on this website relates to property development projects, residential and commercial units, project plans, layouts and specifications, and booking and inquiry services. No physical goods or consumer products are sold or shipped through this website.",
    },
    {
      heading: "2. Information Accuracy",
      body: "All project details, prices, layouts, availability and timelines displayed on the website are indicative and subject to change without prior notice. Final terms are governed by booking forms, allotment letters, sale agreements and applicable laws of Pakistan.",
    },
    {
      heading: "3. No Online Purchase or Checkout",
      body: "This website does not support direct online purchases, shipping or product delivery. Any payment, booking or transaction is handled offline through official documentation and authorised representatives.",
    },
    {
      heading: "4. Intellectual Property",
      body: "All content including text, images, floor plans, logos and designs are the property of Al Fatah Builders and may not be copied, reused or distributed without written permission.",
    },
    {
      heading: "5. Limitation of Liability",
      body: "Al Fatah Builders shall not be held liable for any reliance placed on website content without formal written confirmation, technical issues, downtime or errors, and third-party links or external content.",
    },
    {
      heading: "6. Governing Law",
      body: "These Terms & Conditions are governed by the laws of the Islamic Republic of Pakistan.",
    },
    {
      heading: "7. Shipping & Delivery",
      body: "Al Fatah Builders does not sell or ship physical goods. All services relate to real estate development and property transactions, which do not involve shipping, delivery or logistics. No shipping services are offered, no delivery timelines apply and no shipping charges exist.",
    },
    {
      heading: "8. Return & Refund Policy",
      body: "Due to the nature of real estate transactions, properties, bookings and allotments are not returnable and no “returns” apply as no physical goods are sold. Refunds, if any, are governed strictly by the terms mentioned in the official booking form or sale agreement. Any cancellation or refund request is subject to project-specific rules, applicable documentation and local property laws in Pakistan. Al Fatah Builders reserves the right to approve or reject any cancellation or refund request based on contractual terms.",
    },
    {
      heading: "9. Contact Information",
      body: "For official inquiries: info@alfatahbuilders.com · 021-35899471-5 · 0321-2496381 · 0311-2276441-3 · 0311-2276442.",
    },
  ],
};
