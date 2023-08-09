import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent, MovieFormComponent, MovieDetailomponent } from './pages/index';

const appRoutes: Routes = [
  { path: 'movies', component: MoviesComponent, children: [
   
  ]},
  { path: 'movies/new-movie', component: MovieFormComponent },
  { path: 'movies/movie-detail', component: MovieDetailomponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
