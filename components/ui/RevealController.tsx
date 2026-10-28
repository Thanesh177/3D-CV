"use client";
import { useEffect } from "react";

export default function RevealController() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    elements.forEach(element => { if (element.getBoundingClientRect().top > innerHeight) { element.classList.add("reveal-pending"); observer.observe(element); } });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove("reveal-pending")); };
  }, []);
  return null;
}
