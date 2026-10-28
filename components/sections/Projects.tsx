import Link from "next/link";
import { portfolio } from "@/content/portfolio";

function SmartyPreview() {
  return <div className="system-drawing smarty-drawing" role="img" aria-label="Smarty architecture: React web and Kotlin Android clients connect through Cognito authentication and API Gateway to Lambda, DynamoDB, and live WebSocket interactions.">
    <div className="drawing-header"><span>smarty / under the hood</span><span>01</span></div>
    <p className="drawing-note">Two clients. One shared experience.</p>
    <div className="client-row"><div className="client-node"><span className="device-icon web-icon"/><strong>React</strong><small>on the web</small></div><span className="connection-plus">+</span><div className="client-node"><span className="device-icon phone-icon"/><strong>Kotlin</strong><small>on Android</small></div></div>
    <div className="diagram-connector connector-merge"><i/><i/></div>
    <div className="gateway-node"><span>↳</span> API Gateway <small>Cognito auth</small></div>
    <div className="diagram-connector connector-straight"/>
    <div className="service-row"><div><span>λ</span><strong>Lambda</strong><small>application logic</small></div><div><span>▤</span><strong>DynamoDB</strong><small>shared state</small></div><div><span>↔</span><strong>WebSockets</strong><small>live discussion</small></div></div>
    <div className="drawing-footer"><span>Provisioned with Terraform</span><span>Released with GitHub Actions ↗</span></div>
  </div>;
}

function StockiePreview() {
  return <div className="system-drawing stockie-drawing" role="img" aria-label="Stockie pipeline: market data is processed in Python with Pandas and Scikit-learn, models are stored in S3, and predictions are served by Lambda behind API Gateway. Container services use ECR and App Runner.">
    <div className="drawing-header"><span>stockie / the data journey</span><span>02</span></div>
    <p className="drawing-note">The model is only part of the story.</p>
    <div className="data-journey"><div className="data-step"><span className="step-symbol">∿</span><div><strong>Collect & prepare</strong><small>Market data · Python · Pandas</small></div><span className="step-count">01</span></div><div className="journey-line"/><div className="data-step"><span className="step-symbol">⌘</span><div><strong>Train & store</strong><small>Scikit-learn · S3 model storage</small></div><span className="step-count">02</span></div><div className="journey-line"/><div className="data-step"><span className="step-symbol">↗</span><div><strong>Serve a prediction</strong><small>Lambda · API Gateway</small></div><span className="step-count">03</span></div></div>
    <div className="container-note"><span className="small-square"/><span>Container services</span><b>Docker → ECR → App Runner</b></div><div className="drawing-footer"><span>From changing data to repeatable inference.</span><span>↗</span></div>
  </div>;
}

export default function Projects() {
  return <section id="work" className="projects">
    <div className="project-heading"><div><p className="section-label" data-reveal>A few things I’ve built</p><h2 data-reveal>Different problems.<br /><em>Same attention.</em></h2></div><p data-reveal>Here’s what was involved,<br />and how the pieces fit together.</p></div>
    {portfolio.projects.map((project, index) => <article id={`project-${project.slug}`} key={project.slug} className={`project project-${project.slug} scene-section`}>
      <div className="project-info" data-reveal><p className="project-number">{project.index} <span>/ {project.year}</span></p><p className="eyebrow">{index === 0 ? "Learning, across screens" : "A pipeline, from data to prediction"}</p><h3>{project.title.charAt(0) + project.title.slice(1).toLowerCase()}<span>↗</span></h3><p className="project-description">{index === 0 ? "A learning platform for web and Android. The interesting challenge wasn’t a single feature—it was bringing identity, live discussion, media, and AI-assisted content into the same experience." : "A stock prediction project that took me beyond the model: collecting data, engineering features, storing models, and serving predictions through an automated AWS pipeline."}</p><div className="tags">{project.stack.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div><Link className="text-link" href={`/work/${project.slug}`}>The story behind {project.title.charAt(0) + project.title.slice(1).toLowerCase()} <span aria-hidden="true">↗</span></Link></div>
      {index === 0 ? <SmartyPreview /> : <StockiePreview />}
    </article>)}
    <a className="github-link" href={portfolio.links.github} target="_blank" rel="noreferrer">If you’d rather read the code, <span>you’ll find me on GitHub ↗</span></a>
  </section>;
}
