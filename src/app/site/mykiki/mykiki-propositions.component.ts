import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

const API = 'https://kiki-backend-iuyo.onrender.com';

@Component({
  selector: 'app-mykiki-propositions',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="mk-page">
      <div class="mk-page-header">
        <h1>Mes Propositions</h1>
        <p>Les propositions commerciales envoyées par Kiki Traiteur</p>
      </div>

      <!-- Loading -->
      <div class="mk-loading" *ngIf="loading">
        <i class="fas fa-spinner fa-spin"></i> Chargement...
      </div>

      <!-- Vide -->
      <div class="mk-empty" *ngIf="!loading && propositions.length === 0">
        <i class="fas fa-inbox"></i>
        <h3>Aucune proposition reçue</h3>
        <p>Vous recevrez ici les propositions commerciales de Kiki Traiteur suite à votre demande.</p>
        <a routerLink="/" class="mk-btn-primary">Faire une demande</a>
      </div>

      <!-- Liste des propositions -->
      <div class="propositions-list" *ngIf="!loading && propositions.length > 0">
        <div class="prop-card glass-card"
             *ngFor="let prop of propositions"
             [class.prop-selected]="prop.status === 'selectionnee_client'"
             [class.prop-validated]="prop.status === 'validee_gestionnaire'"
        >
          <!-- Header -->
          <div class="prop-header">
            <div class="prop-info">
              <h3>{{ prop.titre }}</h3>
              <p class="prop-date">Reçue le {{ formatDate(prop.dateEnvoi) }}</p>
            </div>
            <div class="prop-status-badge" [ngClass]="getStatusClass(prop.status)">
              {{ getStatusLabel(prop.status) }}
            </div>
          </div>

          <!-- Description -->
          <p class="prop-description" *ngIf="prop.description">{{ prop.description }}</p>

          <!-- Prix -->
          <div class="prop-price" *ngIf="prop.prixUnitairePersonne">
            <i class="fas fa-coins"></i>
            <span>{{ prop.prixUnitairePersonne | number }} FCFA / personne</span>
          </div>

          <!-- Actions : seulement si la prop est "envoyee" ou "vue" -->
          <div class="prop-actions" *ngIf="prop.status === 'envoyee' || prop.status === 'vue'">
            <!-- Commentaire client -->
            <div class="field" *ngIf="selectedPropId === prop.id">
              <label>Votre commentaire / demande de modification (optionnel)</label>
              <textarea [(ngModel)]="clientComment" rows="3" placeholder="Ex: Je souhaite remplacer le plat X par..."></textarea>
            </div>

            <div class="prop-action-btns">
              <button class="mk-btn-outline" (click)="toggleDetail(prop)">
                <i class="fas fa-eye"></i> Voir détail
              </button>
              <button class="mk-btn-primary" (click)="selectProp(prop)">
                <i class="fas fa-check"></i>
                {{ selectedPropId === prop.id ? 'Confirmer ma sélection' : 'Choisir cette proposition' }}
              </button>
            </div>
          </div>

          <!-- Confirmé -->
          <div class="prop-confirmed" *ngIf="prop.status === 'selectionnee_client'">
            <i class="fas fa-check-circle"></i>
            Vous avez sélectionné cette proposition. En attente de confirmation du traiteur.
          </div>

          <div class="prop-validated-msg" *ngIf="prop.status === 'validee_gestionnaire'">
            <i class="fas fa-trophy"></i>
            🎉 Proposition confirmée ! Votre événement est planifié.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
    * { box-sizing: border-box; }

    .mk-page { font-family: 'Outfit', sans-serif; }

    .mk-page-header { margin-bottom: 2rem; }
    .mk-page-header h1 { color: white; font-size: 1.6rem; font-weight: 700; }
    .mk-page-header p { color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-top: 0.25rem; }

    .mk-loading { color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 0.5rem; padding: 2rem; }

    .mk-empty {
      text-align: center;
      padding: 4rem 2rem;
      color: rgba(255,255,255,0.4);
    }
    .mk-empty i { font-size: 3rem; margin-bottom: 1rem; }
    .mk-empty h3 { color: white; margin-bottom: 0.5rem; }
    .mk-empty p { margin-bottom: 1.5rem; font-size: 0.9rem; }

    .propositions-list { display: flex; flex-direction: column; gap: 1.5rem; }

    .glass-card {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 1.75rem;
      transition: all 0.3s;
    }

    .prop-card.prop-selected {
      border-color: rgba(34,197,94,0.4);
      background: rgba(34,197,94,0.05);
    }

    .prop-card.prop-validated {
      border-color: rgba(139,34,64,0.4);
      background: rgba(139,34,64,0.08);
    }

    .prop-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
    .prop-info h3 { color: white; font-size: 1.1rem; font-weight: 600; }
    .prop-date { color: rgba(255,255,255,0.4); font-size: 0.8rem; margin-top: 0.2rem; }

    .prop-status-badge { padding: 0.3rem 0.85rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; }
    .prop-status-badge.envoyee { background: rgba(59,130,246,0.2); color: #93c5fd; border: 1px solid rgba(59,130,246,0.3); }
    .prop-status-badge.selectionnee { background: rgba(34,197,94,0.2); color: #86efac; border: 1px solid rgba(34,197,94,0.3); }
    .prop-status-badge.validee { background: rgba(139,34,64,0.3); color: #f9a8d4; border: 1px solid rgba(139,34,64,0.4); }

    .prop-description { color: rgba(255,255,255,0.65); font-size: 0.875rem; line-height: 1.6; margin-bottom: 1rem; }

    .prop-price { display: flex; align-items: center; gap: 0.5rem; color: rgba(196,93,42,0.9); font-weight: 600; font-size: 1rem; margin-bottom: 1.25rem; }

    .prop-actions { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1.25rem; }

    .field { margin-bottom: 1rem; }
    .field label { display: block; color: rgba(255,255,255,0.5); font-size: 0.8rem; margin-bottom: 0.4rem; }
    .field textarea { width: 100%; padding: 0.75rem 1rem; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.875rem; resize: vertical; outline: none; }

    .prop-action-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; }

    .mk-btn-primary, .mk-btn-outline {
      padding: 0.65rem 1.25rem;
      border-radius: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s;
      text-decoration: none;
    }

    .mk-btn-primary { background: linear-gradient(135deg, #22c55e, #16a34a); border: none; color: white; }
    .mk-btn-primary:hover { transform: translateY(-1px); }

    .mk-btn-outline { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.8); }
    .mk-btn-outline:hover { background: rgba(255,255,255,0.12); }

    .prop-confirmed {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #86efac;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.75rem 1rem;
      background: rgba(34,197,94,0.1);
      border-radius: 10px;
      margin-top: 0.75rem;
    }

    .prop-validated-msg {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #f9a8d4;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.75rem 1rem;
      background: rgba(139,34,64,0.15);
      border-radius: 10px;
      margin-top: 0.75rem;
    }
  `]
})
export class MyKikiPropositionsComponent implements OnInit {
  propositions: any[] = [];
  loading = true;
  selectedPropId: number | null = null;
  clientComment = '';

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadPropositions();
  }

  loadPropositions(): void {
    this.http.get<any[]>(`${API}/api/mykiki/propositions`).subscribe({
      next: (data) => { this.propositions = data || []; this.loading = false; },
      error: (e) => { console.warn('Erreur chargement propositions', e); this.loading = false; }
    });
  }

  selectProp(prop: any): void {
    if (this.selectedPropId === prop.id) {
      // Confirmer la sélection
      const payload = {
        clientComment: this.clientComment,
        clientSelection: JSON.stringify({ propositionId: prop.id })
      };
      this.http.post(`${API}/api/mykiki/propositions/${prop.id}/valider`, payload).subscribe({
        next: () => {
          prop.status = 'selectionnee_client';
          this.selectedPropId = null;
          this.clientComment = '';
        },
        error: (e) => console.warn('Erreur validation', e)
      });
    } else {
      this.selectedPropId = prop.id;
      // Marquer comme vue
      if (prop.status === 'envoyee') {
        prop.status = 'vue';
      }
    }
  }

  toggleDetail(prop: any): void {
    // TODO: ouvrir modal de détail
    console.log('Détail proposition', prop);
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'envoyee': '📩 Nouvelle',
      'vue': '👀 Consultée',
      'selectionnee_client': '✅ Sélectionnée',
      'validee_gestionnaire': '🎉 Confirmée',
      'rejetee': 'Non retenue'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'envoyee': 'envoyee',
      'vue': 'envoyee',
      'selectionnee_client': 'selectionnee',
      'validee_gestionnaire': 'validee'
    };
    return classes[status] || 'envoyee';
  }

  formatDate(d: string): string {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString('fr-FR'); } catch { return d; }
  }
}
