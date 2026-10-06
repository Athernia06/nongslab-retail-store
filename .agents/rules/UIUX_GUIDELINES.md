# UI/UX rulebook

Read when touching UI, styling, layout, or accessibility.

## Stack facts

- Tailwind 4 via `@tailwindcss/vite` — no `tailwind.config.js`, no `postcss.config`; theme config lives in CSS.
- React 19. Function components and hooks only. No class components.
- Icons: `lucide-react`. No other icon source.

## Layout

- Mobile-first: base styles target phone widths; breakpoints push outward (`sm:` → `lg:`).
- One scroll container per view. Avoid nested scrollable panes.
- Spacing in Tailwind scale steps; no arbitrary pixel values unless provably needed.

## Accessibility

- Interactive things are buttons or links, not clickable divs.
- Every icon-only control gets `aria-label`.
- Visible focus states on all interactive elements; never remove outlines without a replacement.
- Color is never the only signal; pair with icon or text.

## Restraint

- Rework existing styles before inventing new ones. Reuse established class patterns in `src/`.
- No animation libraries. CSS transitions only.
- No screenshot verification — judge by structure and conformance to existing patterns.
