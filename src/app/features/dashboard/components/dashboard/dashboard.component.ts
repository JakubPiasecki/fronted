import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Employee } from '../../../../models/employee';
import { EmployeeService } from '../../../../services/employee.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  employee?: Employee;
  destroyRef = inject(DestroyRef);
  isLoading = true;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    this.employeeService
      .getEmployees()
      .pipe(
        map((employees) => {
          const employeesCopy = [...employees].map((emp) => {
            emp.hireDate = new Date(emp.hireDate);
            return emp;
          });
          return employeesCopy.sort((a, b) => b.hireDate.getTime() - a.hireDate.getTime()).slice(0, 5);
        }),
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((sortedEmployees) => {
        this.employees = sortedEmployees;
        this.isLoading = false;
      });
  }

  onAddEmployee(): void {
    this.router.navigate(['/detail/create']);
  }
}
