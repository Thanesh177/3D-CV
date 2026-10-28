import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-page">
      <p className="section-label">404 / Not found</p>
      <h1>Nothing lives here.</h1>
      <p>The page you requested is outside this portfolio.</p>
      <Link className="text-button" href="/">Return home ↗</Link>
    </main>
  );
}
