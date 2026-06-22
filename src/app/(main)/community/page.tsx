
import { CreatePost } from "@/components/community/CreatePost";
import { PostList } from "@/components/community/PostList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Flame, MessageCircle, BarChart2 } from "lucide-react";

// Placeholder for Stories component
const Stories = () => (
    <Card className="mb-8 card-glass bg-premium-green-dark/60 border-premium-gold/30">
        <CardHeader>
            <CardTitle className="text-premium-gold">Farmer Stories</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-4 overflow-x-auto p-4">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                    <Avatar className="h-16 w-16 border-2 border-premium-gold">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=a042581f4e29026704d${i}`} alt="Farmer story" />
                        <AvatarFallback>F{i+1}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-premium-white/80">Rakesh {i+1}</p>
                </div>
            ))}
        </CardContent>
    </Card>
);

// Placeholder for Village Hub component
const VillageHub = () => (
    <Card className="card-glass bg-premium-green-dark/60 border-premium-gold/30">
        <CardHeader>
            <CardTitle className="text-premium-gold">Your Village Hub</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <h3 className="font-semibold text-lg text-premium-white mb-2">Top Farmers</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <Crown className="text-premium-gold h-6 w-6" />
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704a" alt="Top Farmer" />
                            <AvatarFallback>V.S.</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-premium-white">Vijay Singh</p>
                            <p className="text-sm text-premium-white/70">Highest Yield</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-3">
                        <Crown className="text-premium-gold h-6 w-6" />
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704b" alt="Top Farmer" />
                            <AvatarFallback>R.K.</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-premium-white">Rani Devi</p>
                            <p className="text-sm text-premium-white/70">Best Crop Quality</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-premium-white mb-2">Village Rankings</h3>
                <p className="text-premium-white/80">You are currently ranked #5 in your village.</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-premium-white mb-2">Best Performing Crop</h3>
                 <p className="text-premium-white/80">Wheat (Variety-343) - 25% above average yield.</p>
            </div>
        </CardContent>
    </Card>
);

// Placeholder for Community Insights
const CommunityInsights = () => (
     <Card className="card-glass bg-premium-green-dark/60 border-premium-gold/30">
        <CardHeader>
            <CardTitle className="text-premium-gold">Community Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
             <div>
                <h3 className="font-semibold text-lg text-premium-white mb-2 flex items-center"><Flame className="mr-2 text-premium-gold" /> Trending Discussions</h3>
                <ul className="list-disc list-inside text-premium-white/80 space-y-1">
                    <li>New government subsidy for solar pumps.</li>
                    <li>Best practices for drip irrigation.</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-premium-white mb-2 flex items-center"><MessageCircle className="mr-2 text-premium-gold" /> Live Q&A</h3>
                 <p className="text-premium-white/80">Dr. Sharma is live now discussing pest control.</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg text-premium-white mb-2 flex items-center"><BarChart2 className="mr-2 text-premium-gold" /> Success Stories</h3>
                 <p className="text-premium-white/80">Read how Sunil doubled his income with new farming techniques.</p>
            </div>
        </CardContent>
    </Card>
)

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
        <main className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column */}
            <div className="hidden lg:block lg:col-span-1">
               <VillageHub />
            </div>

            {/* Center Column */}
            <div className="lg:col-span-2">
                <Stories />
                <CreatePost />
                <div className="mt-8">
                    <PostList />
                </div>
            </div>

            {/* Right Column */}
            <div className="hidden lg:block lg:col-span-1">
                <CommunityInsights/>
            </div>
        </main>
    </div>
  );
}
