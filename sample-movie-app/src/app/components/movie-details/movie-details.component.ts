import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Navigation, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {State} from '@ngrx/store';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieDescription: object;
  constructor(private route: Router) {


  }

  ngOnInit(): void {
      this.movieDescription = history.state;
      console.log(this.movieDescription);
  }

}
