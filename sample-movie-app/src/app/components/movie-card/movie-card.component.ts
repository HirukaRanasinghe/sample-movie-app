import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  posterUrl = 'https://img.yts.mx/assets/images/movies/Batman_1989/medium-cover.jpg';
  posterStyle: string;
  showPosterDetails: boolean;
  constructor() { }

  ngOnInit(): void {
    this.posterStyle = `background-image: url(${this.posterUrl});`;
    this.showPosterDetails = false;
  }
  onViewMoreClick(): void{
    console.log('more details');
  }
}
