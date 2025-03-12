import { Component, Inject } from '@angular/core';
import { Role } from '../../interfaces/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { user } from '../../interfaces/user';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from '../../services/user.service';
import { Register } from '../../interfaces/register';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {

    formUser: FormGroup;
    title: string = 'Add';
    buttonName: string = 'Save';
    roleList: Role[] = [];

  
  constructor(
    private  modal: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: user,
    private fb: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService
  ){
      this.formUser = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.userService.roleList().subscribe({
      next: (data) => {
        if(data.success){
          this.roleList = data.result;
        }
      },
      error: (e) => {}
    });

  }


  registerUser(){
    const user: Register = {
      userName: this.formUser.value.userName,
      password: this.formUser.value.password,
      name: this.formUser.value.name,
      lastName: this.formUser.value.lastName,
      email: this.formUser.value.email,
      role: this.formUser.value.role
    }

    this.userService.register(user).subscribe({
      next: (data) => {
        this.sharedService.showAlert('Usuario ha sido registrado con Exito!', 'Complete');
        this.modal.close("true");
      },
      error: (e) => {
        var errorMessage: string = '';

        if(e.error.errores != undefined){
          errorMessage = e.error.errores;
        }
        else{

          if(Array.isArray(e.error)){
            for(let i=0; i < e.error.length; i++){
              errorMessage += e.error[i].code + ' | ' + e.error[i].description + "\n\r";  
            }
          }

        }      
                
        this.sharedService.showAlert(errorMessage, 'Error');  
      }
    });


  }

  get email(){
    return this.formUser.get('email');
  }

  
}


