import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../shared/model/login';
import { API_ENDPOINTS } from '../shared/constant/api-endpoints';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  onLogin(LoginDTO: LoginDTO): Observable<LoginDTO> {
    return this.http.post<LoginDTO>(API_ENDPOINTS.LOGIN, LoginDTO);
  }
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInStatus.asObservable();

  updateLoginStatus(status: boolean): void {
    this.loggedInStatus.next(status);
  }
  logout(): void {
    localStorage.removeItem('accessToken');
  }
  
}
