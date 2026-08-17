import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cp-page">
      <div class="cp-bg"><div class="cp-blob"></div></div>
      <div class="cp-container">
        <div class="cp-card">
          <div class="cp-icon"><i class="fas fa-key"></i></div>
          <h2>Changement de mot de passe</h2>
          <p class="cp-hint" *ngIf="isForced">
            <i class="fas fa-exclamation-triangle"></i>
            Votre compte utilise un mot de passe temporaire. Veuillez le changer avant de continuer.
          </p>

          <div class="cp-error" *ngIf="error">
            <i class="fas fa-times-circle"></i> {{ error }}
          </div>
          <div class="cp-success" *ngIf="success">
            <i class="fas fa-check-circle"></i> Mot de passe changé ! Redirection...
          </div>

          <form (ngSubmit)="onSubmit()" *ngIf="!success">
            <div class="field" *ngIf="!isForced">
              <label>Mot de passe actuel</label>
              <input type="password" [(ngModel)]="current" name="current" placeholder="••••••••">
            </div>
            <div class="field">
              <label>Nouveau mot de passe</label>
              <div class="pwd-wrap">
                <input [type]="showNew ? 'text' : 'password'" [(ngModel)]="newPwd" name="new" placeholder="Minimum 8 caractères">
                <button type="button" (click)="showNew = !showNew"><i class="fas" [class.fa-eye]="!showNew" [class.fa-eye-slash]="showNew"></i></button>
              </div>
              <div class="strength-bar"><div [class]="getStrengthClass()"></div></div>
            </div>
            <div class="field">
              <label>Confirmer le mot de passe</label>
              <input type="password" [(ngModel)]="confirm" name="confirm" placeholder="Répétez le mot de passe">
            </div>
            <button type="submit" class="submit-btn" [disabled]="loading || !newPwd || newPwd !== confirm">
              <span *ngIf="!loading"><i class="fas fa-save"></i> Enregistrer</span>
              <span *ngIf="loading"><i class="fas fa-spinner fa-spin"></i></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .cp-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a0a0f, #2d1218); font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; padding: 2rem; }
    .cp-bg { position: absolute; inset: 0; }
    .cp-blob { position: absolute; width: 400px; height: 400px; background: radial-gradient(#8b2240, transparent); border-radius: 50%; filter: blur(80px); opacity: 0.2; top: -100px; left: 50%; transform: translateX(-50%); }
    .cp-container { position: relative; z-index: 1; width: 100%; max-width: 420px; }
    .cp-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 2.5rem; box-shadow: 0 25px 50px rgba(0,0,0,0.4); }
    .cp-icon { width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, #8b2240, #c45d2a); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin: 0 auto 1.5rem; }
    h2 { text-align: center; color: white; font-size: 1.3rem; margin-bottom: 0.75rem; }
    .cp-hint { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3); color: #fcd34d; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
    .cp-error { background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.3); color: #fca5a5; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1rem; }
    .cp-success { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #86efac; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1rem; }
    .field { margin-bottom: 1.1rem; }
    .field label { display: block; color: rgba(255,255,255,0.6); font-size: 0.82rem; margin-bottom: 0.35rem; }
    .field input { width: 100%; padding: 0.8rem 1rem; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-size: 0.9rem; outline: none; transition: border-color 0.2s; font-family: 'Outfit', sans-serif; }
    .field input:focus { border-color: #c45d2a; box-shadow: 0 0 0 3px rgba(196,93,42,0.15); }
    .field input::placeholder { color: rgba(255,255,255,0.25); }
    .pwd-wrap { position: relative; }
    .pwd-wrap input { padding-right: 3rem; }
    .pwd-wrap button { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: rgba(255,255,255,0.4); cursor: pointer; }
    .strength-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 0.4rem; overflow: hidden; }
    .strength-bar div { height: 100%; transition: all 0.3s; }
    .weak { width: 33%; background: #ef4444; }
    .medium { width: 66%; background: #f59e0b; }
    .strong { width: 100%; background: #22c55e; }
    .submit-btn { width: 100%; padding: 0.95rem; background: linear-gradient(135deg, #8b2240, #c45d2a); border: none; border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 0.5rem; }
    .submit-btn:hover:not(:disabled) { transform: translateY(-2px); }
    .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class ChangePasswordComponent {
  current = '';
  newPwd = '';
  confirm = '';
  loading = false;
  error = '';
  success = false;
  showNew = false;

  get isForced(): boolean {
    return !!this.auth.getCurrentUser()?.tempPasswordChangeRequired;
  }

  constructor(private auth: AuthService, private router: Router) {}

  getStrengthClass(): string {
    if (!this.newPwd) return '';
    if (this.newPwd.length < 8) return 'weak';
    if (this.newPwd.length >= 8 && (/[A-Z]/.test(this.newPwd) || /[0-9]/.test(this.newPwd))) return 'medium';
    return 'strong';
  }

  onSubmit(): void {
    if (this.newPwd !== this.confirm) { this.error = 'Les mots de passe ne correspondent pas.'; return; }
    if (this.newPwd.length < 8) { this.error = 'Le mot de passe doit contenir au moins 8 caractères.'; return; }

    this.loading = true;
    this.error = '';

    this.auth.changePassword(this.current, this.newPwd).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        setTimeout(() => {
          const user = this.auth.getCurrentUser();
          if (user?.role === 'CLIENT') this.router.navigate(['/mykiki']);
          else this.router.navigate(['/gestionnaire/dashboard']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Erreur lors du changement de mot de passe.';
      }
    });
  }
}
