import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IndiaMap } from "./IndiaMap";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Satellite, 
  Sprout, 
  Droplets, 
  Wind, 
  ThermometerSun, 
  ShieldCheck, 
  Zap,
  Layers
} from "lucide-react";

export function GISDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-1">
      {/* Main Map View */}
      <Card className="lg:col-span-3 overflow-hidden border-none bg-emerald-950/20 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-emerald-900/40 to-transparent">
          <div>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-amber-400">
              Village Intelligence & Satellite Monitoring
            </CardTitle>
            <CardDescription className="text-emerald-100/60">
              Real-time geospatial analytics and hyperlocal crop health tracking
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-amber-500/10 border-amber-500/50 text-amber-400 hover:bg-amber-500/20 shadow-[0_0_15px_rgba(251,192,45,0.2)] transition-all duration-300">
              <Satellite className="mr-2 h-4 w-4" />
              Satellite View
            </Button>
            <Button variant="outline" size="sm" className="bg-emerald-500/10 border-emerald-500/50 text-emerald-400">
              <Layers className="mr-2 h-4 w-4" />
              Layers
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-[600px] relative p-0 overflow-hidden">
          {/* Mock Interactive Map Container */}
          <div className="absolute inset-0 bg-[#0a1a12] flex items-center justify-center">
            <IndiaMap />
            {/* Floating Overlay Controls */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-3">
              <div className="glass-card p-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-wider text-emerald-500 font-bold mb-2">Legend</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span className="text-xs text-white/80">Optimal Growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                    <span className="text-xs text-white/80">Water Stress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                    <span className="text-xs text-white/80">Pest Detected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sidebar Intelligence Panels */}
      <div className="flex flex-col gap-6">
        {/* Soil Health Analysis */}
        <Card className="border-none bg-emerald-950/30 backdrop-blur-xl ring-1 ring-white/10 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center text-emerald-100">
              <Droplets className="mr-2 h-4 w-4 text-emerald-400" />
              Soil Health Index
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">Nitrogen (N)</span>
                <span className="text-emerald-400 font-medium">85%</span>
              </div>
              <Progress value={85} className="h-1.5 bg-emerald-900/50" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">Phosphorus (P)</span>
                <span className="text-emerald-400 font-medium">62%</span>
              </div>
              <Progress value={62} className="h-1.5 bg-emerald-900/50" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/60">Potassium (K)</span>
                <span className="text-amber-400 font-medium">45%</span>
              </div>
              <Progress value={45} className="h-1.5 bg-emerald-900/50" />
            </div>
            <div className="pt-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-none w-full justify-center py-1">
                <ShieldCheck className="mr-1 h-3 w-3" />
                Soil Grade: A+ (Premium)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Crop Health Status */}
        <Card className="border-none bg-emerald-950/30 backdrop-blur-xl ring-1 ring-white/10 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center text-emerald-100">
              <Sprout className="mr-2 h-4 w-4 text-emerald-400" />
              Crop Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Current NDVI</p>
                  <p className="text-sm font-bold text-white">0.78 (Healthy)</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/5 ring-1 ring-white/5 text-center">
                <ThermometerSun className="mx-auto h-4 w-4 text-amber-500 mb-1" />
                <p className="text-[10px] text-white/40 uppercase">Temp</p>
                <p className="text-sm font-bold text-white">28°C</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 ring-1 ring-white/5 text-center">
                <Wind className="mx-auto h-4 w-4 text-blue-400 mb-1" />
                <p className="text-[10px] text-white/40 uppercase">Humidity</p>
                <p className="text-sm font-bold text-white">65%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}