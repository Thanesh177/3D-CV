"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function ask(event: FormEvent) {
    event.preventDefault();
    const prompt = question.trim();
    if (!prompt || loading) return;

    setLoading(true);
    setError("");
    setAnswer("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt }),
        signal: controller.signal,
      });
      const data = (await response.json()) as { answer?: string; error?: string };
      if (!response.ok) throw new Error(data.error || "The assistant is unavailable.");
      setAnswer(data.answer || "No answer was returned.");
    } catch (requestError) {
      setError(requestError instanceof DOMException && requestError.name === "AbortError"
        ? "The request timed out. Please try again."
        : requestError instanceof Error ? requestError.message : "The assistant is unavailable.");
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  }

  return (
    <div className="assistant">
      <button className="assistant-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="portfolio-assistant">
        <span>AI</span><b aria-hidden="true">{open ? "×" : "+"}</b>
      </button>
      {open && (
        <div className="assistant-panel" id="portfolio-assistant" role="dialog" aria-label="Portfolio assistant">
          <small>Portfolio intelligence</small>
          <h3>Ask about the work.</h3>
          <form onSubmit={ask}>
            <input
              ref={inputRef}
              value={question}
              onChange={(event) => setQuestion(event.target.value.slice(0, 500))}
              placeholder="Which project best shows AI work?"
              aria-label="Question"
              maxLength={500}
              autoComplete="off"
            />
            <button type="submit" disabled={loading || !question.trim()}>{loading ? "Thinking" : "Ask ↗"}</button>
          </form>
          <div className="assistant-status" aria-live="polite">
            {answer && <p>{answer}</p>}
            {error && <p className="assistant-error">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
