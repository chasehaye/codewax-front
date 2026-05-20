'use client';

import { useEffect, useState } from 'react';

import { listRepositories } from '@/src/lib/api/repository';

import RepositoryListItem from './components/RepositoryListItem';

type Repository = {
  id: number;
  name: string;
  github_url: string;
  branch: string;
  status: string;
  created_at: string;
};

export default function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await listRepositories();
        setRepositories(response);
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepositories();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto mt-20 mb-40 w-[80%] md:w-[60%]">
        Loading repositories...
      </section>
    );
  }

  return (
    <section className="mx-auto mt-10 mb-40 w-[90%] space-y-4 md:w-[80%]">
      <ul
        className={`grid w-full gap-4 ${repositories.length === 1 ? 'grid-cols-1' : repositories.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
      >
        {repositories.map((repository) => (
          <RepositoryListItem
            key={repository.id}
            repository={repository}
            onDelete={(id) =>
              setRepositories((prev) => prev.filter((r) => r.id !== id))
            }
          />
        ))}
      </ul>
    </section>
  );
}
