import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html'
})
export class App implements OnInit {
  readonly title = 'Kiki Traiteur | La Poésie des Saveurs & l\'Art Culinaire au Sénégal';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => this.observeAnimations(), 100);
    });
  }

  private observeAnimations(): void {
    const animElements = Array.from(document.querySelectorAll('.animate-fade, .animate-on-scroll'));
    if ('IntersectionObserver' in window && animElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      animElements.forEach(el => observer.observe(el));
    } else {
      animElements.forEach(el => el.classList.add('visible'));
    }

    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if ('IntersectionObserver' in window && revealEls.length > 0) {
      const revObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade', 'visible');
            revObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealEls.forEach(el => revObserver.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('animate-fade', 'visible'));
    }
  }
}
