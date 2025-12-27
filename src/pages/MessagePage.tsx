import React, { useState } from 'react';
import { Send, MessageCircle, Clock, CheckCheck, Search, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface MessagePageProps {
  theme?: 'dark' | 'light';
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

export function MessagePage({ theme = 'dark' }: MessagePageProps) {
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'GoldJar Support',
      lastMessage: 'How can we help you today?',
      timestamp: '2 min ago',
      unread: 2,
      avatar: '🎯',
      online: true
    },
    {
      id: 2,
      name: 'Trading Assistance',
      lastMessage: 'Your order has been confirmed',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: '📊',
      online: true
    },
    {
      id: 3,
      name: 'Account Manager',
      lastMessage: 'Thank you for your patience',
      timestamp: 'Yesterday',
      unread: 0,
      avatar: '👤',
      online: false
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! Welcome to GoldJar support.',
      sender: 'support',
      timestamp: '10:30 AM',
      read: true
    },
    {
      id: 2,
      text: 'How can we help you today?',
      sender: 'support',
      timestamp: '10:30 AM',
      read: true
    },
    {
      id: 3,
      text: 'Hi, I need help with my recent gold purchase.',
      sender: 'user',
      timestamp: '10:32 AM',
      read: true
    },
    {
      id: 4,
      text: 'Of course! I\'d be happy to assist you. Could you please provide your order ID?',
      sender: 'support',
      timestamp: '10:33 AM',
      read: true
    },
    {
      id: 5,
      text: 'Sure, it\'s #GJ-12345',
      sender: 'user',
      timestamp: '10:34 AM',
      read: true
    },
    {
      id: 6,
      text: 'Thank you! Let me check your order details.',
      sender: 'support',
      timestamp: '10:35 AM',
      read: false
    }
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setMessages([...messages, newMessage]);
    setMessageText('');

    // Simulate response
    setTimeout(() => {
      const responseMessage: Message = {
        id: messages.length + 2,
        text: 'Thank you for your message. Our team will get back to you shortly.',
        sender: 'support',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>
            <span className="gold-text">Messages</span> & Support
          </h1>
          <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>
            Chat with our support team and get instant help
          </p>
        </div>

        {/* Chat Interface */}
        <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden" style={{ height: '600px' }}>
          <div className="grid grid-cols-1 md:grid-cols-12 h-full">
            {/* Conversations List */}
            <div className={`col-span-4 border-r ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
              {/* Search */}
              <div className="p-4 border-b border-white/10">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-white/40' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className={`w-full pl-11 pr-4 py-3 rounded-xl ${
                      theme === 'dark'
                        ? 'bg-white/5 border border-white/10 text-white'
                        : 'bg-gray-100 border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                  />
                </div>
              </div>

              {/* Conversation Items */}
              <div className="overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 cursor-pointer transition-all border-l-4 ${
                      selectedConversation === conv.id
                        ? 'border-[#FFD700] bg-[#FFD700]/10'
                        : 'border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full ${
                          theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
                        } flex items-center justify-center text-2xl`}>
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`${theme === 'dark' ? 'text-white' : 'text-black'} truncate`}>
                            {conv.name}
                          </h3>
                          <span className={`text-xs ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
                            {conv.timestamp}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <p className={`text-sm truncate ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                            {conv.lastMessage}
                          </p>
                          {conv.unread > 0 && (
                            <div className="w-5 h-5 rounded-full bg-[#FFD700] flex items-center justify-center text-xs text-black">
                              {conv.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-8 flex flex-col">
              {/* Chat Header */}
              {selectedConv && (
                <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
                      } flex items-center justify-center text-xl`}>
                        {selectedConv.avatar}
                      </div>
                      {selectedConv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                      )}
                    </div>
                    <div>
                      <h3 className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {selectedConv.name}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
                        {selectedConv.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className={`p-2 rounded-xl ${
                      theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                    } transition-all`}>
                      <Phone className={`w-5 h-5 ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`} />
                    </button>
                    <button className={`p-2 rounded-xl ${
                      theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                    } transition-all`}>
                      <Video className={`w-5 h-5 ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`} />
                    </button>
                    <button className={`p-2 rounded-xl ${
                      theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-200'
                    } transition-all`}>
                      <MoreVertical className={`w-5 h-5 ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`} />
                    </button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-br-sm'
                          : theme === 'dark'
                          ? 'bg-white/10 text-white rounded-bl-sm'
                          : 'bg-gray-200 text-black rounded-bl-sm'
                      }`}>
                        <p>{message.text}</p>
                      </div>
                      <div className={`flex items-center gap-2 mt-1 px-2 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className={`text-xs ${theme === 'dark' ? 'text-white/40' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </span>
                        {message.sender === 'user' && (
                          <CheckCheck className={`w-4 h-4 ${message.read ? 'text-blue-500' : theme === 'dark' ? 'text-white/40' : 'text-gray-400'}`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className={`flex-1 px-4 py-3 rounded-xl ${
                      theme === 'dark'
                        ? 'bg-white/5 border border-white/10 text-white'
                        : 'bg-gray-100 border border-gray-300 text-black'
                    } focus:border-[#FFD700] outline-none transition-all`}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}