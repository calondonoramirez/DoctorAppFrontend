import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import { DoctorService } from './services/doctor.service';
import { ModalDoctorComponent } from './modals/modal-doctor/modal-doctor.component';




@NgModule({
  declarations: [  
    DoctorListComponent, ModalDoctorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    DoctorService
  ]
})
export class DoctorModule { }
