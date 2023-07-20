import { Component } from '@angular/core';
import {Employee} from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  employee1: Employee = {
    id: "1",
    name: "Grzegorz",
    surname: "Gregory",
    skills: [],
    hireDate: "10-10-2000",
    manager: "",
  };
  employee2: Employee = {
    id: "2",
    name: "Anna",
    surname: "Ann",
    skills: [],
    hireDate: "12-09-2012",
    manager: this.employee1.name,
  };
}
