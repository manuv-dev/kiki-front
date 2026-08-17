import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:8080';

@Component({
  selector: 'app-mykiki-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mykiki-layout">
      <!-- Sidebar iOS-glass -->
      <aside class="mykiki-sidebar glass-sidebar">
        <div class="mykiki-brand">
          <div class="mykiki-logo">
            <img src="assets/images/logo.png" alt="Kiki Traiteur" onerror="this.style.display='none'">
            <span class="logo-fallback">KT</span>
          </div>
          <div class="mykiki-brand-text">
            <span class="mykiki-title">MyKiki</span>
            <span class="mykiki-sub">Votre espace personnel</span>
          </div>
        </div>

        <nav class="mykiki-nav">
          <a routerLink="/mykiki" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
            <i class="fas fa-home"></i>
            <span>Accueil</span>
          </a>
          <a routerLink="/mykiki/propositions" routerLinkActive="active" class="nav-link">
            <i class="fas fa-file-invoice"></i>
            <span>Mes Propositions</span>
            <span class="nav-badge" *ngIf="unreadPropositions > 0">{{ unreadPropositions }}</span>
          </a>
          <a routerLink="/mykiki/demandes" routerLinkActive="active" class="nav-link">
            <i class="fas fa-history"></i>
            <span>Mes Demandes</span>
          </a>
          <a routerLink="/mykiki/profil" routerLinkActive="active" class="nav-link">
            <i class="fas fa-user-circle"></i>
            <span>Mon Profil</span>
          </a>
        </nav>

        <div class="mykiki-sidebar-footer">
          <div class="user-info-card">
            <div class="user-avatar-sm">{{ getUserInitials() }}</div>
            <div>
              <p class="user-name-sm">{{ getUserName() }}</p>
              <p class="user-type-sm">Espace Client</p>
            </div>
          </div>
          <button class="logout-btn-sm" (click)="logout()">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </aside>

      <!-- Contenu principal -->
      <main class="mykiki-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

    * { box-sizing: border-box; }

    .mykiki-layout {
      display: flex;
      min-height: 100vh;
      background: linear-gradient(135deg, #1a0a0f 0%, #2d1218 40%, #3d1c20 100%);
      font-family: 'Outfit', sans-serif;
    }

    /* ===================== SIDEBAR ===================== */
    .mykiki-sidebar {
      width: 260px;
      min-height: 100vh;
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-right: 1px solid rgba(255,255,255,0.08);
      display: flex;
      flex-direction: column;
      padding: 1.5rem 1rem;
      position: sticky;
      top: 0;
      height: 100vh;
    }

    .mykiki-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0 0.5rem 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      margin-bottom: 1.5rem;
    }

    .mykiki-logo {
      width: 44px; height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #8b2240, #c45d2a);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
    }

    .mykiki-logo img { width: 100%; height: 100%; object-fit: cover; }
    .logo-fallback { color: white; font-weight: 700; font-size: 0.9rem; }

    .mykiki-title { display: block; color: white; font-weight: 700; font-size: 1rem; }
    .mykiki-sub { display: block; color: rgba(255,255,255,0.4); font-size: 0.72rem; }

    .mykiki-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s;
      position: relative;
    }

    .nav-link i { width: 20px; text-align: center; font-size: 0.95rem; }

    .nav-link:hover {
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.9);
    }

    .nav-link.active {
      background: linear-gradient(135deg, rgba(139,34,64,0.3), rgba(196,93,42,0.2));
      color: white;
      border: 1px solid rgba(139,34,64,0.3);
    }

    .nav-badge {
      margin-left: auto;
      background: #e53e3e;
      color: white;
      font-size: 0.65rem;
      font-weight: 700;
      min-width: 18px;
      height: 18px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
    }

    .mykiki-sidebar-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: rgba(255,255,255,0.04);
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.06);
      margin-top: 1rem;
    }

    .user-info-card { display: flex; align-items: center; gap: 0.5rem; }

    .user-avatar-sm {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #8b2240, #c45d2a);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
      color: white;
    }

    .user-name-sm { color: white; font-size: 0.8rem; font-weight: 600; margin: 0; }
    .user-type-sm { color: rgba(255,255,255,0.4); font-size: 0.7rem; margin: 0; }

    .logout-btn-sm {
      background: rgba(220, 38, 38, 0.1);
      border: 1px solid rgba(220, 38, 38, 0.2);
      border-radius: 10px;
      color: rgba(252, 165, 165, 0.7);
      width: 32px; height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.85rem;
    }

    .logout-btn-sm:hover {
      background: rgba(220, 38, 38, 0.2);
      color: #fca5a5;
    }

    /* ===================== MAIN ===================== */
    .mykiki-main {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .mykiki-layout { flex-direction: column; }
      .mykiki-sidebar {
        width: 100%;
        min-height: auto;
        height: auto;
        position: static;
      }
      .mykiki-nav { flex-direction: row; overflow-x: auto; }
      .mykiki-main { padding: 1rem; }
    }
  `]
})
export class MyKikiHomeComponent implements OnInit {
  unreadPropositions = 0;

  constructor(
    private auth: AuthService,
    private notifService: NotificationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.notifService.count$.subscribe(c => this.unreadPropositions = c);
    this.notifService.startPolling();
  }

  getUserName(): string {
    return this.auth.getCurrentUser()?.fullName || 'Client';
  }

  getUserInitials(): string {
    const name = this.getUserName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  logout(): void {
    this.auth.logout();
  }
}
