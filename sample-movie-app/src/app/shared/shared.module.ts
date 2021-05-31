import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';

import { LoginComponent} from '../public/login/login.component';
import { SearchPageComponent } from '../protected/search-page/search-page.component';
import { MovieCardComponent } from '../protected/movie-card/movie-card.component';
import {MovieDetailsComponent} from '../protected/movie-details/movie-details.component';
import {AppRoutingModule} from '../app-routing.module';
import {PaginationComponent} from '../protected/pagination/pagination.component';
import {AdvancedSearchComponent} from '../protected/advanced-search/advanced-search.component';
import {LandingPageComponent} from '../protected/landing-page/landing-page.component';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
