// GhostChat.jsx
import { useState } from 'react';
import axios from 'axios';

const hauntedImages = [
  "https://tse2.mm.bing.net/th?id=OIP.XnYY0j-LL-OqtP8BSoyL_gHaE8&pid=Api&P=0&h=180",
];

const GhostChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:5500/api/chat/send', {
        message: `Respond as if you are a ghost named BhootNath to the following message but don't be dramatic and give a fearful vibe.\n${input}`,
      });

      const aiMessage = {
        text: res.data.reply,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: '👻 Ghost couldn’t reply... Something went wrong!',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#1a1d2e] via-[#2b303b] to-[#3a424d] text-white font-sans overflow-hidden">
      
      {/* Sidebar Haunted Images */}
      <div className="w-80 bg-[#1d212e] p-4 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden rounded-lg">
        {hauntedImages.map((src, idx) => (
          <div key={idx} className="absolute w-full h-full rounded-xl overflow-hidden">
            <img
              src={src}
              alt={`Haunted ${idx}`}
              className="w-full h-full object-cover rounded-xl opacity-70"
              style={{ filter: "grayscale(30%) brightness(80%)" }}
            />
            {/* 👻 Ghosty Line Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-ghostLines z-10 pointer-events-none"></div>
          </div>
        ))}

        {/* 👁️ Ghostly Eye Overlay */}
        <div className="absolute w-32 h-32 rounded-full bg-cyan-300/10 border border-cyan-500 blur-lg animate-glowPulse z-20"></div>

        <div className="z-30 text-center mt-auto text-lg font-semibold bg-black/70 px-4 py-2 rounded-lg mt-4 animate-pulse">
          🧟‍♂️ Beware... Spirits are watching!
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen p-0 relative z-10 overflow-hidden">
        <div className="sticky top-0 z-20 bg-[#1a1d2e] p-6 border-b border-gray-700">
          <h1 className="text-4xl font-extrabold text-center animate-glow text-white">
            👻 GhostChat <span className="text-blue-400">with AI</span>
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#232a37] px-6 py-4 space-y-4 shadow-inner scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-lg p-4 rounded-lg text-white shadow-lg transition-all duration-300 ${
                msg.isUser
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 self-end ml-auto animate-fadeInRight'
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 self-start animate-fadeInLeft'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 z-20 bg-[#1a1d2e] px-6 py-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              placeholder="Type a haunted message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-3 rounded-lg bg-[#3d4853] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GhostChat;
 
