import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';

import {environment} from '../../environments/environment';

import * as fromUi from './ui/ui.reducer';
import * as fromMovie from './movie/movie.reducer';
import {MovieState} from '../interfaces/data/movie-state';

export interface AppState {
  ui: fromUi.UiState;
  movie: MovieState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  movie: fromMovie.movieReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
