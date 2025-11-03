import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import { defineConfig } from "eslint/config";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

export default defineConfig([
  {
    extends: [...nextCoreWebVitals],
  },
]);
