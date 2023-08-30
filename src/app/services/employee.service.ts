import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Employee } from '../models/employee';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesUrl = environment.apiBaseUrl + '/employees'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private translate: TranslateService,
  ) {}

  getEmployees(): Observable<Employee[]> {
    this.messageService.add(this.translate.instant('EmployeeService.fetched_employee'));
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      tap(() => this.log('fetched employee')),
      catchError(this.handleError<Employee[]>('getEmployees', [])),
    );
  }

  getEmployee(id: string | null): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(() => this.messageService.add(`EmployeeService: fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`)),
    );
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee> {
    const url = `${this.employeesUrl}/${updatedEmployee.id}`;
    return this.http.put<Employee>(url, updatedEmployee, this.httpOptions).pipe(
      tap(() => this.messageService.add(`EmployeeService: updated employee id=${updatedEmployee.id}`)),
      catchError(this.handleError<Employee>('updateEmployee')),
    );
  }

  createEmployee(newEmployee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, newEmployee, this.httpOptions).pipe(
      tap((createdEmployee: Employee) =>
        this.messageService.add(`EmployeeService: added employee w/ id=${createdEmployee.id}`),
      ),
      catchError(this.handleError<Employee>('createEmployee')),
    );
  }


  deleteEmployee(id: string | undefined): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      tap(() => this.messageService.add(`EmployeeService: deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee')),
    );
  }

  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}?name=${term}`).pipe(
      tap((foundEmployees) =>
        foundEmployees.length
          ? this.messageService.add(`found employees matching "${term}"`)
          : this.messageService.add(`no employees matching "${term}"`),
      ),
      catchError(this.handleError<Employee[]>('searchEmployees', [])),
    );
  }

  getManagers(): Observable<Employee[]> {
    return this.getEmployees();
  }

  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpError): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getSkills(): Observable<{id: number, name: string}[]> {
    const skillsUrl = environment.apiBaseUrl + '/skills';
    return this.http.get<{id: number, name: string}[]>(skillsUrl).pipe(
      tap(() => this.log('fetched skills')),
      catchError(this.handleError<{id: number, name: string}[]>('getSkills', []))
    );
  }


}
interface HttpError {
  message: string;
  status?: number;
}
