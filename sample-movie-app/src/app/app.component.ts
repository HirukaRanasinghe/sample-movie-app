import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Store} from '@ngrx/store';

import * as breakpoints from './config/breakpoint.config';
import * as fromApp from './store/app.reducer';
import * as uiActions from './store/ui/ui.actions';
import {BreakpointModel} from './interfaces/ui/breakpoint.model';
import {DEFAULT_BREAKPOINTS} from './config/breakpoint.config';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  breakpointSubs: Subscription;

  title = 'YTS Desktop';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromApp.AppState>,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    // Angular CDK Based Breakpoints Calculation Start
    this.breakpointSubs = this.breakpointObserver.observe([
        ...breakpoints.breakpoints
      ]
    ).subscribe(res => {
      const observedBreakpoints: BreakpointModel = {...DEFAULT_BREAKPOINTS};
      Object.keys(res.breakpoints).map(
        (key): void => {
          if (String(key) === '(max-width: 599.98px) and (orientation: portrait)') {
            observedBreakpoints.handsetPortrait = res.breakpoints[key];
          }
          if (String(key) === '(max-width: 959.98px) and (orientation: landscape)') {
            observedBreakpoints.handsetLandscape = res.breakpoints[key];
          }
          if (String(key) === '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)') {
            observedBreakpoints.tabletPortrait = res.breakpoints[key];
          }
          if (String(key) === '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)') {
            observedBreakpoints.tabletLandscape = res.breakpoints[key];
          }
          if (String(key) === '(min-width: 840px) and (orientation: portrait)') {
            observedBreakpoints.webPortrait = res.breakpoints[key];
          }
          if (String(key) === '(min-width: 1280px) and (orientation: landscape)') {
            observedBreakpoints.webLandscape = res.breakpoints[key];
          }
        }
      );
      this.store.dispatch(new uiActions.UpdateBreakpoint(observedBreakpoints));
      // Make Handset 'true' for Mobile Landscape, Mobile Portrait And Tablet Portrait Modes | Change If Needed
      if (observedBreakpoints.handsetLandscape === true || observedBreakpoints.handsetPortrait || observedBreakpoints.tabletPortrait) {
        this.store.dispatch(new uiActions.UpdateHandset(true));
      } else {
        this.store.dispatch(new uiActions.UpdateHandset(false));
      }
    });
    // Angular CDK Breakpoints Calculation End
  }

  ngOnDestroy(): void {
    if (this.breakpointSubs) {
      this.breakpointSubs.unsubscribe();
    }
  }
}
