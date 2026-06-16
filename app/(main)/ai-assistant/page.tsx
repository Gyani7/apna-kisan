
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon } from "lucide-react"

export default function AIAssistantPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
            <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                Hi, I am your AI assistant. How can I help you today?
                </div>
            </div>
             <div className="flex items-start gap-4 justify-end">
                <div className="rounded-lg bg-muted p-3">
                What are the best crops to grow in my region?
                </div>
            </div>
        </div>
      </div>
      <div className="border-t bg-background p-4">
        <div className="relative">
          <Input placeholder="Type your message..." className="pr-12" />
          <Button size="icon" className="absolute right-0 top-0">
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
