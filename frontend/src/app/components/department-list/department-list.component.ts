import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  form: FormGroup;
  editingId: number | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true;
    this.departmentService.getAll().subscribe({
      next: (data) => {
        this.departments = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load departments. Is the backend running on port 8080?';
        this.loading = false;
      }
    });
  }

  startEdit(department: Department): void {
    this.editingId = department.id;
    this.form.patchValue({
      name: department.name,
      description: department.description || ''
    });
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form.reset({ name: '', description: '' });
  }

  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request = this.form.value;
    const request$ = this.editingId
      ? this.departmentService.update(this.editingId, request)
      : this.departmentService.create(request);

    request$.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Department updated.' : 'Department created.';
        this.cancelEdit();
        this.loadDepartments();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to save department.';
      }
    });
  }

  deleteDepartment(department: Department): void {
    const confirmed = confirm(`Delete department "${department.name}"?`);
    if (!confirmed) {
      return;
    }

    this.departmentService.delete(department.id).subscribe({
      next: () => {
        this.successMessage = 'Department deleted.';
        this.loadDepartments();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to delete department.';
      }
    });
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
