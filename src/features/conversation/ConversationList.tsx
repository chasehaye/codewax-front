'use client';
import { useEffect, useState } from 'react';

import { listConversations } from '@/src/lib/api/conversation';

import AddConversationButton from './components/AddConversationButton';
import ConversationListItem from './components/ConversationListItem';

type ConversationListProps = {
  setShowNewChat: (value: boolean) => void;
};

interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function ConversationList({
  setShowNewChat,
}: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await listConversations();
        setConversations(data);
      } catch {
        setError('Failed to load conversations.');
      }
    };

    fetch();
  }, []);

  return (
    <aside className="bg-bg-navbar m-4 flex w-60 flex-col justify-start rounded-xl shadow">
      <div className="shrink-0 px-2 pt-2">
        <AddConversationButton setShowNewChat={setShowNewChat} />
      </div>
      <h2 className="mt-5 shrink-0 text-center text-lg">Recents</h2>
      <ul className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        {error && (
          <li className="mt-4 text-center text-sm text-red-500">{error}</li>
        )}
        {!error &&
          conversations?.map((conv) => (
            <ConversationListItem key={conv.id} conversation={conv} />
          ))}
      </ul>
    </aside>
  );
}
