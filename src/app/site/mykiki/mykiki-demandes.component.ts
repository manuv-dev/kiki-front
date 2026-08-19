import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

const API = 'https://kiki-backend-iuyo.onrender.com';

@Component({
  selector: 'app-mykiki-demandes',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mk-page" style="font-family: 'Outfit', sans-serif;">
      <div class="mk-page-header" style="margin-bottom: 2rem;">
        <h1 style="color: white; font-size: 1.6rem; font-weight: 700;">Mes Demandes</h1>
        <p style="color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-top: 0.25rem;">
          Historique de toutes vos demandes
        </p>
      </div>

      <div *ngIf="loading" style="color: rgba(255,255,255,0.5); padding: 2rem;">
        <i class="fas fa-spinner fa-spin"></i> Chargement...
      </div>

      <div *ngIf="!loading && demandes.length === 0" style="text-align: center; padding: 4rem 2rem; color: rgba(255,255,255,0.4);">
        <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
        <h3 style="color: white;">Aucune demande</h3>
        <p style="margin: 0.5rem 0 1.5rem;">Vous n'avez pas encore effectué de demande.</p>
        <a routerLink="/prestations" style="display: inline-block; padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #8b2240, #c45d2a); border-radius: 12px; color: white; text-decoration: none; font-weight: 600;">
          Voir nos prestations
        </a>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;" *ngIf="!loading && demandes.length > 0">
        <div *ngFor="let d of demandes"
             style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div>
              <h4 style="color: white; margin: 0; font-size: 1rem;">{{ d.prestationTitle || d.prestationId }}</h4>
              <p style="color: rgba(255,255,255,0.4); font-size: 0.8rem; margin: 0.2rem 0 0;">
                Soumise le {{ formatDate(d.dateSubmitted) }} • {{ d.guests }} convives
              </p>
            </div>
            <span [ngStyle]="getStatusStyle(d.status)" style="padding: 0.3rem 0.85rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; border: 1px solid;">
              {{ getStatusLabel(d.status) }}
            </span>
          </div>
          <p *ngIf="d.message" style="color: rgba(255,255,255,0.55); font-size: 0.85rem; font-style: italic;">
            "{{ d.message }}"
          </p>
        </div>
      </div>
    </div>
  `
})
export class MyKikiDemandesComponent implements OnInit {
  demandes: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${API}/api/mykiki/demandes`).subscribe({
      next: (data) => { this.demandes = data || []; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  formatDate(d: string): string {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString('fr-FR'); } catch { return d; }
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: '⏳ En attente',
      propositions_envoyees: '📋 Propositions reçues',
      selection_client: '✅ Sélection envoyée',
      aboutis: '🎉 Confirmée',
      rejected: '❌ Refusée'
    };
    return map[status] || status;
  }

  getStatusStyle(status: string): any {
    const styles: Record<string, any> = {
      pending: { background: 'rgba(245,158,11,0.15)', color: '#fcd34d', borderColor: 'rgba(245,158,11,0.3)' },
      propositions_envoyees: { background: 'rgba(59,130,246,0.15)', color: '#93c5fd', borderColor: 'rgba(59,130,246,0.3)' },
      selection_client: { background: 'rgba(34,197,94,0.15)', color: '#86efac', borderColor: 'rgba(34,197,94,0.3)' },
      aboutis: { background: 'rgba(139,34,64,0.2)', color: '#f9a8d4', borderColor: 'rgba(139,34,64,0.4)' },
      rejected: { background: 'rgba(220,38,38,0.15)', color: '#fca5a5', borderColor: 'rgba(220,38,38,0.3)' }
    };
    return styles[status] || { background: 'rgba(100,100,100,0.2)', color: 'white', borderColor: 'rgba(255,255,255,0.1)' };
  }
}
