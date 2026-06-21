
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProfileForm() {
  return (
    <div className="space-y-6">
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Shadcn" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="m@example.com" />
            </div>
             <div className="space-y-2">
                <Label>Role</Label>
                <Input id="role" defaultValue="Farmer" disabled />
            </div>
        </div>
        <Button>Save Changes</Button>
    </div>
  )
}
