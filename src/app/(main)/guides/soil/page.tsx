
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import Link from "next/link";

export default function SoilGuidesPage() {
  // In a real application, this data would come from a database or API.
  const soils = [
    { name: "Alluvial Soil", slug: "alluvial-soil" },
    { name: "Black Soil", slug: "black-soil" },
    { name: "Red Soil", slug: "red-soil" },
  ];

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Soil Guides</PageHeaderHeading>
        <PageHeaderDescription>Comprehensive guides for different types of soil.</PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-4">
        {soils.map((soil) => (
          <Link
            key={soil.slug}
            href={`/soil/${soil.slug}`}
            className="p-4 border rounded-lg hover:bg-muted"
          >
            {soil.name}
          </Link>
        ))}
      </div>
    </Shell>
  );
}
