import SceneLoader from "@/components/canvas/SceneLoader";
import Navigation from "@/components/ui/Navigation";
import SmoothScroll from "@/components/ui/SmoothScroll";
import RevealController from "@/components/ui/RevealController";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Projects from "@/components/sections/Projects";
import Capabilities from "@/components/sections/Capabilities";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return <SmoothScroll><RevealController /><SceneLoader /><Navigation /><main id="experience"><Hero /><Manifesto /><Projects /><Capabilities /><Contact /></main></SmoothScroll>;
}
