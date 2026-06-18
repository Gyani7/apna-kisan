'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User } from 'lucide-react';

const promptStarters = [
  "What are the current market prices for wheat?",
  "How to identify and treat common crop diseases?",
  "Tell me about the latest government schemes for farmers.",
  "What are the best practices for water conservation in agriculture?",
];

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<any[]>([
    { text: "Hello! I am your AI Kisan assistant. How can I help you today?", user: "AI" },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: 'You' }]);
      setInput('');
    }
  };

  const handlePromptStarter = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.14))] container mx-auto py-8">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start space-x-4 p-4 rounded-lg my-2 ${message.user === 'You' ? 'bg-muted' : 'bg-primary/10'}`}>
            {message.user === 'You' ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6 text-primary" />}
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      {messages.length <= 1 && (
        <div className="mb-8">
          <p className="text-lg font-semibold mb-4">For a better start</p>
          <div className="grid grid-cols-2 gap-4">
            {promptStarters.map((prompt, index) => (
              <Button key={index} variant="outline" onClick={() => handlePromptStarter(prompt)}>
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center space-x-4 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about farming..."
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}
