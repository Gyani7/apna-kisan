
import { PageHeader } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { toTitleCase } from "@/lib/utils";

export default function BlogPage({ params }: { params: { slug: string } }) {
  const blogTitle = toTitleCase(params.slug.replace(/-/g, " "));

  return (
    <Shell>
      <article>
        <PageHeader
          title={blogTitle}
          description={`An AI-generated blog post about ${blogTitle}.`}
        />
        <div className="grid gap-8">
          {/* Add AI-generated content here */}
        </div>
      </article>
    </Shell>
  );
}
