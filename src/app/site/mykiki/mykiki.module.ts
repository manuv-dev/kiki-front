import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./mykiki-home.component').then(m => m.MyKikiHomeComponent)
  },
  {
    path: 'profil',
    loadComponent: () => import('./mykiki-profil.component').then(m => m.MyKikiProfilComponent)
  },
  {
    path: 'propositions',
    loadComponent: () => import('./mykiki-propositions.component').then(m => m.MyKikiPropositionsComponent)
  },
  {
    path: 'demandes',
    loadComponent: () => import('./mykiki-demandes.component').then(m => m.MyKikiDemandesComponent)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyKikiModule {}
