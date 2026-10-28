"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, useEffect, useState } from "react";

function Fallback() {
  return <div className="sculpture-fallback" aria-hidden="true"><div>{[0,1,2,3,4].map(i => <span key={i} style={{ "--layer": i } as React.CSSProperties} />)}</div></div>;
}
const Scene = dynamic(() => import("./Scene"), { ssr: false, loading: Fallback });
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Fallback /> : this.props.children; }
}

export default function SceneLoader() {
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    const device = navigator as Navigator & { connection?: { saveData?: boolean } };
    setSupported(Boolean(gl) && !device.connection?.saveData);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    const visibility = () => setVisible(!document.hidden);
    const motion = () => setPaused(document.documentElement.dataset.motion === "paused" || matchMedia("(prefers-reduced-motion: reduce)").matches);
    motion(); visibility();
    document.addEventListener("visibilitychange", visibility); window.addEventListener("portfolio-motion", motion);
    return () => { document.removeEventListener("visibilitychange", visibility); window.removeEventListener("portfolio-motion", motion); };
  }, []);
  return <div className="canvas-shell" aria-hidden="true"><SceneBoundary>{supported ? <Scene paused={paused} visible={visible}/> : <Fallback />}</SceneBoundary></div>;
}
