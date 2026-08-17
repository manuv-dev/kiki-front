import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-unified',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-container">
        <!-- Logo au dessus de la carte -->
        <div class="login-brand-top" *ngIf="false"> <!-- Optionnel si on veut le logo en dehors, mais l'image 2 le met DANS la carte -->
        </div>

        <!-- Carte Blanche (Style Image 2) -->
        <div class="login-card">
          <div class="card-top-accent"></div>

          <!-- Logo & Brand dans la carte -->
          <div class="login-brand">
            <div class="brand-logo-img">
              <img src="assets/images/logo.png" alt="Kiki Traiteur" onerror="this.style.display='none'">
            </div>
            <h1 class="brand-name">{{ getLoginTitle() }}</h1>
          </div>

          <!-- Alert messages -->
          <div class="login-alert login-alert-error" *ngIf="errorMessage">
            <i class="fas fa-exclamation-circle"></i>
            {{ errorMessage }}
          </div>
          <div class="login-alert login-alert-warning" *ngIf="sessionExpired">
            <i class="fas fa-clock"></i>
            Votre session a expiré. Veuillez vous reconnecter.
          </div>

          <!-- Formulaire -->
          <form class="login-form" (ngSubmit)="onLogin()" #loginForm="ngForm">
            <div class="form-group">
              <label for="username">IDENTIFIANT OU E-MAIL</label>
              <div class="input-with-icon">
                <i class="fas fa-user input-icon"></i>
                <input
                  id="username"
                  type="text"
                  [(ngModel)]="credentials.username"
                  name="username"
                  placeholder="votre_identifiant"
                  required
                  autocomplete="username"
                  [disabled]="loading"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="password">MOT DE PASSE</label>
              <div class="password-field input-with-icon">
                <i class="fas fa-key input-icon"></i>
                <input
                  id="password"
                  [type]="showPassword ? 'text' : 'password'"
                  [(ngModel)]="credentials.password"
                  name="password"
                  placeholder="••••••••"
                  required
                  autocomplete="current-password"
                  [disabled]="loading"
                >
                <button type="button" class="toggle-pwd" (click)="showPassword = !showPassword">
                  <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
                </button>
              </div>
            </div>

            <div class="forgot-password" *ngIf="isStaffLogin">
               <!-- L'admin/gestionnaire ne peut pas réinitialiser par email dans le MVP, mais on peut laisser l'espace -->
            </div>

            <button
              type="submit"
              class="login-btn"
              [disabled]="loading || !credentials.username || !credentials.password"
              [class.loading]="loading"
            >
              <span *ngIf="!loading">
                <i class="fas fa-sign-in-alt"></i>
                SE CONNECTER
              </span>
              <span *ngIf="loading">
                <i class="fas fa-spinner fa-spin"></i>
                Connexion...
              </span>
            </button>
          </form>

          <!-- Liens selon contexte -->
          <div class="login-links">
            <a routerLink="/" class="back-link">
              <i class="fas fa-arrow-left"></i> Retour au site
            </a>
            <a routerLink="/mykiki/register" class="register-link" *ngIf="!isStaffLogin">
              <i class="fas fa-user-plus"></i> Créer un compte
            </a>
          </div>

          <!-- Accès client séparé si on est sur la route par défaut sans slug -->
          <div class="client-section" *ngIf="!isStaffLogin">
            <div class="login-separator"><span>ou</span></div>
            <a routerLink="/mykiki/login" class="mykiki-btn">
              Espace Client MyKiki
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Outfit', sans-serif;
      background-color: #f3f0ec; /* Fond légèrement beige */
      position: relative;
      padding: 2rem;
    }

    .login-container {
      width: 100%;
      max-width: 440px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .login-card {
      width: 100%;
      background: #ffffff;
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      animation: fadeInUp 0.5s ease;
    }

    .card-top-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #e51d24, #721513);
    }

    .login-brand {
      text-align: center;
      margin-bottom: 2rem;
    }

    .brand-logo-img {
      width: 70px;
      margin: 0 auto 1rem;
    }

    .brand-logo-img img { width: 100%; height: auto; object-fit: contain; }

    .brand-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      font-weight: 600;
      color: #721513;
    }

    .brand-tagline {
      font-size: 0.95rem;
      color: #6b7280;
      margin-top: 0.5rem;
    }

    .login-alert {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .login-alert-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #e51d24;
    }

    .login-alert-warning {
      background: #fffbeb;
      border: 1px solid #fde68a;
      color: #b45309;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-group label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 0.4rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .input-with-icon {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      font-size: 1rem;
      pointer-events: none;
      z-index: 10;
    }

    .input-with-icon input {
      flex: 1;
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      padding-top: 0.85rem !important;
      padding-bottom: 0.85rem !important;
      padding-left: 3rem !important;
      padding-right: 3rem !important;
      background: #ffffff !important;
      border: 1px solid #d1d5db !important;
      border-radius: 6px !important;
      color: #1f2937 !important;
      font-family: 'Outfit', sans-serif !important;
      font-size: 0.95rem !important;
      transition: all 0.2s ease;
      outline: none;
      box-sizing: border-box !important;
      margin: 0 !important;
      display: block !important;
    }

    .input-with-icon input::placeholder { color: #9ca3af; }

    .input-with-icon input:focus {
      border-color: #e51d24 !important;
      box-shadow: 0 0 0 3px rgba(229, 29, 36, 0.1) !important;
    }

    .password-field .toggle-pwd {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: transparent !important;
      border: none !important;
      color: #9ca3af;
      cursor: pointer;
      padding: 0.25rem !important;
      font-size: 1rem;
      transition: color 0.2s;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .password-field .toggle-pwd:hover { color: #4b5563; }

    .forgot-password {
      text-align: left;
      margin-bottom: 1.5rem;
      margin-top: 1.5rem;
    }

    .forgot-password a {
      color: #e51d24;
      font-size: 0.9rem;
      font-weight: 500;
      text-decoration: none;
    }
    .forgot-password a:hover { text-decoration: underline; }

    .login-btn {
      width: 100%;
      padding: 1rem;
      margin-top: 0.5rem;
      background: #e51d24;
      border: none;
      border-radius: 25px;
      color: white;
      font-family: 'Outfit', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      letter-spacing: 0.5px;
    }

    .login-btn:hover:not(:disabled) {
      background: #c5181e;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(229, 29, 36, 0.25);
    }

    .login-btn:active:not(:disabled) { transform: translateY(0); }

    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .login-links {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
    }

    .login-links a {
      font-size: 0.85rem;
      color: #6b7280;
      text-decoration: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .login-links a:hover { color: #374151; text-decoration: underline; }

    .login-separator {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .login-separator::before, .login-separator::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e5e7eb;
    }

    .login-separator span {
      color: #9ca3af;
      font-size: 0.8rem;
    }

    .client-section { text-align: center; }

    .mykiki-btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      width: 100%;
      background: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 25px;
      color: #374151;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: all 0.2s;
    }

    .mykiki-btn:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .login-footer {
      font-size: 0.75rem;
      color: #9ca3af;
      text-align: center;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  loading = false;
  showPassword = false;
  errorMessage = '';
  sessionExpired = false;
  isStaffLogin = false;
  loginSlug = '';
  currentYear = new Date().getFullYear();

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Si déjà connecté, rediriger
    if (this.auth.isLoggedIn()) {
      this.redirectByRole();
      return;
    }

    // Détecter slug personnalisé dans l'URL
    this.route.params.subscribe(params => {
      if (params['slug']) {
        this.loginSlug = params['slug'];
        this.isStaffLogin = true;
      }
    });

    // Détecter session expirée
    this.route.queryParams.subscribe(params => {
      this.sessionExpired = !!params['expired'];
    });
  }

  onLogin(): void {
    if (!this.credentials.username || !this.credentials.password) return;

    this.loading = true;
    this.errorMessage = '';

    this.auth.login(
      this.credentials.username,
      this.credentials.password,
      this.loginSlug || undefined
    ).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.tempPasswordChangeRequired) {
          this.router.navigate(['/change-password']);
        } else {
          this.redirectByRole();
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Identifiants incorrects. Vérifiez vos informations.';
      }
    });
  }

  private redirectByRole(): void {
    const user = this.auth.getCurrentUser();
    if (!user) { this.router.navigate(['/']); return; }

    switch (user.role) {
      case 'ADMIN':
      case 'GESTIONNAIRE':
      case 'PERSONNEL':
        this.router.navigate(['/gestionnaire/dashboard']);
        break;
      case 'CLIENT':
        this.router.navigate(['/mykiki']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  getLoginTitle(): string {
    return 'Connexion';
  }

  getLoginSubtitle(): string {
    return '';
  }
}
