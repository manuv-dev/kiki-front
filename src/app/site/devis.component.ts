import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KikiDataService } from '../services/kiki-data.service';

@Component({
  selector: 'app-devis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>Demander un Devis</h1>
        <div class="page-hero-path">Accueil &nbsp;&gt;&nbsp; Devis &nbsp;&gt;&nbsp; Réservation sur Mesure</div>
      </div>
    </section>

    <!-- Devis Wizard Section -->
    <section class="section-padding">
      <div class="container" style="max-width: 1040px;">
        
        <div class="contact-grid">
          <!-- WIZARD FORM PANEL (Left Column) -->
          <div class="contact-form-panel animate-fade" style="padding: 2.5rem;">
            
            <!-- STEPPER PROGRESS BAR -->
            <div class="wizard-stepper">
              <div class="step-item" [class.active]="currentStep === 1" [class.completed]="currentStep > 1" (click)="goToStep(1)">
                <div class="step-circle">
                  <i class="fas" [ngClass]="currentStep > 1 ? 'fa-check' : 'fa-calendar-alt'"></i>
                </div>
                <span class="step-label">1. Événement</span>
              </div>

              <div class="step-line" [class.active]="currentStep > 1"></div>

              <div class="step-item" [class.active]="currentStep === 2" [class.completed]="currentStep > 2" (click)="goToStep(2)">
                <div class="step-circle">
                  <i class="fas" [ngClass]="currentStep > 2 ? 'fa-check' : 'fa-user-edit'"></i>
                </div>
                <span class="step-label">2. Coordonnées</span>
              </div>

              <div class="step-line" [class.active]="currentStep > 2"></div>

              <div class="step-item" [class.active]="currentStep === 3" [class.completed]="currentStep === 3" (click)="goToStep(3)">
                <div class="step-circle">
                  <i class="fas fa-clipboard-check"></i>
                </div>
                <span class="step-label">3. Récapitulatif</span>
              </div>
            </div>

            <!-- ÉTAPE 1 : VOTRE ÉVÉNEMENT -->
            <div [hidden]="currentStep !== 1" class="animate-fade">
              <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 1.8rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem;">Votre événement</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Décrivez-nous votre projet pour une offre gastronomique sur mesure</p>
              </div>

              <!-- Type de client (Particulier vs Entreprise) -->
              <div class="cat-tabs-grid">
                <div class="cat-card-item" [class.active]="form.clientType === 'particulier'" (click)="setClientType('particulier')">
                  <i class="fas fa-user"></i>
                  <div class="cat-title">Client Particulier</div>
                  <div class="cat-sub">Réception, mariage, fête privée...</div>
                </div>
                <div class="cat-card-item" [class.active]="form.clientType === 'entreprise'" (click)="setClientType('entreprise')">
                  <i class="fas fa-building"></i>
                  <div class="cat-title">Institution / Entreprise</div>
                  <div class="cat-sub">Séminaire, cocktail corporate...</div>
                </div>
              </div>

              <!-- Champ Nom Entreprise (si Entreprise) -->
              <div class="form-group" [hidden]="form.clientType !== 'entreprise'" style="margin-top: 1.5rem;">
                <label for="org"><i class="fas fa-building" style="margin-right: 0.4rem; color: var(--primary-color);"></i> Nom de l'entreprise / Institution *</label>
                <input type="text" id="org" name="organization" [(ngModel)]="form.organization" class="form-control" placeholder="Ex: Orange Sénégal, BICIS, Ministère...">
              </div>

              <div style="border-top: 1px solid var(--border-color); margin: 2rem 0;"></div>

              <!-- Quelle prestation -->
              <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.3rem;">Quelle prestation ?</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Sélectionnez le type de service souhaité</p>
              </div>
              <div class="prestations-grid">
                <div *ngFor="let prest of prestationsList"
                     class="prestation-card"
                     [class.active]="form.prestationId === prest.id"
                     (click)="selectPrestation(prest.id)">
                  <i class="fas {{ prest.icon }}"></i>
                  <div class="prest-name">{{ prest.label }}</div>
                </div>
              </div>

              <div style="border-top: 1px solid var(--border-color); margin: 2rem 0;"></div>

              <!-- Date, Heure & Convives -->
              <div class="form-group-row">
                <div class="form-group">
                  <label for="d-date">Date de l'événement *</label>
                  <input type="date" id="d-date" name="date" [(ngModel)]="form.date" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="d-time">Heure souhaitée *</label>
                  <input type="time" id="d-time" name="time" [(ngModel)]="form.time" class="form-control" required>
                </div>
              </div>

              <div class="form-group">
                <label for="d-guests">Nombre estimé de convives *</label>
                <input type="number" id="d-guests" name="guests" [(ngModel)]="form.guests" class="form-control" min="10" max="5000" placeholder="Ex: 50 convives (minimum 10)" required>
              </div>

              <div style="border-top: 1px solid var(--border-color); margin: 2rem 0;"></div>

              <!-- Signature Gastronomique -->
              <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.3rem;">Signature gastronomique</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Quel esprit culinaire pour votre événement ?</p>
              </div>
              <div class="cuisine-grid">
                <div *ngFor="let c of cuisineList"
                     class="cuisine-card"
                     [class.active]="form.cuisine === c.id"
                     (click)="form.cuisine = c.id">
                  <i class="fas {{ c.icon }}"></i>
                  <div class="cuisine-name">{{ c.label }}</div>
                  <div class="cuisine-sub">{{ c.sub }}</div>
                </div>
              </div>
              <!-- Champ libre si "Autre" sélectionné -->
              <div class="form-group" [hidden]="form.cuisine !== 'autre'" style="margin-top: 1.2rem;">
                <label for="cuisine-autre"><i class="fas fa-pencil" style="margin-right: 0.4rem; color: var(--primary-color);"></i> Précisez votre souhait *</label>
                <input type="text" id="cuisine-autre" name="cuisineAutre" [(ngModel)]="form.cuisineAutre" class="form-control" placeholder="Décrivez l'esprit culinaire que vous souhaitez...">
              </div>

              <!-- Footer Étape 1 -->
              <div class="wizard-actions">
                <div></div>
                <button type="button" class="btn-red" style="border-radius: 50px; padding: 0.9rem 2.2rem;" [disabled]="!isStep1Valid()" (click)="nextStep()">
                  CONTINUER <i class="fas fa-chevron-right" style="margin-left: 0.5rem;"></i>
                </button>
              </div>
            </div>

            <!-- ÉTAPE 2 : DERNIÈRES FORMALITÉS -->
            <div [hidden]="currentStep !== 2" class="animate-fade">
              <div style="text-align: center; margin-bottom: 2.5rem;">
                <h2 style="font-size: 1.8rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem;">Dernières formalités</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Vos coordonnées pour conclure ce beau projet</p>
              </div>

              <div class="form-group-row">
                <div class="form-group">
                  <label for="d-name">NOM &amp; PRÉNOM *</label>
                  <input type="text" id="d-name" name="name" [(ngModel)]="form.name" class="form-control" placeholder="M. ou Mme d'Exception" required>
                </div>
                <div class="form-group">
                  <label for="d-email">ADRESSE EMAIL *</label>
                  <input type="email" id="d-email" name="email" [(ngModel)]="form.email" class="form-control" placeholder="votre-adresse@prestige.com" required>
                </div>
              </div>

              <div class="form-group">
                <label for="d-phone">TÉLÉPHONE DIRECT *</label>
                <input type="tel" id="d-phone" name="phone" [(ngModel)]="form.phone" class="form-control" placeholder="+221 77 000 00 00" required>
              </div>

              <div class="form-group">
                <label for="d-msg">DÉSIRS PARTICULIERS, ALLERGIES, RÊVES SECRETS... *</label>
                <textarea id="d-msg" name="message" [(ngModel)]="form.message" class="form-control" rows="5" placeholder="Dites-nous ce qui vous ferait vibrer d'émotion..." required></textarea>
              </div>

              <!-- Footer Étape 2 -->
              <div class="wizard-actions">
                <button type="button" class="btn-secondary-kiki" (click)="prevStep()">
                  <i class="fas fa-chevron-left" style="margin-right: 0.5rem;"></i> PRÉCÉDENT
                </button>
                <button type="button" class="btn-red" style="border-radius: 50px; padding: 0.9rem 2.2rem;" [disabled]="!isStep2Valid()" (click)="nextStep()">
                  VÉRIFIER MA DEMANDE <i class="fas fa-clipboard-check" style="margin-left: 0.5rem;"></i>
                </button>
              </div>
            </div>


            <!-- ÉTAPE 3 : RÉCAPITULATIF -->
            <div [hidden]="currentStep !== 3" class="animate-fade">
              <div style="text-align: center; margin-bottom: 2rem;">
                <span class="slbl" style="display: inline-block; margin-bottom: 0.5rem;"><i class="fas fa-clipboard-check"></i> ÉTAPE FINALE</span>
                <h2 style="font-size: 1.8rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem;">Vérifiez vos informations</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Tout est prêt pour envoyer votre demande à notre équipe commerciale</p>
              </div>

              <div class="recap-box">
                <div class="recap-row">
                  <span class="recap-label"><i class="fas fa-user-tag" style="margin-right: 0.5rem; color: var(--primary-color);"></i> Profil client</span>
                  <span class="recap-value">
                    {{ form.clientType === 'entreprise' ? 'Institution / Entreprise (' + form.organization + ')' : 'Client Particulier' }}
                  </span>
                </div>

                <div class="recap-row">
                  <span class="recap-label"><i class="fas fa-utensils" style="margin-right: 0.5rem; color: var(--primary-color);"></i> Prestation souhaitée</span>
                  <span class="recap-value">{{ getPrestationLabel(form.prestationId) }}</span>
                </div>

                <div class="recap-row">
                  <span class="recap-label"><i class="fas fa-calendar-alt" style="margin-right: 0.5rem; color: var(--primary-color);"></i> Date et Heure</span>
                  <span class="recap-value">{{ form.date }} à {{ form.time }}</span>
                </div>

                <div class="recap-row">
                  <span class="recap-label"><i class="fas fa-users" style="margin-right: 0.5rem; color: var(--primary-color);"></i> Convives</span>
                  <span class="recap-value">{{ form.guests }} personnes</span>
                </div>

                <div class="recap-row">
                  <span class="recap-label"><i class="fas fa-heart" style="margin-right: 0.5rem; color: var(--primary-color);"></i> Signature gastronomique</span>
                  <span class="recap-value">{{ getCuisineLabel(form.cuisine) }}</span>
                </div>

                <div class="recap-row">
                  <span class="recap-label"><i class="fas fa-id-card" style="margin-right: 0.5rem; color: var(--primary-color);"></i> Nom complet</span>
                  <span class="recap-value">{{ form.name }}</span>
                </div>

                <div class="recap-row">
                  <span class="recap-label"><i class="fas fa-phone-alt" style="margin-right: 0.5rem; color: var(--primary-color);"></i> Téléphone</span>
                  <span class="recap-value">{{ form.phone }}</span>
                </div>

                <div class="recap-row">
                  <span class="recap-label"><i class="fas fa-envelope" style="margin-right: 0.5rem; color: var(--primary-color);"></i> Email</span>
                  <span class="recap-value">{{ form.email }}</span>
                </div>

                <div style="margin-top: 1.5rem; border-top: 1px dashed var(--border-color); padding-top: 1.2rem;">
                  <span class="recap-label" style="display: block; margin-bottom: 0.5rem;"><i class="fas fa-comment-dots" style="margin-right: 0.5rem; color: var(--primary-color);"></i> Désirs particuliers, allergies, rêves secrets...</span>
                  <div class="recap-msg-box">{{ form.message }}</div>
                </div>
              </div>

              <!-- Footer Étape 3 -->
              <div class="wizard-actions">
                <button type="button" class="btn-secondary-kiki" style="padding: 0.8rem 1.5rem;" (click)="prevStep()">
                  <i class="fas fa-edit" style="margin-right: 0.5rem;"></i> MODIFIER
                </button>
                <button type="button" class="btn-red" style="border-radius: 50px; padding: 0.9rem 2rem; font-size: 0.95rem;" (click)="onSubmit()">
                  <i class="fas fa-paper-plane" style="margin-right: 0.5rem;"></i> ENVOYER
                </button>
              </div>
            </div>

          </div>

          <!-- ENGAGEMENT & DEVIS SUR MESURE PANEL (Right Column) -->
          <div class="contact-info-panel animate-fade delay-1" style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); padding: 2.5rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="slbl">Un Service Sur Mesure</span>
              <h3 style="font-size: 1.5rem; color: var(--primary-dark); margin-bottom: 1rem;">Notre Engagement d'Excellence</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;">Chaque événement étant unique, nous étudions votre demande avec soin pour vous proposer une offre personnalisée, adaptée à vos exigences gastronomiques et logistiques.</p>

              <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; margin-top: 1.5rem;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 1.5rem;">
                  <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(114, 21, 19, 0.08); color: var(--primary-dark); display: flex; align-items: center; justify-content: center; margin-right: 1.2rem; flex-shrink: 0; font-size: 1.1rem;">
                    <i class="fas fa-gem"></i>
                  </div>
                  <div>
                    <strong style="display: block; color: var(--primary-dark); font-size: 0.98rem; margin-bottom: 0.2rem;">Prestation 100% Sur Mesure</strong>
                    <span style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.5;">Des menus conçus spécialement selon vos envies, le thème de votre événement et le profil de vos convives.</span>
                  </div>
                </div>

                <div style="display: flex; align-items: flex-start; margin-bottom: 1.5rem;">
                  <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(114, 21, 19, 0.08); color: var(--primary-dark); display: flex; align-items: center; justify-content: center; margin-right: 1.2rem; flex-shrink: 0; font-size: 1.1rem;">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div>
                    <strong style="display: block; color: var(--primary-dark); font-size: 0.98rem; margin-bottom: 0.2rem;">Réactivité Commerciale</strong>
                    <span style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.5;">Envoi de votre proposition détaillée et personnalisée par notre équipe sous 24 à 48 heures ouvrées.</span>
                  </div>
                </div>

                <div style="display: flex; align-items: flex-start;">
                  <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(114, 21, 19, 0.08); color: var(--primary-dark); display: flex; align-items: center; justify-content: center; margin-right: 1.2rem; flex-shrink: 0; font-size: 1.1rem;">
                    <i class="fas fa-handshake"></i>
                  </div>
                  <div>
                    <strong style="display: block; color: var(--primary-dark); font-size: 0.98rem; margin-bottom: 0.2rem;">Accompagnement Dédié</strong>
                    <span style="color: var(--text-muted); font-size: 0.88rem; line-height: 1.5;">Un conseiller Kiki Traiteur à votre disposition pour affiner chaque détail gastronomique et logistique.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; margin-top: 1.5rem; text-align: center;">
              <span style="display: block; font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Besoin d'assistance directe ?</span>
              <div style="font-size: 1.15rem; font-weight: 700; color: var(--primary-dark);">
                <i class="fas fa-phone-alt" style="margin-right: 0.5rem; color: var(--primary-color);"></i> +221 33 832 29 66
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .wizard-stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    .step-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
    }
    .step-circle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--bg-tertiary);
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    .step-item.active .step-circle {
      background: var(--primary-color);
      color: #FFF;
      box-shadow: 0 0 0 5px rgba(229, 29, 36, 0.15);
    }
    .step-item.completed .step-circle {
      background: var(--primary-dark);
      color: #FFF;
    }
    .step-label {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--text-muted);
      transition: color 0.3s;
    }
    .step-item.active .step-label {
      color: var(--primary-dark);
      font-weight: 800;
    }
    .step-line {
      flex: 1;
      height: 2px;
      background: var(--border-color);
      margin: 0 1rem;
      transition: background 0.3s;
    }
    .step-line.active {
      background: var(--primary-color);
    }

    .cat-tabs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .cat-card-item {
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: 1.5rem;
      text-align: center;
      cursor: pointer;
      background: #FFF;
      transition: all 0.3s ease;
    }
    .cat-card-item:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }
    .cat-card-item.active {
      border-color: var(--primary-color);
      background: rgba(229, 29, 36, 0.05);
      box-shadow: 0 0 0 3px rgba(229, 29, 36, 0.12);
    }
    .cat-card-item i {
      font-size: 1.8rem;
      color: var(--primary-dark);
      margin-bottom: 0.5rem;
      transition: color 0.3s;
    }
    .cat-card-item.active i {
      color: var(--primary-color);
    }
    .cat-card-item .cat-title {
      font-weight: 700;
      color: var(--primary-dark);
      font-size: 1.05rem;
      margin-bottom: 0.2rem;
    }
    .cat-card-item .cat-sub {
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .prestations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .prestation-card {
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: 1.25rem 1rem;
      text-align: center;
      cursor: pointer;
      background: #FFF;
      transition: all 0.3s ease;
    }
    .prestation-card:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }
    .prestation-card.active {
      border-color: var(--primary-color);
      background: rgba(229, 29, 36, 0.05);
      box-shadow: 0 0 0 3px rgba(229, 29, 36, 0.12);
    }
    .prestation-card i {
      font-size: 1.5rem;
      color: var(--primary-dark);
      margin-bottom: 0.5rem;
    }
    .prestation-card.active i {
      color: var(--primary-color);
    }
    .prestation-card .prest-name {
      font-weight: 700;
      color: var(--primary-dark);
      font-size: 0.95rem;
    }

    .recap-box {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .cuisine-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .cuisine-card {
      border: 2px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: 1.2rem 1rem;
      text-align: center;
      cursor: pointer;
      background: #FFF;
      transition: all 0.3s ease;
    }
    .cuisine-card:hover {
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }
    .cuisine-card.active {
      border-color: var(--primary-color);
      background: rgba(229, 29, 36, 0.05);
      box-shadow: 0 0 0 3px rgba(229, 29, 36, 0.12);
    }
    .cuisine-card i {
      font-size: 1.4rem;
      color: var(--primary-dark);
      margin-bottom: 0.5rem;
    }
    .cuisine-card.active i { color: var(--primary-color); }
    .cuisine-card .cuisine-name {
      font-weight: 700;
      color: var(--primary-dark);
      font-size: 0.95rem;
      margin-bottom: 0.2rem;
    }
    .cuisine-card .cuisine-sub {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .recap-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.85rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .recap-row:last-child {
      border-bottom: none;
    }
    .recap-label {
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.92rem;
    }
    .recap-value {
      color: var(--primary-dark);
      font-weight: 700;
      font-size: 1rem;
      text-align: right;
    }
    .recap-msg-box {
      margin-top: 0.75rem;
      padding: 1.25rem;
      background: #FFF;
      border-radius: var(--border-radius-sm);
      border-left: 4px solid var(--primary-color);
      color: var(--text-main);
      font-style: italic;
      line-height: 1.6;
    }

    .wizard-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
    }

    .btn-secondary-kiki {
      background: var(--bg-tertiary);
      color: var(--text-main);
      border: 1px solid var(--border-color);
      padding: 0.8rem 1.8rem;
      border-radius: 50px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-secondary-kiki:hover {
      background: #E2E8F0;
      color: var(--primary-dark);
    }
  `]
})
export class DevisComponent implements OnInit {
  currentStep = 1;

  form = {
    clientType: 'particulier',
    organization: '',
    prestationId: 'traiteur',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: 50,
    cuisine: '',
    cuisineAutre: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  prestationsList = [
    { id: 'traiteur', label: 'Service Traiteur Prestige', icon: 'fa-utensils' },
    { id: 'evenements', label: 'Organisation d\'Événements', icon: 'fa-champagne-glasses' },
    { id: 'salle-diva', label: 'Salle La Diva', icon: 'fa-hotel' },
    { id: 'takeaway', label: 'Plats à Emporter & Food Truck', icon: 'fa-bag-shopping' }
  ];

  cuisineList = [
    { id: 'classique', label: 'Classique Gourmet', sub: 'Tradition & Excellence', icon: 'fa-heart' },
    { id: 'moderne', label: 'Créativité Moderne', sub: 'Innovation & Fusion', icon: 'fa-wand-magic-sparkles' },
    { id: 'haute-couture', label: 'Collection Haute Couture', sub: 'Prestige & Rareté', icon: 'fa-crown' },
    { id: 'autre', label: 'Autre', sub: 'À préciser', icon: 'fa-pencil' }
  ];

  constructor(private route: ActivatedRoute, private dataService: KikiDataService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['prestation']) {
        this.form.prestationId = params['prestation'];
      }
    });
  }

  setClientType(type: 'particulier' | 'entreprise'): void {
    this.form.clientType = type;
    if (type === 'particulier') {
      this.form.organization = '';
    }
  }

  selectPrestation(id: string): void {
    this.form.prestationId = id;
  }

  getPrestationLabel(id: string): string {
    const found = this.prestationsList.find(p => p.id === id);
    return found ? found.label : 'Service Traiteur Prestige';
  }

  getPrestationIcon(id: string): string {
    const found = this.prestationsList.find(p => p.id === id);
    return found ? found.icon : 'fa-utensils';
  }

  getCuisineLabel(id: string): string {
    if (id === 'autre') {
      return this.form.cuisineAutre.trim() || 'Autre (à préciser)';
    }
    const found = this.cuisineList.find(c => c.id === id);
    return found ? found.label : '—';
  }

  isStep1Valid(): boolean {
    if (this.form.clientType === 'entreprise' && !this.form.organization.trim()) {
      return false;
    }
    return !!(
      this.form.prestationId &&
      this.form.date &&
      this.form.time &&
      this.form.guests >= 10 &&
      this.form.cuisine &&
      (this.form.cuisine !== 'autre' || this.form.cuisineAutre.trim())
    );
  }

  isStep2Valid(): boolean {
    return !!(
      this.form.name.trim() &&
      this.form.phone.trim() &&
      this.form.email.trim() &&
      this.form.message.trim()
    );
  }

  goToStep(step: number): void {
    if (step === 1) {
      this.currentStep = 1;
    } else if (step === 2 && this.isStep1Valid()) {
      this.currentStep = 2;
    } else if (step === 3 && this.isStep1Valid() && this.isStep2Valid()) {
      this.currentStep = 3;
    }
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.isStep1Valid()) {
      this.currentStep = 2;
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (this.currentStep === 2 && this.isStep2Valid()) {
      this.currentStep = 3;
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  }

  onSubmit(): void {
    this.dataService.addRequest({
      clientId: this.form.clientType === 'entreprise' ? 'cli_2' : 'cli_1',
      prestationId: this.form.prestationId,
      date: `${this.form.date} à ${this.form.time}`,
      guests: Number(this.form.guests),
      isInstitution: this.form.clientType === 'entreprise',
      organization: this.form.organization,
      message: this.form.message
    });

    this.dataService.showToast('Votre demande de devis a été envoyée avec succès ! Notre équipe commerciale va vous recontacter.');
    this.currentStep = 1;
    this.form = {
      clientType: 'particulier',
      organization: '',
      prestationId: 'traiteur',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      guests: 50,
      cuisine: '',
      cuisineAutre: '',
      name: '',
      phone: '',
      email: '',
      message: ''
    };
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }
}
