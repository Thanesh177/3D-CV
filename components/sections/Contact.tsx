import { portfolio } from "@/content/portfolio";

export default function Contact() {
  return <section id="contact" className="contact scene-section">
    <p className="section-label" data-reveal>Enough about me.</p>
    <div className="contact-copy"><p className="availability"><i />Open to opportunities</p><h2 data-reveal>What are you<br /><em>working on?</em></h2><p className="contact-description" data-reveal>If you’re looking for a cloud engineer, or you just want to talk through a system you’re building, I’d be glad to hear from you.</p><a className="button button-dark" href={`mailto:${portfolio.email}`}>Say hello <span aria-hidden="true">↗</span></a><a className="contact-email" href={`mailto:${portfolio.email}`}>{portfolio.email}</a></div>
    <div className="contact-object-note" aria-hidden="true">THERE’S ALWAYS ANOTHER<br />INTERESTING PROBLEM.</div>
    <footer><a className="wordmark" href="#top">thanesh<span>®</span></a><span>Thanks for stopping by. © 2026</span><div><a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={portfolio.links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href="#top">Back to top ↑</a></div></footer>
  </section>;
}
