'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { createConversation } from '@/src/lib/api/conversation';
import { createMessage } from '@/src/lib/api/message';

export default function NewConversation() {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const MAX_HEIGHT = 700;

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;

    el.style.height = 'auto';

    const nextHeight = el.scrollHeight;

    el.style.height =
      nextHeight > MAX_HEIGHT ? `${MAX_HEIGHT}px` : `${nextHeight}px`;

    el.style.overflowY = nextHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  };

  const handleSubmit = async () => {
    const content = ref.current?.value.trim();
    if (!content || loading) return;

    setError(null);
    setLoading(true);

    try {
      const conversation = await createConversation({});
      await createMessage(conversation.id, { content });
      router.push(`/c/${conversation.id}`);
    } catch {
      setError('Something went wrong, please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex flex-col justify-center">
      <h2 className="mx-auto mb-2 text-xl">Start a New Conversation!</h2>
      <div className="bg-bg-navbar flex w-40 items-end rounded-lg px-4 py-2 shadow md:w-140">
        <textarea
          ref={ref}
          onInput={handleInput}
          disabled={loading}
          className="w-full resize-none overflow-hidden border-none bg-transparent text-inherit outline-none"
          placeholder="Let's start with a question..."
        />

        {!loading ? (
          <button
            onClick={handleSubmit}
            className="ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        ) : (
          <div className="ml-2 flex h-10 w-10 items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          </div>
        )}
      </div>

      {error && <p className="mx-auto mt-2 text-sm text-red-500">{error}</p>}
    </main>
  );
}
