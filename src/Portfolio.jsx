// Portfolio.jsx - About-first layout with Experience tab + Experience Slider w/ "Indian man" buttons
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ============================================================
   0) EDIT ME: Work Experience data
   - Add/modify roles here. The slider renders from this list.
============================================================ */
const EXPERIENCES = [
  {
    company: "Hack4Impact UTK",
    title: "Software Developer",
    period: "October 2025 - Present",
    bullets: [
      "Developed automated data-processing pipelines and integrated KPI calculations to deliver continuous, real-time reporting and actionable insights for transit operations.",
      "Developed responsive Next.js + TypeScript interfaces connected to backend APIs and PostgreSQL for real-time visualization.",
      "Database optimization: Streamlined data workflows using Drizzle ORM, improving query performance and pipeline reliability.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Git"],
  },

  {
    company: "Digit7",
    title: "Software Engineer Intern (Backend and Computer Vision)",
    period: "Jun 2024 - Aug 2024",
    bullets: [

      "Built FastAPI microservices with JWT auth and role-based access.",
      "Designed MongoDB pipelines; reduced query latencies",
      "Dockerized services and CI workflows; deployed to Azure.",
      "Built a color detection model independent of lighting using OpenCV and Lab color space, achieving 97% accuracy on the test dataset",
      "Enhanced image quality with CLAHE preprocessing and integrated edge detection, improving classification recall by 12%",
      "Applied advanced edge detection and image segmentation techniques to strengthen boundary recognition and increase overall model robustness",

    ],
    tech: ["Python","FastAPI", "MongoDB", "Docker", "Azure", "PyTest"],
  },

  {
    company: "UTK - Research",
    title: "Undergrad Research Assistant",
    period: "Jan 2025 - Present",
    bullets: [
      "Explored signal processing to reduce mastitis detection time.",
      "Preprocessed datasets, ran ML experiments, plotted metrics.",
      "Built evaluation pipelines in Python/Matplotlib.",
    ],
    tech: ["Python", "NumPy", "SciPy", "Matplotlib"],
  },

  {
    company: "Academy Sports + Outdoors",
    title: "Fullfillment Associate",
    period: "Apr 2022 - Dec 2022",
    bullets: [
      "Optimized warehouse logistics, increasing operational efficiency",
      "Utilized Excel to manage inventory and track inventory for over 10,000 SKUs, resulting in reduction of misplacement in inventory managment",
      "Assisted in training new employees on warehouse procedures and safety protocols, contributing to a safer and more efficient work environment",
    ],
    tech: ["Excel", "Inventory Management"," Teamwork"," Communication","Problem-Solving"],
  },

  {
    company: "Baskin Robbins",
    title: "Sales Associate",
    period: "Jan 2022 - Apr 2022",
    bullets: [
      "Scooped and served ice cream to customers while communicating effectively to ensure customer satisfaction",
      "Handled cash register transactions accurately and efficiently, maintaining a balanced cash drawer",
    ],
    tech: ["Teamwork"," Communication"],
  },

];

/* ----------------------------------------------
   UTIL: Smooth scroll to section id
-----------------------------------------------*/
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ----------------------------------------------
   Fancy cursor (visual only)
