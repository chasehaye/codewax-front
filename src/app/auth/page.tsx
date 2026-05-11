'use client';
import { useState } from 'react';

import Header from '@/src/components/layout/Header';
import LoginForm from '@/src/features/auth/LoginForm';
import SignupForm from '@/src/features/auth/SignUpForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <section className="flex flex-1 items-center justify-center">
        <div className="bg-bg-navbar mx-10 flex w-[80%] flex-col items-center gap-4 rounded-xl p-1 px-2 px-6 py-8 shadow select-none md:w-100">
          {isLogin ? <LoginForm /> : <SignupForm />}

          <p className="text-gray-500">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-gray-800 underline hover:text-gray-500"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
