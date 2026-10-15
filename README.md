# River's Edge

River's personal blog: war stories and lessons from a career in tech, plus
the some queer stuff!

Built with [Astro](https://astro.build) and served as static assets from
Cloudflare Workers.

## Commands

| Command           | Action                                                   |
| :---------------- | :------------------------------------------------------- |
| `npm install`     | Install dependencies                                     |
| `npm run dev`     | Dev server at `localhost:4321` (drafts are visible here) |
| `npm run check`   | Type-check `.astro` and `.ts` files                      |
| `npm run build`   | Build the production site into `./dist/`                 |
| `npm run preview` | Build, then serve `./dist/` through the Workers runtime  |
| `npm run deploy`  | Build and deploy to Cloudflare by hand                   |

## Writing a post

Add a Markdown (`.md`) or MDX (`.mdx`) file to `src/content/blog/`. The file
name becomes the URL: `src/content/blog/my-post.md` is served at `/blog/my-post/`.

```yaml
---
title: The Night the Queue Ate Itself
description: One-sentence summary, used for the post list, RSS, and link previews.
pubDate: 2026-10-14
updatedDate: 2026-10-20  # optional
heroImage: ../../assets/queue.jpg  # optional; also used as the social preview image
tags: [war-story, infra]  # optional; lowercase kebab-case
draft: true  # optional; drafts show up in `npm run dev` but never in production
---
```

The schema in `src/content.config.ts` validates frontmatter, so a typo fails
the build instead of shipping silently. Each tag gets its own page at
`/tags/<tag>/`.

## Deployment

Pushing to `main` deploys through Cloudflare
[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/).
One-time setup in the Cloudflare dashboard:

1. **Workers & Pages → Create application → Import a repository**, then pick
   `itsthatriver/blog`.
2. Build command: `npm run build`. Deploy command: `npx wrangler deploy`.
3. Once it's live, attach a custom domain to the `rivers-edge` Worker
   (**Settings → Domains & Routes**) and set `site` in `astro.config.mjs` to
   that domain. RSS, the sitemap, and canonical links are all built from it.

`wrangler.jsonc` holds the Worker config. The site is fully static, so it
needs no adapter or Worker script.

## Dependencies

`~/.npmrc` sets `min-release-age=7`, so new versions are installed only
after they've been public for a week. `package.json` overrides wrangler's
nested `sharp` to pick up a security fix; drop the override once wrangler
depends on `sharp >= 0.35.5` by itself.

## License

Code is MIT licensed (see [`LICENSE`](LICENSE)). Post content in
`src/content/` is © River, licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (see
[`src/content/LICENSE`](src/content/LICENSE)).
