import React, { useEffect, useState, ReactNode } from 'react';

interface Scene {
  id: number;
  component: React.ReactNode;
  duration: number; // in milliseconds
}

// Scene 4: 2 Videos + LLM Chat - Deep Relationship (PERFECTED LAYOUT)
function Scene4() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string; isTyping?: boolean }>>([]);

  useEffect(() => {
    // Clear messages on mount
    setMessages([]);

    const playConversation = async () => {
      // User message appears immediately
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessages((prev) => [...prev, {
        type: 'user',
        text: 'Gooood moooorning! Partner!',
      }]);

      // AI starts typing after delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessages((prev) => [...prev, { type: 'ai', text: '', isTyping: true }]);

      // Type AI response
      const aiResponse = 'Hi partner! How was your date with Emilia yesterday?';

      for (let i = 0; i <= aiResponse.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 21));
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1] = {
              type: 'ai',
              text: aiResponse.substring(0, i),
              isTyping: i < aiResponse.length,
            };
          }
          return newMessages;
        });
      }

      // User response
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessages((prev) => [...prev, {
        type: 'user',
        text: 'FANTASTIC! Thanks for asking!',
      }]);

      // AI response showing productive work
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessages((prev) => [...prev, { type: 'ai', text: '', isTyping: true }]);

      const aiWorkResponse = 'My pleasure! Now let me put up your weekly stock forecast for you! I know you will be pleased, looks promising!';

      for (let i = 0; i <= aiWorkResponse.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 21));
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1] = {
              type: 'ai',
              text: aiWorkResponse.substring(0, i),
              isTyping: i < aiWorkResponse.length,
            };
          }
          return newMessages;
        });
      }
    };

    playConversation();
  }, []);

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden">
      {/* HUMAN VIDEO - Top, full width (35% of screen) */}
      <div className="h-[35%] bg-black p-4 flex items-center justify-center">
        <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <video
            autoPlay
            muted
            className="w-full h-full object-cover"
          >
            <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460412194/KkBPjWRan6rfDKBMXRAXi9/NEWHUMANHappy_Laughing_Video_Generation_07d73364.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* BOTTOM SECTION - Robot (left) + LLM Chat (right) */}
      <div className="flex-1 flex gap-4 p-4 bg-black overflow-hidden">
        {/* ROBOT VIDEO - Bottom left */}
        <div className="w-1/3 bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <video
            autoPlay
            muted
            className="w-full h-full object-cover"
          >
            <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460412194/KkBPjWRan6rfDKBMXRAXi9/AIrobothappyinteractingwithuserqueries_fc282e7b.mp4" type="video/mp4" />
          </video>
        </div>

        {/* LLM CHAT - Right side */}
        <div className="flex-1 bg-black border border-gray-700 rounded-lg flex flex-col overflow-hidden">
          {/* Chat Container */}
          <div className="flex-1 bg-gray-950 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.length === 0 ? (
              <div className="text-gray-600 text-center py-8 text-sm">
                Waiting for conversation...
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${msg.type === 'user'
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

// Scene 3: Text Only - Time Passage
function Scene3() {
  const [textOpacity, setTextOpacity] = useState(0);

  useEffect(() => {
    // Fade in text at start
    const fadeInTimer = setTimeout(() => {
      setTextOpacity(1);
    }, 500);

    return () => clearTimeout(fadeInTimer);
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Text Overlay */}
      <div
        className="text-center transition-opacity duration-1000"
        style={{ opacity: textOpacity }}
      >
        <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
          2 months have gone by,
        </h1>
        <h2 className="text-4xl font-semibold text-gray-300 drop-shadow-lg">
          several magnificent interactions later
        </h2>
      </div>
    </div>
  );
}

// Scene 2: Human Video + LLM Chat
function Scene2() {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string; isTyping?: boolean }>>([]);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    // Clear messages on mount
    setMessages([]);

    const playConversation = async () => {
      // User message appears immediately
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessages((prev) => [...prev, {
        type: 'user',
        text: "Need assistance with research on 'who is going to win next superbowl, considering latest NFL statistics and health status of players'",
      }]);

      // AI starts typing after delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessages((prev) => [...prev, { type: 'ai', text: '', isTyping: true }]);

      // Type AI response
      const aiResponse = "Based on current NFL statistics and player health reports, I can analyze the top contenders. The Kansas City Chiefs have strong momentum with Patrick Mahomes healthy. The San Francisco 49ers remain competitive with their defense. Buffalo Bills are solid contenders if Josh Allen stays injury-free. Let me pull the latest injury reports and playoff odds for a detailed analysis.";

      for (let i = 0; i <= aiResponse.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 21));
        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages.length > 0) {
            newMessages[newMessages.length - 1] = {
              type: 'ai',
              text: aiResponse.substring(0, i),
              isTyping: i < aiResponse.length,
            };
          }
          return newMessages;
        });
      }
    };

    playConversation();
  }, []);

  return (
    <div className="w-full h-screen bg-black flex flex-col gap-4 p-4 overflow-hidden">
      {/* Human Video - Top */}
      <div className="h-2/5 bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
        <video
          autoPlay
          muted
          onEnded={() => setVideoEnded(true)}
          className="w-full h-full object-cover"
        >
          <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460412194/KkBPjWRan6rfDKBMXRAXi9/happyhumanuser1_796e1016.mp4" type="video/mp4" />
        </video>
      </div>

      {/* LLM Chat - Bottom */}
      <div className="flex-1 bg-black border border-gray-700 rounded-lg flex flex-col overflow-hidden">
        {/* Chat Container */}
        <div className="flex-1 bg-gray-950 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.length === 0 ? (
            <div className="text-gray-600 text-center py-8 text-sm">
              Waiting for conversation...
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${msg.type === 'user'
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
  );
}

