import { Component } from '@angular/core';

@Component({
  selector: 'app-login-staff',
  standalone: true,
  template: `
    <section class="section login animate-on-scroll">
      <div class="container">
        <div class="login-panel">
          <h2>Connexion Personnel</h2>
          <label>Identifiant<input type="text" /></label>
          <label>Mot de passe<input type="password" /></label>
          <button class="btn btn--primary">Se connecter</button>
        </div>
      </div>
    </section>
  `,
  styles: [":host{display:block;} .login-panel{max-width:420px;padding:2rem;background:#fff;border-radius:8px;box-shadow:var(--shadow-sm);} .login-panel label{display:block;margin-bottom:0.8rem;} .login-panel input{width:100%;padding:0.6rem;border:1px solid var(--border-color);}"]
})
export class LoginStaffComponent {}
