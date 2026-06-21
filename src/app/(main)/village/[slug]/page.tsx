import { Metadata } from "next"
import { notFound } from "next/navigation"
import { constructMetadata, generateVillageSchema } from "@/lib/seo"
import { VillageAnalytics } from "@/components/gis/VillageAnalytics"
import { WeatherIntelligence } from "@/components/gis/WeatherIntelligence"
import { SoilIntelligence } from "@/components/gis/SoilIntelligence"
import { MarketIntelligence } from "@/components/gis/MarketIntelligence"
import { FarmerLeaderboard } from "@/components/gis/FarmerLeaderboard"
import { VillageExplorer } from "@/components/home/VillageExplorer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This represents a digital twin fetch for the Agri OS infrastructure
async function getVillageData(slug: string) {
  // Mocking database call for digital identity retrieval
  return {
    id: "v1",
    name: slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " "),
    village_code: "V-123456",
    district: "Sample District",
    state: "Sample State",
    population: 1200,
    main_crops: ["Wheat", "Mustard", "Cotton"],
    slug: slug
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const village = await getVillageData(params.slug)
  if (!village) return {}

  return constructMetadata({
    title: `${village.name} Village Intelligence | Apna Kisan`,
    description: `Real-time agricultural data, soil health, and farmer leaderboard for ${village.name}, ${village.district}, ${village.state}. Part of India's Agricultural Intelligence Network.`,
  })
}

export default async function VillagePage({ params }: { params: { slug: string } }) {
  const village = await getVillageData(params.slug)
  
  if (!village) {
    notFound()
  }

  const jsonLd = generateVillageSchema(village)

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-2xl border shadow-sm transition-all hover:shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{village.name}</h1>
            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md border">ID: {village.village_code}</span>
          </div>
          <p className="text-lg text-muted-foreground font-medium">
            {village.district}, {village.state}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {village.main_crops.map(crop => (
            <span key={crop} className="px-4 py-1.5 bg-green-50 text-green-700 border border-green-100 text-sm font-semibold rounded-full">
              {crop}
            </span>
          ))}
        </div>
      </header>

      <Tabs defaultValue="intelligence" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-3 bg-transparent p-0 mb-8">
          <TabsTrigger value="intelligence" className="py-3 data-[state=active]:bg-green-600 data-[state=active]:text-white border shadow-sm transition-all">
            Village Intel
          </TabsTrigger>
          <TabsTrigger value="weather" className="py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white border shadow-sm transition-all">
            Weather
          </TabsTrigger>
          <TabsTrigger value="soil" className="py-3 data-[state=active]:bg-amber-600 data-[state=active]:text-white border shadow-sm transition-all">
            Soil Health
          </TabsTrigger>
          <TabsTrigger value="market" className="py-3 data-[state=active]:bg-indigo-600 data-[state=active]:text-white border shadow-sm transition-all">
            Mandi Intel
          </TabsTrigger>
          <TabsTrigger value="community" className="py-3 data-[state=active]:bg-purple-600 data-[state=active]:text-white border shadow-sm transition-all">
            Leaderboard
          </TabsTrigger>
        </TabsList>
        
        <div className="min-h-[400px]">
          <TabsContent value="intelligence" className="mt-0 focus-visible:outline-none">
            <VillageAnalytics villageId={village.id} />
          </TabsContent>
          <TabsContent value="weather" className="mt-0 focus-visible:outline-none">
            <WeatherIntelligence location={`${village.name}, ${village.district}`} />
          </TabsContent>
          <TabsContent value="soil" className="mt-0 focus-visible:outline-none">
            <SoilIntelligence villageId={village.id} />
          </TabsContent>
          <TabsContent value="market" className="mt-0 focus-visible:outline-none">
            <MarketIntelligence district={village.district} />
          </TabsContent>
          <TabsContent value="community" className="mt-0 focus-visible:outline-none">
            <FarmerLeaderboard villageId={village.id} />
          </TabsContent>
        </div>
      </Tabs>

      <section className="pt-12 border-t">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Nearby Village Network</h2>
          <p className="text-sm text-muted-foreground font-medium">Explore the {village.district} cluster</p>
        </div>
        <div className="bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200">
          <VillageExplorer />
        </div>
      </section>
    </div>
  )
}