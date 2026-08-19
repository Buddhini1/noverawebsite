import ukImg from "@/assets/dest-uk.jpg";
import auImg from "@/assets/dest-australia.jpg";
import nzImg from "@/assets/dest-newzealand.jpg";
import aeImg from "@/assets/dest-dubai.jpg";
import euImg from "@/assets/dest-europe.jpg";
import sgImg from "@/assets/dest-singapore.jpg";
import myImg from "@/assets/dest-malaysia.jpg";

export const contact = {
  whatsapp: "+94 77 615 7015",
  whatsappLink: "https://wa.me/message/7SLRL63LLSGZA1",
  email: "info.noverainternational@yahoo.com",
  address: "Niyandagala, Pannipitiya, Colombo, Sri Lanka",
  hours: [
    "Monday – Friday · 9:00 am – 5:30 pm",
    "Saturday · 8:30 am – 3:00 pm",
  ],
  social: [
    { label: "Facebook", href: "https://www.facebook.com/share/1EotTPXJFV/" },
    { label: "Instagram", href: "https://www.instagram.com/novera.international" },
    { label: "LinkedIn", href: "https://linkedin.com/company/novera-in" },
    { label: "TikTok", href: "https://www.tiktok.com/@novera.internatio" },
  ],
};

export const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "10,000+", label: "Programs" },
  { value: "100+", label: "Partner universities" },
  { value: "7", label: "Study destinations" },
];

export const services = [
  {
    slug: "study-visa",
    title: "Study Visa — Free Consultation",
    summary:
      "End-to-end support for Student Visas (university/college), Child Student Visas, and Short-Term Study Visas across all our partner destinations.",
    detail:
      "Our initial consultation for study visa applicants is completely free of charge — sit down with our counsellors, explore your options, and get honest advice on the right country, course, and pathway before you commit to anything.",
  },
  {
    slug: "visit-visa",
    title: "Visit Visa",
    summary:
      "For tourism, family visits, business meetings, conferences, short-term training, or medical visits.",
    detail:
      "We assist with Standard Visitor Visas, Marriage Visitor Visas, Permitted Paid Engagement Visas, and Transit Visas — helping you prepare a well-documented application with strong proof of travel intent and financial standing.",
  },
  {
    slug: "air-ticket",
    title: "Air Ticket Assistance",
    summary: "Convenient, cost-effective flights timed to your course start date.",
    detail:
      "Once your visa is approved, we help you book the most convenient and cost-effective flights to your destination, coordinating travel dates with your course start date, orientation schedule, or accommodation move-in — so you land at the right place, at the right time.",
  },
  {
    slug: "accommodation",
    title: "Accommodation Assistance",
    summary: "Safe, convenient and budget-friendly housing secured before you fly.",
    detail:
      "Whether that's university halls of residence, shared student housing, or private rentals near your campus — you have somewhere to call home from day one.",
  },
];

export const whyChooseUs = [
  {
    title: "Free Study Visa Consultation",
    body: "Sit down with our counsellors at no cost and get honest advice on the right country, course, and pathway.",
  },
  {
    title: "Visa Eligibility Assessment",
    body: "Detailed assessments to determine the best visa route before proceeding with any application.",
  },
  {
    title: "Application Preparation & Documentation",
    body: "Guidance through every stage of form completion, document preparation, and verification.",
  },
  {
    title: "Visa Application Lodgment",
    body: "Professional submission ensuring compliance with current immigration policies.",
  },
  {
    title: "Interview Preparation & Guidance",
    body: "Mock interviews and expert coaching to help you present your case with confidence.",
  },
  {
    title: "Air Ticket & Accommodation Support",
    body: "We don't stop at the visa — we help you book flights and settle into safe, convenient housing before you leave home.",
  },
];

export const processSteps = [
  "Select your destination country and course",
  "Apply to your dream universities",
  "Secure your favorite university offers",
  "Receive your offer letter & start the visa process",
  "Finalize your personal profile & apply for visa",
  "Get your visa ready and prepare to fly!",
];

