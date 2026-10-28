"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="error-page">
      <p className="section-label">Something went wrong</p>
      <h1>The signal dropped.</h1>
      <p>The experience hit an unexpected error. You can retry without leaving the page.</p>
      <button className="text-button" onClick={() => reset()}>Retry ↗</button>
    </main>
  );
}
