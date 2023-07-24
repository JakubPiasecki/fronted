import { Component } from '@angular/core';
import { EMPLOYEES } from '../mock/mock-employee';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  employees = EMPLOYEES;
  selectedEmployee?: Employee;

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }
}
