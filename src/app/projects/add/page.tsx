'use client';
import Header from '@/src/components/layout/Header';
import ConversationList from '@/src/features/conversation/ConversationList';
import RepositoryFrom from '@/src/features/repository/RepositoryForm';
import { useNav } from '@/src/providers/NavContext';

export default function RepositoryAddPage() {
  const { isOpen } = useNav();
  return (
    <div className="flex h-screen flex-col">
      {!isOpen && <Header />}
      <section className="flex flex-1 items-center justify-center">
        {isOpen && <ConversationList />}
        <div
          className={`bg-bg-navbar mx-10 flex w-[80%] flex-col items-center gap-4 rounded-xl p-1 px-6 py-8 shadow select-none md:w-100 ${isOpen ? 'pointer-events-none blur-sm' : ''}`}
        >
          <RepositoryFrom />
        </div>
      </section>
    </div>
  );
}
