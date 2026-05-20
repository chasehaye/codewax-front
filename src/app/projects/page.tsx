'use client';
import Link from 'next/link';

import Header from '@/src/components/layout/Header';
import RepositoryList from '@/src/features/repository/RepositoryList';

export default function ProjectsPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="mt-4 flex justify-center">
        <Link
          href="/projects/add"
          className="bg-bg-navbar mt-2 inline-flex w-60 rounded-xl shadow hover:bg-gray-100"
        >
          <span className="mx-auto">Add a repository +</span>
        </Link>
      </div>
      <RepositoryList />
    </div>
  );
}
