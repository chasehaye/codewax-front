'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormField from '@/src/components/form/FormField';
import FormSubmit from '@/src/components/form/FormSubmit';
import { login } from '@/src/lib/api/auth';
import { useUser } from '@/src/providers/UserContext';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useUser();

  function handleInsufficientPassword(password: string) {
    const missing = [];

    if (password.length < 8) missing.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) missing.push('an uppercase letter');
    if (!/[a-z]/.test(password)) missing.push('a lowercase letter');
    if (!/\d/.test(password)) missing.push('a number');
    if (!/[@$!%*?&]/.test(password))
      missing.push('a special character (@$!%*?&)');

    if (missing.length === 0) return null;

    return missing.map((item) => `Missing: ${item}`).join(', ');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const data = await login({
        email: formData.email,
        password: formData.password,
      });
      setUser(data);
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-xl">Log in</h2>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-4"
      >
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@domain.com"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormSubmit label="Log in" loading={isLoading} error={error} />
      </form>
    </>
  );
}
