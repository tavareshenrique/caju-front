import { resolve } from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig(({ command }) => ({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['html'],
    },
  },
  publicDir: command === 'serve' ? 'public' : false,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
    },
  },
}));
