'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Header from '@/src/components/layout/Header';
import ConversationList from '@/src/features/conversation/ConversationList';
import NewConversation from '@/src/features/conversation/ConversationNew';
import { listConversations } from '@/src/lib/api/conversation';

export default function GeneralPromptPage() {
  const [showNewChat, setShowNewChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await listConversations();
        if (data.length > 0) {
          router.replace(`/c/${data[0].id}`);
        } else {
          setShowNewChat(true);
        }
      } catch {
        setShowNewChat(true);
      }
    };

    fetchRecent();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ConversationList setShowNewChat={setShowNewChat} />
        {showNewChat && <NewConversation />}
      </div>
    </div>
  );
}
