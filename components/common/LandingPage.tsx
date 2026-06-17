
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/Logo"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9] dark:bg-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white dark:bg-gray-800/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-8 w-8" />
          <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">Apna Kisan</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors" prefetch={false}>
            Features
          </Link>
          <Link href="#marketplace" className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors" prefetch={false}>
            Marketplace
          </Link>
          <Link href="#community" className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors" prefetch={false}>
            Community
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors" prefetch={false}>
            Testimonials
          </Link>
          <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/50">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full py-20 md:py-32 lg:py-40 xl:py-56 bg-gradient-to-br from-green-100 to-green-300 dark:from-green-900/40 dark:to-green-800/60">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-800 dark:text-white">
                India's Smart Farming Community
              </h1>
              <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300 md:text-xl">
                Apna Kisan connects you with a nationwide network of farmers, experts, and buyers to help you grow your farm and your profits.
              </p>
              <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
                <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white shadow-lg transform hover:scale-105 transition-transform">
                  <Link href="/register">Join the Community</Link>
                </Button>
                <Button size="lg" asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transform hover:scale-105 transition-transform">
                  <Link href="#marketplace">Explore Marketplace</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Empowering the Modern Farmer</h2>
              <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300 md:text-lg">Our comprehensive suite of tools is designed to help you succeed at every stage of your farming journey.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0 2c1.78 0 3.37.54 4.5 1.34a5.27 5.27 0 0 0-9 0c1.13-.8 2.72-1.34 4.5-1.34z"/></svg>
                  </div>
                  <CardTitle className="text-gray-800 dark:text-white">Vibrant Community</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-300">Connect, learn, and grow with a supportive network of farmers and agricultural experts.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                  </div>
                  <CardTitle className="text-gray-800 dark:text-white">Direct-to-Market</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-300">Sell your produce and equipment directly to buyers, ensuring fair prices and higher profits.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <CardHeader className="flex flex-col items-center text-center">
                   <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/></svg>
                  </div>
                  <CardTitle className="text-gray-800 dark:text-white">AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-300">Leverage AI for disease detection, crop recommendations, and real-time market data.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="marketplace" className="w-full py-16 md:py-24 lg:py-32 bg-[#F0F2F5] dark:bg-gray-800/50">
          <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Thriving Marketplace</h2>
                  <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300 md:text-lg">Discover a bustling hub for all your farming needs. Buy and sell with confidence.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <img src="/placeholder.svg" alt="Fresh Produce" className="w-full h-48 object-cover"/>
                      <CardContent className="p-4">
                          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Fresh Produce</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">Farm-fresh vegetables and fruits, straight from the source.</p>
                          <Button variant="link" className="text-green-600 dark:text-green-400 mt-4 p-0">Explore</Button>
                      </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <img src="/placeholder.svg" alt="Farm Equipment" className="w-full h-48 object-cover"/>
                      <CardContent className="p-4">
                          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Farm Equipment</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">New and used tractors, tools, and machinery for every need.</p>
                           <Button variant="link" className="text-green-600 dark:text-green-400 mt-4 p-0">Explore</Button>
                      </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <img src="/placeholder.svg" alt="Seeds & Fertilizers" className="w-full h-48 object-cover"/>
                      <CardContent className="p-4">
                          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Seeds & Fertilizers</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">High-quality seeds and organic fertilizers for a bountiful harvest.</p>
                           <Button variant="link" className="text-green-600 dark:text-green-400 mt-4 p-0">Explore</Button>
                      </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <img src="/placeholder.svg" alt="Livestock" className="w-full h-48 object-cover"/>
                      <CardContent className="p-4">
                          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Livestock</CardTitle>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">Healthy and well-bred livestock to expand your farm.</p>
                          <Button variant="link" className="text-green-600 dark:text-green-400 mt-4 p-0">Explore</Button>
                      </CardContent>
                  </Card>
              </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Voices of Our Community</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-green-500">
                    <CardContent className="pt-6">
                        <blockquote className="text-lg italic leading-relaxed text-gray-700 dark:text-gray-300">
                            "The direct market access has been a game-changer. I'm getting 20% better prices for my tomatoes!"
                        </blockquote>
                        <div className="mt-4 font-semibold text-gray-800 dark:text-white">- Rakesh Kumar, Maharashtra</div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-green-500">
                    <CardContent className="pt-6">
                        <blockquote className="text-lg italic leading-relaxed text-gray-700 dark:text-gray-300">
                           "I was new to farming, and the community forum provided me with invaluable guidance. I couldn't have done it without them."
                        </blockquote>
                        <div className="mt-4 font-semibold text-gray-800 dark:text-white">- Sunita Devi, Punjab</div>
                    </CardContent>
                </Card>
                 <Card className="bg-gray-50 dark:bg-gray-800/50 border-l-4 border-green-500">
                    <CardContent className="pt-6">
                        <blockquote className="text-lg italic leading-relaxed text-gray-700 dark:text-gray-300">
                           "The AI assistant correctly identified a pest issue and suggested an organic solution. My crops are healthier than ever."
                        </blockquote>
                        <div className="mt-4 font-semibold text-gray-800 dark:text-white">- Anand Patel, Gujarat</div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800/50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Your Questions, Answered</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                      <AccordionTrigger className="font-semibold text-lg">What is Apna Kisan?</AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                          Apna Kisan is a comprehensive digital platform designed to empower Indian farmers. It combines a social network, a marketplace, and an AI-powered advisory service to help farmers improve their productivity and profitability.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                      <AccordionTrigger className="font-semibold text-lg">How does the marketplace work?</AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                          Our marketplace allows farmers to list their products (crops, equipment, etc.) for sale. Buyers can browse these listings, contact sellers directly, and arrange for purchase and delivery. This peer-to-peer model ensures transparency and fair pricing.
                      </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                      <AccordionTrigger className="font-semibold text-lg">Is the AI assistant accurate?</AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                          Our AI assistant is trained on a vast dataset of agricultural information and is constantly learning. While it provides highly accurate recommendations, it should be used as a supplementary tool and not a replacement for professional veterinary or agricultural advice.
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

      </main>
      <footer className="bg-gray-800 text-white dark:bg-gray-900">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-4 md:px-6">
            <div className="space-y-4">
                <h3 className="font-bold text-lg">Apna Kisan</h3>
                <p className="text-gray-400">India's Smart Farming Community</p>
                <div className="flex gap-4">
                  <Link href="#" className="hover:text-green-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></Link>
                  <Link href="#" className="hover:text-green-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></Link>
                  <Link href="#" className="hover:text-green-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></Link>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-bold text-lg">Quick Links</h3>
                <ul className="space-y-2">
                    <li><Link href="#features" className="text-gray-400 hover:text-white">Features</Link></li>
                    <li><Link href="#marketplace" className="text-gray-400 hover:text-white">Marketplace</Link></li>
                    <li><Link href="#community" className="text-gray-400 hover:text-white">Community</Link></li>
                </ul>
            </div>
            <div className="spacey-4">
                <h3 className="font-bold text-lg">Legal</h3>
                <ul className="space-y-2">
                    <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                    <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                    <li><Link href="#" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
                </ul>
            </div>
             <div className="space-y-4">
                <h3 className="font-bold text-lg">Contact</h3>
                <ul className="space-y-2">
                    <li><a href="mailto:support@apnakisan.com" className="text-gray-400 hover:text-white">support@apnakisan.com</a></li>
                    <li><p className="text-gray-400">+91 12345 67890</p></li>
                </ul>
            </div>
        </div>
        <div className="py-4 border-t border-gray-700">
          <p className="text-center text-sm text-gray-500">&copy; 2024 Apna Kisan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
