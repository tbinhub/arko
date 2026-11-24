# Arko

Arko is a local-first visual workspace for software architecture, system design, workflows, and
technical diagrams. It combines a focused infinite canvas with architecture-aware components,
semantic connections, reusable templates, and portable exports.

## Current capabilities

- Workspace library with blank, web application, microservices, and event-driven templates
- Interactive React Flow canvas with drag-and-drop architecture components
- Custom nodes and semantic connections with labels, protocols, and animated data flow
- Inspector editing, selection, deletion, keyboard shortcuts, and undo/redo history
- Versioned local persistence and recent-document discovery
- Validated Arko JSON import/export and high-resolution PNG export
- ELK-powered automatic architecture layout loaded only when requested
- Responsive editing controls for desktop and mobile viewports

## Technology

- Next.js App Router with Cache Components and Partial Prerendering
- React, TypeScript, Tailwind CSS, and shadcn/Base UI primitives
- React Flow for graph interaction
- Zustand for command-oriented editor state
- Zod for the persisted document boundary
- ELK for layered graph layout
- Vitest and Playwright for unit and cross-browser coverage

The architectural decisions, state boundaries, and capability roadmap are documented in
[`docs/architecture.md`](docs/architecture.md).

## Local development

The repository pins Node.js and npm compatibility in `package.json`.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Development startup formats the repository before launching Next.js.

## Quality commands

```bash
npm run check       # formatting, lint, TypeScript, and unit tests
npm run build       # optimized Next.js production build
npm run test:e2e    # Chromium, Firefox, and WebKit
npm run audit:prod  # production dependency audit
```

## Persistence

The current product slice is intentionally local-first. Documents are schema-versioned and stored
in the browser. The domain model remains independent from the renderer so a future server
repository, sharing layer, or collaborative CRDT can replace local persistence without rewriting
the editor.
