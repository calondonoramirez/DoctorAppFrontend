import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Doctor } from '../../interfaces/doctor';
import { SpecialityService } from 'src/app/speciality/services/speciality.service';
import { DoctorService } from '../../services/doctor.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Speciality } from 'src/app/speciality/interfaces/speciality';

@Component({
  selector: 'app-modal-doctor',
  templateUrl: './modal-doctor.component.html',
  styleUrls: ['./modal-doctor.component.css']
})
export class ModalDoctorComponent implements OnInit {

  formDoctor: FormGroup;
  title: string = 'Add';
  buttonName: string = 'Save';
  specialitylist: Speciality[] = [];

  /**
   */
  constructor(
    private  modal: MatDialogRef<ModalDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDoctor: Doctor,
    private fb: FormBuilder,
    private specialityService: SpecialityService,
    private doctorService: DoctorService,
    private sharedService: SharedService
  ){
      this.formDoctor = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      direction: ['', Validators.required],
      phone: ['', Validators.required],
      genre: ['', Validators.required],
      specialityId: ['', Validators.required],
      state: ['', Validators.required]
    });

    if(this.dataDoctor != null){
      this.title = 'Edit';
      this.buttonName = 'Update'
    }

    this.specialityService.activesList().subscribe({
      next: (data) => {
        if(data.success){
          this.specialitylist = data.result;
        }
      },
      error: (e) => {}
    });
  }


  ngOnInit(): void {
    
    if(this.dataDoctor != null){

        this.formDoctor.patchValue({
        name: this.dataDoctor.name,
        lastName: this.dataDoctor.lastName,
        direction: this.dataDoctor.direction,
        phone: this.dataDoctor.phone,
        genre: this.dataDoctor.genre,
        specialityId: this.dataDoctor.specialityId,
        state: this.dataDoctor.state.toString()
      });
    }
  }


  CreateModifyDoctor(){
      const doctor: Doctor = {
      id: this.dataDoctor == null ? 0 : this.dataDoctor.id,
      name: this.formDoctor.value.name,
      lastName: this.formDoctor.value.lastName,
      direction: this.formDoctor.value.direction,
      phone: this.formDoctor.value.phone,
      genre: this.formDoctor.value.genre,
      specialityId: parseInt(this.formDoctor.value.specialityId),
      state: parseInt(this.formDoctor.value.state),
      nameSpeciality: ''
    }

    if(this.dataDoctor == null){
      //Crear Doctor
      this.doctorService.create(doctor).subscribe({
        next: (data) => {
          if(data.success){
            this.sharedService.showAlert('Doctor ha sido creado con exito!', 'Complete');
            this.modal.close("true");
          }
          else{
            this.sharedService.showAlert('No se pudo crear el Doctor', 'Error!');
          }
        },
        error: (e) => {
          this.sharedService.showAlert(e.error.message, 'Error!');
        }
      });
    }
    else
    {
      //Actualizar Doctor
      this.doctorService.update(doctor).subscribe({
        next: (data) => {
          if(data.success){
            this.sharedService.showAlert('Doctor ha sido actualizado con exito!', 'Complete');
            this.modal.close("true");
          }
          else{
            this.sharedService.showAlert('No se pudo actualizado el Doctor', 'Error!');
          }
        },
        error: (e) => {
          this.sharedService.showAlert(e.error.message, 'Error!');
        }
      });
    }

  }
}
