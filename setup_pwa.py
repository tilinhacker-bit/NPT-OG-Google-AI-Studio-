import re

with open('vite.config.ts', 'r') as f:
    content = f.read()

import_str = "import { VitePWA } from 'vite-plugin-pwa';\nimport {defineConfig}"
content = content.replace("import {defineConfig}", import_str)

plugin_old = "plugins: [react(), tailwindcss()],"
plugin_new = """plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'NOGSH Portal 2026',
          short_name: 'NOGSH',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><rect width="192" height="192" fill="%234f46e5"/><text x="50%" y="50%" fill="white" font-size="48" font-family="sans-serif" font-weight="bold" text-anchor="middle" dominant-baseline="middle">NOGSH</text></svg>',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="%234f46e5"/><text x="50%" y="50%" fill="white" font-size="128" font-family="sans-serif" font-weight="bold" text-anchor="middle" dominant-baseline="middle">NOGSH</text></svg>',
              sizes: '512x512',
              type: 'image/svg+xml'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        }
      })
    ],"""

content = content.replace(plugin_old, plugin_new)

with open('vite.config.ts', 'w') as f:
    f.write(content)
