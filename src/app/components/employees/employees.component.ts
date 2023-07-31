import { Component } from '@angular/core';
import { EMPLOYEES } from '../../mock/mock-employee';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {
  employees: Employee[] = EMPLOYEES;
  selectedEmployee?: Employee;

  get managers(): string[] {
    return this.employees
      .filter((emp) => !this.selectedEmployee || emp.id !== this.selectedEmployee.id)
      .map((emp) => `${emp.id} ${emp.name} ${emp.surname}`);
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  onEmployeeUpdated(updatedEmployee: Employee): void {
    const employeeIndex = this.employees.findIndex((emp) => emp.id === updatedEmployee.id);
    if (employeeIndex > -1) {
      this.employees[employeeIndex] = updatedEmployee;
    } else {
      this.employees.push(updatedEmployee);
    }
    this.selectedEmployee = undefined;
  }

  onEmployeeDetailsClosed(): void {
    this.selectedEmployee = undefined;
  }

  onNewEmployeeCreated(newEmployee: Employee): void {
    newEmployee.id = this.generateNewId();
    this.employees.push(newEmployee);
    this.selectedEmployee = undefined;
  }

  private generateNewId(): string {
    const maxIdNumber = this.employees.reduce((max, emp) => (Number(emp.id) > max ? Number(emp.id) : max), 0);
    const newIdNumber = maxIdNumber + 1;
    return newIdNumber.toString();
  }
}
