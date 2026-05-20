import { sendRequestStream } from '../send-request-stream';

const BASE_URL = '/api/conversations';

interface MessageData {
  content: string;
}

export function createMessage(
  conversationId: number,
  messageData: MessageData,
  onChunk: (chunk: string) => void,
  onDone: (data: any) => void
) {
  return sendRequestStream(
    `${BASE_URL}/${conversationId}/messages`,
    'POST',
    messageData,
    onChunk,
    onDone
  );
}
