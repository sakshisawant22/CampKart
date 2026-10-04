import React from 'react';
import { Conversation } from '../../types';
import { ShieldCheck, MessageSquare, Search } from 'lucide-react';

interface ChatListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  searchQuery,
  onSearchChange,
}) => {
  const filtered = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.relatedProductTitle && c.relatedProductTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-brand-border/70 overflow-hidden shadow-soft">
      {/* Search & Header */}
      <div className="p-4 border-b border-slate-100 bg-pastel-warm/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-pastel-sage-dark" />
            <h3 className="font-extrabold text-base text-brand-dark">Messages</h3>
          </div>
          <span className="text-xs bg-pastel-mint-light text-pastel-mint-dark font-bold px-2 py-0.5 rounded-full">
            {conversations.length} chats
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search chats & items..."
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pastel-sage"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-brand-muted">
            No conversations found.
          </div>
        ) : (
          filtered.map((conv) => {
            const isSelected = conv.id === activeConversationId;
            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full text-left p-4 transition-colors flex items-start gap-3 relative ${
                  isSelected
                    ? 'bg-pastel-mint-light/50 border-l-4 border-pastel-sage-dark'
                    : 'hover:bg-pastel-warm/40'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.participant.avatar}
                    alt={conv.participant.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                  {conv.participant.isVerified && (
                    <ShieldCheck size={12} className="text-pastel-mint-dark absolute -bottom-1 -right-1 bg-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-brand-dark truncate">
                      {conv.participant.name}
                    </h4>
                    <span className="text-[10px] text-brand-muted flex-shrink-0">
                      {conv.lastMessageTimestamp}
                    </span>
                  </div>

                  {conv.relatedProductTitle && (
                    <div className="text-[10px] font-semibold text-pastel-sage-dark truncate mb-1">
                      🏷️ {conv.relatedProductTitle}
                    </div>
                  )}

                  <p className="text-xs text-brand-muted truncate leading-relaxed">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-pastel-mint-dark text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-2">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
