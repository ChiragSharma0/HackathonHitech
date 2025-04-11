import { useState } from 'react';
import { BrowserRouter, Routes, Route ,useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate(); // now you can use navigate('/chat')

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem('username', name);
      navigate('/chat');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in-up">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800">Welcome to Group Chat</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your name to join the conversation</p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={handleLogin}
          >
            🚀 Join Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
