import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ProductFilter() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold mb-2">Category</h3>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Checkbox id="fertilizers" />
            <Label htmlFor="fertilizers">Fertilizers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="machinery" />
            <Label htmlFor="machinery">Machinery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="seeds" />
            <Label htmlFor="seeds">Seeds</Label>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-2">Price Range</h3>
        <div className="flex space-x-2">
          <Input type="number" placeholder="Min" />
          <Input type="number" placeholder="Max" />
        </div>
      </div>
    </div>
  );
}
