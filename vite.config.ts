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
		exclude: ['**/node_modules/**', '**/__e2e__/**'],
		coverage: {
			provider: 'istanbul',
			reporter: ['html'],
			exclude: [
				'**/node_modules/**',
				'**/__e2e__/**',
				'./src/App.tsx',
				'./src/main.tsx',
				'./src/libs/**',
				'./src/router/**',
				'./src/repositories/errors/**',
				'**/playwright-report/**',
				'.eslintrc.cjs',
			],
		},
	},
} as UserConfig & {
	test: InlineConfig;
});
