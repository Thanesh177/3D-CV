import { portfolio } from "@/content/portfolio";

export default function Capabilities() {
  return <section id="expertise" className="capabilities scene-section">
    <div className="expertise-heading"><p className="section-label" data-reveal>A bit about me</p><h2 data-reveal>From operating systems<br />to <em>understanding them.</em></h2><p className="expertise-intro" data-reveal>My background spans cloud administration in India, a computer science master’s at Lakehead University, and security work with Vosyn in Canada. Across all three, the thread is the same: understanding how a system works, then making it better.</p></div>
    <div className="capability-list">{portfolio.capabilities.map((item, index) => <div className="capability" key={item} data-reveal><span>0{index + 1}</span><h3>{item}</h3><b aria-hidden="true">+</b></div>)}</div>
    <div className="experience-heading"><p className="section-label">The path so far</p><a className="text-link" href={`mailto:${portfolio.email}?subject=R%C3%A9sum%C3%A9%20request`}>Request résumé ↗</a></div>
    <div className="experience-list">{portfolio.experience.map(item => <article className="experience" key={item.company} data-reveal><p className="experience-period">{item.period}<span>{item.location}</span></p><div><h3>{item.role}</h3><h4>{item.company}</h4></div><p>{item.summary}</p></article>)}</div>
    <div className="credentials"><div data-reveal><p className="section-label">What I’ve learned along the way</p>{portfolio.certifications.map(item => <p key={item}><span>↗</span>{item}</p>)}</div><div data-reveal><p className="section-label">Where I studied</p>{portfolio.education.map(item => <p key={item}>{item}</p>)}</div></div>
  </section>;
}
