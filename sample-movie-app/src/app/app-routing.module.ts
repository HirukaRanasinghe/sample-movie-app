import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {LoginComponent} from './components/login/login.component';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {AdvancedSearchComponent} from './components/advanced-search/advanced-search.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedSearchComponent
  },
  {
    path: 'search-page',
    component: SearchPageComponent,
  },
  {
    path: 'advanced-search',
    component: AdvancedSearchComponent,
  },
  {
    path: 'search-page/:searchTerm',
    component: SearchPageComponent,
  },
  {
    path: 'movie-details/:movieId',
    component: MovieDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
