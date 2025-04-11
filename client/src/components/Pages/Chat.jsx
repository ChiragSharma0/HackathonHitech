import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat() {
  const username = localStorage.getItem('username');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [myId, setMyId] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      setMyId(socket.id);
      console.log(socket.id);
    });

    socket.on('receive-message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('receive-message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send-message', {
        username,
        message,
        senderId: socket.id
      });
      setMessage('');
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
      <div className="w-[450px] h-[90vh] bg-[#111b21] text-white flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        
        {/* Header */}
        <header className="bg-[#202c33] border-b border-[#2a3942] p-4 text-lg font-bold text-white shadow-sm">
          🟢 WhatsApp Group Chat
        </header>
  
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-[#0b141a]">
          {chat.map((msg, index) => {
            const isSender = msg.senderId === myId;
  
            return (
              <div
                key={index}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-xl px-4 py-2 max-w-[75%] text-sm leading-tight ${
                    isSender
                      ? 'bg-[#005c4b] text-white'
                      : 'bg-[#202c33] text-white'
                  }`}
                >
                  <div className="text-xs mb-1 text-gray-300 font-medium">
                    {isSender ? 'You' : msg.username}
                  </div>
                  <div>{msg.message}</div>
                </div>
              </div>
            );
          })}
        </div>
  
        {/* Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-3 bg-[#202c33] border-t border-[#2a3942] flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 rounded-full bg-[#2a3942] text-white border border-[#2a3942] focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-medium shadow-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}  

export default Chat;
