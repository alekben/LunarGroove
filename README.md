# LunarGroove

A minimal frontend-only website served from **Cloudflare Workers**. No build step — just HTML, CSS, and JavaScript in `public/`.

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:8787`).

## Deploy manually

```bash
npm run deploy
```

You need the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) authenticated with your Cloudflare account:

```bash
npx wrangler login
```

## Automatic deploys

The Worker is connected to this GitHub repo through Cloudflare's Git integration (Workers Builds). Every push to `main` is built and deployed by Cloudflare; no GitHub Actions workflow or repo secrets are needed.

After deployment, your site is available at:

```
https://lunargroove.<your-subdomain>.workers.dev
```

You can add a custom domain in the Cloudflare Workers dashboard.

## Project structure

```
public/           Static frontend (HTML, CSS, JS)
src/worker.js     Minimal Worker that serves static assets
wrangler.toml     Cloudflare Workers configuration
```

## Customize

- Edit pages and styles in `public/`
- Change the Worker name in `wrangler.toml` (`name = "lunargroove"`) before deploying if you want a different subdomain
