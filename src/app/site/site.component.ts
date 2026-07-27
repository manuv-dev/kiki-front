import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <!-- TOP BAR (Sarab Style) -->
    <div id="topbar">
      <div class="container topbar-container">
        <div class="top-contact">
          <span><i class="fas fa-map-marker-alt"></i> Hann Maristes, Dakar, Sénégal</span>
          <span><i class="fas fa-phone-alt"></i> +221 33 832 29 66 / +221 33 832 11 50</span>
          <span><i class="fas fa-envelope"></i> contact&#64;kikitraiteursenegal.net</span>
        </div>
        <div class="topbar-right">
          <span class="topbar-tag"><i class="fas fa-fire me-1"></i> Depuis 1997</span>
          <div class="top-socials">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
    </div>

    <!-- NAVBAR (Sarab Style) -->
    <header>
      <div class="container nav-container">
        <a routerLink="/" class="logo-link">
          <img src="assets/images/logo.png" alt="Kiki Traiteur Logo" class="logo-img">
        </a>
        <button class="nav-toggle" aria-label="Ouvrir le menu" [attr.aria-expanded]="isMenuOpen" (click)="toggleMenu()">
          <i class="fas" [ngClass]="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
        <nav [class.active]="isMenuOpen">
          <ul class="nav-links">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Accueil</a></li>
            <li><a routerLink="/a-propos" routerLinkActive="active" (click)="closeMenu()">À propos</a></li>
            <li><a routerLink="/prestations" routerLinkActive="active" (click)="closeMenu()">Nos Prestations</a></li>
            <li><a routerLink="/realisations" routerLinkActive="active" (click)="closeMenu()">Nos Réalisations</a></li>
            <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a></li>
          </ul>
          <div class="nav-actions">
            <a routerLink="/login-client" routerLinkActive="active" class="btn-header-mykiki" (click)="closeMenu()"><i class="fa-regular fa-user"></i> MYKIKI</a>
            <a routerLink="/devis" routerLinkActive="active" class="btn-header-devis" (click)="closeMenu()"><i class="fa-regular fa-calendar-days"></i> DEMANDER UN DEVIS</a>
          </div>
          <div class="mobile-menu-topbar-info">
            <div class="m-contact-item"><i class="fas fa-map-marker-alt"></i> Hann Maristes, Dakar, Sénégal</div>
            <div class="m-contact-item"><i class="fas fa-phone-alt"></i> +221 33 832 29 66 / +221 33 832 11 50</div>
            <div class="m-contact-item"><i class="fas fa-envelope"></i> contact&#64;kikitraiteursenegal.net</div>
            <div class="m-socials">
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <router-outlet></router-outlet>
    </main>

    <!-- FOOTER (Sarab style) -->
    <footer>
      <div class="container footer-grid">
        <div class="footer-col">
          <img src="assets/images/logo.png" alt="Kiki Traiteur Logo"
            style="height: 60px; margin-bottom: 1.5rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">
          <p class="footer-desc">La poésie des saveurs et l'art culinaire, c'est nous ! Une signature gastronomique
            d'exception au Sénégal depuis 1997.</p>
          <div class="footer-socials">
            <a href="#" class="social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-icon" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul class="footer-links">
            <li><a routerLink="/">Accueil</a></li>
            <li><a routerLink="/a-propos">À propos</a></li>
            <li><a routerLink="/prestations">Prestations</a></li>
            <li><a routerLink="/realisations">Réalisations</a></li>
            <li><a routerLink="/contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul class="footer-links">
            <li><a routerLink="/prestations" [queryParams]="{cat: 'corporate'}">Restauration d'Entreprise</a></li>
            <li><a routerLink="/prestations" [queryParams]="{cat: 'events'}">Catering Événementiel</a></li>
            <li><a routerLink="/prestations" [queryParams]="{cat: 'diva'}">Salle La Diva</a></li>
            <li><a routerLink="/prestations" [queryParams]="{cat: 'decoration'}">Décoration de tables</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Horaires & Contact</h4>
          <ul class="footer-contact-info">
            <li><i class="fas fa-map-marker-alt" style="color: #FFFFFF; margin-right: 0.5rem;"></i> Hann
              Maristes, Dakar, Sénégal</li>
            <li><i class="fas fa-phone-alt" style="color: #FFFFFF; margin-right: 0.5rem;"></i> +221 33 832 29 66</li>
            <li><i class="fas fa-phone-alt" style="color: #FFFFFF; margin-right: 0.5rem;"></i> +221 33 832 11 50</li>
            <li><i class="fas fa-envelope" style="color: #FFFFFF; margin-right: 0.5rem;"></i>
              contact&#64;kikitraiteursenegal.net</li>
            <li style="margin-top: 1rem; color: #FFFFFF; font-weight: 700;"><i class="fas fa-clock"
                style="color: #FFFFFF; margin-right: 0.5rem;"></i> Horaires :</li>
            <li>Lun-Ven: 9h – 23h</li>
            <li>Samedi : 9h – 01h</li>
            <li>Dimanche : Fermé</li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; 2026 Kiki Traiteur. Tous Droits Réservés.</p>
        <div class="footer-legal-links">
          <a routerLink="/mentions-legales">Mentions Légales</a>
          <a routerLink="/politique-confidentialite">Politique de Confidentialité</a>
        </div>
      </div>
    </footer>
  `,
  styles: [":host { display: block; }"]
})
export class SiteComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 920 && this.isMenuOpen) {
      this.closeMenu();
    }
  }
}
