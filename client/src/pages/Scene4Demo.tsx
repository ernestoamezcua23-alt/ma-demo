import React, { useEffect, useState } from 'react';

interface Message {
  type: 'user' | 'ai';
  text: string;
  isTyping?: boolean;
}

export default function Scene4Demo() {
  const [messages, setMessages] = useState<Message[]>([]);

  const conversation = [
    {
      type: 'user' as const,
      text: 'Gooood moooorning! Partner!',
      delay: 1000,
    },
    {
      type: 'ai' as const,
      text: 'Hi partner! How was your date with Emilia yesterday?',
      delay: 3500,
      typing: true,
    },
    {
      type: 'user' as const,
      text: 'FANTASTIC! Thanks for asking!',
      delay: 6000,
    },
  ];

  useEffect(() => {
    let isMounted = true;
    setMessages([]); // Clear messages on mount

    const playConversation = async () => {
      for (const msg of conversation) {
        if (!isMounted) return;
        
        await new Promise((resolve) => setTimeout(resolve, msg.delay));

        if (msg.type === 'ai' && msg.typing) {
          // Show typing indicator
          if (isMounted) {
            setMessages((prev) => [...prev, { type: 'ai', text: '', isTyping: true }]);
          }
          
          await new Promise((resolve) => setTimeout(resolve, 800));

          // Type out character by character
          let fullText = '';
          for (let i = 0; i <= msg.text.length; i++) {
            if (!isMounted) return;
            
            fullText = msg.text.substring(0, i);
            
            setMessages((prev) => {
              const newMessages = [...prev];
              if (newMessages.length > 0) {
                newMessages[newMessages.length - 1] = {
                  type: 'ai',
                  text: fullText,
                  isTyping: i < msg.text.length,
                };
              }
              return newMessages;
            });

            await new Promise((resolve) => setTimeout(resolve, 21));
          }
        } else {
          // Regular message (no typing)
          if (isMounted) {
            setMessages((prev) => [...prev, { type: msg.type, text: msg.text }]);
          }
        }
      }
    };

    playConversation();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden">
      {/* HUMAN VIDEO - Top, full width (30% smaller) */}
      <div className="h-2/5 bg-black p-4 flex items-center justify-center">
        <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl" style={{ transform: 'scale(0.70)' }}>
          <video
            autoPlay
            muted
            className="w-full h-full object-cover"
          >
            <source src="/demo-videos/video2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* BOTTOM SECTION - Robot (left) + LLM Chat (right) */}
      <div className="h-3/5 flex gap-4 p-4 bg-black overflow-hidden">
        {/* ROBOT VIDEO - Bottom left */}
        <div className="w-1/3 bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <video
            autoPlay
            muted
            className="w-full h-full object-cover"
          >
            <source src="/demo-videos/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* LLM CHAT - Right side */}
        <div className="flex-1 bg-black border border-gray-700 rounded-lg flex flex-col overflow-hidden">
          {/* Chat Container */}
          <div className="flex-1 bg-gray-950 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.length === 0 ? (
              <div className="text-gray-600 text-center py-8 text-sm">
                Waiting for conversation to start...
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.type === 'user'
                        ? 'bg-gray-800 text-gray-100 border-l-4 border-teal-500'
                        : 'bg-gray-900 text-gray-200 border-l-4 border-gray-600'
                    }`}
                  >
                    {msg.text}
                    {msg.isTyping && <span className="animate-pulse">▌</span>}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Section */}
          <div className="flex gap-2 flex-shrink-0 p-3 border-t border-gray-700">
            <input
              type="text"
              placeholder="Message..."
              disabled
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 placeholder-gray-600 outline-none text-sm"
            />
            <button
              disabled
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
