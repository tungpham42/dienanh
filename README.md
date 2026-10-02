# Phim Ảnh

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · inline SVG icons.

## Setup

1. `cp .env.example .env.local` and fill in `NEXT_TMDB_API_KEY`.
2. Copy your existing assets into `public/`: `banner.png`, `film.png`, `tv.png`, `tmdb.svg`, `1200x630.jpg`.
3. `npm install && npm run dev`

The TMDB key stays on the server. The browser calls `/api/media`, which proxies to TMDB.
