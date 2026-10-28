"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/content/portfolio";

export default function Navigation() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setPaused(query.matches); document.documentElement.dataset.motion = query.matches ? "paused" : "active"; window.dispatchEvent(new Event("portfolio-motion")); };
    update(); query.addEventListener("change", update);
    return () => { query.removeEventListener("change", update); delete document.documentElement.dataset.motion; };
  }, []);
  function toggleMotion() {
    const next = !paused; setPaused(next); document.documentElement.dataset.motion = next ? "paused" : "active"; window.dispatchEvent(new Event("portfolio-motion"));
  }
  return <header className="nav"><a className="wordmark" href="#top" aria-label="Thanesh — back to top">thanesh<span>®</span></a><nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#about">Approach</a><a href="#expertise">About</a></nav><div className="nav-actions"><button className="motion-toggle" onClick={toggleMotion} aria-pressed={paused} aria-label={paused ? "Enable ambient motion" : "Pause ambient motion"}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span><span>Motion {paused ? "off" : "on"}</span></button><a className="nav-contact" href={`mailto:${portfolio.email}`}>Say hello <span aria-hidden="true">↗</span></a></div></header>;
}
