import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./features/employee-detail/employee-detail.module').then((m) => m.EmployeeDetailModule),
  },
  {
    path: 'employees',
    loadChildren: () => import('./features/employees/employees.module').then((m) => m.EmployeesModule),
  },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
