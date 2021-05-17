import { Component, OnInit, Input } from '@angular/core';
import {MovieData} from '../../interfaces/data/movie-data';
import { Router} from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movieDetails: object;

  posterStyle: string;
  showPosterDetails: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.posterStyle = `background-image: url(${this.movieDetails['medium_cover_image']});`;
    this.showPosterDetails = false;
  }
  onViewMoreClick(id: string, details: object): void{
    this.router.navigateByUrl(`/movie-details/${id}`);
    console.log('more details');

  }




}
