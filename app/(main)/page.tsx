import { Greeting } from "@/components/dashboard/Greeting";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Greeting />
      <QuickActions />
    </div>
  );
}
