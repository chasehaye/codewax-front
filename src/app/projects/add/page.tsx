'use client';
import Header from '@/src/components/layout/Header';
import RepositoryFrom from '@/src/features/repository/RepositoryForm';

export default function RepositoryAddPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <section className="flex flex-1 items-center justify-center">
        <div className="bg-bg-navbar mx-10 flex w-[80%] flex-col items-center gap-4 rounded-xl p-1 px-2 px-6 py-8 shadow select-none md:w-100">
          <RepositoryFrom />
        </div>
      </section>
    </div>
  );
}
