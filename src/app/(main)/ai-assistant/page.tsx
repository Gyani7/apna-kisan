"use client"

import { useState, useRef } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Send, Sprout, Bug, TrendingUp, HeartPulse, Camera, 
  MapPin, ShieldCheck, Zap, Mic, Volume2, Info, 
  AlertTriangle, CheckCircle2, Leaf
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AiAssistantPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput
  } = useChat()

  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
        {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-white/50">
                <Sprout size={48} className="mb-4"/>
                <h2 className="text-lg font-medium">Namaste! I am your AI Crop Doctor.</h2>
                <p className="text-sm">Ask me anything about farming or upload a crop image.</p>
            </div>
        )}
        {messages.map((m, index) => (
          <div key={m.id} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl p-4 shadow-xl backdrop-blur-md border",
                m.role === "user" 
                  ? "bg-white/10 border-white/20 text-white rounded-tr-none" 
                  : "bg-gradient-to-br from-[#2E7D32]/40 to-[#004D40]/40 border-[#2E7D32]/30 text-white rounded-tl-none"
              )}
            >
              <p className="text-sm leading-relaxed">{m.content}</p>
            </div>
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
      <form onSubmit={handleSubmit} className="p-4 glass-morphism border-t border-white/10 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            className="rounded-full bg-white/5 border-white/10 text-white/80 hover:bg-white/10 text-[10px]"
            onClick={() => setInput("Hindi: गेहूं में पीला रतुआ का इलाज क्या है?")}
          >
            Hindi Help
          </Button>
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            className="rounded-full bg-white/5 border-white/10 text-white/80 hover:bg-white/10 text-[10px]"
            onClick={() => setInput("Identify this disease")}
          >
            Disease ID
          </Button>
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            className="rounded-full bg-white/5 border-white/10 text-white/80 hover:bg-white/10 text-[10px]"
            onClick={() => setInput("Treatment for Paddy blast")}
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
          />
          <Button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full w-12 h-12 bg-white/10 border border-white/20 hover:bg-white/20 text-white shrink-0"
          >
            <Camera className="w-5 h-5" />
          </Button>
          
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything..."
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full pr-12 focus:ring-[#FFD700]/50"
            />
            <Button 
              type="submit"
              size="icon" 
              className="absolute right-1 top-1 rounded-full w-8 h-8 bg-[#FFD700] hover:bg-[#FBC02D] text-[#002B24]"
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <Button 
            type="button"
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
      </form>
    </div>
  )
}