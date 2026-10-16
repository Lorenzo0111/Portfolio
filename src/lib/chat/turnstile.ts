export const TURNSTILE_ACTION = "chat";
export const TURNSTILE_FIELD = "cf-turnstile-response";

const isProduction = process.env.NODE_ENV === "production";

const allowedHostnames = isProduction
  ? ["lorenzo0111.me", "www.lorenzo0111.me"]
  : [];

/**
 * Without a secret the check is only skipped in development.
 */
export const isTurnstileConfigured = () =>
  !!process.env.TURNSTILE_SECRET_KEY || !isProduction;

type SiteverifyResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
  metadata?: { result_with_testing_key?: boolean };
};

/**
 * Redeems a Turnstile token. Tokens are single use, so every chat message
 * must come with a fresh one.
 */
export async function verifyTurnstile(token: unknown, remoteIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return !isProduction;

  if (typeof token !== "string" || token.length === 0 || token.length > 2048)
    return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        signal: AbortSignal.timeout(10_000),
      },
    );
    const result: SiteverifyResponse = await response.json();

    // Cloudflare's test keys return no action and a fake hostname
    const testKey = result.metadata?.result_with_testing_key === true;
    const skipChecks = testKey && !isProduction;

    const hostnameAllowed =
      skipChecks ||
      allowedHostnames.length === 0 ||
      allowedHostnames.includes(result.hostname?.toLowerCase() ?? "");

    if (
      result.success !== true ||
      (testKey && isProduction) ||
      (!skipChecks && result.action !== TURNSTILE_ACTION) ||
      !hostnameAllowed
    ) {
      console.warn("Turnstile verification failed", {
        errors: result["error-codes"],
        action: result.action,
        hostname: result.hostname,
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error("Turnstile siteverify request failed", error);
    return false;
  }
}
