# River's Edge — agent notes

## Content conventions

- Posts live in `src/content/blog/` as `.md` or `.mdx`. The frontmatter
  schema is in `src/content.config.ts`, and `README.md` documents each field.
- Tags are lowercase kebab-case (`war-story`, not `War Story`), and the
  schema rejects anything else. Reuse existing tags before inventing new ones:
  check `/tags/` or grep `tags:` in `src/content/blog/`.
- New posts start with `draft: true`. River flips the flag to publish. Never
  publish on River's behalf.
- Post content is © River under CC BY 4.0. Don't paste in third-party prose
  without attribution.
- Always read posts through `getPublishedPosts()` in `src/lib/posts.ts`, never
  `getCollection('blog')` directly. That helper is the only place drafts get
  filtered out.

## Quality gates

Run `npm run check && npm run build` before committing.

## Development

When starting the dev server, use background mode:

```sh
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles](https://docs.astro.build/en/guides/styling/)
- [Deploying to Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
