'use client'
      
      import { useState, useRef } from 'react'
      import { useChat } from '@ai-sdk/react'
      import { Button } from '@/components/ui/button'
      import { Input } from '@/components/ui/input'
      import {
        Send,
        Sprout,
        Camera,
        ShieldCheck,
        Mic,
        Volume2,
        Leaf,
        X
      } from 'lucide-react'
      import { cn } from '@/lib/utils'
      import { type CoreMessage } from 'ai';
      
      export default function AiAssistantPage() {
        const {
          messages,
          input,
          handleInputChange,
          append,
          isLoading,
          setInput
        } = useChat();
      
        const [isRecording, setIsRecording] = useState(false)
        const fileInputRef = useRef<HTMLInputElement>(null)
        const [imagePreview, setImagePreview] = useState<string | null>(null)
      
        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0]
          if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
              setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
          }
        }
      
        const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          if (!input.trim() && !imagePreview) return
      
          const message: CoreMessage = {
              role: 'user',
              content: input
          }
      
          if (imagePreview) {
            message.content = [
              { type: 'text', text: input },
              { type: 'image', image: imagePreview as any }
            ];
          }
      
          append(message);
          setInput('');
          setImagePreview(null);
        }

        const QuickActionButton = ({
          icon: Icon,
          label,
          onClick
        }: {
          icon: React.ElementType
          label: string
          onClick?: () => void
        }) => (
          <Button
            variant="outline"
            className="flex-1 flex-col h-auto"
            onClick={onClick}
          >
            <Icon className="w-6 h-6 mb-2" />
            <span className="text-xs text-center">{label}</span>
          </Button>
        )
      
        return (
          <div className="flex flex-col h-screen bg-gray-50">
            <header className="flex items-center justify-between p-4 bg-white border-b">
              <h1 className="text-xl font-bold flex items-center">
                <Sprout className="w-6 h-6 mr-2 text-green-500" />
                Krishi Sahayak
              </h1>
              <Button variant="ghost" size="icon">
                <Volume2 />
              </Button>
            </header>
      
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex gap-2',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {m.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <Sprout size={20} />
                    </div>
                  )}
                  <div
                    className={cn(
                      'rounded-lg p-3 max-w-sm',
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white border'
                    )}
                  >
                    {Array.isArray(m.content) ? (
                      m.content.map((contentPart, partIndex) => {
                        if (contentPart.type === 'text') {
                          return <p key={partIndex}>{contentPart.text}</p>;
                        }
                        if (contentPart.type === 'image') {
                          return <img key={partIndex} src={contentPart.image as string} alt="User upload" className="max-w-xs rounded-lg" />;
                        }
                        return null;
                      })
                    ) : (
                      <p>{m.content as string}</p>
                    )}
                  </div>
                </div>
              ))}
      
              {isLoading && (
                <div className="flex justify-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <Sprout size={20} />
                  </div>
                  <div className="rounded-lg p-3 bg-white border">
                    <div className="flex items-center">
                      <div className="dot-flashing"></div>
                    </div>
                  </div>
                </div>
              )}
      
              {messages.length === 0 && !isLoading && (
                <div className="text-center text-gray-500">
                  <Leaf className="w-12 h-12 mx-auto mb-4" />
                  <h2 className="text-lg font-semibold">
                    How can I help you today?
                  </h2>
                </div>
              )}
            </main>
      
            <footer className="bg-white p-4 border-t">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <QuickActionButton
                  icon={Camera}
                  label="Identify Crop Disease"
                  onClick={() => {
                    setInput('Identify Crop Disease from this image.')
                    fileInputRef.current?.click()
                  }}
                />
                <QuickActionButton
                  icon={ShieldCheck}
                  label="Pesticide Recommendation"
                  onClick={() => setInput('Can you recommend a pesticide for ')}
                />
              </div>
      
              <form onSubmit={handleFormSubmit} className="relative">
                {imagePreview && (
                  <div className="relative mb-2">
                    <img
                      src={imagePreview}
                      alt="Image preview"
                      className="max-w-[100px] max-h-[100px] rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setImagePreview(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything about farming..."
                  className="pr-24"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Mic className={cn(isRecording && 'text-red-500')} />
                  </Button>
                  <Button type="submit" variant="ghost" size="icon" disabled={isLoading}>
                    <Send />
                  </Button>
                </div>
              </form>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </footer>
          </div>
        )
      }
      