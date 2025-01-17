import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from '../shared/model/register.dto';
import { API_ENDPOINTS } from '../shared/constant/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
  constructor(private http: HttpClient) { }
  onRegister(registerDto: RegisterDTO): Observable<RegisterDTO> {
    return this.http.post<RegisterDTO>(API_ENDPOINTS.REGISTER, registerDto);
  }
}
