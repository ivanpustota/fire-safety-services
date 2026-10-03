const KEY = "pd_utm";
const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid"];

export function captureUtm() {
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  FIELDS.forEach((f) => {
    const v = params.get(f);
    if (v) found[f] = v;
  });
  if (Object.keys(found).length > 0) {
    found.landing = window.location.pathname + window.location.hash;
    sessionStorage.setItem(KEY, JSON.stringify(found));
  }
}

export function getUtmText(): string {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return "";
    const d = JSON.parse(raw) as Record<string, string>;
    return Object.entries(d).map(([k, v]) => `${k}=${v}`).join(", ");
  } catch {
    return "";
  }
}

export function withUtm(source: string): string {
  const t = getUtmText();
  return t ? `${source} [${t}]` : source;
}
