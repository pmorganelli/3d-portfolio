import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Serve the production security headers (vercel.json) from `vite preview` too,
// so a CSP violation shows up locally before it breaks the deployed site.
const vercelHeaders = Object.fromEntries(
  JSON.parse(fs.readFileSync(path.resolve(__dirname, "vercel.json"), "utf8"))
    .headers[0].headers.map(({ key, value }) => [key, value]),
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Never publish source maps — they'd expose the original source.
    sourcemap: false,
  },
  preview: {
    headers: vercelHeaders,
  },
})
