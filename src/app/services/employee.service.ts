import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { EMPLOYEES } from '../mock/mock-employee';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: Employee[] = EMPLOYEES;

  constructor(
    private messageService: MessageService,
    private translate: TranslateService,
  ) {}

  getEmployees(): Observable<Employee[]> {
    this.messageService.add(this.translate.instant('EmployeeService.fetched_employee'));
    return of(this.employees);
  }

  updateEmployee(updatedEmployee: Employee): Observable<void> {
    const employeeIndex = this.employees.findIndex((emp) => emp.id === updatedEmployee.id);
    if (employeeIndex > -1) {
      this.employees[employeeIndex] = updatedEmployee;
      return of(undefined);
    }
    return of(undefined);
  }

  createEmployee(newEmployee: Employee): Observable<void> {
    newEmployee.id = this.generateNewId();
    this.employees.push(newEmployee);
    return of(undefined);
  }

  private generateNewId(): string {
    const maxIdNumber = this.employees.reduce((max, emp) => (Number(emp.id) > max ? Number(emp.id) : max), 0);
    const newIdNumber = maxIdNumber + 1;
    return newIdNumber.toString();
  }
}
