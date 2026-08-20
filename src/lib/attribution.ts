const STORAGE_KEY = 'pwaad_attribution';

const CLICK_ID_PARAMS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid', 'msclkid'] as const;
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export type Attribution = {
  clickIds: Record<string, string>;
  utm: Record<string, string>;
  landingPage: string;
  referrer: string;
  firstSeenAt: string;
  lastTouchAt: string;
};

function readParams(search: string, keys: readonly string[]) {
  const params = new URLSearchParams(search);
  const found: Record<string, string> = {};
  for (const key of keys) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  return found;
}

function load(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function save(attribution: Attribution) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Private browsing or storage disabled: attribution is best-effort only.
  }
}

/**
 * Ad click ids only exist on the URL of the page the ad landed on. Once the
 * visitor navigates to /contact they are gone, so they are persisted on first
 * load and read back at submit time.
 */
export function captureAttribution() {
  if (typeof window === 'undefined') return;

  const clickIds = readParams(window.location.search, CLICK_ID_PARAMS);
  const utm = readParams(window.location.search, UTM_PARAMS);
  const hasAdParams = Object.keys(clickIds).length > 0 || Object.keys(utm).length > 0;
  const existing = load();

  if (!hasAdParams && existing) return;

  const now = new Date().toISOString();
  save({
    clickIds,
    utm,
    landingPage: window.location.pathname + window.location.search,
    referrer: document.referrer,
    firstSeenAt: existing?.firstSeenAt ?? now,
    lastTouchAt: now,
  });
}

export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  return load();
}
