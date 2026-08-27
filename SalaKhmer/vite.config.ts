// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Azure is currently writing thousands of MP3 files. Watching each write
    // stalls TanStack's dev SSR runner and can leave localhost blank.
    // Keep one stable local URL for the owner.  `strictPort` deliberately fails
    // if another Vite process is still open instead of silently changing links.
    server: {
      port: 8081,
      strictPort: true,
      watch: { ignored: ["**/public/audio/**", "**/*.mp3.tmp"] },
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
