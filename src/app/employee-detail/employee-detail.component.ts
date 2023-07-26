import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit, OnChanges {
  @Input() employee?: Employee;
  @Output() employeeUpdated = new EventEmitter<Employee>();
  @Output() closed = new EventEmitter<void>();
  employeeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.initForm();
    }
  }

  initForm(): void {
    this.employeeForm = this.formBuilder.group({
      name: [this.employee?.name || '', Validators.required],
      surname: [this.employee?.surname || '', Validators.required],
      skills: [this.employee?.skills || '', Validators.required],
      hireDate: [this.employee?.hireDate || '', Validators.required],
      manager: [this.employee?.manager || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid && this.employee) {
      const updatedEmployee: Employee = {
        ...this.employee,
        ...this.employeeForm.value,
      };
      this.employeeUpdated.emit(updatedEmployee);
    } else {
      this.closed.emit();
    }
  }

  onClose(): void {
    this.closed.emit();
  }
}
