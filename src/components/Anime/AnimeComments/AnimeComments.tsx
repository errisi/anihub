/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Comment } from '../../../types/Comment';
import styles from './AnimeComments.module.scss';
import { commentsService } from '../../../services/commentsService';
import { useAppSelector } from '../../../store/hooks';
import { notificationsService } from '../../../services/notificationsService';
import { AnimeDescription } from '../../../types/AnimeDescription';

type Props = {
  anime: AnimeDescription;
};

export const AnimeComments: FC<Props> = ({ anime }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentQuery, setCommentQuery] = useState('');
  const [commentRepledQuery, setCommentRepledQuery] = useState('');
  const [isCommentEditOpen, setIsCommentEditOpen] = useState(false);
  const [commentEditingQuery, setCommentEditingQuery] = useState('');
  const [commentForEditId, setCommentForEditId] = useState(0);
  const [commentForReplieId, setCommentForReplieId] = useState(0);

  const { user } = useAppSelector((state) => state.User);

  const fetch = async () => {
    await commentsService
      .get(anime.id)
      .then((data) => setComments(data as unknown as Comment[]));
  };

  useEffect(() => {
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anime]);

  const handleOnPost = async () => {
    if (user) {
      await commentsService.post(anime.id, user.id, commentQuery);

      setCommentQuery('');

      fetch();
    }
  };

  const handleOnRemove = async (id: number) => {
    await commentsService.remove(id);

    fetch();
  };

  const handleOnEdit = (id: number, content: string) => {
    if (isCommentEditOpen) {
      setIsCommentEditOpen(false);
      setCommentEditingQuery('');
      setCommentForEditId(0);

      return;
    }

    setIsCommentEditOpen((current) => !current);
    setCommentEditingQuery(content);
    setCommentForEditId(id);
  };

  const handlePostEditedComment = async (id: number) => {
    await commentsService.patch(id, commentEditingQuery);
    fetch();
    setCommentEditingQuery('');
    setIsCommentEditOpen(false);
    setCommentForEditId(0);
  };

  const handleOnRepliePost = async (commentId: number) => {
    if (user) {
      await commentsService.post(
        anime.id,
        user.id,
        commentRepledQuery,
        commentId,
      );

      setCommentRepledQuery('');

      fetch();

      const comment = comments.find((c) => c.comment.id === commentId);

      if (comment && comment.user.id !== user.id) {
        notificationsService.post(
          comment.user.id,
          `Вам пришел ответ на комментарий к аниме ${
            anime.russian
          } от пользователя ${user.name}:
        ${
  commentRepledQuery.length < 20
    ? commentRepledQuery
    : commentRepledQuery.split('').slice(0, 20).join('')
}...`,
        );
      }
    }
  };

  const handleRepliesOpen = (commentId: number) => {
    if (commentForReplieId) {
      setCommentForReplieId(0);
    } else {
      setCommentForReplieId(commentId);
    }
  };

  const isEdtableReplyComment = (comm: Comment) => {
    if (comm.user.id === user?.id && comm.comment.id === commentForEditId) {
      return true;
    }

    return false;
  };

  return (
    <>
      <h2 className={styles.title}>Комментарии</h2>

      {!!user && (
        <FormControl fullWidth>
          <OutlinedInput
            multiline
            id="outlined-adornment-password"
            value={commentQuery}
            onChange={(e) => setCommentQuery(e.target.value)}
            endAdornment={(
              <InputAdornment position="end">
                <Button
                  aria-label="toggle password visibility"
                  onClick={handleOnPost}
                >
                  <SendIcon color="primary" />
                </Button>
              </InputAdornment>
            )}
          />
        </FormControl>
      )}

      <div className={styles.comments}>
        {!comments.length && <p>Комментариев еще нет :(</p>}
        {[...comments]
          .reverse()
          .filter((c) => !c.comment.commentId)
          .map((c) => (
            <>
              <div className={styles.comments__item} key={c.comment.id}>
                <div className={styles.comments__item__content}>
                  <>
                    <img
                      src={c.user.avatar}
                      alt=""
                      className={styles.comments__item__content__user__avatar}
                    />

                    <div className={styles.comments__item__content__block}>
                      <p className={styles.comments__item__content__user__name}>
                        {c.user.name}
                      </p>
                      {c.comment.id !== commentForEditId && (
                        <p className={styles.comments__item__content__text}>
                          {c.comment.content}
                        </p>
                      )}

                      {c.user.id === user?.id
                        && c.comment.id === commentForEditId && (
                        <FormControl
                          fullWidth
                          className={styles.comments__item__query}
                        >
                          <OutlinedInput
                            fullWidth
                            multiline
                            id="outlined-adornment-password"
                            value={commentEditingQuery}
                            onChange={(e) => setCommentEditingQuery(e.target.value)}
                            endAdornment={(
                              <InputAdornment position="end">
                                <Button
                                  aria-label="toggle password visibility"
                                  onClick={() => {
                                    handlePostEditedComment(c.comment.id);
                                  }}
                                >
                                  <SendIcon color="primary" />
                                </Button>
                              </InputAdornment>
                            )}
                          />
                        </FormControl>
                      )}
                    </div>
                  </>
                </div>

                <div className={styles.comments__item__actions}>
                  <Button
                    size="small"
                    onClick={() => handleRepliesOpen(c.comment.id)}
                  >
                    {commentForReplieId === c.comment.id
                      ? 'Закрыть'
                      : 'Ответить'}
                  </Button>
                  {c.user.id === user?.id && (
                    <>
                      <IconButton
                        onClick={() => {
                          handleOnEdit(c.comment.id, c.comment.content);
                        }}
                      >
                        {isCommentEditOpen ? (
                          <CloseRoundedIcon />
                        ) : (
                          <EditRoundedIcon />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => handleOnRemove(c.comment.id)}
                        aria-label="toggle password visibility"
                      >
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    </>
                  )}
                </div>

                {commentForReplieId === c.comment.id && (
                  <div className={styles.replies}>
                    <hr className={styles.line} />
                    {!![...comments]
                      .reverse()
                      .filter((comm) => comm.comment.commentId === c.comment.id)
                      .length && (
                      <>
                        {[...comments]
                          .filter(
                            (comm) => comm.comment.commentId === c.comment.id,
                          )
                          .map((comm) => (
                            <>
                              <div
                                className={styles.replies__item}
                                key={comm.comment.id}
                              >
                                <div className={styles.comments__item__content}>
                                  <>
                                    <img
                                      src={comm.user.avatar}
                                      alt=""
                                      className={
                                        styles.comments__item__content__user__avatar
                                      }
                                    />

                                    <div
                                      className={
                                        styles.comments__item__content__block
                                      }
                                    >
                                      <p
                                        className={
                                          styles.comments__item__content__user__name
                                        }
                                      >
                                        {comm.user.name}
                                      </p>
                                      {comm.comment.id !== commentForEditId && (
                                        <p
                                          className={
                                            styles.comments__item__content__text
                                          }
                                        >
                                          {comm.comment.content}
                                        </p>
                                      )}

                                      {isEdtableReplyComment(comm) && (
                                        <FormControl
                                          fullWidth
                                          className={
                                            styles.comments__item__query
                                          }
                                        >
                                          <OutlinedInput
                                            fullWidth
                                            multiline
                                            id="outlined-adornment-password"
                                            value={commentEditingQuery}
                                            onChange={(e) => setCommentEditingQuery(
                                              e.target.value,
                                            )}
                                            endAdornment={(
                                              <InputAdornment position="end">
                                                <Button
                                                  aria-label="toggle password visibility"
                                                  onClick={() => {
                                                    handlePostEditedComment(
                                                      comm.comment.id,
                                                    );
                                                  }}
                                                >
                                                  <SendIcon color="primary" />
                                                </Button>
                                              </InputAdornment>
                                            )}
                                          />
                                        </FormControl>
                                      )}
                                    </div>
                                  </>
                                </div>

                                <div className={styles.comments__item__actions}>
                                  {comm.user.id === user?.id && (
                                    <>
                                      <IconButton
                                        onClick={() => {
                                          handleOnEdit(
                                            comm.comment.id,
                                            comm.comment.content,
                                          );
                                        }}
                                      >
                                        {isCommentEditOpen ? (
                                          <CloseRoundedIcon />
                                        ) : (
                                          <EditRoundedIcon />
                                        )}
                                      </IconButton>
                                      <IconButton
                                        onClick={() => handleOnRemove(comm.comment.id)}
                                        aria-label="toggle password visibility"
                                      >
                                        <DeleteForeverRoundedIcon />
                                      </IconButton>
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          ))}
                      </>
                    )}
                    <FormControl fullWidth>
                      <OutlinedInput
                        fullWidth
                        multiline
                        id="outlined-adornment-password"
                        value={commentRepledQuery}
                        onChange={(e) => setCommentRepledQuery(e.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            <Button
                              aria-label="toggle password visibility"
                              onClick={() => handleOnRepliePost(c.comment.id)}
                            >
                              <SendIcon color="primary" />
                            </Button>
                          </InputAdornment>
                        )}
                      />
                    </FormControl>
                  </div>
                )}
              </div>
            </>
          ))}
      </div>
    </>
  );
};
