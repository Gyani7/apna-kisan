
import { StickyHeader } from "@/components/home/StickyHeader";
import { SellProductForm } from "@/components/SellProductForm";

export default function SellPage() {
  return (
    <div className="dark flex flex-col h-screen">
        <StickyHeader />
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Sell Your Product</h1>
            <SellProductForm />
        </main>
    </div>
  );
}
