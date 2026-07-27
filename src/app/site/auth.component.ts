import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>Espaces Privés</h1>
        <p style="color: var(--text-muted); font-size: 1rem; margin-top: 0.5rem;">Veuillez sélectionner le portail correspondant à votre profil pour tester l'application.</p>
      </div>
    </section>

    <!-- Roles Gate Selector -->
    <section class="section-padding" style="background-color: var(--bg-secondary);">
      <div class="container">
        <div class="auth-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 900px; margin: 3rem auto 0 auto;">
          
          <!-- Space 1: Client MyKiki -->
          <div class="auth-card animate-fade" style="padding: 2.5rem 1.5rem;">
            <div class="auth-icon" style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 1rem;"><i class="fa-regular fa-user"></i></div>
            <h3 class="auth-title">Espace Client MyKiki</h3>
            <p class="auth-desc">Suivez vos demandes de devis en cours, consultez vos contrats d'événements et échangez directement avec notre équipe.</p>
            <a routerLink="/login-client" class="btn-header-mykiki" style="width: 100%; justify-content: center;">Accéder au Portail Client</a>
          </div>

          <!-- Space 2: Staff / Administrateurs -->
          <div class="auth-card animate-fade delay-1" style="padding: 2.5rem 1.5rem;">
            <div class="auth-icon" style="font-size: 2.5rem; color: var(--primary-dark); margin-bottom: 1rem;"><i class="fa-solid fa-lock"></i></div>
            <h3 class="auth-title">Espace Professionnel</h3>
            <p class="auth-desc">Accès réservé pour l'administration du Back-Office, la gestion des plannings, la facturation et le chiffrage des devis.</p>
            <a routerLink="/login-staff" class="btn-header-connexion" style="width: 100%; justify-content: center;">Se connecter au Back-Office</a>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [
    `
    :host { display: block; }
    .auth-grid {
      display: grid;
      gap: 2rem;
    }
    .auth-card {
      background: var(--bg-white);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: 3rem 2rem;
      text-align: center;
      transition: var(--transition-normal);
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .auth-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
      border-color: var(--accent-color);
    }
    .auth-icon {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }
    .auth-title {
      font-size: 1.4rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    .auth-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 2rem;
      flex-grow: 1;
    }
    @media (max-width: 992px) {
      .auth-grid {
        grid-template-columns: 1fr !important;
      }
    }
    `
  ]
})
export class AuthComponent {}
