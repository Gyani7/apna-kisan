
import { CreatePost } from "@/components/community/CreatePost";
import { PostList } from "@/components/community/PostList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Flame, MessageCircle, BarChart2 } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Updated Stories component to fetch real data
async function Stories() {
    const supabase = createSupabaseServerClient();
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .limit(10);

    if (error) {
        console.error('Error fetching profiles for stories:', error);
        return null; // Or show a fallback UI
    }

    return (
        <Card className="mb-8 card-glass bg-premium-green-dark/60 border-premium-gold/30">
            <CardHeader>
                <CardTitle className="text-premium-gold">Farmer Stories</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4 overflow-x-auto p-4">
                {profiles.map((profile) => (
                    <div key={profile.id} className="flex flex-col items-center space-y-2">
                        <Avatar className="h-16 w-16 border-2 border-premium-gold">
                            <AvatarImage src={profile.avatar_url} alt={profile.name} />
                            <AvatarFallback>{profile.name?.[0] || 'F'}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm text-premium-white/80">{profile.name}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}


// Updated VillageHub component to fetch real data
async function VillageHub({ user }: { user: any }) {
    const supabase = createSupabaseServerClient();
    // Fetch top farmers - assuming a 'rank' column in profiles
    const { data: topFarmers, error: farmersError } = await supabase
        .from('profiles')
        .select('name, avatar_url, rank_title') // Assuming a 'rank_title' for subtitle
        .order('rank', { ascending: true })
        .limit(2);

    // Fetch current user's ranking - assuming a 'rank' in their profile
    const { data: currentUserProfile, error: userProfileError } = await supabase
        .from('profiles')
        .select('rank')
        .eq('id', user.id)
        .single();

    if (farmersError || userProfileError) {
        console.error('Error fetching village hub data:', farmersError || userProfileError);
        // Render with placeholder data or an error message
    }

    return (
        <Card className="card-glass bg-premium-green-dark/60 border-premium-gold/30">
            <CardHeader>
                <CardTitle className="text-premium-gold">Your Village Hub</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-lg text-premium-white mb-2">Top Farmers</h3>
                    <div className="space-y-3">
                        {topFarmers && topFarmers.map((farmer: any, index: number) => (
                            <div key={index} className="flex items-center space-x-3">
                                <Crown className="text-premium-gold h-6 w-6" />
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={farmer.avatar_url} alt={farmer.name} />
                                    <AvatarFallback>{farmer.name?.[0] || 'F'}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-premium-white">{farmer.name}</p>
                                    <p className="text-sm text-premium-white/70">{farmer.rank_title || 'Top Farmer'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-premium-white mb-2">Village Rankings</h3>
                    <p className="text-premium-white/80">You are currently ranked #{currentUserProfile?.rank || 'N/A'} in your village.</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-premium-white mb-2">Best Performing Crop</h3>
                     <p className="text-premium-white/80">Wheat (Variety-343) - 25% above average yield.</p>
                </div>
            </CardContent>
        </Card>
    );
}

// Updated CommunityInsights to fetch real data
async function CommunityInsights() {
    const supabase = createSupabaseServerClient();
    const { data: insights, error } = await supabase
        .from('community_insights')
        .select('trending_discussions, live_qa, success_stories')
        .single();

    if (error) {
        console.error('Error fetching community insights:', error);
        return null;
    }

    return (
        <Card className="card-glass bg-premium-green-dark/60 border-premium-gold/30">
            <CardHeader>
                <CardTitle className="text-premium-gold">Community Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-lg text-premium-white mb-2 flex items-center"><Flame className="mr-2 text-premium-gold" /> Trending Discussions</h3>
                    <ul className="list-disc list-inside text-premium-white/80 space-y-1">
                        {insights.trending_discussions?.map((discussion: string, index: number) => <li key={index}>{discussion}</li>) || <li>No trending discussions.</li>}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-premium-white mb-2 flex items-center"><MessageCircle className="mr-2 text-premium-gold" /> Live Q&A</h3>
                    <p className="text-premium-white/80">{insights.live_qa || 'No live Q&A currently.'}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-premium-white mb-2 flex items-center"><BarChart2 className="mr-2 text-premium-gold" /> Success Stories</h3>
                    <p className="text-premium-white/80">{insights.success_stories || 'No success stories yet.'}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default async function CommunityPage() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
        <main className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column */}
            <div className="hidden lg:block lg:col-span-1">
               <VillageHub user={session?.user}/>
            </div>

            {/* Center Column */}
            <div className="lg:col-span-2">
                <Stories />
                <CreatePost user={session?.user} />
                <div className="mt-8">
                    <PostList />
                </div>
            </div>

            {/* Right Column */}
            <div className="hidden lg:block lg:col-an-1">
                <CommunityInsights/>
            </div>
        </main>
    </div>
  );
}
