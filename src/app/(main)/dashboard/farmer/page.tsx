"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import withAuthorization from '@/components/withAuthorization';
import { UserRole } from "@/lib/types";

// Placeholder for icons
import { Bot, Users } from "lucide-react";

// Re-using existing cards
import { WeatherCard } from '@/components/farmers/WeatherCard';
import { MandiRatesCard } from '@/components/farmers/MandiRatesCard';
import { CropInsightsCard } from '@/components/farmers/CropInsightsCard';
import { VillageIntelligence } from '@/components/dashboard/farmer/VillageIntelligence';
import { TopFarmerLeaderboard } from '@/components/dashboard/farmer/TopFarmerLeaderboard';
import { CropIntelligence } from "@/components/gis/CropIntelligence";
import { Marketplace } from "@/components/gis/Marketplace";

// Welcome header
const WelcomeHeader = () => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Welcome back, [Farmer Name]!</h1>
        <p className="text-muted-foreground">Here’s a snapshot of your farm today.</p>
    </div>
);

// "My Farm" widget
const MyFarmWidget = () => (
    <Card>
        <CardHeader>
            <CardTitle>My Farm Overview</CardTitle>
            <CardDescription>A quick look at your primary crop's health and progress.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="font-medium">Wheat - Growth Stage: Tillering</span>
                <span className="text-sm text-muted-foreground">Est. Harvest: 45 days</span>
            </div>
            <Progress value={60} className="w-full" />
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Soil Moisture</p>
                    <p className="font-semibold">Optimal</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Nutrient Levels</p>
                    <p className="font-semibold">Good</p>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button size="sm">Manage Farm</Button>
        </CardFooter>
    </Card>
);

// AI Assistant widget
const AssistantWidget = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center"><Bot className="mr-2" /> AI Kisan Assistant</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4">Have a question? Get instant advice on crops, pests, and more.</p>
            <Button className="w-full">Ask a Question</Button>
        </CardContent>
    </Card>
);

// Community widget
const CommunityWidget = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center"><Users className="mr-2" /> Community Hot Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
                <p>New subsidy for organic farming</p>
                <Button variant="outline" size="sm">View</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-sm">
                <p>Best practices for drip irrigation?</p>
                <Button variant="outline" size="sm">View</Button>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-sm">
                <p>Mandi rates in Nashik are soaring!</p>
                <Button variant="outline" size="sm">View</Button>
            </div>
        </CardContent>
    </Card>
);

function FarmerDashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* <WelcomeHeader /> */}

      {/* Section 1: At a Glance */}
      {/* <div> */}
        {/* <h2 className="text-2xl font-bold tracking-tight mb-4">At a Glance</h2> */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
          {/* <div className="lg:col-span-2"> */}
            {/* <MyFarmWidget /> */}
          {/* </div> */}
          {/* <div className="space-y-6"> */}
            {/* <AssistantWidget /> */}
            {/* <CommunityWidget /> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}

      {/* <Separator /> */}

      {/* Section 2: Farm Intelligence */}
      {/* <div> */}
        {/* <h2 className="text-2xl font-bold tracking-tight mb-4">Farm Intelligence</h2> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
            {/* <WeatherCard /> */}
            {/* <CropInsightsCard /> */}
        {/* </div> */}
        {/* <div className="mt-6"> */}
            {/* <CropIntelligence /> */}
        {/* </div> */}
      {/* </div> */}

      {/* <Separator /> */}

      {/* Section 3: Market & Community Insights */}
       {/* <div> */}
        {/* <h2 className="text-2xl font-bold tracking-tight mb-4">Market & Community</h2> */}
        {/* <div className="space-y-6"> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                {/* <MandiRatesCard /> */}
                {/* <Marketplace /> */}
            {/* </div> */}
            {/* <TopFarmerLeaderboard /> */}
        {/* </div> */}
      {/* </div> */}

      {/* <Separator /> */}

      {/* Section 4: Village Analytics */}
      {/* <div> */}
        {/* <h2 className="text-2xl font-bold tracking-tight mb-4">Village View</h2> */}
        {/* <VillageIntelligence /> */}
      {/* </div> */}

    </div>
  );
}

export default withAuthorization(FarmerDashboard, [UserRole.FARMER]);