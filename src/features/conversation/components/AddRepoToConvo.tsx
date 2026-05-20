'use client';

import { useState } from 'react';

type Repository = {
  id: number;
  name: string;
  status: string;
};

type AddRepoToConvoProps = {
  selectedRepos: Repository[];
  availableRepos: Repository[];
  onAdd: (repo: Repository) => void;
  onRemove: (id: number) => void;
};

export default function AddRepoToConvo({
  selectedRepos,
  availableRepos,
  onAdd,
  onRemove,
}: AddRepoToConvoProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative flex flex-wrap gap-2">
      {selectedRepos.map((repo) => (
        <span
          onClick={() => onRemove(repo.id)}
          key={repo.id}
          className="group bg-bg-navbar flex items-center gap-1 rounded-full px-3 py-1 text-sm select-none"
        >
          {repo.name}
          <div className="text-gray-400 transition-colors group-hover:text-gray-600">
            ×
          </div>
        </span>
      ))}

      {availableRepos.length > 0 && (
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="bg-bg-navbar rounded-full px-3 py-1 text-sm text-gray-500 hover:bg-gray-200"
        >
          + Add repo
        </button>
      )}

      {showDropdown && (
        <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-lg bg-white shadow-lg">
          {availableRepos.map((repo) => (
            <button
              key={repo.id}
              onClick={() => {
                onAdd(repo);
                setShowDropdown(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
            >
              {repo.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
