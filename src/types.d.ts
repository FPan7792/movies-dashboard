type APIResponse_Popular = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type APIResponse_Genre = { genre: { id: number; name: string }[] };

type Genre = { id: number; name: string };

type APIResponse = APIResponse_Genre | APIResponse_Popular;

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type Movie_LocalStorage = { movie: string; id: number };
