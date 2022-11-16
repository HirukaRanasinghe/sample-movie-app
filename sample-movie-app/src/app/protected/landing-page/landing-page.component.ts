import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import {Observable, Subscription} from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointModel} from '../../interfaces/ui/breakpoint.model';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {MovieData} from '../../interfaces/data/movie-data';
import {PageEvent} from '@angular/material/paginator';
import * as movieActions from '../../store/movie/movie.actions';
import {MatDialog} from '@angular/material/dialog';
import {AdvancedSearchComponent} from '../advanced-search/advanced-search.component';
import {SearchData} from '../../interfaces/data/search.data';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  uiBreakpoint$: Observable<BreakpointModel>;
  searchForm: UntypedFormGroup;
  showStatus: boolean;
  showErr: boolean;
  isLoad = false;
  isShowFilters = false;

  isLoading$: Observable<boolean>;
  movieList$: Observable<MovieData[]>;
  movieList: MovieData[];
  movieSubs: Subscription;
  searchDataFromDialog: SearchData;
  pageEvent: PageEvent;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router, private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdvancedSearchComponent, {disableClose: true});

    /*dialogRef.afterClosed().subscribe((result: SearchData) => {
      this.searchDataFromDialog = result;
      console.log(result);
    });*/
  }

  ngOnInit(): void {
    this.isHandset$ = this.store.select('ui', 'isHandset');
    this.uiBreakpoint$ = this.store.select('ui', 'uiBreakpoint');

    this.searchForm = new UntypedFormGroup({
      search: new UntypedFormControl(null, []),
    });

    this.showErr = false;
    this.showStatus = true;

    /*this.activatedRoute.paramMap.subscribe(params => {
      console.log('Landing page params', params);
      if (params['params']['searchTerm'] != null){
        console.log(params);
        this.store.dispatch(new movieActions.GetMovieBySearchTerm(params['params']['searchTerm']));
      }
    });*/
    // this.store.dispatch(new movieActions.GetAllMovies());
    this.isLoading$ = this.store.select('movie', 'isLoading');

    this.movieList$ = this.store.select('movie', 'movieList');
    this.movieSubs = this.store.select('movie', 'movieList').subscribe((movieList: MovieData[]) => {

      if (movieList != null){
        this.movieList = movieList;
        this.isLoad = true;
        console.log(movieList['data']['movie_count']);
        if (movieList['data']['movie_count'] === 0){
          this.showErr = true;
          this.showStatus = false;
        }
        else {
          this.showErr = false;
          this.showStatus = false;
        }
      }
    });
  }

  onSearch(): void{
    if (this.searchForm.get('search').value !== null){
      console.log(this.searchForm.get('search').value);
      // this.router.navigate([`search-page/${this.searchForm.get('search').value}`]);
      this.store.dispatch( new movieActions.GetMovieBySearchTerm(this.searchForm.get('search').value));
    }
    else {
      this.showErr = true;
      this.showStatus = false;
    }
  }

  ngOnDestroy(): void {
    this.movieSubs.unsubscribe();
  }
}
