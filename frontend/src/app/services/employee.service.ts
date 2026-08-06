import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeRequest, PageResponse } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(keyword = '', page = 0, size = 5): Observable<PageResponse<Employee>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (keyword.trim()) {
      params = params.set('keyword', keyword.trim());
    }

    return this.http.get<PageResponse<Employee>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  create(request: EmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, request);
  }

  update(id: number, request: EmployeeRequest): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
