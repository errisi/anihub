/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from './index';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

export const httpClient = createClient();

function onRequest(request: any) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    // eslint-disable-next-line @typescript-eslint/dot-notation, no-param-reassign
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request;
}

function onResponseSuccess(res: any) {
  return res.data;
}

async function onResponseError(error: any) {
  const originalRequest = error.config;

  if (error.response.status !== 401) {
    throw error;
  }

  // eslint-disable-next-line no-useless-catch
  try {
    const { accessToken } = (await authService.refresh()).data;

    accessTokenService.save(accessToken);

    return await httpClient.request(originalRequest);
  } catch (curentError) {
    throw curentError;
  }
}

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);
