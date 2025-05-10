import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'companies',
    pathMatch: 'full'
  },
  {
    path: 'companies',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/companies/companies.component').then(m => m.CompaniesComponent),
      }
    ]
  }
];
