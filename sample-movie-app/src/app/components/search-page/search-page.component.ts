import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MovieData} from '../../interfaces/data/movie-data';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as movieActions from '../../store/movie/movie.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {BreakpointModel} from '../../interfaces/ui/breakpoint.model';
import { PaginationComponent } from '../pagination/pagination.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchForm: FormGroup;
  showStatus: boolean;
  showErr: boolean;
  isLoad = false;
  isHandset$: Observable<boolean>;
  uiBreakpoint$: Observable<BreakpointModel>;

  isLoading$: Observable<boolean>;
  movieList$: Observable<MovieData[]>;
  movieList: MovieData[];
  movieSubs: Subscription;

  pageEvent: PageEvent;

  constructor( private store: Store<fromApp.AppState>, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isHandset$ = this.store.select('ui', 'isHandset');
    this.uiBreakpoint$ = this.store.select('ui', 'uiBreakpoint');
    this.searchForm = new FormGroup({
        search: new FormControl(null, []),
    });
    this.showErr = false;
    this.showStatus = true;

    this.activatedRoute.paramMap.subscribe(params => {
      if (params['params']['searchTerm'] != null){
        console.log(params);
        this.store.dispatch(new movieActions.GetMovieBySearchTerm(params['params']['searchTerm']));
      }
    });
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
      this.router.navigate([`search-page/${this.searchForm.get('search').value}`]);
      this.store.dispatch( new movieActions.GetMovieBySearchTerm(this.searchForm.get('search').value));
      console.log(this.movieList);
      /*this.isLoading$ = this.store.select('movie', 'isLoading');

      this.movieList$ = this.store.select('movie', 'movieList');
      this.movieSubs = this.store.select('movie', 'movieList').subscribe((movieList: MovieData[]) => {
        if (movieList != null){
          this.movieList = movieList;
          this.isLoad = true;
          console.log(movieList['data']['movies']);
        }
      });*/

    }
    else {
      this.showErr = true;
      this.showStatus = false;
    }
  }

  onPageChange($event): void{
    this.pageEvent = $event;
    let searchTerm = '';
    const pageNo = this.pageEvent.pageIndex + 1;
    console.log(this.searchForm.value);

    this.activatedRoute.paramMap.subscribe(params => {
      if (params['params']['searchTerm'] != null){
        searchTerm = params['params']['searchTerm'];
        this.store.dispatch(new movieActions.GetMovieBySearchTerm(`${searchTerm}&page=${pageNo}`));
      }
    });
  }
}
