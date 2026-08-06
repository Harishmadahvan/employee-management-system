import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';
import { EmployeeRequest } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  departments: Department[] = [];
  isEditMode = false;
  employeeId: number | null = null;
  loading = false;
  errorMessage = '';
  fieldErrors: Record<string, string> = {};

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.pattern(/^$|^[0-9+\-\s()]{7,20}$/)]],
      salary: [null, [Validators.required, Validators.min(0.01)]],
      hireDate: ['', Validators.required],
      departmentId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.employeeId = Number(idParam);
      this.loadEmployee(this.employeeId);
    }
  }

  loadDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (data) => (this.departments = data),
      error: () => (this.errorMessage = 'Unable to load departments.')
    });
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getById(id).subscribe({
      next: (employee) => {
        this.form.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          salary: employee.salary,
          hireDate: employee.hireDate,
          departmentId: employee.departmentId
        });
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Employee not found.';
        this.loading = false;
      }
    });
  }

  submit(): void {
    this.errorMessage = '';
    this.fieldErrors = {};

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request = this.form.value as EmployeeRequest;
    this.loading = true;

    const request$ = this.isEditMode && this.employeeId
      ? this.employeeService.update(this.employeeId, request)
      : this.employeeService.create(request);

    request$.subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        this.loading = false;
        if (err?.error?.fieldErrors) {
          this.fieldErrors = err.error.fieldErrors;
        }
        this.errorMessage = err?.error?.message || 'Failed to save employee.';
      }
    });
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
