'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormField from '@/src/components/form/FormField';
import FormSubmit from '@/src/components/form/FormSubmit';
import { createRepository } from '@/src/lib/api/repository';

export default function RepositoryFrom() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    github_url: '',
    branch: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.name || !formData.github_url || !formData.branch) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const data = await createRepository({
        name: formData.name,
        github_url: formData.github_url,
        branch: formData.branch,
      });
      router.push('/projects');
    } catch {
      setError('Error - Please try again');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-center text-xl">Upload GitHub Repo for Context</h2>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-4"
      >
        <FormField
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="project name"
        />
        <FormField
          label="GitHub URL"
          name="github_url"
          type="text"
          value={formData.github_url}
          onChange={handleChange}
          placeholder="https://github.com/user/project"
        />
        <FormField
          label="Branch"
          name="branch"
          type="text"
          value={formData.branch}
          onChange={handleChange}
          placeholder="main"
        />
        <FormSubmit label="Upload" loading={isLoading} error={error} />
      </form>
    </>
  );
}
