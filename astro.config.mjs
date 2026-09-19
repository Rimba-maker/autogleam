import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves a project site under /<repo>/. Only CI gets that base,
// so `npm run dev` / `build` / `preview` on localhost always stay at '/'.
const onPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  ...(onPages && { site: 'https://rimba-maker.github.io', base: '/autogleam' }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
