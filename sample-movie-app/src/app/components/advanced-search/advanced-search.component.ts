import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  genre: string| null;
  sortBy: string[] = ['title', 'year', 'rating', 'peers', 'seeds', 'download_count', 'like_count', 'date_added'];
  orderBy: string[] = ['asc', 'desc'];

  constructor() { }

  ngOnInit(): void {
    this.advancedSearchForm = new FormGroup({
      queryTermInput: new FormControl(
        null,
        []),
      qualityInput: new FormControl(
        null,
        [Validators.pattern('(720p | 1080p | 2160p | 3D | All)')]),
      minRatingInput: new FormControl(
        null,
        [Validators.min(0), , Validators.max(9)]),
      genreInput: new FormControl(
        null,
        []),
      sortBy: new FormControl(
        null,
        [Validators.pattern('(title | year | rating | peers | seeds | download_count | like_count | date_added)')]),
      orderBy: new FormControl(
        null,
        [Validators.pattern('(asc | desc)')])

  });
  }

  onSubmit(): void{
    console.log(JSON.stringify(this.advancedSearchForm.value));
  }

}
