import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCampusKart } from '../context/CampusKartContext';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { MessageSquare } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const MessagesPage: React.FC = () => {
  const { conversations, messages } = useCampusKart();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeConvParam = searchParams.get('conv');
  const [activeConvId, setActiveConvId] = useState<string | null>(
    activeConvParam || (conversations.length > 0 ? conversations[0].id : null)
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (activeConvParam) {
      setActiveConvId(activeConvParam);
    } else if (conversations.length > 0 && !activeConvId) {
      setActiveConvId(conversations[0].id);
    }
  }, [activeConvParam, conversations]);

  const handleSelectConv = (id: string) => {
    setActiveConvId(id);
    setSearchParams({ conv: id });
  };

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const activeMessages = activeConvId ? messages[activeConvId] || [] : [];

  return (
    <div className="h-[78vh] min-h-[550px] pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        
        {/* Left: Chat List (Hidden on mobile if conversation is selected) */}
        <div className={`lg:col-span-5 xl:col-span-4 h-full ${activeConvId ? 'hidden lg:block' : 'block'}`}>
          <ChatList
            conversations={conversations}
            activeConversationId={activeConvId}
            onSelectConversation={handleSelectConv}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Right: Active Chat Window (Full on mobile if selected) */}
        <div className={`lg:col-span-7 xl:col-span-8 h-full ${!activeConvId ? 'hidden lg:block' : 'block'}`}>
          {activeConversation ? (
            <ChatWindow
              conversation={activeConversation}
              messages={activeMessages}
              onBack={() => setActiveConvId(null)}
            />
          ) : (
            <div className="h-full bg-white rounded-3xl border border-brand-border flex items-center justify-center p-8">
              <EmptyState
                icon={<MessageSquare size={28} />}
                title="Select a conversation"
                description="Choose a student chat from the left or inquire about an item in the marketplace."
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
