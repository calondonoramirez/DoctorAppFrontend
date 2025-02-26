import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { session } from '../interfaces/session';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl+"user/"

  constructor(private http: HttpClient) { }

  initSession(request: Login):Observable<session>{
    return this.http.post<session>('${this.baseUrl}login', request);
  }
}
