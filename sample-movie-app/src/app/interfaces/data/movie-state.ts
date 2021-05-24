import { MovieData} from './movie-data';

export interface MovieState {
  isLoading: boolean;
  movieList: MovieData[];
  selectedMovie: MovieData;
  nextPage?: MovieData;
}
