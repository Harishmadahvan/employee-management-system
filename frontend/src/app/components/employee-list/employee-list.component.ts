import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee, PageResponse } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  pageData: PageResponse<Employee> | null = null;
  keyword = '';
  page = 0;
  size = 5;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.errorMessage = '';
    this.employeeService.getEmployees(this.keyword, this.page, this.size).subscribe({
      next: (data) => {
        this.pageData = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load employees. Is the backend running on port 8080?';
        this.loading = false;
      }
    });
  }

  search(): void {
    this.page = 0;
    this.loadEmployees();
  }

  clearSearch(): void {
    this.keyword = '';
    this.page = 0;
    this.loadEmployees();
  }

  goToPage(page: number): void {
    if (!this.pageData) {
      return;
    }
    if (page < 0 || page >= this.pageData.totalPages) {
      return;
    }
    this.page = page;
    this.loadEmployees();
  }

  deleteEmployee(employee: Employee): void {
    const confirmed = confirm(`Delete employee ${employee.firstName} ${employee.lastName}?`);
    if (!confirmed) {
      return;
    }

    this.employeeService.delete(employee.id).subscribe({
      next: () => {
        this.successMessage = 'Employee deleted successfully.';
        if (this.pageData && this.pageData.content.length === 1 && this.page > 0) {
          this.page -= 1;
        }
        this.loadEmployees();
      },
      error: () => {
        this.errorMessage = 'Failed to delete employee.';
      }
    });
  }
}
