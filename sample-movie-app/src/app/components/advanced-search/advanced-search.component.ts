import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { SearchData } from '../../interfaces/data/search.data';
import * as movieActions from '../../store/movie/movie.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MovieData} from '../../interfaces/data/movie-data';
import {PageEvent} from '@angular/material/paginator';
interface KeyVal {
  viewValue: string;
  value: string;
}
@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})


export class AdvancedSearchComponent implements OnInit {
  advancedSearchForm: FormGroup;
  queryTerm: string | null;
  page: number| null;
  qualities: string[] = ['All', '720p', '1080p', '2160p', '3D'];
  minRating: number | null;
  genres: KeyVal[] = [
    {viewValue: 'Action', value: 'action'},
    {viewValue: 'Adventure', value: 'adventure'},
    {viewValue: 'Animation', value: 'animation'},
    {viewValue: 'Biography', value: 'biography'},
    {viewValue: 'Comedy', value: 'comedy'},
    {viewValue: 'Crime', value: 'crime'},
    {viewValue: 'Documentary', value: 'documentary'},
    {viewValue: 'Drama', value: 'drama'},
    {viewValue: 'Family', value: 'family'},
    {viewValue: 'Fantasy', value: 'fantasy'},
    {viewValue: 'Film Noir', value: 'film noir'},
    {viewValue: 'History', value: 'history'},
    {viewValue: 'Horror', value: 'horror'},
    {viewValue: 'Music', value: 'music'},
    {viewValue: 'Musical', value: 'musical'},
    {viewValue: 'Mystery', value: 'mystery'},
    {viewValue: 'Romance', value: 'romance'},
    {viewValue: 'Sci-Fi', value: 'sci-fi'},
    {viewValue: 'Short Film', value: 'short film'},
    {viewValue: 'Sport', value: 'sport'},
    {viewValue: 'Superhero', value: 'superhero'},
    {viewValue: 'Thriller', value: 'thriller'},
    {viewValue: 'War', value: 'war'},
    {viewValue: 'Western', value: 'western'}
  ];
  sortBy: KeyVal[] = [
    {viewValue: 'Title' , value: 'title'},
    {viewValue: 'Year' , value: 'year'},
    {viewValue: 'Rating' , value: 'rating'},
    {viewValue: 'Peers' , value: 'peers'},
    {viewValue: 'Seeds' , value: 'seeds'},
    {viewValue: 'Download Count' , value: 'download_count'},
    {viewValue: 'Like Count' , value: 'like_count'},
    {viewValue: 'Date Added' , value: 'date_added'},
  ];
  orderBy: KeyVal[] = [
    {value: 'asc', viewValue: 'Ascending'},
    {value: 'desc', viewValue: 'Descending'}
    ];
  showStatus: boolean;
  showErr: boolean;
  isLoad = false;
  isLoading$: Observable<boolean>;
  movieList$: Observable<MovieData[]>;
  movieList: MovieData[];
  movieSubs: Subscription;

  pageEvent: PageEvent;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.showStatus = true;
    this.showErr = false;

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

    this.advancedSearchForm = new FormGroup({
      queryTermInput: new FormControl(
        null,
        []),
      qualityInput: new FormControl(
        null,
        []),
      minRatingInput: new FormControl(
        null,
        [Validators.min(0) , Validators.max(9)]),
      genreInput: new FormControl(
        null,
        []),
      sortBy: new FormControl(
        null,
        []),
      orderBy: new FormControl(
        null,
        [])

  });
  }

  onSubmit(): void{
    if (this.advancedSearchForm.valid){
      this.showErr = false;
      this.showStatus = false;

      const searchDataObj: SearchData = {
        query_term: null,
        page: null,
        quality: null,
        minimum_rating: null,
        genre: null,
        sort_by: null,
        order_by: null,
      };
      const searchVals: object = this.advancedSearchForm.value;

      for (const value in searchVals){
        if (searchVals[value] != null){
          switch (value){
            case 'queryTermInput':
              searchDataObj.query_term = searchVals[value];
              break;
            case 'qualityInput':
              searchDataObj.quality = searchVals[value];
              break;
            case 'minRatingInput':
              searchDataObj.minimum_rating = searchVals[value];
              break;
            case 'genreInput':
              searchDataObj.genre = searchVals[value];
              break;
            case 'sortBy':
              searchDataObj.sort_by = searchVals[value];
              break;
            case 'orderBy':
              searchDataObj.order_by = searchVals[value];
              break;
          }
        }
      }
      this.store.dispatch(new movieActions.GetMovieBySearchTerm(searchDataObj));
    }
  }

  onPageChange($event): void{
    this.pageEvent = $event;
    const pageNo = this.pageEvent.pageIndex + 1;
    console.log(pageNo);

    const searchVals: object = this.advancedSearchForm.value;

    const nxtPage: SearchData = this.convertToSearchDataObj(searchVals);
    nxtPage.page = pageNo;
    this.store.dispatch(new movieActions.GetMovieBySearchTerm(nxtPage));
    this.movieSubs = this.store.select('movie', 'movieList').subscribe((movieList: MovieData[]) => {

      if (movieList != null){
        this.movieList = movieList;
        this.isLoad = true;
        console.log(movieList['data']['movie_count']);
        if (movieList['data']['movie_count'] === 0){
          console.log('works');
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

  // Convert form values into a SearchData object
  convertToSearchDataObj(data: object): SearchData{
    const searchData: SearchData = {
      query_term: null,
      page: null,
      quality: null,
      minimum_rating: null,
      genre: null,
      sort_by: null,
      order_by: null,
    };
    for (const value in data){
      if (data[value] != null){
        switch (value){
          case 'queryTermInput':
            searchData.query_term = data[value];
            break;
          case 'qualityInput':
            searchData.quality = data[value];
            break;
          case 'minRatingInput':
            searchData.minimum_rating = data[value];
            break;
          case 'genreInput':
            searchData.genre = data[value];
            break;
          case 'sortBy':
            searchData.sort_by = data[value];
            break;
          case 'orderBy':
            searchData.order_by = data[value];
            break;
        }
      }
    }
    return searchData;
  }
}
