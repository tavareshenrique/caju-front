import path from 'node:path';

import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';
import type { InlineConfig } from 'vitest/node';

export default defineConfig({
	plugins: [react(), eslintPlugin()],
	server: {
		host: true,
		port: 3001,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		globals: true,
		setupFiles: ['./vitest-setup.ts'],
		environment: 'happy-dom',
	},
} as UserConfig & {
	test: InlineConfig;
});