export const approach = [
  {
    title: "Selection of an Institution",
    body: "We take the time to understand each student's abilities, interests, aptitudes, and goals, then recommend suitable institutions and guide them through every stage of the selection process.",
  },
  {
    title: "Exclusive Personalized Counselling",
    body: "We recognize the challenges students face when planning to study abroad and provide personalized guidance to help them choose courses that align with their academic interests and career aspirations.",
  },
  {
    title: "Assistance with Application Forms",
    body: "A well-prepared application significantly improves the chances of admission. We assist with completing and submitting all required documentation at every stage.",
  },
  {
    title: "Liaising with Institutions for Offer Letters",
    body: "Once we receive your complete academic documentation, we communicate directly with institutions to secure offer letters within the required timelines.",
  },
  {
    title: "Personalized Lodgment of Visa Applications",
    body: "After you secure an offer letter and pay the necessary fees, we assist in preparing and lodging your student visa application.",
  },
  {
    title: "Interview Training",
    body: "Comprehensive interview preparation, including mock interviews and personalized coaching, so you're confident and ready when speaking with visa officers or institutions.",
  },
  {
    title: "Guidance on Part-Time Employment & Post-Study Work",
    body: "We advise on part-time work opportunities available while studying, along with post-study work rights and visa regulations in your destination country.",
  },
];

export type Destination = {
  slug: string;
  name: string;
  flag: string;
  image: string;
  tagline: string;
  intro: string;
  advantages: string[];
  requirements: string[];
  workRights: string[];
  intakes: string;
  extra?: string;
};

