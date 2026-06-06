'use client';

import { useState } from 'react';

import Header from '@/src/components/layout/Header';
import LoginForm from '@/src/features/auth/LoginForm';
import SignUpForm from '@/src/features/auth/SignUpForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-bg-navbar flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg">
          {isLogin ? <LoginForm /> : <SignUpForm />}
          <button onClick={() => setIsLogin(!isLogin)} className="pt-2 text-sm">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <span className="cursor-pointer underline">Sign up</span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span className="cursor-pointer underline">Log in</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
