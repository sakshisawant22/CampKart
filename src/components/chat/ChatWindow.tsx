import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatMessage } from '../../types';
import { useCampusKart } from '../../context/CampusKartContext';
import { 
  Send, 
  Image as ImageIcon, 
  MapPin, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCheck, 
  Star, 
  MoreVertical, 
  CheckCircle, 
  Repeat, 
  X, 
  AlertTriangle,
  Smile
} from 'lucide-react';
import { Button } from '../common/Button';

interface ChatWindowProps {
  conversation: Conversation;
  messages: ChatMessage[];
  onBack?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  messages,
  onBack,
}) => {
  const { sendMessage, currentUser, showToast, updateProductStatus } = useCampusKart();
  
  const [inputText, setInputText] = useState('');
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(conversation.id, inputText);
    setInputText('');
  };

  const handleSendLocation = (locName: string) => {
    sendMessage(conversation.id, `Let's meet at ${locName}`, {
      isLocation: true,
      locationName: locName,
    });
    setIsLocationMenuOpen(false);
    showToast(`Shared pickup spot: ${locName}`, 'success');
  };

  const handleSendPhotoMock = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    ];
    const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
    sendMessage(conversation.id, 'Here is an updated photo of the item condition:', {
      isPhoto: true,
      photoUrl: randomPhoto,
    });
    showToast('Photo sent to chat', 'success');
  };

  const handleMarkAsSold = () => {
    if (conversation.relatedProductId) {
      updateProductStatus(conversation.relatedProductId, 'sold');
    }
    sendMessage(conversation.id, '✅ Item marked as completed/sold. Thank you for exchanging on CampusKart!');
    setIsActionMenuOpen(false);
  };

  const handleConfirmSwap = () => {
    if (conversation.relatedProductId) {
      updateProductStatus(conversation.relatedProductId, 'swapped');
    }
    sendMessage(conversation.id, '🤝 Kart Swap confirmed! Let us meet at the agreed campus spot.');
    setIsActionMenuOpen(false);
  };

  const handleReport = () => {
    showToast(`Report filed for moderation review. CampusKart admins have been notified.`, 'info');
    setIsActionMenuOpen(false);
  };

  const handleBlock = () => {
    showToast(`User ${conversation.participant.name} blocked.`, 'warning');
    setIsActionMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-brand-border/70 overflow-hidden shadow-soft">
      
      {/* Top Header */}
      <div className="p-4 bg-pastel-warm/60 border-b border-brand-border/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="lg:hidden p-1.5 rounded-xl hover:bg-slate-200 text-brand-muted"
            >
              <X size={18} />
            </button>
          )}

          <div className="relative flex-shrink-0">
            <img
              src={conversation.participant.avatar}
              alt={conversation.participant.name}
              className="w-10 h-10 rounded-2xl object-cover border border-pastel-mint shadow-xs"
            />
            {conversation.participant.isVerified && (
              <ShieldCheck size={13} className="text-pastel-mint-dark absolute -bottom-1 -right-1 bg-white rounded-full" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-brand-dark truncate">{conversation.participant.name}</h3>
              <span className="text-[10px] font-semibold bg-pastel-mint-light text-pastel-mint-dark px-1.5 py-0.2 rounded-full">
                {conversation.participant.year}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-brand-muted">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-brand-dark">{conversation.participant.rating}</span>
              <span>• {conversation.participant.department}</span>
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            className="p-2 rounded-xl text-brand-muted hover:text-brand-dark hover:bg-slate-100 transition-colors"
            aria-label="More actions"
          >
            <MoreVertical size={18} />
          </button>

          {isActionMenuOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setIsActionMenuOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-xl border border-slate-200 py-1.5 z-30 animate-scale-in text-xs">
                <button
                  type="button"
                  onClick={handleMarkAsSold}
                  className="w-full px-4 py-2 text-left font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2"
                >
                  <CheckCircle size={14} />
                  Mark as Sold
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSwap}
                  className="w-full px-4 py-2 text-left font-semibold text-purple-700 hover:bg-purple-50 flex items-center gap-2"
                >
                  <Repeat size={14} />
                  Confirm Swap
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  type="button"
                  onClick={handleReport}
                  className="w-full px-4 py-2 text-left text-brand-muted hover:bg-slate-50 flex items-center gap-2"
                >
                  <ShieldAlert size={14} />
                  Report Listing / User
                </button>
                <button
                  type="button"
                  onClick={handleBlock}
                  className="w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <X size={14} />
                  Block User
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-pastel-mint-light/60 px-4 py-2 border-b border-pastel-mint/60 flex items-center gap-2 text-[11px] text-pastel-mint-dark font-medium">
        <ShieldCheck size={14} className="flex-shrink-0" />
        <span className="truncate">
          Meet at a safe public location on campus (Library, Block A, Canteen) and verify item before exchange.
        </span>
      </div>

      {/* Related Product Snippet Header */}
      {conversation.relatedProductTitle && (
        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            {conversation.relatedProductImage && (
              <img
                src={conversation.relatedProductImage}
                alt=""
                className="w-8 h-8 rounded-lg object-cover border border-slate-200"
              />
            )}
            <div className="truncate">
              <span className="font-bold text-brand-dark truncate block">{conversation.relatedProductTitle}</span>
              <span className="text-[10px] text-pastel-sage-dark font-bold">
                {conversation.relatedProductPrice ? `₹${conversation.relatedProductPrice}` : 'Kart Swap'}
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200 text-brand-muted">
            Campus Marketplace Item
          </span>
        </div>
      )}

      {/* Chat Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-pastel-warm/20">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                isMe ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {/* Bubble */}
              <div
                className={`p-3.5 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-pastel-sage-dark text-white rounded-br-xs'
                    : 'bg-white text-brand-dark border border-slate-200 rounded-bl-xs'
                }`}
              >
                {/* Photo attachment */}
                {msg.isPhoto && msg.photoUrl && (
                  <div className="mb-2 rounded-2xl overflow-hidden max-w-[240px] border border-white/20">
                    <img src={msg.photoUrl} alt="Shared upload" className="w-full h-auto object-cover" />
                  </div>
                )}

                {/* Location attachment */}
                {msg.isLocation && (
                  <div className={`flex items-center gap-2 p-2.5 rounded-2xl mb-1.5 font-bold ${
                    isMe ? 'bg-white/15 text-white' : 'bg-pastel-mint-light text-pastel-mint-dark border border-pastel-mint'
                  }`}>
                    <MapPin size={16} />
                    <span>Campus Meetup: {msg.locationName}</span>
                  </div>
                )}

                <p className="whitespace-pre-line">{msg.text}</p>
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-brand-muted mt-1 px-1 flex items-center gap-1">
                {msg.timestamp}
                {isMe && <CheckCheck size={12} className="text-pastel-sage-dark" />}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Location Picker Popup */}
      {isLocationMenuOpen && (
        <div className="p-3 bg-white border-t border-slate-100 animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-brand-dark flex items-center gap-1">
              <MapPin size={13} className="text-pastel-sage-dark" />
              Choose Campus Meetup Spot
            </span>
            <button
              onClick={() => setIsLocationMenuOpen(false)}
              className="text-brand-muted hover:text-brand-dark p-0.5"
            >
              <X size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Central Library Gate', 'Block A Reception', 'Main Canteen', 'Student Activity Center'].map((spot) => (
              <button
                key={spot}
                type="button"
                onClick={() => handleSendLocation(spot)}
                className="p-2 rounded-xl bg-pastel-warm hover:bg-pastel-mint-light text-left text-xs font-semibold text-brand-dark border border-slate-200 transition-colors truncate"
              >
                📍 {spot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box Footer */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-brand-border/60 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSendPhotoMock}
          className="p-2.5 rounded-2xl text-brand-muted hover:text-brand-dark hover:bg-pastel-warm transition-colors"
          title="Send photo of item"
        >
          <ImageIcon size={18} />
        </button>

        <button
          type="button"
          onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
          className={`p-2.5 rounded-2xl transition-colors ${
            isLocationMenuOpen
              ? 'bg-pastel-mint text-pastel-mint-dark'
              : 'text-brand-muted hover:text-brand-dark hover:bg-pastel-warm'
          }`}
          title="Share campus meetup location"
        >
          <MapPin size={18} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write a message to student..."
          className="flex-1 px-4 py-2.5 rounded-2xl bg-pastel-warm/60 border border-brand-border text-xs sm:text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-pastel-sage placeholder:text-brand-muted/70"
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          icon={<Send size={15} />}
          disabled={!inputText.trim()}
          className="rounded-2xl px-4 font-bold"
        >
          Send
        </Button>
      </form>
    </div>
  );
};
