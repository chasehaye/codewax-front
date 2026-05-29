'use client';
import Link from 'next/link';

import Header from '@/src/components/layout/Header';
import ConversationList from '@/src/features/conversation/ConversationList';
import RepositoryList from '@/src/features/repository/RepositoryList';
import { useNav } from '@/src/providers/NavContext';

export default function ProjectsPage() {
  const { isOpen } = useNav();
  return (
    <div className="flex h-screen flex-col">
      {!isOpen && <Header />}
      <div className="mt-20 flex justify-center">
        {isOpen && <ConversationList />}
        <Link
          href="/projects/add"
          className={`bg-bg-navbar mt-2 inline-flex w-60 rounded-xl shadow hover:bg-gray-100 ${isOpen ? 'pointer-events-none blur-sm' : ''}`}
        >
          <span className="mx-auto">Add a repository +</span>
        </Link>
      </div>
      <div className={`${isOpen ? 'pointer-events-none blur-sm' : ''}`}>
        <RepositoryList />
      </div>
    </div>
  );
}
