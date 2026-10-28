# Security

## Secrets

Never commit `.env.local` or an OpenAI API key. `OPENAI_API_KEY` is read only inside the server route.

## Content Security Policy

The default CSP lives in `next.config.ts`. When adding a third-party service, explicitly allow only the required origin and directive. Avoid replacing the policy with wildcards.

## AI endpoint

The portfolio assistant validates request content, limits question length, uses a server-side timeout and emits no-store responses. The included in-memory rate limiter is only a baseline. For a public high-traffic deployment, use a durable distributed rate limiter.

## Dependency maintenance

Run the following regularly and before important releases:

```bash
npm audit
npm outdated
npm run check
```

Apply supported Next.js security updates promptly.
