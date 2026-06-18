'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Bot, Cloudy, Newspaper, Wheat } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <section id="hero" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-deep-green/20 dark:via-background dark:to-green-900/30 animate-gradient-xy"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
          
          <div className="relative z-10 container px-4 md:px-6">
            <div className="space-y-6 max-w-3xl mx-auto">
               <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
                Welcome to the Future of Indian Farming
              </h1>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
                A premium platform for farmers to connect, trade, and grow. Harness the power of AI and community to elevate your agricultural practice.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button size="lg" asChild className="shadow-lg shadow-primary/20 transform hover:scale-105 transition-transform duration-300">
                  <Link href="/ai-assistant">Ask AI Kisan <Bot className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" asChild variant="secondary" className="shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Link href="/market">Explore Market <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-background/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Weather Snapshot</CardTitle>
                  <Cloudy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28°C, Sunny</div>
                  <p className="text-xs text-muted-foreground">+5% from yesterday</p>
                </CardContent>
              </Card>
               <Card className="bg-background/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Today's Mandi Rates</CardTitle>
                  <Wheat className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹2,500/quintal</div>
                  <p className="text-xs text-muted-foreground">Wheat, Hapur Mandi</p>
                </CardContent>
              </Card>
               <Card className="bg-background/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Govt. Schemes</CardTitle>
                  <Newspaper className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">PM-KISAN</div>
                  <p className="text-xs text-muted-foreground">Next installment soon</p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Crop Insights</CardTitle>
                  <Bot className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Optimize Irrigation</div>
                  <p className="text-xs text-muted-foreground">Based on weather forecast</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-28 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <span className="text-primary font-semibold">Core Pillars</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">A Super App for the Super Farmer</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground md:text-lg">
                Integrated tools designed to boost your productivity, profitability, and knowledge.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-20 md:py-28 lg:py-32 bg-muted/40">
            <div className="container px-4 md:px-6">
                 <div className="text-center space-y-4 mb-16">
                    <span className="text-primary font-semibold">Voices of Our Community</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Why Farmers Trust Apna Kisan</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                </div>
            </div>
        </section>

        <section id="cta" className="w-full py-20 bg-gradient-to-r from-primary to-green-600 text-primary-foreground">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Grow with Us?</h2>
                <p className="mt-3 max-w-xl mx-auto text-lg text-primary-foreground/80">Join a community of forward-thinking farmers and unlock your farm's true potential.</p>
                <div className="mt-8">
                    <Button size="lg" asChild variant="secondary" className="shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <Link href="/register">Sign Up Free</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  )
}
