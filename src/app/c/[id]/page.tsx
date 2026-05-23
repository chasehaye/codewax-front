'use client';

import Header from '@/src/components/layout/Header';
import ConversationDetail from '@/src/features/conversation/ConversationDetail';
import ConversationList from '@/src/features/conversation/ConversationList';
import { useNav } from '@/src/providers/NavContext';

export default function ConversationDetailPage() {
  const { isOpen } = useNav();

  return (
    <div className="flex h-screen flex-col">
      {!isOpen && <Header />}
      <div className="flex flex-1 overflow-hidden">
        {isOpen && <ConversationList />}
        <div
          className={`flex flex-1 overflow-hidden ${isOpen ? 'pointer-events-none blur-sm' : ''}`}
        >
          <ConversationDetail />
        </div>
      </div>
    </div>
  );
}
