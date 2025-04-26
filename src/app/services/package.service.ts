// package.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';

interface Package {
  packageId: number;
  packageName: string;
  packagePrice: number;
  description: string;
  testType: string;
  // Add other properties as needed
}

interface PackageResponse {
  data: Package[];
}

interface ApiResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl =environments.apiUrl; // Replace with your actual API base URL
  constructor(private http: HttpClient) { }
  approvePackage(packageId: number): Observable<ApiResponse> {
    const params = new HttpParams().set('packageId', packageId.toString());
    return this.http.put<ApiResponse>(`${this.baseUrl}/package/approve`, {}, { params });
  }
  getApprovedPackages(): Observable<PackageResponse> {
    return this.http.get<PackageResponse>(`${this.baseUrl}/package/approved`);
  }

}