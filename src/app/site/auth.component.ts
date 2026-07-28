import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-padding" style="text-align: center; padding: 5rem 1rem;">
      <p style="color: var(--text-muted);">Redirection vers l'espace client MyKiki...</p>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class AuthComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/login-client']);
  }
}

