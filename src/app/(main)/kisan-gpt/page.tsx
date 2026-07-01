
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { StickyHeader } from '@/components/home/StickyHeader';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function KisanGPTPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Simulate a bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'This is a simulated response from Kisan GPT.', sender: 'bot' }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="dark flex flex-col h-screen">
        <StickyHeader />
        <div className="flex-grow flex flex-col p-4">
            <div className="flex-grow overflow-y-auto space-y-4 p-4 rounded-2xl glass-card">
                {messages.map((msg, index) => (
                <motion.div 
                    key={index} 
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {msg.sender === 'bot' && (
                        <Avatar>
                            <AvatarImage src="/kisan-gpt-logo.png" />
                            <AvatarFallback>KG</AvatarFallback>
                        </Avatar>
                    )}
                    <div className={`p-3 rounded-2xl max-w-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                        {msg.text}
                    </div>
                     {msg.sender === 'user' && (
                        <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    )}
                </motion.div>
                ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Kisan GPT se kuch bhi puchein..."
                    className="flex-grow p-3 rounded-full bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button onClick={handleSend} className="rounded-full w-12 h-12">
                    <Send className="w-6 h-6" />
                </Button>
            </div>
        </div>
    </div>
  );
}
