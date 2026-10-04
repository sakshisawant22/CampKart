import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampusKart } from '../../context/CampusKartContext';
import { 
  Bell, 
  Heart, 
  MessageSquare, 
  Repeat, 
  Star, 
  ShoppingBag, 
  CheckCheck,
  ExternalLink 
} from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useCampusKart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'wishlist':
        return <Heart size={14} className="text-pink-500 fill-pink-500" />;
      case 'message':
        return <MessageSquare size={14} className="text-blue-500 fill-blue-500" />;
      case 'swap':
        return <Repeat size={14} className="text-purple-500" />;
      case 'review':
        return <Star size={14} className="text-amber-500 fill-amber-500" />;
      case 'sold':
      case 'purchase':
        return <ShoppingBag size={14} className="text-emerald-500" />;
      default:
        return <Bell size={14} className="text-slate-500" />;
    }
  };

  const handleNotificationClick = (id: string, link?: string) => {
    markNotificationAsRead(id);
    onClose();
    if (link) {
      navigate(link);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-soft-xl border border-brand-border/80 z-50 overflow-hidden animate-scale-in">
        <div className="p-4 bg-pastel-warm/60 border-b border-brand-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-brand-dark" />
            <span className="font-bold text-sm text-brand-dark">Notifications</span>
            <span className="text-xs bg-pastel-mint text-pastel-mint-dark font-bold px-2 py-0.5 rounded-full">
              {notifications.filter((n) => !n.read).length} new
            </span>
          </div>
          <button
            type="button"
            onClick={markAllNotificationsAsRead}
            className="text-xs text-pastel-sage-dark font-semibold hover:underline flex items-center gap-1"
          >
            <CheckCheck size={13} />
            Mark all read
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-brand-muted">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id, notif.link)}
                className={`p-3.5 hover:bg-pastel-warm/40 cursor-pointer transition-colors flex items-start gap-3 ${
                  !notif.read ? 'bg-pastel-mint-light/40' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className="text-xs font-bold text-brand-dark truncate">{notif.title}</p>
                    <span className="text-[10px] text-brand-muted flex-shrink-0">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">{notif.message}</p>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-pastel-mint-dark mt-2 flex-shrink-0" />
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={() => {
              onClose();
              navigate('/my-campuskart');
            }}
            className="text-xs font-bold text-pastel-sage-dark hover:text-brand-dark transition-colors inline-flex items-center gap-1"
          >
            View My CampusKart Activity <ExternalLink size={12} />
          </button>
        </div>
      </div>
    </>
  );
};
