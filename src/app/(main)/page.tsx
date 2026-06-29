
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const featureItems = [
    { icon: Icons.market, title: "Marketplace", description: "Buy and sell crops, seeds, and equipment at the best prices directly from your phone." },
    { icon: Icons.aiDoctor, title: "AI Crop Doctor", description: "Diagnose crop diseases with a photo and get instant treatment advice from our AI." },
    { icon: Icons.weather, title: "Hyperlocal Weather", description: "Get accurate weather forecasts for your specific farm location to plan your activities." },
    { icon: Icons.schemes, title: "Government Schemes", description: "Discover and apply for government schemes and subsidies you are eligible for." },
    { icon: Icons.community, title: "Farmer Community", description: "Connect with other farmers, share knowledge, and solve problems together." },
    { icon: Icons.analytics, title: "Farm Analytics", description: "Track your farm's performance, expenses, and income to make data-driven decisions." }
];

const whyChooseUsItems = [
    { icon: Icons.verified, title: "Verified Information", description: "All information on our platform is verified by agricultural experts, ensuring you get reliable advice.", },
    { icon: Icons.logo, title: "Farmer-Centric Design", description: "Our app is designed with the farmer in mind, making it easy to use for everyone, regardless of technical skills.", },
    { icon: Icons.shield, title: "Data Privacy", description: "Your farm and personal data are secure with us. We are committed to protecting your privacy.", }
];

const testimonials = [
    {
        name: "Ramesh Patel",
        village: "Anand, Gujarat",
        image: "/images/ramesh-patel.jpg",
        quote: "Apna Kisan has transformed my farming. The AI Doctor saved my cotton crop from a disease I couldn't identify. I sold my produce at a 20% higher price through the marketplace."
    },
    {
        name: "Sunita Devi",
        village: "Hoshiarpur, Punjab",
        image: "/images/sunita-devi.jpg",
        quote: "The community feature is a blessing. I learned a new technique for potato farming from a fellow farmer in a different state. We are all like a big family here."
    },
    {
        name: "Karan Singh",
        village: "Barabanki, Uttar Pradesh",
        image: "/images/karan-singh.jpg",
        quote: "I used to struggle with understanding weather changes. Now, with the hyperlocal forecasts, I can plan my irrigation perfectly. My wheat yield has increased by 15%."
    }
];

const HomePage = async () => {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background text-foreground">
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm"
            style={{backgroundImage: "url('/images/agri-background.jpg')"}} />

          <div className="relative z-10 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-4">
              🌾 Welcome to Apna Kisan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              India's Digital Agriculture Network
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-lg text-foreground mb-12">
                <span className="flex items-center"><Icons.community className="w-6 h-6 mr-2 text-secondary"/>Connect with Farmers</span>
                <span className="flex items-center"><Icons.village className="w-6 h-6 mr-2 text-secondary"/>Explore Villages</span>
                <span className="flex items-center"><Icons.reels className="w-6 h-6 mr-2 text-secondary"/>Watch Reels</span>
                <span className="flex items-center"><Icons.aiDoctor className="w-6 h-6 mr-2 text-secondary"/>Get AI Advice</span>
            </div>

            <div className="flex justify-center gap-4">
              <Button size="lg" className="premium-button text-lg px-8 py-6 rounded-full">
                <Icons.community className="w-5 h-5 mr-2" />
                Join Community
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full bg-background/50 backdrop-blur-sm">
                <Icons.village className="w-5 h-5 mr-2" />
                Explore Village
              </Button>
               <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full bg-background/50 backdrop-blur-sm">
                <Icons.aiDoctor className="w-5 h-5 mr-2" />
                Ask AI Doctor
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight text-primary">Core Features</h2>
                <p className="text-lg text-muted-foreground mt-2">A complete toolkit for the modern farmer.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featureItems.map((feature, index) => (
                    <Card key={index} className="glass-card text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                                <feature.icon className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {profile?.premium && (
          <section className="py-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight text-primary">Premium Content</h2>
              <p className="text-lg text-muted-foreground mt-2">Welcome to the premium section!</p>
            </div>
          </section>
        )}

        {/* Why Choose Us Section */}
        <section className="py-20 bg-primary/5">
             <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight text-primary">Why Choose Apna Kisan?</h2>
                <p className="text-lg text-muted-foreground mt-2">Your trusted partner in agriculture.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {whyChooseUsItems.map((item, index) => (
                     <Card key={index} className="glass-card text-center animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                        <CardHeader>
                            <div className="mx-auto bg-secondary/10 p-3 rounded-full w-fit mb-3">
                                <item.icon className="w-7 h-7 text-secondary" />
                            </div>
                            <CardTitle className="text-primary">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight text-primary">Stories from Our Farmers</h2>
                <p className="text-lg text-muted-foreground mt-2">Real farmers, real impact.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="glass-card animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                        <CardContent className="pt-6">
                            <p className="text-lg italic text-foreground mb-4">"{testimonial.quote}"</p>
                            <div className="flex items-center">
                                <Avatar className="h-12 w-12 mr-4 border-2 border-secondary">
                                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-primary">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.village}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold tracking-tight text-primary mb-4">Join the Future of Farming Today!</h2>
                <p className="text-lg text-muted-foreground mb-8">Download the Apna Kisan app and become a part of a thriving community of modern farmers. Get the tools, knowledge, and support you need to succeed.</p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="premium-button text-lg px-8 py-6 rounded-full">
                        <Icons.download className="w-5 h-5 mr-2" />
                        Download App
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full bg-background/50 backdrop-blur-sm">
                        Contact Us
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
