import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/stamp/', // GitHub Pages 배포를 위한 저장소 이름 지정
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sub: resolve(__dirname, 'sub.html'),
        nuri: resolve(__dirname, 'nuri.html'),
      },
    },
  },
})
