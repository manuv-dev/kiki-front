import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SiteComponent } from './site.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { PrestationsComponent } from './prestations.component';
import { RealisationsComponent } from './realisations.component';
import { ContactComponent } from './contact.component';
import { LoginClientComponent } from './login-client.component';
import { LoginStaffComponent } from './login-staff.component';
import { DevisComponent } from './devis.component';
import { AuthComponent } from './auth.component';
import { MentionsLegalesComponent } from './mentions-legales.component';
import { PolitiqueConfidentialiteComponent } from './politique-confidentialite.component';

@NgModule({
  imports: [
    CommonModule,
    SiteComponent,
    HomeComponent,
    AboutComponent,
    PrestationsComponent,
    RealisationsComponent,
    ContactComponent,
    LoginClientComponent,
    LoginStaffComponent,
    DevisComponent,
    AuthComponent,
    MentionsLegalesComponent,
    PolitiqueConfidentialiteComponent,
    RouterModule.forChild([
      {
        path: '',
        component: SiteComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'a-propos', component: AboutComponent },
          { path: 'prestations', component: PrestationsComponent },
          { path: 'realisations', component: RealisationsComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'login-client', component: LoginClientComponent },
          { path: 'login', redirectTo: 'login-client', pathMatch: 'full' },
          { path: 'auth', redirectTo: 'login-client', pathMatch: 'full' },
          { path: 'login-staff', component: LoginStaffComponent },
          { path: 'admin-login', component: LoginStaffComponent },
          { path: 'kiki-admin', component: LoginStaffComponent },
          { path: 'gestionnaire-login', component: LoginStaffComponent },
          { path: 'devis', component: DevisComponent },
          { path: 'mentions-legales', component: MentionsLegalesComponent },
          { path: 'politique-confidentialite', component: PolitiqueConfidentialiteComponent }
        ]
      }
    ])
  ]
})
export class SiteModule {}
