import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post("http://localhost:9090/api/user/signup", user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post("http://localhost:9090/api/user/signin", user);
  }
}
