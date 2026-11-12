/* =========================================================
   SITE CONTENT — this is the only file you edit day to day.

   HOW TO ADD THINGS
   -----------------
   Experience : copy an object in `experience` and change the fields.
                `hidden: true` keeps an entry in the file but off the page.
   Projects   : copy an object in `projects` and change the fields.
   Skills     : add a string to a group's `items`, or a new group object.
   Paper      : copy an object in `publications`.

   INLINE FORMATTING (works in every `points` / `description` string)
   -----------------------------------------------------------------
   **bold**        *italic*        `monospace`        [label](url)
   Everything is escaped first, so text can never break the page.
   ========================================================= */

window.SITE = {

  profile: {
    name: "Shivam Kr Chaudhary",
    initials: "SC",
    headline: "Software Engineer",
    status: "M.Tech CSE @ NSUT · Teaching Assistant · Placement Coordinator",
    location: "Patna, Bihar, India",
    email: "sk12022001@gmail.com",
    phone: "+91 84364 27198",
    phoneHref: "tel://8436427198",
    summary: "Software engineer building automation systems, backend services and immersive experiences — from Python automation and RPA development at Century Plyboards (I) Ltd. to research in graph learning and multimodal retrieval.",
    roles: ["Engineer", "Developer", "Researcher", "Teacher"]
  },

  links: {
    linkedin: "https://www.linkedin.com/in/Shivam1202/",
    github: "https://github.com/shivamkumar1202",
    instagram: "https://www.instagram.com/Shivam.1202/",
    facebook: "https://www.facebook.com/profile.php?id=100005932754355&sfnsn=wiwspwa&mibextid=RUbZ1f",
    form: "https://forms.gle/KPerMiXvJCk9QgrA7",
    demoVideos: "https://drive.google.com/drive/folders/1H8Q8aQ_NBY_a62vqhfNzNUWNGGQTiAJQ?usp=sharing"
  },

  /* Swap this file whenever a new resume is ready. One line. */
  resume: {
    file: "data/Shivam-Resume.pdf",
    label: "Download CV",
    updated: "2025"
  },

  /* Career trajectory rail under the hero. */
  trajectory: [
    { year: "2020 — 2024", label: "B.Tech CSE" },
    { year: "2024 — 2025", label: "RPA Developer" },
    { year: "2025 — 2027", label: "M.Tech CSE" }
  ],

  stats: [
    { value: 15, suffix: "+", label: "Projects" },
    { value: 130, suffix: "+", label: "Students Taught" },
    { value: 2, suffix: "", label: "Research Papers" }
  ],

  /* ---------------------------------------------------------
     WORK EXPERIENCE
     --------------------------------------------------------- */
  experience: [
    {
      role: "Teaching Assistant",
      org: "Netaji Subhas University of Technology",
      location: "New Delhi, India",
      start: "2025",
      end: "Present",
      current: true,
      points: [
        "Assist with coursework and laboratory sessions for the CSE department as part of the M.Tech programme.",
        "Mentored **100+ students** across tutorials, doubt sessions and evaluation."
      ]
    },
    {
      role: "RPA Developer",
      org: "Century Plyboards (I) Ltd.",
      location: "Kolkata, India",
      start: "Jul 2024",
      end: "Jul 2025",
      current: false,
      points: [
        "Contributed significantly to **Project SWAYAM**, a digital initiative automating SCM processes and MS-Excel report generation using **Python and Machine Learning**.",
        "Automated business communication processes across all branches and stakeholders **pan-India**.",
        "Built a **field reporting solution** for monitoring joint field activities that **reduced field-staff attrition by 27%**.",
        "Proposed IoT-driven ideas to improve production efficiency and quality analysis."
      ]
    },
    {
      role: "Data Science Intern",
      org: "Celebal Technologies",
      location: "Remote",
      start: "Jun 2023",
      end: "Aug 2023",
      current: false,
      points: [
        "Developed and evaluated machine learning models for **real-time stock price prediction**.",
        "Designed an **email spam classification** system using supervised learning.",
        "Deployed interactive ML applications with **Streamlit** for model inference and visualisation."
      ]
    },
    {
      role: "Unity / Unreal Engine Intern (C++/C#)",
      org: "Experimental Technologies Pvt. Ltd.",
      location: "India",
      start: "Aug 2022",
      end: "Oct 2022",
      current: false,
      points: [
        "Developed performance-sensitive gameplay systems in **C++**.",
        "Implemented multi-agent **AI pathfinding** with a focus on correctness and efficiency.",
        "Scaled enemy AI to support **20+ concurrent agents**."
      ]
    },
    {
      /* Kept in the file for later, not rendered. Set hidden: false to publish. */
      role: "Coding Instructor",
      org: "BrightChamps",
      location: "Remote",
      start: "",
      end: "",
      current: false,
      hidden: true,
      points: [
        "Enriched several young minds with the power of programming."
      ]
    },
    {
      /* Kept in the file for later, not rendered. Set hidden: false to publish. */
      role: "Unity / Unreal Developer",
      org: "Hyvarcity Pvt. Ltd.",
      location: "India",
      start: "",
      end: "",
      current: false,
      hidden: true,
      points: [
        "Made MetaOffice, a metaverse office.",
        "Made MetaAuditorium, a virtual movie-theatre experience for multiple platforms.",
        "Developed a VR real-estate showcase mobile application."
      ]
    }
  ],

  /* ---------------------------------------------------------
     EDUCATION
     --------------------------------------------------------- */
  education: [
    {
      degree: "M.Tech — Computer Science & Engineering",
      school: "Netaji Subhas University of Technology",
      location: "New Delhi, India",
      period: "2025 — 2027",
      grade: "8.0 CGPA",
      current: true
    },
    {
      degree: "B.Tech — Computer Science & Engineering",
      school: "Dr. B.C. Roy Engineering College",
      location: "Durgapur, India",
      period: "2020 — 2024",
      grade: "8.71 CGPA",
      current: false
    },
    {
      degree: "Higher Secondary School",
      school: "B.S.F. Senior Secondary Residential School",
      location: "",
      period: "2019",
      grade: "",
      current: false
    }
  ],

  /* ---------------------------------------------------------
     SKILLS — bars keep the site's original percentages;
     groups are the at-a-glance tag cloud.
     --------------------------------------------------------- */
  skills: {
    bars: [
      { label: "C / C++", value: 95 },
      { label: "Python · JavaScript · Java", value: 90 },
      { label: "Software Engineering", value: 85 },
      { label: "Data Structures & Algorithms", value: 85 },
      { label: "Computer Networks", value: 80 }
    ],
    groups: [
      { name: "Languages", items: ["C", "C++", "C#", "Java", "Python", "JavaScript"] },
      { name: "Web", items: ["React", "Next.js", "Node.js", "Tailwind CSS", "HTML / CSS"] },
      { name: "AI / ML", items: ["Machine Learning", "Deep Learning", "GNN", "Federated Learning", "Generative AI", "FAISS"] },
      { name: "Data", items: ["MySQL", "PostgreSQL", "Supabase", "Streamlit"] },
      { name: "Tools", items: ["Git", "GitHub", "Linux", "Arduino", "Unity", "Unreal Engine", ".NET"] }
    ]
  },

  /* ---------------------------------------------------------
     PROJECTS
     --------------------------------------------------------- */
  projects: [
    {
      title: "Blaster",
      year: "2024",
      category: "Games",
      image: "images/opt/proj_2.webp",
      description: "A third-person multiplayer shooter built in **Unreal Engine 5**, designed to handle up to **100 players** with server-side rewind and C++ gameplay systems.",
      tech: ["Unreal Engine 5", "C++", "Multiplayer"],
      links: [
        { label: "Source", href: "https://github.com/ShivamKumar1202/Blaster/" }
      ]
    },
    {
      title: "Spotify Clone",
      year: "2024",
      category: "Web",
      image: "images/opt/proj_1.webp",
      description: "A music player inspired by Spotify, built with **Next.js, React, Tailwind CSS and Supabase**, including Google OAuth and a Postgres-backed library.",
      tech: ["Next.js", "React", "Supabase", "Tailwind CSS"],
      links: [
        { label: "Live demo", href: "https://spotify-clone-1202.vercel.app/" },
        { label: "Source", href: "https://github.com/ShivamKumar1202/spotify-clone/" }
      ]
    },
    {
      title: "YouTube Video Summarizer",
      year: "2025",
      category: "AI / ML",
      image: "images/proj_summarizer.svg",
      description: "A **Generative AI** pipeline that condenses YouTube videos into summaries, using embeddings, **FAISS vector search**, few-shot prompting and context caching, with retrieval by title, video ID or link.",
      tech: ["Generative AI", "FAISS", "Embeddings", "Python"],
      links: [
        { label: "Notebook", href: "https://www.kaggle.com/code/shivamkrchaudhary/youtube-video-summarizer/notebook" }
      ]
    },
    {
      title: "GRAViT",
      year: "2025",
      category: "AI / ML",
      image: "images/proj_gravit.svg",
      description: "**M.Tech thesis.** A graph-based multimodal retrieval pipeline for scientific-paper question answering, investigating **GNN + VLM** integration of textual and visual evidence.",
      tech: ["GNN", "Vision-Language Models", "Retrieval", "PyTorch"],
      links: []
    },
    {
      title: "AI Character",
      year: "2024",
      category: "AI / ML",
      image: "images/opt/proj_3.webp",
      description: "An AI character that holds natural, **real-time conversations** with users, built around an interactive agent loop.",
      tech: ["Conversational AI", "Real-time"],
      links: [
        { label: "Source", href: "https://github.com/ShivamKumar1202/AI-Character/" }
      ]
    },
    {
      title: "MetaOffice",
      year: "2023",
      category: "XR",
      image: "images/opt/proj_4.webp",
      description: "A metaverse office where you can access resources over the internet and hold **virtual meetings** in a shared 3D space.",
      tech: ["Metaverse", "VR", "Unity"],
      links: [
        { label: "Demo video", href: "https://drive.google.com/file/d/1Hyoc0KfRKi90sfwXcquqLBWKyZQNzFTO/view?usp=sharing" }
      ]
    },
    {
      title: "ReactRecipe",
      year: "2024",
      category: "Web",
      image: "images/proj_reactrecipe.svg",
      description: "A **React** recipe-discovery app with search-driven results, API-backed data, and client-side routing and state management for seamless navigation.",
      tech: ["React", "REST API", "Routing"],
      links: []
    },
    {
      title: "GO CRUD API",
      year: "2024",
      category: "Systems",
      image: "images/opt/proj_6.webp",
      description: "A **CRUD API** written in Go, implementing structs and JSON handling as a lightweight alternative to a database-backed service.",
      tech: ["Go", "REST", "JSON"],
      links: [
        { label: "Source", href: "https://github.com/ShivamKumar1202/GO-CRUD-API/" }
      ]
    }
  ],

  /* ---------------------------------------------------------
     RESEARCH & PUBLICATIONS
     No status chips, no metrics — a short description per card.
     --------------------------------------------------------- */
  publications: [
    {
      title: "SoMoA: Leveraging IoT and Machine Learning for Soil Moisture Analysis Across Environments",
      venue: "IEEE",
      description: "An IoT and machine-learning study of soil moisture behaviour across indoor and outdoor environments, using sensor data to model and predict conditions in real time. Published as a peer-reviewed conference paper.",
      tags: ["IoT", "Machine Learning", "Sensors"],
      link: { label: "View on IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11189656" }
    },
    {
      title: "GED-I: Graph Neural Network-Based Federated Intrusion Detection System",
      venue: "Discover Computing",
      description: "A privacy-preserving intrusion detection framework combining graph neural networks with federated learning to secure IoT networks without centralising sensitive data. Manuscript currently under review.",
      tags: ["GNN", "Federated Learning", "Security"],
      link: null
    }
  ],

  /* ---------------------------------------------------------
     ACHIEVEMENTS
     --------------------------------------------------------- */
  achievements: [
    {
      title: "GATE 2025",
      detail: "Qualified in **Computer Science** as well as **Data Science & AI**.",
      meta: "National entrance examination"
    },
    {
      title: "NVIDIA Deep Learning",
      detail: "**Fundamentals of Deep Learning** — Certificate of Competency.",
      meta: "November 2025"
    },
    {
      title: "LeetCode",
      detail: "**Global rank ~13,100** with a contest rating of **1800+**.",
      meta: "Competitive programming"
    },
    {
      title: "Placement Coordinator",
      detail: "Coordinated placement drives, recruiter interactions and student logistics at NSUT for **500+ students**.",
      meta: "Netaji Subhas University of Technology"
    },
    {
      title: "Teaching & Mentoring",
      detail: "Taught **130+ students** across B.Tech instruction and M.Tech teaching-assistant duties.",
      meta: "BrightChamps · NSUT"
    }
  ]
};
