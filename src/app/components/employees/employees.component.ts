import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { MessageService } from '../../services/message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee?: Employee;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => (this.employees = employees));
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.messageService.add(this.translate.instant('EmployeesComponent.selected_employee', { id: employee.id }));
  }

  onEmployeeUpdated(updatedEmployee: Employee): void {
    this.employeeService.updateEmployee(updatedEmployee).subscribe(() => {
      this.getEmployees();
      this.selectedEmployee = undefined;
    });
  }

  onEmployeeDetailsClosed(): void {
    this.selectedEmployee = undefined;
  }

  onNewEmployeeCreated(newEmployee: Employee): void {
    this.employeeService.createEmployee(newEmployee).subscribe(() => {
      this.getEmployees();
      this.selectedEmployee = undefined;
    });
  }

  get managers(): string[] {
    return this.employees
      .filter((emp) => !this.selectedEmployee || emp.id !== this.selectedEmployee.id)
      .map((emp) => `${emp.id} ${emp.name} ${emp.surname}`);
  }
}
