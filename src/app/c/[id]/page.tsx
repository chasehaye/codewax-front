'use client';
import { useState } from 'react';

import Header from '@/src/components/layout/Header';
import ConversationDetail from '@/src/features/conversation/ConversationDetail';
import ConversationList from '@/src/features/conversation/ConversationList';
import NewConversation from '@/src/features/conversation/ConversationNew';

export default function ConversationDetailPage() {
  const [showNewChat, setShowNewChat] = useState(false);
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ConversationList setShowNewChat={setShowNewChat} />
        {showNewChat ? <NewConversation /> : <ConversationDetail />}
      </div>
    </div>
  );
}
