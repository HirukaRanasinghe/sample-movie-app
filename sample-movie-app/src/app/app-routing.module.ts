import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'search-page',
    loadChildren: () => import('src/app/protected/protected.module').then(m => m.ProtectedModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
