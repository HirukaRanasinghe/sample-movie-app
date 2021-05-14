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
  movieRating = 6.6;


  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }

  ];

  constructor() { }

  ngOnInit(): void {
    this.posterStyle = `background-image: url(${this.posterUrl});`;
    this.showPosterDetails = false;
    this.selectStar(this.movieRating);
  }
  onViewMoreClick(): void{
    console.log('more details');
  }

  selectStar(value): void{
    value = value / 2;
    console.log(value);
    // prevent multiple selection
    if ( this.selectedRating === 0){

      this.stars.filter( (star) => {

        if ( star.id <= value){

          star.class = 'star-gold star';

        }else{

          star.class = 'star-gray star';

        }

        return star;
      });

    }

    this.selectedRating = value;


  }


}
