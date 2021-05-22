import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as movieActions from './movie.actions';
import { MovieData } from '../../interfaces/data/movie-data';
import { of } from 'rxjs';
import {SearchData} from '../../interfaces/data/search.data';

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

  getMovieBySearchTerm = createEffect(() => {
    return this.actions$.pipe(
      ofType(movieActions.GET_MOVIE_BY_SEARCH_TERM),
      switchMap((data: movieActions.GetMovieBySearchTerm) => {
        let searchUrl: string;
        if (typeof data.payload === 'string'){
          searchUrl = `https://yts.mx/api/v2/list_movies.json?query_term=${data.payload}`;
        }
        else{
          searchUrl = `https://yts.mx/api/v2/list_movies.json?`;
          const searchObj: SearchData = data.payload;
          for (const item in searchObj){
            if (searchObj[item] !== null){
              const appendStr = `&${item}=${searchObj[item]}`;
              searchUrl = searchUrl.concat(appendStr);
            }
          }
          console.log('url is: ', searchUrl);
        }
        return this.http.get<MovieData[]>(
          searchUrl
        ).pipe(
          map( searchData => {
            console.log('search Data: ', searchData);
            return new movieActions.GetMovieBySearchTermComplete(searchData);
          }),
          catchError(() => {
            return of(new movieActions.GetMovieBySearchTermFailed());
          })
        );
      })
    );
  });

  /*getMovieBySearchObj = createEffect(() => {
    return this.actions$.pipe(
      ofType(movieActions.GET_MOVIE_BY_SEARCH_OBJECT),
      switchMap((data: movieActions.GetMovieBySearchObject) => {
        let searchUrl = 'https://yts.mx/api/v2/list_movies.json?';
        const searchObj = data.payload;
        for (const item in searchObj){
          if (searchObj[item] !== null){
            const appendStr = `&${item}=${searchObj[item]}`;
            searchUrl = searchUrl.concat(appendStr);
          }
        }
        return this.http.get<MovieData[]>(
          searchUrl
        ).pipe(
          map(res => {
            return new movieActions.GetMovieBySearchObjectComplete(res);
          }),
          catchError(() => {
            return of(new movieActions.GetMovieBySearchObjectFailed());
          })
        );
      })
    );
  });*/
}

