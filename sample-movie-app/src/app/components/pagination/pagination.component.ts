import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MovieData} from '../../interfaces/data/movie-data';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() movieList: MovieData;
  @Output() outEvent: EventEmitter<PageEvent> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  onPageChange($event): void{
    this.outEvent.emit($event);
  }

}
