import { defineCollection, defineConfig, s } from 'velite';

const posts = defineCollection({
    name: "Post",
    pattern: "blog/**/*.mdx",
    schema: s.object({
        slug: s.path(),
        title: s.string(),
        date: s.isodate(),
        content: s.mdx(),
    }),
});

export default defineConfig({
    collections: { posts },
});
