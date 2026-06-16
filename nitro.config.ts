import { defineNitroConfig } from 'nitro/config'
export default defineNitroConfig({
  preset: "cloudflare",
  routeRules: { '/**': { ssr: true } }
})
