'use client';
import { useParams } from 'next/navigation';

export default function ConversationDetail() {
  const { id } = useParams();

  return (
    <main className="flex-1 p-4">
      <div>{id}</div>
    </main>
  );
}
