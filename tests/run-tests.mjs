// Calm Signal: runs the SAME self-test suite as the in-browser "Self-test" panel (function CS_TESTS in index.html).
// Usage (Node 18+, no dependencies):  node tests/run-tests.mjs
// It loads the inline script from index.html in a sandbox with a minimal DOM stub, then calls CS_TESTS
// with file access, so the data checksum tests (T3b/T3c) run here even when a browser on file:// cannot.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const m = html.match(/<script>([\s\S]*)<\/script>/);
if (!m) { console.error("inline script not found"); process.exit(2); }

// Minimal inert DOM stub: every property/call returns another stub; nothing renders.
function stub() {
  const f = function () {};
  return new Proxy(f, {
    get(t, k) {
      if (k === Symbol.toPrimitive) return () => 0;
      if (k === "then") return undefined;
      if (k === "length") return 0;
      return stub();
    },
    set() { return true; },
    apply() { return stub(); },
    construct() { return stub(); },
  });
}
const ctx = {
  document: stub(), location: { search: "", href: "file:///index.html", protocol: "file:", origin: "null" },
  navigator: { onLine: true }, innerWidth: 1280, innerHeight: 800, devicePixelRatio: 1,
  matchMedia: () => ({ matches: true, addEventListener() {} }),
  requestAnimationFrame: () => 0, cancelAnimationFrame() {}, setTimeout: () => 0, clearTimeout() {},
  setInterval: () => 0, clearInterval() {}, addEventListener() {}, alert() {}, console,
  performance, URL, URLSearchParams, CS_NODE: true,
};
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(m[1], ctx, { filename: "index.html<script>" });

// Node replacement for the browser network check: scan index.html for third-party resources.
function offlineCheck() {
  const ext = [...html.matchAll(/<(script|link|img|iframe)\b[^>]*\b(src|href)=["']((?:https?:)?\/\/[^"']+)/gi)].map((x) => x[3]);
  const fetchExt = [...html.matchAll(/fetch\(\s*["'](https?:\/\/[^"']+)/g)].map((x) => x[1]).filter((u) => !/\/\/(localhost|127\.0\.0\.1)/.test(u));
  const all = ext.concat(fetchExt);
  return all.length ? "external: " + all.join(", ") : true;
}
const env = {
  readText: async (p) => readFileSync(join(root, p), "utf8"),
  sha256: async (p) => createHash("sha256").update(readFileSync(join(root, p))).digest("hex"),
  offlineCheck,
};
const res = await ctx.CS_TESTS(env);
let fail = 0;
for (const r of res) {
  if (r.status === "fail") fail++;
  console.log(`${r.status.toUpperCase().padEnd(4)}  ${r.id.padEnd(4)} ${r.name}${r.detail ? "\n            " + r.detail : ""}`);
}
const pass = res.filter((r) => r.status === "pass").length;
console.log(`\n${pass} pass, ${fail} fail, ${res.length - pass - fail} skipped  (${new Date().toISOString()})`);
process.exit(fail ? 1 : 0);
