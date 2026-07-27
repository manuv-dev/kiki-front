import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  readonly title = 'Kiki Traiteur';
  isMenuOpen = false;

  readonly menu = [
    { label: 'Accueil', link: '/' },
    { label: 'À propos', link: '/a-propos' },
    { label: 'Nos Prestations', link: '/prestations' },
    { label: 'Nos Réalisations', link: '/realisations' },
    { label: 'Contact', link: '/contact' },
    { label: 'MYKIKI', link: '/login-client' },
    { label: 'CONNEXION', link: '/login-staff' },
    { label: 'DEMANDER UN DEVIS', link: '/devis' }
  ];

  ngOnInit(): void {
    this.observeAnimations();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 920) {
      this.closeMenu();
    }
  }

  private observeAnimations(): void {
    const elements = Array.from(document.querySelectorAll('.animate-on-scroll'));
    if (!elements.length) {
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      elements.forEach((element) => observer.observe(element));
      return;
    }

    elements.forEach((element) => element.classList.add('visible'));
  }
}
