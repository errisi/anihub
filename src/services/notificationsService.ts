import { notificationsClient } from '../http/notificationsClient';
// eslint-disable-next-line import/no-cycle

async function get(userId: number) {
  return notificationsClient.get(`/notifications/${userId}`);
}

async function refresh(userId: number) {
  return notificationsClient.patch(`/notifications/${userId}`);
}

export const notificationsService = {
  get,
  refresh,
};
