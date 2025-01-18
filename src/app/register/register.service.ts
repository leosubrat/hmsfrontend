import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from '../shared/model/register.dto';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../shared/constant/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  onRegister(registerDto: RegisterDTO): Observable<RegisterDTO> {
    return this.http.post<RegisterDTO>(API_ENDPOINTS.REGISTER, registerDto);
  }
}
