import { apiClient } from '../http/apiClient';

async function get(animeId: number) {
  return apiClient.get(`/comments/${animeId}`);
}

async function post(
  animeId: number,
  ownerId: number,
  content: string,
  commentId?: number,
  repliedCommentId?: number,
) {
  return apiClient.post(`/comments/${animeId}`, {
    ownerId,
    content,
    commentId,
    repliedCommentId,
  });
}

async function patch(id: number, content: string) {
  return apiClient.patch(`/comments/${id}`, {
    content,
  });
}

async function remove(id: number) {
  return apiClient.delete(`/comments/${id}`);
}

export const commentsService = {
  get,
  post,
  patch,
  remove,
};
