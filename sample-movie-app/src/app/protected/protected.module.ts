import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchPageComponent} from './search-page/search-page.component';
import {MovieCardComponent} from './movie-card/movie-card.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {AdvancedSearchComponent} from './advanced-search/advanced-search.component';
import {PaginationComponent} from './pagination/pagination.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ProtectedRoutingModule} from './protected-routing.module';
import {SharedModule} from '../shared/shared.module';
import { PreloaderComponent } from './preloader/preloader.component';



@NgModule({
  declarations: [
    SearchPageComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    AdvancedSearchComponent,
    PaginationComponent,
    LandingPageComponent,
    PreloaderComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule
  ],
  exports: [
    SearchPageComponent,
    MovieDetailsComponent,
    MovieCardComponent,
  ]
})
export class ProtectedModule { }
