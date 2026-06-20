import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OtpPage() {
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-2xl font-bold text-center mb-4">Enter OTP</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="otp">OTP</Label>
          <Input id="otp" type="text" />
        </div>
        <Button>Verify</Button>
      </div>
    </div>
  );
}
