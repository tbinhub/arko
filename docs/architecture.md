# Arko product architecture

## Product direction

Arko is a focused visual workspace for software architecture, system design, workflows, and
technical diagrams. The first product slice follows the low-friction editing model of AvyDraw,
while leaving room for animated data flow, presentation, import, and export capabilities inspired
by GravelGraph and Systory.

The interface should feel quiet and tool-like: the canvas owns most of the viewport, controls stay
close to the action they affect, and domain-specific defaults replace generic drawing complexity.

## Architectural principles

1. **The document model is independent of the renderer.** Persisted documents contain domain data,
   not React components or browser objects.
2. **Server by default, client at the editor boundary.** Next.js route files remain Server
   Components. The interactive editor is loaded as a dedicated Client Component.
3. **Feature ownership over technical buckets.** Diagram behavior lives under `features/diagram`;
   workspace behavior lives under `features/workspace`.
4. **Explicit state transitions.** Store actions are the only way to mutate a diagram. This makes
   undo/redo, persistence, collaboration, and tests predictable.
5. **Local-first, persistence-ready.** The MVP stores versioned documents locally. A repository
   interface will later allow the same domain model to be backed by Postgres and collaborative
   sync.
6. **Progressive capability.** Large optional tools such as auto-layout and export are loaded only
   when invoked.

## Route topology

```text
app/
├── page.tsx                    # Workspace library (Server Component shell)
└── editor/[documentId]/
    ├── loading.tsx             # Route loading state
    └── page.tsx                # Editor route and metadata
```

The workspace route is lightweight and discoverable. The editor route is isolated so its graph
runtime is not shipped to the workspace bundle.

## Feature topology

```text
features/
├── diagram/
│   ├── components/             # Canvas, nodes, edges, palette, inspector, toolbar
│   ├── model/                  # Versioned document types, catalog, templates, schemas
│   ├── store/                  # Editor state and command-oriented mutations
│   └── lib/                    # Serialization, layout, geometry, export
└── workspace/
    ├── components/             # Library shell, cards, template gallery
    ├── model/                  # Project summaries and workspace filters
    └── store/                  # Local project index
```

Shared, domain-agnostic primitives remain in `components/ui`. Cross-feature utilities remain in
`lib`. Feature modules may depend on shared modules, but shared modules must not import features.

## Diagram document model

Every document is versioned and serializable:

```text
DiagramDocument
├── schemaVersion
├── id, title, description
├── createdAt, updatedAt
├── viewport
├── nodes[]
│   ├── id, kind, position
│   └── data (label, description, icon, color, metadata)
└── edges[]
    ├── id, source, target
    └── data (label, protocol, animated, style)
```

React Flow node and edge types adapt this model at the feature boundary. Future schema changes use
explicit migrations keyed by `schemaVersion`.

## State boundaries

- **Persisted document state:** title, nodes, edges, viewport, document metadata.
- **Ephemeral editor state:** selection, open panel, active tool, connection preview, presentation
  mode.
- **Workspace state:** document summaries and recent activity.

Zustand owns the interactive editor state. Store selectors must be narrow so node dragging does not
re-render unrelated panels. History snapshots are recorded for user commands, not every pointer
movement.

## Persistence evolution

1. MVP: versioned `localStorage` documents and JSON import/export.
2. Product backend: Postgres document records through a server-only data access layer.
3. Collaboration: append-only operations or CRDT updates with presence stored separately from the
   durable document.
4. Asset storage: object storage for thumbnails, exports, and custom icon packs.

The UI must not call a future database directly. It will communicate through repository actions or
route handlers that return the same versioned document contract.

## Capability roadmap

1. Workspace library and templates.
2. Interactive architecture canvas with custom nodes and connections.
3. Inspector, keyboard commands, undo/redo, and local persistence.
4. JSON import/export, PNG/SVG export, and auto-layout.
5. Animated flows and presentation mode.
6. Authentication, cloud persistence, sharing, and collaboration.

## Dependency decisions

- `@xyflow/react`: accessible graph interaction, viewport, selection, handles, and custom nodes.
- `zustand`: small state layer aligned with React Flow's recommended production approach.
- `nanoid`: collision-resistant client-generated identifiers.
- `elkjs`: optional layered auto-layout for architecture diagrams; loaded on demand.

Dependencies are kept behind feature boundaries so alternatives can be introduced without leaking
their types across the application.
