export interface Department {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  employeeCount?: number;
}

export interface DepartmentRequest {
  name: string;
  description?: string;
}
