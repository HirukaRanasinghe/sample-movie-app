import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as movieActions from './movie.actions';
import { MovieData } from '../../interfaces/data/movie-data';
import { of } from 'rxjs';

@Injectable()

export class MovieEffects{
  constructor(
    private actions$: Actions,
    private http: HttpClient) {
  }

  getMovieList = createEffect(() => {
    console.log('Getting Movie Details in Effects: ');
    return this.actions$.pipe(
      ofType(movieActions.GET_ALL_MOVIE),
      switchMap((data: movieActions.GetAllMovies) => {
        return this.http.get<MovieData[]>(
          'https://yts.mx/api/v2/list_movies.json').
        pipe(
          map( res => {
            console.log('Get res: ', res);
            return new movieActions.GetAllMoviesComplete(res);
          }),
          catchError(() => {
            return of( new movieActions.GetAllMoviesFailed());
          })
        );
      })
    );
  });

  getMovieById = createEffect(() => {
    return this.actions$.pipe(
      ofType(movieActions.GET_MOVIE_BY_ID),
      switchMap( (data: movieActions.GetMovieById) => {
        return this.http.get<MovieData>(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${data.payload}`
        ).pipe(
          map( res => {
            console.log('single movie data: ');
            return new movieActions.GetMovieByIdComplete(res);
          }),
          catchError(() => {
            return of (new movieActions.GetMovieByIdFailed());
          })
        );
      })
    );
  });
}

