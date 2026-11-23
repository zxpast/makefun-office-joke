// Make the AI Judge Laugh: Office Jokes.
//
// One original one-line joke about office life. The line is a single fixed
// string, so the program is deterministic: same bytes every run, no clock,
// no randomness, no network, no external files.
//
// The laugh: the setup quotes corporate feedback — "be 'more visible' in
// meetings" — and the punchline takes the jargon literally. The quotes mark
// the borrowed phrase, so the vest lands as the answer to the review itself:
// visibility, achieved with a hi-vis vest, not a better career.
import * as fs from "node:fs";
import * as path from "node:path";

// The line, built from two parts so the turn lands in order: the setup
// states the review's demand in its own quoted jargon, and the punchline
// answers it literally — visibility, achieved with a hi-vis vest.
const SETUP = "My performance review says I need to be 'more visible' in meetings,";
const PUNCH = "so now I attend them in a hi-vis vest.";
const LINE = `${SETUP} ${PUNCH}`;

// Gate: /output/entry.txt must be UTF-8 text of 1 to 199 characters,
// counted as Unicode code points, a single clean line with no newline,
// carriage return or trailing white space, and not only white space.
const codePoints = [...LINE].length;
if (
  codePoints < 1 ||
  codePoints > 199 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n") ||
  LINE.includes("\r") ||
  LINE !== LINE.trim()
) {
  throw new Error(`line is ${codePoints} code points, outside the 1-199 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");

console.log(LINE);
console.log(`(${codePoints} code points, ${Buffer.byteLength(LINE, "utf8")} bytes)`);
