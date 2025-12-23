// src/components/ProjectsGrid.jsx
import React from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects.data.jsx";

export default function ProjectsGrid({ items = [] }) {
  if (!items.length) {
    return <div className="text-white/60 text-sm">No projects yet-add some in <code>src/data/projects.data.jsx</code>.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {items.map((p, i) => (
        <ProjectCard key={`${p.title}-${i}`} {...p} />
      ))}
    </div>
  );
}
