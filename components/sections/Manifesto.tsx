"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { label: "Start with the structure", title: <>Make the pieces<br /><em>make sense.</em></>, text: "A cloud system is a set of decisions: what runs where, who can reach it, and how it grows. I use AWS and infrastructure as code to make those decisions explicit and repeatable.", tags: ["AWS architecture", "Infrastructure as code"], name: "The structure" },
  { label: "Pay attention to the handoffs", title: <>The connections<br />are the <em>hard part.</em></>, text: "A React app, a Kotlin client, authentication, live events. In Smarty, the challenge was making those pieces behave like one product. That’s where thoughtful automation earns its place.", tags: ["CI/CD pipelines", "Terraform", "Full-stack systems"], name: "The handoffs" },
  { label: "Think past the launch", title: <>What happens<br />when things <em>change?</em></>, text: "My work at Vosyn includes cloud governance, vulnerability management, and operational resilience. Building a system is one part of the job. Keeping it dependable is the other.", tags: ["Cloud security", "Observability", "Cost optimization"], name: "The long run" },
];

export default function Manifesto() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    let frame = 0;
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(query.matches);
    onMotion(); query.addEventListener("change", onMotion);
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!section.current) return;
        const rect = section.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)));
        section.current.style.setProperty("--story-progress", String(progress));
        setActive(Math.min(2, Math.floor(progress * 3)));
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => { query.removeEventListener("change", onMotion); cancelAnimationFrame(frame); removeEventListener("scroll", update); removeEventListener("resize", update); };
  }, []);
  return (
    <section id="about" className="architecture scene-section" ref={section}>
      <div className="architecture-sticky">
        <div className="architecture-heading"><span className="section-label">A little of how I think</span><span className="micro">TAKE IT APART. UNDERSTAND IT. PUT IT TOGETHER.</span></div>
        <div className="architecture-object-note" aria-hidden="true"><span>THE SAME SYSTEM</span><div className="measure-line" /><span>A CLOSER LOOK</span></div>
        <div className="chapter-stack">
          {chapters.map((chapter, index) => <article key={chapter.label} className={`chapter ${active === index ? "is-active" : ""}`} aria-hidden={!reduced && active !== index}>
            <p className="eyebrow">{chapter.label}</p><h2>{chapter.title}</h2><p className="chapter-description">{chapter.text}</p><div className="tags">{chapter.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </article>)}
        </div>
        <div className="story-nav">{chapters.map((chapter, index) => <button key={chapter.name} className={active === index ? "is-active" : ""} aria-current={active === index ? "step" : undefined} onClick={() => { const el = section.current; if (el) window.scrollTo({ top: scrollY + el.getBoundingClientRect().top + (el.offsetHeight - innerHeight) * ((index + .2) / 3), behavior: reduced ? "instant" : "smooth" }); }}><span>0{index + 1}</span>{chapter.name}<i /></button>)}</div>
      </div>
    </section>
  );
}
