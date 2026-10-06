# AGENTS.md — nongslab-retail-store

Binding rules for every agent working in this repository. Read before touching any file.

## Identity

Vite + React 19 + Tailwind 4 retail-store demo (`package.json`). No backend.

## Absolute rules

1. **NEVER run long-running background server processes or preview servers.**
   Forbidden: `npm run preview`, `vite preview`, `npm run dev`, `vite`, `bin/vite`,
   any `--watch` process. Verify builds with `npm run build` (single-shot) only.
2. **ALWAYS run `npx lint` before finishing a turn** that touched any file.
   Auto-fix first (`npx lint --fix`), then check, then fix manually. Report the result; never skip.
3. **Write no comments** unless explicitly asked. No `TODO`s, no narrated diffs,
   no "this function does X" restatements.
4. **No emoji** anywhere — code, files, docs, UI copy. No exceptions.
5. **Zero fluff.** No filler phrases ("it should be noted", "in order to",
   "very important"), no restatement, no love-bombing, no moralizing apologies.
   Answer, fix, verify, stop.
6. **Anti-slop.** If you catch yourself writing prose to explain the change instead
   of changing code, delete the prose. Ship the change.

## Rulebooks (read on demand)

| Task ↦ rulebook                                                    |
|--------------------------------------------------------------------|
| Building features / judging what to build ↦ `.agents/rules/PRD.md` |
| UI / styling / layout / a11y ↦ `.agents/rules/UIUX_GUIDELINES.md`  |
| Any user-facing text / labels / empty states ↦ `.agents/rules/COPYWRITING_GUIDELINES.md` |

`.agents/skills/` may contain installed project skills; the task-dispatched rulebooks above apply regardless.

## Minimal-code (ponytail)

`/ponytail lite|full|ultra|off` is live. Assume `full` unless toggled: before
writing code, stop at the first rung that holds — does it need to exist (YAGNI)?
Does the standard library do it? A native platform feature? Can it be one line?
`<input type="date">` over a 400-line date picker. One file over a module when
reasonable. Mark deliberate corner-cuts with a `ponytail:` comment naming the
ceiling and upgrade path.

## Verification

- `npm run build` — the only exit gate; a turn that adds code without a green build is not done.
- `npx lint` — style gate, see Absolute rule 2.
- No preview, no dev server, no browser screenshots (`vite preview` is banned; see Absolute rule 1).
