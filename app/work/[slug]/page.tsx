import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, portfolio } from "@/content/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolio.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="experience" className="case-page">
      <nav className="case-nav">
        <Link href="/">← Index</Link>
        <span>{project.index} / {project.year}</span>
      </nav>
      <header className="case-hero">
        <p className="section-label">{project.type}</p>
        <h1>{project.title}</h1>
        <p className="case-summary">{project.summary}</p>
      </header>
      <section className="case-grid">
        <div><p className="section-label">Challenge</p><p>{project.challenge}</p></div>
        <div><p className="section-label">Response</p><p>{project.solution}</p></div>
      </section>
      <section className="case-details">
        <div><p className="section-label">Outcomes</p>{project.outcomes.map((item) => <p key={item}>{item}</p>)}</div>
        <div><p className="section-label">System</p>{project.stack.map((item) => <p key={item}>{item}</p>)}</div>
      </section>
      <footer className="case-footer"><Link href="/#work">All work</Link><a href={`mailto:${portfolio.email}`}>Start a conversation ↗</a></footer>
    </main>
  );
}
