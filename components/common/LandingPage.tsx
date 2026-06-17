import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/Logo"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Placeholder icons - in a real scenario, these would be imported from lucide-react or a similar library
const TractorIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18"/><path d="m19 17-3 3-4-4-5 5-5-5 3-3 4 4 4-4 3 3z"/><path d="M3 4v16"/><path d="M19 4v16"/></svg>;
const UsersIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const BotIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/><path d="M12 11V7"/><path d="M7 11v-1a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1"/><path d="M17 11V7"/></svg>;
const HeartHandshakeIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.06-.06L12 11l2.94-2.94c.82-.82 2.13-.82 2.94 0v0a2.17 2.17 0 0 0 0-3.08L12 5Z"/></svg>;
const CloudSunIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16a4 4 0 1 0-8 0"/><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6Z"/></svg>;
const BarChartIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>;
const LeafIcon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6c0 3.9-3.1 7-7 7Z"/><path d="M13.5 6.5A1.5 1.5 0 1 1 15 5a1.5 1.5 0 0 1-1.5 1.5Z"/></svg>;

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-8 w-8 text-green-600" />
          <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">Apna Kisan</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
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
        </nav>
        <div className="ml-auto lg:ml-6 flex items-center gap-2">
          <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/20">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="w-full py-24 md:py-32 lg:py-48 xl:py-56 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-green-900/20 dark:via-gray-950 dark:to-green-900/30">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-6">
               <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500">
                Empowering the Future of Indian Agriculture
              </h1>
              <p className="max-w-[700px] mx-auto text-gray-600 dark:text-gray-300 md:text-xl">
                Apna Kisan is a one-stop digital platform connecting farmers, buyers, and agricultural experts. Grow smarter, sell better, and build a stronger community.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 transform hover:scale-105 transition-transform duration-300">
                  <Link href="/register">Join as a Farmer</Link>
                </Button>
                <Button size="lg" asChild variant="secondary" className="shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Link href="/register">Register as a Buyer</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <span className="text-green-600 dark:text-green-400 font-semibold">Our Features</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">An Ecosystem for Growth</h2>
              <p className="max-w-[800px] mx-auto text-gray-500 dark:text-gray-400 md:text-lg">
                From AI-powered advice to a nationwide marketplace, we provide the tools you need to thrive.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full"><TractorIcon className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
                  <CardTitle>Smart Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  Connect directly with buyers and sell your produce at competitive prices. Transparent pricing and secure transactions.
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full"><UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
                  <CardTitle>Community Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  Share knowledge, ask questions, and learn from a network of fellow farmers and agricultural experts.
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full"><BotIcon className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
                  <CardTitle>AI Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  Get instant advice on crop management, fertilizers, and pest control from our intelligent Agri-assistant.
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full"><LeafIcon className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
                   <CardTitle>Crop Disease Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  Upload a photo of your crop to instantly identify diseases and get actionable solutions.
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full"><CloudSunIcon className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
                  <CardTitle>Weather Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  Access localized weather forecasts and advisories to plan your farming activities effectively.
                </CardContent>
              </Card>
               <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full"><BarChartIcon className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
                  <CardTitle>Mandi Price System</CardTitle>
                </CardHeader>
                <CardContent>
                  Stay updated with real-time market prices from various mandis across the country to maximize your profits.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-28 lg:py-32 bg-gray-50 dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <span className="text-green-600 dark:text-green-400 font-semibold">From Our Farmers</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Trusted by the Agricultural Community</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-t-4 border-green-500">
                <CardContent className="pt-6">
                  <p className="italic">"Apna Kisan's marketplace helped me get 20% more for my tomatoes. The direct connection to buyers is a game changer."</p>
                  <div className="mt-4 font-semibold">- Ramesh Kumar, Farmer, Haryana</div>
                </CardContent>
              </Card>
              <Card className="border-t-4 border-green-500">
                <CardContent className="pt-6">
                  <p className="italic">"The AI assistant correctly identified a fungal infection in my wheat crop. I saved my harvest thanks to the quick and accurate advice."</p>
                  <div className="mt-4 font-semibold">- Sunita Devi, Farmer, Punjab</div>
                </CardContent>
              </Card>
               <Card className="border-t-4 border-green-500">
                <CardContent className="pt-6">
                   <p className="italic">"Being part of the community feed makes me feel connected. We share tips, support each other, and grow together. It's the best."</p>
                  <div className="mt-4 font-semibold">- Anand Patel, Farmer, Gujarat</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-28 lg:py-32 bg-white dark:bg-gray-900">
            <div className="container px-4 md:px-6">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do I register as a farmer?</AccordionTrigger>
                            <AccordionContent>
                                Click the 'Get Started' or 'Join as a Farmer' button, fill in your details, and complete the verification process. You'll need to provide basic information about yourself and your farm.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is there a fee to use Apna Kisan?</AccordionTrigger>
                            <AccordionContent>
                                Basic registration and access to the community feed are free. We charge a small, transparent commission on successful transactions in the marketplace to maintain and grow the platform.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How does the crop disease detection work?</AccordionTrigger>
                            <AccordionContent>
                                Simply take a clear picture of the affected part of your plant and upload it through our AI Assistant. Our model, trained on millions of agricultural images, will analyze it and provide a diagnosis and treatment plan within seconds.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-4">
                            <AccordionTrigger>Can I trust the buyers on the marketplace?</AccordionTrigger>
                            <AccordionContent>
                                We have a verification process for buyers to ensure the legitimacy and reliability of participants in our marketplace. We also provide a rating and review system for added transparency.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section id="cta" className="w-full py-20 bg-gradient-to-r from-green-500 to-teal-600 text-white">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to revolutionize your farming?</h2>
                <p className="mt-3 max-w-xl mx-auto text-lg text-green-100">Join thousands of smart farmers and buyers on India's fastest-growing AgriTech platform.</p>
                <div className="mt-8">
                    <Button size="lg" asChild className="bg-white text-green-600 hover:bg-green-100 shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <Link href="/register">Sign Up Now</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-2 md:col-span-1">
             <Link href="#" className="flex items-center" prefetch={false}>
                <Logo className="h-8 w-8 text-green-500" />
                <span className="ml-3 text-xl font-bold">Apna Kisan</span>
              </Link>
            <p className="text-sm text-gray-400">Empowering the Indian farmer with technology.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-1">
                <li><Link href="#features" className="text-sm text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="#marketplace" className="text-sm text-gray-400 hover:text-white">Marketplace</Link></li>
                <li><Link href="/login" className="text-sm text-gray-400 hover:text-white">Login</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-1">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
           <div className="space-y-2">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-1">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white">support@apnakisan.com</Link></li>
            </ul>
          </div>
        </div>
        <div className="container px-4 md:px-6 mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Apna Kisan. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}
