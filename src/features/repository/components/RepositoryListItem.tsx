'use client';

type RepositoryListItemProps = {
  repository: {
    id: number;
    name: string;
    github_url: string;
    branch: string;
    status: string;
    created_at: string;
  };
};

export default function RepositoryListItem({
  repository,
}: RepositoryListItemProps) {
  return (
    <ul className="max-cols-3 grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-4">
      <li className="bg-bg-navbar flex flex-col gap-2 rounded-2xl p-4 shadow">
        <div className="flex justify-between gap-4">
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <span className="block overflow-hidden whitespace-nowrap">
              {repository.name}
            </span>
            <div className="from-bg-navbar absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent" />
          </div>
          <div></div>
          <span className="shrink-0">{repository.created_at}</span>
        </div>
        <div className="flex justify-between gap-4">
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <span className="block overflow-hidden whitespace-nowrap">
              {repository.branch}
            </span>
            <div className="from-bg-navbar absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent" />
          </div>
          <div></div>
          <span className="shrink-0">{repository.status}</span>
        </div>
        <div className="relative overflow-hidden">
          <span className="block overflow-hidden whitespace-nowrap">
            {repository.github_url}
          </span>
          <div className="from-bg-navbar absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent" />
        </div>
      </li>
    </ul>
  );
}
