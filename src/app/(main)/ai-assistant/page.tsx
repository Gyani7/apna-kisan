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
  // Simulated user profile data based on public.profiles schema
  const userProfile = {
    reputation: 850,
    is_verified: true,
    location: "Karnal, Haryana",
    village_id: "V-12345",
    badge: "Expert Farmer",
    bio: "Paddy and Wheat specialist in Karnal district."
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Namaste! I am your Apna Kisan AI. I have synchronized with the village data for ${userProfile.location}. As a ${userProfile.badge} with ${userProfile.reputation} Reputation XP, how can I assist your farm today?`
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = input;
    setInput("")
    setIsLoading(true)

    // Simulating Agri-LLM Processing with OS context
    setTimeout(() => {
      let responseContent = `Analysis complete for ${userProfile.location}. Based on your reputation of ${userProfile.reputation} XP and your status as a ${userProfile.badge}, I recommend adjusting your nitrogen application for the upcoming week.`;
      
      if (currentInput.toLowerCase().includes("pest") || currentInput.toLowerCase().includes("disease")) {
        responseContent = `I see you're concerned about pests. I've cross-referenced local reports in ${userProfile.location}. There's an increase in Yellow Rust sightings nearby. Since you are a Verified farmer, I can prioritize your scan in the 'crop_disease_detections' queue if you upload a photo.`;
      } else if (currentInput.toLowerCase().includes("mandi") || currentInput.toLowerCase().includes("rate")) {
        responseContent = `Current Mandi rates in Karnal for Basmati Paddy are trending at ₹4,200/quintal. Your 'Expert Farmer' badge allows you to see predictive trends for next week.`;
      }

      const aiResponse: Message = { 
        role: "assistant", 
        content: responseContent 
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      {/* 1. OS Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Sprout className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-none">Agri-OS Assistant</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3" /> {userProfile.reputation} XP
              </span>
              {userProfile.is_verified && (
                <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Camera className="w-4 h-4" />
          Scan Crop
        </Button>
      </div>

      {/* 2. Intelligence Feed / Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "max-w-[85%] rounded-2xl p-4 flex gap-3",
              message.role === "user" 
                ? "bg-blue-600 text-white ml-auto" 
                : "bg-white border border-slate-200 text-slate-800"
            )}
          >
            {message.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Sprout className="w-4 h-4 text-green-600" />
              </div>
            )}
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="bg-white border border-slate-200 text-slate-800 max-w-[85%] rounded-2xl p-4 flex gap-3 animate-pulse">
            <div className="w-6 h-6 rounded-full bg-slate-100 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-2 bg-slate-200 rounded w-3/4" />
              <div className="h-2 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* 3. Contextual Action OS (Quick Actions) */}
      <div className="px-4 pb-2">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="h-auto py-3 flex-col gap-1 bg-white" onClick={() => setInput("Check for pests in my paddy field")}>
            <Bug className="w-5 h-5 text-red-500" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Pest Diagnosis</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col gap-1 bg-white" onClick={() => setInput("Current Mandi rates in Karnal")}>
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Market Intelligence</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col gap-1 bg-white" onClick={() => setInput("Soil health report for my village")}>
            <HeartPulse className="w-5 h-5 text-orange-500" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Soil Health</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col gap-1 bg-white" onClick={() => setInput("Eligible government schemes")}>
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Govt Schemes</span>
          </Button>
        </div>
      </div>

      {/* 4. Input OS */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask your farming expert..."
            className="flex-1 bg-slate-50 border-slate-200"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-green-600 hover:bg-green-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}