export const destinations: Destination[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    image: ukImg,
    tagline: "Historic prestige, global careers",
    intro:
      "The United Kingdom is one of the most distinctive study destinations in the world, offering a vibrant, multicultural environment and some of the world's oldest and most prestigious universities. Studying in the UK equips students with the knowledge and global career skills to succeed internationally, backed by regular academic quality assessments through the Quality Assurance Agency (QAA).",
    advantages: [
      "Over 100 years of reputation as an international education hub",
      "Wide range of courses and specializations",
      "Industry placement opportunities for undergraduate and postgraduate students",
      "Part-time work allowed without separate permission while studying",
      "Graduate Route Visa for post-study work",
      "Globally recognized qualifications",
    ],
    requirements: [
      "GCE O/L, A/L, or equivalent qualification",
      "IELTS 6.0 or above (waiver options available for eligible applicants; conditions apply)",
    ],
    workRights: [
      "Work up to 20 hours/week during academic term",
      "Full-time work during official university vacations",
    ],
    intakes:
      "Main intake September; additional intakes January, February, March, April, May, October",
    extra:
      "Study Options: Foundation Programs · Bachelor's Degrees · Pre-Master's Programs · Master's Degrees · Master's by Research (MRes)",
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    image: auImg,
    tagline: "World-class study in the world's most livable cities",
    intro:
      "Australia is globally recognized for its world-class universities and outstanding study experience, offering an affordable and enriching education in some of the world's most livable cities, including Sydney and Melbourne. With over 1,200 institutions offering 22,000+ courses, Australia ranks third globally for hosting international students.",
    advantages: [
      "High-quality education from globally recognized universities",
      "Diverse, accredited study options across disciplines",
      "Scholarship opportunities for eligible students",
      "Strong work opportunities during and after study",
      "Safe, multicultural society with high living standards",
    ],
    requirements: [
      "Genuine Student (GS) requirement",
      "Proof of financial capacity",
      "English language proficiency (IELTS, PTE, or TOEFL)",
      "Health and character requirements",
    ],
    workRights: [
      "Work up to 24 hours/week during academic sessions",
      "Full-time work during official vacation periods",
      "Temporary Graduate Visa available after completing studies",
    ],
    intakes: "February/March, June/July, October/November",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    image: nzImg,
    tagline: "Top 3% universities, stunning landscapes",
    intro:
      "New Zealand is one of the friendliest and most vibrant countries in the world, offering world-class education at affordable costs amid cosmopolitan cities and stunning natural landscapes. All New Zealand universities rank among the top 3% globally according to the QS World University Rankings.",
    advantages: [
      "World-class education, widely recognized internationally",
      "Affordable compared to the US and Europe",
      "Industry-endorsed programs, especially in engineering and technical fields",
      "Strong demand for graduates due to nationwide skill shortages",
      "Post-study 1–3-year job search visa",
      "Pay tuition fees only after visa approval, ensuring a secure application process",
    ],
    requirements: ["GCE O/L and A/L or equivalent", "IELTS (compulsory)"],
    workRights: ["Up to 20 hours/week during study; 40 hours/week during vacation"],
    intakes: "New Zealand universities offer multiple intakes roughly every two months",
  },
  {
    slug: "dubai-uae",
    name: "Dubai / UAE",
    flag: "🇦🇪",
    image: aeImg,
    tagline: "A modern career hub at the crossroads of the world",
    intro:
      "The United Arab Emirates is a modern, rapidly developing education and career hub in the Middle East, attracting students to cities like Dubai, Abu Dhabi, and Sharjah with their world-class infrastructure and cosmopolitan, multicultural lifestyle.",
    advantages: [
      "Globally recognized qualifications from accredited institutions",
      "Diverse programs in business, engineering, technology, arts, hospitality, and health sciences",
      "Strong career prospects in a thriving regional economy",
      "Multicultural campuses with students from around the world",
      "Strategic location as a gateway to the Middle East, Asia, and beyond",
      "Work and internship opportunities in line with visa regulations",
    ],
    requirements: [
      "Academic qualifications equivalent to GCE O/L & A/L or relevant local certifications",
      "English proficiency (IELTS/TOEFL) not mandatory for most programs",
      "Proof of financial capability is not mandatory for most programs",
    ],
    workRights: [
      "Part-time work permitted (subject to visa conditions) while studying",
      "Internship opportunities with multinational companies",
      "Graduates can pursue roles across business, finance, technology, and healthcare",
    ],
    intakes: "Main intake September; additional intakes January/February, April/May, June/July",
  },
  {
    slug: "europe",
    name: "Europe",
    flag: "🇪🇺",
    image: euImg,
    tagline: "Culture, history and affordable excellence",
    intro:
      "Europe is renowned for its rich history, cultural diversity, and excellence in higher education. From cosmopolitan cities like Paris, Berlin, and Amsterdam to peaceful countryside and alpine landscapes, Europe offers an unmatched blend of academic, cultural, and professional experiences with degrees recognized worldwide.",
    advantages: [
      "World-class education, widely recognized internationally",
      "More affordable than the US, UK, and Australia",
      "Diverse programs across business, engineering, technology, arts, sciences, and humanities",
      "Internship and work opportunities in many countries",
      "Post-study work options in selected countries",
      "Cultural exposure across historic cities and countryside alike",
    ],
    requirements: [
      "High school completion or equivalent (O/L, A/L, or national qualifications depending on country)",
      "English proficiency (IELTS/TOEFL or equivalent — varies by country and university)",
    ],
    workRights: ["Work rights vary by country and visa type — we advise you case by case"],
    intakes:
      "September/October (main intake) and February/March (mid-year intake), varying by country and university",
    extra: "Fee Payment Policy: Pay tuition fees after visa approval in most institutions",
  },
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    image: sgImg,
    tagline: "Asia's gateway to global business",
    intro:
      "Singapore is one of Asia's leading education hubs, sitting at the crossroads of East and West. It's home to world-class universities and business schools, a safe, clean, multicultural environment, and strong links to global industries in finance, technology, and business.",
    advantages: [
      "World-class universities and business schools with strong global rankings",
      "Safe, efficient, highly multicultural environment",
      "Strategic location as a gateway to Asia-Pacific business and finance",
      "Strong direct pathway from graduation into skilled employment",
      "Compact city-state — easy to live, study, and travel within",
    ],
    requirements: [
      "Offer of admission from an approved Singapore institution (university, polytechnic, or approved private institution)",
      "Passport, proof of financial means, and a medical examination as part of the visa process",
      "A Student's Pass (STP) is required for full-time study of more than 30 days, applied through the SOLAR system, typically via your institution",
    ],
    workRights: [
      "Part-time work permitted for up to 16 hours/week during term, subject to conditions",
      "No dedicated post-study work visa — graduates transition directly to an Employment Pass or S Pass based on qualifying salary and role",
    ],
    intakes:
      "Vary by institution — most universities and polytechnics run August/September intakes, with some offering January intakes",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    image: myImg,
    tagline: "Affordable, English-friendly, high approval rates",
    intro:
      "Malaysia is one of the most affordable and student-friendly study destinations in Asia, offering globally recognized qualifications, a multicultural society, and a straightforward, well-structured visa system with a high approval rate.",
    advantages: [
      "Affordable tuition and living costs compared to Western destinations",
      "Multicultural, English-friendly study environment",
      "Wide range of programs, including branch campuses of well-known international universities",
      "Straightforward, centralized visa process through Education Malaysia Global Services (EMGS)",
      "Graduate Pass scheme allowing eligible graduates to remain in Malaysia after completing their degree (currently extended through 2026 for eligible nationalities)",
    ],
    requirements: [
      "Offer/admission from an EMGS-registered institution",
      "Student Pass application processed through EMGS (via your university), including a Visa Approval Letter (VAL/eVAL)",
      "Mandatory medical screening within 7 working days of arrival",
      "Ongoing renewal conditions: minimum CGPA of 2.0 and at least 80% attendance",
    ],
    workRights: [
      "Part-time work for up to 20 hours/week during semester breaks or approved holiday periods, with university and immigration approval",
    ],
    intakes:
      "Malaysian universities typically offer multiple intakes throughout the year, commonly February, July, and September",
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);
