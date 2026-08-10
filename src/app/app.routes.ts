import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./site/site.module').then((m) => m.SiteModule) },
  { path: 'gestionnaire', loadChildren: () => import('./gestionnaire/gestionnaire.module').then((m) => m.GestionnaireModule) },
  { path: 'manager-dashboard', redirectTo: 'gestionnaire', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'admin-dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
