import { Component } from '@angular/core';
import { EMPLOYEES } from '../mock/mock-employee';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {
  employees: Employee[] = EMPLOYEES;
  selectedEmployee?: Employee;

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  onEmployeeUpdated(updatedEmployees: Employee[]): void {
    this.employees = updatedEmployees;
    this.selectedEmployee = undefined;
  }

  onEmployeeDetailsClosed(): void {
    this.selectedEmployee = undefined;
  }
}
