import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent} from '../components/login/login.component';
import { SearchPageComponent } from '../components/search-page/search-page.component';
import { MovieCardComponent } from '../components/movie-card/movie-card.component';
import {MovieDetailsComponent} from '../components/movie-details/movie-details.component';
import {AppRoutingModule} from '../app-routing.module';
import {PaginationComponent} from '../components/pagination/pagination.component';
import {AdvancedSearchComponent} from '../components/advanced-search/advanced-search.component';
import {LandingPageComponent} from '../components/landing-page/landing-page.component';

@NgModule({
    declarations: [
      LoginComponent,
      SearchPageComponent,
      MovieCardComponent,
      MovieDetailsComponent,
      AdvancedSearchComponent,
      PaginationComponent,
      LandingPageComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        AppRoutingModule,
    ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SearchPageComponent,
    MovieDetailsComponent,
    MovieCardComponent,
    LoginComponent,
  ]
})
export class SharedModule { }
