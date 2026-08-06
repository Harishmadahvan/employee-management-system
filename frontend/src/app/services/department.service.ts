import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department, DepartmentRequest } from '../models/department.model';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly apiUrl = 'http://localhost:8080/api/departments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  create(request: DepartmentRequest): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, request);
  }

  update(id: number, request: DepartmentRequest): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
