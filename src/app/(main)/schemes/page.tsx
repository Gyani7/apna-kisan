import { getAllSchemes } from "@/lib/supabase/app-features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default async function SchemesPage() {
  const schemes = await getAllSchemes();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Government Schemes</h1>

      <Accordion type="single" collapsible className="w-full">
        {schemes.map((scheme) => (
          <AccordionItem key={scheme.id} value={scheme.id}>
            <AccordionTrigger>{scheme.name}</AccordionTrigger>
            <AccordionContent>
              <p className="mb-4">{scheme.description}</p>
              <h4 className="font-semibold mb-2">Eligibility</h4>
              <p className="mb-4">{scheme.eligibility}</p>
              <h4 className="font-semibold mb-2">Benefits</h4>
              <p className="mb-4">{scheme.benefits}</p>
              <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Learn More
              </a>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
