import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { KikiDataService } from './services/kiki-data.service';

@Component({
  selector: 'app-gestionnaire',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-logo">
          <img src="assets/images/logo.png" alt="Kiki Traiteur Logo">
          <div class="brand-text">
            <span class="brand-title" style="color: white; font-size: 1.1rem;">Kiki Traiteur</span>
            <span class="brand-subtitle" style="color: var(--accent-color); font-size: 0.6rem;">ERP Gestionnaire</span>
          </div>
        </div>

        <ul class="sidebar-menu">
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'dashboard'" (click)="activeTab = 'dashboard'">
              <i class="fas fa-chart-pie me-2"></i> Tableau de bord
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'requests'" (click)="activeTab = 'requests'">
              <i class="fas fa-inbox me-2"></i> Demandes & Devis
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'agenda'" (click)="activeTab = 'agenda'">
              <i class="fas fa-calendar-check me-2"></i> Calendrier interne
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'clients'" (click)="activeTab = 'clients'">
              <i class="fas fa-user-tie me-2"></i> Clients
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'staff'" (click)="activeTab = 'staff'">
              <i class="fas fa-user-friends me-2"></i> Personnel
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'sync'" (click)="activeTab = 'sync'">
              <i class="fas fa-sync me-2"></i> Google Sync & SEC
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <div class="user-badge">
            <div class="user-avatar">MV</div>
            <div class="user-info">
              <span class="user-name">Marie V.</span>
              <span class="user-role">Gestionnaire ERP</span>
            </div>
          </div>
          <a href="javascript:void(0)" (click)="logout()" class="sidebar-link" style="color: #FCA5A5; border-top: 1px solid rgba(197, 168, 128, 0.1); margin-top: 0.5rem; padding-top: 1rem;">
            🚪 Déconnexion
          </a>
        </div>
      </aside>

      <!-- Main Workspace -->
      <main class="main-content">
        <!-- Top header -->
        <div class="dashboard-header">
          <div class="dashboard-title">
            <h1>{{ getTitle() }}</h1>
            <p>{{ getSubtitle() }}</p>
          </div>
          <div style="margin-left:auto; display:flex; gap:0.6rem; align-items:center;">
            <a routerLink="/devis" class="btn btn-accent" style="color: white;"><i class="fas fa-plus me-1"></i> Créer une demande</a>
          </div>
        </div>

        <!-- TAB 1: DASHBOARD -->
        <section *ngIf="activeTab === 'dashboard'" class="dashboard-section active">
          <div class="admin-card-grid">
            <div class="admin-card">
              <div class="admin-card-header">
                <span>Demandes Reçues</span>
                <span>Total</span>
              </div>
              <div class="admin-card-value">{{ requests.length }}</div>
              <div class="admin-card-trend">Pour ce mois</div>
            </div>

            <div class="admin-card">
              <div class="admin-card-header">
                <span>Demandes Abouties</span>
                <span>Acceptées</span>
              </div>
              <div class="admin-card-value">{{ getAcceptedCount() }}</div>
              <div class="admin-card-trend up">↗ Validées par clients</div>
            </div>

            <div class="admin-card">
              <div class="admin-card-header">
                <span>Taux de Conversion</span>
                <span>Global</span>
              </div>
              <div class="admin-card-value">{{ conversionRate }}%</div>
              <div class="admin-card-trend up">↗ Objectif > 70%</div>
            </div>

            <div class="admin-card">
              <div class="admin-card-header">
                <span>CA Prévisionnel</span>
                <span>TTC</span>
              </div>
              <div class="admin-card-value">{{ totalRevenue.toLocaleString('fr-FR') }} XOF</div>
              <div class="admin-card-trend up">↗ Contrats signés</div>
            </div>

            <div class="admin-card">
              <div class="admin-card-header">
                <span>Clients & Entreprises</span>
                <span>Inscrits</span>
              </div>
              <div class="admin-card-value">{{ getClientsCount() }}</div>
              <div class="admin-card-trend" style="color: var(--primary-dark); font-weight: 600;">👥 {{ getClientsBreakdown() }}</div>
            </div>

            <div class="admin-card" style="border-left: 4px solid #F59E0B;">
              <div class="admin-card-header">
                <span>En Attente de Validation</span>
                <span style="color: #F59E0B; font-weight: 700;">Urgent</span>
              </div>
              <div class="admin-card-value" style="color: #D97706;">{{ getPendingCount() }}</div>
              <div class="admin-card-trend" style="color: #D97706; font-weight: 700;">⚡ Demandes à traiter</div>
            </div>
          </div>

          <!-- Table des demandes en cours -->
          <div class="panel">
            <div class="panel-header">
              <h2 class="panel-title">Demandes à traiter en urgence</h2>
              <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;" (click)="activeTab = 'requests'">Voir toutes les demandes</button>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID Demande</th>
                    <th>Client</th>
                    <th>Prestation</th>
                    <th>Date Événement</th>
                    <th>Convives</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let req of requests | slice:0:5">
                    <td><strong>#{{ req.id }}</strong></td>
                    <td>{{ getClientName(req.clientId) }}</td>
                    <td>{{ getPrestationName(req.prestationId) }}</td>
                    <td>{{ formatDate(req.date) }}</td>
                    <td>{{ req.guests }} pers.</td>
                    <td>
                      <span class="badge" [ngClass]="getBadgeClass(req.status)">
                        {{ getStatusLabel(req.status) }}
                      </span>
                    </td>
                    <td>
                      <button *ngIf="req.status === 'pending'" class="btn btn-sm btn-primary" (click)="quoteRequest(req.id)">
                        Chiffrer
                      </button>
                      <span *ngIf="req.status !== 'pending'" style="color: var(--text-muted); font-size: 0.85rem;">Traité</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- TAB 2: REQUESTS -->
        <section *ngIf="activeTab === 'requests'" class="dashboard-section active">
          <div class="panel">
            <div class="panel-header">
              <h2 class="panel-title">Gestion de l'ensemble des devis & réceptions</h2>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client / Société</th>
                    <th>Prestation</th>
                    <th>Soumise le</th>
                    <th>Date Prévue</th>
                    <th>Invités</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let req of requests">
                    <td><strong>#{{ req.id }}</strong></td>
                    <td>
                      <strong>{{ getClientName(req.clientId) }}</strong><br>
                      <small style="color: #666;">{{ getClientOrg(req.clientId) }}</small>
                    </td>
                    <td>{{ getPrestationName(req.prestationId) }}</td>
                    <td>{{ formatDate(req.submittedDate) }}</td>
                    <td>{{ formatDate(req.date) }}</td>
                    <td>{{ req.guests }} pers.</td>
                    <td>
                      <span class="badge" [ngClass]="getBadgeClass(req.status)">
                        {{ getStatusLabel(req.status) }}
                      </span>
                    </td>
                    <td>
                      <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                        <button *ngIf="req.status === 'pending'" class="btn btn-sm btn-primary" (click)="quoteRequest(req.id)">
                          <i class="fas fa-file-signature"></i> Devis
                        </button>
                        <button *ngIf="req.status !== 'accepted'" class="btn btn-sm" style="background:#059669; color:white;" (click)="setStatus(req.id, 'accepted')" title="Valider">
                          <i class="fas fa-check"></i>
                        </button>
                        <button *ngIf="req.status !== 'rejected'" class="btn btn-sm" style="background:#DC2626; color:white;" (click)="setStatus(req.id, 'rejected')" title="Rejeter">
                          <i class="fas fa-times"></i>
                        </button>
                        <button class="btn btn-sm btn-outline" (click)="deleteRequest(req.id)" title="Supprimer">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- TAB 3: AGENDA -->
        <section *ngIf="activeTab === 'agenda'" class="dashboard-section active">
          <div class="panel">
            <div class="panel-header">
              <h2 class="panel-title">Calendrier Opérationnel Interne</h2>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Date Événement</th>
                    <th>Type de Prestation</th>
                    <th>Client</th>
                    <th>Nombre d'invités</th>
                    <th>Statut Production</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let req of getAcceptedRequests()">
                    <td><strong>{{ formatDate(req.date) }}</strong></td>
                    <td>{{ getPrestationName(req.prestationId) }}</td>
                    <td>{{ getClientName(req.clientId) }}</td>
                    <td>{{ req.guests }} pers.</td>
                    <td><span class="badge badge-accepted">En Production</span></td>
                  </tr>
                  <tr *ngIf="getAcceptedRequests().length === 0">
                    <td colspan="5" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                      Aucun événement programmé.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- TAB 4: CLIENTS -->
        <section *ngIf="activeTab === 'clients'" class="dashboard-section active">
          <div class="panel">
            <div class="panel-header">
              <h2 class="panel-title">Répertoire Clientèle Kiki Traiteur</h2>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom Client</th>
                    <th>Société</th>
                    <th>E-mail</th>
                    <th>Catégorie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let c of clients">
                    <td><strong>{{ c.id }}</strong></td>
                    <td>{{ c.name }}</td>
                    <td>{{ c.organization || '-' }}</td>
                    <td>{{ c.email }}</td>
                    <td><span class="badge" style="background:#E2E8F0; color:#334155;">{{ c.organization ? 'Entreprise / VIP' : 'Particulier' }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- TAB 5: STAFF -->
        <section *ngIf="activeTab === 'staff'" class="dashboard-section active">
          <div class="panel">
            <div class="panel-header">
              <h2 class="panel-title">Personnel Traiteur & Brigade de Cuisine</h2>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Nom Prénom</th>
                    <th>Rôle / Poste</th>
                    <th>Téléphone</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let s of staffList">
                    <td><strong>{{ s.name }}</strong></td>
                    <td>{{ s.role }}</td>
                    <td>{{ s.phone }}</td>
                    <td><span class="badge badge-accepted">Disponible</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- TAB 6: GOOGLE SYNC -->
        <section *ngIf="activeTab === 'sync'" class="dashboard-section active">
          <div class="panel" style="max-width: 700px;">
            <div class="panel-header">
              <h2 class="panel-title">Synchronisation Google Calendar & Sécurité</h2>
            </div>
            <div style="background: #1E293B; color: white; padding: 1.5rem; border-radius: var(--border-radius-lg); margin-bottom: 2rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h4 style="color: white; margin-bottom: 0.4rem;">Statut de synchronisation</h4>
                  <p style="color: #94A3B8; font-size: 0.9rem; margin: 0;">{{ syncStatus }}</p>
                </div>
                <button class="btn btn-accent" style="color: white;" (click)="triggerSync()">
                  <i class="fas fa-sync me-1"></i> Synchroniser maintenant
                </button>
              </div>
            </div>
            <p style="color: var(--text-muted); font-size: 0.95rem;">
              La synchronisation bidirectionnelle Google Calendar met à jour automatiquement votre agenda en ligne chaque fois qu'un devis est accepté ou modifié dans l'ERP Kiki Traiteur.
            </p>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
    :host { display: block; }
    .admin-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .admin-card {
      background: var(--bg-white);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-sm);
    }
    .admin-card-header {
      display: flex;
      justify-content: space-between;
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-bottom: 0.75rem;
    }
    .admin-card-value {
      font-size: 1.8rem;
      font-weight: 900;
      color: var(--primary-dark);
      margin-bottom: 0.5rem;
    }
    .admin-card-trend {
      font-size: 0.82rem;
      color: #64748B;
    }
    .admin-card-trend.up {
      color: #059669;
    }
    `
  ]
})
export class GestionnaireComponent implements OnInit {
  activeTab: 'dashboard' | 'requests' | 'agenda' | 'clients' | 'staff' | 'sync' = 'dashboard';
  requests: any[] = [];
  clients: any[] = [];
  totalRevenue = 0;
  conversionRate = 0;
  syncStatus = 'Connecté (Dernière sync : Aujourd\'hui à 11h15)';

  staffList = [
    { name: 'Mamadou Ndiaye', role: 'Chef Cuisinier Exécutif', phone: '+221 77 123 45 67' },
    { name: 'Fatou Sow', role: 'Responsable Salle La Diva', phone: '+221 78 234 56 78' },
    { name: 'Ousmane Fall', role: 'Chef Scénographe & Décoration', phone: '+221 76 345 67 89' },
    { name: 'Awa Diop', role: 'Maître d\'Hôtel Réceptions', phone: '+221 77 456 78 90' }
  ];

  constructor(private dataService: KikiDataService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.requests = this.dataService.getRequests();
    this.clients = this.dataService.getClients();

    this.totalRevenue = this.requests
      .filter(r => r.status === 'accepted')
      .reduce((acc, r) => acc + (this.getUnitPrice(r.prestationId) * (r.guests || 50)), 0);

    const total = this.requests.length;
    const accepted = this.requests.filter(r => r.status === 'accepted').length;
    this.conversionRate = total > 0 ? Math.round((accepted / total) * 100) : 0;
  }

  getTitle(): string {
    switch (this.activeTab) {
      case 'dashboard': return 'Tableau de bord ERP';
      case 'requests': return 'Gestion des Demandes & Commandes';
      case 'agenda': return 'Calendrier Opérationnel';
      case 'clients': return 'Répertoire Clientèle';
      case 'staff': return 'Brigades & Personnel';
      case 'sync': return 'Synchronisation & API';
    }
  }

  getSubtitle(): string {
    switch (this.activeTab) {
      case 'dashboard': return 'Vue d\'ensemble de l\'activité de Kiki Traiteur.';
      case 'requests': return 'Traitement commercial et validation des devis.';
      case 'agenda': return 'Organisation interne et planification logistique.';
      case 'clients': return 'Profils et historique des clients Kiki Traiteur.';
      case 'staff': return 'Equipes culinaires et maîtres d\'hôtel.';
      case 'sync': return 'Paramètres de liaison Google Agenda et sécurité.';
    }
  }

  getClientName(clientId: string): string {
    const c = this.clients.find(item => item.id === clientId);
    return c ? c.name : clientId;
  }

  getClientOrg(clientId: string): string {
    const c = this.clients.find(item => item.id === clientId);
    return (c && c.organization) ? c.organization : 'Particulier';
  }

  getPrestationName(id: string): string {
    const names: Record<string, string> = {
      'traiteur': 'Service Traiteur Prestige',
      'evenements': 'Organisation d\'Événements',
      'salle-diva': 'Salle La Diva',
      'decoration': 'Design & Décoration',
      'location': 'Location de Matériel',
      'takeaway': 'Plats à Emporter',
      'foodtruck': 'Food Truck Gourmet'
    };
    return names[id] || id;
  }

  getUnitPrice(id: string): number {
    const prices: Record<string, number> = {
      'traiteur': 15000,
      'evenements': 20000,
      'salle-diva': 25000,
      'decoration': 5000,
      'location': 3000,
      'takeaway': 8000,
      'foodtruck': 12000
    };
    return prices[id] || 15000;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'quoted': return 'Devis Prêt';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Refusé';
      default: return 'En attente';
    }
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'quoted': return 'badge-quoted';
      case 'accepted': return 'badge-accepted';
      case 'rejected': return 'badge-rejected';
      default: return 'badge-pending';
    }
  }

  formatDate(d: string): string {
    if (!d) return '';
    try {
      return new Date(d).toLocaleDateString('fr-FR');
    } catch {
      return d;
    }
  }

  getAcceptedCount(): number {
    return this.requests.filter(r => r.status === 'accepted').length;
  }

  getAcceptedRequests(): any[] {
    return this.requests.filter(r => r.status === 'accepted');
  }

  getPendingCount(): number {
    return this.requests.filter(r => !r.status || r.status === 'pending').length;
  }

  getClientsCount(): string {
    const total = (this.clients && this.clients.length) ? this.clients.length : 14;
    return `${total}`;
  }

  getClientsBreakdown(): string {
    const total = (this.clients && this.clients.length) ? this.clients.length : 14;
    const entreprises = (this.clients) ? this.clients.filter(c => c.type === 'entreprise' || (c.company && c.company !== '')).length : 6;
    const particuliers = total - entreprises;
    return `${particuliers} Particuliers • ${entreprises} Entreprises`;
  }

  quoteRequest(id: string): void {
    this.dataService.updateRequestStatus(id, 'quoted');
    this.dataService.showToast('Devis émis au client avec succès.');
    this.loadData();
  }

  setStatus(id: string, st: string): void {
    this.dataService.updateRequestStatus(id, st);
    this.dataService.showToast(`Statut actualisé en : ${this.getStatusLabel(st)}`);
    this.loadData();
  }

  deleteRequest(id: string): void {
    if (confirm('Supprimer cette demande du système ERP ?')) {
      this.dataService.deleteRequest(id);
      this.dataService.showToast('Demande supprimée.');
      this.loadData();
    }
  }

  triggerSync(): void {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    this.syncStatus = `Synchronisé à l'instant (${timeStr})`;
    this.dataService.showToast('Google Agenda synchronisé avec les réceptions Kiki Traiteur.');
  }

  logout(): void {
    this.dataService.showToast('Déconnexion du module Gestionnaire ERP.');
    this.router.navigate(['/auth'], { queryParams: { type: 'staff' } });
  }
}
