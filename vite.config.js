import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/react-firebase-comment-app/',
  plugins: [react()],
})