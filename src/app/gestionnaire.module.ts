import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GestionnaireComponent } from './gestionnaire.component';

@NgModule({
  imports: [
    CommonModule,
    GestionnaireComponent,
    RouterModule.forChild([
      { path: '', component: GestionnaireComponent }
    ])
  ]
})
export class GestionnaireModule {}
