import {Breakpoints} from '@angular/cdk/layout';
import {BreakpointModel} from '../interfaces/ui/breakpoint.model';
import {UPDATE_BREAKPOINT} from '../store/ui/ui.actions';
/*
  Handset mode is activated (Set To True) only for the breakpoints include in the array
*/
export const breakpoints: string[] = [
  Breakpoints.HandsetPortrait,
  Breakpoints.HandsetLandscape,
  Breakpoints.TabletPortrait,
  Breakpoints.TabletLandscape,
  Breakpoints.WebPortrait,
  Breakpoints.WebLandscape
];

export const DEFAULT_BREAKPOINTS: BreakpointModel = {
  handsetPortrait: false,
  handsetLandscape: false,
  tabletPortrait: false,
  tabletLandscape: false,
  webPortrait: false,
  webLandscape: false,
};

/*
    Possible Break Points

    Breakpoints.XSmall
    Breakpoints.Small
    Breakpoints.Medium
    Breakpoints.Large
    Breakpoints.XLarge
    Breakpoints.Handset
    Breakpoints.Tablet
    Breakpoints.Web
    Breakpoints.HandsetPortrait
    Breakpoints.TabletPortrait
    Breakpoints.WebPortrait
    Breakpoints.HandsetLandscape
    Breakpoints.TabletLandscape
    Breakpoints.WebLandscape
*/
