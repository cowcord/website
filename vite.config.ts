import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	optimizeDeps: {
		exclude: [],
	},
	plugins: [qwikCity(), qwikVite(), tsconfigPaths({ root: '.' }), tailwindcss()],
	resolve: {
		alias: {
			'@comp': path.resolve('./src/components'),
			'@lib': path.resolve('./src/lib'),
			'@shared/*': path.resolve('./shared'),
		},
	},
	server: {
		headers: {
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	},
	preview: {
		headers: {
			'Cache-Control': 'public, max-age=600',
		},
	},
});
