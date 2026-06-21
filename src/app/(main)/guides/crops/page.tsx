
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import Link from "next/link";

export default function CropGuidesPage() {
  // In a real application, this data would come from a database or API.
  const crops = [
    { name: "Soybean", slug: "soybean" },
    { name: "Wheat", slug: "wheat" },
    { name: "Rice", slug: "rice" },
  ];

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Crop Guides</PageHeaderHeading>
        <PageHeaderDescription>Comprehensive guides for growing various crops.</PageHeaderDescription>
      </PageHeader>
      <div className="grid gap-4">
        {crops.map((crop) => (
          <Link
            key={crop.slug}
            href={`/crop/${crop.slug}`}
            className="p-4 border rounded-lg hover:bg-muted"
          >
            {crop.name}
          </Link>
        ))}
      </div>
    </Shell>
  );
}
