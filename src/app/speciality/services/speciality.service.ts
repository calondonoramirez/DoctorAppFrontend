import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { environment } from 'src/environments/environment';
import { Speciality } from '../interfaces/speciality';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {


  baseuRL: string = environment.apiUrl + 'speciality/';

  constructor(private http: HttpClient) { }

  list() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseuRL}`);
  }

  create(request: Speciality) : Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseuRL}`, request);
  }

  update(request: Speciality) : Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.baseuRL}`, request);
  }

  delete(id: number) : Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${this.baseuRL}${id}`);
  }

}
