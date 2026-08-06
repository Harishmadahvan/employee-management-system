export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  salary: number;
  hireDate: string;
  departmentId: number;
  departmentName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  salary: number;
  hireDate: string;
  departmentId: number;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
