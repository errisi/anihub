import { createClient } from './index';

export const notificationsClient = createClient();

notificationsClient.interceptors.response.use((res) => res.data);
