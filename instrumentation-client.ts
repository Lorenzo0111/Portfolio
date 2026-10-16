import { initBotId } from "botid/client/core";
import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
  capture_exceptions: true,
  opt_out_capturing_by_default: true,
  opt_out_persistence_by_default: true,
  debug: process.env.NODE_ENV === "development",
});

initBotId({
  protect: [{ path: "/api/chat", method: "POST" }],
});
