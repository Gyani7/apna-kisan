import { notFound } from "next/navigation";
import { getWikiPage } from "@/lib/wiki";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function WikiPage({ params }: { params: { crop: string } }) {
  const page = await getWikiPage(params.crop);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
