"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

type Pose = { at: number; x: number; y: number; scale: number; spread: number; turn: number; tilt: number };

function Studio() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const generator = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const environment = generator.fromScene(room, .04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 1.25;
    room.dispose(); generator.dispose();
    return () => { scene.environment = null; environment.dispose(); };
  }, [gl, scene]);
  return <><ambientLight intensity={1.2} /><directionalLight position={[3, 6, 5]} intensity={3.5} color="#fffaf2" /><directionalLight position={[-4, 0, 3]} intensity={1.5} color="#c5d7ff" /></>;
}

function Layer({ index }: { index: number }) {
  const blue = index === 2;
  const pins = useMemo(() => Array.from({ length: 8 }, (_, i) => -.8 + i * .23), []);
  return <>
    <RoundedBox args={[2.65, .2, 2.65]} radius={.085} smoothness={4}>
      <meshPhysicalMaterial color={blue ? "#2459eb" : "#cbd0d6"} metalness={blue ? .45 : .92} roughness={blue ? .22 : .28} clearcoat={.6} />
    </RoundedBox>
    <RoundedBox args={[2.39, .018, 2.39]} radius={.008} smoothness={3} position={[0, .11, 0]}>
      <meshStandardMaterial color={index === 4 ? "#e5e8ea" : blue ? "#1a48db" : "#909aa9"} metalness={.7} roughness={.32} />
    </RoundedBox>
    {index === 4 ? <group position={[0, .126, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[.64, .024, 10, 80]} /><meshStandardMaterial color="#a7b0be" metalness={1} roughness={.2}/></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[.6, 64]} /><meshStandardMaterial color="#f1f3f4" metalness={.6} roughness={.35}/></mesh>
      <mesh position={[0, .018, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[.19, .28, 48]} /><meshStandardMaterial color="#2e5de1" metalness={.6} roughness={.2}/></mesh>
      <mesh position={[0, .02, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[.09, 32]} /><meshStandardMaterial color="#2e5de1" metalness={.5} roughness={.2}/></mesh>
    </group> : <group position={[0, .15, 0]}>
      <RoundedBox args={[.74, .1, .74]} radius={.04} smoothness={2}><meshPhysicalMaterial color={blue ? "#aecaff" : "#344455"} metalness={.8} roughness={.22} /></RoundedBox>
      {pins.map((pin, i) => <group key={i}>
        <mesh position={[pin, -.025, .88]}><boxGeometry args={[.075, .025, .24]} /><meshStandardMaterial color="#d7bd86" metalness={.8} roughness={.35} /></mesh>
        <mesh position={[.88, -.025, pin]}><boxGeometry args={[.24, .025, .075]} /><meshStandardMaterial color="#d7bd86" metalness={.8} roughness={.35} /></mesh>
        <mesh position={[pin, -.03, -.67]}><boxGeometry args={[.012, .012, .62]} /><meshStandardMaterial color="#b0cbff" metalness={.5} roughness={.3} /></mesh>
      </group>)}
    </group>}
    {[-1, 1].flatMap(x => [-1, 1].map(z => <mesh key={`${x}-${z}`} position={[x * 1.08, .125, z * 1.08]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[.035, 16]} /><meshStandardMaterial color="#586372" metalness={.9} roughness={.2}/></mesh>))}
    <mesh position={[.7, 0, 1.328]}><boxGeometry args={[.28, .035, .006]} /><meshBasicMaterial color={blue ? "#c0e2ff" : "#4d7dff"} /></mesh>
    <mesh position={[-.62, 0, 1.33]}><boxGeometry args={[.34, .045, .008]} /><meshStandardMaterial color="#465263" metalness={.5} roughness={.4} /></mesh>
  </>;
}

function Sculpture({ paused }: { paused: boolean }) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const { viewport, size, invalidate } = useThree();
  const poses = useRef<Pose[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const motion = useRef({ x: .235, y: 0, scale: 1, spread: .06, turn: -.62, tilt: .43, time: 0 });
  const scroll = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    const top = (id: string) => { const el = document.getElementById(id); return el ? el.getBoundingClientRect().top + window.scrollY : 0; };
    const resize = () => {
      reduced.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const h = innerHeight;
      const mobile = innerWidth < 760;
      const about = document.getElementById("about");
      const travel = Math.max(h, (about?.offsetHeight || 3 * h) - h);
      poses.current = [
        { at: 0, x: mobile ? 0 : .235, y: mobile ? .5 - 730 / h : .045, scale: mobile ? .55 : .8, spread: .08, turn: -.65, tilt: .48 },
        { at: top("about") - h * .05, x: mobile ? 0 : -.235, y: mobile ? .16 : -.01, scale: mobile ? .39 : .69, spread: 1.0, turn: -.58, tilt: .43 },
        { at: top("about") + travel * .43, x: mobile ? 0 : -.235, y: mobile ? .16 : -.01, scale: mobile ? .37 : .66, spread: 1.55, turn: .05, tilt: .32 },
        { at: top("about") + travel * .82, x: mobile ? 0 : -.235, y: mobile ? .16 : -.01, scale: mobile ? .42 : .79, spread: .32, turn: .9, tilt: .48 },
        { at: top("work") - h * .24, x: .31, y: .12, scale: mobile ? 0 : .35, spread: .65, turn: 1.7, tilt: .48 },
        { at: top("project-smarty") + h * .35, x: .31, y: .12, scale: 0, spread: .4, turn: 2.0, tilt: .48 },
        { at: top("expertise"), x: .26, y: .1, scale: 0, spread: .2, turn: 3.5, tilt: .48 },
        { at: top("contact") - h * .35, x: mobile ? 0 : .26, y: mobile ? .5 - 680 / h : 0, scale: mobile ? .55 : .8, spread: .08, turn: 5.3, tilt: .45 },
        { at: top("contact") + h, x: mobile ? 0 : .26, y: mobile ? .5 - 680 / h : 0, scale: mobile ? .55 : .8, spread: .08, turn: 5.5, tilt: .45 },
      ].sort((a, b) => a.at - b.at);
      scroll.current = reduced.current ? 0 : window.scrollY; invalidate();
    };
    const onScroll = () => { scroll.current = reduced.current ? 0 : window.scrollY; invalidate(); };
    const onPointer = (e: PointerEvent) => { pointer.current = { x: e.clientX / innerWidth - .5, y: e.clientY / innerHeight - .5 }; };
    resize();
    const observer = new ResizeObserver(resize); observer.observe(document.body);
    addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", resize); addEventListener("pointermove", onPointer, { passive: true });
    return () => { observer.disconnect(); removeEventListener("scroll", onScroll); removeEventListener("resize", resize); removeEventListener("pointermove", onPointer); };
  }, [invalidate]);

  useFrame((_, delta) => {
    if (!root.current || poses.current.length < 2) return;
    const points = poses.current;
    let index = 0;
    while (index < points.length - 2 && scroll.current > points[index + 1].at) index++;
    const a = points[index], b = points[index + 1];
    const linear = THREE.MathUtils.clamp((scroll.current - a.at) / Math.max(1, b.at - a.at), 0, 1);
    const progress = linear * linear * (3 - 2 * linear);
    const m = motion.current;
    const d = Math.min(delta, .05);
    for (const key of ["x", "y", "scale", "spread", "turn", "tilt"] as const) {
      const target = THREE.MathUtils.lerp(a[key], b[key], progress);
      m[key] = paused ? target : THREE.MathUtils.damp(m[key], target, 9, d);
    }
    if (!paused) m.time += d;
    const fit = size.width < 760 ? viewport.width / 3.2 * Math.min(size.height / 800, 1) : Math.min(viewport.height / 5.4, 1.3);
    root.current.position.set(m.x * viewport.width, m.y * viewport.height + (paused ? 0 : Math.sin(m.time * .65) * .045), 0);
    root.current.rotation.set(m.tilt + (paused ? 0 : pointer.current.y * .07), m.turn + (paused ? 0 : pointer.current.x * .12), -.075);
    root.current.scale.setScalar(m.scale * fit);
    layers.current.forEach((layer, i) => {
      if (!layer) return;
      layer.position.y = (i - 2) * (.33 + m.spread * .43);
      layer.position.x = Math.sin(i * 1.2) * m.spread * .11;
      layer.rotation.y = (i - 2) * m.spread * .055;
    });
  });

  return <group ref={root}>{[0, 1, 2, 3, 4].map(index => <group key={index} ref={node => { layers.current[index] = node; }} position={[0, (index - 2) * .36, 0]}><Layer index={index}/></group>)}</group>;
}

export default function Scene({ paused, visible }: { paused: boolean; visible: boolean }) {
  return <Canvas camera={{ position: [0, 0, 8], fov: 36 }} dpr={[1, 1.5]} frameloop={!visible ? "never" : paused ? "demand" : "always"} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}><Studio /><Sculpture paused={paused} /></Canvas>;
}
