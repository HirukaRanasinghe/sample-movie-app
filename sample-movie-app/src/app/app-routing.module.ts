import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {LoginComponent} from './components/login/login.component';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {AdvancedSearchComponent} from './components/advanced-search/advanced-search.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'search-page',
    component: LandingPageComponent,
    children: [
      {
        path: ':searchTerm',
        component: SearchPageComponent,
      },
      {
        path: '',
        component: SearchPageComponent,
      },
      {
        path: 'movie-details/:movieId',
        component: MovieDetailsComponent,
      },
    ]
  },
  {
    path: 'advanced-search',
    component: AdvancedSearchComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
