// Wedding decor woven into the page: flower-and-bell hangings from section corners,
// a shehnai in a couple of corners, and a kalash in both bottom corners at the end. Pastel invite palette.
// Each piece scrolls with its section and blends into the paper background.
(function () {
  const C = {
    rose1: "#eebcb7", rose2: "#f5d3cf", rose3: "#f9e4e1", roseLine: "#cf958f",
    mari1: "#f3c98f", mari2: "#f7dba6", mariLine: "#cf9a5e",
    leaf: "#c6d4b4", leafLine: "#9fb38a",
    gold: "#d6aa55", goldL: "#f4dca4", goldD: "#b58a3c",
    wash: "#f6e6de", pink: "#f3d2ca", line: "#c08a70", flame: "#f0b070",
  };
  const L = `stroke="${C.line}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`;

  const rose = (x, y, r, fill) => `<g transform="translate(${x} ${y})">
      <circle r="${r}" fill="${fill}" stroke="${C.roseLine}" stroke-width="1"/>
      <path d="M${-r * 0.55} ${r * 0.1} a${r * 0.55} ${r * 0.55} 0 1 1 ${r * 0.6} ${r * 0.5}" fill="none" stroke="${C.roseLine}" stroke-width=".9"/>
      <path d="M${-r * 0.22} ${-r * 0.05} a${r * 0.25} ${r * 0.25} 0 1 1 ${r * 0.28} ${r * 0.26}" fill="none" stroke="${C.roseLine}" stroke-width=".9"/></g>`;
  const marigold = (x, y, r) => `<g transform="translate(${x} ${y})">
      <circle r="${r}" fill="${C.mari1}" stroke="${C.mariLine}" stroke-width="1"/>
      <circle r="${r * 0.55}" fill="${C.mari2}" stroke="${C.mariLine}" stroke-width=".8"/>
      <circle r="${r * 0.18}" fill="${C.mariLine}"/></g>`;
  const leaf = (x, y, len, ang) => `<path transform="translate(${x} ${y}) rotate(${ang})"
      d="M0 0 C${len * 0.35} ${-len * 0.28} ${len * 0.75} ${-len * 0.22} ${len} 0 C${len * 0.75} ${len * 0.22} ${len * 0.35} ${len * 0.28} 0 0 Z"
      fill="${C.leaf}" stroke="${C.leafLine}" stroke-width=".9"/>`;
  const bell = (x, y) => `<g transform="translate(${x} ${y})">
      <circle cy="-1" r="2.4" fill="none" stroke="${C.goldD}" stroke-width="1.1"/>
      <path d="M-7 13 C-7 4 -4 1.5 0 1.5 C4 1.5 7 4 7 13 L9.5 16 H-9.5 Z" fill="${C.goldL}" stroke="${C.goldD}" stroke-width="1.1"/>
      <path d="M-4 6 Q0 4.5 4 6" fill="none" stroke="${C.gold}" stroke-width="1.1"/>
      <circle cy="18.5" r="2.3" fill="${C.gold}" stroke="${C.goldD}" stroke-width=".9"/></g>`;

  // One strand: flowers threaded on a gold string, ending in a bell
  const strand = (x, len, flowers) => {
    let s = `<path d="M${x} 0 V${len}" stroke="${C.gold}" stroke-width="1.3" stroke-dasharray="2.5 2"/>`;
    const gap = (len - 14) / flowers;
    for (let i = 0; i < flowers; i++) {
      const y = 12 + i * gap;
      s += leaf(x, y + 4, 9, i % 2 ? 140 : 40);
      s += i % 2 ? marigold(x, y, 5.5) : rose(x, y, 6, i % 4 ? C.rose2 : C.rose1);
    }
    return `<g class="d-strand" style="transform-origin:${x}px 0px">${s}${bell(x, len + 2)}</g>`;
  };

  const D = {
    // pair of hanging strands with a little floral knot at the top
    hanging: { vb: "0 0 64 190", svg: `${strand(16, 150, 5)}${strand(44, 100, 3)}
        ${leaf(4, 4, 16, 20)}${leaf(54, 4, 14, 160)}${rose(16, 4, 8, C.rose1)}${rose(44, 4, 7, C.rose2)}${rose(30, 2, 6, C.rose3)}` },

    kalash: { vb: "0 0 100 100", svg: `${[-56, -27, 0, 27, 56].map((a) => `<path transform="rotate(${a} 50 50)" d="M50 50 C44 40 45 28 50 20 C55 28 56 40 50 50 Z" fill="${C.leaf}" stroke="${C.leafLine}" stroke-width="1.2"/>`).join("")}
        <ellipse cx="50" cy="38" rx="9" ry="11" fill="#dcb48c" ${L}/>
        <rect x="39" y="48" width="22" height="7" rx="2" fill="${C.goldL}" stroke="${C.goldD}" stroke-width="1.3"/>
        <path d="M38 55 C22 62 22 88 50 91 C78 88 78 62 62 55 Z" fill="${C.goldL}" stroke="${C.goldD}" stroke-width="1.4"/>
        <path d="M30 68 Q50 76 70 68" fill="none" stroke="${C.gold}" stroke-width="2.2"/>
        <path d="M33 80 Q50 86 67 80" fill="none" stroke="${C.gold}" stroke-width="1" stroke-dasharray="2 2"/>
        ${leaf(20, 92, 14, -150)}${leaf(80, 92, 14, -30)}${rose(18, 90, 7, C.rose1)}${rose(82, 90, 7, C.rose2)}` },

    shehnai: { vb: "0 0 100 100", svg: `<g transform="rotate(-32 50 50)">
        <rect x="6" y="47.5" width="8" height="5" rx="1.5" fill="${C.goldL}" ${L}/>
        <path d="M14 48 L70 44.5 L70 55.5 L14 52 Z" fill="${C.wash}" ${L}/>
        <path d="M70 44.5 C80 41 86 35 93 30 L93 70 C86 65 80 59 70 55.5 Z" fill="${C.pink}" ${L}/>
        <path d="M20 47.6 V52.4 M66 44.8 V55.2" stroke="${C.gold}" stroke-width="2.2"/>
        ${[27, 35, 43, 51, 59].map((x) => `<circle cx="${x}" cy="50" r="1.2" fill="${C.line}"/>`).join("")}
        <path d="M66 55 Q65 64 63 70 M63 70 l-2.5 6 M63 70 l0 6.5 M63 70 l2.5 6" fill="none" ${L}/></g>
      <g class="d-notes" fill="${C.line}">
        <circle cx="84" cy="20" r="2.5"/><path d="M86.3 20 V9 l5 2" fill="none" ${L}/>
        <circle cx="72" cy="10" r="2"/><path d="M74 10 V2" fill="none" ${L}/></g>` },

  };

  // [section, piece, corner, mirror?]
  // Every piece is a mirrored pair: left as drawn, right flipped to face the centre
  const PLACES = [
    ["saying", "hanging", "tl"], ["saying", "hanging", "tr", true],
    ["moments", "shehnai", "bl"], ["moments", "shehnai", "br", true],
    ["schedule", "hanging", "tl"], ["schedule", "hanging", "tr", true],
    ["date", "hanging", "tl"], ["date", "hanging", "tr", true],
    ["countdown", "hanging", "tl"], ["countdown", "hanging", "tr", true],
    ["venue", "shehnai", "tl"], ["venue", "shehnai", "tr", true],
    ["venue", "kalash", "bl"], ["venue", "kalash", "br", true],
  ];

  window.DECOR = D;
  if (typeof document === "undefined" || !document.querySelector) return;
  PLACES.forEach(([sec, name, corner, flip]) => {
    const s = document.querySelector(`section.${sec}`);
    if (!s) return;
    const el = document.createElement("div");
    el.className = `decor d-${name} d-${corner}${flip ? " d-flip" : ""}`;
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<svg viewBox="${D[name].vb}">${D[name].svg}</svg>`;
    s.prepend(el);
    s.classList.add("has-decor");
  });
})();
