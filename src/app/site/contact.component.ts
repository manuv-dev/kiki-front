import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KikiDataService } from '../services/kiki-data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>Contact & FAQ</h1>
        <div class="page-hero-path">Accueil &nbsp;&gt;&nbsp; Contact</div>
      </div>
    </section>

    <!-- Contact & FAQ Grid -->
    <section class="section-padding">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact details & Links Portal inspired by Vercel links.html -->
          <div class="contact-info-panel animate-fade">
            <span class="slbl">Notre Portail & Réseaux</span>
            <h2 style="font-size: 1.8rem; font-weight:900; margin-bottom: 1.5rem; color: var(--primary-dark);">Coordonnées & Localisation</h2>
            
            <div class="portal-links-list">

              <!-- 1. Localisation VIP Map Link (Unique carte Google Maps) -->
              <a href="https://maps.app.goo.gl/JWboSN4ezQerTGrn7" target="_blank" class="portal-card portal-card-location">
                <div class="portal-card-left">
                  <div class="portal-icon-box map-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="portal-details">
                    <span class="portal-title">Hann Maristes, Dakar, Sénégal</span>
                    <span class="portal-subtitle">Siège Kiki Traiteur & Salle de Réception La Diva</span>
                    <span class="portal-badge-maps"><i class="fas fa-location-arrow"></i> Voir sur Google Maps</span>
                  </div>
                </div>
                <div class="portal-arrow">
                  <i class="fas fa-external-link-alt"></i>
                </div>
              </a>

              <!-- 2. WhatsApp Direct -->
              <a href="https://wa.me/221776749191" target="_blank" class="portal-card">
                <div class="portal-card-left">
                  <div class="portal-icon-box whatsapp-icon">
                    <i class="fab fa-whatsapp"></i>
                  </div>
                  <div class="portal-details">
                    <span class="portal-title">WhatsApp en direct</span>
                    <span class="portal-subtitle">+221 77 674 91 91 — Discutez avec notre équipe</span>
                  </div>
                </div>
                <div class="portal-arrow"><i class="fas fa-chevron-right"></i></div>
              </a>

              <!-- 3. Téléphone -->
              <a href="tel:+221338322966" class="portal-card">
                <div class="portal-card-left">
                  <div class="portal-icon-box phone-icon">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                  <div class="portal-details">
                    <span class="portal-title">+221 33 832 29 66 / 11 50</span>
                    <span class="portal-subtitle">Service commercial & réservation La Diva</span>
                  </div>
                </div>
                <div class="portal-arrow"><i class="fas fa-chevron-right"></i></div>
              </a>

              <!-- 4. Email -->
              <a href="mailto:kikitraiteursn@yahoo.fr" class="portal-card">
                <div class="portal-card-left">
                  <div class="portal-icon-box email-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="portal-details">
                    <span class="portal-title">kikitraiteursn&#64;yahoo.fr</span>
                    <span class="portal-subtitle">contact&#64;kikitraiteursenegal.net</span>
                  </div>
                </div>
                <div class="portal-arrow"><i class="fas fa-chevron-right"></i></div>
              </a>

              <!-- Réseaux Sociaux Grid -->
              <div class="socials-portal-header" style="margin: 1.5rem 0 0.8rem; font-weight: 700; font-size: 0.95rem; color: var(--primary-dark);">Rejoignez nos réseaux</div>
              <div class="portal-socials-grid">
                <a href="https://www.instagram.com/traiteurkiki?igsh=MTdqMWFtY3RtYWFvNw==" target="_blank" class="portal-card social-card" title="Instagram">
                  <div class="portal-icon-box ig-icon"><i class="fab fa-instagram"></i></div>
                  <span class="social-label">Instagram</span>
                </a>
                <a href="https://www.facebook.com/share/1JAx8xovkj/" target="_blank" class="portal-card social-card" title="Facebook">
                  <div class="portal-icon-box fb-icon"><i class="fab fa-facebook-f"></i></div>
                  <span class="social-label">Facebook</span>
                </a>
                <a href="https://www.tiktok.com/@kiki.traiteur?_r=1&_t=ZS-975jbxQeOrV" target="_blank" class="portal-card social-card" title="TikTok">
                  <div class="portal-icon-box tk-icon"><i class="fab fa-tiktok"></i></div>
                  <span class="social-label">TikTok</span>
                </a>
                <a href="https://www.linkedin.com/in/service-commercial-kiki-traiteur-051872409?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" class="portal-card social-card" title="LinkedIn">
                  <div class="portal-icon-box li-icon"><i class="fab fa-linkedin-in"></i></div>
                  <span class="social-label">LinkedIn</span>
                </a>
              </div>

            </div>
          </div>

          <!-- Contact Form (INTOUCHABLE / CONSERVÉ À 100%) -->
          <div class="contact-form-panel animate-fade delay-1">
            <h2 style="font-size: 1.8rem; font-weight:900; margin-bottom: 2rem; color: var(--primary-dark);">Nous écrire</h2>
            
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="form-group-row">
                <div class="form-group">
                  <label for="contact-name">Nom complet *</label>
                  <input type="text" id="contact-name" name="name" [(ngModel)]="form.name" class="form-control" required placeholder="Ex: Jean Diouf">
                </div>
                <div class="form-group">
                  <label for="contact-email">Adresse E-mail *</label>
                  <input type="email" id="contact-email" name="email" [(ngModel)]="form.email" class="form-control" required placeholder="Ex: j.diouf@gmail.com">
                </div>
              </div>

              <div class="form-group">
                <label for="contact-subject">Sujet *</label>
                <input type="text" id="contact-subject" name="subject" [(ngModel)]="form.subject" class="form-control" required placeholder="Ex: Renseignements pour un cocktail">
              </div>

              <div class="form-group">
                <label for="contact-message">Message *</label>
                <textarea id="contact-message" name="message" [(ngModel)]="form.message" class="form-control" required placeholder="Saisissez votre message..." rows="5"></textarea>
              </div>

              <button type="submit" class="btn-submit-kiki" [disabled]="!contactForm.form.valid">Envoyer le message</button>
            </form>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="faq-accordion animate-fade">
          <div class="section-header">
            <span class="slbl">Des réponses à vos questions</span>
            <h2>Foire Aux Questions</h2>
            <div class="sline"></div>
          </div>

          <div class="faq-item" *ngFor="let item of faqs; let idx = index" [class.active]="item.active">
            <div class="faq-header" (click)="toggleFaq(idx)">
              <h3>{{ item.question }}</h3>
              <span class="faq-toggle">{{ item.active ? '-' : '+' }}</span>
            </div>
            <div class="faq-body" *ngIf="item.active">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2.5rem;
        align-items: start;
      }
      .contact-form-panel {
        height: fit-content;
        align-self: start;
        background: var(--bg-white);
        padding: 2.2rem;
        border-radius: 20px;
        border: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 10px 30px rgba(0,0,0,0.04);
        box-sizing: border-box;
        overflow: hidden;
        max-width: 100%;
      }
      .form-group-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      .form-control {
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
      }
      .btn-submit-kiki {
        width: 100%;
        background: #721513;
        color: #ffffff;
        font-size: 0.95rem;
        font-weight: 700;
        padding: 0.95rem 2rem;
        border-radius: 50px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(114, 21, 19, 0.25);
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      .btn-submit-kiki:hover:not([disabled]) {
        background: #5a100e;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(114, 21, 19, 0.35);
      }
      .btn-submit-kiki[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .portal-links-list {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      }
      .portal-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--bg-white);
        border: 1px solid rgba(0,0,0,0.08);
        border-radius: 14px;
        padding: 0.85rem 1rem;
        text-decoration: none;
        color: inherit;
        transition: all 0.25s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
      }
      .portal-card:hover {
        transform: translateY(-2px);
        border-color: rgba(114,21,19,0.3);
        box-shadow: 0 6px 20px rgba(114,21,19,0.1);
      }
      .portal-card-location {
        border-left: 4px solid var(--primary-color);
        background: linear-gradient(135deg, var(--bg-white), var(--bg-secondary));
      }
      .portal-card-left {
        display: flex;
        align-items: center;
        gap: 0.9rem;
      }
      .portal-icon-box {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.15rem;
        flex-shrink: 0;
        background: rgba(114, 21, 19, 0.08);
        color: #721513;
        border: 1px solid rgba(114, 21, 19, 0.15);
        transition: all 0.3s ease;
      }
      .portal-card:hover .portal-icon-box {
        background: #721513;
        color: #ffffff;
        border-color: #721513;
      }
      .portal-details {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }
      .portal-title {
        font-weight: 700;
        font-size: 0.95rem;
        color: var(--primary-dark);
      }
      .portal-subtitle {
        font-size: 0.8rem;
        color: #64748b;
      }
      .portal-badge-maps {
        display: inline-block;
        margin-top: 0.35rem;
        background: #721513;
        color: #ffffff;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0.2rem 0.6rem;
        border-radius: 8px;
        width: fit-content;
      }
      .portal-arrow {
        color: #94a3b8;
        font-size: 0.85rem;
        transition: transform 0.2s;
      }
      .portal-card:hover .portal-arrow {
        transform: translateX(3px);
        color: #721513;
      }
      .portal-socials-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.6rem;
      }
      .social-card {
        flex-direction: column;
        justify-content: center;
        padding: 0.75rem 0.5rem;
        gap: 0.4rem;
        text-align: center;
      }
      .social-label {
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--primary-dark);
      }
      @media (max-width: 768px) {
        .contact-grid, .form-group-row {
          grid-template-columns: 1fr;
        }
      }

      /* ===== DARK MODE OVERRIDES ===== */
      [data-theme="dark"] .portal-card {
        border-color: var(--border-color);
      }
      [data-theme="dark"] .portal-subtitle,
      [data-theme="dark"] .portal-arrow {
        color: var(--text-muted);
      }
    `
  ]
})
export class ContactComponent {
  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  faqs = [
    {
      question: 'Quels sont vos délais de réservation pour la salle La Diva ?',
      answer: "La salle La Diva étant très demandée à Dakar pour les réceptions de mariage et de gala, nous vous conseillons de réserver au moins 3 à 6 mois à l'avance. Pour les prestations traiteur hors salle, un délai de 15 jours est généralement suffisant.",
      active: false
    },
    {
      question: 'Quelles sont les capacités de la salle La Diva ?',
      answer: "Notre salle de réception exclusive La Diva peut accueillir confortablement jusqu'à 150 convives dans une configuration de banquet assis (repas de mariage), et jusqu'à 250 convives dans le cadre d'un cocktail dînatoire debout.",
      active: false
    },
    {
      question: 'Proposez-vous des options adaptées aux régimes alimentaires spécifiques ?',
      answer: "Tout à fait. Nos brigades culinaires conçoivent des menus personnalisés sans surcoût pour s'adapter à toutes vos exigences : plats végétariens, végétaliens, sans gluten ou respectant des régimes confessionnels spécifiques.",
      active: false
    },
    {
      question: 'Pouvons-nous emporter les restes de notre réception ?',
      answer: "Oui, absolument. C'est l'un de nos engagements éco-responsables majeurs à Dakar : à la fin de votre réception à la salle La Diva, l'intégralité des restes alimentaires non consommés est soigneusement conditionnée et remise aux mariés ou aux organisateurs pour éviter tout gaspillage culinaire.",
      active: false
    }
  ];

  constructor(private dataService: KikiDataService) {}

  toggleFaq(index: number): void {
    this.faqs[index].active = !this.faqs[index].active;
  }

  onSubmit(): void {
    this.dataService.showToast('Votre message a été envoyé à Kiki Traiteur avec succès !');
    this.form = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