// Scene 1: Robot Video + Text Overlay
function Scene1() {
  const [textOpacity, setTextOpacity] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    // Fade in text at start (1 second)
    const fadeInTimer = setTimeout(() => {
      setTextOpacity(1);
    }, 500);

    return () => clearTimeout(fadeInTimer);
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Fade out text (1 second)
    setTimeout(() => {
      setTextOpacity(0);
    }, 100);
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        muted
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover"
      >
        <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460412194/KkBPjWRan6rfDKBMXRAXi9/AIRobot;learningfromusercontextaquisition_20d9b4d4.mp4" type="video/mp4" />
      </video>

      {/* Text Overlay - Top with background */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center transition-opacity duration-1000 pt-12"
        style={{ opacity: textOpacity }}
      >
        <div className="text-center bg-black/60 px-12 py-8 rounded-lg">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            AI READY TO WORK
          </h1>
          <p className="text-3xl text-gray-200 mt-4 drop-shadow-lg">
            WAITING PROMPT
          </p>
        </div>
      </div>
    </div>
  );
}

// Scene 9: 2 Videos + LLM Cold Reset
function Scene9() {
  const [messages, setMessages] = useState<Array<{ id: number; text: string; isUser: boolean }>>([]);

  useEffect(() => {
    // Add AI messages at intervals
    const messages = [
      { id: 1, text: "How can I help you?", isUser: false },
      { id: 2, text: "How can I help you?", isUser: false },
      { id: 3, text: "How can I help you?", isUser: false },
      { id: 4, text: "How can I help you?", isUser: false },
    ];

    messages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
      }, 1000 + index * 1500);
    });
  }, []);

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden">
      {/* HUMAN VIDEO - Top (40% of screen, full width) */}
      <div className="h-2/5 bg-black p-4 flex items-center justify-center">
        <video
          autoPlay
          muted
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        >
          <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460412194/KkBPjWRan6rfDKBMXRAXi9/Angryhumanwithsystemcrash_4e774278.mp4" type="video/mp4" />
        </video>
      </div>

      {/* BOTTOM SECTION - Robot + LLM (60% of screen) */}
      <div className="h-3/5 bg-black p-4 flex gap-4 overflow-hidden">
        {/* Robot Video - Bottom Left */}
        <div className="w-1/3 bg-black flex items-center justify-center">
          <video
            autoPlay
            muted
            className="w-full h-full object-cover rounded-lg shadow-2xl"
          >
            <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460412194/KkBPjWRan6rfDKBMXRAXi9/AIrobotfullsystemresetaftercrash_47db44e4.mp4" type="video/mp4" />
          </video>
        </div>

        {/* LLM Chat - Bottom Right (2/3 width) */}
        <div className="w-2/3 bg-black flex flex-col overflow-hidden">
          <div className="flex-1 bg-gray-950 border border-gray-600 rounded-lg overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="flex justify-start w-full">
                <div className="max-w-xs px-4 py-3 rounded-lg text-base bg-gray-800 text-gray-200 border-l-4 border-gray-500">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Scene 8: Text Only - Complete Loss
