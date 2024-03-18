import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationModule } from '../navigation/navigation.module';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [DashboardComponent, EmployeeSearchComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    TranslateModule,
    NavigationModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class DashboardModule {}
