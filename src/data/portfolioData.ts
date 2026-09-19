export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  tech: string[];
  metrics: { label: string; value: string; detail?: string }[];
  bulletPoints: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  badgeCategory: 'AI/ML' | 'Systems & Linux' | 'Core Skills' | 'Data & Analytics';
  skills: string[];
}

export interface LeadershipItem {
  organization: string;
  role: string;
  period: string;
  focus: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  badges: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Bhuvan A B",
    role: "Computer Science & Engineering Student",
    subrole: "Backend Engineering · Full-Stack Development · Applied AI · Problem Solving",
    college: "BMS College of Engineering (BMSCE)",
    location: "Bengaluru, India",
    degree: "B.E., Computer Science & Engineering",
    graduation: "Expected June 2028",
    cgpa: "8.08 / 10",
    email: "bhuvanab.cs24@bmsce.ac.in",
    resumeUrl: "/resume.pdf",
    socials: {
      github: "https://github.com/bhuvanabcs24-maker",
      linkedin: "https://www.linkedin.com/in/bhuvan-a-b-4805a2330/",
      leetcode: "https://leetcode.com/u/BHUVANab2006/",
    },
    bio: [
      "I am a Computer Science & Engineering student at BMS College of Engineering (BMSCE, Expected June 2028, CGPA: 8.08) focused on backend engineering, full-stack systems, applied AI, and core problem solving.",
      "My work centers on building reliable software with deterministic foundations—combining robust REST APIs, modern web interfaces, and applied AI workflows. Rather than treating AI as a black box, I emphasize verifiable architecture, explicit error handling, rigorous testing, and systematic performance optimization."
    ],
  },

  skills: {
    languages: ["C", "Java", "Python", "JavaScript"],
    coreCS: ["Data Structures & Algorithms", "Problem-Solving", "SQL", "DBMS", "System Design"],
    webAndTools: ["REST APIs", "FastAPI", "Next.js", "PostgreSQL", "Git", "Linux"],
    appliedAI: ["Machine Learning", "Neural Networks", "Generative AI", "Prompt Engineering"],
    spokenLanguages: ["English", "Kannada", "Hindi", "Urdu"]
  },

  problemSolving: {
    platform: "LeetCode",
    solvedCount: "100+",
    profileUrl: "https://leetcode.com/u/BHUVANab2006/",
    topics: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    statement: "100+ algorithmic problems solved on LeetCode with continuous practice across core data structures and algorithmic paradigms."
  },

  timeline: [
    {
      year: "2024",
      title: "Foundations & Full-Stack Experimentation",
      description: "Explored fundamental computer science principles, core data structures in C and Java, and modern web application development with React and JavaScript.",
      badges: ["Core CS", "Data Structures", "JavaScript", "C & Java"]
    },
    {
      year: "2025",
      title: "Backend + Databases + AI Exploration",
      description: "Deepened backend systems engineering: relational modeling with PostgreSQL, high-performance async APIs with FastAPI, and early experiments with LLM prompting and vector retrieval.",
      badges: ["FastAPI", "PostgreSQL", "Relational Modeling", "LLM APIs"]
    },
    {
      year: "2026",
      title: "ForgeIQ — AI Manufacturing Intelligence & Commerce OS",
      description: "Architected ForgeIQ: an autonomous shop-floor OS uniting a 7-stage order lifecycle, 2-sec algorithmic quoting, deterministic physical models, 40+ REST endpoints, and 5.5x throughput gain.",
      badges: ["ForgeIQ", "AI Commerce OS", "Deterministic Systems", "5.5x Optimization"]
    },
    {
      year: "2027",
      title: "Software Engineering Interview Preparation + Deeper Systems/AI",
      description: "Deepening algorithmic problem solving (100+ LeetCode problems solved), distributed system design patterns, concurrency models, and resilient AI system architectures.",
      badges: ["LeetCode 100+", "System Design", "Distributed Systems", "Applied AI"]
    }
  ] as TimelineItem[],

  aiLearning: {
    summary: "Earned beginner-level badges across 10 AI learning tracks, developing hands-on understanding of foundational AI concepts and applied model integrations.",
    tracks: [
      { name: "Machine Learning Foundations", description: "Supervised & unsupervised baseline modeling principles." },
      { name: "Natural Language Processing (NLP)", description: "Text preprocessing, embeddings, and token semantics." },
      { name: "Large Language Models (LLMs)", description: "Model capabilities, prompt structures, and grounded generation." },
      { name: "Agentic AI Concepts", description: "Multi-step tool invocation, state preservation, and task decomposition." }
    ]
  },

  projects: [
    {
      id: "forgeiq",
      title: "ForgeIQ",
      subtitle: "Autonomous AI Manufacturing Intelligence & Commerce OS",
      tagline: "Autonomous shop-floor OS uniting a 7-stage order lifecycle, 2-second algorithmic quoting, deterministic physical models, 40+ REST endpoints, and 5.5x throughput acceleration.",
      category: "Full-Stack / Systems / Applied AI",
      tech: ["Python", "FastAPI", "Next.js 15 / React 19", "PostgreSQL", "AI Agents", "Physical Models", "RAG"],
      metrics: [
        { label: "AI Accuracy", value: "96.9%", detail: "Zero numerical hallucinations" },
        { label: "Throughput Gain", value: "5.5x", detail: "860 → 4,589 req/s load-tested" },
        { label: "REST Endpoints", value: "40+", detail: "OpenAPI 3.1 & JWT / RBAC" },
        { label: "Test Suite", value: "109 Pytest + 22 E2E", detail: "8/8 AI production gates" },
        { label: "Production Uptime", value: "99.8%", detail: "Live Vercel + Railway deploy" }
      ],
      bulletPoints: [
        "Architected ForgeIQ as an autonomous AI manufacturing intelligence and commerce OS for precision contract manufacturing job shops.",
        "Engineered deterministic-first hybrid architecture: deterministic physical calculators (ISO 9013 laser speeds, DIN 6935 bend deductions) and multi-agent AI (DFM, Cost, RAG, Scheduler) ensuring 100% zero numerical hallucinations with 96.9% accuracy.",
        "Built real-time executive cockpit & factory telematics with 7-stage order tracking (Receive ➔ Quote ➔ Plan ➔ Manufacture ➔ QC ➔ Dispatch ➔ Get Paid) and automated Razorpay escrow settlement.",
        "Accelerated system throughput 5.5x (860 → 4,589 req/s) via 12 targeted PostgreSQL indexes, in-flight request deduplication, and vector caching.",
        "Developed robust production backend with 40+ REST endpoints, JWT/RBAC security, structured JSON logging with correlation IDs, verified by 109 Pytest and 22 Playwright E2E tests."
      ],
      githubUrl: "https://github.com/bhuvanabcs24-maker/Forge-IQ",
      liveUrl: "https://forge-iq-gold.vercel.app",
      caseStudyUrl: "/forgeiq-case-study"
    },
    {
      id: "qwait",
      title: "QWait Estimator",
      subtitle: "Queue & Wait-Time Management Platform",
      tagline: "QR-based patient check-in, live status tracking, doctor/staff operational dashboard, and venue mapping for healthcare clinics.",
      category: "Full-Stack Web App",
      tech: ["Next.js / React", "Supabase", "QR Check-in", "Live Queue Tracking", "Real-time Dashboards", "Interactive Mapping"],
      metrics: [
        { label: "Check-in Method", value: "QR-Based", detail: "Instant zero-app friction" },
        { label: "Status Mode", value: "Real-Time", detail: "Live queue telematics" },
        { label: "Operational Views", value: "Doctor & Staff", detail: "Multi-role dashboard" },
        { label: "Spatial Context", value: "Venue Mapping", detail: "Floor & zone navigation" }
      ],
      bulletPoints: [
        "Built queue management system for clinics with QR-based check-in and live status tracking for waiting patients.",
        "Designed responsive doctor and staff dashboard providing wait-time estimates and operational visibility.",
        "Implemented interactive venue mapping to streamline patient movement and clinic floor efficiency."
      ],
      githubUrl: "https://github.com/bhuvanabcs24-maker/QueueEstimater",
      caseStudyUrl: "/projects#qwait"
    }
  ] as Project[],

  leadership: [
    {
      organization: "Rotaract Club of BMSCE",
      role: "Member & Social Services Volunteer",
      period: "2024–Present",
      focus: "Community social service initiatives, student welfare activities, and active club member coordination."
    },
    {
      organization: "Drug Free Karnataka",
      role: "Health Initiative Volunteer",
      period: "July 2025",
      focus: "Community youth awareness outreach and support for drug abuse prevention campaigns."
    },
    {
      organization: "UTASV",
      role: "Education Initiative Volunteer",
      period: "April–May 2025",
      focus: "Supported student learning drives and educational resource distribution campaigns."
    }
  ] as LeadershipItem[],

  achievements: [
    {
      title: "FFE Scholarship",
      organization: "Foundation for Excellence",
      date: "December 2024",
      description: "Prestigious merit-cum-means scholarship awarded to academically exceptional engineering students."
    },
    {
      title: "100+ LeetCode Problems Solved",
      organization: "LeetCode",
      date: "Ongoing",
      description: "Consistent practice across Arrays, Trees, Graphs, and Dynamic Programming."
    },
    {
      title: "10 AI Learning Tracks Completed",
      organization: "Industry & Academic Badges",
      date: "Foundational Badges",
      description: "Earned beginner-level badges across Machine Learning, NLP, LLMs, and Agentic AI."
    }
  ],

  certifications: [
    {
      title: "Applied AI Foundations",
      issuer: "OpenAI Academy",
      badgeCategory: "AI/ML",
      skills: ["Applied AI", "Prompt Design", "AI Systems"]
    },
    {
      title: "Generative AI for Everyone",
      issuer: "DeepLearning.AI",
      badgeCategory: "AI/ML",
      skills: ["Generative AI", "LLM Workflows", "Business Impact"]
    },
    {
      title: "Introduction to AI Concepts",
      issuer: "Microsoft",
      badgeCategory: "AI/ML",
      skills: ["AI Principles", "Computer Vision", "Machine Learning"]
    },
    {
      title: "Responsible AI & Risk Management",
      issuer: "IBM SkillsBuild",
      badgeCategory: "AI/ML",
      skills: ["AI Ethics", "Risk Governance", "Bias Mitigation"]
    },
    {
      title: "Red Hat RH104 – Getting Started with Linux Fundamentals",
      issuer: "Red Hat",
      badgeCategory: "Systems & Linux",
      skills: ["Linux CLI", "File Permissions", "Shell Fundamentals"]
    },
    {
      title: "Red Hat RH124 – Red Hat System Administration I",
      issuer: "Red Hat",
      badgeCategory: "Systems & Linux",
      skills: ["Process Management", "Storage Config", "Systemd Services"]
    },
    {
      title: "Data Analytics Job Simulation",
      issuer: "Deloitte Australia (Forage)",
      badgeCategory: "Data & Analytics",
      skills: ["Data Analysis", "Dashboard Insights", "Client Communication"]
    },
    {
      title: "Learning How to Learn",
      issuer: "Coursera",
      badgeCategory: "Core Skills",
      skills: ["Cognitive Chunking", "Focused/Diffuse Thinking", "Memory Retention"]
    }
  ] as Certification[]
};
