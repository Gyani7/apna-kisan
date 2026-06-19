'use client';

import Link from "next/link";
import { useAuth } from '@/components/AuthProvider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Cloudy, Newspaper, Wheat, Users, ShoppingCart, BarChart, CheckCircle } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative w-full pt-20 pb-20 md:pt-32 md:pb-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background"></div>
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-[0.02]"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter !leading-tight">
                Empowering India's Farmers with Technology and Community
              </h1>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
                Apna Kisan is a premium marketplace and agricultural platform designed to help you sell, learn, and grow. Join a network of successful farmers today.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
              {user ? (
                <Button size="lg" asChild className="shadow-lg shadow-primary/20 transform hover:scale-105 transition-transform duration-300">
                  <Link href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              ) : (
                <Button size="lg" asChild className="shadow-lg shadow-primary/20 transform hover:scale-105 transition-transform duration-300">
                  <Link href="/register">Join the Community <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              )}
              <Button size="lg" asChild variant="outline" className="shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Link href="/market">Explore Market</Link>
              </Button>
            </div>
            </div>
          </div>
        </section>

        {/* Key Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">10,000+</h3>
                <p className="text-muted-foreground">Verified Farmers</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">5,000+</h3>
                <p className="text-muted-foreground">Active Buyers</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">25,000+</h3>
                <p className="text-muted-foreground">Products Listed</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">₹1 Cr+</h3>
                <p className="text-muted-foreground">Transactions Facilitated</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <span className="text-primary font-semibold tracking-wide">FEATURES</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">The Ultimate Toolkit for Modern Farming</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground md:text-lg">
                From market access to AI-powered advice, we've got you covered.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard icon={<ShoppingCart className="h-8 w-8 text-primary" />} title="Direct-to-Buyer Marketplace" description="List your produce and sell directly to a nationwide network of buyers, ensuring better prices and faster payments." />
              <FeatureCard icon={<Users className="h-8 w-8 text-primary" />} title="Vibrant Farmer Community" description="Connect with peers, share knowledge, and discuss best practices in a supportive and engaging social feed." />
              <FeatureCard icon={<Bot className="h-8 w-8 text-primary" />} title="AI Kisan Assistant" description="Get instant, expert advice on crop diseases, weather patterns, and government schemes from our intelligent AI bot." />
              <FeatureCard icon={<BarChart className="h-8 w-8 text-primary" />} title="Live Mandi Rates" description="Access real-time pricing data from markets across India to make informed selling decisions." />
              <FeatureCard icon={<Newspaper className="h-8 w-8 text-primary" />} title="Scheme Matcher" description="Discover and apply for government schemes you're eligible for, all in one place." />
              <FeatureCard icon={<CheckCircle className="h-8 w-8 text-primary" />} title="Verified Profiles" description="Build trust with buyers through a verified profile badge, showcasing your credibility and quality." />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-28 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <span className="text-primary font-semibold tracking-wide">HOW IT WORKS</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Start Selling in 3 Simple Steps</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Create Your Profile</h3>
                <p className="text-muted-foreground">Sign up and get your profile verified to build trust with buyers.</p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-3xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold">List Your Products</h3>
                <p className="text-muted-foreground">Easily upload photos and details of your produce to the marketplace.</p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-3xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold">Connect & Transact</h3>
                <p className="text-muted-foreground">Receive inquiries, negotiate prices, and get paid securely.</p>
              </div>
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-28">
            <div className="container px-4 md:px-6">
                 <div className="text-center space-y-4 mb-16">
                    <span className="text-primary font-semibold tracking-wide">TESTIMONIALS</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">From Our Community</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <TestimonialCard name="Ramesh Kumar" location="Punjab" quote="Apna Kisan helped me get 20% more for my wheat crop. The direct connection to buyers is a game-changer." />
                  <TestimonialCard name="Sunita Devi" location="Maharashtra" quote="The AI assistant is like having an agronomist in my pocket! It helped me save my tomato crop from blight." />
                  <TestimonialCard name="Anil Singh" location="Uttar Pradesh" quote="Finally, a platform that understands the needs of Indian farmers. The community section is my favorite part." />
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="w-full py-20 bg-gradient-to-r from-primary to-green-600 text-primary-foreground">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Take Your Farm to the Next Level</h2>
                <p className="mt-3 max-w-xl mx-auto text-lg text-primary-foreground/80">Join thousands of smart farmers who are building a more profitable and sustainable future.</p>
                <div className="mt-8">
                    <Button size="lg" asChild variant="secondary" className="text-primary shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <Link href="/register">Sign Up for Free Today</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  )
}

// Helper component for Feature Cards
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-transparent border-border/50 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
          <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

// Helper component for Testimonial Cards
function TestimonialCard({ name, location, quote }: { name: string, location: string, quote: string }) {
  return (
    <Card className="bg-muted/30 border-none p-6">
      <CardContent className="p-0">
        <p className="mb-4">"{quote}"</p>
        <div className="flex items-center gap-3">
           <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
            {name.charAt(0)}
           </div>
           <div>
             <p className="font-semibold">{name}</p>
             <p className="text-sm text-muted-foreground">{location}</p>
           </div>
        </div>
      </CardContent>
    </Card>
  )
}
