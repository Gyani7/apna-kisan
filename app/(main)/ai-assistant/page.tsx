"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Sprout, Bug, TrendingUp, HeartPulse, Camera, MapPin, ShieldCheck, Zap, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AiAssistantPage() {
  // Simulating user profile data from public.profiles schema for Agri-OS context
  const userProfile = {
    reputation: 850,
    is_verified: true,
    location: "Karnal, Haryana",
    village_id: "V-12345"
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Namaste! I am your Apna Kisan AI. I have synchronized with the village data for ${userProfile.location}. As a ${userProfile.is_verified ? 'Verified' : 'Standard'} member with ${userProfile.reputation} Reputation XP, how can I assist your farm today?`
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulating Agri-LLM Processing with OS context (Reputation & Location)
    setTimeout(() => {
      const aiResponse: Message = { 
        role: "assistant", 
        content: `Analysis complete for ${userProfile.location}. Based on your reputation of ${userProfile.reputation} XP, I recommend adjusting your nitrogen application. As a Verified farmer, you can now access the local subsidy portal directly from the 'Subsidies' action.` 
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      {/* 1. OS Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-green-600" />
          <span className="text-sm font-semibold text-slate-700">{userProfile.location}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
            <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-amber-700">{userProfile.reputation} XP</span>
          </div>
          {userProfile.is_verified && (
            <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
              <ShieldCheck className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-bold text-blue-700">Verified</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* 2. Intelligence Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="bg-white border-slate-200">
              <CardHeader className="p-3 space-y-1">
                <div className="bg-green-100 w-fit p-1.5 rounded-md">
                  <Sprout className="h-4 w-4 text-green-700" />
                </div>
                <CardTitle className="text-xs font-bold">Crop Advisor</CardTitle>
                <CardDescription className="text-[10px] leading-tight text-slate-700 font-medium">Wheat Sowing: Optimal</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white border-slate-200">
              <CardHeader className="p-3 space-y-1">
                <div className="bg-red-100 w-fit p-1.5 rounded-md">
                  <Bug className="h-4 w-4 text-red-700" />
                </div>
                <CardTitle className="text-xs font-bold">Pest Alert</CardTitle>
                <CardDescription className="text-[10px] leading-tight text-slate-700 font-medium">Yellow Rust Nearby</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white border-slate-200">
              <CardHeader className="p-3 space-y-1">
                <div className="bg-blue-100 w-fit p-1.5 rounded-md">
                  <TrendingUp className="h-4 w-4 text-blue-700" />
                </div>
                <CardTitle className="text-xs font-bold">Market Pulse</CardTitle>
                <CardDescription className="text-[10px] leading-tight text-slate-700 font-medium">Mandi prices up 5%</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white border-slate-200">
              <CardHeader className="p-3 space-y-1">
                <div className="bg-purple-100 w-fit p-1.5 rounded-md">
                  <HeartPulse className="h-4 w-4 text-purple-700" />
                </div>
                <CardTitle className="text-xs font-bold">Health Scan</CardTitle>
                <CardDescription className="text-[10px] leading-tight text-slate-700 font-medium">2 Recent Detections</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* 3. Command Actions Grid */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-white hover:bg-slate-50 border-slate-200 shadow-sm transition-all">
              <Camera className="h-5 w-5 text-green-600" />
              <div className="text-center">
                <div className="text-xs font-bold text-slate-900">Diagnose Crop</div>
                <div className="text-[10px] text-slate-500 font-normal">AI Disease Detection</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-white hover:bg-slate-50 border-slate-200 shadow-sm transition-all">
              <Users className="h-5 w-5 text-blue-600" />
              <div className="text-center">
                <div className="text-xs font-bold text-slate-900">Village Network</div>
                <div className="text-[10px] text-slate-500 font-normal">Broadcast Alert</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-white hover:bg-slate-50 border-slate-200 shadow-sm transition-all">
              <Zap className="h-5 w-5 text-amber-600" />
              <div className="text-center">
                <div className="text-xs font-bold text-slate-900">Expert Hotline</div>
                <div className="text-[10px] text-slate-500 font-normal">Instant Connect</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 bg-white hover:bg-slate-50 border-slate-200 shadow-sm transition-all">
              <ShieldCheck className="h-5 w-5 text-purple-600" />
              <div className="text-center">
                <div className="text-xs font-bold text-slate-900">Subsidies</div>
                <div className="text-[10px] text-slate-500 font-normal">Reputation Perks</div>
              </div>
            </Button>
          </div>

          {/* 4. Chat Interface */}
          <div className="space-y-4 pb-24">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm shadow-sm",
                  message.role === "user"
                    ? "ml-auto bg-green-600 text-white rounded-tr-none"
                    : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
                )}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-slate-200 w-max rounded-2xl rounded-tl-none px-4 py-3 text-sm animate-pulse text-slate-500 shadow-sm font-medium">
                Consulting Agri-Intelligence...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Input Area */}
      <div className="border-t bg-white p-4 sticky bottom-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            placeholder="Ask about crops, soil, or schemes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="bg-slate-50 border-slate-200 focus-visible:ring-green-600 rounded-lg"
          />
          <Button onClick={handleSend} disabled={isLoading} className="bg-green-600 hover:bg-green-700 shadow-md px-4">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}