'use client';
import { useState } from 'react';

import Header from '@/src/components/layout/Header';

export default function GeneralPromptPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <section className="flex flex-1 items-center justify-center">
        Prompt single
      </section>
    </div>
  );
}
