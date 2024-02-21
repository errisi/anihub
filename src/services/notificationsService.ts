import { apiClient } from '../http/apiClient';
// eslint-disable-next-line import/no-cycle

async function get(userId: number) {
  return apiClient.get(`/notifications/${userId}`);
}

async function post(userId: number, content: string) {
  return apiClient.post(`/notifications/${userId}`, {
    content,
  });
}

async function refresh(userId: number) {
  return apiClient.patch(`/notifications/${userId}`);
}

export const notificationsService = {
  get,
  post,
  refresh,
};
