import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchForm: FormGroup;
  showStatus: boolean;
  showErr: boolean;
  constructor() { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
        search: new FormControl(null, []),
    });
    this.showErr = false;
    this.showStatus = true;
  }

  onSearch(): void{
    if (this.searchForm.get('search').value !== null){
      console.log(this.searchForm.get('search').value);
      this.showStatus = false;
      this.showErr = false;
    }
    else {
      this.showErr = true;
      this.showStatus = false;
    }
  }

}
