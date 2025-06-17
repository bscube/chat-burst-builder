
import React from 'react';
import LiveChat from '../components/LiveChat';

const Chat = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Chat</h1>
        <p className="text-gray-600">Engage with your customers in real-time conversations.</p>
      </div>
      
      <div className="max-w-4xl">
        <LiveChat />
      </div>
    </div>
  );
};

export default Chat;
