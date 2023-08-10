import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../services/employee.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Employee } from '../../../../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss'],
})
export class EmployeeSearchComponent implements OnInit {
  employees$!: Observable<Employee[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  navigateToEmployee(id: string | undefined): void {
    this.router.navigate([`/detail/${id}`]);
  }

  ngOnInit(): void {
    this.employees$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.employeeService.searchEmployees(term)),
    );
  }
}
