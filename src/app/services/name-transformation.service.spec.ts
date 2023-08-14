import { TestBed } from '@angular/core/testing';
import { NameTransformationService } from './name-transformation.service';

describe('NameTransformationService', () => {
  let service: NameTransformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameTransformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toUpperCase', () => {
    it('should transform string to upper case', () => {
      const name = 'angular';
      const transformedName = service.toUpperCase(name);
      expect(transformedName).toBe('ANGULAR');
    });
  });

  describe('toLowerCase', () => {
    it('should transform string to lower case', () => {
      const name = 'ANGULAR';
      const transformedName = service.toLowerCase(name);
      expect(transformedName).toBe('angular');
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter of the string', () => {
      const name = 'angular';
      const transformedName = service.capitalizeFirstLetter(name);
      expect(transformedName).toBe('Angular');
    });
  });
});
