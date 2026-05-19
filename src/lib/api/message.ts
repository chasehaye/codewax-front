import sendRequest from '../send-request';

const BASE_URL = '/api/conversations';

interface MessageData {
  [key: string]: string;
}

export function createMessage(
  conversationId: number,
  messageData: MessageData
) {
  return sendRequest(
    `${BASE_URL}/${conversationId}/messages`,
    'POST',
    messageData
  );
}
