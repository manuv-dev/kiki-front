import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

const API = 'https://kiki-backend-iuyo.onrender.com';

@Component({
  selector: 'app-mykiki-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  template: `
    <section class="login-wrapper">
      <div class="login-card animate-fade">
        <!-- Logo -->
        <div class="login-header">
          <img src="assets/images/logo.png" alt="Kiki Traiteur Logo" class="login-logo">
          <h2 class="login-title">Créer votre compte MyKiki</h2>
          <p class="login-subtitle">Rejoignez la communauté Kiki Traiteur</p>
        </div>

        <!-- Étapes -->
        <div class="steps-container">
          <div class="step" [class.active]="step === 1" [class.done]="step > 1">
            <div class="step-circle">1</div>
          </div>
          <div class="step-line" [class.active]="step > 1"></div>
          <div class="step" [class.active]="step === 2" [class.done]="step > 2">
            <div class="step-circle">2</div>
          </div>
          <div class="step-line" [class.active]="step > 2"></div>
          <div class="step" [class.active]="step === 3">
            <div class="step-circle">3</div>
          </div>
        </div>

        <!-- Feedback message if any -->
        <div *ngIf="error" class="login-message msg-error" style="margin-bottom: 1.5rem;">
          {{ error }}
        </div>

        <!-- Étape 1 : Informations personnelles -->
        <div *ngIf="step === 1" class="step-content">
          <form class="login-form">
            <div class="form-group">
              <label for="fullName">NOM COMPLET *</label>
              <div class="input-with-icon">
                <i class="fa-regular fa-user input-icon"></i>
                <input type="text" id="fullName" name="fullName" [(ngModel)]="form.fullName" placeholder="Amadou Diallo" required class="form-control" />
              </div>
            </div>

            <div class="form-group">
              <label for="email">ADRESSE E-MAIL *</label>
              <div class="input-with-icon">
                <i class="fa-regular fa-envelope input-icon"></i>
                <input type="email" id="email" name="email" [(ngModel)]="form.email" placeholder="exemple@gmail.com" required class="form-control" />
              </div>
            </div>

            <div class="form-group">
              <label for="phone">TÉLÉPHONE</label>
              <div class="input-with-icon">
                <i class="fa-solid fa-phone input-icon"></i>
                <input type="tel" id="phone" name="phone" [(ngModel)]="form.phone" placeholder="+221 77 000 00 00" class="form-control" />
              </div>
            </div>

            <div class="form-group">
              <label for="type">TYPE DE COMPTE</label>
              <div class="input-with-icon">
                <i class="fa-solid fa-briefcase input-icon"></i>
                <select id="type" name="type" [(ngModel)]="form.type" class="form-control" style="appearance: auto;">
                  <option value="particulier">Particulier</option>
                  <option value="entreprise">Entreprise</option>
                </select>
              </div>
            </div>

            <div class="form-group" *ngIf="form.type === 'entreprise'">
              <label for="organization">NOM DE L'ENTREPRISE</label>
              <div class="input-with-icon">
                <i class="fa-regular fa-building input-icon"></i>
                <input type="text" id="organization" name="organization" [(ngModel)]="form.organization" placeholder="Ma Société SA" class="form-control" />
              </div>
            </div>

            <div class="form-group">
              <label for="password">MOT DE PASSE *</label>
              <div class="input-with-icon">
                <i class="fas fa-key input-icon"></i>
                <input [type]="showPwd ? 'text' : 'password'" id="password" name="password" [(ngModel)]="form.password" placeholder="••••••••" required class="form-control" />
                <button type="button" class="pwd-toggle" (click)="showPwd = !showPwd">
                  <i class="fas" [class.fa-eye]="!showPwd" [class.fa-eye-slash]="showPwd"></i>
                </button>
              </div>
              <div class="pwd-strength" [ngClass]="getPasswordStrengthClass()">
                <div class="strength-bar"></div>
              </div>
              <small class="pwd-label">{{ getPasswordStrengthLabel() }}</small>
            </div>

            <button type="button" class="btn-login-red" (click)="goStep2()" [disabled]="!isStep1Valid()">
              Continuer <i class="fas fa-arrow-right ms-2"></i>
            </button>
          </form>
        </div>

        <!-- Étape 2 : CAPTCHA anti-bot -->
        <div *ngIf="step === 2" class="step-content text-center">
          <h3 class="step-title">Vérification humaine</h3>
          <p class="login-subtitle mb-4">Répondez à cette question simple pour valider votre inscription.</p>

          <div class="captcha-box">
            <div class="captcha-question">
              <i class="fas fa-calculator me-2"></i>
              <span class="captcha-expr">{{ captchaQuestion }}</span>
              <span class="ms-2">= ?</span>
            </div>
            <input type="text" [(ngModel)]="captchaAnswer" placeholder="Votre réponse" class="form-control text-center" style="font-size: 1.2rem; font-weight: bold; width: 150px; margin: 0 auto;" (keydown.enter)="onRegister()">
          </div>

          <div class="d-flex gap-3 mt-4">
            <button type="button" class="btn-outline" (click)="step = 1">
              <i class="fas fa-arrow-left me-2"></i> Retour
            </button>
            <button type="button" class="btn-login-red flex-grow-1" (click)="onRegister()" [disabled]="loading || !captchaAnswer">
              <span *ngIf="!loading"><i class="fas fa-user-plus me-2"></i> Créer mon compte</span>
              <span *ngIf="loading"><i class="fas fa-spinner fa-spin me-2"></i> Création...</span>
            </button>
          </div>
        </div>

        <!-- Étape 3 : Succès -->
        <div *ngIf="step === 3" class="step-content text-center py-4">
          <div class="success-icon mb-3">
            <i class="fas fa-check-circle"></i>
          </div>
          <h3 class="step-title">Compte créé avec succès !</h3>
          <p class="login-subtitle mb-4">Bienvenue dans votre espace MyKiki, <strong>{{ form.fullName }}</strong> !</p>
          <button type="button" class="btn-login-red" (click)="goToMykiki()">
            <i class="fas fa-home me-2"></i> Accéder à mon espace
          </button>
        </div>

        <div class="mt-4 text-center">
          <a routerLink="/mykiki/login" class="forgot-pwd-link">← Retour à la connexion</a>
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
      margin-bottom: 2rem;
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

    /* Steps Tracker */
    .steps-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .step-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #f3f4f6;
      border: 2px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      color: #9ca3af;
      font-weight: 600;
      transition: all 0.3s;
    }

    .step.active .step-circle {
      background: #DC2626;
      border-color: #DC2626;
      color: white;
    }

    .step.done .step-circle {
      background: #fef2f2;
      border-color: #DC2626;
      color: #DC2626;
    }

    .step-line {
      flex: 1;
      max-width: 50px;
      height: 2px;
      background: #e5e7eb;
      margin: 0 10px;
      transition: all 0.3s;
    }
    
    .step-line.active {
      background: #DC2626;
    }

    /* Form Styles */
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .form-group label {
      font-size: 0.75rem;
      font-weight: 700;
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
      padding: 0.5rem 0.75rem 0.5rem 2.8rem;
      font-size: 0.9rem;
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
    
    select.form-control {
      padding-left: 2.8rem !important;
    }

    .pwd-toggle {
      position: absolute;
      right: 1rem;
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
    }

    /* Buttons */
    .btn-login-red {
      width: 100%;
      padding: 0.9rem 1.5rem;
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
    }

    .btn-login-red:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(220, 38, 38, 0.35);
      background: linear-gradient(135deg, #EF4444, #C62828);
    }
    
    .btn-login-red:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-outline {
      padding: 0.9rem 1.5rem;
      background: transparent;
      color: #4b5563;
      border: 1.5px solid #d1d5db;
      border-radius: 50px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .btn-outline:hover {
      background: #f3f4f6;
      color: #111827;
    }

    /* Separator */
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

    /* Google Button */
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

    /* Messages */
    .login-message {
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

    /* Utilities */
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

    .text-center { text-align: center; }
    .mb-4 { margin-bottom: 1.5rem; }
    .mt-4 { margin-top: 1.5rem; }
    .mb-3 { margin-bottom: 1rem; }
    .me-2 { margin-right: 0.5rem; }
    .ms-2 { margin-left: 0.5rem; }
    .d-flex { display: flex; }
    .gap-3 { gap: 1rem; }
    .flex-grow-1 { flex-grow: 1; }
    
    .pwd-strength { height: 4px; background: #e5e7eb; border-radius: 2px; margin-top: 0.2rem; overflow: hidden; }
    .pwd-strength .strength-bar { height: 100%; transition: all 0.3s; }
    .pwd-strength.weak .strength-bar { width: 33%; background: #ef4444; }
    .pwd-strength.medium .strength-bar { width: 66%; background: #f59e0b; }
    .pwd-strength.strong .strength-bar { width: 100%; background: #10b981; }
    .pwd-label { color: #6b7280; font-size: 0.75rem; margin-top: 0.2rem; display: block;}

    .captcha-box {
      background: #f9fafb;
      border: 1px dashed #d1d5db;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .captcha-question {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 1rem;
    }
    
    .captcha-expr {
      color: #DC2626;
    }
    
    .success-icon {
      font-size: 4rem;
      color: #10b981;
      animation: popIn 0.5s ease;
    }
    
    @keyframes popIn { 0% { transform: scale(0); opacity: 0; } 80% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }

    @media (max-width: 576px) {
      .login-card {
        padding: 2rem 1.5rem;
      }
    }
    `
  ]
})
export class MyKikiRegisterComponent implements OnInit {
  step = 1;
  loading = false;
  error = '';
  showPwd = false;

  form = {
    fullName: '',
    email: '',
    phone: '',
    type: 'particulier',
    organization: '',
    password: ''
  };

  // CAPTCHA mathématique local (aucun appel backend)
  captchaQuestion = '';
  captchaAnswer: string = '';
  private captchaExpectedAnswer = 0;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
    
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
      google.accounts.id.prompt(); 
      this.error = "Veuillez configurer un Client ID Google valide dans le code si la popup ne s'affiche pas.";
    } else {
      this.error = "Le script Google n'est pas chargé.";
    }
  }

  handleGoogleCredentialResponse(response: any): void {
    const credential = response.credential;
    this.loading = true;
    this.http.post<any>('https://kiki-backend-iuyo.onrender.com/api/auth/google/login', { credential }).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          sessionStorage.setItem('token', res.token);
          this.loading = false;
          this.step = 3;
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.loading = false;
          this.error = err.error || 'Erreur lors de la connexion avec Google.';
        });
      }
    });
  }

  generateCaptcha(): void {
    // Génération locale — aucun appel réseau
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const useAddition = Math.random() > 0.5;

    if (useAddition) {
      this.captchaQuestion = `${a} + ${b}`;
      this.captchaExpectedAnswer = a + b;
    } else {
      // Toujours positif pour éviter la confusion
      const max = Math.max(a, b);
      const min = Math.min(a, b);
      this.captchaQuestion = `${max} − ${min}`;
      this.captchaExpectedAnswer = max - min;
    }

    this.captchaAnswer = '';
    this.error = '';
  }

  isStep1Valid(): boolean {
    return !!(this.form.fullName && this.form.email && this.form.password && this.form.password.length >= 8);
  }

  goStep2(): void {
    if (this.isStep1Valid()) {
      this.error = '';
      this.step = 2;
      // Fetch captcha again to make sure it's fresh
      this.generateCaptcha();
    }
  }

  getPasswordStrengthClass(): string {
    const p = this.form.password;
    if (!p) return '';
    if (p.length < 8) return 'weak';
    if (p.length >= 8 && (/[A-Z]/.test(p) || /[0-9]/.test(p))) return 'medium';
    if (p.length >= 10 && /[A-Z]/.test(p) && /[0-9]/.test(p)) return 'strong';
    return 'medium';
  }

  getPasswordStrengthLabel(): string {
    const cls = this.getPasswordStrengthClass();
    return { '': '', weak: 'Faible (min 8 caractères)', medium: 'Moyen', strong: 'Fort ✓' }[cls] || '';
  }

  onRegister(): void {
    // Validation du captcha local avant envoi
    if (parseInt(this.captchaAnswer, 10) !== this.captchaExpectedAnswer) {
      this.error = 'Réponse incorrecte au captcha. Veuillez réessayer.';
      this.generateCaptcha();
      return;
    }

    this.loading = true;
    this.error = '';

    const payload = {
      fullName: this.form.fullName,
      email: this.form.email,
      phone: this.form.phone,
      type: this.form.type,
      organization: this.form.organization,
      password: this.form.password
    };

    this.http.post<any>(`${API}/api/mykiki/register`, payload).subscribe({
      next: () => {
        this.loading = false;
        // Auto-login après inscription
        this.auth.login(this.form.email, this.form.password).subscribe({
          next: () => { this.step = 3; },
          error: () => { this.step = 3; } // Succès même si auto-login échoue
        });
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Erreur lors de la création du compte. Veuillez réessayer.';
        this.generateCaptcha();
      }
    });
  }

  goToMykiki(): void {
    this.router.navigate(['/mykiki']);
  }
}
