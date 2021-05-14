import * as uiActions from './ui.actions';
import {BreakpointModel} from '../../interfaces/ui/breakpoint.model';
import {DEFAULT_BREAKPOINTS} from '../../config/breakpoint.config';

export interface UiState {
  isHandset: boolean;
  uiBreakpoint: BreakpointModel;
}

const initState: UiState = {
  isHandset: true,
  uiBreakpoint: DEFAULT_BREAKPOINTS,
};

export function uiReducer(state = initState, action: uiActions.UiActions): UiState {
  switch (action.type) {
    case uiActions.UPDATE_BREAKPOINT:
      return {
        ...state,
        uiBreakpoint: action.payload
      };
    case uiActions.UPDATE_HANDSET:
      return {
        ...state,
        isHandset: action.payload
      };
    default:
      return state;
  }
}

