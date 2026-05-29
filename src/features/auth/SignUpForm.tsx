'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormField from '@/src/components/form/FormField';
import FormSubmit from '@/src/components/form/FormSubmit';
import { signUp } from '@/src/lib/api/auth';
import { useUser } from '@/src/providers/UserContext';

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
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
    if (e.target.name === 'password') setPasswordError('');
    if (e.target.name === 'confirmPassword') setConfirmPasswordError('');
    setError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    const passwordIssue = handleInsufficientPassword(formData.password);
    if (passwordIssue) {
      setPasswordError(passwordIssue);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const data = await signUp({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      console.log(data)
      setUser(data);
      console.log("before push")
      router.push('/c');
      console.log("after push")
    } catch (err) {
      setError('Something went wrong, please try again');
      console.error('Sign in failed:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-xl">Sign Up</h2>
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
          label="Username - Optional"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={passwordError}
        />
        <FormField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={confirmPasswordError}
        />
        <FormSubmit label="Sign Up" loading={isLoading} error={error} />
      </form>
    </>
  );
}
