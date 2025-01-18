import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../shared/model/login';
import { API_ENDPOINTS } from '../shared/constant/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  onRegister(LoginDTO: LoginDTO): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(API_ENDPOINTS.LOGIN, LoginDTO);
  }}
