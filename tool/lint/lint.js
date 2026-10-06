#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

const args = process.argv.slice(2)
let dir = process.cwd()
let eslintJs
for (let i = 0; i < 10; i++) {
  const candidate = join(dir, 'node_modules', 'eslint', 'bin', 'eslint.js')
  if (existsSync(candidate)) {
    eslintJs = candidate
    break
  }
  const parent = dirname(dir)
  if (parent === dir) break
  dir = parent
}
if (!eslintJs) {
  console.error('lint: eslint not found; run from inside the project')
  process.exit(1)
}
const result = spawnSync(process.execPath, [eslintJs, ...(args.length ? args : ['.'])], { stdio: 'inherit' })
process.exit(result.status ?? 1)
