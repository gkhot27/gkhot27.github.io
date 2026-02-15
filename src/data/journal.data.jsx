export const journalEntries = [
  {
    date: "February 14th, 2026",
    title: "CS 365 Object Oriented Programming and Why It’s My Favorite Class",
    category: "Learning",
    useHtml: true,
    content: `
  CS 365 has officially become my favorite class this semester. I didn’t expect to enjoy Object Oriented Programming this much, but something about breaking problems into clean, structured designs just clicks for me. It feels like building systems instead of just writing code.
  
  We’ve been diving deep into core OOP concepts like classes, objects, inheritance, polymorphism, encapsulation, and abstraction. At first these sounded like textbook buzzwords, but now I actually see how they shape real applications. Every time I refactor something using better design, it feels oddly satisfying.
  
  We’re also starting to look at design patterns and how experienced engineers structure scalable systems. That part has been especially interesting because I can connect it directly to the backend projects I’m building outside class. It’s like seeing the “why” behind clean architecture instead of just copying patterns from Stack Overflow.
  
  I’m using this page to document everything I learn, and I plan to keep updating it as the semester continues. As we get into more advanced topics like SOLID principles, testable code, and system design ideas, I’ll keep adding notes and reflections here. This class is definitely shaping how I think about writing software.
  
  <strong>Notion notes from this class:</strong><br />
  <a href="https://www.notion.so/UNDERSTANDING-OOPS-from-basic-2f3cad58afd980128498f67e581531fe" target="_blank" rel="noreferrer">
  UNDERSTANDING OOPS from basic
  </a>
      `,
    tags: [
      "CS 365",
      "Object Oriented Programming",
      "OOP",
      "Design Patterns",
      "Software Design",
      "Computer Science",
      "Favorite Class"
    ]
  },
  
  {
    date: "February 13th, 2026",
    title: "Strengthening My Soft Skills: Communication & Productive Meetings",
    category: "Learning",
    useHtml: true,
    content: `
  For a long time, I’ve focused mostly on technical skills  coding, backend systems, databases, AI  and I slowly realized something important: being technically strong isn’t enough if I can’t communicate ideas clearly or lead discussions effectively.
  
  One of my weaknesses has been translating complex technical thinking into structured, easy-to-follow communication. I can think through systems deeply, but explaining them clearly — especially in meetings — is a different skill. So I decided to work on it intentionally.
  
  I completed two LinkedIn Learning certifications to strengthen that side of myself:
  
  <strong>1. Critical Thinking for More Effective Communication</strong><br />
  This course helped me structure arguments more logically, question assumptions, and communicate ideas in a clearer and more organized way. It made me more aware of how I present technical concepts in conversations and how small framing changes can improve clarity. (Completed Feb 11, 2026 — 47 min)<br />
  <a href="/certificates/critical-thinking-communication.pdf" target="_blank" rel="noreferrer">View certificate (PDF)</a><br /><br />
  
  <strong>2. Leading Productive Meetings</strong><br />
  This course focused on designing meetings with clear goals, agendas, and action items instead of letting them drift. I learned how to contribute more intentionally and how to help keep discussions aligned with outcomes. (Completed Feb 13, 2026 — 1 hour)<br />
  <a href="/certificates/leading-productive-meetings.pdf" target="_blank" rel="noreferrer">View certificate (PDF)</a><br /><br />
  
  Even though these aren’t “technical” certifications, they directly affect how I operate in team environments especially when discussing architecture decisions, debugging collaboratively, or presenting ideas.
  
  I’m starting to understand that engineering isn’t just about writing code. It’s also about thinking clearly, communicating effectively, and helping move conversations in the right direction.
      `,
    tags: [
      "Soft Skills",
      "Communication",
      "Critical Thinking",
      "Leadership",
      "Professional Development",
      "LinkedIn Learning"
    ]
  }
  ,
  
  {
    date: "January 3rd, 2026",
    title: "Crash Course on PostgreSQL – Strengthening My Database Foundations",
    category: "Learning",
    useHtml: true,
    content: `
  This week I completed a crash course on PostgreSQL to strengthen my understanding of relational databases. I wanted to make sure I wasn’t just using databases in projects, but actually understanding what’s happening underneath.
  
  The course covered core concepts like tables, primary and foreign keys, relationships, joins, indexing, normalization, and writing efficient SQL queries. I practiced creating schemas, inserting and updating data, and running different types of joins to better understand how relational data connects.
  
  One of the biggest takeaways for me was understanding how query optimization works and why indexes matter for performance. It also helped me connect the dots between what ORMs like EF Core do behind the scenes and the actual SQL being executed.
  
  Overall, this course helped me feel much more confident working directly with relational databases, especially PostgreSQL, and it definitely supports the backend systems I’m building.
  
  <strong>Course Link:</strong><br />
  <a href="https://www.youtube.com/results?search_query=crash+course+postgresql" target="_blank" rel="noreferrer">
  Crash Course on PostgreSQL (YouTube)
  </a>
      `,
    tags: [
      "PostgreSQL",
      "Databases",
      "SQL",
      "Backend Development",
      "Relational Databases",
      "Learning"
    ]
  },  
  {
    date: "January 26th, 2026",
    title: "Building a Multi-Tenant API + Integration Tests",
    category: "Backend",
    useHtml: true,
    content: `
This week I worked on building an enterprise-style multi-tenant API using ASP.NET Core and EF Core. The main idea was to understand how SaaS systems keep tenant data isolated while still sharing the same database.

I used EF Core global query filters to automatically filter data by TenantId and IsDeleted, so each tenant only sees their own records. I also implemented admin endpoints that use IgnoreQueryFilters() to access data across tenants when needed.

The most interesting part was writing integration tests with WebApplicationFactory. The real API runs in memory with an in-memory database, and each test class gets its own seeded database. This helped me verify tenant isolation, admin access, and soft delete behavior end-to-end — from HTTP request to database query.

Overall, this project helped me understand multi-tenancy in a much more practical and system-level way.

<strong>Check out the breakdown and repository below:</strong><br />
<a href="https://www.notion.so/Multi-tenancy-applications-308cad58afd980dfb1c4e8bcbad19174" target="_blank" rel="noreferrer">Multi-tenancy applications (Notion)</a>


<a href="https://github.com/gkhot27/Multi-tenant-application" target="_blank" rel="noreferrer">Multi-tenant application (GitHub)</a>
    `,
    tags: [
      "Multi-Tenancy",
      "ASP.NET Core",
      "EF Core",
      "Integration Testing",
      "SaaS",
      "Backend Development"
    ]
  }
  ,  
  {
    date: "January 6, 2026",
    title: "Week 2 of the 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents'",
    category: "Learning",
    content: `
  This week in the AI Engineer Core Track, I spent most of my time building hands-on AI applications using Gradio. One of the coolest parts was realizing how easy it is to create and deploy a working website without any frontend experience. I built and deployed a live chatbot using Hugging Face, which helped me understand the full process from idea to deployment.

I learned how to build interactive chat and data science UIs, use callbacks, stream LLM responses, and format outputs with Markdown. I also experimented with using different models like GPT and Claude, and got an introduction to system prompts, multi-shot prompting, and RAG. Toward the end of the week, I covered how LLM tool calling and agent workflows actually work, which made the whole system feel a lot less “magical” and more practical.

Fun to build and definitely something I want to keep improving.

Feel free to check out the live site here: https://gkhot-raj-chatbot.hf.space/
    `,
    tags: [
      "LLM",
      "Gradio",
      "Hugging Face",
      "AI Projects",
      "Prompt Engineering",
      "Chatbots",
      "RAG",
      "AI Agents"
    ]
  }
  ,
  {
    date: "December 29, 2025",
    title: "Week 1 of the 'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents' course",
    category: "Learning",
    content: `In Week 1, I explored how large language models like GPT and Llama can be applied to real business use cases such as content creation and technical documentation. I focused on experimenting through prototyping in a notebook environment and improved my prompting skills by building a tool that answers technical questions. The week emphasized learning through experimentation, community collaboration, and set the stage for upcoming challenges like building a brochure generator and a personalized AI tutor.`,
    tags: ["LLM", "Prompt Engineering", "GPT", "Llama", "AI Applications"],
  },

  {
    date: "December 17, 2025",
    title: "AI Web Scraper & Summarizer",
    category: "Machine Learning",
    content: `Experimenting with LLM-powered web scraping. I've built a small tool that takes any URL, scrapes the main content, and uses an LLM to generate a concise one-sentence summary. It's a great way to quickly understand what a page is about without reading the whole thing. Try it out below!`,
    tags: ["LLM", "Web Scraping", "AI", "Node.js"],
    id: "ai-scraper"
  },
  {
    date: "September 12, 2025",
    title: "Building a Portfolio with React & Three.js",
    category: "Development",
    content: `Today I completed the interactive 3D portfolio with React Three Fiber. The holographic objects are rendered smoothly with custom materials and animations. The experience slider for work history turned out great with smooth transitions.`,
    tags: ["React", "Three.js", "Portfolio", "Animation"],
  },
  {
    date: "October 20, 2025",
    title: "Deep Learning Model Training",
    category: "Machine Learning",
    content: `Started training a new CNN model for image classification. After data augmentation and hyperparameter tuning, achieved 94% accuracy on the validation set. Looking forward to deploying this to production soon.`,
    tags: ["Python", "PyTorch", "CNN", "Deep Learning"],
  },
  {
    date: "August 12, 2025",
    title: "FastAPI Microservices Architecture",
    category: "Backend",
    content: `Redesigned the authentication microservice with JWT refresh tokens and role-based access control. Implemented comprehensive logging and monitoring. API response time improved by 35% after optimization.`,
    tags: ["FastAPI", "MongoDB", "Microservices", "API Design"],
  },
  {
    date: "November 15, 2025",
    title: "Computer Vision Color Detection",
    category: "Computer Vision",
    content: `Worked on lighting-robust color detection using HSV and Lab color spaces. Achieved 97% accuracy even under challenging lighting conditions with CLAHE preprocessing. The model is now production-ready.`,
    tags: ["OpenCV", "Python", "Color Detection", "Image Processing"],
  },
  {
    date: "November 11, 2025",
    title: "Discovering and Working Through the OpenCV (cv2) Library in Python",
    category: "Computer Vision",
    content: `Learned and applied core computer vision techniques using the OpenCV (cv2) library in Python. Implemented image preprocessing pipelines including grayscale conversion, thresholding, and filtering. Applied edge detection methods such as Canny and Sobel, performed image segmentation using contours and masking, and worked with morphological operations to improve feature extraction. for reference, I used this tutorial: https://www.youtube.com/watch?v=eDIj5LuIL4A`,
    tags: ["OpenCV", "cv2", "Image Processing", "Edge Detection", "Image Segmentation", "Python"],
  },
  {
    date: "November 10, 2025",
    title: "Exploring WebSockets for Real-time Data",
    category: "Backend",
    content: `Implemented WebSocket connections in FastAPI for real-time data streaming. Built a message persistence layer with MongoDB. The system now handles 1000+ concurrent connections efficiently.`,
    tags: ["FastAPI", "WebSockets", "MongoDB", "Real-time"],
  },
  
];
