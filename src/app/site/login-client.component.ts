import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

          <div class="forgot-pwd-wrap">
            <a href="javascript:void(0)" class="forgot-pwd-link" (click)="forgotPassword()">Mot de passe oublié ?</a>
          </div>

          <button type="submit" class="btn-login-red">
            <i class="fas fa-sign-in-alt me-2"></i> SE CONNECTER
          </button>
        </form>

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

    .forgot-pwd-wrap {
      display: flex;
      justify-content: flex-start;
      margin-top: -0.25rem;
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

    @media (max-width: 576px) {
      .login-card {
        padding: 2rem 1.5rem;
      }
    }
    `
  ]
})
export class LoginClientComponent {
  email = '';
  password = '';
  message = '';
  isError = false;

  constructor(private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.isError = true;
      this.message = 'Veuillez saisir votre email et votre mot de passe.';
      return;
    }
    // Simulate authentication
    this.isError = false;
    this.message = 'Connexion réussie ! Redirection...';
    setTimeout(() => {
      // Navigate to client dashboard or home
      this.router.navigate(['/']);
    }, 1200);
  }

  forgotPassword(): void {
    this.isError = false;
    this.message = 'Un email de réinitialisation vous a été envoyé.';
  }
}

