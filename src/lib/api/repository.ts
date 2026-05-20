import sendRequest from '../send-request';

const BASE_URL = '/api/repositories';

interface RepositoryData {
  [key: string]: string;
}

export function createRepository(repositoryData: RepositoryData) {
  return sendRequest(`${BASE_URL}`, 'POST', repositoryData);
}

export function listRepositories() {
  return sendRequest(`${BASE_URL}`, 'GET');
}

export function getRepository(id: number) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET');
}

export function deleteRepository(id: number) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
