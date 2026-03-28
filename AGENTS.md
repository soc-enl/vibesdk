# AGENTS.md

## Build/Test/Lint

- Build: `npm run build`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Test: `npm run test`
- Dev: `npm run dev`

## Project conventions

- Deploy as Cloudflare Pages project `vibesdk-app`
- Keep code frontend-only; do not add Worker runtime dependencies
- Use strict TypeScript types and avoid `any`
- Use concise comments and follow existing formatting
