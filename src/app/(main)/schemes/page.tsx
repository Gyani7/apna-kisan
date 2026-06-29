import { schemes as getAllSchemes } from "@/lib/supabase/app-features";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, CheckCircle2, ArrowRight } from "lucide-react";

export default function SchemesPage() {
  const schemes = getAllSchemes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-emerald-950/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-100">
              Sarkari Yojana <span className="text-yellow-600 dark:text-yellow-500">Checker</span>
            </h1>
            <p className="text-muted-foreground mt-2">Find and apply for government schemes tailored for your farm.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-1 rounded-full border border-emerald-100 dark:border-emerald-900 shadow-sm">
             <Button variant="ghost" className="rounded-full px-6 bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white">Active Schemes</Button>
             <Button variant="ghost" className="rounded-full px-6">My Applications</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Eligibility Filter Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="glass-card border-emerald-100/50 dark:border-emerald-800/50 shadow-xl overflow-hidden">
              <CardHeader className="bg-emerald-600/5 py-4">
                <CardTitle className="text-lg flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                  <Filter className="h-4 w-4" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>State</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-white/50 dark:bg-slate-900/50">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All India</SelectItem>
                      <SelectItem value="up">Uttar Pradesh</SelectItem>
                      <SelectItem value="pb">Punjab</SelectItem>
                      <SelectItem value="mh">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Scheme Category</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-white/50 dark:bg-slate-900/50">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="subsidy">Equipment Subsidy</SelectItem>
                      <SelectItem value="insurance">Crop Insurance</SelectItem>
                      <SelectItem value="credit">Kisan Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Land Size (Acres)</Label>
                  <Input type="number" placeholder="Enter land size" className="bg-white/50 dark:bg-slate-900/50" />
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 dark:shadow-none transition-all duration-300">
                  Check Eligibility
                </Button>
              </CardContent>
            </Card>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-200/50 dark:border-yellow-900/30">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-1 flex items-center gap-2">
                   <CheckCircle2 className="h-4 w-4" /> PM-Kisan Status
                </h4>
                <p className="text-sm text-yellow-700/80 dark:text-yellow-500/70 mb-3">Check your 15th installment status instantly.</p>
                <Button size="sm" variant="outline" className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20">Check Now</Button>
            </div>
          </aside>

          {/* Schemes Results */}
          <main className="lg:col-span-3 space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500 group-focus-within:text-emerald-600 transition-colors" />
              <Input 
                placeholder="Search schemes by name or keywords (e.g. Tractor, Urea)..." 
                className="pl-12 h-14 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-emerald-100 dark:border-emerald-800 rounded-2xl shadow-inner focus-visible:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schemes.map((scheme) => (
                <Card key={scheme.id} className="glass-card flex flex-col border-emerald-100/50 dark:border-emerald-800/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 hover:bg-emerald-100 border-none px-3">
                        {scheme.category || "Central Govt"}
                      </Badge>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">ID: {scheme.id.slice(0, 8)}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {scheme.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pt-2">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                      {scheme.description}
                    </p>
                    <div className="space-y-3 pt-4 border-t border-emerald-50 dark:border-emerald-900/50">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-600/70 dark:text-emerald-500/70 tracking-tighter">Eligibility</span>
                        <p className="text-xs font-medium line-clamp-1">{scheme.eligibility}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-yellow-600/70 dark:text-yellow-500/70 tracking-tighter">Key Benefit</span>
                        <p className="text-xs font-medium line-clamp-1">{scheme.benefits}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-3 pt-4">
                    <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30 font-semibold transition-colors">
                      Eligibility
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white border-none font-bold shadow-md shadow-amber-200/50 dark:shadow-none group/btn">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}