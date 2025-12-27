'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Send, Mail, Clock, CheckCircle2 } from 'lucide-react';

interface MessagesProps {
  theme: 'dark' | 'light';
}

interface Message {
  id: number;
  subject: string;
  message: string;
  timestamp: string;
  status: 'read' | 'unread';
  from: string;
}

export function Messages({ theme }: MessagesProps) {
  const [activeTab, setActiveTab] = useState<'send' | 'inbox'>('send');
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const inboxMessages: Message[] = [
    {
      id: 1,
      subject: 'KYC Verification Approved',
      message: 'Your KYC verification has been successfully completed. You can now start trading with higher limits.',
      timestamp: '2 hours ago',
      status: 'unread',
      from: 'GoldJar Support'
    },
    {
      id: 2,
      subject: 'Transaction Confirmation - Gold Purchase',
      message: 'Your purchase of 100g Gold (999 purity) has been confirmed. Transaction ID: #GJ123456',
      timestamp: '1 day ago',
      status: 'read',
      from: 'GoldJar Transactions'
    },
    {
      id: 3,
      subject: 'Special Offer: Zero Making Charges',
      message: 'Limited time offer! Get zero making charges on all gold coin purchases above 50g.',
      timestamp: '3 days ago',
      status: 'read',
      from: 'GoldJar Marketing'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully! Our support team will respond within 24 hours.');
    setFormData({ subject: '', message: '' });
  };

  return (
    <section className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
    }`}>
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className={`mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Messages
        </h2>
        <p className={`text-base sm:text-lg ${
          theme === 'dark' ? 'text-white/60' : 'text-gray-600'
        }`}>
          Send messages to support or view your message history
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('send')}
            className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
              activeTab === 'send'
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                : theme === 'dark'
                ? 'glass-card text-white/60 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:text-black'
            }`}
          >
            <Send className="w-4 h-4 inline-block mr-2" />
            Send Message
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base relative ${
              activeTab === 'inbox'
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                : theme === 'dark'
                ? 'glass-card text-white/60 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:text-black'
            }`}
          >
            <Mail className="w-4 h-4 inline-block mr-2" />
            Inbox
            <span className="ml-2 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs">
              1
            </span>
          </button>
        </div>

        {/* Send Message Tab */}
        {activeTab === 'send' && (
          <Card className="border-[#FFD700]/20">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <h3 className={`mb-4 sm:mb-6 flex items-center gap-2 text-lg sm:text-xl ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  <Send className="w-5 h-5 text-[#FFD700]" />
                  Send Message to Support
                </h3>
              </div>

              <div>
                <label className={`block mb-2 text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                }`}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter message subject"
                  required
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                      : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                  } focus:outline-none`}
                />
              </div>

              <div>
                <label className={`block mb-2 text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white/80' : 'text-gray-700'
                }`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                  rows={8}
                  required
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-xl transition-colors text-sm sm:text-base resize-none ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-[#FFD700]/50'
                      : 'bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-[#FFD700]/50'
                  } focus:outline-none`}
                />
              </div>

              <div className={`glass-card rounded-xl p-3 sm:p-4 ${
                theme === 'dark' ? '' : 'bg-blue-50'
              }`}>
                <p className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                }`}>
                  <strong className={theme === 'dark' ? 'text-white' : 'text-black'}>
                    Response Time:
                  </strong> Our support team typically responds within 24 hours during business days.
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1 text-sm sm:text-base"
                  onClick={() => setFormData({ subject: '', message: '' })}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Inbox Tab */}
        {activeTab === 'inbox' && (
          <div className="space-y-3 sm:space-y-4">
            {inboxMessages.map((msg) => (
              <Card 
                key={msg.id}
                className={`cursor-pointer transition-all duration-300 ${
                  msg.status === 'unread'
                    ? 'border-[#FFD700]/30'
                    : theme === 'dark'
                    ? 'border-white/10'
                    : 'border-gray-200'
                } hover:border-[#FFD700]/50`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.status === 'unread'
                      ? 'bg-[#FFD700]/20'
                      : theme === 'dark'
                      ? 'bg-white/5'
                      : 'bg-gray-100'
                  }`}>
                    <Mail className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      msg.status === 'unread' ? 'text-[#FFD700]' : theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                    }`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                      <h4 className={`text-sm sm:text-base ${
                        msg.status === 'unread'
                          ? theme === 'dark' ? 'text-white' : 'text-black'
                          : theme === 'dark' ? 'text-white/70' : 'text-gray-700'
                      } truncate`}>
                        {msg.subject}
                      </h4>
                      {msg.status === 'unread' && (
                        <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs whitespace-nowrap">
                          New
                        </span>
                      )}
                    </div>

                    <p className={`text-xs sm:text-sm mb-2 line-clamp-2 ${
                      theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                    }`}>
                      {msg.message}
                    </p>

                    <div className="flex items-center gap-3 sm:gap-4 text-xs">
                      <span className={`flex items-center gap-1 ${
                        theme === 'dark' ? 'text-white/40' : 'text-gray-400'
                      }`}>
                        <Clock className="w-3 h-3" />
                        {msg.timestamp}
                      </span>
                      <span className={theme === 'dark' ? 'text-white/40' : 'text-gray-400'}>
                        From: {msg.from}
                      </span>
                      {msg.status === 'read' && (
                        <span className="flex items-center gap-1 text-green-500">
                          <CheckCircle2 className="w-3 h-3" />
                          Read
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {inboxMessages.length === 0 && (
              <Card className="text-center py-12">
                <Mail className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${
                  theme === 'dark' ? 'text-white/20' : 'text-gray-300'
                }`} />
                <p className={`text-sm sm:text-base ${
                  theme === 'dark' ? 'text-white/60' : 'text-gray-600'
                }`}>
                  No messages in your inbox
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
