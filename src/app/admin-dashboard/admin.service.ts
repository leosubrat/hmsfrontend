import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminPackage } from '../models/admin.model';
import { environments } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPackageService {
  private readonly baseUrl = environments.apiUrl // Adjust as needed
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  constructor(private http: HttpClient) {}

  // Create a new package
  createPackage(packageData: AdminPackage): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/package/with-tests`, packageData, { headers });
  }

  // Get all packages
  getAllPackages(): Observable<AdminPackage[]> {
    return this.http.get<AdminPackage[]>(`${this.baseUrl}/package`);
  }
  deletePackage(packageId: number): Observable<void> {
    const fullUrl = `${this.baseUrl}/delete/package`;
    
    const params = new HttpParams().set('packageId', packageId.toString());
    
    console.log('Calling DELETE:', fullUrl, 'with params:', params.toString());
    
    return this.http.delete<void>(fullUrl, { params });
  }
}