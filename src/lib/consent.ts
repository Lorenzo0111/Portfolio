import posthog from "posthog-js";

export type ConsentStatus = "granted" | "denied" | "pending";

const CHANGE_EVENT = "consentchange";

export function getConsent(): ConsentStatus {
  try {
    return posthog.get_explicit_consent_status();
  } catch {
    // PostHog isn't initialized (e.g. no key configured), nothing to consent to
    return "granted";
  }
}

export function setConsent(granted: boolean) {
  if (granted) posthog.opt_in_capturing();
  else posthog.opt_out_capturing();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Forgets the previous choice so the banner is shown again */
export function resetConsent() {
  posthog.clear_opt_in_out_capturing();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}
