// One-Line Office Joke: 24-Hour Sprint — make.fun entry (zxpast/makefun-office-joke-sprint).
// Node 22, stdlib only. Writes exactly one joke line to
// `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`).
// Deterministic: fixed string, no clock, no randomness, no network,
// no external files.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "After the third lunch theft, the office fridge got a sign saying 'Do not eat what isn't yours', so I labelled mine 'Dave from Accounting'.";

// The pick, per skill humor-one-liner: the twist lands in the last words
// (the lunch is relabelled "Dave from Accounting"), a quote is the punchline,
// two concrete office images collide (fridge sign vs. feared accountant),
// and the narrator incriminates himself instead of explaining the joke.
// Setup:punchline is 17:8 words; no number is left unpaid ("third" motivates
// the sign); O1 web search found no verbatim copy of this line.

// Gate (mirrors the house gate): UTF-8 text, 1-200 chars, not only whitespace.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and prove the bytes on disk match the gated string.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt on disk does not match the gated line");
}
console.log(`wrote ${chars} characters to ${outPath}`);
