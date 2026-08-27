/* Builds a local-only review page for private handwriting candidates. */
const fs = require("fs");
const path = require("path");

const root = path.resolve(".reference/handwriting-derived");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const reviewed = manifest.records.filter((item) => item.candidateStatus === "needs-owner-review");
const cards = reviewed.map((item) => {
  const safeLabel = item.label || item.id;
  return `<article>
    <h2>${safeLabel}</h2>
    <p>${item.group} · ${item.candidatePathCount} centreline paths</p>
    <div class="images">
      <img src="${item.id}/review-mask.png" alt="${safeLabel} cleaned handwriting mask">
      <img src="${item.id}/review-skeleton.png" alt="${safeLabel} cleaned centreline candidate">
    </div>
    <a href="${item.id}/timeline-stages.png" target="_blank" rel="noreferrer">Open real animation stages</a>
    <small>Private reference only. Not approved for SalaKhmer production.</small>
  </article>`;
}).join("\n");

const page = `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SalaKhmer handwriting review</title>
<style>
body{margin:0;background:#eee8dc;color:#312a23;font-family:system-ui,sans-serif;padding:24px}
header,main{max-width:1200px;margin:auto}header{padding-bottom:8px}h1{margin:0;font-size:26px}header p{color:#685f54;line-height:1.5}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}
article{background:#fffaf0;border:1px solid #e4d0aa;border-radius:18px;padding:14px;display:grid;gap:8px}h2{margin:0;font-size:30px}p,small{margin:0;font-size:12px;color:#796e60}.images{display:grid;grid-template-columns:1fr 1fr;gap:6px}img{width:100%;min-height:130px;object-fit:contain;background:#111;border-radius:10px}a{color:#9d5500;font-weight:700;font-size:13px}
</style>
<header><h1>Handwriting candidates · owner review</h1><p>Every card comes from its own supplied video. “Open real animation stages” uses only the lower writing animation. Nothing here is shipped in the app.</p></header>
<main>${cards}</main></html>`;
fs.writeFileSync(path.join(root, "index.html"), page, "utf8");
console.log(`Wrote review board with ${reviewed.length} glyph candidates.`);
