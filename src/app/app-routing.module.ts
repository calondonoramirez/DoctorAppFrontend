import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent, 
    pathMatch: 'full'
  },
  {
    path: 'login', 
    component: LoginComponent, 
    pathMatch: 'full'
  },
  {
    path: '**', //ruta que no exista
    redirectTo: '', //redirija a la ruta principal => path: ''
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
