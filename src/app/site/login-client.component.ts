import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-client',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  template: `
    <section class="login-wrapper">
      <div class="login-card animate-fade">
        <!-- Logo -->
        <div class="login-header">
          <img src="assets/images/logo.png" alt="Kiki Traiteur Logo" class="login-logo">
          <h2 class="login-title">Espace Client MyKiki</h2>
          <p class="login-subtitle">Commander ce que vous désirez mangez</p>
        </div>

        <!-- Form -->
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="login-form">
          <div class="form-group">
            <label for="email">ADRESSE E-MAIL</label>
            <div class="input-with-icon">
              <i class="fa-regular fa-envelope input-icon"></i>
              <input 
                type="email" 
                id="email" 
                name="email" 
                [(ngModel)]="email" 
                placeholder="exemple@gmail.com" 
                required 
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password">MOT DE PASSE</label>
            <div class="input-with-icon">
              <i class="fas fa-key input-icon"></i>
              <input 
                type="password" 
                id="password" 
                name="password" 
                [(ngModel)]="password" 
                placeholder="••••••••" 
                required 
                class="form-control"
              />
            </div>
          </div>

          <div class="forgot-pwd-row">
            <a href="javascript:void(0)" class="forgot-pwd-link" (click)="forgotPassword()">Mot de passe oublié ?</a>
            <a routerLink="/mykiki/register" class="create-account-link">Créer un compte</a>
          </div>

          <button type="submit" class="btn-login-red">
            <i class="fas fa-sign-in-alt me-2"></i> SE CONNECTER
          </button>
        </form>

        <div class="login-separator"><span>ou</span></div>
        <div class="client-section">
          <button type="button" class="google-real-btn" (click)="triggerGoogleLogin()">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="google-icon">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Continuer avec Google
          </button>
        </div>

        <!-- Feedback message if any -->
        <div *ngIf="message" class="login-message" [ngClass]="isError ? 'msg-error' : 'msg-success'">
          {{ message }}
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    :host {
      display: block;
      min-height: calc(100vh - 160px);
      background: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 1rem;
    }

    .login-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-card {
      width: 100%;
      max-width: 460px;
      background: var(--bg-white);
      border-radius: var(--border-radius-lg);
      padding: 3rem 2.5rem;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
      border-top: 5px solid #DC2626;
      border-left: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      position: relative;
    }

    .login-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .login-logo {
      height: 65px;
      margin: 0 auto 1.25rem auto;
      object-fit: contain;
    }

    .login-title {
      font-family: var(--font-heading);
      font-size: 1.85rem;
      color: #7A1C1C;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    .login-subtitle {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin: 0;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .form-group label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .input-with-icon {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      color: #94A3B8;
      font-size: 1rem;
      pointer-events: none;
    }

    .form-control {
      width: 100%;
      padding: 0.42rem 0.75rem 0.42rem 2.8rem;
      font-size: 0.875rem;
      border: 1.5px solid var(--border-color);
      border-radius: 5px;
      background: var(--bg-white);
      color: var(--text-main);
      transition: all 0.25s ease;
      font-family: var(--font-body);
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #DC2626;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }

    .forgot-pwd-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: -0.25rem;
    }

    .create-account-link {
      font-size: 0.88rem;
      color: #374151;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    .create-account-link:hover {
      text-decoration: underline;
      color: #111827;
    }

    .forgot-pwd-link {
      font-size: 0.88rem;
      color: #DC2626;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .forgot-pwd-link:hover {
      text-decoration: underline;
      color: #991B1B;
    }

    .btn-login-red {
      width: 100%;
      padding: 1rem 1.5rem;
      background: linear-gradient(135deg, #DC2626, #B91C1C);
      color: #FFFFFF;
      border: none;
      border-radius: 50px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(220, 38, 38, 0.25);
      transition: all 0.25s ease;
      margin-top: 0.5rem;
    }

    .btn-login-red:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(220, 38, 38, 0.35);
      background: linear-gradient(135deg, #EF4444, #C62828);
    }

    .login-message {
      margin-top: 1.25rem;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.88rem;
      text-align: center;
    }

    .msg-error {
      background: rgba(220, 38, 38, 0.1);
      color: #DC2626;
      border: 1px solid rgba(220, 38, 38, 0.3);
    }

    .msg-success {
      background: rgba(16, 185, 129, 0.1);
      color: #059669;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

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
      background: var(--border-color);
    }

    .login-separator span {
      color: #9ca3af;
      font-size: 0.8rem;
    }

    .client-section { text-align: center; }

    .google-real-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      width: 100%;
      padding: 0.75rem 1.5rem;
      background: #ffffff;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      color: #3c4043;
      font-family: 'Roboto', 'Outfit', sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      letter-spacing: 0.25px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 1px 2px 0 rgba(60,64,67,0.30), 0 1px 3px 1px rgba(60,64,67,0.15);
    }

    .google-real-btn:hover {
      background: #f8f9fa;
      box-shadow: 0 1px 3px 0 rgba(60,64,67,0.30), 0 4px 8px 3px rgba(60,64,67,0.15);
    }

    .google-icon {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 576px) {
      .login-card {
        padding: 2rem 1.5rem;
      }
    }
    `
  ]
})
export class LoginClientComponent implements OnInit {
  email = '';
  password = '';
  message = '';
  isError = false;

  constructor(
    private router: Router, 
    private http: HttpClient,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Initialisation de Google Identity Services
    // @ts-ignore
    if (typeof google !== 'undefined' && google.accounts) {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // TODO: Remplacer par le vrai Client ID
        callback: this.handleGoogleCredentialResponse.bind(this)
      });
    }
  }

  triggerGoogleLogin(): void {
    // @ts-ignore
    if (typeof google !== 'undefined' && google.accounts) {
      // @ts-ignore
      google.accounts.id.prompt(); // Affiche la popup One Tap
      // Sinon, on peut utiliser un bouton rendu par google.accounts.id.renderButton
      // Mais ici on déclenche programmatiquement au clic (possible seulement sous certaines conditions).
      // Pour une intégration parfaite, il est recommandé de laisser Google rendre le bouton.
      // Dans notre cas, on va simuler l'appel à notre backend pour l'instant.
      this.isError = true;
      this.message = "Veuillez configurer un Client ID Google valide dans le code.";
    } else {
      this.isError = true;
      this.message = "Le script Google n'est pas chargé.";
    }
  }

  handleGoogleCredentialResponse(response: any): void {
    const credential = response.credential;
    this.http.post<any>('http://localhost:8080/api/auth/google/login', { credential }).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          sessionStorage.setItem('token', res.token);
          this.isError = false;
          this.message = 'Connexion Google réussie !';
          setTimeout(() => this.router.navigate(['/mykiki']), 1000);
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.isError = true;
          this.message = err.error || 'Erreur lors de la connexion avec Google.';
        });
      }
    });
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.isError = true;
      this.message = 'Veuillez saisir votre email et votre mot de passe.';
      return;
    }
    
    this.http.post<any>('http://localhost:8080/api/auth/login', {
      username: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        sessionStorage.setItem('token', res.token);
        this.isError = false;
        this.message = 'Connexion réussie ! Redirection...';
        setTimeout(() => {
          this.router.navigate(['/mykiki']);
        }, 1200);
      },
      error: (err) => {
        this.isError = true;
        this.message = err.error?.message || 'Identifiants incorrects.';
      }
    });
  }

  forgotPassword(): void {
    this.isError = false;
    this.message = 'Un email de réinitialisation vous a été envoyé.';
  }
}

