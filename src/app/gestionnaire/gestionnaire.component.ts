import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { Observable } from 'rxjs';
import { KikiDataService } from '../services/kiki-data.service';
import { GestionnaireDataService } from './services/gestionnaire-data.service';

@Component({
  selector: 'app-gestionnaire-layout',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./gestionnaire.css'],
  template: `
    <!-- Global Loading Spinner Overlay -->
    <div class="loading-overlay" *ngIf="isLoading$ | async">
      <div class="spinner"></div>
      <div class="loading-text">Chargement en cours...</div>
    </div>

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
            <a routerLink="/gestionnaire/dashboard" routerLinkActive="active" class="sidebar-link">
              <i class="fas fa-th-large me-2"></i> Tableau de bord
            </a>
          </li>
          <li>
            <a routerLink="/gestionnaire/demandes" routerLinkActive="active" class="sidebar-link">
              <i class="fas fa-file-invoice me-2"></i> Demandes de devis
            </a>
          </li>
          <li>
            <a routerLink="/gestionnaire/agenda" routerLinkActive="active" class="sidebar-link">
              <i class="fas fa-calendar-alt me-2"></i> Calendrier interne
            </a>
          </li>
          <li>
            <a routerLink="/gestionnaire/mediatheque" routerLinkActive="active" class="sidebar-link">
              <i class="fas fa-images me-2"></i> Médiathèque
            </a>
          </li>
          <li>
            <a routerLink="/gestionnaire/cms" routerLinkActive="active" class="sidebar-link">
              <i class="fas fa-edit me-2"></i> CMS & Contenus
            </a>
          </li>
          <li>
            <a routerLink="/gestionnaire/clients" routerLinkActive="active" class="sidebar-link">
              <i class="fas fa-users me-2"></i> Clients
            </a>
          </li>
          <li>
            <a routerLink="/gestionnaire/personnel" routerLinkActive="active" class="sidebar-link">
              <i class="fas fa-user-plus me-2"></i> Personnel
            </a>
          </li>
          <li>
            <a routerLink="/gestionnaire/sync" routerLinkActive="active" class="sidebar-link">
              <i class="fas fa-exclamation-circle me-2"></i> GOOGLE SYNC & SEC
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <div class="user-badge-container">
            <div class="user-badge">
              <div class="user-avatar">{{ getUserInitials() }}</div>
              <div class="user-info">
                <span class="user-name">{{ getUserName() }}</span>
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
          <div *ngIf="showCreateEventBtn()" class="header-actions">
            <a routerLink="/gestionnaire/agenda" [queryParams]="{create: 'true'}" class="btn-create-event">
              <i class="fas fa-plus-circle"></i> CRÉER UN ÉVÉNEMENT
            </a>
          </div>
        </div>

        <div class="content-router-outlet">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class GestionnaireLayoutComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private dataService: KikiDataService,
    private gData: GestionnaireDataService
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    this.gData.loadAll();
  }

  logout() {
    this.dataService.showToast('Déconnexion du module Gestionnaire ERP.');
    this.router.navigate(['/site/connexion']);
  }

  getUserName(): string {
    const stored = localStorage.getItem('kiki_current_staff_name');
    return stored || 'Marie V.';
  }

  getUserInitials(): string {
    const name = this.getUserName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  showCreateEventBtn(): boolean {
    const url = this.router.url;
    return !url.includes('demandes');
  }

  getTitle(): string {
    const url = this.router.url;
    if (url.includes('dashboard')) return 'Tableau de bord';
    if (url.includes('demandes')) return 'Demandes de devis';
    if (url.includes('agenda')) return 'Calendrier interne';
    if (url.includes('mediatheque')) return 'Médiathèque';
    if (url.includes('cms')) return 'CMS & Contenus';
    if (url.includes('clients')) return 'Clients';
    if (url.includes('personnel')) return 'Personnel';
    if (url.includes('sync')) return 'GOOGLE SYNC & SEC';
    return 'Espace Gestionnaire';
  }

  getSubtitle(): string {
    const url = this.router.url;
    if (url.includes('dashboard')) return "Vue d'ensemble de l'activité de Kiki Traiteur.";
    if (url.includes('demandes')) return 'Traitement commercial et validation des devis.';
    if (url.includes('agenda')) return 'Organisation interne et planification logistique.';
    if (url.includes('mediatheque')) return 'Galerie photos, catalogues et documents Kiki Traiteur.';
    if (url.includes('cms')) return 'Gestion des textes, cartes, plats et contenus en ligne.';
    if (url.includes('clients')) return 'Profils et historique des clients Kiki Traiteur.';
    if (url.includes('personnel')) return "Equipes culinaires et maîtres d'hôtel.";
    if (url.includes('sync')) return 'Paramètres de liaison Google Agenda et sécurité.';
    return 'Bienvenue dans votre espace';
  }
}
