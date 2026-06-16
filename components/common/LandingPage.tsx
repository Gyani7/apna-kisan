
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Apna Kisan</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Testimonials
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 to-primary/30 dark:from-primary/20 dark:to-primary/40">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Welcome to Apna Kisan</h1>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">Your all-in-one platform for modern farming. Connect, trade, and grow with our comprehensive ecosystem.</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button size="lg" asChild>
                  <Link href="/register">Join Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Everything a Modern Farmer Needs</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg">From market access to expert advice, we've got you covered.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-background/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300 ease-in-out">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ShoppingBasketIcon className="w-6 h-6" /> Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Buy and sell crops, livestock, and equipment directly with a nationwide network of buyers and sellers.</p>
                </CardContent>
              </Card>
              <Card className="bg-background/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300 ease-in-out">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><MessageCircleIcon className="w-6 h-6" /> Community Forum</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Connect with fellow farmers and experts. Ask questions, share knowledge, and build your network.</p>
                </CardContent>
              </Card>
              <Card className="bg-background/70 backdrop-blur-sm hover:scale-105 transition-transform duration-300 ease-in-out">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><SparklesIcon className="w-6 h-6" /> AI Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get AI-powered insights on crop diseases, market trends, and personalized farming advice.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Trusted by Farmers Nationwide</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-background/70 backdrop-blur-sm">
                    <CardContent className="pt-6">
                        <blockquote className="text-lg leading-relaxed">
                            "Apna Kisan has revolutionized how I sell my produce. The marketplace is easy to use and I get much better prices."
                        </blockquote>
                        <div className="mt-4 font-semibold">- Ram Singh, Farmer</div>
                    </CardContent>
                </Card>
                <Card className="bg-background/70 backdrop-blur-sm">
                    <CardContent className="pt-6">
                        <blockquote className="text-lg leading-relaxed">
                           "The community forum is a goldmine of information. I've learned so much from experienced farmers and experts."
                        </blockquote>
                        <div className="mt-4 font-semibold">- Priya Sharma, Farmer</div>
                    </CardContent>
                </Card>
                 <Card className="bg-background/70 backdrop-blur-sm">
                    <CardContent className="pt-6">
                        <blockquote className="text-lg leading-relaxed">
                           "The AI assistant helped me identify a crop disease early and saved my entire harvest. It's a lifesaver!"
                        </blockquote>
                        <div className="mt-4 font-semibold">- Anil Kumar, Farmer</div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
                <div>
                    <h3 className="font-semibold text-lg">Is Apna Kisan free to use?</h3>
                    <p className="text-muted-foreground">Yes, the basic features of Apna Kisan are completely free for farmers and buyers. We may introduce premium features in the future.</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">How do I get an 'Expert' badge?</h3>
                    <p className="text-muted-foreground">Expert badges are manually awarded to users with verified credentials and a history of providing high-quality answers in the community forum.</p>
                </div>
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Apna Kisan. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function ShoppingBasketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 20.5 2.5 15a1 1 0 0 1-1-1.5 1 1 0 0 1 1.5-1L10 17l7.5-4.5a1 1 0 0 1 1.5 1 1 1 0 0 1-1 1.5L14 20.5"/>
      <path d="M10 20.5V10l4-2.5"/>
      <path d="m14 7.5-4 2.5V20.5"/>
      <path d="M10 10 2.5 5.5"/>
      <path d="m14 7.5 7.5-4.5"/>
      <path d="m10 10 11.5-7"/>
    </svg>
  )
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function SparklesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.94 14.34 8.5 13l-1.44 1.34L4 18l4 2 2.66-2.56L12 19l1.44-1.34L16 14l-4-4-2.06 2.34Z"/>
      <path d="M18 6 12 12"/>
      <path d="m22 2-2.5 5.5"/>
      <path d="m2 22 5.5-2.5"/>
      <path d="M13 8.5 14.34 9.94 18 4l-4-4-3.66 4.06L9 5l-1.44 1.34L2 12l4 4 2.56-2.66L10 15l1.34-1.44L17 8l-4-4Z"/>
    </svg>
  )
}
