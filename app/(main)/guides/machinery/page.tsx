
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import Link from "next/link";

export default function MachineryGuidesPage() {
  // In a real application, this data would come from a database or API.
  const machinery = [
    { name: "Tractor", slug: "tractor" },
    { name: "Harvester", slug: "harvester" },
    { name: "Thresher", slug: "thresher" },
  ];

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Machinery Guides</PageHeaderHeading>
        <PageHeaderDescription>
          Comprehensive guides for different types of agricultural machinery.
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-4">
        {machinery.map((item) => (
          <Link
            key={item.slug}
            href={`/machinery/${item.slug}`}
            className="p-4 border rounded-lg hover:bg-muted"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </Shell>
  );
}
