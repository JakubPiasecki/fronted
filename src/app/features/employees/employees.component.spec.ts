import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmployeesComponent } from './employees.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let compiled: Element;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
            deps: [HttpClient],
          },
        }),
        MatListModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
      ],
      providers: [TranslateService],
    });
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the spinner if isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.employee-list__spinner')).toBeTruthy();
    expect(compiled.querySelector('.employee-list__item')).toBeFalsy();
  });

  it('should display employees if isLoading is false', () => {
    component.isLoading = false;
    component.employees = [
      { id: '1', name: 'Jan', surname: '', hireDate: new Date(), skills: [], manager: '' },
      { id: '2', name: 'Anna', surname: '', hireDate: new Date(), skills: [], manager: '' },
    ];
    fixture.detectChanges();
    expect(compiled.querySelector('.employee-list__spinner')).toBeFalsy();
    const employeeItems = compiled.querySelectorAll('.employee-list__item');
    expect(employeeItems.length).toEqual(2);
    expect(employeeItems[0].textContent).toContain('Jan');
    expect(employeeItems[1].textContent).toContain('Anna');
  });
});
