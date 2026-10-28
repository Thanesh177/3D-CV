# Noir Cinematic Portfolio — Production Edition

A production-oriented, minimal cinematic portfolio built with Next.js 16, React 19, TypeScript, React Three Fiber, Drei, GSAP and Lenis.

## What is production-ready here

- Next.js App Router with metadata, sitemap, robots and web manifest
- Current Next.js 16 project structure and ESLint CLI workflow
- No external fonts, HDRIs or model downloads required at runtime
- Procedural WebGL hero with a custom GLSL material, transmission glass, deterministic fragments and scroll-directed scene poses
- Responsive layouts and a reduced-motion experience that removes WebGL entirely
- Real static case-study routes for every portfolio project
- Security headers including CSP, frame protection, MIME sniffing protection, Permissions Policy and HSTS in production
- Server-only AI endpoint using the OpenAI Responses API via `fetch`
- AI input validation, 500-character limit, timeout, no-store responses and lightweight abuse throttling
- Error and 404 routes
- Docker multi-stage deployment setup
- `lint`, `typecheck`, `build` and combined `check` scripts

## Requirements

- Node.js 20.9+ (Node 22 LTS recommended)
- npm 10+

## Install

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Before your first deployment

Edit `content/portfolio.ts` and replace the placeholder email, biography, project copy and project details.

Set these environment variables in your hosting provider:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
OPENAI_API_KEY=your_server_only_key
OPENAI_MODEL=gpt-5.6-luna
```

`OPENAI_API_KEY` is optional. Without it, the site stays fully usable and the assistant displays a configuration message.

## Verification

Run:

```bash
npm run check
```

That executes ESLint, TypeScript validation and a production Next.js build.

## Vercel

1. Push this directory to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables above.
4. Deploy.

No custom Vercel configuration is required.

## Docker

The project is configured with `output: "standalone"` and includes a multi-stage Dockerfile.

```bash
docker build -t noir-portfolio .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  noir-portfolio
```

## Performance notes

The 3D scene is procedural and deliberately avoids large GLB or HDR assets. DPR is capped, particle counts are conservative, transmission resolution is limited, and reduced-motion users receive a static experience. For a final launch, profile the target devices in Chrome Performance and Safari Web Inspector before increasing shader complexity or particle density.

## AI rate limiting

The included rate limiter is intentionally lightweight and process-local. It is useful as a basic guard, but a high-traffic serverless deployment should replace it with a durable distributed limiter such as Upstash Redis, Vercel KV or an equivalent service.

## Security note

The security headers are safe defaults for the included project. If you add third-party analytics, video, image CDNs or other APIs, update the Content Security Policy in `next.config.ts` rather than weakening it globally.
