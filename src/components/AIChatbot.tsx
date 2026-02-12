import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
}

const suggestedPrompts = [
  'Recommend a blow moulding machine for 100 ml bottles',
  'What details do you need to design a PET bottle mould?',
  'Can your BFS moulds work with Class 100 aseptic environments?',
  'Explain your capabilities in hydraulic cylinders',
  'Help me choose between PET bottle mould vs BFS container'
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I am BVM AI Assistant. How can I help you today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      'recommend': 'For 100 ml bottles, we recommend our Automatic Blow Moulding Machine with a capacity of 6,000 bottles/hour. It features precise cavity design and is suitable for pharmaceutical applications. Would you like more details?',
      'details': 'To design a PET bottle mould, we need: bottle volume, neck finish specifications, material type (PET grade), and production capacity requirements. Please share these details for an accurate quote.',
      'bfs': 'Yes, our BFS moulds are designed for Class 100 aseptic environments. They feature CIP/SIP-friendly designs and meet cGMP norms for pharmaceutical applications.',
      'hydraulic': 'We manufacture single-acting hydraulic cylinders with bore diameters from 25mm to 200mm, pressure ratings up to 400 bar, and custom stroke lengths. Materials include alloy steel with polished surfaces.',
      'choose': 'PET bottle moulds are ideal for carbonated beverages and water, while BFS containers are preferred for sterile pharmaceuticals. The choice depends on your product type and sterilization requirements.',
      'default': 'Thank you for your enquiry. Our team will review your requirements and get back to you shortly. For immediate assistance, please call us at +91-79493-03163 or email sales@bvmindustries.com'
    };

    const lowerText = text.toLowerCase();
    let responseText = responses.default;

    if (lowerText.includes('recommend') || lowerText.includes('100 ml') || lowerText.includes('bottle')) {
      responseText = responses.recommend;
    } else if (lowerText.includes('details') || lowerText.includes('design') || lowerText.includes('need')) {
      responseText = responses.details;
    } else if (lowerText.includes('bfs') || lowerText.includes('class 100') || lowerText.includes('aseptic')) {
      responseText = responses.bfs;
    } else if (lowerText.includes('hydraulic') || lowerText.includes('cylinder')) {
      responseText = responses.hydraulic;
    } else if (lowerText.includes('choose') || lowerText.includes('compare') || lowerText.includes('vs')) {
      responseText = responses.choose;
    }

    const botMessage: Message = {
      id: Date.now() + 1,
      type: 'bot',
      text: responseText
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-bvm-blue text-white rounded-full shadow-glow-blue hover:bg-bvm-blue-dark transition-all hover:scale-105"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Ask BVM</span>
          <Sparkles className="w-4 h-4" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-bvm-navy border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-bvm-navy-light border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-bvm-blue/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-bvm-blue" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">BVM Enquiry Helper</div>
                <div className="text-bvm-gray text-xs">Quick answers to common questions</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-bvm-gray hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user'
                  ? 'bg-bvm-blue/20'
                  : 'bg-bvm-blue/20'
                  }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-bvm-blue" />
                  ) : (
                    <Bot className="w-4 h-4 text-bvm-blue" />
                  )}
                </div>
                <div className={`max-w-[75%] p-3 rounded-xl text-sm ${message.type === 'user'
                  ? 'bg-bvm-blue text-white'
                  : 'bg-white/10 text-white'
                  }`}>
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-bvm-blue/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-bvm-blue" />
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-bvm-gray rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-bvm-gray rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-bvm-gray rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested prompts */}
          {messages.length < 3 && (
            <div className="px-4 pb-2">
              <div className="text-bvm-gray text-xs mb-2">Suggested questions:</div>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-bvm-blue/30 rounded-full text-xs text-bvm-gray hover:text-white transition-all"
                  >
                    {prompt.length > 35 ? prompt.slice(0, 35) + '...' : prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2.5 bg-bvm-blue text-white rounded-lg hover:bg-bvm-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
