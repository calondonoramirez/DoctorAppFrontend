import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';


@NgModule({
  declarations: [
    LoginComponent,
    UserListComponent,
    UserModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
