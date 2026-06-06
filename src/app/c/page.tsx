'use client';

import Header from '@/src/components/layout/Header';
import ConversationList from '@/src/features/conversation/ConversationList';
import NewConversation from '@/src/features/conversation/ConversationNew';
import { useNav } from '@/src/providers/NavContext';

export default function GeneralPromptPage() {
  const { isOpen } = useNav();


  return (
    <div className="flex h-screen flex-col">
      {!isOpen && <Header />}
      <div className="flex flex-1 overflow-hidden">
        {isOpen && <ConversationList />}
        <div
          className={`flex flex-1 overflow-hidden ${isOpen ? 'pointer-events-none blur-sm' : ''}`}
        >
          <NewConversation />
        </div>
      </div>
    </div>
  );
}
