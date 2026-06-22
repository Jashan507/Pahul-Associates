import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false, // auto-picks next free port if 5173 is busy
    open: true,
    watch: {
      ignored: ['**/src/assets/videos/**', '**/*.mp4', '**/*.webm', '**/*.mov'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    assetsInlineLimit: 0, // Never inline videos
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop();
          if (['mp4', 'webm', 'mov'].includes(ext)) {
            return 'assets/videos/[name]-[hash][extname]';
          }
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.mov'],
})
