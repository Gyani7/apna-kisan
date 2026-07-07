import { Input } from "@/components/ui/input";

export default function WeatherPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4">
            <Input
            type="search"
            placeholder="Search city..."
            className="flex-1 rounded-full bg-card py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
    </div>
  );
}
