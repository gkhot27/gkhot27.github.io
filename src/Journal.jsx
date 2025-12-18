import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { journalEntries } from "./data/journal.data.jsx";

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

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold hover:text-white/80">GK</Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-white/80">Portfolio</Link>
          <span className="text-white/40">Journal</span>
          <a href="/#contact" className="px-3 py-1 rounded-md border border-white/20 hover:border-white/40">Contact</a>
        </div>
      </nav>
    </header>
  );
}

const categoryColors = {
  "Development": "from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-300",
  "Machine Learning": "from-emerald-500/20 to-emerald-600/20 border-emerald-400/30 text-emerald-300",
  "Backend": "from-violet-500/20 to-violet-600/20 border-violet-400/30 text-violet-300",
  "Computer Vision": "from-amber-500/20 to-amber-600/20 border-amber-400/30 text-amber-300",
  "Learning": "from-pink-500/20 to-pink-600/20 border-pink-400/30 text-pink-300",
};

function ScraperTool() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        setError(data.error || "Something went wrong. Make sure the backend is running.");
      }
    } catch (err) {
      setError("Failed to connect to the backend. Please ensure the server is running on localhost:5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/10">
      <form onSubmit={handleSummarize} className="flex flex-col gap-3">
        <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
          Paste any link to summarize
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none text-sm transition"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-sm font-medium hover:bg-cyan-500/30 transition disabled:opacity-50"
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-3 text-xs text-red-400/90 bg-red-400/10 p-2 rounded-md border border-red-400/20">
          {error}
        </p>
      )}

      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg bg-cyan-500/5 border border-cyan-400/20"
        >
          <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">Summary</h4>
          <p className="text-sm text-white/90 leading-relaxed italic">"{summary}"</p>
        </motion.div>
      )}
    </div>
  );
}

function JournalCard({ entry, index }) {
  const bgGradient = categoryColors[entry.category] || "from-cyan-500/20 to-cyan-600/20 border-cyan-400/30 text-cyan-300";
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`p-6 rounded-2xl border bg-gradient-to-br ${bgGradient} backdrop-blur-md hover:shadow-lg transition`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <time className="text-xs text-white/60">{entry.date}</time>
          <h3 className="text-lg font-semibold mt-1">{entry.title}</h3>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 whitespace-nowrap">
          {entry.category}
        </span>
      </div>
      
      <p className="text-sm text-white/80 leading-relaxed mb-4">{entry.content}</p>
      
      <div className="flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 rounded-full text-[11px] bg-white/5 border border-white/10 text-white/70">
            {tag}
          </span>
        ))}
      </div>

      {entry.id === "ai-scraper" && <ScraperTool />}
    </motion.article>
  );
}

export default function Journal() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...Object.keys(categoryColors)];
  const filteredEntries = selectedCategory === "All" 
    ? journalEntries 
    : journalEntries.filter((e) => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white">
      <GlitchCursor />
      <Navbar />

      {/* Header */}
      <section className="pt-16 md:pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold">Journal</h1>
            <p className="text-white/70 mt-3 text-lg">
              Thoughts, experiments, and reflections on development, machine learning, and building products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-cyan-500/30 border border-cyan-400/60 text-cyan-200"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Entries */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry, idx) => (
                <JournalCard key={idx} entry={entry} index={idx} />
              ))
            ) : (
              <div className="text-center py-12 text-white/60">
                No journal entries in this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-white/50 text-xs border-t border-white/10">
        (c) {new Date().getFullYear()} Gururaj Khot - Journal
      </footer>
    </div>
  );
}
