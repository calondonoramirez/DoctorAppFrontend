import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session } from '../interfaces/session';
import { Login } from '../interfaces/login';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl+"User/"

  constructor(private http: HttpClient) { }

  initSession(request: Login):Observable<Session>{
    return this.http.post<Session>(`${this.baseUrl}login`, request);
  }

  list():Observable<ApiResponse>{
    return  this.http.get<ApiResponse>(`${this.baseUrl}`)
  }

  register(request: Register): Observable<Session>{
    return this.http.post<Session>(`${this.baseUrl}register`, request);
  }


  roleList():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}RoleList`);
  }

}
