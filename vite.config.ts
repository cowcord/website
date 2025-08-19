import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [qwikCity(), qwikVite(), tsconfigPaths({ root: '.' }), tailwindcss()],
	optimizeDeps: {
		exclude: [],
	},
	resolve: {
		alias: {
			'@comp': path.resolve('./src/components'),
			'@lib': path.resolve('./src/lib'),
		},
	},
	server: {
		headers: {
			'Cache-Control': 'public, max-age=0',
		},
	},
	preview: {
		headers: {
			'Cache-Control': 'public, max-age=600',
		},
	},
});
