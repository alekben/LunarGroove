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

## Deploy via GitHub Actions

1. Push this repo to GitHub.
2. In the Cloudflare dashboard, create an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Workers Scripts: Edit** permission.
3. Find your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) in the Cloudflare dashboard.
4. In your GitHub repo, add these secrets under **Settings → Secrets and variables → Actions**:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
5. Push to the `main` branch — the workflow in `.github/workflows/deploy.yml` deploys automatically.

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
