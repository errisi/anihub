import { User } from './User';

export interface Comment {
  comment: {
    id: number;
    animeId: number;
    ownerId: number;
    commentId: number | null;
    repliedCommentId: number | null;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
  user: User;
}
