import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { SearchData } from '../../interfaces/data/search.data';
import * as movieActions from '../../store/movie/movie.actions';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MovieData} from '../../interfaces/data/movie-data';
import {PageEvent} from '@angular/material/paginator';
import {MatDialogRef} from '@angular/material/dialog';
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
  advancedSearchForm: UntypedFormGroup;
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
  searchValObject: SearchData;
  pageEvent: PageEvent;

  constructor(private store: Store<fromApp.AppState>, public dialogRef: MatDialogRef<AdvancedSearchComponent>) { }

  closeDialog(): void{
    this.dialogRef.close(this.searchValObject);
  }
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

    this.advancedSearchForm = new UntypedFormGroup({
      queryTermInput: new UntypedFormControl(
        null,
        []),
      qualityInput: new UntypedFormControl(
        null,
        []),
      minRatingInput: new UntypedFormControl(
        null,
        [Validators.min(0) , Validators.max(9)]),
      genreInput: new UntypedFormControl(
        null,
        []),
      sortBy: new UntypedFormControl(
        null,
        []),
      orderBy: new UntypedFormControl(
        null,
        [])

  });
  }

  onSubmit(): void{
    if (this.advancedSearchForm.valid){
      this.showErr = false;
      this.showStatus = false;
      const searchVals: object = this.advancedSearchForm.value;
      const searchDataObj: SearchData = this.convertToSearchDataObj(searchVals);
      this.searchValObject = searchDataObj;
      this.store.dispatch(new movieActions.GetMovieBySearchTerm(searchDataObj));
    }
  }

  /*onPageChange($event): void{
    this.pageEvent = $event;
    const pageNo = this.pageEvent.pageIndex + 1;
    console.log(pageNo);

    const searchVals: object = this.advancedSearchForm.value;

    const nxtPage: SearchData = this.convertToSearchDataObj(searchVals);
    nxtPage.page = pageNo;
    this.store.dispatch(new movieActions.GetMovieBySearchTerm(nxtPage));

  }*/

  // Convert form values into a SearchData object
   public convertToSearchDataObj(data: object): SearchData{
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
