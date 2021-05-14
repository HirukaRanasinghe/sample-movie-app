import {Action} from '@ngrx/store';
import {BreakpointModel} from '../../interfaces/ui/breakpoint.model';

export const UPDATE_BREAKPOINT = '[Ui] Update Breakpoint';
export const UPDATE_HANDSET = '[Ui] Update Handset';

export class UpdateBreakpoint implements Action {
  readonly type = UPDATE_BREAKPOINT;
  constructor(
    public payload: BreakpointModel
  ) {}
}

export class UpdateHandset implements Action {
  readonly type = UPDATE_HANDSET;
  constructor(
    public payload: boolean
  ) {}
}

export type UiActions =
  | UpdateBreakpoint
  | UpdateHandset;
