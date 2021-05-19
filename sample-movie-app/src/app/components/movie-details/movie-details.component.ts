import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, Navigation, Router} from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as movieActions from '../../store/movie/movie.actions';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MovieData} from '../../interfaces/data/movie-data';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  backgroundStyleUrl: string;
  movieId: string;
  isMovieLoading$: Observable<boolean>;
  movieDetail$: Observable<MovieData>;
  movieDetails: object;
  movieSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<fromApp.AppState>, private sanitizer: DomSanitizer) {


  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.movieId = params['params']['movieId'];
    });
    this.store.dispatch(new movieActions.GetMovieById(this.movieId));
    this.isMovieLoading$ = this.store.select('movie', 'isLoading');

    this.movieDetail$ = this.store.select('movie', 'selectedMovie');
    this.movieSub = this.store.select('movie', 'selectedMovie').subscribe((movieDesc) => {
      if (movieDesc != null){
        this.movieDetails = movieDesc['data']['movie'];
        console.log(this.movieDetails);
        this.backgroundStyleUrl = `background-image: url(${this.movieDetails['background_image']}),linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(0, 0, 0, 1));`;

      }
    });
  }

  ngOnDestroy(): void {
    if (this.movieSub){
      this.movieSub.unsubscribe();
    }
    this.movieDetails = null;
  }
}
