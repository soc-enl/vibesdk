# CLAUDE.md

Guidance for working in this repository.

## Project

- Deployment target: Cloudflare Pages
- Project name: `vibesdk-app`
- Production URL: `https://vibesdk-app.pages.dev`
- App type: static frontend (no Worker runtime)

## Commands

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run typecheck` - TypeScript checks
- `npm run lint` - lint checks
- `npm run deploy` - deploy to Cloudflare Pages

## Coding standards

- Use TypeScript strict mode compatible code
- Avoid `any`; prefer explicit interfaces/types
- Keep comments concise and purposeful
- Prefer small, focused components and utilities
