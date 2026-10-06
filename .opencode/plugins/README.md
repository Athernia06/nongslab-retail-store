# .opencode/plugins/

Project-level OpenCode plugin directory.

External plugins (`@dietrichgebert/ponytail`, `@javargasm/opencode-graphify`,
`@omniroute/opencode-plugin`) are registered in `opencode.json` at the project
root and auto-installed from npm by OpenCode at startup — they do not need
local copies here.

Drop local `.mjs`/`.ts` plugins in this directory and register them in
`opencode.json` as `./.opencode/plugins/<name>.mjs` if you need custom logic.
