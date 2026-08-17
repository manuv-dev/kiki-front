import { Routes } from '@angular/router';
import { authGuard, clientGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // =============================================
  // SITE PUBLIC (vitrine + MyKiki)
  // =============================================
  {
    path: '',
    loadChildren: () => import('./site/site.module').then((m) => m.SiteModule)
  },

  // =============================================
  // LOGIN UNIFIÉ
  // =============================================
  {
    path: 'login',
    loadComponent: () => import('./site/login-unified/login.component').then(m => m.LoginComponent)
  },
  {
    // Accès via slug personnalisé : /login/admin-kiki-secure-abc123
    path: 'login/:slug',
    loadComponent: () => import('./site/login-unified/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./site/change-password/change-password.component').then(m => m.ChangePasswordComponent)
  },

  // =============================================
  // ESPACE CLIENT MYKIKI
  // =============================================
  {
    path: 'mykiki',
    canActivate: [clientGuard],
    loadChildren: () => import('./site/mykiki/mykiki.module').then((m) => m.MyKikiModule)
  },
  {
    path: 'mykiki/login',
    loadComponent: () => import('./site/mykiki/mykiki-login.component').then(m => m.MyKikiLoginComponent)
  },
  {
    path: 'mykiki/register',
    loadComponent: () => import('./site/mykiki/mykiki-register.component').then(m => m.MyKikiRegisterComponent)
  },

  // =============================================
  // BACK-OFFICE GESTIONNAIRE / ADMIN
  // =============================================
  {
    path: 'gestionnaire',
    canActivate: [authGuard],
    loadChildren: () => import('./gestionnaire/gestionnaire.module').then((m) => m.GestionnaireModule)
  },

  // Redirections de compatibilité
  { path: 'manager-dashboard', redirectTo: 'gestionnaire', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'gestionnaire', pathMatch: 'full' },

  // Wildcard
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

