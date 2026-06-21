import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GovernmentSchemes() {
  // Mock data - replace with API data
  const schemes = [
    { name: "PM Kisan", deadline: "2024-12-31" },
    { name: "PMFBY", deadline: "2024-10-31" },
    { name: "KCC", deadline: "N/A" },
    { name: "Soil Health Card", deadline: "N/A" },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Government Schemes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {schemes.map((scheme) => (
            <Card key={scheme.name}>
              <CardHeader>
                <CardTitle>{scheme.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Deadline: {scheme.deadline}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
