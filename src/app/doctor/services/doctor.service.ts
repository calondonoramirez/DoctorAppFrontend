import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { environment } from 'src/environments/environment';
import { Doctor } from '../interfaces/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  
    baseuRL: string = environment.apiUrl + 'doctor/';
  
    constructor(private http: HttpClient) { }
  
    list() : Observable<ApiResponse>{
      return this.http.get<ApiResponse>(`${this.baseuRL}`);
    }
  
    create(request: Doctor) : Observable<ApiResponse>{
      return this.http.post<ApiResponse>(`${this.baseuRL}`, request);
    }
  
    update(request: Doctor) : Observable<ApiResponse>{
      return this.http.put<ApiResponse>(`${this.baseuRL}`, request);
    }
  
    delete(id: number) : Observable<ApiResponse>{
      return this.http.delete<ApiResponse>(`${this.baseuRL}${id}`);
    }
}
