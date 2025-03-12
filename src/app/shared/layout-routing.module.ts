import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecialityListComponent } from '../speciality/pages/speciality-list/speciality-list.component';
import { DoctorListComponent } from '../doctor/pages/doctor-list/doctor-list.component';
import { UserListComponent } from '../user/pages/user-list/user-list.component';

//Se crea una importacion vacia
import {  } from '../speciality/speciality.module';
import {  } from '../doctor/doctor.module';
import {  } from '../user/user.module';
import { authGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      {path: 'speciality', component: SpecialityListComponent, pathMatch: 'full'},
      {path: 'doctor', component: DoctorListComponent, pathMatch: 'full'},
      {path: 'user', component: UserListComponent, pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'} //path: '**' => A cualquier ruta redirecciona a la ruta principal
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:  [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
