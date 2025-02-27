import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session } from '../interfaces/session';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl+"User/"

  constructor(private http: HttpClient) { }

  initSession(request: Login):Observable<Session>{
    return this.http.post<Session>(`${this.baseUrl}login`, request);
  }
}
