import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Session } from '../user/interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _snackbar: MatSnackBar) { }

  showAlert(mensaje: string, tipo: string){
    this._snackbar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }


  saveSession(session: Session){
    //Guardar sesion en localStorage
    localStorage.setItem("userSession", JSON.stringify(session.userName)); 
  }

  getSession(){
    const sessionString = localStorage.getItem("userSession");
    const userSession = JSON.parse(sessionString!);

    return userSession;
  }

  deleteSession(){
    localStorage.removeItem("userSession");
  }


}
