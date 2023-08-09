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

  getEmployee(id: string): Observable<Employee | undefined> {
    const employee = EMPLOYEES.find((e) => e.id === id);
    this.messageService.add(`EmployeeService: fetched employee id=${id}`);
    return of(employee);
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

  getManagers(): Observable<Employee[]> {
    return this.getEmployees();
  }

  deleteEmployee(id: string | undefined): Observable<void> {
    const index = this.employees.findIndex((emp) => emp.id === id);
    if (index > -1) {
      this.employees.splice(index, 1);
      this.messageService.add(`EmployeeService: deleted employee id=${id}`);
    }
    return of(undefined);
  }
}
