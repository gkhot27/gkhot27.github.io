export const journalEntries = [
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
    date: "November 10, 2025",
    title: "Exploring WebSockets for Real-time Data",
    category: "Backend",
    content: `Implemented WebSocket connections in FastAPI for real-time data streaming. Built a message persistence layer with MongoDB. The system now handles 1000+ concurrent connections efficiently.`,
    tags: ["FastAPI", "WebSockets", "MongoDB", "Real-time"],
  },
  
];