function Scene8() {
  const [textOpacity, setTextOpacity] = useState(0);

  useEffect(() => {
    // Fade in text at start
    const fadeInTimer = setTimeout(() => {
      setTextOpacity(1);
    }, 500);

    return () => clearTimeout(fadeInTimer);
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Text Overlay */}
      <div
        className="text-center transition-opacity duration-1000 px-8"
        style={{ opacity: textOpacity }}
      >
        <h1 className="text-5xl font-bold text-red-600 drop-shadow-lg mb-6">
          AI RESET
        </h1>
        <h2 className="text-4xl font-semibold text-gray-300 drop-shadow-lg">
          LOSS OF MEMORY, CONTEXT, HISTORY, PROFILE, ETC, ETC
        </h2>
      </div>
    </div>
  );
}

// Scene 7: Human Video + Text + LLM Error - Human Shock
function Scene7() {
  const [textOpacity, setTextOpacity] = useState(0);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Fade in text at start
    const fadeInTimer = setTimeout(() => {
      setTextOpacity(1);
    }, 500);

    // Show error message after 2 seconds
    const errorTimer = setTimeout(() => {
      setShowError(true);
    }, 2000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(errorTimer);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black flex gap-4 p-4 overflow-hidden">
      {/* HUMAN VIDEO - Left side */}
      <div className="w-1/2 bg-black relative flex items-center justify-center">
        <video
          autoPlay
          muted
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        >
          <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460412194/KkBPjWRan6rfDKBMXRAXi9/newvideohumanbeginningofcrash_0b93b3b3.mp4" type="video/mp4" />
        </video>

        {/* Text Overlay - Top */}
        <div
          className="absolute top-8 left-0 right-0 flex items-center justify-center transition-opacity duration-1000"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center bg-black/60 px-8 py-4 rounded-lg">
            <h1 className="text-5xl font-bold text-yellow-400 drop-shadow-lg">
              OOHH OOOHH!
            </h1>
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE - Right side */}
      <div className="w-1/2 bg-black flex flex-col overflow-hidden">
        <div className="flex-1 bg-gray-950 border-2 border-red-600 rounded-lg overflow-y-auto p-6 space-y-3 flex items-center justify-center">
          {showError && (
            <div className="flex justify-center w-full">
              <div className="px-6 py-4 rounded-lg text-lg bg-red-900 text-red-100 border-l-4 border-red-500 font-semibold text-center">
                Error... AI OFFLINE please wait...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Scene 6: Video + Text + LLM Error - System Crash
function Scene6() {
  const [textOpacity, setTextOpacity] = useState(0);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Fade in text at start
    const fadeInTimer = setTimeout(() => {
      setTextOpacity(1);
    }, 500);

    // Show error message after 2 seconds
    const errorTimer = setTimeout(() => {
      setShowError(true);
    }, 2000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(errorTimer);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black flex gap-4 p-4 overflow-hidden">
      {/* VIDEO - Left side */}
      <div className="w-1/2 bg-black relative flex items-center justify-center">
        <video
          autoPlay
          muted
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        >
          <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460412194/KkBPjWRan6rfDKBMXRAXi9/AIRobotsystemcrash_43460ce7.mp4" type="video/mp4" />
        </video>

        {/* Text Overlay - Top */}
        <div
          className="absolute top-8 left-0 right-0 flex items-center justify-center transition-opacity duration-1000"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center bg-black/60 px-8 py-4 rounded-lg">
            <h1 className="text-4xl font-bold text-red-600 drop-shadow-lg">
              AI MAYOR MELTDOWN
            </h1>
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE - Right side */}
      <div className="w-1/2 bg-black flex flex-col overflow-hidden">
        <div className="flex-1 bg-gray-950 border-2 border-red-600 rounded-lg overflow-y-auto p-6 space-y-3 flex items-center justify-center">
          {showError && (
            <div className="flex justify-center w-full">
              <div className="px-6 py-4 rounded-lg text-lg bg-red-900 text-red-100 border-l-4 border-red-500 font-semibold text-center">
                Error... AI OFFLINE please wait...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Scene 5: Text Only - Foreshadowing
function Scene5() {
  const [textOpacity, setTextOpacity] = useState(0);

  useEffect(() => {
    // Fade in text at start
    const fadeInTimer = setTimeout(() => {
      setTextOpacity(1);
    }, 500);

    return () => clearTimeout(fadeInTimer);
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Text Overlay */}
      <div
        className="text-center transition-opacity duration-1000"
        style={{ opacity: textOpacity }}
      >
        <h1 className="text-6xl font-bold text-red-500 drop-shadow-lg">
          The beginning of the END
        </h1>
      </div>
    </div>
  );
}

// Main Pain Sequence Component
export default function PainSequence() {
  const [currentScene, setCurrentScene] = useState(0);

  const scenes: Scene[] = [
    {
      id: 1,
      component: <Scene1 />,
      duration: 0, // Will be determined by video + 3 seconds
    },
    {
      id: 2,
      component: <Scene2 />,
      duration: 0, // Will be determined by video + 3 seconds
    },
    {
      id: 3,
      component: <Scene3 />,
      duration: 0, // Text-only scene
    },
    {
      id: 4,
      component: <Scene4 />,
      duration: 0, // 2 videos + LLM
    },
    {
      id: 5,
      component: <Scene5 />,
      duration: 0, // Text-only foreshadowing
    },
    {
      id: 6,
      component: <Scene6 />,
      duration: 0, // Video + text + LLM error
    },
    {
      id: 7,
      component: <Scene7 />,
      duration: 0, // Human video + text + error
    },
    {
      id: 8,
      component: <Scene8 />,
      duration: 0, // Text-only complete loss
    },
    {
      id: 9,
      component: <Scene9 />,
      duration: 0, // 2 videos + cold reset LLM
    },
  ];

  useEffect(() => {
    if (currentScene >= scenes.length) {
      // Sequence complete
      return;
    }

    // Each scene handles its own timing
    // For demo, use fixed timeouts (adjust based on actual video lengths)
    let timeout: NodeJS.Timeout | undefined;
    if (currentScene === 0) {
      timeout = setTimeout(() => setCurrentScene(1), 15000); // Scene 1: ~15 seconds
    } else if (currentScene === 1) {
      timeout = setTimeout(() => setCurrentScene(2), 18000); // Scene 2: ~18 seconds
    } else if (currentScene === 2) {
      timeout = setTimeout(() => setCurrentScene(3), 8000); // Scene 3: ~8 seconds (text-only)
    } else if (currentScene === 3) {
      timeout = setTimeout(() => setCurrentScene(4), 20000); // Scene 4: ~20 seconds (2 videos + chat)
    } else if (currentScene === 4) {
      timeout = setTimeout(() => setCurrentScene(5), 8000); // Scene 5: ~8 seconds (text-only)
    } else if (currentScene === 5) {
      timeout = setTimeout(() => setCurrentScene(6), 12000); // Scene 6: ~12 seconds (video + error)
    } else if (currentScene === 6) {
      timeout = setTimeout(() => setCurrentScene(7), 10000); // Scene 7: ~10 seconds (human shock)
    } else if (currentScene === 7) {
      timeout = setTimeout(() => setCurrentScene(8), 10000); // Scene 8: ~10 seconds (text-only loss)
    } else if (currentScene === 8) {
      timeout = setTimeout(() => setCurrentScene(9), 12000); // Scene 9: ~12 seconds (2 videos + cold reset)
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };


  }, [currentScene, scenes.length]);

  if (currentScene >= scenes.length) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Pain Sequence Complete
          </h1>
          <p className="text-gray-400">Ready for next section...</p>
        </div>
      </div>
    );
  }

  return scenes[currentScene].component;
}
