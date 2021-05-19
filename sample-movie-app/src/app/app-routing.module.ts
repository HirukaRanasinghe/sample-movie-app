import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MovieDetailsComponent} from './components/movie-details/movie-details.component';
import {LoginComponent} from './components/login/login.component';
import {SearchPageComponent} from './components/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'search-page',
    component: SearchPageComponent,
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
