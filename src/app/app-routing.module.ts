import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent, LayoutComponent, LoginComponent, RegistrationComponent, HomeComponent, CinemaMoviesComponent, HallComponent } from './pages/index';

const appRoutes: Routes = [
  { path: 'auth', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent }
    ]
  },
  { path: 'home', component: HomeComponent},
  { path: 'cinema', component: CinemaMoviesComponent, 
    children: [
      { path: 'hall', component: HallComponent },
  ]
  },
  { path: 'movies', component: MoviesComponent, 
    children: [
      
  ]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
