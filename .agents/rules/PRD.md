# PRD — Product rulebook

Read when building features or judging what to build.

## Scope discipline

- Build what was asked. Nothing speculative, nothing "while we're here".
- A feature is done when the user-visible behavior works and `npm run build` is green — not when the code feels complete.
- If a request is ambiguous, ask one concrete question; do not guess a product vision.

## Feature judgments

- Prefer removing or simplifying over adding. If a change can be a deletion, it should be.
- Every feature must earn its state: no loading spinners without async, no empty states without lists, no settings without consumers.
- Data comes from static demo data (`src/`). No backend, no fetch to a server, no env config.

## Acceptance

- A turn that touches product behavior ends with `npm run build` green.
- No feature ships with a knowingly broken edge case; cut the feature, not the edge case handling.
