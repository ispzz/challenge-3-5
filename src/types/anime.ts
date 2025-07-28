export type AnimeTitle = {
  romaji: string;
  english: string;
  native: string;
};

export type AnimeCoverImage = {
  large: string;
  medium: string;
};

export type Anime = {
  id: number;
  title: AnimeTitle;
  description: string;
  coverImage: AnimeCoverImage;
  bannerImage: string;
  averageScore: number;
  episodes: number;
  status: string;
  format: string;
  genres: string[];
  season: string;
  seasonYear: number;
};
