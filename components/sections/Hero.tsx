import { portfolio } from "@/content/portfolio";

export default function Hero() {
  return (
    <section id="top" className="hero scene-section">
      <div className="hero-copy">
        <p className="eyebrow hero-kicker">Cloud, code, and a little curiosity.</p>
        <h1>Hi, I’m<br /><em>Thanesh.</em></h1>
        <p className="hero-role">Cloud engineer. Based in Canada.</p>
        <p className="hero-intro">I work where infrastructure meets security. My job is to make all the moving parts feel like one reliable system.</p>
        <a className="button button-dark" href="#work">A few things I’ve built <span aria-hidden="true">↗</span></a>
        <a className="hero-text-link" href="#about">How I think <span aria-hidden="true">↓</span></a>
      </div>
      <div className="hero-object-label" aria-hidden="true"><svg viewBox="0 0 75 50" fill="none"><path d="M70 42C40 46 19 33 13 9M5 19L13 8L24 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg><div>Every layer has a job.<small>The interesting part is how they connect.</small></div></div>
      <div className="hero-side-note" aria-hidden="true">A LOOK BENEATH THE SURFACE</div>
      <div className="hero-footer"><a href="#about"><span className="scroll-circle">↓</span> There’s a little more to the story</a><span>{portfolio.location.split(" · ")[0]} <i /> Open to the right opportunity</span><span className="edition">THANESH NAGARAJAN / 2026</span></div>
    </section>
  );
}
