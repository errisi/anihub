import { Anime } from './Anime';

export interface Calendar {
  next_episode: number;
  next_episode_at: string;
  duration: number | null;
  anime: Anime;
}
