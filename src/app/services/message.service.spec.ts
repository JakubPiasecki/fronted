import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);
    translateServiceSpy.instant.and.callFake((key: string, param?: { [key: string]: string }) => {
      if (key === 'EmployeeService.fetched_employee') return 'Fetched employee';
      if (key === 'EmployeesComponent.selected_employee') {
        if (param && param['id']) {
          return `Selected employee with id=${param['id']}`;
        } else {
          return 'Selected employee with id=';
        }
      }
      return key;
    });

    TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: translateServiceSpy }],
    });

    service = TestBed.inject(MessageService);
    mockTranslateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add message', () => {
    const messageKey = 'EmployeeService.fetched_employee';
    service.add(messageKey);
    expect(service.messages).toContain(messageKey);
  });

  it('should get translated messages', () => {
    const fetchedEmployeeMessageKey = 'EmployeeService.fetched_employee';
    const selectedEmployeeMessageKey = 'EmployeesComponent.selected_employee';

    service.add(fetchedEmployeeMessageKey);
    service.add(selectedEmployeeMessageKey);

    const translatedMessages = service.getTranslatedMessages();
    expect(translatedMessages).toEqual(['Fetched employee', 'Selected employee with id=']);
    expect(mockTranslateService.instant).toHaveBeenCalledTimes(2);
  });

  it('should get translated messages with interpolation', () => {
    const messageKey = 'EmployeesComponent.selected_employee';
    service.add(messageKey);

    mockTranslateService.instant.and.callFake(() => `Selected employee with id=123`);

    const translatedMessages = service.getTranslatedMessages();
    expect(translatedMessages).toEqual(['Selected employee with id=123']);
  });

  it('should clear messages', () => {
    service.add('EmployeeService.fetched_employee');
    service.add('EmployeesComponent.selected_employee');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
