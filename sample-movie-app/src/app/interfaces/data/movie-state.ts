import { MovieData} from './movie-data';
import {SearchData} from './search.data';

export interface MovieState {
  isLoading: boolean;
  movieList: MovieData[];
  selectedMovie: MovieData;
  searchTerm?: SearchData | string;
}
