import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { SKILLS } from '../../mock/mock-skills';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit, OnChanges {
  @Input() employee?: Employee;
  @Input() managers?: string[];
  @Output() employeeUpdated = new EventEmitter<Employee>();
  @Output() closed = new EventEmitter<void>();
  @Output() newEmployeeCreated = new EventEmitter<Employee>();
  employeeForm!: FormGroup;
  isFormVisible = false;
  availableSkills = SKILLS;
  isCreatingNewEmployee = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.initForm();
      this.hideForm();
      this.isCreatingNewEmployee = false;
    }
  }

  initForm(): void {
    this.employeeForm = this.formBuilder.group({
      name: [this.employee?.name || '', Validators.required],
      surname: [this.employee?.surname || '', Validators.required],
      skills: [this.employee?.skills || [], Validators.required],
      hireDate: [this.employee?.hireDate || '', Validators.required],
      manager: [this.employee?.manager || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: Employee = {
        ...this.employee,
        ...this.employeeForm.value,
      };

      if (this.isCreatingNewEmployee) {
        this.isCreatingNewEmployee = false;
        this.newEmployeeCreated.emit(updatedEmployee);
      } else {
        this.employeeUpdated.emit(updatedEmployee);
      }

      this.isFormVisible = false;
      this.employee = undefined;
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
    this.closed.emit();
  }

  onReset(): void {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    } else {
      this.employeeForm.patchValue({});
    }
  }

  onAddEmployee(): void {
    this.employee = { name: '', surname: '', skills: [], hireDate: '', manager: '' };
    this.isCreatingNewEmployee = true;
    this.isFormVisible = true;
    this.initForm();
  }
}
