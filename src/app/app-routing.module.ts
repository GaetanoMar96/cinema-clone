import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent, MovieFormComponent, MovieDetailomponent, LayoutComponent, LoginComponent, RegistrationComponent, HomeComponent } from './pages/index';

const appRoutes: Routes = [
  { path: 'auth', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent }
    ]
  },
  { path: 'home', component: HomeComponent},
  { path: 'movies', component: MoviesComponent, 
    children: [
      { path: 'new-movie', component: MovieFormComponent },
      { path: 'movie-detail', component: MovieDetailomponent},
  ]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
