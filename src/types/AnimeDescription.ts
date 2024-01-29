export interface AnimeDescription {
  id: number;
  name: string;
  russian: string;
  image: {
    original: string;
    preview: string;
    x96: string;
    x48: string;
  };
  url: string;
  kind: string;
  score: string | null;
  status: string | null;
  episodes: number | null;
  episodes_aired: number | null;
  aired_on: string | null;
  released_on: string | null;
  rating: string | null;
  english: string[] | null;
  japanese: string[] | null;
  synonyms: string[] | null;
  license_name_ru: string | null;
  duration: number | null;
  description: string | null;
  description_html: string | null;
  description_source: string | null;
  franchise: string | null;
  favoured: boolean;
  anons: boolean;
  ongoing: boolean;
  thread_id: number | null;
  topic_id: number | null;
  myanimelist_id: number | null;
  rates_scores_stats: { name: number; value: number }[] | null;
  rates_statuses_stats: { name: string; value: number }[] | null;
  updated_at: string | null;
  next_episode_at: string | null;
  fansubbers: string[] | null;
  fandubbers: string[] | null;
  licensors: string[] | null;
  genres:
  | {
    id: number;
    name: string;
    russian: string;
    kind: string;
    entry_type: string;
  }[]
  | null;
  studios:
  | {
    id: number;
    name: string;
    filtered_name: string;
    real: boolean;
    image: string;
  }[]
  | null;
  videos:
  | {
    id: number;
    url: string;
    image_url: string;
    player_url: string;
    name: string;
    kind: string;
    hosting: string;
  }[]
  | null;
  screenshots: { original: string; preview: string }[] | null;
  user_rate: number | null;
}
