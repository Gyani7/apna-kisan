
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Tractor, Wheat, Wind } from 'lucide-react';

const MarketplacePage = () => {
  // Mock data for product listings
  const products = [
    {
      id: 1,
      name: "Organic Wheat",
      seller: "Ram Kisan",
      price: "₹2,500 / quintal",
      location: "Pune, Maharashtra",
      image: "/product-wheat.jpg",
      verified: true,
    },
    {
      id: 2,
      name: "Mahindra Tractor - 575 DI",
      seller: "Sita Farm Equipment",
      price: "₹5,50,000",
      location: "Ludhiana, Punjab",
      image: "/product-tractor.jpg",
      verified: true,
    },
    {
      id: 3,
      name: "Bio-Pesticide (Neem)",
      seller: "Green Agro Solutions",
      price: "₹800 / liter",
      location: "Indore, Madhya Pradesh",
      image: "/product-pesticide.jpg",
      verified: false,
    },
    {
      id: 4,
      name: "Fresh Mangoes (Alphonso)",
      seller: "Ratnagiri Farms",
      price: "₹1,200 / dozen",
      location: "Ratnagiri, Maharashtra",
      image: "/product-mango.jpg",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <main className="max-w-8xl mx-auto">
        <header className="mb-8 text-center">
            <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gold-gradient">Krishi+ Marketplace</h1>
            <p className="text-xl text-premium-white/80">Your one-stop shop for buying and selling agricultural products.</p>
        </header>

        {/* Search and Filter Section */}
        <Card className="card-glass bg-premium-green-dark/70 border-premium-gold/30 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="lg:col-span-2">
                    <label className="text-premium-gold font-semibold">What are you looking for?</label>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-premium-gold/70" />
                       <Input placeholder='Search for "Tractor", "Organic Wheat"...' className="bg-premium-green-dark/50 border-premium-gold/50 rounded-md pl-10 text-white" />
                    </div>
                </div>
                 <div>
                    <label className="text-premium-gold font-semibold">Category</label>
                    <Select>
                        <SelectTrigger className="bg-premium-green-dark/50 border-premium-gold/50 rounded-md text-white">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="bg-premium-green-dark border-premium-gold/50 text-white">
                            <SelectItem value="produce">Produce</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="supplies">Supplies</SelectItem>
                             <SelectItem value="livestock">Livestock</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="bg-gold-gradient text-premium-green-dark font-bold text-lg">Search</Button>
            </div>
        </Card>

        {/* Featured Categories */}
        <section className="mb-12">
             <h2 className="text-3xl font-bold mb-6 text-center text-premium-white">Featured Categories</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <Card className="card-glass p-6 flex flex-col items-center justify-center bg-premium-green-dark/50 border-premium-gold/20 hover:border-premium-gold/50 transition-all duration-300">
                    <Wheat className="h-12 w-12 text-premium-gold mb-3" />
                    <p className="font-semibold text-xl text-premium-white">Fresh Produce</p>
                </Card>
                 <Card className="card-glass p-6 flex flex-col items-center justify-center bg-premium-green-dark/50 border-premium-gold/20 hover:border-premium-gold/50 transition-all duration-300">
                    <Tractor className="h-12 w-12 text-premium-gold mb-3" />
                    <p className="font-semibold text-xl text-premium-white">Farm Equipment</p>
                </Card>
                 <Card className="card-glass p-6 flex flex-col items-center justify-center bg-premium-green-dark/50 border-premium-gold/20 hover:border-premium-gold/50 transition-all duration-300">
                    <Wind className="h-12 w-12 text-premium-gold mb-3" />
                    <p className="font-semibold text-xl text-premium-white">Agri Supplies</p>
                </Card>
                 <Card className="card-glass p-6 flex flex-col items-center justify-center bg-premium-green-dark/50 border-premium-gold/20 hover:border-premium-gold/50 transition-all duration-300">
                    <MapPin className="h-12 w-12 text-premium-gold mb-3" />
                    <p className="font-semibold text-xl text-premium-white">Local Sellers</p>
                </Card>
             </div>
        </section>

        {/* Product Listings */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-premium-white">Hot Listings Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="card-glass bg-premium-green-dark/60 border-premium-gold/30 text-premium-white overflow-hidden group">
                <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
                    {product.verified && (
                        <span className="absolute top-2 right-2 bg-premium-gold text-premium-green-dark px-2 py-1 text-xs font-bold rounded-full">Verified Seller</span>
                    )}
                </div>
                <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-lg font-semibold text-premium-gold mb-2">{product.price}</p>
                    <p className="text-sm text-premium-white/70 mb-4">Seller: {product.seller}</p>
                    <div className="flex items-center text-sm text-premium-white/70">
                       <MapPin size={16} className="mr-2"/>
                       {product.location}
                    </div>
                </CardContent>
                <div className="p-4 border-t border-premium-gold/20">
                    <Button className="w-full bg-transparent border border-premium-gold text-premium-gold hover:bg-premium-gold hover:text-premium-green-dark transition-all duration-300">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MarketplacePage;
