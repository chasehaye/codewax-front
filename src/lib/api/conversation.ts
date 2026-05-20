import sendRequest from '../send-request';

const BASE_URL = '/api';

interface ConversationData {
  repository_ids?: number[];
}

export function createConversation(conversationData: ConversationData) {
  return sendRequest(`${BASE_URL}/conversations`, 'POST', conversationData);
}

export function listConversations() {
  return sendRequest(`${BASE_URL}/conversations`, 'GET');
}
