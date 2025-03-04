import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecialityListComponent } from '../speciality/pages/speciality-list/speciality-list.component';

//Se crea una importacion vacia
import {  } from '../speciality/speciality.module';



const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      {path: 'speciality', component: SpecialityListComponent, pathMatch: 'full'},
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
