import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { MessageService } from '../../services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee?: Employee;
  destroyRef = inject(DestroyRef);
  isLoading = true;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employees) => {
        this.employees = employees;
        this.isLoading = false;
      });
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.messageService.add(this.translate.instant('EmployeesComponent.selected_employee', { id: employee.id }));
  }
}
