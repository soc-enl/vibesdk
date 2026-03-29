import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import path from 'path';

import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
const plugins = [
  react(),
  svgr(),
  cloudflare({
    configPath: 'wrangler.jsonc',
  }),
  tailwindcss(),
  // sentryVitePlugin({
  //   org: 'cloudflare-0u',
  //   project: 'javascript-react',
  // }),
];
dotenv.config();

if (process.env.SENTRY_AUTH_TOKEN) {
  console.log('Sentry auth token found, adding sentry plugin');
  plugins.push(
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'enl',
      project: 'javascript-react',
    }),
  );
} else {
  console.log(
    'No Sentry auth token found, skipping sentry plugin',
    process.env.SENTRY_AUTH_TOKEN,
  );
}

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['format', 'editor.all'],
    include: ['monaco-editor/esm/vs/editor/editor.api'],
    force: true,
  },

  build: {
    sourcemap: true,
  },

  // build: {
  //     rollupOptions: {
  //       output: {
  //             advancedChunks: {
  //                 groups: [{name: 'vendor', test: /node_modules/}]
  //             }
  //         }
  //     }
  // },
  plugins,

  resolve: {
    alias: {
      debug: 'debug/src/browser',
      '@': path.resolve(__dirname, './src'),
      shared: path.resolve(__dirname, './shared'),
      worker: path.resolve(__dirname, './worker'),
    },
  },

  // Configure for Prisma + Cloudflare Workers compatibility
  define: {
    // Ensure proper module definitions for Cloudflare Workers context
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
    global: 'globalThis',
    // '__filename': '""',
    // '__dirname': '""',
  },

  worker: {
    // Handle Prisma in worker context for development
    format: 'es',
  },

  server: {
    allowedHosts: true,
  },

  // Clear cache more aggressively
  cacheDir: 'node_modules/.vite',
});
