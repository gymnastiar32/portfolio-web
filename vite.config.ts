import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from 'flowbite-react/plugin/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiProxyTarget = env.VITE_DEV_API_PROXY_TARGET || 'https://portfolio.gymapp.my.id'

  return {
    plugins: [react(), tailwindcss(), flowbiteReact()],
    server: {
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: true,
        },
        '/uploads': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  }
})
