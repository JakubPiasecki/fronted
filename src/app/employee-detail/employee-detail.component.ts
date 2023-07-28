import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, OnChanges {
  @Input() employee?: Employee;
  @Input() employees: Employee[] = [];
  @Output() employeesUpdated = new EventEmitter<Employee[]>();
  employeeForm!: FormGroup;
  isFormVisible = false;
  availableSkills = ['skill1', 'skill2', 'skill3'];
  updatedEmployees: Employee[] = [];
  new = false;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.initForm();
      this.hideForm();
    }
  }

  initForm(): void {
    this.employeeForm = this.formBuilder.group({
      name: [this.employee?.name || '', Validators.required],
      surname: [this.employee?.surname || '', Validators.required],
      skills: [this.employee?.skills || [], Validators.required],
      hireDate: [this.employee?.hireDate || '', Validators.required],
      manager: [this.employee?.manager || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.new) {
      const updatedEmployee: Employee = {
        ...this.employee,
        ...this.employeeForm.value
      };
      const updatedEmployees = this.employees.map(emp =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );
      this.employeesUpdated.emit(updatedEmployees);
    } else {
      const updatedEmployee: Employee = {
        ...this.employee,
        ...this.employeeForm.value
      };
      this.employeesUpdated.emit([...this.updatedEmployees,updatedEmployee]);
      this.isFormVisible = false;
      this.employee = undefined;
      this.new = false;
    }
  }

  onEdit(): void {
    this.isFormVisible = true;
  }

  hideForm(): void {
    this.isFormVisible = false;
  }

  onClose(): void {
    this.hideForm();
    this.employee = undefined;
  }

  onReset(): void {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    } else {
      this.employeeForm.patchValue({});
    }
  }


  onAddEmployee(): void {
    const newId = this.generateNewId();
    const newEmployee: Employee = {
      id: newId,
      name: '',
      surname: '',
      skills: [],
      hireDate: '',
      manager: '',
    };

    this.updatedEmployees = [...this.employees];
    this.employee = newEmployee;
    this.new = true;
    this.isFormVisible = true;
    this.initForm();
  }

  private generateNewId(): string {
    const maxIdNumber = this.employees.reduce((max, emp) => (Number(emp.id) > max ? Number(emp.id) : max), 0);
    const newIdNumber = maxIdNumber + 1;
    return newIdNumber.toString();
  }
}
