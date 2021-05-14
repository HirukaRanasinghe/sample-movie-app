import * as movieActions from './movie.actions';
import { MovieState } from '../../interfaces/data/movie-state';

const initState: MovieState = {
  isLoading: false,
  movieList: null,
  selectedMovie: null
};

export function movieReducer( state = initState, action: movieActions.MovieActions): MovieState{
  switch (action.type){
    case movieActions.GET_ALL_MOVIE:
      return {
        ...state,
        isLoading: true
      };
    case movieActions.GET_ALL_MOVIE_COMPLETE:
      return {
        ...state,
        movieList: action.payload,
        isLoading: false
      };
    case movieActions.GET_ALL_MOVIE_FAILED:
      return {
        ...state,
        isLoading: false
      };
    case movieActions.GET_MOVIE_BY_ID:
      return {
        ...state,
        isLoading: true
      };
    case movieActions.GET_MOVIE_BY_ID_COMPLETE:
      return {
        ...state,
        isLoading: false,
        selectedMovie: action.payload
      };
    case movieActions.GET_MOVIE_BY_ID_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
