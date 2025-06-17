
import React, { useState } from 'react';
import { Send, Phone, Video, MoreVertical, Smile, Paperclip } from 'lucide-react';

const LiveChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'customer',
      text: 'Hi, I have a question about your pricing plans.',
      time: '2:34 PM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 2,
      sender: 'agent',
      text: 'Hello! I\'d be happy to help you with our pricing. What specific information are you looking for?',
      time: '2:35 PM',
      avatar: null
    },
    {
      id: 3,
      sender: 'customer',
      text: 'I\'m interested in the enterprise plan. Can you tell me about the features included?',
      time: '2:36 PM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'agent',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: null
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Customer"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">John Smith</h3>
            <p className="text-sm text-green-600 flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Video className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
              msg.sender === 'agent' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}>
              {msg.avatar && (
                <img
                  src={msg.avatar}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
              )}
              <div className={`px-4 py-2 rounded-2xl ${
                msg.sender === 'agent'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'agent' ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-gray-100 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200"
            />
            <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;
