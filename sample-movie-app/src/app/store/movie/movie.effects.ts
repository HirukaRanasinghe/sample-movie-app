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

}
