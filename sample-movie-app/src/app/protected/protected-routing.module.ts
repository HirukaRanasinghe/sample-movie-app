import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../public/login/login.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {AdvancedSearchComponent} from './advanced-search/advanced-search.component';

const routes: Routes = [

  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'advanced-search',
        component: AdvancedSearchComponent,
      },
      /*{
        path: ':searchTerm',
        component: SearchPageComponent,
      },*/
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


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
