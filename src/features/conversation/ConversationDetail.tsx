'use client';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { getConversation } from '@/src/lib/api/conversation';
import { createMessage } from '@/src/lib/api/message';

interface Message {
  id: number;
  conversation_id: number;
  role: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Conversation {
  id: number;
  title: string;
  user_id: number;
  repositories: Repository[];
  messages: Message[];
  created_at: string;
  updated_at: string;
}

type Repository = {
  id: number;
  name: string;
  status: string;
};

export default function ConversationDetail() {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const MAX_HEIGHT = 400;

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
    if (!content || loading || !conversation) return;

    setError(null);
    setLoadingButton(true);

    if (ref.current) ref.current.value = '';

    const optimisticMessage: Message = {
      id: Date.now(),
      conversation_id: conversation.id,
      role: 'user',
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const streamingId = Date.now() + 1;
    const streamingMessage: Message = {
      id: streamingId,
      conversation_id: conversation.id,
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setConversation((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, optimisticMessage, streamingMessage],
          }
        : prev
    );

    try {
      await createMessage(
        conversation.id,
        { content },
        (chunk) => {
          setConversation((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              messages: prev.messages.map((m) =>
                m.id === streamingId ? { ...m, content: m.content + chunk } : m
              ),
            };
          });
        },
        (completed) => {
          setConversation((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              messages: prev.messages.map((m) =>
                m.id === streamingId ? completed : m
              ),
            };
          });
          setLoadingButton(false);
        }
      );
    } catch {
      setError('Something went wrong, please try again.');
      setLoadingButton(false);
    }
  };

  const { id } = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchConversation = async () => {
      try {
        const data = await getConversation(Number(id));
        console.log(data);
        setConversation(data);
      } catch {
        setError('Failed to Load Conversation');
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [id]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [conversation?.messages]);

  if (loading)
    return (
      <div className="ml-2 flex w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
      </div>
    );

  if (error)
    return (
      <div className="ml-2 flex w-full items-center justify-center text-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  if (!conversation) return null;

  return (
    <section className="flex w-full flex-col">
      <div className="flex-1 overflow-y-auto p-6 pb-48">
        <div className="flex w-full flex-col gap-6 px-6 pt-16">
          {conversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'user' ? (
                <div className="max-w-[90%] rounded-2xl bg-gray-300 px-4 py-2 text-gray-800 md:max-w-[50%]">
                  {message.content}
                </div>
              ) : (
                <div className="max-w-[90%] rounded-2xl bg-[#b0b0b0] px-6 py-4 wrap-break-word text-gray-800">
                  <ReactMarkdown
                    components={{
                      pre: ({ children }) => (
                        <pre className="my-2 overflow-x-auto bg-[#989696] p-2 text-sm text-black">
                          {children}
                        </pre>
                      ),
                      code: ({ children }) => (
                        <code className="break-all whitespace-pre-wrap">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="fixed right-0 bottom-0 left-0 mx-auto max-w-4xl p-4">
        <div className="bg-bg-navbar flex w-full flex-col rounded-lg px-4 py-3 shadow">
          <div className="flex items-end">
            <textarea
              ref={ref}
              onInput={handleInput}
              disabled={loadingButton}
              className="w-full resize-none overflow-hidden border-none bg-transparent text-inherit outline-none"
              placeholder="Send another message..."
            />
            {!loadingButton ? (
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
        </div>
      </div>
    </section>
  );
}
