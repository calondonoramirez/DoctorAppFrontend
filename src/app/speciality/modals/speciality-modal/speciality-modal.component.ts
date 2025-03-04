import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Speciality } from '../../interfaces/speciality';
import { SpecialityService } from '../../services/speciality.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-speciality-modal',
  templateUrl: './speciality-modal.component.html',
  styleUrls: ['./speciality-modal.component.css']
})
export class SpecialityModalComponent implements OnInit {
  
  SpecialityForm: FormGroup;
  title: string = "Add";
  buttonName: string = "Save";

  /**
   *
   */
  constructor(private modal: MatDialogRef<SpecialityModalComponent>, 
              @Inject(MAT_DIALOG_DATA) public specialityData: Speciality,
              private fb: FormBuilder,
              private _specialityService: SpecialityService,
              private _sharedService: SharedService){

    this.SpecialityForm = this.fb.group({

      specialityName: ['', Validators.required],
      description: ['', Validators.required],
      state: ['1', Validators.required],
    });  
    
    
    if(this.specialityData != null){
      this.title = "Edit";
      this.buttonName = "Update"
    }

  }
  
  ngOnInit(): void {
    
    if(this.specialityData != null)
    {
      this.SpecialityForm.patchValue({
        specialityName: this.specialityData.specialityName,
        description: this.specialityData.description,
        state: this.specialityData.state.toString()
      });
    }
  }


  specialityCreateModify(){
    const speciality: Speciality = {
      id: this.specialityData == null ? 0 : this.specialityData.id,
      specialityName: this.SpecialityForm.value.specialityName,
      description: this.SpecialityForm.value.description,
      state: parseInt(this.SpecialityForm.value.state)
    }

    if(this.specialityData == null)
    {
      //Create new speciality
      this._specialityService.create(speciality).subscribe({
        next: (data) => {
          if(data.success){
            this._sharedService.showAlert('La especialidad ha sido creada con Exito!', 'Complete');
            this.modal.close("true");
          }
          else{
            this._sharedService.showAlert('No se pudo crear la especialidad', 'Error');
          }
        },
        error: (e) => {
          this._sharedService.showAlert('Error al crear la especialidad. \r\n'+ e.error.errores, 'Error');
        }
      });

    }
    else{
      //Update speciality
      this._specialityService.update(speciality).subscribe({
        next: (data) => {
          if(data.success){
            this._sharedService.showAlert('La especialidad ha sido actualizada con Exito!', 'Complete'); 
            this.modal.close("true");           
          }
          else{
            this._sharedService.showAlert('No se pudo actualizar la especialidad', 'Error');
          }
        },
        error: (e) => {
          this._sharedService.showAlert('Error al actualizar la especialidad. \r\n'+ e.error.errores, 'Error');
        }
      });
    }

  }


}
