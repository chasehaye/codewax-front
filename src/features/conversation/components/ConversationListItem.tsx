'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useNav } from '@/src/providers/NavContext';

interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

type ConversationListItemProps = {
  conversation: Conversation;
};

export default function ConversationListItem({
  conversation,
}: ConversationListItemProps) {
  const { toggle, isOpen } = useNav();
  const router = useRouter();

  const handleClick = () => {
    if (isOpen) toggle();
    router.push(`/c/${conversation.id}`);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className="group block w-full cursor-pointer rounded-lg p-2 text-left hover:bg-gray-100"
      >
        <div className="relative overflow-hidden">
          <span className="block whitespace-nowrap">
            {conversation.title || 'New Conversation'}
          </span>
          <div className="from-bg-navbar absolute inset-y-0 right-0 w-8 bg-linear-to-l to-transparent group-hover:from-gray-100" />
        </div>
      </button>
    </li>
  );
}
