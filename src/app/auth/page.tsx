'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Header from '@/src/components/layout/Header';
import ConversationList from '@/src/features/conversation/ConversationList';
import NewConversation from '@/src/features/conversation/ConversationNew';
import { useNav } from '@/src/providers/NavContext';
import { useUser } from '@/src/providers/UserContext';

export default function GeneralPromptPage() {
  const { isOpen } = useNav();
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace('/auth');
  }, [user, loading, router]);

  if (loading || !user) return null;

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
