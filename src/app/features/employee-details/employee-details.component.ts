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
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit, OnChanges {
  @Input() employee?: Employee;
  managers: Employee[] = [];
  @Output() employeeUpdated = new EventEmitter<Employee>();
  @Output() closed = new EventEmitter<void>();
  @Output() newEmployeeCreated = new EventEmitter<Employee>();
  employeeForm!: FormGroup;
  isFormVisible = false;
  availableSkills: { id: number; name: string }[] = [];
  isCreatingNewEmployee = false;
  destroyRef = inject(DestroyRef);
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getSkillsFromDatabase();
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
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService
      .getEmployee(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((employee) => {
        this.employee = employee;
        this.isLoading = false;
      });
  }

  getManagers(): void {
    this.employeeService
      .getManagers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((managers) => {
        this.managers = managers;
        this.isLoading = false;
      });
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
      name: [this.employee?.firstName || '', Validators.required],
      surname: [this.employee?.lastName || '', Validators.required],
      skills: [this.employee?.skillsIds || [], Validators.required],
      hireDate: [this.employee?.employmentDate ? new Date(this.employee.employmentDate) : null, Validators.required],
      manager: [this.employee?.managerId || '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValues = this.employeeForm.value;
      const updatedEmployee: Employee = {
        id: this.employee?.id,
        firstName: formValues.name,
        lastName: formValues.surname,
        employmentDate: formValues.hireDate.toISOString(),
        skillsIds: formValues.skills,
        managerId: formValues.manager
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
    this.router.navigate(['/employees']);
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
    this.employee = { firstName: '', lastName: '', skillsIds: [], employmentDate: new Date(), managerId: '' };
    this.isCreatingNewEmployee = true;
    this.isFormVisible = true;
    this.initForm();
    this.getManagers();
  }

  onDelete(id: string | undefined) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.location.back();
    });
  }
  getSkillsFromDatabase(): void {
    this.employeeService.getSkills()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((skills) => {
        this.availableSkills = skills;
        this.isLoading = false;
      });
  }

  getSkillNamesByIds(ids: string[]): string[] {
    return ids.map(id => {
      const skill = this.availableSkills.find(s => s.id === +id);
      return skill ? skill.name : 'Unknown Skill';
    });
  }

  getManagerNameById(id?: string): string {
    if (!id) return 'Unknown Manager';
    const manager = this.managers.find(m => m.id === id);
    return manager ? `${manager.firstName} ${manager.lastName}` : 'Unknown Manager';
  }

}
