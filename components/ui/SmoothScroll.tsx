"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const limit = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
        document.documentElement.style.setProperty("--scroll-progress", String(scrollY / limit));
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", update); removeEventListener("resize", update); document.documentElement.style.removeProperty("--scroll-progress"); };
  }, []);
  return <><div className="scroll-progress" aria-hidden="true"><span /></div>{children}</>;
}
