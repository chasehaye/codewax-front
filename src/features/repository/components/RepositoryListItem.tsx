'use client';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

import { getRepository } from '@/src/lib/api/repository';
import { deleteRepository } from '@/src/lib/api/repository';

type RepositoryListItemProps = {
  repository: {
    id: number;
    name: string;
    github_url: string;
    branch: string;
    status: string;
    created_at: string;
  };
  onDelete: (id: number) => void;
};

const statusIcon: Record<string, React.ReactNode> = {
  processing: (
    <div className="group relative shrink-0">
      <div>
        <svg
          className="size-4 animate-spin text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill="currentColor"
            d="M12 2
         A10 10 0 0 1 22 12
         L18 12
         A6 6 0 0 0 12 6
         Z
         M22 12
         A10 10 0 0 1 12 22
         L12 18
         A6 6 0 0 0 18 12
         Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Processing
      </div>
    </div>
  ),
  failed: (
    <div className="group relative shrink-0">
      <div className="text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Upload failed
      </div>
    </div>
  ),
  ready: (
    <div className="group relative shrink-0">
      <div className="text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Ready
      </div>
    </div>
  ),
  budget_exceeded: (
    <div className="group relative shrink-0">
      <div className="text-orange-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Application Budget Exceeded
      </div>
    </div>
  ),
  pending: (
    <div className="group relative shrink-0">
      <div className="text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Pending
      </div>
    </div>
  ),
};

export default function RepositoryListItem({
  repository: initialRepository,
  onDelete,
}: RepositoryListItemProps) {
  const [repository, setRepository] = useState(initialRepository);

  useEffect(() => {
    const active = ['pending', 'processing'];
    if (!active.includes(repository.status)) return;

    const terminal = ['ready', 'failed', 'budget_exceeded'];

    const interval = setInterval(async () => {
      try {
        const updatedRepository = await getRepository(repository.id);
        setRepository(updatedRepository);
        if (terminal.includes(updatedRepository.status)) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [repository.status, repository.id]);

  const handleDelete = async () => {
    try {
      await deleteRepository(repository.id);
      onDelete(repository.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="bg-bg-navbar flex flex-col gap-2 rounded-2xl p-4 shadow">
      <div className="flex justify-between gap-4">
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <span className="block overflow-hidden font-light whitespace-nowrap">
            {repository.name}
          </span>
          <div className="from-bg-navbar absolute inset-y-0 right-0 w-8 bg-linear-to-l to-transparent" />
        </div>
        <span className="shrink-0">
          {formatDistanceToNow(new Date(repository.created_at), {
            addSuffix: true,
          }).replace('about ', '')}
        </span>
      </div>
      <div className="flex justify-between gap-4">
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <span className="block overflow-hidden whitespace-nowrap">
            {repository.branch}
          </span>
          <div className="from-bg-navbar absolute inset-y-0 right-0 w-8 bg-linear-to-l to-transparent" />
        </div>
        {statusIcon[repository.status] ?? repository.status}
      </div>
      <div className="flex justify-between gap-4">
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <span className="block overflow-hidden whitespace-nowrap">
            {repository.github_url}
          </span>
          <div className="from-bg-navbar absolute inset-y-0 right-0 w-8 bg-linear-to-l to-transparent" />
        </div>
        <button onClick={handleDelete} className="shrink-0 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
