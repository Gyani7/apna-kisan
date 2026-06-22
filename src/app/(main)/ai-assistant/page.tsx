"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Send, Sprout, Bug, TrendingUp, HeartPulse, Camera, 
  MapPin, ShieldCheck, Zap, Mic, Volume2, Info, 
  AlertTriangle, CheckCircle2, Leaf
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
  analysis?: {
    disease: string
    confidence: number
    recommendations: string[]
    status: "healthy" | "warning" | "critical"
  }
}

export default function AiAssistantPage() {
  const userProfile = {
    reputation: 850,
    is_verified: true,
    location: "Karnal, Haryana",
    badge: "Expert Farmer",
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Namaste! I am your AI Crop Doctor. You can upload a photo of your crop's leaf or ask me any farming question in Hindi or English. How can I help you today?"
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage: Message = { role: "user", content: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI Processing
    setTimeout(() => {
      const aiResponse: Message = { 
        role: "assistant", 
        content: `Based on my analysis for ${userProfile.location}, your crop needs specific attention.` 
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    // Simulate Image Analysis
    setTimeout(() => {
      const analysisMessage: Message = {
        role: "assistant",
        content: "I have analyzed the image you uploaded. Here are the findings:",
        analysis: {
          disease: "Yellow Rust (Puccinia striiformis)",
          confidence: 94.8,
          status: "warning",
          recommendations: [
            "Apply Propiconazole 25% EC @ 200ml per acre.",
            "Monitor humidity levels in the field.",
            "Avoid excessive nitrogenous fertilizers for now."
          ]
        }
      }
      setMessages((prev) => [...prev, analysisMessage])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#002B24] text-white">
      {/* Premium Header */}
      <div className="glass-morphism border-b border-white/10 px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B8860B] p-[2px]">
            <div className="w-full h-full rounded-full bg-[#002B24] flex items-center justify-center">
              <Leaf className="w-6 h-6 text-[#FFD700]" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">AI Crop Doctor</h1>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter text-[#FFD700]">
                <ShieldCheck className="w-3 h-3" /> Expert Analysis
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
              <Volume2 className="w-5 h-5" />
           </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {messages.map((message, index) => (
          <div key={index} className={cn("flex flex-col", message.role === "user" ? "items-end" : "items-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl p-4 shadow-xl backdrop-blur-md border",
                message.role === "user" 
                  ? "bg-white/10 border-white/20 text-white rounded-tr-none" 
                  : "bg-gradient-to-br from-[#2E7D32]/40 to-[#004D40]/40 border-[#2E7D32]/30 text-white rounded-tl-none"
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>

            {/* Analysis Results Section */}
            {message.analysis && (
              <div className="mt-4 w-full space-y-4">
                <div className="glass-morphism border-[#FFD700]/30 rounded-2xl p-4 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Bug className="w-16 h-16" />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                      <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-widest">Diagnostic Result</span>
                    </div>
                    <span className="text-xs font-bold text-white/80">{message.analysis.confidence}% Confidence</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{message.analysis.disease}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase border",
                      message.analysis.status === "warning" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"
                    )}>
                      Status: {message.analysis.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {message.analysis.recommendations.map((rec, i) => (
                    <div key={i} className="glass-morphism bg-white/5 border-white/10 rounded-xl p-3 flex gap-3 items-start">
                      <div className="mt-1">
                        <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                      </div>
                      <p className="text-xs text-white/90 leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 items-center text-white/50 text-xs italic ml-2">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" />
              <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
            AI Doctor is thinking...
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-4 glass-morphism border-t border-white/10 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full bg-white/5 border-white/10 text-white/80 hover:bg-white/10 text-[10px]"
            onClick={() => handleSend("Hindi: गेहूं में पीला रतुआ का इलाज क्या है?")}
          >
            Hindi Help
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full bg-white/5 border-white/10 text-white/80 hover:bg-white/10 text-[10px]"
            onClick={() => handleSend("Identify this disease")}
          >
            Disease ID
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full bg-white/5 border-white/10 text-white/80 hover:bg-white/10 text-[10px]"
            onClick={() => handleSend("Treatment for Paddy blast")}
          >
            Paddy Treatment
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full w-12 h-12 bg-white/10 border border-white/20 hover:bg-white/20 text-white shrink-0"
          >
            <Camera className="w-5 h-5" />
          </Button>
          
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full pr-12 focus:ring-[#FFD700]/50"
            />
            <Button 
              size="icon" 
              className="absolute right-1 top-1 rounded-full w-8 h-8 bg-[#FFD700] hover:bg-[#FBC02D] text-[#002B24]"
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <Button 
            onClick={() => setIsRecording(!isRecording)}
            className={cn(
              "rounded-full w-12 h-12 shrink-0 transition-all duration-300",
              isRecording 
                ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                : "bg-gradient-to-br from-[#FFD700] to-[#B8860B] hover:opacity-90 text-[#002B24]"
            )}
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}