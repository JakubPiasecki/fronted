import { Injectable } from '@angular/core';
import { EMPLOYEES } from '../mock/mock-employee';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    let employee = EMPLOYEES;
    return {employee} ;
  }
}
