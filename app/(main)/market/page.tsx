
import { ProductCard } from "@/components/common/ProductCard"

export default function MarketplacePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Marketplace</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}
