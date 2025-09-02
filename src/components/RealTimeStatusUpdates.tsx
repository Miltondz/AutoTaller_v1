import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Wrench,
  Car,
  DollarSign,
  MessageSquare,
  X
} from 'lucide-react';

interface StatusUpdate {
  id: string;
  trackingCode: string;
  type: 'status_change' | 'message' | 'cost_update' | 'completion_time';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  urgent: boolean;
  data?: any;
}

interface RealTimeStatusUpdatesProps {
  trackingCode: string;
  onUpdateReceived?: (update: StatusUpdate) => void;
}

// Mock real-time updates
const mockUpdates: StatusUpdate[] = [
  {
    id: '1',
    trackingCode: 'MC-2024-001235',
    type: 'status_change',
    title: 'Service Started',
    message: 'Your Honda Civic brake inspection has begun. Our technician Mike is now working on your vehicle.',
    timestamp: '2024-01-15T11:00:00Z',
    read: false,
    urgent: false,
    data: { newStatus: 'in_progress', estimatedCompletion: '2024-01-15T13:00:00Z' }
  },
  {
    id: '2',
    trackingCode: 'MC-2024-001235',
    type: 'message',
    title: 'New Message from Technician',
    message: 'Front brake pads need replacement. Rotors are in good condition. Additional cost: $85.50',
    timestamp: '2024-01-15T11:30:00Z',
    read: false,
    urgent: true,
    data: { senderName: 'Mike - Service Technician' }
  },
  {
    id: '3',
    trackingCode: 'MC-2024-001235',
    type: 'cost_update',
    title: 'Cost Update',
    message: 'Additional parts cost of $85.50 has been added for brake pad replacement.',
    timestamp: '2024-01-15T11:35:00Z',
    read: false,
    urgent: false,
    data: { additionalCost: 85.50, totalCost: 275.49 }
  },
  {
    id: '4',
    trackingCode: 'MC-2024-001235',
    type: 'completion_time',
    title: 'Updated Completion Time',
    message: 'Your service is progressing well. New estimated completion time: 12:30 PM',
    timestamp: '2024-01-15T12:00:00Z',
    read: false,
    urgent: false,
    data: { newEstimatedCompletion: '2024-01-15T12:30:00Z' }
  }
];

const RealTimeStatusUpdates: React.FC<RealTimeStatusUpdatesProps> = ({
  trackingCode,
  onUpdateReceived
}) => {
  const [updates, setUpdates] = useState<StatusUpdate[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load existing updates for this tracking code
    const trackingUpdates = mockUpdates.filter(update => update.trackingCode === trackingCode);
    setUpdates(trackingUpdates);
    setUnreadCount(trackingUpdates.filter(update => !update.read).length);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Randomly generate new updates (in a real app, this would be WebSocket or SSE)
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const newUpdate: StatusUpdate = {
          id: Date.now().toString(),
          trackingCode,
          type: 'message',
          title: 'Service Update',
          message: 'Your service is progressing smoothly. We\'ll notify you when it\'s ready for pickup.',
          timestamp: new Date().toISOString(),
          read: false,
          urgent: false,
          data: {}
        };

        setUpdates(prev => [newUpdate, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        if (onUpdateReceived) {
          onUpdateReceived(newUpdate);
        }

        // Show browser notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(newUpdate.title, {
            body: newUpdate.message,
            icon: '/favicon.ico'
          });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [trackingCode, onUpdateReceived]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const markAsRead = (updateId: string) => {
    setUpdates(prev => prev.map(update => 
      update.id === updateId ? { ...update, read: true } : update
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setUpdates(prev => prev.map(update => ({ ...update, read: true })));
    setUnreadCount(0);
  };

  const getUpdateIcon = (type: string, urgent: boolean) => {
    const iconClass = urgent ? 'text-orange-500' : 'text-blue-500';
    
    switch (type) {
      case 'status_change':
        return <AlertCircle className={`w-5 h-5 ${iconClass}`} />;
      case 'message':
        return <MessageSquare className={`w-5 h-5 ${iconClass}`} />;
      case 'cost_update':
        return <DollarSign className={`w-5 h-5 ${iconClass}`} />;
      case 'completion_time':
        return <Clock className={`w-5 h-5 ${iconClass}`} />;
      default:
        return <Bell className={`w-5 h-5 ${iconClass}`} />;
    }
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

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Service Updates</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Updates List */}
          <div className="max-h-96 overflow-y-auto">
            {updates.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No updates yet</h4>
                <p className="text-gray-600">
                  You'll receive real-time updates about your service here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {updates.map((update) => (
                  <div
                    key={update.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !update.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(update.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getUpdateIcon(update.type, update.urgent)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-sm font-medium ${
                            !update.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {update.title}
                          </h4>
                          {update.urgent && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Urgent
                            </span>
                          )}
                          {!update.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${
                          !update.read ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {update.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(update.timestamp)}
                          </span>
                          {update.data && update.type === 'cost_update' && (
                            <span className="text-xs font-medium text-green-600">
                              Total: ${update.data.totalCost?.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
            <p className="text-xs text-gray-600">
              Updates are delivered in real-time during business hours
            </p>
          </div>
        </div>
      )}

      {/* Toast Notifications for New Updates */}
      {updates.filter(update => !update.read).slice(0, 1).map(update => (
        <div
          key={`toast-${update.id}`}
          className="fixed top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm z-50 animate-slide-in"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getUpdateIcon(update.type, update.urgent)}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">{update.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{update.message}</p>
            </div>
            <button
              onClick={() => markAsRead(update.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      <style >{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RealTimeStatusUpdates;
