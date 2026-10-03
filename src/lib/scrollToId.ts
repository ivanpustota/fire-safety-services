export function scrollToId(id: string, attempts = 0) {
  const el = document.getElementById(id);
  if (!el) {
    if (attempts < 30) requestAnimationFrame(() => scrollToId(id, attempts + 1));
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  [700, 1400, 2400].forEach((ms) => {
    setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      if (Math.abs(target.getBoundingClientRect().top - offset) > 6) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, ms);
  });
}
