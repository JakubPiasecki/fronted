import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { SKILLS } from '../../mock/mock-skills';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit, OnChanges {
  @Input() employee?: Employee;
  managers: Employee[] = [];
  @Output() employeeUpdated = new EventEmitter<Employee>();
  @Output() closed = new EventEmitter<void>();
  @Output() newEmployeeCreated = new EventEmitter<Employee>();
  employeeForm!: FormGroup;
  isFormVisible = false;
  availableSkills = SKILLS;
  isCreatingNewEmployee = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] === 'create') {
        this.onAddEmployee();
      } else {
        this.getEmployee();
        this.getManagers();
      }
    });
    this.initForm();
  }

  getEmployee(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')).toString();
    this.employeeService
      .getEmployee(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employee) => (this.employee = employee));
  }

  getManagers(): void {
    this.employeeService
      .getManagers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((managers) => (this.managers = managers));
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
      hireDate: [this.employee?.hireDate ? new Date(this.employee.hireDate) : null, Validators.required],
      manager: [this.employee?.manager || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: Employee = {
        ...this.employee,
        ...this.employeeForm.value,
        hireDate: new Date(this.employeeForm.value.hireDate),
      };
      if (this.isCreatingNewEmployee) {
        this.employeeService.createEmployee(updatedEmployee).subscribe(() => {
          this.router.navigate(['/employees']);
          this.newEmployeeCreated.emit(updatedEmployee);
        });
      } else {
        this.employeeService.updateEmployee(updatedEmployee).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }
    }
  }

  onEdit(): void {
    this.initForm();
    this.isFormVisible = true;
  }

  hideForm(): void {
    this.isFormVisible = false;
  }

  onClose(): void {
    this.hideForm();
    this.employee = undefined;
    this.location.back();
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
    this.employee = { name: '', surname: '', skills: [], hireDate: new Date(), manager: '' };
    this.isCreatingNewEmployee = true;
    this.isFormVisible = true;
    this.initForm();
    this.getManagers();
  }

  onDelete(id: string | undefined) {
    this.employeeService.deleteEmployee(id);
    this.location.back();
  }
}
