'use client';
import { useEffect, useState } from 'react';

import { listConversations } from '@/src/lib/api/conversation';
import { useNav } from '@/src/providers/NavContext';

import AddConversationButton from './components/AddConversationButton';
import ConversationListItem from './components/ConversationListItem';

interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export default function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { toggle, isOpen } = useNav();
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
    <aside
      id="sidebar"
      className="bg-bg-navbar fixed inset-y-0 left-0 z-50 m-4 flex w-60 flex-col justify-start rounded-xl shadow-2xl"
    >
      <div className="mt-2 mr-4 flex shrink-0">
        <button
          onClick={toggle}
          className="ml-1 flex cursor-pointer items-center justify-center p-1 hover:text-gray-700"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-square-menu-icon lucide-square-menu"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 8h10" />
              <path d="M7 12h10" />
              <path d="M7 16h10" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-square-menu-icon lucide-square-menu"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 8h10" />
              <path d="M7 12h10" />
              <path d="M7 16h10" />
            </svg>
          )}
        </button>
        <AddConversationButton />
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