-----------------------------------------------*/
function GlitchCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const hide = () => setVis(false);
    const show = () => setVis(true);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
    };
  }, []);
  return (
    <>
      <style>{`
        html, body { cursor: none; }
        .glitch-cursor { position: fixed; left: 0; top: 0; width: 14px; height: 14px; transform: translate(-50%, -50%); pointer-events: none; z-index: 10000; mix-blend-mode: difference; border-radius: 3px; box-shadow: 0 0 18px rgba(255,255,255,.5); background: white; opacity: 0.95; }
        .glitch-cursor::before, .glitch-cursor::after { content: ""; position: absolute; inset: -2px; border-radius: 4px; background: repeating-linear-gradient(90deg, rgba(255,255,255,.7), rgba(255,255,255,.7) 2px, transparent 2px, transparent 4px); clip-path: polygon(0 0, 100% 0, 100% 30%, 0 50%); animation: glitchX 600ms infinite steps(2, end); opacity: .45; }
        .glitch-cursor::after { clip-path: polygon(0 60%, 100% 40%, 100% 100%, 0 100%); animation: glitchY 500ms infinite steps(2, end); }
        @keyframes glitchX { 0% { transform: translateX(0); } 50% { transform: translateX(3px); } 100% { transform: translateX(-2px);} }
        @keyframes glitchY { 0% { transform: translateY(0); } 50% { transform: translateY(-3px);} 100% { transform: translateY(2px);} }
        .cursor-ring { position: fixed; left: 0; top: 0; width: 40px; height: 40px; border: 1px solid rgba(255,255,255,.5); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 9999; backdrop-filter: invert(1); opacity: .6; }
      `}</style>
      {vis && (
        <>
          <div className="glitch-cursor" style={{ left: pos.x, top: pos.y }} />
          <div className="cursor-ring" style={{ left: pos.x, top: pos.y }} />
        </>
      )}
    </>
  );
}

/* ----------------------------------------------
   3D materials + rotating wrapper (for hub)
-----------------------------------------------*/
function HoloMaterial({ color = "#00e5ff", emissiveIntensity = 1.5, baseOpacity = 0.5, speed = 2 }) {
  const matRef = useRef();
  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const t = clock.getElapsedTime();
    matRef.current.opacity = baseOpacity + Math.sin(t * speed) * 0.15;
  });
  return (
    <meshStandardMaterial
      ref={matRef}
      transparent
      emissive={color}
      emissiveIntensity={emissiveIntensity}
      roughness={0.2}
      metalness={0.2}
    />
  );
}
function ScanlineMaterial({ baseOpacity = 0.4, speed = 3 }) {
  const matRef = useRef();
  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const t = clock.getElapsedTime();
    matRef.current.opacity = baseOpacity + Math.sin(t * speed) * 0.2;
  });
  return <meshBasicMaterial ref={matRef} wireframe transparent opacity={baseOpacity} />;
}
function Rotating({ speed = 0.4, children, onClick }) {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += speed * delta;
      group.current.rotation.x += speed * 0.3 * delta;
    }
  });
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };
  return (
    <group ref={group} onPointerDown={onClick} role="button" tabIndex={0} onKeyDown={onKeyDown}>
      {children}
    </group>
  );
}

