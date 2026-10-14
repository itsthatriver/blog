import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Tags become URLs (/tags/<tag>/), so keep them lowercase kebab-case.
const tag = z
	.string()
	.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Tags must be lowercase kebab-case, e.g. "war-story"');

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(tag).default([]),
			// Drafts render in `astro dev` but are excluded from production builds.
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
