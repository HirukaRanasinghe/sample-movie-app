import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, UntypedFormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {MovieData} from '../../interfaces/data/movie-data';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as movieActions from '../../store/movie/movie.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {BreakpointModel} from '../../interfaces/ui/breakpoint.model';
import { PaginationComponent } from '../pagination/pagination.component';
import {PageEvent} from '@angular/material/paginator';
import {SearchData} from '../../interfaces/data/search.data';
import {map} from 'rxjs/operators';
import {ofType} from '@ngrx/effects';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  searchForm: UntypedFormGroup;
  showStatus: boolean;
  showErr: boolean;
  isLoad = false;
  isHandset$: Observable<boolean>;
  uiBreakpoint$: Observable<BreakpointModel>;

  isLoading$: Observable<boolean>;
  movieList$: Observable<MovieData[]>;
  movieList: MovieData[];
  movieSubs: Subscription;
  searchDataSubs: Subscription;
  searchData: string | SearchData;

  pageEvent: PageEvent;

  constructor( private store: Store<fromApp.AppState>) { }


  ngOnInit(): void {
    this.isHandset$ = this.store.select('ui', 'isHandset');
    this.uiBreakpoint$ = this.store.select('ui', 'uiBreakpoint');

    this.showErr = false;
    this.showStatus = true;

    this.isLoading$ = this.store.select('movie', 'isLoading');

    this.movieList$ = this.store.select('movie', 'movieList');

    this.movieSubs = this.store.select('movie', 'movieList').subscribe((movieList: MovieData[]) => {

      if (movieList != null){
        this.movieList = movieList;
        this.isLoad = true;
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

    this.searchDataSubs = this.store.select('movie', 'searchTerm').subscribe( value => {
      if (value != null){
        this.searchData = value;
      }
    });
  }
  onPgChange($event): void{
    this.pageEvent = $event;
    let searchTerm: SearchData;
    const pageNo = $event.pageIndex + 1;

    if (typeof( this.searchData) === 'string'){
      console.log(`${this.searchData}&page=${pageNo}`);
      this.store.dispatch(new movieActions.GetMovieBySearchTerm(`${this.searchData}&page=${pageNo}`));
    }
    else if (typeof(this.searchData) === 'object'){
      searchTerm = this.objToSearchPageData(this.searchData, pageNo);
      this.store.dispatch(new movieActions.GetMovieBySearchTerm(searchTerm));
    }
  }

  objToSearchPageData(data: SearchData, page: number): SearchData {
    return {
      query_term: data.query_term,
      page,
      genre: data.genre,
      minimum_rating: data.minimum_rating,
      order_by: data.order_by,
      sort_by: data.sort_by,
      quality: data.quality
    };
  }

  ngOnDestroy(): void {
    this.movieSubs.unsubscribe();
    this.searchDataSubs.unsubscribe();
  }

}
