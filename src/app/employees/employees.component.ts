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

  onEmployeeUpdated(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);

    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.selectedEmployee = updatedEmployee;
    }
  }

  onEmployeeDetailsClosed(): void {
    if (this.selectedEmployee && (!this.selectedEmployee.name || !this.selectedEmployee.surname || !this.selectedEmployee.hireDate)) {

      const index = this.employees.findIndex(emp => emp.id === this.selectedEmployee!.id);
      if (index !== -1) {
        this.employees.splice(index, 1);
      }
    }
    this.selectedEmployee = undefined;
  }

  onAddEmployee(): void {
    const newId = this.generateNewId();
    const newEmployee: Employee = {
      id: newId,
      name: '',
      surname: '',
      skills: [],
      hireDate: '',
      manager: ''
    };
    this.employees.push(newEmployee);
    this.selectedEmployee = newEmployee;
  }

  generateNewId(): string {
    const maxIdNumber = this.employees.reduce((max, emp) => Number(emp.id) > max ? Number(emp.id) : max, 0);
    const newIdNumber = maxIdNumber + 1;
    return newIdNumber.toString();
  }
}
