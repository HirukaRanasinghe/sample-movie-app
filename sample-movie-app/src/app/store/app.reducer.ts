import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';

import {environment} from '../../environments/environment';

import * as fromUi from './ui/ui.reducer';

export interface AppState {
  ui: fromUi.UiState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
