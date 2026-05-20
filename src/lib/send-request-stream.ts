/* eslint-disable @typescript-eslint/no-explicit-any */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface Payload {
  [key: string]: any;
}

export async function sendRequestStream(
  endpoint: string,
  method: HttpMethod = 'POST',
  payload: Payload | null = null,
  onChunk: (chunk: string) => void,
  onDone: (data: any) => void
): Promise<void> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${BACKEND_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: payload ? JSON.stringify(payload) : undefined,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Bad Request');
  }

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) throw new Error('No response body');

  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (line.startsWith('event: done')) continue;

      if (line.startsWith('data:')) {
        const data = line.slice(5).trim();
        try {
          const parsed = JSON.parse(data);
          if (parsed?.id) {
            onDone(parsed);
          } else {
            onChunk(parsed);
          }
        } catch {
          onChunk(data);
        }
      }
    }
  }
}
