import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { KikiDataService } from './services/kiki-data.service';

@Component({
  selector: 'app-gestionnaire',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-logo">
          <img src="assets/images/logo.png" alt="Kiki Traiteur Logo" onerror="this.style.display='none'">
          <div class="brand-text">
            <span class="brand-title">KIKI TRAITEUR</span>
            <span class="brand-subtitle">La poésie des saveurs</span>
          </div>
        </div>

        <ul class="sidebar-menu">
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'dashboard'" (click)="activeTab = 'dashboard'">
              <i class="fas fa-th-large me-2"></i> Tableau de bord
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'requests'" (click)="activeTab = 'requests'">
              <i class="fas fa-file-invoice me-2"></i> Demandes de devis
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'agenda'" (click)="activeTab = 'agenda'">
              <i class="fas fa-calendar-alt me-2"></i> Calendrier interne
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'mediatheque'" (click)="activeTab = 'mediatheque'">
              <i class="fas fa-images me-2"></i> Médiathèque
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'cms'" (click)="activeTab = 'cms'">
              <i class="fas fa-edit me-2"></i> CMS & Contenus
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'clients'" (click)="activeTab = 'clients'">
              <i class="fas fa-users me-2"></i> Clients
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'staff'" (click)="activeTab = 'staff'">
              <i class="fas fa-user-plus me-2"></i> Personnel
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'sync'" (click)="activeTab = 'sync'">
              <i class="fas fa-exclamation-circle me-2"></i> GOOGLE SYNC & SEC
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <div class="user-badge-container">
            <div class="user-badge">
              <div class="user-avatar">MV</div>
              <div class="user-info">
                <span class="user-name">Marie V.</span>
                <span class="user-role">GESTIONNAIRE</span>
              </div>
            </div>
            <a href="javascript:void(0)" (click)="logout()" class="logout-link">
              <i class="fas fa-sign-out-alt me-2"></i> Déconnexion
            </a>
          </div>
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
          <div *ngIf="activeTab !== 'requests'" class="header-actions">
            <button type="button" (click)="openCreateEventModal()" class="btn-create-event">
              <i class="fas fa-plus-circle"></i> CRÉER UN ÉVÉNEMENT
            </button>
          </div>
        </div>

        <!-- Month Selector Bar (only on Dashboard tab) -->
        <div *ngIf="activeTab === 'dashboard'" class="month-selector-card">
          <button class="month-nav-btn" (click)="prevMonth()" title="Mois précédent">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="month-display">
            <i class="fas fa-calendar-alt calendar-icon"></i>
            <span>{{ currentMonth }}</span>
          </div>
          <button class="month-nav-btn" (click)="nextMonth()" title="Mois suivant">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <!-- TAB 1: DASHBOARD -->
        <section *ngIf="activeTab === 'dashboard'" class="dashboard-section active">
          <!-- 6 KPI Cards Grid -->
          <div class="kpi-grid">
            <!-- 1. DEMANDES REÇUES -->
            <div class="kpi-card card-dark-maroon">
              <div class="kpi-header">DEMANDES REÇUES</div>
              <div class="kpi-body">
                <div class="kpi-icon-box"><i class="fas fa-inbox"></i></div>
                <div class="kpi-stat">
                  <span class="kpi-number">{{ getRequestsThisMonthCount() }}</span>
                  <span class="kpi-sub">pour ce mois</span>
                </div>
              </div>
              <div class="kpi-footer">
                <i class="fas fa-layer-group me-2"></i> Toutes prestations confondues
              </div>
            </div>

            <!-- 2. DEMANDES ABOUTIES -->
            <div class="kpi-card card-bright-red">
              <div class="kpi-header">DEMANDES ABOUTIES</div>
              <div class="kpi-body">
                <div class="kpi-icon-box"><i class="fas fa-check"></i></div>
                <div class="kpi-stat">
                  <span class="kpi-number">{{ getAcceptedCount() }}</span>
                  <span class="kpi-sub">réservations validées</span>
                </div>
              </div>
              <div class="kpi-footer">
                <i class="fas fa-handshake me-2"></i> Devis signés et confirmés
              </div>
            </div>

            <!-- 3. EN ATTENTE DE RÉALISATION -->
            <div class="kpi-card card-gold">
              <div class="kpi-header">EN ATTENTE DE RÉALISATION</div>
              <div class="kpi-body">
                <div class="kpi-icon-box"><i class="fas fa-hourglass-half"></i></div>
                <div class="kpi-stat">
                  <span class="kpi-number">{{ getPendingRealisationCount() }}</span>
                  <span class="kpi-sub">à confirmer ce mois-ci</span>
                </div>
              </div>
              <div class="kpi-footer">
                <i class="fas fa-clock me-2"></i> Statuts : En attente / Devis émis
              </div>
            </div>

            <!-- 4. TAUX DE CONVERSION -->
            <div class="kpi-card card-white">
              <div class="kpi-header">TAUX DE CONVERSION</div>
              <div class="kpi-body">
                <div class="kpi-icon-box"><i class="fas fa-percentage"></i></div>
                <div class="kpi-stat">
                  <span class="kpi-number">{{ getConversionRate() }} %</span>
                  <span class="kpi-sub">abouties / reçues</span>
                </div>
              </div>
              <div class="kpi-footer">
                <i class="fas fa-chart-line me-2"></i> Performance commerciale mensuelle
              </div>
            </div>

            <!-- 5. CLIENTS & ENTREPRISES -->
            <div class="kpi-card card-navy">
              <div class="kpi-header">CLIENTS & ENTREPRISES</div>
              <div class="kpi-body">
                <div class="kpi-icon-box"><i class="fas fa-users"></i></div>
                <div class="kpi-stat">
                  <span class="kpi-number">{{ getClientsCount() }}</span>
                  <span class="kpi-sub">inscrits dans l'ERP</span>
                </div>
              </div>
              <div class="kpi-footer">
                <i class="fas fa-user me-2"></i> {{ getClientsBreakdown() }}
              </div>
            </div>

            <!-- 6. EN ATTENTE DE VALIDATION -->
            <div class="kpi-card card-amber">
              <div class="kpi-header">EN ATTENTE DE VALIDATION</div>
              <div class="kpi-body">
                <div class="kpi-icon-box"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="kpi-stat">
                  <span class="kpi-number">{{ getPendingValidationCount() }}</span>
                  <span class="kpi-sub">demandes urgentes</span>
                </div>
              </div>
              <div class="kpi-footer">
                <i class="fas fa-bolt me-2"></i> Action requise du gestionnaire
              </div>
            </div>
          </div>

          <!-- Dashboard Bottom Grid -->
          <div class="dashboard-bottom-grid">
            <!-- LEFT COLUMN: LINE CHART -->
            <div class="chart-card">
              <div class="chart-header">
                <div class="chart-title">
                  <i class="fas fa-chart-line me-2" style="color: #DC2626;"></i>
                  <span>ÉVOLUTION DES DEMANDES</span>
                </div>
                <p class="chart-subtitle">Courbe sur les 6 derniers mois – par type de prestation</p>
              </div>

              <!-- FILTER TABS -->
              <div class="chart-filter-pills">
                <button *ngFor="let tab of chartTabs" 
                        class="chart-pill-btn" 
                        [class.active]="selectedChartFilter === tab" 
                        (click)="selectedChartFilter = tab">
                  {{ tab }}
                </button>
              </div>

              <!-- SVG LINE CHART -->
              <div class="svg-chart-container">
                <svg viewBox="0 0 560 215" class="svg-chart">
                  <!-- Gradient definition -->
                  <defs>
                    <linearGradient id="maroonGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#7A1C1C" stop-opacity="0.25" />
                      <stop offset="100%" stop-color="#7A1C1C" stop-opacity="0.01" />
                    </linearGradient>
                  </defs>

                  <!-- Horizontal Grid lines & Y Labels -->
                  <line x1="55" y1="20" x2="540" y2="20" stroke="#E2E8F0" stroke-width="1" />
                  <text x="35" y="24" fill="#64748B" font-size="11" text-anchor="end" font-family="Poppins, sans-serif">3</text>

                  <line x1="55" y1="70" x2="540" y2="70" stroke="#E2E8F0" stroke-width="1" />
                  <text x="35" y="74" fill="#64748B" font-size="11" text-anchor="end" font-family="Poppins, sans-serif">2</text>

                  <line x1="55" y1="120" x2="540" y2="120" stroke="#E2E8F0" stroke-width="1" />
                  <text x="35" y="124" fill="#64748B" font-size="11" text-anchor="end" font-family="Poppins, sans-serif">1</text>

                  <line x1="55" y1="170" x2="540" y2="170" stroke="#CBD5E1" stroke-width="1.5" />

                  <!-- Shaded Area Under Curve -->
                  <path [attr.d]="getChartAreaPath()" fill="url(#maroonGradient)" />

                  <!-- Line Curve -->
                  <path [attr.d]="getChartPath()" fill="none" stroke="#7A1C1C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

                  <!-- Data Point Dots & Month Labels -->
                  <g *ngFor="let pt of getChartPoints()">
                    <circle [attr.cx]="pt.x" [attr.cy]="pt.y" [attr.r]="pt.isLast ? 5 : 3.5" 
                            fill="#7A1C1C" [attr.stroke]="pt.isLast ? '#FFFFFF' : 'none'" 
                            [attr.stroke-width]="pt.isLast ? 2 : 0" />
                    <text [attr.x]="pt.x" y="198" fill="#64748B" font-size="11" text-anchor="middle" font-family="Poppins, sans-serif">{{ pt.label }}</text>
                  </g>
                </svg>
              </div>
            </div>

            <!-- RIGHT COLUMN: STACKED CARDS -->
            <div class="right-stacked-cards">
              <!-- TOP CARD: DISPONIBILITÉ & BLOCAGES -->
              <div class="side-card">
                <div class="side-card-title">
                  <i class="fas fa-shield-alt me-2" style="color: #DC2626;"></i>
                  <span>DISPONIBILITÉ & BLOCAGES</span>
                </div>

                <div class="conflict-box">
                  <div class="conflict-item">
                    <div class="conflict-num green-text">{{ getActiveConflictsCount() }}</div>
                    <div class="conflict-label">CONFLIT ACTIF</div>
                  </div>
                  <div class="conflict-divider"></div>
                  <div class="conflict-item">
                    <div class="conflict-num orange-text">{{ getRoomBlockedCount() }}</div>
                    <div class="conflict-label">BLOCAGE SALLE</div>
                  </div>
                </div>

                <a href="javascript:void(0)" (click)="activeTab = 'agenda'" class="side-card-link">
                  GÉRER LE CALENDRIER <i class="fas fa-arrow-right ms-1"></i>
                </a>
              </div>

              <!-- BOTTOM CARD: FLUX DES DEMANDES RÉCENTES -->
              <div class="side-card">
                <div class="side-card-title">
                  <i class="fas fa-bars me-2" style="color: #DC2626;"></i>
                  <span>FLUX DES DEMANDES RÉCENTES</span>
                </div>

                <div class="recent-requests-list">
                  <div class="recent-item" *ngFor="let item of getRecentRequestsFeed()">
                    <div class="recent-left">
                      <span class="dot" [ngStyle]="{'background-color': item.dotColor}"></span>
                      <span class="recent-name">{{ item.name }}</span>
                    </div>
                    <div class="recent-right">
                      <span class="recent-badge">{{ item.badge }}</span>
                      <span class="recent-date">{{ item.date }}</span>
                    </div>
                  </div>
                </div>

                <a href="javascript:void(0)" (click)="activeTab = 'requests'" class="side-card-link">
                  VOIR TOUTES LES DEMANDES <i class="fas fa-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 2: REQUESTS -->
        <section *ngIf="activeTab === 'requests'" class="dashboard-section active">
          <div class="panel">
            <!-- En-tête de la table avec bouton Créer un Devis -->
            <div class="panel-header" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <h2 class="panel-title" style="color: #7A1C1C; font-size: 1.15rem; margin: 0;">Demandes de devis des clients</h2>
              <button class="btn" style="background: #7A1C1C; color: white; font-weight: 600;" (click)="openCreateDevisModal()">
                <i class="fas fa-plus me-1"></i> CRÉER UN DEVIS
              </button>
            </div>

            <!-- FILTRES RECHERCHE CLIENT & PRESTATIONS -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 0.85rem;">
              <input type="text" class="form-control" [(ngModel)]="requestClientFilter" placeholder="Rechercher un client..." style="width: 210px; font-size: 0.78rem;">
              <select class="form-control" [(ngModel)]="requestPrestationFilter" style="width: 210px; font-size: 0.78rem;">
                <option value="ALL">Toutes les prestations</option>
                <option value="salle-diva">Salle La Diva</option>
                <option value="traiteur">Service Traiteur Prestige</option>
                <option value="evenements">Organisation d'Événements</option>
                <option value="decoration">Design & Décoration</option>
                <option value="location">Location de Matériel</option>
                <option value="foodtruck">Food Truck Gourmet</option>
              </select>
            </div>

            <!-- BOUTONS DE FILTRE PAR STATUT (restent sélectionnés après pagination) -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
              <button *ngFor="let sf of statusFiltersList" type="button" class="btn btn-sm"
                [style.background]="selectedRequestStatusFilter === sf.value ? '#7A1C1C' : '#F1F5F9'"
                [style.color]="selectedRequestStatusFilter === sf.value ? 'white' : '#334155'"
                [style.border]="selectedRequestStatusFilter === sf.value ? '1px solid #7A1C1C' : '1px solid #E2E8F0'"
                style="border-radius: 20px; padding: 0.35rem 0.85rem; font-weight: 600;"
                (click)="selectRequestStatusFilter(sf.value)">
                {{ sf.label }} ({{ getRequestCountByStatus(sf.value) }})
              </button>
            </div>

            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID DEMANDE</th>
                    <th>CLIENT</th>
                    <th>TYPE</th>
                    <th>PRESTATION</th>
                    <th>LIEU</th>
                    <th>DATE</th>
                    <th>CONVIVES</th>
                    <th>STATUT</th>
                    <th style="min-width: 190px;">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let req of getFilteredRequestsForPage()">
                    <td><strong style="color: #1E293B;">#{{ req.id }}</strong></td>
                    <td><strong style="color: #1E293B;">{{ getClientName(req.clientId) }}</strong></td>
                    <td>
                      <span class="badge" style="background: #EDE9FE; color: #6D28D9; font-size: 0.65rem;">
                        {{ getClientType(req.clientId) }}
                      </span>
                    </td>
                    <td>{{ getPrestationName(req.prestationId) }}</td>
                    <td>{{ req.location || 'À définir' }}</td>
                    <td>{{ formatDate(req.date) }}</td>
                    <td>{{ req.guests || 0 }}</td>
                    <td>
                      <span class="badge" [ngClass]="getBadgeClass(req.status)">
                        {{ getStatusLabel(req.status) }}
                      </span>
                    </td>
                    <td>
                      <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; align-items: center;">
                        <!-- 1. En attente (pending) : Voir détails avant acceptation, Accepter ou Refuser -->
                        <ng-container *ngIf="isPendingStatus(req.status)">
                          <button class="btn btn-sm" style="background: #475569; color: white;" (click)="openTraceabilityModal(req)" title="Voir les détails de la demande">
                            <i class="fas fa-eye"></i>
                          </button>
                          <button class="btn btn-sm" style="background: #059669; color: white;" (click)="acceptRequest(req)" title="Accepter la demande">
                            <i class="fas fa-check"></i>
                          </button>
                          <button class="btn btn-sm" style="background: #DC2626; color: white;" (click)="setStatus(req.id, 'rejected')" title="Refuser">
                            <i class="fas fa-times"></i>
                          </button>
                        </ng-container>

                        <!-- 2. Accepté (accepted) : Bouton Modifier (pour faire ou envoyer le devis) -->
                        <ng-container *ngIf="req.status === 'accepted'">
                          <button class="btn btn-sm" style="background: #7F1D1D; color: white;" (click)="openDevisModal(req, false)" title="Modifier et envoyer le devis">
                            <i class="fas fa-edit"></i>
                          </button>
                        </ng-container>

                        <!-- 3. Envoyé (sent ou quoted) : Voir et Modifier -->
                        <ng-container *ngIf="req.status === 'sent' || req.status === 'quoted'">
                          <button class="btn btn-sm" style="background: #475569; color: white;" (click)="openDevisModal(req, true)" title="Voir le devis envoyé">
                            <i class="fas fa-eye"></i>
                          </button>
                          <button class="btn btn-sm" style="background: #DC2626; color: white;" (click)="openDevisModal(req, false)" title="Modifier le devis">
                            <i class="fas fa-edit"></i>
                          </button>
                        </ng-container>

                        <!-- 4. Aboutis (aboutis) ou Refusé (rejected) : Voir -->
                        <ng-container *ngIf="req.status === 'aboutis' || req.status === 'rejected'">
                          <button class="btn btn-sm" style="background: #475569; color: white;" (click)="openDevisModal(req, true)" title="Voir les détails">
                            <i class="fas fa-eye"></i>
                          </button>
                        </ng-container>
                      </div>
                    </td>
                  </tr>
                  <tr *ngIf="getFilteredRequestsForPage().length === 0">
                    <td colspan="9" style="text-align: center; padding: 2.5rem; color: #94A3B8;">
                      Aucune demande de devis trouvée avec les filtres actuels.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- PAGINATION CIRCLES (Image 4) -->
            <div *ngIf="getRequestTotalPages() > 1" style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.5rem;">
              <button *ngFor="let p of getRequestPageArray()" type="button" class="btn btn-sm"
                [style.background]="requestPage === p ? '#DC2626' : 'white'"
                [style.color]="requestPage === p ? 'white' : '#64748B'"
                [style.border]="requestPage === p ? '1px solid #DC2626' : '1px solid #CBD5E1'"
                style="width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; padding: 0;"
                (click)="requestPage = p">
                {{ p }}
              </button>
            </div>
          </div>
        </section>

        <!-- TAB 3: AGENDA (CALENDRIER INTERNE - IMAGE 5) -->
        <section *ngIf="activeTab === 'agenda'" class="dashboard-section active">
          <!-- BARRE SUPÉRIEURE DES FILTRES & NAVIGATION MOIS -->
          <div class="panel" style="margin-bottom: 1.25rem;">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
              <div style="display: flex; flex-wrap: wrap; gap: 0.65rem; align-items: center;">
                <select class="form-control" [(ngModel)]="calendarPrestationFilter" style="width: 190px; font-size: 0.78rem;">
                  <option value="ALL">Toutes les prestations</option>
                  <option value="salle-diva">Salle La Diva</option>
                  <option value="traiteur">Service Traiteur Prestige</option>
                  <option value="evenements">Organisation d'Événements</option>
                  <option value="decoration">Design & Décoration</option>
                  <option value="location">Location de Matériel</option>
                  <option value="foodtruck">Food Truck Gourmet</option>
                </select>

                <input type="text" class="form-control" [(ngModel)]="calendarClientFilter" placeholder="Rechercher un client..." style="width: 190px; font-size: 0.78rem;">

                <select class="form-control" [(ngModel)]="calendarResourceFilter" style="width: 190px; font-size: 0.78rem;">
                  <option value="ALL">Toutes les ressources</option>
                  <option value="Salle La Diva">Salle La Diva</option>
                  <option value="Cuisine & Brigade">Cuisine & Brigade</option>
                  <option value="Scénographie">Scénographie</option>
                  <option value="Matériel & Logistique">Matériel & Logistique</option>
                </select>

                <input type="text" class="form-control" [(ngModel)]="calendarStaffFilter" placeholder="Rechercher un responsable..." style="width: 190px; font-size: 0.78rem;">
              </div>

              <!-- MONTH PILL NAVIGATION (Image 5) -->
              <div style="display: flex; align-items: center; background: white; border: 1px solid #E2E8F0; border-radius: 50px; padding: 0.35rem 0.85rem; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                <button type="button" (click)="prevCalendarMonth()" style="background: transparent; border: none; color: #7A1C1C; cursor: pointer; font-size: 0.95rem; padding: 0 0.5rem;"><i class="fas fa-chevron-left"></i></button>
                <span style="color: #7A1C1C; font-weight: 700; font-size: 1.05rem; margin: 0 0.75rem;">{{ currentCalendarMonth }}</span>
                <button type="button" (click)="nextCalendarMonth()" style="background: transparent; border: none; color: #7A1C1C; cursor: pointer; font-size: 0.95rem; padding: 0 0.5rem;"><i class="fas fa-chevron-right"></i></button>
              </div>
            </div>
          </div>

          <div class="panel">
            <!-- VIEW SWITCHER (Mois / Semaine / Jour / Événements) -->
            <div style="display: flex; gap: 0.4rem; margin-bottom: 1.25rem;">
              <button type="button" class="btn btn-sm" [style.background]="calendarView === 'Mois' ? '#DC2626' : 'white'" [style.color]="calendarView === 'Mois' ? 'white' : '#1E293B'" [style.border]="calendarView === 'Mois' ? 'none' : '1px solid #E2E8F0'" style="border-radius: 20px; padding: 0.35rem 1rem; font-weight: 600;" (click)="calendarView = 'Mois'">Mois</button>
              <button type="button" class="btn btn-sm" [style.background]="calendarView === 'Semaine' ? '#DC2626' : 'white'" [style.color]="calendarView === 'Semaine' ? 'white' : '#1E293B'" [style.border]="calendarView === 'Semaine' ? 'none' : '1px solid #E2E8F0'" style="border-radius: 20px; padding: 0.35rem 1rem; font-weight: 600;" (click)="calendarView = 'Semaine'">Semaine</button>
              <button type="button" class="btn btn-sm" [style.background]="calendarView === 'Jour' ? '#DC2626' : 'white'" [style.color]="calendarView === 'Jour' ? 'white' : '#1E293B'" [style.border]="calendarView === 'Jour' ? 'none' : '1px solid #E2E8F0'" style="border-radius: 20px; padding: 0.35rem 1rem; font-weight: 600;" (click)="calendarView = 'Jour'">Jour</button>
              <button type="button" class="btn btn-sm" [style.background]="calendarView === 'Événements' ? '#DC2626' : 'white'" [style.color]="calendarView === 'Événements' ? 'white' : '#1E293B'" [style.border]="calendarView === 'Événements' ? 'none' : '1px solid #E2E8F0'" style="border-radius: 20px; padding: 0.35rem 1rem; font-weight: 600;" (click)="calendarView = 'Événements'">Événements</button>
            </div>

            <!-- GRILLE CALENDRIER (Mois / Semaine / Jour) -->
            <div *ngIf="calendarView !== 'Événements'" style="border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; background: white;">
              <!-- EN-TÊTE JOURS DE LA SEMAINE -->
              <div style="display: grid; grid-template-columns: repeat(7, 1fr); background: #F8FAFC; border-bottom: 1px solid #E2E8F0; text-align: center; font-weight: 600; color: #475569; font-size: 0.8rem; padding: 0.65rem 0;">
                <div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div><div>Dim</div>
              </div>
              <!-- GRILLE DES JOURS DU MOIS -->
              <div style="display: grid; grid-template-columns: repeat(7, 1fr); background: #E2E8F0; gap: 1px;">
                <div *ngFor="let day of getCalendarGridDays()" [style.background]="day.isCurrentMonth ? 'white' : '#F8FAFC'" [style.color]="day.isCurrentMonth ? '#1E293B' : '#94A3B8'" style="min-height: 115px; padding: 0.5rem; display: flex; flex-direction: column;">
                  <span style="font-size: 0.82rem; font-weight: 600; margin-bottom: 0.35rem;">{{ day.dayNumber }}</span>
                  <!-- EVENTS -->
                  <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                    <div *ngFor="let ev of day.events" (click)="openEventDetailsModal(ev)" [style.background]="getEventBlockBg(ev)" [style.color]="getEventBlockColor(ev)" style="border-radius: 4px; padding: 0.3rem 0.5rem; font-size: 0.72rem; font-weight: 600; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; box-shadow: 0 1px 2px rgba(0,0,0,0.08);">
                      <span>{{ ev.title }}</span> <span style="font-weight: 400; opacity: 0.95;">{{ ev.time }} - {{ getEndTime(ev.time) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- VUE EN LISTE (Événements) -->
            <div *ngIf="calendarView === 'Événements'" class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Date & Heure</th>
                    <th>Titre Événement</th>
                    <th>Client</th>
                    <th>Lieu & Invités</th>
                    <th>Personnel Assigné</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let ev of getEventsForPage()">
                    <td>
                      <strong>{{ formatDate(ev.date) }}</strong><br>
                      <small style="color:#64748B;">{{ ev.time }} - {{ getEndTime(ev.time) }}</small>
                    </td>
                    <td>
                      <strong style="color:#7A1C1C;">{{ ev.title }}</strong><br>
                      <small style="color:#64748B;">{{ getPrestationName(ev.type) }}</small>
                    </td>
                    <td>
                      <strong>{{ ev.clientName || getClientName(ev.clientId) }}</strong><br>
                      <small style="color:#64748B;">{{ ev.clientPhone || '' }}</small>
                    </td>
                    <td>
                      <span>{{ ev.location }}</span><br>
                      <small style="color:#64748B;">{{ ev.guests }} convives</small>
                    </td>
                    <td>
                      <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                        <span *ngFor="let stId of ev.staffIds" class="badge" style="background:#E2E8F0; color:#1E293B; font-size:0.68rem;">
                          <i class="fas fa-user me-1"></i> {{ getStaffName(stId) }}
                        </span>
                        <span *ngIf="!ev.staffIds || ev.staffIds.length === 0" style="color:#94A3B8; font-size:0.75rem;">Aucun staff assigné</span>
                      </div>
                    </td>
                    <td><span class="badge badge-accepted">{{ ev.status || 'Confirmé' }}</span></td>
                  </tr>
                  <tr *ngIf="getFilteredEventsForCalendar().length === 0">
                    <td colspan="6" style="text-align: center; padding: 2.5rem; color: #94A3B8;">
                      Aucun événement programmé avec ces critères.
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- PAGINATION ÉVÉNEMENTS -->
              <div *ngIf="getEventTotalPages() > 1" style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.25rem;">
                <button *ngFor="let p of getEventPageArray()" type="button" class="btn btn-sm"
                  [style.background]="eventListPage === p ? '#7A1C1C' : 'white'"
                  [style.color]="eventListPage === p ? 'white' : '#64748B'"
                  [style.border]="eventListPage === p ? '1px solid #7A1C1C' : '1px solid #CBD5E1'"
                  style="width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; padding: 0;"
                  (click)="eventListPage = p">
                  {{ p }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 4: MEDIATHEQUE -->
        <section *ngIf="activeTab === 'mediatheque'" class="dashboard-section active">
          <div class="panel">
            <div class="panel-header" style="flex-wrap: wrap; gap: 0.75rem;">
              <h2 class="panel-title">Médiathèque (Photos & Vidéos regroupées par événement)</h2>
              <button class="btn btn-accent" (click)="openAddMediaModal()"><i class="fas fa-upload me-1"></i> Ajouter un média</button>
            </div>
            <!-- Event filter bar -->
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
              <button class="btn btn-sm" [style.background]="selectedEventFilterForMedia === 'ALL' ? '#7A1C1C' : '#E2E8F0'" [style.color]="selectedEventFilterForMedia === 'ALL' ? 'white' : '#334155'" (click)="selectedEventFilterForMedia = 'ALL'">
                Tous les événements ({{ mediaList.length }})
              </button>
              <button *ngFor="let title of getEventTitlesWithMedia()" class="btn btn-sm" [style.background]="selectedEventFilterForMedia === title ? '#7A1C1C' : '#E2E8F0'" [style.color]="selectedEventFilterForMedia === title ? 'white' : '#334155'" (click)="selectedEventFilterForMedia = title">
                {{ title }}
              </button>
            </div>
            <!-- Grouped Sections -->
            <div *ngFor="let evTitle of (selectedEventFilterForMedia === 'ALL' ? getEventTitlesWithMedia() : [selectedEventFilterForMedia])" style="margin-bottom: 1.75rem;">
              <h3 style="color: #1E293B; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.75rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.4rem;">
                <i class="fas fa-folder-open me-2" style="color: #7A1C1C;"></i> {{ evTitle }}
              </h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 1.15rem;">
                <div *ngFor="let m of getMediaByEventTitle(evTitle)" style="border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden; background: white; box-shadow: 0 2px 6px rgba(0,0,0,0.03); position: relative;">
                  <div style="height: 135px; background: #E2E8F0; position: relative;">
                    <img [src]="m.url" alt="" style="width: 100%; height: 100%; object-fit: cover;">
                    <button class="btn btn-sm" style="position: absolute; top: 0.4rem; right: 0.4rem; background: rgba(220, 38, 38, 0.85); color: white; padding: 0.2rem 0.5rem;" (click)="deleteMedia(m.id)" title="Supprimer">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                  <div style="padding: 0.75rem;">
                    <strong style="display: block; color: #1E293B; font-size: 0.82rem;">{{ m.title }}</strong>
                    <small style="color: #64748B; font-size: 0.72rem; display: block; margin-top: 0.2rem;">
                      <i class="fas" [ngClass]="m.type === 'video' ? 'fa-video' : 'fa-image'"></i> {{ m.type === 'video' ? 'Vidéo' : 'Photo HD' }} • {{ m.eventTitle }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div *ngIf="mediaList.length === 0" style="text-align: center; padding: 2.5rem; color: #94A3B8; font-size: 0.85rem;">
              Aucun média dans la médiathèque. Cliquez sur "Ajouter un média" pour commencer.
            </div>

            <!-- PAGINATION MEDIATHÈQUE -->
            <div *ngIf="getMediaTotalPages() > 1" style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.25rem;">
              <button *ngFor="let p of getMediaPageArray()" type="button" class="btn btn-sm"
                [style.background]="mediaPage === p ? '#7A1C1C' : 'white'"
                [style.color]="mediaPage === p ? 'white' : '#64748B'"
                [style.border]="mediaPage === p ? '1px solid #7A1C1C' : '1px solid #CBD5E1'"
                style="width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; padding: 0;"
                (click)="mediaPage = p">
                {{ p }}
              </button>
            </div>
          </div>
        </section>

        <!-- TAB 5: CMS & CONTENUS -->
        <section *ngIf="activeTab === 'cms'" class="dashboard-section active">
          <div class="panel">
            <div class="panel-header" style="flex-wrap: wrap; gap: 0.75rem;">
              <h2 class="panel-title">Gestion de Contenu (CMS) - Questions Fréquentes (FAQs)</h2>
              <button class="btn btn-accent" (click)="openAddFaqModal()"><i class="fas fa-plus me-1"></i> Créer une FAQ</button>
            </div>
            <p style="color: #64748B; font-size: 0.82rem; margin-bottom: 1.25rem;">
              Gérez ici les questions et réponses fréquemment posées sur votre site internet (création, modification et suppression).
            </p>
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Réponse</th>
                    <th>Catégorie</th>
                    <th style="width: 120px;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let f of getFaqsForPage()">
                    <td><strong style="color: #1E293B;">{{ f.question }}</strong></td>
                    <td style="color: #475569; max-width: 350px;">{{ f.answer }}</td>
                    <td><span class="badge" style="background:#E2E8F0; color:#334155;">{{ f.category || 'Général' }}</span></td>
                    <td>
                      <div style="display: flex; gap: 0.35rem;">
                        <button class="btn btn-sm btn-outline" (click)="openEditFaqModal(f)" title="Modifier">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm" style="background:#DC2626; color:white;" (click)="deleteFaq(f.id)" title="Supprimer">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr *ngIf="faqs.length === 0">
                    <td colspan="4" style="text-align: center; padding: 2rem; color: #94A3B8;">
                      Aucune FAQ configurée.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- PAGINATION FAQS -->
            <div *ngIf="getFaqTotalPages() > 1" style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.25rem;">
              <button *ngFor="let p of getFaqPageArray()" type="button" class="btn btn-sm"
                [style.background]="faqPage === p ? '#7A1C1C' : 'white'"
                [style.color]="faqPage === p ? 'white' : '#64748B'"
                [style.border]="faqPage === p ? '1px solid #7A1C1C' : '1px solid #CBD5E1'"
                style="width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; padding: 0;"
                (click)="faqPage = p">
                {{ p }}
              </button>
            </div>
          </div>
        </section>

        <!-- TAB 6: CLIENTS -->
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
                    <th style="width: 100px;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let c of getClientsForPage()">
                    <td><strong>{{ c.id }}</strong></td>
                    <td>{{ c.name }}</td>
                    <td>{{ c.organization || '-' }}</td>
                    <td>{{ c.email }}</td>
                    <td><span class="badge" style="background:#E2E8F0; color:#334155;">{{ c.organization ? 'Entreprise' : 'Particulier' }}</span></td>
                    <td>
                      <button class="btn btn-sm btn-outline" (click)="openEditClientModal(c)" title="Modifier Client">
                        <i class="fas fa-edit"></i> Modifier
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- PAGINATION CLIENTS -->
            <div *ngIf="getClientTotalPages() > 1" style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.25rem;">
              <button *ngFor="let p of getClientPageArray()" type="button" class="btn btn-sm"
                [style.background]="clientPage === p ? '#7A1C1C' : 'white'"
                [style.color]="clientPage === p ? 'white' : '#64748B'"
                [style.border]="clientPage === p ? '1px solid #7A1C1C' : '1px solid #CBD5E1'"
                style="width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; padding: 0;"
                (click)="clientPage = p">
                {{ p }}
              </button>
            </div>
          </div>
        </section>

        <!-- TAB 7: STAFF -->
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
                  <tr *ngFor="let s of getStaffForPage()">
                    <td><strong>{{ s.name }}</strong></td>
                    <td>{{ s.role }}</td>
                    <td>{{ s.phone }}</td>
                    <td><span class="badge badge-accepted">Disponible</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- PAGINATION STAFF -->
            <div *ngIf="getStaffTotalPages() > 1" style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.25rem;">
              <button *ngFor="let p of getStaffPageArray()" type="button" class="btn btn-sm"
                [style.background]="staffPage === p ? '#7A1C1C' : 'white'"
                [style.color]="staffPage === p ? 'white' : '#64748B'"
                [style.border]="staffPage === p ? '1px solid #7A1C1C' : '1px solid #CBD5E1'"
                style="width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; padding: 0;"
                (click)="staffPage = p">
                {{ p }}
              </button>
            </div>
          </div>
        </section>

        <!-- TAB 8: GOOGLE SYNC -->
        <section *ngIf="activeTab === 'sync'" class="dashboard-section active">
          <div class="panel" style="max-width: 640px;">
            <div class="panel-header">
              <h2 class="panel-title">Synchronisation Google Calendar & Sécurité</h2>
            </div>
            <div style="background: #1E293B; color: white; padding: 1.25rem; border-radius: 10px; margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div>
                  <h4 style="color: white; font-size: 0.95rem; margin-bottom: 0.35rem;">Statut de synchronisation</h4>
                  <p style="color: #94A3B8; font-size: 0.8rem; margin: 0;">{{ syncStatus }}</p>
                </div>
                <button class="btn btn-accent" (click)="triggerSync()">
                  <i class="fas fa-sync me-1"></i> Synchroniser maintenant
                </button>
              </div>
            </div>
            <p style="color: #64748B; font-size: 0.82rem; margin: 0;">
              La synchronisation bidirectionnelle Google Calendar met à jour automatiquement votre agenda en ligne chaque fois qu'un devis est accepté ou modifié dans l'ERP Kiki Traiteur.
            </p>
          </div>
        </section>

        <!-- MODAL 1: CRÉER UN ÉVÉNEMENT (AVEC RECHERCHE CLIENT & MULTI-SÉLECTION PERSONNEL) -->
        <div *ngIf="showCreateEventModal" class="custom-modal-backdrop" (click)="closeCreateEventModal()">
          <div class="custom-modal-box" style="max-width: 650px;" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3 style="margin: 0; color: #7A1C1C;"><i class="fas fa-calendar-plus me-2"></i>Créer un Événement (Agenda ERP)</h3>
              <button class="btn-close" (click)="closeCreateEventModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <!-- CLIENT SEARCH / SELECTION -->
              <div class="form-group" style="margin-bottom: 1.25rem; background: #F8FAFC; padding: 1rem; border-radius: 8px; border: 1px solid #E2E8F0;">
                <label style="font-weight: 600; color: #1E293B; display: block; margin-bottom: 0.4rem;">
                  <i class="fas fa-user-tag me-1" style="color: #7A1C1C;"></i> Sélection du Client <span style="color: #DC2626;">*</span>
                </label>
                <div *ngIf="selectedClientForEvent" style="display: flex; align-items: center; justify-content: space-between; background: #FEF2F2; border: 1px solid #FECACA; padding: 0.6rem 0.85rem; border-radius: 6px;">
                  <div>
                    <strong style="color: #7A1C1C;">{{ selectedClientForEvent.name }}</strong>
                    <span style="color: #64748B; font-size: 0.8rem; margin-left: 0.5rem;">({{ selectedClientForEvent.email }} - {{ selectedClientForEvent.phone }})</span>
                  </div>
                  <button type="button" class="btn btn-sm" style="background: #DC2626; color: white;" (click)="removeSelectedClient()">
                    <i class="fas fa-times"></i> Changer
                  </button>
                </div>
                <div *ngIf="!selectedClientForEvent">
                  <input type="text" class="form-control" [(ngModel)]="clientSearchQuery" placeholder="Rechercher par nom ou e-mail..." style="margin-bottom: 0.5rem;">
                  <div style="max-height: 120px; overflow-y: auto; border: 1px solid #E2E8F0; border-radius: 6px; background: white;">
                    <div *ngFor="let c of getFilteredClients()" (click)="selectClientForEvent(c)" style="padding: 0.5rem 0.75rem; border-bottom: 1px solid #F1F5F9; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" class="client-search-item">
                      <div>
                        <strong>{{ c.name }}</strong>
                        <small style="color: #64748B; display: block;">{{ c.email }} • {{ c.phone }}</small>
                      </div>
                      <span class="badge" style="background: #E2E8F0; color: #334155;">Sélectionner</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- EVENEMENT DETAILS -->
              <div class="form-group-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div class="form-group">
                  <label>Titre de l'événement</label>
                  <input type="text" class="form-control" [(ngModel)]="eventForm.title" placeholder="Ex: Mariage VIP - La Diva">
                </div>
                <div class="form-group">
                  <label>Type de prestation</label>
                  <select class="form-control" [(ngModel)]="eventForm.type">
                    <option value="salle-diva">Salle La Diva</option>
                    <option value="traiteur">Service Traiteur Prestige</option>
                    <option value="evenements">Organisation Événements</option>
                    <option value="decoration">Design & Décoration</option>
                    <option value="foodtruck">Food Truck Gourmet</option>
                  </select>
                </div>
              </div>

              <div class="form-group-row" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div class="form-group">
                  <label>Date</label>
                  <input type="date" class="form-control" [(ngModel)]="eventForm.date">
                </div>
                <div class="form-group">
                  <label>Heure</label>
                  <input type="time" class="form-control" [(ngModel)]="eventForm.time">
                </div>
                <div class="form-group">
                  <label>Convives</label>
                  <input type="number" class="form-control" [(ngModel)]="eventForm.guests">
                </div>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Lieu de réception</label>
                <input type="text" class="form-control" [(ngModel)]="eventForm.location" placeholder="Ex: Salle La Diva, Dakar ou Villa Almadies">
              </div>

              <!-- SIGNATURE GASTRONOMIQUE -->
              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label style="font-weight: 600; color: #1E293B; display: block; margin-bottom: 0.35rem;">
                  <i class="fas fa-utensils me-1" style="color: #7A1C1C;"></i> Signature Gastronomique Kiki Traiteur <span style="color: #DC2626;">*</span>
                </label>
                <select class="form-control" [(ngModel)]="eventForm.signatureGastronomique">
                  <option value="Cuisine Royale Sénégalaise & Fusion">Cuisine Royale Sénégalaise & Fusion</option>
                  <option value="Buffet Gastronomique International">Buffet Gastronomique International</option>
                  <option value="Cocktail Dînatoire Prestige La Diva">Cocktail Dînatoire Prestige La Diva</option>
                  <option value="Menu Signature Kiki Traiteur">Menu Signature Kiki Traiteur</option>
                  <option value="Service à la Table VIP & Voiturier">Service à la Table VIP & Voiturier</option>
                </select>
              </div>

              <!-- STAFF SEARCH / SELECTION MULTIPLE -->
              <div class="form-group" style="background: #F8FAFC; padding: 1rem; border-radius: 8px; border: 1px solid #E2E8F0; margin-bottom: 1rem;">
                <label style="font-weight: 600; color: #1E293B; display: block; margin-bottom: 0.5rem;">
                  <i class="fas fa-users-cog me-1" style="color: #7A1C1C;"></i> Assignation du Personnel Traiteur (Recherche & Sélection)
                </label>
                <!-- LISTE DES PERSONNELS DÉJÀ SÉLECTIONNÉS -->
                <div *ngIf="selectedStaffListForEvent && selectedStaffListForEvent.length > 0" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem;">
                  <div *ngFor="let st of selectedStaffListForEvent" style="display: flex; align-items: center; background: #FEF2F2; border: 1px solid #FECACA; padding: 0.35rem 0.65rem; border-radius: 6px;">
                    <strong style="color: #7A1C1C; font-size: 0.78rem; margin-right: 0.4rem;">{{ st.name }} ({{ st.role }})</strong>
                    <button type="button" class="btn-close" style="font-size: 0.75rem; color: #DC2626;" (click)="removeStaffFromEvent(st.id)"><i class="fas fa-times"></i></button>
                  </div>
                </div>
                <!-- RECHERCHE PERSONNEL -->
                <input type="text" class="form-control" [(ngModel)]="staffSearchQuery" placeholder="Rechercher un membre du personnel par nom ou rôle..." style="margin-bottom: 0.5rem;">
                <div style="max-height: 120px; overflow-y: auto; border: 1px solid #E2E8F0; border-radius: 6px; background: white;">
                  <div *ngFor="let s of getFilteredStaffForSearch()" (click)="addStaffToEvent(s)" style="padding: 0.5rem 0.75rem; border-bottom: 1px solid #F1F5F9; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <strong style="font-size: 0.82rem;">{{ s.name }}</strong>
                      <small style="color: #64748B; display: block; font-size: 0.72rem;">{{ s.role }}</small>
                    </div>
                    <span class="badge" style="background: #E2E8F0; color: #334155;"><i class="fas fa-plus me-1"></i> Sélectionner</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
              <button type="button" class="btn btn-outline" (click)="closeCreateEventModal()">Annuler</button>
              <button type="button" class="btn" style="background: #7A1C1C; color: white;" (click)="submitCreateEvent()">
                <i class="fas fa-check me-1"></i> Enrégistrer dans le Calendrier
              </button>
            </div>
          </div>
        </div>

        <!-- MODAL 2: DEVIS & TRANSMISSION PAR E-MAIL -->
        <div *ngIf="showDevisModal" class="custom-modal-backdrop" (click)="closeDevisModal()">
          <div class="custom-modal-box" style="max-width: 680px;" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3 style="margin: 0; color: #7A1C1C;"><i class="fas fa-file-invoice-dollar me-2"></i>Édition & Envoi du Devis par Mail</h3>
              <button class="btn-close" (click)="closeDevisModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <!-- SÉLECTION CLIENT ET INFOS SI NOUVEAU DEVIS -->
              <div *ngIf="isNewDevis" style="background: #F8FAFC; padding: 1rem; border-radius: 8px; border: 1px solid #E2E8F0; margin-bottom: 1rem;">
                <label style="font-weight: 600; color: #1E293B; display: block; margin-bottom: 0.35rem;">
                  <i class="fas fa-user-tag me-1" style="color: #7A1C1C;"></i> Client destinataire du devis <span style="color: #DC2626;">*</span>
                </label>
                <div *ngIf="selectedClientForDevis" style="display: flex; align-items: center; justify-content: space-between; background: #FEF2F2; border: 1px solid #FECACA; padding: 0.5rem 0.75rem; border-radius: 6px; margin-bottom: 0.75rem;">
                  <div>
                    <strong style="color: #7A1C1C;">{{ selectedClientForDevis.name }}</strong>
                    <span style="color: #64748B; font-size: 0.8rem; margin-left: 0.5rem;">({{ selectedClientForDevis.email }})</span>
                  </div>
                  <button type="button" class="btn btn-sm" style="background: #DC2626; color: white;" (click)="selectedClientForDevis = null">
                    <i class="fas fa-times"></i> Changer
                  </button>
                </div>
                <div *ngIf="!selectedClientForDevis" style="margin-bottom: 0.75rem;">
                  <input type="text" class="form-control" [(ngModel)]="devisSearchClientQuery" placeholder="Rechercher par nom client..." style="margin-bottom: 0.4rem;">
                  <div style="max-height: 110px; overflow-y: auto; border: 1px solid #E2E8F0; border-radius: 6px; background: white;">
                    <div *ngFor="let c of getFilteredClientsForDevis()" (click)="selectClientForDevis(c)" style="padding: 0.45rem 0.75rem; border-bottom: 1px solid #F1F5F9; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                      <div><strong>{{ c.name }}</strong> <small style="color: #64748B;">({{ c.email }})</small></div>
                      <span class="badge" style="background: #E2E8F0; color: #334155;">Sélectionner</span>
                    </div>
                  </div>
                </div>

                <!-- INFOS DU DEVIS (Prestation, convives, lieu, date) -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;">
                  <div>
                    <label style="font-size: 0.75rem; color: #475569;">Type de prestation</label>
                    <select class="form-control" [(ngModel)]="devisForm.prestationId" style="font-size: 0.8rem;">
                      <option value="salle-diva">Salle La Diva</option>
                      <option value="traiteur">Service Traiteur Prestige</option>
                      <option value="evenements">Organisation Événements</option>
                      <option value="decoration">Design & Décoration</option>
                      <option value="location">Location de Matériel</option>
                    </select>
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: #475569;">Convives</label>
                    <input type="number" class="form-control" [(ngModel)]="devisForm.guests" style="font-size: 0.8rem;">
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                  <div>
                    <label style="font-size: 0.75rem; color: #475569;">Lieu de réception</label>
                    <input type="text" class="form-control" [(ngModel)]="devisForm.location" style="font-size: 0.8rem;">
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: #475569;">Date prévue</label>
                    <input type="date" class="form-control" [(ngModel)]="devisForm.date" style="font-size: 0.8rem;">
                  </div>
                </div>
              </div>

              <!-- INFOS CLIENT STANDARD (si devis existant) -->
              <div *ngIf="!isNewDevis" style="background: #F8FAFC; padding: 0.75rem 1rem; border-radius: 6px; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong>Client :</strong> {{ devisForm.clientName }}
                </div>
                <div>
                  <strong>E-mail :</strong> {{ devisForm.clientEmail }}
                </div>
                <span class="badge" style="background: #FEF3C7; color: #D97706;">{{ devisForm.status | uppercase }}</span>
              </div>

              <!-- Lignes du devis -->
              <table class="admin-table" style="margin-bottom: 1rem;">
                <thead>
                  <tr>
                    <th>Description de la prestation</th>
                    <th style="width: 80px;">Qté</th>
                    <th style="width: 120px;">P.U (FCFA)</th>
                    <th style="width: 50px;"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of devisForm.items; let i = index">
                    <td><input type="text" class="form-control" [disabled]="isDevisReadonly" [(ngModel)]="item.desc" (ngModelChange)="onDevisFormChange()"></td>
                    <td><input type="number" class="form-control" [disabled]="isDevisReadonly" [(ngModel)]="item.qty" (ngModelChange)="onDevisFormChange()"></td>
                    <td><input type="number" class="form-control" [disabled]="isDevisReadonly" [(ngModel)]="item.unitPrice" (ngModelChange)="onDevisFormChange()"></td>
                    <td>
                      <button *ngIf="!isDevisReadonly" type="button" class="btn btn-sm" style="color: #DC2626;" (click)="removeDevisItem(i)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button *ngIf="!isDevisReadonly" type="button" class="btn btn-sm btn-outline" (click)="addDevisItem()" style="margin-bottom: 1.25rem;">
                <i class="fas fa-plus me-1"></i> Ajouter une ligne
              </button>

              <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;">
                <div style="width: 260px; background: #F8FAFC; padding: 1rem; border-radius: 8px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                    <span>Sous-total :</span> <strong>{{ getDevisSubtotal() | number }} FCFA</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; align-items: center;">
                    <span>Remise (%) :</span>
                    <input type="number" class="form-control" [disabled]="isDevisReadonly" [(ngModel)]="devisForm.discount" (ngModelChange)="onDevisFormChange()" style="width: 70px; padding: 0.2rem;">
                  </div>
                  <div style="display: flex; justify-content: space-between; border-top: 1px solid #CBD5E1; padding-top: 0.5rem; color: #7A1C1C; font-size: 1.05rem;">
                    <span>Total Net :</span> <strong>{{ getDevisTotal() | number }} FCFA</strong>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
              <button type="button" class="btn btn-outline" (click)="closeDevisModal()">{{ isDevisReadonly ? 'Fermer' : 'Annuler' }}</button>
              <div *ngIf="!isDevisReadonly" style="display: flex; gap: 0.6rem;">
                <!-- Devis déjà envoyé : par défaut Créer un événement, si modifié Enregistrer et envoyer -->
                <ng-container *ngIf="devisForm.status === 'sent' || devisForm.status === 'quoted'">
                  <button *ngIf="!isDevisModified" type="button" class="btn" style="background: #059669; color: white;" (click)="concludeDevisAndCreateEvent()">
                    <i class="fas fa-calendar-plus me-1"></i> Créer un événement
                  </button>
                  <button *ngIf="isDevisModified" type="button" class="btn" style="background: #2563EB; color: white;" (click)="sendDevisByEmail()">
                    <i class="fas fa-paper-plane me-1"></i> Enregistrer et envoyer par mail (PDF)
                  </button>
                </ng-container>
                <!-- Autres statuts / nouveau devis -->
                <ng-container *ngIf="devisForm.status !== 'sent' && devisForm.status !== 'quoted'">
                  <button type="button" class="btn" style="background: #2563EB; color: white;" (click)="sendDevisByEmail()">
                    <i class="fas fa-paper-plane me-1"></i> Enregistrer et envoyer par mail (PDF)
                  </button>
                </ng-container>
              </div>
            </div>
          </div>
        </div>

        <!-- MODAL 3: TRAÇABILITÉ COMPLÈTE (DE LA DEMANDE JUSQU'À L'AGENDA) -->
        <div *ngIf="showTraceabilityModal && currentTraceRequest" class="custom-modal-backdrop" (click)="closeTraceabilityModal()">
          <div class="custom-modal-box" style="max-width: 600px;" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3 style="margin: 0; color: #7A1C1C;"><i class="fas fa-history me-2"></i>Traçabilité du Devis & Planning</h3>
              <button class="btn-close" (click)="closeTraceabilityModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <div style="border-left: 3px solid #7A1C1C; padding-left: 1.25rem; margin: 0.5rem 0 1.5rem 0.5rem; position: relative;">
                <!-- Étape 1 : Demande soumise -->
                <div style="margin-bottom: 1.25rem; position: relative;">
                  <span style="position: absolute; left: -1.75rem; top: 0.1rem; width: 12px; height: 12px; border-radius: 50%; background: #059669; border: 2px solid white;"></span>
                  <strong style="color: #1E293B;">1. Demande soumise par le client</strong><br>
                  <div style="background: #F8FAFC; padding: 0.75rem; border-radius: 8px; margin-top: 0.4rem; font-size: 0.8rem; color: #334155;">
                    <div><strong>Client :</strong> {{ getClientName(currentTraceRequest.clientId) }}</div>
                    <div><strong>Prestation :</strong> {{ getPrestationName(currentTraceRequest.prestationId) }} ({{ currentTraceRequest.guests }} convives)</div>
                    <div><strong>Date souhaitée :</strong> {{ formatDate(currentTraceRequest.date) }} — <strong>Lieu :</strong> {{ currentTraceRequest.location || 'À définir' }}</div>
                    <div *ngIf="currentTraceRequest.message" style="margin-top: 0.3rem; font-style: italic; color: #475569;">
                      "{{ currentTraceRequest.message }}"
                    </div>
                  </div>
                </div>

                <!-- Étape 2 : Devis créé / envoyé -->
                <div style="margin-bottom: 1.25rem; position: relative;">
                  <span style="position: absolute; left: -1.75rem; top: 0.1rem; width: 12px; height: 12px; border-radius: 50%;" [style.background]="currentTraceDevis ? '#3B82F6' : '#CBD5E1'"></span>
                  <strong style="color: #1E293B;">2. Traitement & Chiffrage du Devis</strong><br>
                  <div *ngIf="currentTraceDevis && currentTraceDevis.history && currentTraceDevis.history.length">
                    <div *ngFor="let h of currentTraceDevis.history" style="font-size: 0.8rem; color: #475569; margin-top: 0.2rem;">
                      <i class="fas fa-envelope-open-text me-1" style="color: #3B82F6;"></i> {{ h.date }} — {{ h.action }}
                    </div>
                  </div>
                  <div *ngIf="!currentTraceDevis" style="color: #94A3B8; font-size: 0.8rem;">Devis en attente de génération</div>
                </div>

                <!-- Étape 3 : Événement dans l'agenda -->
                <div style="position: relative;">
                  <span style="position: absolute; left: -1.75rem; top: 0.1rem; width: 12px; height: 12px; border-radius: 50%;" [style.background]="currentTraceEvent ? '#7A1C1C' : '#CBD5E1'"></span>
                  <strong style="color: #1E293B;">3. Enrégistrement sur le Calendrier / Agenda</strong><br>
                  <div *ngIf="currentTraceEvent" style="color: #7A1C1C; font-size: 0.82rem; margin-top: 0.25rem;">
                    <i class="fas fa-calendar-check me-1"></i> Confirmé dans le planning : "{{ currentTraceEvent.title }}" le {{ formatDate(currentTraceEvent.date) }} à {{ currentTraceEvent.time }} ({{ currentTraceEvent.location }})
                  </div>
                  <div *ngIf="!currentTraceEvent" style="color: #94A3B8; font-size: 0.8rem;">
                    Pas encore programmé dans le calendrier.
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer" style="display: flex; justify-content: flex-end; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
              <button type="button" class="btn btn-outline" (click)="closeTraceabilityModal()">Fermer</button>
            </div>
          </div>
        </div>

        <!-- MODAL 4: MODIFIER UN CLIENT -->
        <div *ngIf="showEditClientModal && editingClient" class="custom-modal-backdrop" (click)="closeEditClientModal()">
          <div class="custom-modal-box" style="max-width: 500px;" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3 style="margin: 0; color: #7A1C1C;"><i class="fas fa-user-edit me-2"></i>Modifier Fiche Client</h3>
              <button class="btn-close" (click)="closeEditClientModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Nom complet</label>
                <input type="text" class="form-control" [(ngModel)]="editingClient.name">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Société / Organisation</label>
                <input type="text" class="form-control" [(ngModel)]="editingClient.organization">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>E-mail</label>
                <input type="email" class="form-control" [(ngModel)]="editingClient.email">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Téléphone</label>
                <input type="text" class="form-control" [(ngModel)]="editingClient.phone">
              </div>
            </div>
            <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
              <button type="button" class="btn btn-outline" (click)="closeEditClientModal()">Annuler</button>
              <button type="button" class="btn" style="background: #7A1C1C; color: white;" (click)="saveClientChanges()">
                <i class="fas fa-save me-1"></i> Enregistrer
              </button>
            </div>
          </div>
        </div>

        <!-- MODAL 5: CRÉATION / MODIFICATION DE FAQ -->
        <div *ngIf="showFaqModal" class="custom-modal-backdrop" (click)="closeFaqModal()">
          <div class="custom-modal-box" style="max-width: 520px;" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3 style="margin: 0; color: #7A1C1C;"><i class="fas fa-question-circle me-2"></i>{{ isEditingFaq ? 'Modifier' : 'Ajouter' }} une FAQ</h3>
              <button class="btn-close" (click)="closeFaqModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Question</label>
                <input type="text" class="form-control" [(ngModel)]="faqForm.question" placeholder="Ex: Proposez-vous des menus halal ou végétariens ?">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Réponse</label>
                <textarea class="form-control" rows="4" [(ngModel)]="faqForm.answer" placeholder="Ex: Oui, tous nos buffets s'adaptent..."></textarea>
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Catégorie</label>
                <select class="form-control" [(ngModel)]="faqForm.category">
                  <option value="Général">Général</option>
                  <option value="Réservation">Réservation & Devis</option>
                  <option value="Salle La Diva">Salle La Diva</option>
                  <option value="Traiteur & Buffets">Traiteur & Buffets</option>
                </select>
              </div>
            </div>
            <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
              <button type="button" class="btn btn-outline" (click)="closeFaqModal()">Annuler</button>
              <button type="button" class="btn" style="background: #7A1C1C; color: white;" (click)="saveFaq()">
                <i class="fas fa-save me-1"></i> Enregistrer
              </button>
            </div>
          </div>
        </div>

        <!-- MODAL 6: AJOUT DE MÉDIA -->
        <div *ngIf="showMediaModal" class="custom-modal-backdrop" (click)="closeMediaModal()">
          <div class="custom-modal-box" style="max-width: 500px;" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3 style="margin: 0; color: #7A1C1C;"><i class="fas fa-upload me-2"></i>Ajouter un Média (Photo / Vidéo)</h3>
              <button class="btn-close" (click)="closeMediaModal()"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Titre du visuel</label>
                <input type="text" class="form-control" [(ngModel)]="mediaForm.title" placeholder="Ex: Buffet de Mariage - Salle La Diva">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>URL de l'image / vidéo</label>
                <input type="text" class="form-control" [(ngModel)]="mediaForm.url" placeholder="https://images.unsplash.com/photo-...">
              </div>
              <div class="form-group-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div class="form-group">
                  <label>Type de média</label>
                  <select class="form-control" [(ngModel)]="mediaForm.type">
                    <option value="image">Photo HD</option>
                    <option value="video">Vidéo</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Associé à l'événement</label>
                  <select class="form-control" [(ngModel)]="mediaForm.eventId">
                    <option value="">-- Autres / Général --</option>
                    <option *ngFor="let e of events" [value]="e.id">{{ e.title }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
              <button type="button" class="btn btn-outline" (click)="closeMediaModal()">Annuler</button>
              <button type="button" class="btn" style="background: #7A1C1C; color: white;" (click)="saveMedia()">
                <i class="fas fa-check me-1"></i> Ajouter à la Médiathèque
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
      font-family: 'Poppins', sans-serif;
    }
    .dashboard-container {
      display: flex;
      min-height: 100vh;
      background-color: #F8FAFC;
    }
    /* Sidebar - plus fine et plus compacte */
    .sidebar {
      width: 220px;
      background-color: #7A1C1C;
      color: #FFFFFF;
      padding: 1rem 0.75rem;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
      border-right: 1px solid rgba(197, 168, 128, 0.15);
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1.15rem;
      padding-bottom: 0.85rem;
      border-bottom: 1px solid rgba(230, 218, 186, 0.15);
    }
    .sidebar-logo img {
      height: 32px;
    }
    .brand-title {
      font-family: 'Playfair Display', serif;
      font-size: 0.96rem;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      display: block;
    }
    .brand-subtitle {
      font-family: 'Dancing Script', cursive;
      color: #C5A880;
      font-size: 0.8rem;
      display: block;
    }
    .sidebar-menu {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex-grow: 1;
    }
    .sidebar-link {
      display: flex;
      align-items: center;
      padding: 0.52rem 0.75rem;
      border-radius: 6px;
      color: #EBE4D5;
      font-weight: 500;
      font-size: 0.78rem;
      text-decoration: none;
      transition: all 0.2s;
    }
    .sidebar-link i {
      font-size: 0.84rem;
    }
    .sidebar-link:hover {
      background-color: rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
    }
    .sidebar-link.active {
      background-color: #DC2626;
      color: #FFFFFF;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(220, 38, 38, 0.25);
    }
    .sidebar-footer {
      border-top: 1px solid rgba(230, 218, 186, 0.15);
      padding-top: 0.85rem;
      margin-top: auto;
    }
    .user-badge-container {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .user-badge {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }
    .user-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: #FDFBF7;
      color: #7A1C1C;
      font-weight: 700;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .user-info {
      display: flex;
      flex-direction: column;
    }
    .user-name {
      color: #FFFFFF;
      font-weight: 700;
      font-size: 0.82rem;
      line-height: 1.2;
    }
    .user-role {
      color: #C5A880;
      font-size: 0.62rem;
      letter-spacing: 0.06em;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 0.1rem;
    }
    .logout-link {
      color: #FCA5A5;
      font-size: 0.78rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      text-decoration: none;
      padding-top: 0.6rem;
      border-top: 1px solid rgba(197, 168, 128, 0.15);
      transition: color 0.2s;
      cursor: pointer;
    }
    .logout-link:hover {
      color: #F87171;
    }

    /* Main content - padding réduit pour une vue plus ramassée */
    .main-content {
      flex-grow: 1;
      padding: 1.35rem 1.75rem;
      overflow-y: auto;
    }
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .dashboard-title h1 {
      font-family: 'Playfair Display', serif;
      font-size: 1.55rem;
      color: #7A1C1C;
      font-weight: 700;
      margin: 0;
    }
    .dashboard-title p {
      color: #64748B;
      font-size: 0.8rem;
      margin: 0.2rem 0 0 0;
    }
    .btn-create-event {
      background: linear-gradient(135deg, #EF4444 0%, #B91C1C 50%, #7F1D1D 100%);
      color: white;
      padding: 0.55rem 1.35rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.78rem;
      text-transform: uppercase;
      border: 1px solid rgba(255,255,255,0.15);
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.25s ease;
    }
    .btn-create-event:hover {
      background: linear-gradient(135deg, #F87171 0%, #DC2626 50%, #991B1B 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(220, 38, 38, 0.45);
    }

    /* Month Selector */
    .month-selector-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 0.35rem 0.75rem;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 250px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      margin-bottom: 1.25rem;
    }
    .month-nav-btn {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #475569;
      cursor: pointer;
      font-size: 0.75rem;
      transition: all 0.2s;
    }
    .month-nav-btn:hover {
      background: #F1F5F9;
      color: #1E293B;
    }
    .month-display {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      font-weight: 700;
      color: #7A1C1C;
    }
    .calendar-icon {
      color: #DC2626;
      font-size: 0.9rem;
    }

    /* 6 KPI Cards Grid - cartes et polices affinées */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.25rem;
    }
    @media (max-width: 1100px) {
      .kpi-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 768px) {
      .kpi-grid {
        grid-template-columns: 1fr;
      }
    }
    .kpi-card {
      border-radius: 12px;
      padding: 1rem 1rem 0 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
    }
    .kpi-header {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 0.65rem;
      text-transform: uppercase;
    }
    .kpi-body {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      margin-bottom: 0.85rem;
    }
    .kpi-icon-box {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .kpi-stat {
      display: flex;
      flex-direction: column;
    }
    .kpi-number {
      font-family: 'Playfair Display', serif;
      font-size: 1.55rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 0.15rem;
    }
    .kpi-sub {
      font-size: 0.72rem;
      opacity: 0.9;
    }
    .kpi-footer {
      padding: 0.5rem 1rem;
      margin: 0 -1rem;
      font-size: 0.72rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    /* KPI Card color variants */
    .card-dark-maroon {
      background: linear-gradient(135deg, #5A1C1C 0%, #431212 100%);
      color: #FFFFFF;
    }
    .card-dark-maroon .kpi-header { color: #E8DFD1; }
    .card-dark-maroon .kpi-icon-box { background: rgba(255,255,255,0.14); color: #FFFFFF; }
    .card-dark-maroon .kpi-footer { background: rgba(0,0,0,0.25); color: #E5E7EB; }

    .card-bright-red {
      background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%);
      color: #FFFFFF;
    }
    .card-bright-red .kpi-header { color: #FEE2E2; }
    .card-bright-red .kpi-icon-box { background: rgba(255,255,255,0.2); color: #FFFFFF; }
    .card-bright-red .kpi-footer { background: rgba(0,0,0,0.2); color: #FEE2E2; }

    .card-gold {
      background: linear-gradient(135deg, #A4935E 0%, #8C7C4B 100%);
      color: #FFFFFF;
    }
    .card-gold .kpi-header { color: #F8F6F0; }
    .card-gold .kpi-icon-box { background: rgba(255,255,255,0.2); color: #FFFFFF; }
    .card-gold .kpi-footer { background: rgba(0,0,0,0.18); color: #F8F6F0; }

    .card-white {
      background: #FFFFFF;
      color: #1E293B;
      border: 1px solid #E2E8F0;
    }
    .card-white .kpi-header { color: #7A1C1C; }
    .card-white .kpi-number { color: #7A1C1C; }
    .card-white .kpi-sub { color: #64748B; }
    .card-white .kpi-icon-box { background: #F1F5F9; color: #7A1C1C; }
    .card-white .kpi-footer {
      background: #F8FAFC;
      color: #475569;
      border-top: 1px solid #E2E8F0;
    }

    .card-navy {
      background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
      color: #FFFFFF;
    }
    .card-navy .kpi-header { color: #E2E8F0; }
    .card-navy .kpi-icon-box { background: rgba(255,255,255,0.12); color: #FFFFFF; }
    .card-navy .kpi-footer { background: rgba(0,0,0,0.3); color: #E2E8F0; }

    .card-amber {
      background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
      color: #FFFFFF;
    }
    .card-amber .kpi-header { color: #FEF3C7; }
    .card-amber .kpi-icon-box { background: rgba(255,255,255,0.2); color: #FFFFFF; }
    .card-amber .kpi-footer { background: rgba(0,0,0,0.2); color: #FEF3C7; }

    /* Dashboard Bottom Grid */
    .dashboard-bottom-grid {
      display: grid;
      grid-template-columns: 1.75fr 1.15fr;
      gap: 1rem;
      margin-top: 1.25rem;
    }
    @media (max-width: 1024px) {
      .dashboard-bottom-grid {
        grid-template-columns: 1fr;
      }
    }
    .chart-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 1.15rem 1.25rem;
      box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
    }
    .chart-header {
      margin-bottom: 0.85rem;
    }
    .chart-title {
      display: flex;
      align-items: center;
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      font-weight: 700;
      color: #7A1C1C;
      margin-bottom: 0.2rem;
    }
    .chart-subtitle {
      color: #64748B;
      font-size: 0.78rem;
      margin: 0;
    }
    .chart-filter-pills {
      display: flex;
      gap: 0.45rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    .chart-pill-btn {
      background: #F8FAFC;
      color: #475569;
      border: 1px solid #E2E8F0;
      border-radius: 50px;
      padding: 0.28rem 0.85rem;
      font-size: 0.72rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .chart-pill-btn:hover {
      background: #F1F5F9;
      color: #1E293B;
      border-color: #CBD5E1;
    }
    .chart-pill-btn.active {
      background: #7A1C1C;
      color: #FFFFFF;
      border-color: #7A1C1C;
      font-weight: 600;
      box-shadow: 0 2px 6px rgba(122, 28, 28, 0.25);
    }
    .svg-chart-container {
      width: 100%;
      margin-top: auto;
    }
    .svg-chart {
      width: 100%;
      height: auto;
      max-height: 180px;
      overflow: visible;
    }

    /* Right Stacked Cards */
    .right-stacked-cards {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .side-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 1.15rem 1.25rem;
      box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
    }
    .side-card-title {
      display: flex;
      align-items: center;
      font-family: 'Playfair Display', serif;
      font-size: 0.92rem;
      font-weight: 700;
      color: #7A1C1C;
      margin-bottom: 0.85rem;
    }
    .conflict-box {
      background: #FDFBF7;
      border: 1px solid #EBE4D5;
      border-radius: 10px;
      padding: 0.85rem 0.75rem;
      margin-bottom: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .conflict-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .conflict-num {
      font-family: 'Playfair Display', serif;
      font-size: 1.55rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 0.2rem;
    }
    .green-text { color: #059669; }
    .orange-text { color: #D97706; }
    .conflict-label {
      font-size: 0.65rem;
      font-weight: 700;
      color: #64748B;
      letter-spacing: 0.06em;
    }
    .conflict-divider {
      width: 1px;
      height: 36px;
      background: #EBE4D5;
    }
    .side-card-link {
      display: inline-flex;
      align-items: center;
      color: #7A1C1C;
      font-weight: 700;
      font-size: 0.76rem;
      text-decoration: none;
      letter-spacing: 0.03em;
      cursor: pointer;
      transition: transform 0.2s;
      margin-top: auto;
    }
    .side-card-link:hover {
      transform: translateX(3px);
    }
    .recent-requests-list {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      margin-bottom: 0.85rem;
    }
    .recent-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 0.55rem;
      border-bottom: 1px solid #F1F5F9;
    }
    .recent-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .recent-left {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .recent-name {
      font-weight: 600;
      font-size: 0.82rem;
      color: #1E293B;
    }
    .recent-right {
      display: flex;
      align-items: center;
      gap: 0.65rem;
    }
    .recent-badge {
      background: #F1F5F9;
      color: #64748B;
      padding: 0.15rem 0.55rem;
      border-radius: 4px;
      font-size: 0.68rem;
      font-weight: 500;
    }
    .recent-date {
      color: #94A3B8;
      font-size: 0.72rem;
      min-width: 48px;
      text-align: right;
    }

    /* Panels & Tables */
    /* Panels & Tables */
    .panel {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 1.15rem 1.35rem;
      box-shadow: 0 4px 15px -2px rgba(0, 0, 0, 0.04);
      margin-bottom: 1.25rem;
    }
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 0.65rem;
    }
    .panel-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: #7A1C1C;
      margin: 0;
    }
    .table-responsive {
      overflow-x: auto;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
    }
    .admin-table th {
      text-align: left;
      padding: 0.55rem 0.75rem;
      font-size: 0.69rem;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      background: #F8FAFC;
      border-bottom: 1px solid #E2E8F0;
      white-space: nowrap;
    }
    .admin-table td {
      padding: 0.6rem 0.75rem;
      border-bottom: 1px solid #F1F5F9;
      font-size: 0.78rem;
      color: #1E293B;
      vertical-align: middle;
    }
    .admin-table tr:hover td {
      background: #F8FAFC;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.2rem 0.6rem;
      font-size: 0.70rem;
      font-weight: 700;
      border-radius: 9999px;
      white-space: nowrap;
    }
    .badge-pending { background-color: #FEF3C7; color: #D97706; }
    .badge-quoted { background-color: #DBEAFE; color: #2563EB; }
    .badge-accepted { background-color: #D1FAE5; color: #059669; }
    .badge-rejected { background-color: #FEE2E2; color: #DC2626; }
    .badge-aboutis { background-color: #EDE9FE; color: #5B21B6; }

    .btn {
      padding: 0.35rem 0.8rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.2s;
    }
    .btn-sm {
      padding: 0.22rem 0.55rem;
      font-size: 0.70rem;
    }
    .btn-primary {
      background-color: #7A1C1C;
      color: white;
    }
    .btn-accent {
      background-color: #DC2626;
      color: white;
    }
    .btn-outline {
      border-color: #CBD5E1;
      background-color: white;
      color: #475569;
    }

    /* Modals styling */
    .custom-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 1rem;
    }
    .custom-modal-box {
      background: #FFFFFF;
      border-radius: 12px;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(-15px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .modal-header {
      padding: 1.15rem 1.35rem;
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #F8FAFC;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    .modal-body {
      padding: 1.35rem;
      flex: 1;
      overflow-y: auto;
    }
    .modal-footer {
      padding: 1rem 1.35rem;
      background: #F8FAFC;
      border-top: 1px solid #E2E8F0;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }
    .btn-close {
      background: transparent;
      border: none;
      font-size: 1.15rem;
      color: #64748B;
      cursor: pointer;
      transition: color 0.2s;
    }
    .btn-close:hover {
      color: #DC2626;
    }
    `
  ]
})
export class GestionnaireComponent implements OnInit {
  activeTab: 'dashboard' | 'requests' | 'agenda' | 'mediatheque' | 'cms' | 'clients' | 'staff' | 'sync' = 'dashboard';
  requests: any[] = [];
  clients: any[] = [];
  totalRevenue = 0;
  conversionRate = 0;
  syncStatus = 'Connecté (Dernière sync : Aujourd\'hui à 11h15)';

  currentMonth = 'Juillet 2026';
  selectedChartFilter = 'Toutes';
  chartTabs = ['Toutes', 'La Diva', 'Traiteur', 'Événements', 'Décoration', 'Food Truck'];

  monthlyMetrics: Record<string, {
    requests: number;
    accepted: number;
    pendingRealisation: number;
    conversion: number;
    clientsCount: string;
    clientsBreakdown: string;
    pendingValidation: number;
    conflicts: number;
    roomBlocked: number;
    recentRequests: any[];
  }> = {
    'Mai 2026': {
      requests: 8,
      accepted: 3,
      pendingRealisation: 4,
      conversion: 38,
      clientsCount: '12',
      clientsBreakdown: '7 Particuliers / 5 Entreprises',
      pendingValidation: 1,
      conflicts: 0,
      roomBlocked: 0,
      recentRequests: [
        { name: 'Moussa Diouf', badge: 'Traiteur', date: '28 mai', dotColor: '#059669' },
        { name: 'Cabinet Alpha', badge: 'Service', date: '22 mai', dotColor: '#B45309' },
        { name: 'Ndéye Tall', badge: 'Salle', date: '15 mai', dotColor: '#3B82F6' },
        { name: 'Paul Morel', badge: 'Food Truck', date: '10 mai', dotColor: '#059669' },
        { name: 'Aïssatou Sy', badge: 'Salle', date: '04 mai', dotColor: '#D97706' }
      ]
    },
    'Juin 2026': {
      requests: 14,
      accepted: 6,
      pendingRealisation: 5,
      conversion: 43,
      clientsCount: '13',
      clientsBreakdown: '7 Particuliers / 6 Entreprises',
      pendingValidation: 3,
      conflicts: 1,
      roomBlocked: 1,
      recentRequests: [
        { name: 'Société Beta', badge: 'Salle', date: '29 juin', dotColor: '#D97706' },
        { name: 'Claire Martin', badge: 'Traiteur', date: '24 juin', dotColor: '#059669' },
        { name: 'Marc Lamy', badge: 'Service', date: '18 juin', dotColor: '#3B82F6' },
        { name: 'Élise Bernard', badge: 'Salle', date: '12 juin', dotColor: '#059669' },
        { name: 'Amadou Fall', badge: 'Décoration', date: '05 juin', dotColor: '#B45309' }
      ]
    },
    'Juillet 2026': {
      requests: 11,
      accepted: 4,
      pendingRealisation: 6,
      conversion: 36,
      clientsCount: '14',
      clientsBreakdown: '8 Particuliers / 6 Entreprises',
      pendingValidation: 3,
      conflicts: 0,
      roomBlocked: 1,
      recentRequests: [
        { name: 'mme fatou', badge: '—', date: '25 juil.', dotColor: '#D97706' },
        { name: 'Hélène Rocher', badge: 'Salle', date: '31 juil.', dotColor: '#B45309' },
        { name: 'Jean-Marc Dubois', badge: 'Service', date: '25 juil.', dotColor: '#D97706' },
        { name: 'Sophie Laurent', badge: 'Salle', date: '22 juil.', dotColor: '#059669' },
        { name: 'Jean-Marc Dubois', badge: 'Service', date: '26 juil.', dotColor: '#3B82F6' }
      ]
    },
    'Août 2026': {
      requests: 16,
      accepted: 7,
      pendingRealisation: 7,
      conversion: 44,
      clientsCount: '16',
      clientsBreakdown: '9 Particuliers / 7 Entreprises',
      pendingValidation: 2,
      conflicts: 1,
      roomBlocked: 2,
      recentRequests: [
        { name: 'Groupe Omega', badge: 'Salle', date: '28 août', dotColor: '#D97706' },
        { name: 'Chloé Vincent', badge: 'Service', date: '22 août', dotColor: '#059669' },
        { name: 'Lamine Touré', badge: 'Traiteur', date: '16 août', dotColor: '#3B82F6' },
        { name: 'Mélanie Roy', badge: 'Salle', date: '11 août', dotColor: '#B45309' },
        { name: 'Lucie Robert', badge: 'Service', date: '04 août', dotColor: '#059669' }
      ]
    },
    'Septembre 2026': {
      requests: 19,
      accepted: 9,
      pendingRealisation: 8,
      conversion: 47,
      clientsCount: '18',
      clientsBreakdown: '10 Particuliers / 8 Entreprises',
      pendingValidation: 2,
      conflicts: 0,
      roomBlocked: 2,
      recentRequests: [
        { name: 'Banque Atlantique', badge: 'Service', date: '28 sept.', dotColor: '#059669' },
        { name: 'Karim Cissé', badge: 'Salle', date: '23 sept.', dotColor: '#D97706' },
        { name: 'Sandrine Faure', badge: 'Traiteur', date: '18 sept.', dotColor: '#059669' },
        { name: 'ONG Sahel', badge: 'Food Truck', date: '12 sept.', dotColor: '#3B82F6' },
        { name: 'Pauline Blanc', badge: 'Salle', date: '05 sept.', dotColor: '#B45309' }
      ]
    }
  };

  staffList: any[] = [];
  events: any[] = [];
  faqs: any[] = [];
  mediaList: any[] = [];
  devisList: any[] = [];

  // Modals state
  showCreateEventModal = false;
  showDevisModal = false;
  isDevisModified = false;
  isDevisReadonly = false;
  showEditClientModal = false;
  showFaqModal = false;
  showMediaModal = false;
  showTraceabilityModal = false;

  // Search & Filter
  clientSearchQuery = '';
  selectedClientForEvent: any = null;
  selectedStaffIdsForEvent: string[] = [];
  selectedStaffListForEvent: any[] = [];
  staffSearchQuery = '';
  eventForm = {
    title: '',
    type: 'salle-diva',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: 100,
    location: 'Salle La Diva, Dakar',
    signatureGastronomique: 'Menu Signature Kiki Traiteur',
    requestId: ''
  };

  // Editing items
  editingClient: any = null;
  faqForm = { id: '', question: '', answer: '', category: 'Général' };
  isEditingFaq = false;
  mediaForm = { title: '', url: '', type: 'image', eventId: '' };
  selectedEventFilterForMedia = 'ALL';
  currentTraceRequest: any = null;
  currentTraceDevis: any = null;
  currentTraceEvent: any = null;

  // Devis Modal
  isNewDevis = false;
  selectedClientForDevis: any = null;
  devisSearchClientQuery = '';
  devisForm = {
    requestId: '',
    clientEmail: '',
    clientName: '',
    clientId: '',
    prestationId: 'salle-diva',
    guests: 50,
    location: 'Salle La Diva, Dakar',
    date: new Date().toISOString().split('T')[0],
    items: [{ desc: 'Prestation Traiteur - Forfait de base', qty: 1, unitPrice: 15000 }],
    tvaRate: 0,
    discount: 0,
    status: 'sent',
    history: [] as Array<{ date: string; action: string }>
  };

  // Calendar filters & view (Image 5)
  calendarView = 'Mois';
  currentCalendarMonth = 'Juillet 2026';
  calendarPrestationFilter = 'ALL';
  calendarClientFilter = '';
  calendarResourceFilter = 'ALL';
  calendarStaffFilter = '';

  // Requests filters & pagination (Image 4)
  requestClientFilter = '';
  requestPrestationFilter = 'ALL';
  selectedRequestStatusFilter = 'ALL';
  requestPage = 1;
  requestPageSize = 5;
  clientPage = 1;
  clientPageSize = 5;
  staffPage = 1;
  staffPageSize = 5;
  faqPage = 1;
  faqPageSize = 5;
  mediaPage = 1;
  mediaPageSize = 6;
  eventListPage = 1;
  eventListPageSize = 5;

  statusFiltersList = [
    { label: 'Tous', value: 'ALL' },
    { label: 'En attente', value: 'pending' },
    { label: 'Devis envoyé', value: 'quoted' },
    { label: 'Accepté', value: 'accepted' },
    { label: 'Refusé', value: 'rejected' },
    { label: 'Aboutis', value: 'aboutis' }
  ];

  constructor(private dataService: KikiDataService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.requests = this.dataService.getRequests();
    this.clients = this.dataService.getClients();
    this.staffList = this.dataService.getStaff();
    this.events = this.dataService.getEvents();
    this.faqs = this.dataService.getFaqs();
    this.mediaList = this.dataService.getMedia();
    this.devisList = this.dataService.getDevis();

    this.totalRevenue = this.requests
      .filter(r => r.status === 'accepted')
      .reduce((acc, r) => acc + (this.getUnitPrice(r.prestationId) * (r.guests || 50)), 0);

    const total = this.requests.length;
    const accepted = this.requests.filter(r => r.status === 'accepted').length;
    this.conversionRate = total > 0 ? Math.round((accepted / total) * 100) : 0;
  }

  prevMonth(): void {
    const months = ['Mai 2026', 'Juin 2026', 'Juillet 2026', 'Août 2026', 'Septembre 2026'];
    const idx = months.indexOf(this.currentMonth);
    if (idx > 0) {
      this.currentMonth = months[idx - 1];
    }
  }

  nextMonth(): void {
    const months = ['Mai 2026', 'Juin 2026', 'Juillet 2026', 'Août 2026', 'Septembre 2026'];
    const idx = months.indexOf(this.currentMonth);
    if (idx < months.length - 1) {
      this.currentMonth = months[idx + 1];
    }
  }

  getCurrentMetrics() {
    return this.monthlyMetrics[this.currentMonth] || this.monthlyMetrics['Juillet 2026'];
  }

  getRequestsThisMonthCount(): number {
    return this.getCurrentMetrics().requests;
  }

  getAcceptedCount(): number {
    return this.getCurrentMetrics().accepted;
  }

  getPendingRealisationCount(): number {
    return this.getCurrentMetrics().pendingRealisation;
  }

  getConversionRate(): number {
    return this.getCurrentMetrics().conversion;
  }

  getClientsCount(): string {
    return this.getCurrentMetrics().clientsCount;
  }

  getClientsBreakdown(): string {
    return this.getCurrentMetrics().clientsBreakdown;
  }

  getPendingValidationCount(): number {
    return this.getCurrentMetrics().pendingValidation;
  }

  getActiveConflictsCount(): number {
    return this.getCurrentMetrics().conflicts;
  }

  getRoomBlockedCount(): number {
    return this.getCurrentMetrics().roomBlocked;
  }

  getRecentRequestsFeed(): any[] {
    return this.getCurrentMetrics().recentRequests;
  }

  valToY(val: number): number {
    return 170 - (val * 50);
  }

  getChartData(): number[] {
    switch (this.selectedChartFilter) {
      case 'La Diva': return [0, 0, 0, 0, 0, 2];
      case 'Traiteur': return [0, 0, 0, 0, 1, 3];
      case 'Événements': return [0, 0, 1, 0, 0, 2];
      case 'Décoration': return [0, 0, 0, 0, 0, 1];
      case 'Food Truck': return [0, 1, 0, 1, 0, 2];
      default: return [0, 0, 0, 0, 0, 3];
    }
  }

  getChartPath(): string {
    const pts = this.getChartData();
    const coords = [
      { x: 60, y: this.valToY(pts[0]) },
      { x: 150, y: this.valToY(pts[1]) },
      { x: 240, y: this.valToY(pts[2]) },
      { x: 330, y: this.valToY(pts[3]) },
      { x: 420, y: this.valToY(pts[4]) },
      { x: 510, y: this.valToY(pts[5]) }
    ];
    return `M ${coords[0].x},${coords[0].y} L ${coords[1].x},${coords[1].y} L ${coords[2].x},${coords[2].y} L ${coords[3].x},${coords[3].y} L ${coords[4].x},${coords[4].y} L ${coords[5].x},${coords[5].y}`;
  }

  getChartAreaPath(): string {
    return `${this.getChartPath()} L 510,170 L 60,170 Z`;
  }

  getChartPoints(): any[] {
    const pts = this.getChartData();
    const labels = ['Févr.', 'Mars.', 'Avri.', 'Mai.', 'Juin.', 'Juil.'];
    const xs = [60, 150, 240, 330, 420, 510];
    return xs.map((x, idx) => ({
      x,
      y: this.valToY(pts[idx]),
      label: labels[idx],
      isLast: idx === 5
    }));
  }

  getTitle(): string {
    switch (this.activeTab) {
      case 'dashboard': return 'Tableau de bord';
      case 'requests': return 'Demandes de devis';
      case 'agenda': return 'Calendrier interne';
      case 'mediatheque': return 'Médiathèque';
      case 'cms': return 'CMS & Contenus';
      case 'clients': return 'Clients';
      case 'staff': return 'Personnel';
      case 'sync': return 'GOOGLE SYNC & SEC';
    }
  }

  getSubtitle(): string {
    switch (this.activeTab) {
      case 'dashboard': return 'Vue d\'ensemble de l\'activité de Kiki Traiteur.';
      case 'requests': return 'Traitement commercial et validation des devis.';
      case 'agenda': return 'Organisation interne et planification logistique.';
      case 'mediatheque': return 'Galerie photos, catalogues et documents Kiki Traiteur.';
      case 'cms': return 'Gestion des textes, cartes, plats et contenus en ligne.';
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

  isPendingStatus(status: string): boolean {
    return !status || status === 'pending' || status === 'approved' || status === 'new' || status === 'en_attente' ||
           (status !== 'accepted' && status !== 'sent' && status !== 'quoted' && status !== 'aboutis' && status !== 'rejected');
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

  // --- CREATE EVENT MODAL & HELPERS ---
  openCreateEventModal(req?: any): void {
    if (req && req.status === 'pending') {
      this.dataService.showToast('Attention : Vous devez d\'abord envoyer un devis avant de créer un événement !', true);
      return;
    }
    this.selectedClientForEvent = null;
    this.selectedStaffIdsForEvent = [];
    this.selectedStaffListForEvent = [];
    this.clientSearchQuery = '';
    this.staffSearchQuery = '';
    if (req) {
      const client = this.clients.find(c => c.id === req.clientId);
      if (client) {
        this.selectedClientForEvent = client;
      }
      this.eventForm = {
        title: req.prestationTitle ? `${req.prestationTitle} - ${client ? client.name : ''}` : `Événement ${client ? client.name : ''}`,
        type: req.prestationId || 'salle-diva',
        date: req.date || new Date().toISOString().split('T')[0],
        time: '19:00',
        guests: req.guests || 100,
        location: req.location || 'Salle La Diva, Dakar',
        signatureGastronomique: 'Menu Signature Kiki Traiteur',
        requestId: req.id || ''
      };
    } else {
      this.eventForm = {
        title: '',
        type: 'salle-diva',
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        guests: 100,
        location: 'Salle La Diva, Dakar',
        signatureGastronomique: 'Menu Signature Kiki Traiteur',
        requestId: ''
      };
    }
    this.showCreateEventModal = true;
  }

  closeCreateEventModal(): void {
    this.showCreateEventModal = false;
  }

  getFilteredClients(): any[] {
    if (!this.clientSearchQuery || !this.clientSearchQuery.trim()) {
      return this.clients.slice(0, 5);
    }
    const q = this.clientSearchQuery.toLowerCase();
    return this.clients.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
  }

  selectClientForEvent(c: any): void {
    this.selectedClientForEvent = c;
    this.clientSearchQuery = '';
  }

  removeSelectedClient(): void {
    this.selectedClientForEvent = null;
  }

  getFilteredStaffForSearch(): any[] {
    const query = this.staffSearchQuery.toLowerCase().trim();
    return this.staffList.filter(s => {
      const notSelected = !this.selectedStaffIdsForEvent.includes(s.id);
      if (!query) return notSelected;
      return notSelected && (s.name.toLowerCase().includes(query) || s.role.toLowerCase().includes(query));
    });
  }

  addStaffToEvent(s: any): void {
    if (!this.selectedStaffIdsForEvent.includes(s.id)) {
      this.selectedStaffIdsForEvent.push(s.id);
      this.selectedStaffListForEvent.push(s);
    }
    this.staffSearchQuery = '';
  }

  removeStaffFromEvent(staffId: string): void {
    this.selectedStaffIdsForEvent = this.selectedStaffIdsForEvent.filter(id => id !== staffId);
    this.selectedStaffListForEvent = this.selectedStaffListForEvent.filter(st => st.id !== staffId);
  }

  toggleStaffSelection(staffId: string): void {
    const idx = this.selectedStaffIdsForEvent.indexOf(staffId);
    if (idx > -1) {
      this.selectedStaffIdsForEvent.splice(idx, 1);
      this.selectedStaffListForEvent = this.selectedStaffListForEvent.filter(st => st.id !== staffId);
    } else {
      this.selectedStaffIdsForEvent.push(staffId);
      const s = this.staffList.find(st => st.id === staffId);
      if (s) this.selectedStaffListForEvent.push(s);
    }
  }

  isStaffSelected(staffId: string): boolean {
    return this.selectedStaffIdsForEvent.includes(staffId);
  }

  getStaffName(staffId: string): string {
    const s = this.staffList.find(item => item.id === staffId);
    return s ? s.name : staffId;
  }

  // --- INTERNAL CALENDAR AGENDA HELPERS (IMAGE 5) ---
  prevCalendarMonth(): void {
    this.currentCalendarMonth = 'Juin 2026';
  }

  nextCalendarMonth(): void {
    this.currentCalendarMonth = 'Août 2026';
  }

  getEndTime(time: string): string {
    if (!time) return '23:00';
    const parts = time.split(':');
    let h = parseInt(parts[0], 10);
    h = (h + 4) % 24;
    return `${h < 10 ? '0' + h : h}:${parts[1] || '00'}`;
  }

  getEventBlockBg(ev: any): string {
    if (ev.type === 'salle-diva') return '#FEE2E2';
    if (ev.type === 'traiteur') return '#FEF3C7';
    if (ev.type === 'evenements') return '#EDE9FE';
    return '#E0E7FF';
  }

  getEventBlockColor(ev: any): string {
    if (ev.type === 'salle-diva') return '#991B1B';
    if (ev.type === 'traiteur') return '#92400E';
    if (ev.type === 'evenements') return '#5B21B6';
    return '#3730A3';
  }

  openEventDetailsModal(ev: any): void {
    this.dataService.showToast(`Événement: ${ev.title} - Le ${this.formatDate(ev.date)} (${ev.time})`);
  }

  getCalendarGridDays(): any[] {
    const days: any[] = [];
    for (let i = 1; i <= 31; i++) {
      const dayStr = `2026-07-${i < 10 ? '0' + i : i}`;
      const dayEvs = this.getFilteredEventsForCalendar().filter(e => e.date === dayStr);
      days.push({
        dayNumber: i,
        isCurrentMonth: true,
        events: dayEvs
      });
    }
    return days;
  }

  getFilteredEventsForCalendar(): any[] {
    let list = [...this.events];
    if (this.calendarPrestationFilter !== 'ALL') {
      list = list.filter(e => e.type === this.calendarPrestationFilter);
    }
    if (this.calendarClientFilter.trim()) {
      const q = this.calendarClientFilter.toLowerCase().trim();
      list = list.filter(e => (e.clientName || '').toLowerCase().includes(q));
    }
    if (this.calendarStaffFilter.trim()) {
      const q = this.calendarStaffFilter.toLowerCase().trim();
      list = list.filter(e => {
        if (!e.staffIds || e.staffIds.length === 0) return false;
        return e.staffIds.some((id: string) => this.getStaffName(id).toLowerCase().includes(q));
      });
    }
    return list;
  }

  // --- REQUESTS FILTERS & PAGINATION HELPERS ---
  selectRequestStatusFilter(status: string): void {
    this.selectedRequestStatusFilter = status;
    this.requestPage = 1;
  }

  getRequestCountByStatus(status: string): number {
    if (status === 'ALL') return this.requests.length;
    return this.requests.filter(r => r.status === status).length;
  }

  getClientType(clientId: string): string {
    const c = this.clients.find(item => item.id === clientId);
    if (!c) return 'Particulier';
    return c.organization ? 'Entreprise' : 'Particulier';
  }

  getFilteredRequests(): any[] {
    let list = [...this.requests];
    if (this.selectedRequestStatusFilter !== 'ALL') {
      list = list.filter(r => r.status === this.selectedRequestStatusFilter);
    }
    if (this.requestPrestationFilter !== 'ALL') {
      list = list.filter(r => r.prestationId === this.requestPrestationFilter);
    }
    if (this.requestClientFilter.trim()) {
      const q = this.requestClientFilter.toLowerCase().trim();
      list = list.filter(r => this.getClientName(r.clientId).toLowerCase().includes(q));
    }
    return list;
  }

  getFilteredRequestsForPage(): any[] {
    const filtered = this.getFilteredRequests();
    const start = (this.requestPage - 1) * this.requestPageSize;
    return filtered.slice(start, start + this.requestPageSize);
  }

  getRequestTotalPages(): number {
    return Math.ceil(this.getFilteredRequests().length / this.requestPageSize) || 1;
  }

  getRequestPageArray(): number[] {
    const pages: number[] = [];
    const total = this.getRequestTotalPages();
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // --- Pagination Clients ---
  getClientsForPage(): any[] {
    const start = (this.clientPage - 1) * this.clientPageSize;
    return this.clients.slice(start, start + this.clientPageSize);
  }
  getClientTotalPages(): number {
    return Math.max(1, Math.ceil(this.clients.length / this.clientPageSize));
  }
  getClientPageArray(): number[] {
    return Array.from({ length: this.getClientTotalPages() }, (_, i) => i + 1);
  }

  // --- Pagination Staff ---
  getStaffForPage(): any[] {
    const start = (this.staffPage - 1) * this.staffPageSize;
    return this.staffList.slice(start, start + this.staffPageSize);
  }
  getStaffTotalPages(): number {
    return Math.max(1, Math.ceil(this.staffList.length / this.staffPageSize));
  }
  getStaffPageArray(): number[] {
    return Array.from({ length: this.getStaffTotalPages() }, (_, i) => i + 1);
  }

  // --- Pagination FAQ ---
  getFaqsForPage(): any[] {
    const start = (this.faqPage - 1) * this.faqPageSize;
    return this.faqs.slice(start, start + this.faqPageSize);
  }
  getFaqTotalPages(): number {
    return Math.max(1, Math.ceil(this.faqs.length / this.faqPageSize));
  }
  getFaqPageArray(): number[] {
    return Array.from({ length: this.getFaqTotalPages() }, (_, i) => i + 1);
  }

  // --- Pagination Medias ---
  getMediasForPage(): any[] {
    const start = (this.mediaPage - 1) * this.mediaPageSize;
    return this.mediaList.slice(start, start + this.mediaPageSize);
  }
  getMediaTotalPages(): number {
    return Math.max(1, Math.ceil(this.mediaList.length / this.mediaPageSize));
  }
  getMediaPageArray(): number[] {
    return Array.from({ length: this.getMediaTotalPages() }, (_, i) => i + 1);
  }

  // --- Pagination Événements Liste ---
  getEventsForPage(): any[] {
    const list = this.getFilteredEventsForCalendar();
    const start = (this.eventListPage - 1) * this.eventListPageSize;
    return list.slice(start, start + this.eventListPageSize);
  }
  getEventTotalPages(): number {
    return Math.max(1, Math.ceil(this.getFilteredEventsForCalendar().length / this.eventListPageSize));
  }
  getEventPageArray(): number[] {
    return Array.from({ length: this.getEventTotalPages() }, (_, i) => i + 1);
  }

  openEditRequestModal(req: any): void {
    this.dataService.showToast(`Édition rapide de la demande #${req.id} (Fonctionnalité active)`);
  }

  acceptRequest(req: any): void {
    this.setStatus(req.id, 'accepted');
    this.dataService.showToast(`Demande #${req.id} validée. Vous pouvez maintenant créer l'événement.`);
  }

  submitCreateEvent(): void {
    if (!this.selectedClientForEvent) {
      this.dataService.showToast('Veuillez rechercher et sélectionner un client.', true);
      return;
    }
    if (!this.eventForm.title.trim()) {
      this.dataService.showToast('Veuillez saisir un nom d\'événement.', true);
      return;
    }

    const newEv = this.dataService.addEvent({
      title: this.eventForm.title,
      type: this.eventForm.type,
      date: this.eventForm.date,
      time: this.eventForm.time,
      guests: this.eventForm.guests,
      clientId: this.selectedClientForEvent.id,
      clientName: this.selectedClientForEvent.name,
      clientPhone: this.selectedClientForEvent.phone,
      location: this.eventForm.location,
      staffIds: this.selectedStaffIdsForEvent,
      requestId: this.eventForm.requestId
    });

    if (this.eventForm.requestId) {
      this.dataService.updateRequestStatus(this.eventForm.requestId, 'aboutis');
      // Record history in devis if exists
      const d = this.dataService.getDevisByRequest(this.eventForm.requestId);
      if (d) {
        this.dataService.updateDevis(d.id, { status: 'conclue' }, `Événement confirmé et ajouté à l'agenda (#${newEv.id})`);
      }
    }

    this.dataService.showToast('Événement créé avec succès et enrégistré dans le calendrier !');
    this.showCreateEventModal = false;
    this.loadData();
    this.activeTab = 'agenda';
  }

  // --- DEVIS WORKFLOW (SEND MAIL, EDIT, CREATE EVENT) ---
  openCreateDevisModal(): void {
    this.isNewDevis = true;
    this.selectedClientForDevis = null;
    this.devisSearchClientQuery = '';
    this.devisForm = {
      requestId: '',
      clientEmail: '',
      clientName: '',
      clientId: '',
      prestationId: 'salle-diva',
      guests: 50,
      location: 'Salle La Diva, Dakar',
      date: new Date().toISOString().split('T')[0],
      items: [{ desc: 'Prestation Traiteur - Forfait de base', qty: 1, unitPrice: 15000 }],
      tvaRate: 0,
      discount: 0,
      status: 'sent',
      history: [
        { date: new Date().toISOString().split('T')[0], action: 'Création d\'un nouveau devis' }
      ]
    };
    this.showDevisModal = true;
  }

  getFilteredClientsForDevis(): any[] {
    const query = this.devisSearchClientQuery.toLowerCase().trim();
    if (!query) return this.clients.slice(0, 5);
    return this.clients.filter(c => c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query));
  }

  selectClientForDevis(c: any): void {
    this.selectedClientForDevis = c;
    this.devisSearchClientQuery = '';
    this.devisForm.clientId = c.id;
    this.devisForm.clientName = c.name;
    this.devisForm.clientEmail = c.email;
  }

  openDevisModal(req: any, isReadonly = false): void {
    this.isNewDevis = false;
    this.isDevisModified = false;
    this.isDevisReadonly = isReadonly;
    const d = this.dataService.getDevisByRequest(req.id);
    const client = this.clients.find(c => c.id === req.clientId);
    if (d) {
      this.devisForm = {
        requestId: d.requestId,
        clientEmail: client ? client.email : 'client@gmail.com',
        clientName: client ? client.name : 'Client',
        clientId: client ? client.id : '',
        prestationId: req.prestationId || 'salle-diva',
        guests: req.guests || 50,
        location: req.location || 'Salle La Diva, Dakar',
        date: req.date || new Date().toISOString().split('T')[0],
        items: d.items && d.items.length ? [...d.items] : [{ desc: 'Prestation Traiteur - Forfait de base', qty: 1, unitPrice: 15000 }],
        tvaRate: 0,
        discount: d.discount,
        status: d.status || req.status,
        history: d.history || []
      };
    } else {
      this.devisForm = {
        requestId: req.id,
        clientEmail: client ? client.email : 'client@gmail.com',
        clientName: client ? client.name : 'Client',
        clientId: client ? client.id : '',
        prestationId: req.prestationId || 'salle-diva',
        guests: req.guests || 50,
        location: req.location || 'Salle La Diva, Dakar',
        date: req.date || new Date().toISOString().split('T')[0],
        items: [
          { desc: `Service ${this.getPrestationName(req.prestationId)}`, qty: 1, unitPrice: this.getUnitPrice(req.prestationId) },
          { desc: `Forfait Menu Gastronomique (${req.guests} convives)`, qty: req.guests || 50, unitPrice: 6500 }
        ],
        tvaRate: 0,
        discount: 0,
        status: req.status || 'sent',
        history: [
          { date: new Date().toISOString().split('T')[0], action: 'Devis initial créé par le gestionnaire' }
        ]
      };
    }
    this.showDevisModal = true;
  }

  onDevisFormChange(): void {
    this.isDevisModified = true;
  }

  closeDevisModal(): void {
    this.showDevisModal = false;
  }

  addDevisItem(): void {
    this.devisForm.items.push({ desc: 'Nouvelle prestation', qty: 1, unitPrice: 5000 });
    this.onDevisFormChange();
  }

  removeDevisItem(index: number): void {
    if (this.devisForm.items.length > 1) {
      this.devisForm.items.splice(index, 1);
      this.onDevisFormChange();
    }
  }

  getDevisSubtotal(): number {
    return this.devisForm.items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
  }

  getDevisTotal(): number {
    const sub = this.getDevisSubtotal();
    const afterDisc = sub - (sub * ((this.devisForm.discount || 0) / 100));
    return afterDisc;
  }

  sendDevisByEmail(): void {
    let reqId = this.devisForm.requestId;
    if (this.isNewDevis || !reqId) {
      if (!this.selectedClientForDevis) {
        this.dataService.showToast('Veuillez sélectionner un client pour ce devis.', true);
        return;
      }
      const newReq = this.dataService.addRequest({
        clientId: this.selectedClientForDevis.id,
        prestationId: this.devisForm.prestationId || 'salle-diva',
        guests: this.devisForm.guests || 50,
        location: this.devisForm.location || 'Salle La Diva, Dakar',
        date: this.devisForm.date || new Date().toISOString().split('T')[0],
        status: 'sent'
      });
      reqId = newReq.id;
      this.devisForm.requestId = reqId;
    }

    const existing = this.dataService.getDevisByRequest(reqId);
    const actionMsg = `Devis envoyé par mail à ${this.devisForm.clientEmail}`;
    if (existing) {
      this.dataService.updateDevis(existing.id, {
        items: this.devisForm.items,
        tvaRate: 0,
        discount: this.devisForm.discount,
        status: 'sent'
      }, actionMsg);
    } else {
      this.dataService.addDevis({
        requestId: reqId,
        items: this.devisForm.items,
        tvaRate: 0,
        discount: this.devisForm.discount,
        status: 'sent'
      });
    }
    if (reqId) {
      this.dataService.updateRequestStatus(reqId, 'sent');
    }
    this.dataService.showToast(`Devis transmis par e-mail à ${this.devisForm.clientEmail} avec succès.`);
    this.showDevisModal = false;
    this.loadData();
  }

  concludeDevisAndCreateEvent(): void {
    let reqId = this.devisForm.requestId;
    if (this.isNewDevis || !reqId) {
      if (!this.selectedClientForDevis) {
        this.dataService.showToast('Veuillez sélectionner un client pour ce devis.', true);
        return;
      }
      const newReq = this.dataService.addRequest({
        clientId: this.selectedClientForDevis.id,
        prestationId: this.devisForm.prestationId || 'salle-diva',
        guests: this.devisForm.guests || 50,
        location: this.devisForm.location || 'Salle La Diva, Dakar',
        date: this.devisForm.date || new Date().toISOString().split('T')[0],
        status: 'accepted'
      });
      reqId = newReq.id;
      this.devisForm.requestId = reqId;
      this.dataService.addDevis({
        requestId: reqId,
        items: this.devisForm.items,
        tvaRate: 0,
        discount: this.devisForm.discount,
        status: 'conclue'
      });
    } else {
      const existing = this.dataService.getDevisByRequest(reqId);
      if (existing) {
        this.dataService.updateDevis(existing.id, { status: 'conclue' }, 'Devis conclu et validé avec le client');
      }
      this.dataService.updateRequestStatus(reqId, 'accepted');
    }
    this.showDevisModal = false;
    this.loadData();
    const req = this.requests.find(r => r.id === reqId);
    this.openCreateEventModal(req);
  }

  // --- TRACEABILITY POPUP ---
  openTraceabilityModal(req: any): void {
    this.currentTraceRequest = req;
    this.currentTraceDevis = this.dataService.getDevisByRequest(req.id);
    this.currentTraceEvent = this.events.find(e => e.requestId === req.id);
    this.showTraceabilityModal = true;
  }

  closeTraceabilityModal(): void {
    this.showTraceabilityModal = false;
    this.currentTraceRequest = null;
    this.currentTraceDevis = null;
    this.currentTraceEvent = null;
  }

  // --- CLIENT EDITING ---
  openEditClientModal(client: any): void {
    this.editingClient = { ...client };
    this.showEditClientModal = true;
  }

  closeEditClientModal(): void {
    this.showEditClientModal = false;
    this.editingClient = null;
  }

  saveClientChanges(): void {
    if (!this.editingClient || !this.editingClient.name.trim()) {
      this.dataService.showToast('Le nom du client est requis.', true);
      return;
    }
    this.dataService.updateClient(this.editingClient.id, {
      name: this.editingClient.name,
      email: this.editingClient.email,
      phone: this.editingClient.phone,
      organization: this.editingClient.organization
    });
    this.dataService.showToast('Fiche client mise à jour.');
    this.showEditClientModal = false;
    this.loadData();
  }

  // --- CMS FAQ CRUD ---
  openAddFaqModal(): void {
    this.faqForm = { id: '', question: '', answer: '', category: 'Général' };
    this.isEditingFaq = false;
    this.showFaqModal = true;
  }

  openEditFaqModal(faq: any): void {
    this.faqForm = { ...faq };
    this.isEditingFaq = true;
    this.showFaqModal = true;
  }

  closeFaqModal(): void {
    this.showFaqModal = false;
  }

  saveFaq(): void {
    if (!this.faqForm.question.trim() || !this.faqForm.answer.trim()) {
      this.dataService.showToast('Veuillez remplir la question et la réponse.', true);
      return;
    }
    if (this.isEditingFaq && this.faqForm.id) {
      this.dataService.updateFaq(this.faqForm.id, {
        question: this.faqForm.question,
        answer: this.faqForm.answer,
        category: this.faqForm.category
      });
      this.dataService.showToast('FAQ modifiée avec succès.');
    } else {
      this.dataService.addFaq({
        question: this.faqForm.question,
        answer: this.faqForm.answer,
        category: this.faqForm.category
      });
      this.dataService.showToast('Nouvelle FAQ ajoutée au CMS.');
    }
    this.showFaqModal = false;
    this.loadData();
  }

  deleteFaq(id: string): void {
    if (confirm('Supprimer cette FAQ du site web ?')) {
      this.dataService.deleteFaq(id);
      this.dataService.showToast('FAQ supprimée.');
      this.loadData();
    }
  }

  // --- MEDIATHEQUE GROUPED BY EVENT ---
  getEventTitlesWithMedia(): string[] {
    const set = new Set<string>();
    this.mediaList.forEach(m => {
      set.add(m.eventTitle || 'Autres Événements');
    });
    return Array.from(set);
  }

  getMediaByEventTitle(title: string): any[] {
    if (title === 'ALL') return this.mediaList;
    return this.mediaList.filter(m => (m.eventTitle || 'Autres Événements') === title);
  }

  openAddMediaModal(): void {
    this.mediaForm = {
      title: '',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
      type: 'image',
      eventId: ''
    };
    this.showMediaModal = true;
  }

  closeMediaModal(): void {
    this.showMediaModal = false;
  }

  saveMedia(): void {
    if (!this.mediaForm.title.trim() || !this.mediaForm.url.trim()) {
      this.dataService.showToast('Le titre et l\'URL sont requis.', true);
      return;
    }
    let eventTitle = 'Autres Événements';
    if (this.mediaForm.eventId) {
      const ev = this.events.find(e => e.id === this.mediaForm.eventId);
      if (ev) eventTitle = ev.title;
    }
    this.dataService.addMedia({
      title: this.mediaForm.title,
      url: this.mediaForm.url,
      type: this.mediaForm.type as any,
      eventId: this.mediaForm.eventId,
      eventTitle: eventTitle
    });
    this.dataService.showToast('Média ajouté à la médiathèque.');
    this.showMediaModal = false;
    this.loadData();
  }

  deleteMedia(id: string): void {
    if (confirm('Supprimer ce visuel de la médiathèque ?')) {
      this.dataService.deleteMedia(id);
      this.dataService.showToast('Média supprimé.');
      this.loadData();
    }
  }
}