/* ----------------------------------------------
   1) EXPERIENCE SLIDER (futuristic look)
   - Shows one role at a time with animated transition.
   - Left/Right "Indian man" avatar buttons navigate.
   - Arrow keys (← / →) also navigate.
   - Add roles by editing EXPERIENCES above.
-----------------------------------------------*/
function IndianManButton({ direction = "left", onClick, title = "Navigate" }) {
  // Emoji avatar button with neon ring + hover wiggle
  return (
    <motion.button
      onClick={onClick}
      aria-label={title}
      whileHover={{ rotate: direction === "left" ? -6 : 6, scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="group relative grid place-items-center w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
    >
      {/* Glow ring */}
      <span className="absolute inset-0 rounded-full shadow-[0_0_24px_rgba(56,189,248,0.35)] ring-1 ring-cyan-400/30 group-hover:ring-cyan-300/60 transition" />
      {/* Emoji with medium skin tone, developer vibe */}
      <span className="text-[26px] leading-none select-none">{direction === "left" ? "🧑🏽‍💻" : "🧑🏽‍💻"}</span>
      {/* Arrow hint */}
      <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-xs text-white/60 hidden sm:block">
        {direction === "left" ? "←" : "→"}
      </span>
    </motion.button>
  );
}

function ExperienceSlider() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0); // -1 left, 1 right (for animation)

  const next = () => {
    setDir(1);
    setIdx((i) => (i + 1) % EXPERIENCES.length);
  };
  const prev = () => {
    setDir(-1);
    setIdx((i) => (i - 1 + EXPERIENCES.length) % EXPERIENCES.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const exp = EXPERIENCES[idx];

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="px-4">
        <div className="relative rounded-2xl border border-white/10 bg-white/[.06]">
          {/* Controls */}
          <div className="absolute inset-y-0 left-2 flex items-center">
            <IndianManButton direction="left" onClick={prev} title="Previous experience" />
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center">
            <IndianManButton direction="right" onClick={next} title="Next experience" />
          </div>

          {/* Slide */}
          <div className="overflow-hidden px-16 py-8 sm:px-20 sm:py-10">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                initial={{ x: dir === 1 ? 60 : -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir === 1 ? -60 : 60, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 40, mass: 1 }}
                className="grid gap-4"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-white/90 font-semibold">
                      {exp.title} · <span className="text-cyan-300">{exp.company}</span>
                    </div>
                    <div className="text-xs text-white/60 mt-1">{exp.period}</div>
                  </div>
                  <div className="text-xs text-white/60">
                    Use <span className="px-1 rounded bg-white/10">←</span> / <span className="px-1 rounded bg-white/10">→</span>
                  </div>
                </div>
                <ul className="list-disc list-inside text-sm text-white/80 mt-1 space-y-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="mt-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-[11px] bg-white/5 border border-white/10 mr-2 mb-2 inline-block">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots / quick jump */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {EXPERIENCES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > idx ? 1 : -1);
                setIdx(i);
              }}
              aria-label={`Go to experience ${i + 1}`}
              className={`h-2 w-2 rounded-full transition ${i === idx ? "bg-cyan-300" : "bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------
   Layout helpers
-----------------------------------------------*/
function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm md:text-base text-white/70 mt-2">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
function Pill({ children }) {
  return <span className="px-3 py-1 rounded-full text-xs md:text-sm bg-white/5 border border-white/10 mr-2 mb-2 inline-block">{children}</span>;
}

/* ----------------------------------------------
   Navbar (About remains first; Experience tab jumps to slider)
-----------------------------------------------*/
function Navbar({ onOpenResume }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <button className="text-lg font-bold" onClick={() => scrollToId("top")}>GK</button>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <button onClick={() => scrollToId("about")} className="hover:text-white/80">About</button>
          <button onClick={() => scrollToId("experience")} className="hover:text-white/80">Experience</button>
          <button onClick={() => scrollToId("projects")} className="hover:text-white/80">Projects</button>
          <Link to="/journal" className="hover:text-white/80">Journal</Link>
          <button onClick={() => scrollToId("contact")} className="hover:text-white/80">Contact</button>
          <Link to="/glitch" className="px-3 py-1 rounded-md border border-white/20 hover:border-white/40">Connect with me</Link>
          <button onClick={onOpenResume} className="px-3 py-1 rounded-md border border-white/20 hover:border-white/40">Resume</button>
        </div>
      </nav>
    </header>
  );
}

/* ----------------------------------------------
   Resume modal
-----------------------------------------------*/
function ResumeModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" role="dialog" aria-label="Resume preview">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[92vw] max-w-5xl h-[80vh] rounded-2xl border border-white/15 bg-[#0b0f1a] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="text-sm text-white/80">Resume — PDF Preview</div>
          <div className="flex items-center gap-2">
            <a href="/resume.pdf" download className="px-3 py-1 rounded-md bg-white text-black text-sm font-semibold hover:opacity-90">Download PDF</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="px-3 py-1 rounded-md border border-white/20 text-sm hover:border-white/40">Open in new tab</a>
            <button onClick={onClose} className="px-3 py-1 rounded-md border border-white/20 text-sm hover:border-white/40">Close</button>
          </div>
        </div>
        <div className="w-full h-[calc(80vh-44px)]">
          <iframe src="/resume.pdf#view=FitH" title="Resume PDF" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------
   Existing 3D Hub (for About→Projects quick jumps)
-----------------------------------------------*/
function BrainHologram({ onClick }) {
  return (
    <Rotating onClick={onClick}>
      <mesh scale={[1.3, 1.3, 1.3]}>
        <torusKnotGeometry args={[0.6, 0.22, 180, 32]} />
        <HoloMaterial color="#00e5ff" />
      </mesh>
      <mesh scale={[1.31, 1.31, 1.31]}>
        <torusKnotGeometry args={[0.6, 0.22, 180, 32]} />
        <ScanlineMaterial />
      </mesh>
      <Html center distanceFactor={10}>
        <div className="px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-sm">Deep Learning</div>
      </Html>
    </Rotating>
  );
}
function ServerCube({ onClick }) {
  return (
    <Rotating onClick={onClick}>
      <mesh scale={[1.2, 1.2, 1.2]}>
        <boxGeometry args={[1, 1, 1]} />
        <HoloMaterial color="#a78bfa" />
      </mesh>
      <mesh scale={[1.201, 1.201, 1.201]}>
        <boxGeometry args={[1, 1, 1]} />
        <ScanlineMaterial />
      </mesh>
      <Html center distanceFactor={10}>
        <div className="px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full bg-violet-500/20 text-violet-200 border border-violet-400/40 shadow-sm">Backend Dev</div>
      </Html>
    </Rotating>
  );
}
function MLObject({ onClick }) {
  return (
    <Rotating onClick={onClick}>
      <mesh>
        <icosahedronGeometry args={[0.9, 0]} />
        <HoloMaterial color="#34d399" />
      </mesh>
      <mesh scale={[1.001, 1.001, 1.001]}>
        <icosahedronGeometry args={[0.9, 0]} />
        <ScanlineMaterial />
      </mesh>
      <Html center distanceFactor={10}>
        <div className="px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 shadow-sm">Machine Learning</div>
      </Html>
    </Rotating>
  );
}
function VisionPrism({ onClick }) {
  return (
    <Rotating onClick={onClick}>
      <mesh scale={[1.15, 1.15, 1.15]}>
        <tetrahedronGeometry args={[0.95, 0]} />
        <HoloMaterial color="#f59e0b" />
      </mesh>
      <mesh scale={[1.151, 1.151, 1.151]}>
        <tetrahedronGeometry args={[0.95, 0]} />
        <ScanlineMaterial />
      </mesh>
      <Html center distanceFactor={10}>
        <div className="px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/40 shadow-sm">Computer Vision</div>
      </Html>
    </Rotating>
  );
}
function ThreeHub() {
  return (
    <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <Canvas camera={{ position: [0, 1.5, 5], fov: 55 }}>
        <color attach="background" args={[0x000000]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.3} />
        <group position={[0, 0.3, 0]}>
          <group position={[-3.3, 0, 0]}>
            <BrainHologram onClick={() => scrollToId("deep-learning")} />
          </group>
          <group position={[-1.1, 0, 0]}>
            <ServerCube onClick={() => scrollToId("backend")} />
          </group>
          <group position={[1.1, 0, 0]}>
            <MLObject onClick={() => scrollToId("machine-learning")} />
          </group>
          <group position={[3.3, 0, 0]}>
            <VisionPrism onClick={() => scrollToId("computer-vision")} />
          </group>
        </group>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

/* ----------------------------------------------
   PAGE ROOT
   - About remains first (landing)
   - Experience slider comes right after About
-----------------------------------------------*/
// ---- Backend projects data (edit these links/titles/descriptions) ----

const backendProjects = [
  {
    title: "FastAPI + MongoDB Gender Service",
    description:
      "JWT auth, WebSockets, message persistence, and Dockerized deploy on AWS EC2.",
    stack: ["FastAPI", "MongoDB", "WebSockets", "Docker", "AWS"],
    link: "https://github.com/gkhot27/Digit7/tree/main/src/gender", // <- put your repo/demo URL
  },
  {
    title: "Invoice Automation Pipeline",
    description:
      "Python + Zapier glue to parse transactions, match invoices, and push to QuickBooks.",
    stack: ["Python", "Zapier", "QuickBooks API"],
    link: "https://github.com/yourusername/invoice-automation", // <- put your repo/demo URL
  },
  {
    title: "Auth & RBAC Microservice",
    description:
      "Centralized auth with JWT refresh flow, role-based access, and audit trails.",
    stack: ["FastAPI", "PostgreSQL", "JWT", "Docker"],
    link: "https://github.com/yourusername/auth-rbac-service", // <- put your repo/demo URL
  },

];
// ---- Deep Learning projects data ----
const deepLearningProjects = [
  {
    title: "Real-time Object Detection (OpenCV + YOLO)",
    description:
      "Streaming webcam inference with async preprocessing, custom NMS, and a lightweight metrics panel.",
    stack: ["Python", "PyTorch", "YOLO", "OpenCV"],
    link: "https://github.com/yourusername/realtime-yolo-opencv", // <- repo or demo URL
  },
  {
    title: "Pac-Man Agent (Reinforcement Learning)",
    description:
      "DQN-style agent with replay buffer, epsilon-greedy exploration, and target network updates.",
    stack: ["Python", "RL", "PyGame", "NumPy"],
    link: "https://github.com/yourusername/pacman-dqn", // <- repo or demo URL
  },
];

// ---- Machine Learning projects data ----
const machineLearningProjects = [
  {
    title: "Churn Prediction",
    description:
      "Feature engineering + model comparison (LogReg, RandomForest, XGBoost) with SHAP explainability.",
    stack: ["Python", "scikit-learn", "XGBoost", "SHAP"],
    link: "https://github.com/yourusername/churn-prediction", // <- repo or demo URL
  },
  {
    title: "Time-Series Forecasting",
    description:
      "Seasonal decomposition, Prophet baseline, and LightGBM for competitive short-term forecasts.",
    stack: ["Pandas", "Prophet", "LightGBM"],
    link: "https://github.com/yourusername/ts-forecasting", // <- repo or demo URL
  },
];
// ---- Computer Vision projects data ----
const computerVisionProjects = [
  {
    title: "Lighting‑Robust Color Detection",
    description:
      "HSV thresholds + normalization + CLAHE for stable tracking under exposure shifts.",
    stack: ["OpenCV", "Python", "HSV/LAB", "CLAHE"],
    link: "https://github.com/yourusername/lighting-robust-color-detection", // <- repo or demo URL
  },
  {
    title: "Image Differencing & Motion Masks",
    description:
      "Background subtraction (MOG2/KNN) with morphological operations to highlight changes.",
    stack: ["OpenCV", "Python", "MOG2", "KNN", "MorphOps"],
    link: "https://github.com/yourusername/image-differencing-motion", // <- repo or demo URL
  },
  {
    title: "Edge Maps & Segmentation",
    description:
      "Canny/Sobel edges and GrabCut/Watershed for region separation and object extraction.",
    stack: ["OpenCV", "Canny", "Sobel", "GrabCut", "Watershed"],
    link: "https://github.com/yourusername/edges-and-segmentation", // <- repo or demo URL
  },
  {
    title: "Classical → DL Bridge",
    description:
      "Denoise/normalize/resize pipelines feeding clean inputs to CNN/YOLO detectors.",
    stack: ["OpenCV", "NumPy", "PyTorch", "YOLO"],
    link: "https://github.com/yourusername/classical-to-dl-bridge", // <- repo or demo URL
  },
];



// ---- Tiny external-link icon (no extra dependency) ----
function ExternalLinkIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </svg>
  );
}

export default function Portfolio() {
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div id="top" className="min-h-screen bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white">
      <GlitchCursor />
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* ====== ABOUT (landing) ====== */}
      <section id="about" className="pt-16 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Hi, I'm <span className="text-cyan-300">Gururaj Khot</span> -
              <br className="hidden md:block" />
              I build <span className="text-violet-300">backend systems</span> & craft <span className="text-emerald-300">ML/DL</span> solutions.
            </h1>
            <p className="mt-4 text-white/80 leading-relaxed">
              Backend developer and ML enthusiast focused on FastAPI, MongoDB, real‑time systems, and computer vision.
              I love shipping reliable APIs, efficient data pipelines, and experiments that actually move the needle.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button onClick={() => scrollToId("experience")} className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:opacity-90">Experience</button>
              <button onClick={() => scrollToId("projects")} className="px-4 py-2 rounded-xl border border-white/20 hover:border-white/40">See Projects</button>
            </div>
            <div className="mt-6"><Pill>FastAPI</Pill><Pill>MongoDB</Pill><Pill>WebSockets</Pill><Pill>Python</Pill><Pill>C++</Pill><Pill>OpenCV</Pill><Pill>AWS</Pill></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4">
            <ThreeHub />
            <p className="text-xs text-white/60 text-center">Tip: click a 3D object to jump to that section and all the objects are draggable</p>
          </motion.div>
        </div>
      </section>

      {/* ====== EXPERIENCE (slider) ====== */}
      <Section id="experience" title="Work Experience" subtitle="Use the 🧑🏽‍💻 buttons or your ← / → keys to browse roles">
        <ExperienceSlider />
      </Section>

      {/* ====== PROJECTS GRID ====== */}
      <Section id="projects" title="Projects" subtitle="A few highlights from my recent work">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button type="button" onClick={() => scrollToId("deep-learning")} className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[.08] transition text-left">
            <div className="text-cyan-300 font-semibold">Deep Learning</div>
            <p className="text-sm text-white/70 mt-2">Computer vision, CNNs, training workflows, and experiments.</p>
            <div className="mt-4 text-xs text-white/50 group-hover:text-white/80">Jump to section →</div>
          </button>
          <button type="button" onClick={() => scrollToId("backend")} className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[.08] transition text-left">
            <div className="text-violet-300 font-semibold">Backend Development</div>
            <p className="text-sm text-white/70 mt-2">FastAPI microservices, MongoDB, auth, and real‑time systems.</p>
            <div className="mt-4 text-xs text-white/50 group-hover:text-white/80">Jump to section →</div>
          </button>
          <button type="button" onClick={() => scrollToId("machine-learning")} className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[.08] transition text-left">
            <div className="text-emerald-300 font-semibold">Machine Learning</div>
            <p className="text-sm text-white/70 mt-2">Classical ML, data pipelines, feature engineering, model eval.</p>
            <div className="mt-4 text-xs text-white/50 group-hover:text-white/80">Jump to section →</div>
          </button>
          <button type="button" onClick={() => scrollToId("computer-vision")} className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[.08] transition text-left">
            <div className="text-amber-300 font-semibold">Computer Vision</div>
            <p className="text-sm text-white/70 mt-2">Lighting-robust color detection, edges, segmentation.</p>
            <div className="mt-4 text-xs text-white/50 group-hover:text-white/80">Jump to section →</div>
          </button>
        </div>
      </Section>

      {/* ====== DEEP LEARNING ====== */}
      <Section id="deep-learning" title="Deep Learning" subtitle="Selected experiments & demos">
        <div className="grid md:grid-cols-2 gap-6">
          {deepLearningProjects.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[.08] transition"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{proj.title}</h3>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40 text-emerald-300 hover:text-emerald-200"
                    title="Open project"
                  >
                    View <ExternalLinkIcon />
                  </a>
                )}
              </div>
              <p className="text-sm text-white/70 mt-2">{proj.description}</p>
              <div className="mt-3 text-xs text-white/60 flex flex-wrap gap-2">
                {proj.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ====== BACKEND DEV ====== */}
      <Section id="backend" title="Backend Development" subtitle="APIs, data, and infra">
        <div className="grid md:grid-cols-2 gap-6">
          {backendProjects.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[.08] transition"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{proj.title}</h3>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40 text-emerald-300 hover:text-emerald-200"
                    title="Open project"
                  >
                    View <ExternalLinkIcon />
                  </a>
                )}
              </div>
              <p className="text-sm text-white/70 mt-2">{proj.description}</p>
              <div className="mt-3 text-xs text-white/60 flex flex-wrap gap-2">
                {proj.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ====== MACHINE LEARNING ====== */}
      <Section id="machine-learning" title="Machine Learning" subtitle="Classical, pragmatic ML">
        <div className="grid md:grid-cols-2 gap-6">
          {machineLearningProjects.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[.08] transition"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{proj.title}</h3>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40 text-emerald-300 hover:text-emerald-200"
                    title="Open project"
                  >
                    View <ExternalLinkIcon />
                  </a>
                )}
              </div>
              <p className="text-sm text-white/70 mt-2">{proj.description}</p>
              <div className="mt-3 text-xs text-white/60 flex flex-wrap gap-2">
                {proj.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ====== COMPUTER VISION ====== */}
      <Section
        id="computer-vision"
        title="Computer Vision"
        subtitle="Lighting-robust color detection, segmentation, edges, differencing"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {computerVisionProjects.map((proj, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[.08] transition"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{proj.title}</h3>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-white/20 hover:border-white/40 text-emerald-300 hover:text-emerald-200"
                    title="Open project"
                  >
                    View <ExternalLinkIcon />
                  </a>
                )}
              </div>
              <p className="text-sm text-white/70 mt-2">{proj.description}</p>
              <div className="mt-3 text-xs text-white/60 flex flex-wrap gap-2">
                {proj.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

{/* ====== CONTACT — EMAIL (Web3Forms) ====== */}
<Section id="contact" title="Contact" subtitle="Send a message! I would love to connect with you, it could be something professional or casual. I love talking with new people!">
  <form
    className="grid md:grid-cols-2 gap-4 max-w-3xl"
    onSubmit={async (e) => {
      e.preventDefault();
      const formEl = e.currentTarget;
      const btn = formEl.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = "Sending…";
      btn.disabled = true;

      // Collect fields and add Web3Forms params
      const data = new FormData(formEl);
      data.append("access_key", "859421c8-d66f-4069-8592-2a2dbd4ecc34"); // ← paste your key from web3forms.com
      data.append("subject", "New message from portfolio");
      data.append("from_name", "Portfolio Contact Form");

      // Optional honeypot check (if bots fill this hidden field, we bail)
      if (data.get("botcheck")) {
        btn.textContent = orig; btn.disabled = false;
        return;
      }

      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: data
        }).then(r => r.json());

        if (res?.success) {
          alert("Message sent! Check your email.");
          formEl.reset();
        } else {
          throw new Error(res?.message || "Submission failed.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to send. Please try again.");
      } finally {
        btn.textContent = orig;
        btn.disabled = false;
      }
    }}
  >
    {/* Give inputs 'name' attributes so Web3Forms reads them */}
    <input
      name="name"
      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
      placeholder="Your name"
      required
    />
    <input
      name="email"
      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
      placeholder="Email"
      type="email"
      required
    />
    <textarea
      name="message"
      className="md:col-span-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none"
      rows={5}
      placeholder="Message"
      required
    />

    {/* Honeypot (hidden) — helps block bots */}
    <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

    <button type="submit" className="md:col-span-2 px-4 py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90">
      Send Message
    </button>
  </form>

  <div className="mt-6 text-sm text-white/60">
    Or reach me at <a href="mailto:gkhot@vols.utk.edu" className="underline">gkhot@vols.utk.edu</a>
  </div>
</Section>

<ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <footer className="py-10 text-center text-white/50 text-xs border-t border-white/10">
        (c) {new Date().getFullYear()} Gururaj Khot - Built with React, R3F, and Tailwind
      </footer>
    </div>
  );
}
