import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Send, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface Message {
  id: number;
  subject: string;
  message: string;
  status: 'pending' | 'replied' | 'resolved';
  date: string;
  reply?: string;
}

export function Messages() {
  const [activeTab, setActiveTab] = useState<'send' | 'inbox'>('send');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      subject: 'Query about TDS deduction',
      message: 'I need clarification on TDS calculation for my recent gold sale transaction.',
      status: 'replied',
      date: '2025-12-24',
      reply: 'Thank you for your query. TDS of 1% has been deducted as per regulations. Please check your email for detailed breakdown.'
    },
    {
      id: 2,
      subject: 'KYC document upload issue',
      message: 'Unable to upload PAN card document. Getting error message.',
      status: 'resolved',
      date: '2025-12-22',
      reply: 'The issue has been resolved. Please try uploading again. Contact us if you face any further issues.'
    },
    {
      id: 3,
      subject: 'Physical delivery timeframe',
      message: 'When can I expect delivery of my 100g silver bar order?',
      status: 'pending',
      date: '2025-12-26'
    }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    alert('Message sent successfully! We will respond within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'replied':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'resolved':
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-orange-400" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'replied':
        return 'border-green-500/30 bg-green-500/5';
      case 'resolved':
        return 'border-blue-500/30 bg-blue-500/5';
      default:
        return 'border-orange-400/30 bg-orange-400/5';
    }
  };
  
  return (
    <section id="message" className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-white mb-4">
          Messages & Support
        </h2>
        <p className="text-white/60 text-lg">
          Send us your queries or check the status of your previous messages
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab('send')}
          className={`px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
            activeTab === 'send'
              ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
              : 'glass-card text-white/80 hover:text-white'
          }`}
        >
          <Send className="w-4 h-4" />
          Send Message
        </button>
        <button
          onClick={() => setActiveTab('inbox')}
          className={`px-8 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
            activeTab === 'inbox'
              ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
              : 'glass-card text-white/80 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          My Messages
          {messages.filter(m => m.status === 'pending').length > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {messages.filter(m => m.status === 'pending').length}
            </span>
          )}
        </button>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {activeTab === 'send' ? (
          /* Send Message Form */
          <Card className="border-[#FFD700]/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Send className="w-6 h-6 text-[#FFD700]" />
                <h3 className="text-white">Send a New Message</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="trading">Trading Query</option>
                    <option value="kyc">KYC Verification</option>
                    <option value="payment">Payment Issue</option>
                    <option value="delivery">Physical Delivery</option>
                    <option value="tds">TDS & Taxation</option>
                    <option value="account">Account Related</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please describe your query or concern in detail..."
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FFD700]/50 transition-colors resize-none"
                />
              </div>
              
              {/* Info Banner */}
              <div className="glass-card border border-blue-500/30 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/70">
                  <p>
                    Our support team typically responds within 24 hours during business days. 
                    For urgent queries, please call us at <strong className="text-[#FFD700]">1800-123-456</strong>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setFormData({ name: '', email: '', phone: '', subject: '', message: '' })}
                  className="px-6 py-3 glass-card border border-white/10 text-white rounded-xl hover:border-white/30 transition-all duration-300"
                >
                  Clear
                </button>
                <Button type="submit" variant="primary" className="px-8">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          /* Inbox - Message List */
          <div className="space-y-4">
            {messages.length === 0 ? (
              <Card className="border-white/10">
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">No messages yet</p>
                </div>
              </Card>
            ) : (
              messages.map((msg) => (
                <Card key={msg.id} className={`border ${getStatusColor(msg.status)}`}>
                  <div className="space-y-4">
                    {/* Message Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(msg.status)}
                          <h4 className="text-white">{msg.subject}</h4>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(msg.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            msg.status === 'replied' ? 'bg-green-500/20 text-green-400' :
                            msg.status === 'resolved' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-orange-400/20 text-orange-400'
                          }`}>
                            {msg.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Original Message */}
                    <div className="glass-card border border-white/10 rounded-xl p-4">
                      <p className="text-sm text-white/80 mb-1">Your Message:</p>
                      <p className="text-white/70">{msg.message}</p>
                    </div>
                    
                    {/* Reply */}
                    {msg.reply && (
                      <div className="glass-card border border-[#FFD700]/30 rounded-xl p-4 bg-[#FFD700]/5">
                        <p className="text-sm text-[#FFD700] mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          GoldJar Support Reply:
                        </p>
                        <p className="text-white/80">{msg.reply}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
      
      {/* Contact Info */}
      <div className="mt-12 grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="border-white/10 text-center">
          <div>
            <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center mx-auto mb-3">
              <Send className="w-6 h-6 text-[#FFD700]" />
            </div>
            <h4 className="text-white mb-2">Email Support</h4>
            <p className="text-sm text-white/60">support@goldjar.com</p>
          </div>
        </Card>
        
        <Card className="border-white/10 text-center">
          <div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-white mb-2">Live Chat</h4>
            <p className="text-sm text-white/60">Available 24/7</p>
          </div>
        </Card>
        
        <Card className="border-white/10 text-center">
          <div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-white mb-2">Phone Support</h4>
            <p className="text-sm text-white/60">1800-123-456</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
