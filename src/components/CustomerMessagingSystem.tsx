import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle, 
  User, 
  Wrench,
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react';

interface Message {
  id: string;
  trackingCode: string;
  senderType: 'customer' | 'shop';
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
  urgent: boolean;
}

interface CustomerMessagingSystemProps {
  trackingCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  onClose?: () => void;
}

// Mock messages data
const mockMessages: Message[] = [
  {
    id: '1',
    trackingCode: 'MC-2024-001235',
    senderType: 'shop',
    senderName: 'Mike - Service Technician',
    message: 'Hi Sarah! I\'ve started working on your Honda Civic. The brake inspection is complete and I found that the front brake pads need replacement. The rotors are in good condition. I\'ll need about 45 minutes to complete the pad replacement. The additional cost for parts will be $85.50.',
    timestamp: '2024-01-15T11:30:00Z',
    read: true,
    urgent: false
  },
  {
    id: '2',
    trackingCode: 'MC-2024-001235',
    senderType: 'customer',
    senderName: 'Sarah Johnson',
    message: 'Thanks for the update! Please go ahead with the brake pad replacement. How much longer do you think it will take?',
    timestamp: '2024-01-15T11:45:00Z',
    read: true,
    urgent: false
  },
  {
    id: '3',
    trackingCode: 'MC-2024-001235',
    senderType: 'shop',
    senderName: 'Mike - Service Technician',
    message: 'Perfect! I should have everything completed within the next 30 minutes. I\'ll send you another update when it\'s ready for pickup.',
    timestamp: '2024-01-15T12:00:00Z',
    read: true,
    urgent: false
  }
];

const CustomerMessagingSystem: React.FC<CustomerMessagingSystemProps> = ({
  trackingCode,
  customerName,
  customerEmail,
  customerPhone,
  serviceName,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Load messages for this tracking code
    const trackingMessages = mockMessages.filter(msg => msg.trackingCode === trackingCode);
    setMessages(trackingMessages);
  }, [trackingCode]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    
    // Create new message
    const message: Message = {
      id: Date.now().toString(),
      trackingCode,
      senderType: 'customer',
      senderName: customerName,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false,
      urgent: false
    };

    // Simulate API call
    setTimeout(() => {
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setSending(false);
      
      // Simulate shop response after a delay
      setTimeout(() => {
        const shopResponse: Message = {
          id: (Date.now() + 1).toString(),
          trackingCode,
          senderType: 'shop',
          senderName: 'Customer Service',
          message: 'Thank you for your message! We\'ve received it and will respond shortly. If this is urgent, please call us at (555) 123-SHOP.',
          timestamp: new Date().toISOString(),
          read: false,
          urgent: false
        };
        setMessages(prev => [...prev, shopResponse]);
      }, 2000);
    }, 500);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const quickMessages = [
    "When will my service be completed?",
    "Can I get a cost estimate?",
    "Is there any additional work needed?",
    "What time can I pick up my vehicle?",
    "Do you need any additional authorization?"
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Service Messages
            </h2>
            <p className="text-gray-600 mt-1">
              {serviceName} - {trackingCode}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-4 bg-blue-50 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">{customerName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">{customerPhone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">{customerEmail}</span>
            </div>
          </div>
          <div className="text-xs text-blue-600">
            For urgent matters, call (555) 123-SHOP
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-600">
              Start a conversation with our service team. We're here to help!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderType === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.senderType === 'customer'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.senderType === 'shop' ? (
                    <Wrench className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="text-xs font-medium">
                    {message.senderName}
                  </span>
                  {message.urgent && (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  )}
                </div>
                <p className="text-sm">{message.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${
                    message.senderType === 'customer' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {formatTimestamp(message.timestamp)}
                  </span>
                  {message.senderType === 'customer' && (
                    <CheckCircle className="w-3 h-3 text-blue-200" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {sending && (
          <div className="flex justify-end">
            <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-blue-500 text-white opacity-70">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-xs ml-2">Sending...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Messages */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Messages:</h4>
        <div className="flex flex-wrap gap-2">
          {quickMessages.map((quickMsg, index) => (
            <button
              key={index}
              onClick={() => setNewMessage(quickMsg)}
              className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              {quickMsg}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                Press Enter to send, Shift+Enter for new line
              </span>
              <span className="text-xs text-gray-500">
                {newMessage.length}/500
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending || newMessage.length > 500}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Response Time Notice */}
      <div className="p-3 bg-yellow-50 border-t border-yellow-200 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-yellow-800">
          <Clock className="w-4 h-4" />
          <span>We typically respond within 15-30 minutes during business hours</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerMessagingSystem;