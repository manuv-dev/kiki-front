import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

const API = 'https://kiki-backend-iuyo.onrender.com';

@Component({
  selector: 'app-mykiki-profil',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mk-page" style="font-family: 'Outfit', sans-serif;">
      <div style="margin-bottom: 2rem;">
        <h1 style="color: white; font-size: 1.6rem; font-weight: 700;">Mon Profil</h1>
        <p style="color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-top: 0.25rem;">
          Gérez vos informations personnelles
        </p>
      </div>

      <div *ngIf="loading" style="color: rgba(255,255,255,0.5); padding: 2rem;">
        <i class="fas fa-spinner fa-spin"></i> Chargement...
      </div>

      <div style="display: grid; gap: 1.5rem; max-width: 640px;" *ngIf="!loading">
        <!-- Avatar & infos -->
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2rem;">
          <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #8b2240, #c45d2a); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 700; color: white;">
              {{ getInitials() }}
            </div>
            <div>
              <h3 style="color: white; font-size: 1.1rem;">{{ profil.fullName || profil.name }}</h3>
              <p style="color: rgba(255,255,255,0.45); font-size: 0.85rem; margin-top: 0.2rem;">{{ profil.email || user?.username }}</p>
              <span style="display: inline-block; margin-top: 0.35rem; padding: 0.2rem 0.6rem; background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3); border-radius: 50px; font-size: 0.7rem; color: #86efac;">
                Client MyKiki
              </span>
            </div>
          </div>

          <!-- Formulaire -->
          <div *ngIf="!editMode">
            <div class="info-row" *ngFor="let item of infoItems" style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span style="color: rgba(255,255,255,0.45); font-size: 0.85rem;">{{ item.label }}</span>
              <span style="color: white; font-size: 0.85rem; font-weight: 500;">{{ item.value || '—' }}</span>
            </div>
            <button (click)="editMode = true" style="margin-top: 1.25rem; padding: 0.65rem 1.25rem; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: rgba(255,255,255,0.8); cursor: pointer; font-size: 0.875rem; display: flex; align-items: center; gap: 0.4rem; font-family: 'Outfit', sans-serif; transition: all 0.2s;">
              <i class="fas fa-pencil-alt"></i> Modifier mes informations
            </button>
          </div>

          <!-- Mode édition -->
          <div *ngIf="editMode">
            <div style="margin-bottom: 1rem;">
              <label style="display: block; color: rgba(255,255,255,0.6); font-size: 0.82rem; margin-bottom: 0.35rem;">Nom complet</label>
              <input type="text" [(ngModel)]="formData.name" style="width: 100%; padding: 0.8rem 1rem; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem; outline: none;">
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; color: rgba(255,255,255,0.6); font-size: 0.82rem; margin-bottom: 0.35rem;">Téléphone</label>
              <input type="tel" [(ngModel)]="formData.phone" style="width: 100%; padding: 0.8rem 1rem; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem; outline: none;">
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; color: rgba(255,255,255,0.6); font-size: 0.82rem; margin-bottom: 0.35rem;">Type de compte</label>
              <select [(ngModel)]="formData.type" style="width: 100%; padding: 0.8rem 1rem; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem; outline: none;">
                <option value="particulier" style="background: #1a1a1a;">Particulier</option>
                <option value="entreprise" style="background: #1a1a1a;">Entreprise</option>
              </select>
            </div>
            <div style="margin-bottom: 1.5rem;" *ngIf="formData.type === 'entreprise'">
              <label style="display: block; color: rgba(255,255,255,0.6); font-size: 0.82rem; margin-bottom: 0.35rem;">Nom de l'entreprise</label>
              <input type="text" [(ngModel)]="formData.organization" style="width: 100%; padding: 0.8rem 1rem; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem; outline: none;">
            </div>

            <div *ngIf="saveSuccess" style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); color: #86efac; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1rem;">
              <i class="fas fa-check-circle"></i> Profil mis à jour !
            </div>

            <div style="display: flex; gap: 0.75rem;">
              <button (click)="saveProfil()" style="flex: 2; padding: 0.85rem; background: linear-gradient(135deg, #22c55e, #16a34a); border: none; border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 600; cursor: pointer;">
                <i class="fas fa-save"></i> Enregistrer
              </button>
              <button (click)="editMode = false" style="flex: 1; padding: 0.85rem; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; color: rgba(255,255,255,0.7); font-family: 'Outfit', sans-serif; font-size: 0.9rem; cursor: pointer;">
                Annuler
              </button>
            </div>
          </div>
        </div>

        <!-- Sécurité -->
        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2rem;">
          <h3 style="color: white; font-size: 1rem; font-weight: 600; margin-bottom: 1.25rem;">
            <i class="fas fa-shield-alt" style="color: #8b2240; margin-right: 0.5rem;"></i> Sécurité
          </h3>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="color: rgba(255,255,255,0.7); font-size: 0.875rem;">Mot de passe</p>
              <p style="color: rgba(255,255,255,0.35); font-size: 0.8rem;">Dernière modification : inconnue</p>
            </div>
            <a href="/change-password" style="padding: 0.5rem 1rem; background: rgba(139,34,64,0.2); border: 1px solid rgba(139,34,64,0.3); border-radius: 10px; color: #f9a8d4; font-size: 0.8rem; text-decoration: none; transition: all 0.2s;">
              <i class="fas fa-key"></i> Changer
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MyKikiProfilComponent implements OnInit {
  profil: any = {};
  loading = true;
  editMode = false;
  saveSuccess = false;
  formData: any = {};

  constructor(
    private http: HttpClient,
    public auth: AuthService
  ) {}

  get user() {
    return this.auth.getCurrentUser();
  }

  get infoItems(): any[] {
    return [
      { label: 'Nom', value: this.profil.name || this.profil.fullName },
      { label: 'Email', value: this.profil.email || this.user?.username },
      { label: 'Téléphone', value: this.profil.phone || this.profil.telephone },
      { label: 'Type', value: this.profil.type === 'entreprise' ? 'Entreprise' : 'Particulier' },
      { label: 'Organisation', value: this.profil.organization }
    ];
  }

  ngOnInit(): void {
    this.http.get<any>(`${API}/api/mykiki/profil`).subscribe({
      next: (data) => {
        this.profil = data || {};
        this.formData = {
          name: this.profil.name || this.user?.fullName,
          phone: this.profil.phone || this.profil.telephone,
          type: this.profil.type || 'particulier',
          organization: this.profil.organization
        };
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  getInitials(): string {
    const name = this.profil.name || this.user?.fullName || 'CL';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  saveProfil(): void {
    this.http.put(`${API}/api/mykiki/profil`, this.formData).subscribe({
      next: (data: any) => {
        this.profil = { ...this.profil, ...data };
        this.saveSuccess = true;
        setTimeout(() => {
          this.saveSuccess = false;
          this.editMode = false;
        }, 2000);
      },
      error: (e) => console.warn('Erreur sauvegarde profil', e)
    });
  }
}
