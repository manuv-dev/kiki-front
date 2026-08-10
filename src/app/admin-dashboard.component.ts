import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { KikiDataService } from './services/kiki-data.service';
import { GestionnaireApiService } from './services/gestionnaire-api.service';

@Component({
  selector: 'app-admin-dashboard',
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
            <span class="brand-subtitle" style="color: var(--accent-color); font-size: 0.6rem;">Administration</span>
          </div>
        </div>

        <ul class="sidebar-menu">
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'dashboard'" (click)="activeTab = 'dashboard'">
              <i class="fas fa-chart-line me-2"></i> Tableau de Bord
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'requests'" (click)="activeTab = 'requests'">
              <i class="fas fa-file-invoice-dollar me-2"></i> Demandes & Devis
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'agenda'" (click)="activeTab = 'agenda'">
              <i class="fas fa-calendar-alt me-2"></i> Agenda & Planning
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'clients'" (click)="activeTab = 'clients'">
              <i class="fas fa-users me-2"></i> Fichier Clients
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'settings'" (click)="activeTab = 'settings'">
              <i class="fas fa-cog me-2"></i> Paramètres
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <div class="user-badge">
            <div class="user-avatar">PK</div>
            <div class="user-info">
              <span class="user-name">Pierre Kiki</span>
              <span class="user-role">Administrateur</span>
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
          <!-- STATS CARDS -->
          <div class="stats-grid">
            
            <div class="stat-card" style="background: #5C2018; color: white;" *ngIf="!isLoadingStats">
              <div class="stat-icon" style="background: rgba(255, 255, 255, 0.1); color: white;">
                <i class="fas fa-inbox"></i>
              </div>
              <div class="stat-details">
                <span class="stat-label" style="color: rgba(255, 255, 255, 0.8);">DEMANDES REÇUES</span>
                <span class="stat-value" style="color: white;">{{dashboardStats.totalRequests}}</span>
                <span class="stat-trend" style="color: rgba(255, 255, 255, 0.6); font-weight: normal; font-size: 0.85rem;">pour ce mois</span>
              </div>
              <div style="width: 100%; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 1rem; padding-top: 0.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.7); grid-column: span 2;">
                <i class="fas fa-layer-group me-1"></i>Toutes prestations confondues
              </div>
            </div>
            <div class="stat-card" *ngIf="isLoadingStats" style="display: flex; justify-content: center; align-items: center; background: #5C2018;">
               <div class="spinner-border" style="width: 2rem; height: 2rem; color: white; border: 3px solid rgba(255, 255, 255, 0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>

            <div class="stat-card" style="background: #DC2626; color: white;" *ngIf="!isLoadingStats">
              <div class="stat-icon" style="background: rgba(255, 255, 255, 0.2); color: white;">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="stat-details">
                <span class="stat-label" style="color: rgba(255, 255, 255, 0.8);">DEMANDES ABOUTIES</span>
                <span class="stat-value" style="color: white;">{{dashboardStats.acceptedRequests}}</span>
                <span class="stat-trend" style="color: rgba(255, 255, 255, 0.8); font-weight: normal; font-size: 0.85rem;">réservations validées</span>
              </div>
              <div style="width: 100%; border-top: 1px solid rgba(0,0,0,0.1); background: rgba(0,0,0,0.1); margin: 1rem -1.5rem -1.5rem -1.5rem; padding: 0.7rem 1.5rem; font-size: 0.8rem; color: white; grid-column: span 2;">
                <i class="fas fa-handshake me-1"></i>Devis signés et confirmés
              </div>
            </div>
            <div class="stat-card" *ngIf="isLoadingStats" style="display: flex; justify-content: center; align-items: center; background: #DC2626;">
               <div class="spinner-border" style="width: 2rem; height: 2rem; color: white; border: 3px solid rgba(255, 255, 255, 0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>

            <div class="stat-card" style="background: #A1A178; color: white;" *ngIf="!isLoadingStats">
              <div class="stat-icon" style="background: rgba(255, 255, 255, 0.2); color: white;">
                <i class="fas fa-hourglass-half"></i>
              </div>
              <div class="stat-details">
                <span class="stat-label" style="color: rgba(255, 255, 255, 0.9);">EN ATTENTE DE RÉALISATION</span>
                <span class="stat-value" style="color: white;">{{dashboardStats.pendingRequests}}</span>
                <span class="stat-trend" style="color: rgba(255, 255, 255, 0.9); font-weight: normal; font-size: 0.85rem;">à confirmer ce mois-ci</span>
              </div>
              <div style="width: 100%; border-top: 1px solid rgba(0,0,0,0.1); background: rgba(0,0,0,0.1); margin: 1rem -1.5rem -1.5rem -1.5rem; padding: 0.7rem 1.5rem; font-size: 0.8rem; color: white; grid-column: span 2;">
                <i class="fas fa-clock me-1"></i>Statuts : En attente / Devis émis
              </div>
            </div>
            <div class="stat-card" *ngIf="isLoadingStats" style="display: flex; justify-content: center; align-items: center; background: #A1A178;">
               <div class="spinner-border" style="width: 2rem; height: 2rem; color: white; border: 3px solid rgba(255, 255, 255, 0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>

            <div class="stat-card" style="background: white; border: 1px solid #E2E8F0;" *ngIf="!isLoadingStats">
              <div class="stat-icon" style="background: #F8FAFC; color: #475569; border: 1px solid #E2E8F0;">
                <i class="fas fa-percent"></i>
              </div>
              <div class="stat-details">
                <span class="stat-label" style="color: #7A1C1C;">TAUX DE CONVERSION</span>
                <span class="stat-value" style="color: #1E293B;">{{dashboardStats.conversionRate}} <small style="font-size: 1.2rem; font-weight: 500; color: #64748B;">%</small></span>
                <span class="stat-trend" style="color: #64748B; font-weight: normal; font-size: 0.85rem;">abouties / reçues</span>
              </div>
              <div style="width: 100%; border-top: 1px solid #E2E8F0; background: #F8FAFC; margin: 1rem -1.5rem -1.5rem -1.5rem; padding: 0.7rem 1.5rem; font-size: 0.8rem; color: #475569; grid-column: span 2;">
                <i class="fas fa-chart-line me-1"></i>Performance commerciale mensuelle
              </div>
            </div>
            <div class="stat-card" *ngIf="isLoadingStats" style="display: flex; justify-content: center; align-items: center; background: white; border: 1px solid #E2E8F0;">
               <div class="spinner-border" style="width: 2rem; height: 2rem; color: #7A1C1C; border: 3px solid rgba(122, 28, 28, 0.3); border-top-color: #7A1C1C; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>

            <div class="stat-card" style="background: #1E293B; color: white;" *ngIf="!isLoadingStats">
              <div class="stat-icon" style="background: rgba(255, 255, 255, 0.1); color: white;">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-details">
                <span class="stat-label" style="color: rgba(255, 255, 255, 0.8);">CLIENTS & ENTREPRISES</span>
                <span class="stat-value" style="color: white;">{{dashboardStats.totalClients}}</span>
                <span class="stat-trend" style="color: rgba(255, 255, 255, 0.7); font-weight: normal; font-size: 0.85rem;">inscrits dans l'ERP</span>
              </div>
              <div style="width: 100%; border-top: 1px solid rgba(0,0,0,0.2); background: #0F172A; margin: 1rem -1.5rem -1.5rem -1.5rem; padding: 0.7rem 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.9); grid-column: span 2;">
                <i class="fas fa-user me-1"></i>{{dashboardStats.particuliersCount}} Particulier / {{dashboardStats.entreprisesCount}} Entreprise
              </div>
            </div>
            <div class="stat-card" *ngIf="isLoadingStats" style="display: flex; justify-content: center; align-items: center; background: #1E293B;">
               <div class="spinner-border" style="width: 2rem; height: 2rem; color: white; border: 3px solid rgba(255, 255, 255, 0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>

            <div class="stat-card" style="background: #D97706; color: white;" *ngIf="!isLoadingStats">
              <div class="stat-icon" style="background: rgba(255, 255, 255, 0.2); color: white;">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <div class="stat-details">
                <span class="stat-label" style="color: rgba(255, 255, 255, 0.9);">EN ATTENTE DE VALIDATION</span>
                <span class="stat-value" style="color: white;">{{dashboardStats.urgentRequests}}</span>
                <span class="stat-trend" style="color: rgba(255, 255, 255, 0.9); font-weight: normal; font-size: 0.85rem;">demandes urgentes</span>
              </div>
              <div style="width: 100%; border-top: 1px solid rgba(0,0,0,0.1); background: rgba(0,0,0,0.15); margin: 1rem -1.5rem -1.5rem -1.5rem; padding: 0.7rem 1.5rem; font-size: 0.8rem; color: white; grid-column: span 2;">
                <i class="fas fa-bolt me-1"></i>Action requise du gestionnaire
              </div>
            </div>
            <div class="stat-card" *ngIf="isLoadingStats" style="display: flex; justify-content: center; align-items: center; background: #D97706;">
               <div class="spinner-border" style="width: 2rem; height: 2rem; color: white; border: 3px solid rgba(255, 255, 255, 0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>

          </div>

          <!-- Recent requests table -->
          <div class="panel">
            <div class="panel-header">
              <h2 class="panel-title">Demandes de devis récentes</h2>
              <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;" (click)="activeTab = 'requests'">Voir tout</button>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID Demande</th>
                    <th>Client</th>
                    <th>Prestation</th>
                    <th>Date Événement</th>
                    <th>Invités</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let req of requests | slice:0:5">
                    <td><strong>#{{ req.id }}</strong></td>
                    <td>{{ req.clientName && req.clientName !== req.clientId ? req.clientName : getClientName(req.clientId) }}</td>
                    <td>{{ getPrestationName(req.prestationId) }}</td>
                    <td>{{ formatDate(req.date) }}</td>
                    <td>{{ req.guests }} pers.</td>
                    <td>
                      <span class="badge" [ngClass]="getBadgeClass(req.status)">
                        {{ getStatusLabel(req.status) }}
                      </span>
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
              <h2 class="panel-title">Toutes les demandes de prestations</h2>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Prestation</th>
                    <th>Date Soumise</th>
                    <th>Date Événement</th>
                    <th>Invités</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let req of requests">
                    <td><strong>#{{ req.id }}</strong></td>
                    <td>
                      <strong>{{ req.clientName && req.clientName !== req.clientId ? req.clientName : getClientName(req.clientId) }}</strong><br>
                      <small style="color:#666;">{{ getClientOrg(req.clientId) }}</small>
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
                          <i class="fas fa-file-signature"></i> Chiffrer Devis
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
              <h2 class="panel-title">Planning des Réceptions & Événements</h2>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Événement</th>
                    <th>Client</th>
                    <th>Invités</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let req of getAcceptedRequests()">
                    <td><strong>{{ formatDate(req.date) }}</strong></td>
                    <td>{{ getPrestationName(req.prestationId) }}</td>
                    <td>{{ req.clientName && req.clientName !== req.clientId ? req.clientName : getClientName(req.clientId) }}</td>
                    <td>{{ req.guests }} pers.</td>
                    <td><span class="badge badge-accepted">Confirmé</span></td>
                  </tr>
                  <tr *ngIf="getAcceptedRequests().length === 0">
                    <td colspan="5" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
                      Aucun événement confirmé dans le planning pour l'instant.
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
              <h2 class="panel-title">Fichier Clients Kiki Traiteur</h2>
            </div>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom Complet</th>
                    <th>Société / Org</th>
                    <th>E-mail</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let c of clients">
                    <td><strong>{{ c.id }}</strong></td>
                    <td>{{ c.name }}</td>
                    <td>{{ c.organization || '-' }}</td>
                    <td>{{ c.email }}</td>
                    <td><span class="badge" style="background:#E2E8F0; color:#334155;">{{ c.organization ? 'Entreprise' : 'Particulier' }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- TAB 5: SETTINGS -->
        <section *ngIf="activeTab === 'settings'" class="dashboard-section active">
          <div class="panel" style="max-width: 700px;">
            <div class="panel-header">
              <h2 class="panel-title">Paramètres de l'entreprise</h2>
            </div>
            <form (ngSubmit)="saveSettings()">
              <div class="form-group">
                <label>Nom de l'entreprise</label>
                <input type="text" class="form-control" [(ngModel)]="settings.companyName" name="companyName">
              </div>
              <div class="form-group">
                <label>Adresse du siège</label>
                <input type="text" class="form-control" [(ngModel)]="settings.address" name="address">
              </div>
              <div class="form-group-row">
                <div class="form-group">
                  <label>E-mail de contact</label>
                  <input type="email" class="form-control" [(ngModel)]="settings.email" name="email">
                </div>
                <div class="form-group">
                  <label>Téléphone</label>
                  <input type="text" class="form-control" [(ngModel)]="settings.phone" name="phone">
                </div>
              </div>
              <button type="submit" class="btn btn-primary" style="padding: 0.8rem 2rem;">Enregistrer les modifications</button>
            </form>
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
export class AdminDashboardComponent implements OnInit {
  activeTab: 'dashboard' | 'requests' | 'agenda' | 'clients' | 'settings' = 'dashboard';
  requests: any[] = [];
  clients: any[] = [];

  dashboardStats: any = {
    totalRequests: 0,
    acceptedRequests: 0,
    pendingRequests: 0,
    urgentRequests: 0,
    conversionRate: 0,
    totalClients: 0,
    particuliersCount: 0,
    entreprisesCount: 0
  };
  isLoadingStats = false;

  settings = {
    companyName: 'Kiki Traiteur SAS',
    address: 'Hann Maristes, Dakar, Sénégal',
    email: 'contact@kikitraiteursenegal.net',
    phone: '+221 33 832 29 66'
  };

  constructor(
    private dataService: KikiDataService,
    private router: Router,
    private gestionnaireApiService: GestionnaireApiService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.requests = this.dataService.getRequests();
    this.clients = this.dataService.getClients();
    this.updateLocalMetrics();

    this.gestionnaireApiService.getAllDemandes().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.requests = data.map(d => ({
            id: String(d.id),
            clientId: String(d.clientId || ''),
            prestationId: d.prestationId,
            date: d.date || '',
            time: d.time || '',
            guests: d.guests || 50,
            isInstitution: !!d.isInstitution,
            organization: d.organization || d.clientOrganization || '',
            status: d.status || 'pending',
            dateSubmitted: d.dateSubmitted ? String(d.dateSubmitted).split('T')[0] : '',
            message: d.message || '',
            clientName: d.clientName || 'Client inconnu',
            clientEmail: d.clientEmail || '',
            clientPhone: d.clientPhone || '',
            prestationTitle: d.prestationTitle || d.prestationId,
            location: d.location || ''
          }));
          this.updateLocalMetrics();
        }
      },
      error: (err) => console.warn('API Gestionnaire getAllDemandes non accessible pour AdminDashboard', err)
    });

    this.isLoadingStats = true;
    this.gestionnaireApiService.getDashboardStats().subscribe({
      next: (stats) => {
        if (stats) {
          this.dashboardStats = {
            totalRequests: Number(stats.totalRequests) || 0,
            acceptedRequests: Number(stats.acceptedRequests) || 0,
            pendingRequests: Number(stats.pendingRequests) || 0,
            urgentRequests: Number(stats.urgentRequests) || 0,
            conversionRate: Math.round(Number(stats.conversionRate) || 0),
            totalClients: Number(stats.totalClients) || 0,
            particuliersCount: Number(stats.particuliersCount) || 0,
            entreprisesCount: Number(stats.entreprisesCount) || 0
          };
        }
        this.isLoadingStats = false;
      },
      error: (err) => {
        console.warn('API Gestionnaire stats non accessible pour AdminDashboard', err);
        this.isLoadingStats = false;
      }
    });
  }

  updateLocalMetrics(): void {
    // Relying on stats from API now
  }

  getTitle(): string {
    switch (this.activeTab) {
      case 'dashboard': return 'Tableau de Bord Administration';
      case 'requests': return 'Demandes de devis & Commandes';
      case 'agenda': return 'Agenda & Planning Événements';
      case 'clients': return 'Fichier Clients';
      case 'settings': return 'Paramètres Kiki Traiteur';
    }
  }

  getSubtitle(): string {
    switch (this.activeTab) {
      case 'dashboard': return 'Données analytiques et pilotage des activités traiteur.';
      case 'requests': return 'Gérez, chiffrer et validez les réceptions des clients.';
      case 'agenda': return 'Calendrier des prestations en cours et programmées.';
      case 'clients': return 'Liste complète de vos clients particuliers et entreprises.';
      case 'settings': return 'Configuration de la société et adresses.';
    }
  }

  getClientName(clientId: string): string {
    const r = this.requests.find(item => String(item.clientId) === String(clientId) && item.clientName && item.clientName !== 'Client inconnu' && item.clientName !== clientId);
    if (r && r.clientName) {
      return r.clientName;
    }
    const c = this.clients.find(item => String(item.id) === String(clientId));
    return c ? c.name : (clientId ? `Client #${clientId}` : 'Client inconnu');
  }

  getClientOrg(clientId: string): string {
    const r = this.requests.find(item => String(item.clientId) === String(clientId));
    if (r && r.organization) return r.organization;
    const c = this.clients.find(item => String(item.id) === String(clientId));
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

  getAcceptedRequests(): any[] {
    return this.requests.filter(r => r.status === 'accepted');
  }

  quoteRequest(id: string): void {
    this.dataService.updateRequestStatus(id, 'quoted');
    this.dataService.showToast('Devis généré et envoyé au client ! Statut passé à : Devis Prêt.');
    this.loadData();
  }

  setStatus(id: string, st: string): void {
    const numId = Number(id);
    if (!isNaN(numId) && numId > 0) {
      this.gestionnaireApiService.updateStatus(numId, st).subscribe({
        next: () => {
          this.dataService.updateRequestStatus(id, st);
          this.dataService.showToast(`Statut de la demande mis à jour.`);
          this.loadData();
        },
        error: () => {
          this.dataService.updateRequestStatus(id, st);
          this.dataService.showToast(`Statut de la demande mis à jour.`);
          this.loadData();
        }
      });
    } else {
      this.dataService.updateRequestStatus(id, st);
      this.dataService.showToast(`Statut de la demande mis à jour.`);
      this.loadData();
    }
  }

  deleteRequest(id: string): void {
    if (confirm('Supprimer cette demande définitivement ?')) {
      this.dataService.deleteRequest(id);
      this.dataService.showToast('Demande supprimée.');
      this.loadData();
    }
  }

  saveSettings(): void {
    this.dataService.showToast('Paramètres de l\'entreprise enregistrés.');
  }

  logout(): void {
    this.dataService.showToast('Déconnexion Administrateur effectuée.');
    this.router.navigate(['/auth'], { queryParams: { type: 'staff' } });
  }
}
