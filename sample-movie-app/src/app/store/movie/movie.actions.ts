import { Action} from '@ngrx/store';
import { MovieData } from '../../interfaces/data/movie-data';

export const GET_ALL_MOVIE = '[movie] Get All Movie';
export const GET_ALL_MOVIE_COMPLETE = '[movie] Get All Movie Complete';
export const GET_ALL_MOVIE_FAILED = '[movie] Get All Movie Failed';

export const GET_MOVIE_BY_ID = '[movie] Get Movie By Id';
export const GET_MOVIE_BY_ID_COMPLETE = '[movie] Get Movie By Id Complete';
export const GET_MOVIE_BY_ID_FAILED = '[movie] Get Movie By Id Failed';

export const GET_MOVIE_BY_SEARCH_TERM = '[movie] Gel movie By Search Term';
export const GET_MOVIE_BY_SEARCH_TERM_COMPLETE = '[movie] Gel movie By Search Term Complete';
export const GET_MOVIE_BY_SEARCH_TERM_FAILED = '[movie] Gel movie By Search Term Failed';

export class GetAllMovies implements Action{
  readonly type = GET_ALL_MOVIE;
}

export class GetAllMoviesComplete implements Action{
  constructor(public payload: MovieData[]) {
  }

  readonly type = GET_ALL_MOVIE_COMPLETE;
}

export class GetAllMoviesFailed implements Action{
  readonly type = GET_ALL_MOVIE_FAILED;
}

export class GetMovieById implements Action{
  readonly type = GET_MOVIE_BY_ID;
  constructor(public payload: string) {
  }
}

export class GetMovieByIdComplete implements Action{
  constructor(public payload: MovieData) {
  }
  readonly type = GET_MOVIE_BY_ID_COMPLETE;
}

export class GetMovieByIdFailed implements Action{
  readonly type = GET_MOVIE_BY_ID_FAILED;
}

export class GetMovieBySearchTerm implements Action{
  constructor(public payload: string) {
  }
  readonly type = GET_MOVIE_BY_SEARCH_TERM;
}

export class GetMovieBySearchTermComplete implements Action{
  constructor(public payload: MovieData[]) {
  }
  readonly type = GET_MOVIE_BY_SEARCH_TERM_COMPLETE;
}

export class GetMovieBySearchTermFailed implements Action{
  readonly type = GET_MOVIE_BY_SEARCH_TERM_FAILED;
}

export type MovieActions =
  | GetAllMovies
  | GetAllMoviesComplete
  | GetAllMoviesFailed
  | GetMovieById
  | GetMovieByIdComplete
  | GetMovieByIdFailed
  | GetMovieBySearchTerm
  | GetMovieBySearchTermComplete
  | GetMovieBySearchTermFailed;

