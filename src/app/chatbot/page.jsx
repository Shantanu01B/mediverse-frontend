"use client";
import { useState, useRef, useEffect } from "react";
import { Stethoscope, HeartPulse, Syringe, Brain, MessageCircleHeart } from "lucide-react";

export default function HealthChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chatbot/ask`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiMessage = { sender: "ai", text: data.reply || data.error };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I'm having trouble responding. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lucide Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Stethoscope className="absolute top-16 left-16 w-28 h-28 text-blue-400" />
        <HeartPulse className="absolute bottom-20 left-24 w-24 h-24 text-rose-400" />
        <Syringe className="absolute top-1/2 right-10 w-24 h-24 text-cyan-400" />
        <Brain className="absolute bottom-32 right-16 w-28 h-28 text-indigo-400" />
        <MessageCircleHeart className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-28 h-28 text-teal-400" />
      </div>

      {/* Main Chat Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
            <h1 className="text-3xl font-bold">Health Assistant</h1>
            <p className="mt-1 opacity-90">Ask me anything about your health</p>
          </div>

          {/* Chat Container */}
          <div className="p-4 h-[500px] overflow-y-auto bg-white">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <div className="text-center p-6 max-w-md">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium">Start a conversation</h3>
                  <p className="mt-1">Ask about symptoms, medications, or general health advice</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-4 ${
                        msg.sender === "user" 
                          ? "bg-blue-600 text-white rounded-br-none" 
                          : "bg-gray-100 border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-base leading-relaxed">
                        {msg.text.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-2 last:mb-0">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 border border-gray-200 rounded-xl rounded-bl-none p-4 max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your health question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow border border-gray-300 rounded-l-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 text-center">
              This AI assistant provides general health information only. Always consult a doctor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
