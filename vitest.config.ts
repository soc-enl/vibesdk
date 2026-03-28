import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/.git/**',
			'**/container/monitor-cli.test.ts',
			'**/sdk/test/**',
		],
	},
});