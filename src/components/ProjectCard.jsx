// src/components/ProjectCard.jsx
import React from "react";

export default function ProjectCard({ title, desc, img, github }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[.06] transition">
      {/* Clickable image → GitHub */}
      <a href={github} target="_blank" rel="noreferrer" className="block">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-[1.02] transition duration-300"
            loading="lazy"
          />
        </div>
      </a>

      {/* Text content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold">{title}</h3>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="text-xs px-2 py-1 rounded-md border border-white/15 hover:border-white/30"
            title="View on GitHub"
          >
            GitHub ↗
          </a>
        </div>
        <p className="text-sm text-white/70 mt-2">{desc}</p>
      </div>
    </div>
  );
}
