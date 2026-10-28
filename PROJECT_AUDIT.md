# Production audit

Completed in this package:

- Current Next.js 16 application structure
- React 19-compatible React Three Fiber stack
- Strict TypeScript configuration
- ESLint 9 flat configuration
- Security response headers and CSP
- Metadata, Open Graph image route, sitemap, robots and manifest
- Procedural 3D scene with no remote model/HDR dependency
- Reduced-motion fallback that removes the WebGL scene
- Responsive layout and keyboard focus states
- Real case-study routes
- Server-only OpenAI Responses API integration
- Input limit, timeout, no-store response and basic abuse throttling
- Error, loading and not-found states
- Standalone Docker build configuration
- GitHub Actions CI workflow

Local static checks performed in the packaging environment:

- TypeScript/TSX syntax transpilation: passed for 24 source files
- package.json parsing: passed
- CSS brace validation: passed
- ZIP integrity: performed during packaging

Environment limitation:

The packaging container is configured to use an internal npm proxy that currently returns 404 for the `next` package, so dependencies cannot be installed here and a dependency-backed `next build` cannot be executed in this environment. Run `npm run check` after `npm install` on a normal npm connection; CI performs the same check.
