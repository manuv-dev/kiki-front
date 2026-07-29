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
    <section class="devis-section-padding">
      <div class="container" style="max-width: 1040px;">
        
        <div class="contact-grid">
          <!-- WIZARD FORM PANEL (Left Column) -->
          <div class="contact-form-panel animate-fade">
            
            <!-- EN-TÊTE COMPACT EXCLUSIF À LA VUE MOBILE (ICÔNE ET NOM DE L'ÉTAPE) -->
            <div class="mobile-step-header">
              <div class="mobile-step-badge">
                <i class="fas" [ngClass]="getStepIcon(currentStep)"></i>
                <span>{{ getStepName(currentStep) }}</span>
              </div>
              <div class="mobile-step-title">{{ getStepSubtitle(currentStep) }}</div>
            </div>

            <!-- STEPPER PROGRESS BAR (7 STEPS) -->
            <div class="wizard-stepper">
              <!-- Step 1: Profil -->
              <div class="step-item" [class.active]="currentStep === 1" [class.completed]="currentStep > 1" (click)="goToStep(1)">
                <div class="step-circle">
                  <i class="fas" [ngClass]="currentStep > 1 ? 'fa-check' : 'fa-user'"></i>
                </div>
                <span class="step-label">PROFIL</span>
              </div>

              <div class="step-line" [class.active]="currentStep > 1"></div>

              <!-- Step 2: Prestation -->
              <div class="step-item" [class.active]="currentStep === 2" [class.completed]="currentStep > 2" (click)="goToStep(2)">
                <div class="step-circle">
                  <i class="fas" [ngClass]="currentStep > 2 ? 'fa-check' : 'fa-concierge-bell'"></i>
                </div>
                <span class="step-label">PRESTATION</span>
              </div>

              <div class="step-line" [class.active]="currentStep > 2"></div>

              <!-- Step 3: Date -->
              <div class="step-item" [class.active]="currentStep === 3" [class.completed]="currentStep > 3" (click)="goToStep(3)">
                <div class="step-circle">
                  <i class="fas" [ngClass]="currentStep > 3 ? 'fa-check' : 'fa-calendar-alt'"></i>
                </div>
                <span class="step-label">DATE</span>
              </div>

              <div class="step-line" [class.active]="currentStep > 3"></div>

              <!-- Step 4: Lieu -->
              <div class="step-item" [class.active]="currentStep === 4" [class.completed]="currentStep > 4" (click)="goToStep(4)">
                <div class="step-circle">
                  <i class="fas" [ngClass]="currentStep > 4 ? 'fa-check' : 'fa-map-marker-alt'"></i>
                </div>
                <span class="step-label">LIEU</span>
              </div>

              <div class="step-line" [class.active]="currentStep > 4"></div>

              <!-- Step 5: Cuisine -->
              <div class="step-item" [class.active]="currentStep === 5" [class.completed]="currentStep > 5" (click)="goToStep(5)">
                <div class="step-circle">
                  <i class="fas" [ngClass]="currentStep > 5 ? 'fa-check' : 'fa-utensils'"></i>
                </div>
                <span class="step-label">CUISINE</span>
              </div>

              <div class="step-line" [class.active]="currentStep > 5"></div>

              <!-- Step 6: Contact -->
              <div class="step-item" [class.active]="currentStep === 6" [class.completed]="currentStep > 6" (click)="goToStep(6)">
                <div class="step-circle">
                  <i class="fas" [ngClass]="currentStep > 6 ? 'fa-check' : 'fa-id-card'"></i>
                </div>
                <span class="step-label">CONTACT</span>
              </div>
            </div>

            <!-- ÉTAPE 1 : PROFIL (QUI ÊTES-VOUS ?) -->
            <div [hidden]="currentStep !== 1" class="animate-fade">
              <div class="wizard-step-header">
                <h2 style="font-size: 1.85rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem; font-family: var(--font-heading);">Qui êtes-vous ?</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem; font-style: italic;">Dites-nous si cette demande est personnelle ou professionnelle</p>
              </div>

              <div class="cat-tabs-grid">
                <div class="cat-card-item" [class.active]="form.clientType === 'particulier'" (click)="setClientType('particulier')">
                  <div class="icon-circle">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="cat-title">Client Particulier</div>
                  <div class="cat-sub">Réception, mariage, fête privée...</div>
                </div>
                <div class="cat-card-item" [class.active]="form.clientType === 'entreprise'" (click)="setClientType('entreprise')">
                  <div class="icon-circle">
                    <i class="fas fa-building"></i>
                  </div>
                  <div class="cat-title">Institution / Entreprise</div>
                  <div class="cat-sub">Séminaire, cocktail corporate...</div>
                </div>
              </div>

              <div class="form-group" [hidden]="form.clientType !== 'entreprise'" style="margin-top: 1.5rem;">
                <label for="org"><i class="fas fa-building" style="margin-right: 0.4rem; color: var(--primary-color);"></i> Nom de l'entreprise / Institution *</label>
                <input type="text" id="org" name="organization" [(ngModel)]="form.organization" class="form-control" placeholder="Ex: Orange Sénégal, BICIS, Ministère...">
              </div>

              <div class="wizard-actions" style="justify-content: flex-end;">
                <button type="button" class="btn-red-pill" [disabled]="!isStep1Valid()" (click)="nextStep()">
                  CONTINUER <i class="fas fa-chevron-right" style="margin-left: 0.5rem;"></i>
                </button>
              </div>
            </div>

            <!-- ÉTAPE 2 : PRESTATION -->
            <div [hidden]="currentStep !== 2" class="animate-fade">
              <div class="wizard-step-header">
                <h2 style="font-size: 1.85rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem; font-family: var(--font-heading);">Quelle prestation ?</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem; font-style: italic;">Sélectionnez le type d'événement souhaité</p>
              </div>

              <div class="prestations-grid-3x2">
                <div *ngFor="let prest of prestationsList"
                     class="prestation-card-img"
                     [class.active]="form.prestationId === prest.id"
                     (click)="selectPrestation(prest.id)">
                  <div class="icon-box">
                    <i class="fas {{ prest.icon }}"></i>
                  </div>
                  <div class="prest-name">{{ prest.label }}</div>
                </div>
              </div>

              <div class="wizard-actions">
                <button type="button" class="btn-secondary-kiki" (click)="prevStep()">
                  <i class="fas fa-chevron-left" style="margin-right: 0.5rem;"></i> PRÉCÉDENT
                </button>
                <button type="button" class="btn-red-pill" [disabled]="!isStep2Valid()" (click)="nextStep()">
                  CONTINUER <i class="fas fa-chevron-right" style="margin-left: 0.5rem;"></i>
                </button>
              </div>
            </div>

            <!-- ÉTAPE 3 : DATE & CONVIVES -->
            <div [hidden]="currentStep !== 3" class="animate-fade">
              <div class="wizard-step-header">
                <h2 style="font-size: 1.85rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem; font-family: var(--font-heading);">Magnifique projet</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem; font-style: italic;">Pour quel jour et combien de convives ?</p>
              </div>

              <!-- NOMBRE ESTIMÉ DE CONVIVES -->
              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label style="font-weight: 700; font-size: 0.9rem; color: #7A1C1C; text-transform: uppercase; letter-spacing: 0.5px;">
                  NOMBRE ESTIMÉ DE CONVIVES ({{ form.guests }}) *
                </label>
                <input type="range" [(ngModel)]="form.guests" name="guests" min="10" max="500" step="10" class="custom-slider" style="width: 100%; margin: 1rem 0 0.5rem;">
                <div style="display: flex; justify-content: space-between; color: #64748B; font-size: 0.8rem; font-weight: 600;">
                  <span>10 (INTIME)</span>
                  <span>100 (MOYEN)</span>
                  <span>250+ (GALA)</span>
                </div>
              </div>

              <!-- DATE & HEURE -->
              <div class="form-group-row">
                <div class="form-group">
                  <label style="font-weight: 700; font-size: 0.85rem; color: #7A1C1C; text-transform: uppercase;">DATE DE L'ÉVÉNEMENT *</label>
                  <input type="date" [(ngModel)]="form.date" name="date" class="form-control" style="border-radius: 25px; padding: 0.75rem 1.25rem;" required>
                </div>
                <div class="form-group">
                  <label style="font-weight: 700; font-size: 0.85rem; color: #7A1C1C; text-transform: uppercase;">HEURE SOUHAITÉE *</label>
                  <input type="time" [(ngModel)]="form.time" name="time" class="form-control" style="border-radius: 25px; padding: 0.75rem 1.25rem;" required>
                </div>
              </div>

              <div class="wizard-actions">
                <button type="button" class="btn-secondary-kiki" (click)="prevStep()">
                  <i class="fas fa-chevron-left" style="margin-right: 0.5rem;"></i> PRÉCÉDENT
                </button>
                <button type="button" class="btn-red-pill" [disabled]="!isStep3Valid()" (click)="nextStep()">
                  CONTINUER <i class="fas fa-chevron-right" style="margin-left: 0.5rem;"></i>
                </button>
              </div>
            </div>

            <!-- ÉTAPE 4 : LIEU -->
            <div [hidden]="currentStep !== 4" class="animate-fade">
              <div class="wizard-step-header">
                <h2 style="font-size: 1.85rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem; font-family: var(--font-heading);">Un timing précieux</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem; font-style: italic;">Où souhaitez-vous célébrer cet événement ?</p>
              </div>

              <label style="font-weight: 700; font-size: 0.85rem; color: #7A1C1C; text-transform: uppercase; margin-bottom: 1rem; display: block;">
                LIEU DE L'ÉVÉNEMENT *
              </label>

              <div class="lieu-grid-3">
                <div class="lieu-card-item" [class.active]="form.locationType === 'salle-diva'" (click)="selectLocationType('salle-diva', 'Salle La Diva, Dakar')">
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="lieu-title">Salle La Diva</div>
                  <div class="lieu-sub">Dakar</div>
                </div>
                <div class="lieu-card-item" [class.active]="form.locationType === 'exception'" (click)="selectLocationType('exception', 'Villa prestige')">
                  <i class="fas fa-star"></i>
                  <div class="lieu-title">Lieu d'Exception</div>
                  <div class="lieu-sub">Villa prestige</div>
                </div>
                <div class="lieu-card-item" [class.active]="form.locationType === 'autre'" (click)="selectLocationType('autre', '')">
                  <i class="fas fa-pen"></i>
                  <div class="lieu-title">Autre</div>
                  <div class="lieu-sub">À préciser</div>
                </div>
              </div>

              <div class="form-group" *ngIf="form.locationType === 'exception' || form.locationType === 'autre'" style="margin-top: 1.5rem;">
                <label for="loc"><i class="fas fa-map-pin" style="margin-right: 0.4rem; color: var(--primary-color);"></i> Précisez le lieu ou l'adresse du projet *</label>
                <input type="text" id="loc" name="locationDetails" [(ngModel)]="form.locationDetails" class="form-control" placeholder="Ex: Almadies, Villa 12, Dakar...">
              </div>

              <div class="wizard-actions">
                <button type="button" class="btn-secondary-kiki" (click)="prevStep()">
                  <i class="fas fa-chevron-left" style="margin-right: 0.5rem;"></i> PRÉCÉDENT
                </button>
                <button type="button" class="btn-red-pill" [disabled]="!isStep4Valid()" (click)="nextStep()">
                  CONTINUER <i class="fas fa-chevron-right" style="margin-left: 0.5rem;"></i>
                </button>
              </div>
            </div>

            <!-- ÉTAPE 5 : CUISINE -->
            <div [hidden]="currentStep !== 5" class="animate-fade">
              <div class="wizard-step-header">
                <h2 style="font-size: 1.85rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem; font-family: var(--font-heading);">Signature gastronomique</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem; font-style: italic;">Quel esprit culinaire pour votre événement ?</p>
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

              <div class="form-group" [hidden]="form.cuisine !== 'autre'" style="margin-top: 1.2rem;">
                <label for="cuisine-autre"><i class="fas fa-pen" style="margin-right: 0.4rem; color: var(--primary-color);"></i> Précisez votre souhait *</label>
                <input type="text" id="cuisine-autre" name="cuisineAutre" [(ngModel)]="form.cuisineAutre" class="form-control" placeholder="Décrivez l'esprit culinaire que vous souhaitez...">
              </div>

              <div class="wizard-actions">
                <button type="button" class="btn-secondary-kiki" (click)="prevStep()">
                  <i class="fas fa-chevron-left" style="margin-right: 0.5rem;"></i> PRÉCÉDENT
                </button>
                <button type="button" class="btn-red-pill" [disabled]="!isStep5Valid()" (click)="nextStep()">
                  CONTINUER <i class="fas fa-chevron-right" style="margin-left: 0.5rem;"></i>
                </button>
              </div>
            </div>

            <!-- ÉTAPE 6 : CONTACT -->
            <div [hidden]="currentStep !== 6" class="animate-fade">
              <div class="wizard-step-header">
                <h2 style="font-size: 1.85rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem; font-family: var(--font-heading);">Vos coordonnées</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem; font-style: italic;">Comment pouvons-nous vous joindre pour échanger sur ce projet ?</p>
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
                <label for="d-msg">DÉSIRS PARTICULIERS, ALLERGIES, REMARQUES (OPTIONNEL)</label>
                <textarea id="d-msg" name="message" [(ngModel)]="form.message" class="form-control" rows="4" placeholder="Dites-nous ce qui vous ferait vibrer d'émotion..."></textarea>
              </div>

              <div class="wizard-actions">
                <button type="button" class="btn-secondary-kiki" (click)="prevStep()">
                  <i class="fas fa-chevron-left" style="margin-right: 0.5rem;"></i> PRÉCÉDENT
                </button>
                <button type="button" class="btn-red-pill" [disabled]="!isStep6Valid()" (click)="nextStep()">
                  VOIR LE RÉCAPITULATIF <i class="fas fa-clipboard-check" style="margin-left: 0.5rem;"></i>
                </button>
              </div>
            </div>

            <!-- ÉTAPE 7 : RÉCAPITULATIF (AVEC BOUTONS MODIFIER PAR SECTION) -->
            <div [hidden]="currentStep !== 7" class="animate-fade">
              <div class="wizard-step-header">
                <span class="slbl" style="display: inline-block; margin-bottom: 0.5rem;"><i class="fas fa-clipboard-check"></i> ÉTAPE FINALE</span>
                <h2 style="font-size: 1.85rem; font-weight: 900; color: var(--primary-dark); margin-bottom: 0.3rem; font-family: var(--font-heading);">Récapitulatif de votre demande</h2>
                <p style="color: var(--text-muted); font-size: 0.95rem; font-style: italic;">Vérifiez et modifiez vos informations avant de valider votre projet</p>
              </div>

              <div class="recap-box">
                <!-- 1. Profil -->
                <div class="recap-row">
                  <div>
                    <span class="recap-label"><i class="fas fa-user-tag me-2" style="color: #7A1C1C;"></i>Profil client</span>
                    <div class="recap-value" style="text-align: left;">
                      {{ form.clientType === 'entreprise' ? 'Institution / Entreprise (' + form.organization + ')' : 'Client Particulier' }}
                    </div>
                  </div>
                  <button type="button" class="btn-edit-recap" (click)="goToStep(1)" title="Modifier le profil">
                    <i class="fas fa-edit me-1"></i> Modifier
                  </button>
                </div>

                <!-- 2. Prestation -->
                <div class="recap-row">
                  <div>
                    <span class="recap-label"><i class="fas fa-concierge-bell me-2" style="color: #7A1C1C;"></i>Prestation souhaitée</span>
                    <div class="recap-value" style="text-align: left;">{{ getPrestationLabel(form.prestationId) }}</div>
                  </div>
                  <button type="button" class="btn-edit-recap" (click)="goToStep(2)" title="Modifier la prestation">
                    <i class="fas fa-edit me-1"></i> Modifier
                  </button>
                </div>

                <!-- 3. Date & Convives -->
                <div class="recap-row">
                  <div>
                    <span class="recap-label"><i class="fas fa-calendar-alt me-2" style="color: #7A1C1C;"></i>Date, Heure & Convives</span>
                    <div class="recap-value" style="text-align: left;">
                      Le {{ form.date }} à {{ form.time }} — <strong>{{ form.guests }} convives</strong>
                    </div>
                  </div>
                  <button type="button" class="btn-edit-recap" (click)="goToStep(3)" title="Modifier la date et les convives">
                    <i class="fas fa-edit me-1"></i> Modifier
                  </button>
                </div>

                <!-- 4. Lieu -->
                <div class="recap-row">
                  <div>
                    <span class="recap-label"><i class="fas fa-map-marker-alt me-2" style="color: #7A1C1C;"></i>Lieu de l'événement</span>
                    <div class="recap-value" style="text-align: left;">{{ getLocationDisplay() }}</div>
                  </div>
                  <button type="button" class="btn-edit-recap" (click)="goToStep(4)" title="Modifier le lieu">
                    <i class="fas fa-edit me-1"></i> Modifier
                  </button>
                </div>

                <!-- 5. Signature Gastronomique -->
                <div class="recap-row">
                  <div>
                    <span class="recap-label"><i class="fas fa-utensils me-2" style="color: #7A1C1C;"></i>Signature gastronomique</span>
                    <div class="recap-value" style="text-align: left;">{{ getCuisineLabel(form.cuisine) }}</div>
                  </div>
                  <button type="button" class="btn-edit-recap" (click)="goToStep(5)" title="Modifier la signature gastronomique">
                    <i class="fas fa-edit me-1"></i> Modifier
                  </button>
                </div>

                <!-- 6. Contact & Coordonnées -->
                <div class="recap-row" style="border-bottom: none;">
                  <div>
                    <span class="recap-label"><i class="fas fa-id-card me-2" style="color: #7A1C1C;"></i>Coordonnées</span>
                    <div class="recap-value" style="text-align: left;">
                      <strong>{{ form.name }}</strong> ({{ form.phone }}) — {{ form.email }}
                    </div>
                    <div *ngIf="form.message" style="margin-top: 0.4rem; font-size: 0.85rem; color: #475569; font-style: italic;">
                      "{{ form.message }}"
                    </div>
                  </div>
                  <button type="button" class="btn-edit-recap" (click)="goToStep(6)" title="Modifier les coordonnées">
                    <i class="fas fa-edit me-1"></i> Modifier
                  </button>
                </div>
              </div>

              <!-- Footer Étape 7 -->
              <div class="wizard-actions">
                <button type="button" class="btn-secondary-kiki" style="padding: 0.85rem 1.6rem;" (click)="prevStep()">
                  <i class="fas fa-chevron-left me-2"></i> PRÉCÉDENT
                </button>
                <button type="button" class="btn-red-pill" style="padding: 0.95rem 2.4rem; font-size: 1.05rem; background: linear-gradient(135deg, #B91C1C 0%, #7A1C1C 100%);" (click)="onSubmit()">
                  <i class="fas fa-paper-plane me-2"></i> ENVOYER MA DEMANDE DE DEVIS
                </button>
              </div>
            </div>

          </div>

          <!-- ENGAGEMENT & DEVIS SUR MESURE PANEL (Right Column) -->
          <div class="contact-info-panel animate-fade delay-1">
            <div>
              <span class="slbl">Un Service Sur Mesure</span>
              <h3 style="font-size: 1.5rem; color: var(--primary-dark); margin-bottom: 1rem; font-family: var(--font-heading);">Notre Engagement d'Excellence</h3>
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

    /* LAYOUT PRINCIPAL DE LA PAGE DEVIS - AUCUN DÉBORDEMENT ET COMPACT */
    .devis-section-padding {
      padding: 1.5rem 0 3rem;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 2rem;
      align-items: start; /* ÉVITE AU FORMULAIRE DE S'ÉTIRE EN HAUTEUR ET DE LAISSER DU VIDE */
    }
    .contact-form-panel {
      background: var(--bg-white, #FFFFFF);
      border: 1px solid var(--border-color, #E2E8F0);
      border-radius: 20px;
      padding: 1.5rem 2rem;
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
      width: 100%;
      box-sizing: border-box;
    }
    .contact-info-panel {
      background: var(--bg-secondary, #FDFBF7);
      border: 1px solid var(--border-color, #EBE4D5);
      border-radius: 20px;
      padding: 1.75rem 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
    }
    .wizard-step-header {
      text-align: center;
      margin-bottom: 1.15rem;
    }
    .wizard-step-header h2 {
      font-size: 1.5rem;
      font-weight: 900;
      color: var(--primary-dark);
      margin-bottom: 0.2rem;
      font-family: var(--font-heading);
    }
    .wizard-step-header p {
      color: var(--text-muted);
      font-size: 0.88rem;
      font-style: italic;
      margin: 0;
    }

    /* EN-TÊTE COMPACT EXCLUSIF À LA VUE MOBILE - CACHÉ SUR DESKTOP */
    .mobile-step-header {
      display: none;
      text-align: center;
      margin-bottom: 1.25rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color, #E2E8F0);
    }
    .mobile-step-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(220, 38, 38, 0.08);
      color: #DC2626;
      padding: 0.4rem 1.1rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    .mobile-step-title {
      font-family: var(--font-heading);
      font-size: 1.35rem;
      font-weight: 800;
      color: #1E293B;
      line-height: 1.3;
    }

    @media (max-width: 991px) {
      .wizard-stepper {
        display: none !important; /* On cache complètement le stepper horizontal à boules en vue mobile ! */
      }
      .mobile-step-header {
        display: block !important; /* On affiche uniquement l'icône et le nom de l'étape en cours ! */
      }
      .wizard-step-header {
        display: none !important; /* On masque le sous-titre redondant dans chaque étape pour ne garder que l'en-tête mobile épuré */
      }
      .contact-grid {
        grid-template-columns: 1fr !important;
        gap: 1.25rem !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      .contact-info-panel {
        display: none !important;
      }
      .contact-form-panel {
        padding: 1.15rem 1rem !important;
        border-radius: 14px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        overflow-x: hidden !important;
      }
      .cat-tabs-grid,
      .lieu-grid-3,
      .cuisine-grid,
      .form-group-row {
        grid-template-columns: 1fr !important;
        gap: 0.75rem !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        margin-bottom: 1rem !important;
      }
      .cat-card-item,
      .lieu-card-item,
      .cuisine-card {
        display: flex !important;
        align-items: center !important;
        text-align: left !important;
        padding: 0.85rem 1rem !important;
        gap: 1rem !important;
        border-radius: 12px !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      .cat-card-item .icon-circle,
      .lieu-card-item i,
      .cuisine-card i {
        margin: 0 !important;
        width: 42px !important;
        height: 42px !important;
        flex-shrink: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .cat-card-item i,
      .lieu-card-item i,
      .cuisine-card i {
        font-size: 1.25rem !important;
      }
      .cat-title,
      .lieu-title,
      .cuisine-card .cuisine-name {
        font-size: 1.05rem !important;
        margin-bottom: 0.1rem !important;
      }
      .cat-sub,
      .lieu-sub,
      .cuisine-card .cuisine-sub {
        font-size: 0.78rem !important;
      }
      .prestations-grid-3x2 {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.65rem !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .prestation-card-img {
        padding: 0.75rem 0.5rem !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .wizard-actions {
        flex-direction: row !important;
        justify-content: space-between !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .btn-secondary-kiki, .btn-red-pill {
        padding: 0.75rem 1.15rem !important;
        font-size: 0.82rem !important;
        white-space: nowrap !important;
      }
      .page-hero {
        padding: 1.25rem 0 !important;
      }
      .page-hero h1 {
        font-size: 1.5rem !important;
        margin-bottom: 0.2rem !important;
      }
    }

    .wizard-stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      overflow-x: auto;
    }
    .step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      user-select: none;
      flex-shrink: 0;
    }
    .step-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #F1F5F9;
      color: #94A3B8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    .step-item.active .step-circle {
      background: #DC2626;
      color: #FFF;
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
    }
    .step-item.completed .step-circle {
      background: #7A1C1C;
      color: #FFF;
    }
    .step-label {
      font-weight: 700;
      font-size: 0.72rem;
      color: #94A3B8;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      transition: color 0.3s;
    }
    .step-item.active .step-label {
      color: #7A1C1C;
      font-weight: 800;
    }
    .step-line {
      flex: 1;
      height: 2px;
      background: #E2E8F0;
      margin: 0 0.5rem;
      transition: background 0.3s;
      min-width: 15px;
    }
    .step-line.active {
      background: #DC2626;
    }

    /* STEP 1: PROFIL CARDS */
    .cat-tabs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .cat-card-item {
      border: 2px solid #E2E8F0;
      border-radius: 16px;
      padding: 1.5rem 1.25rem;
      text-align: center;
      cursor: pointer;
      background: var(--bg-white);
      transition: all 0.25s ease;
    }
    .cat-card-item:hover {
      border-color: #DC2626;
      transform: translateY(-3px);
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06);
    }
    .cat-card-item.active {
      border-color: #DC2626;
      background: rgba(220, 38, 38, 0.03);
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
    }
    .icon-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #F8FAFC;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 0.65rem;
      transition: all 0.3s ease;
    }
    .cat-card-item.active .icon-circle {
      background: #DC2626;
    }
    .cat-card-item.active .icon-circle i {
      color: #FFFFFF;
    }
    .cat-card-item i {
      font-size: 1.35rem;
      color: #475569;
    }
    .cat-title {
      font-family: var(--font-heading);
      font-size: 1.15rem;
      font-weight: 700;
      color: #1E293B;
      margin-bottom: 0.25rem;
    }
    .cat-sub {
      font-size: 0.8rem;
      color: #64748B;
    }

    @media (max-width: 768px) {
      .cat-tabs-grid {
        grid-template-columns: 1fr !important;
        gap: 0.75rem !important;
        margin-bottom: 1rem !important;
      }
      .cat-card-item {
        display: flex !important;
        align-items: center !important;
        text-align: left !important;
        padding: 0.85rem 1rem !important;
        gap: 1rem !important;
        border-radius: 12px !important;
      }
      .cat-card-item .icon-circle {
        margin: 0 !important;
        width: 42px !important;
        height: 42px !important;
        flex-shrink: 0 !important;
      }
      .cat-card-item i {
        font-size: 1.15rem !important;
      }
      .cat-title {
        font-size: 1.05rem !important;
        margin-bottom: 0.1rem !important;
      }
      .cat-sub {
        font-size: 0.78rem !important;
      }
    }

    /* STEP 2: PRESTATION 3x2 GRID */
    .prestations-grid-3x2 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.25rem;
    }
    @media (max-width: 768px) {
      .prestations-grid-3x2 {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.65rem !important;
        margin-bottom: 1rem !important;
      }
    }
    .prestation-card-img {
      border: 2px solid #E2E8F0;
      border-radius: 12px;
      padding: 0.85rem 0.6rem;
      text-align: center;
      cursor: pointer;
      background: var(--bg-white);
      transition: all 0.25s ease;
    }
    .prestation-card-img:hover {
      border-color: #DC2626;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.06);
    }
    .prestation-card-img.active {
      border-color: #DC2626;
      background: rgba(220, 38, 38, 0.04);
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
    }
    .prestation-card-img .icon-box {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #F1F5F9;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 0.4rem;
      font-size: 1.15rem;
      color: #475569;
      transition: all 0.3s;
    }
    .prestation-card-img.active .icon-box {
      background: #DC2626;
      color: #FFFFFF;
    }
    .prest-name {
      font-weight: 700;
      color: #1E293B;
      font-size: 0.88rem;
    }
    @media (max-width: 768px) {
      .prestation-card-img {
        padding: 0.7rem 0.4rem !important;
      }
      .prestation-card-img .icon-box {
        width: 36px !important;
        height: 36px !important;
        margin-bottom: 0.35rem !important;
        font-size: 1.1rem !important;
      }
      .prest-name {
        font-size: 0.82rem !important;
      }
    }

    /* STEP 4: LIEU GRID */
    .lieu-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 1.25rem;
    }
    .lieu-card-item {
      border: 2px solid #E2E8F0;
      border-radius: 14px;
      padding: 1.15rem 1rem;
      text-align: center;
      cursor: pointer;
      background: var(--bg-white);
      transition: all 0.25s ease;
    }
    .lieu-card-item:hover {
      border-color: #DC2626;
      transform: translateY(-2px);
    }
    .lieu-card-item.active {
      border-color: #DC2626;
      background: rgba(220, 38, 38, 0.04);
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
    }
    .lieu-card-item i {
      font-size: 1.35rem;
      color: #7A1C1C;
      margin-bottom: 0.35rem;
      display: block;
    }
    .lieu-title {
      font-weight: 700;
      color: #1E293B;
      font-size: 0.95rem;
    }
    .lieu-sub {
      font-size: 0.78rem;
      color: #64748B;
    }
    @media (max-width: 768px) {
      .lieu-grid-3 {
        grid-template-columns: 1fr !important;
        gap: 0.65rem !important;
        margin-bottom: 1rem !important;
      }
      .lieu-card-item {
        display: flex !important;
        align-items: center !important;
        text-align: left !important;
        padding: 0.75rem 1rem !important;
        gap: 1rem !important;
        border-radius: 12px !important;
      }
      .lieu-card-item i {
        margin-bottom: 0 !important;
        font-size: 1.25rem !important;
        flex-shrink: 0 !important;
      }
      .lieu-title {
        font-size: 0.98rem !important;
        margin-bottom: 0.1rem !important;
      }
    }

    /* STEP 5: CUISINE GRID */
    .cuisine-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.25rem;
    }
    .cuisine-card {
      border: 2px solid #E2E8F0;
      border-radius: 14px;
      padding: 1.15rem 1rem;
      text-align: center;
      cursor: pointer;
      background: var(--bg-white);
      transition: all 0.25s ease;
    }
    .cuisine-card:hover {
      border-color: #DC2626;
      transform: translateY(-2px);
    }
    .cuisine-card.active {
      border-color: #DC2626;
      background: rgba(220, 38, 38, 0.04);
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
    }
    .cuisine-card i {
      font-size: 1.35rem;
      color: #7A1C1C;
      margin-bottom: 0.35rem;
      display: block;
    }
    .cuisine-card .cuisine-name {
      font-weight: 700;
      color: #1E293B;
      font-size: 0.95rem;
      margin-bottom: 0.15rem;
    }
    .cuisine-card .cuisine-sub {
      font-size: 0.78rem;
      color: #64748B;
    }
    @media (max-width: 768px) {
      .cuisine-grid {
        grid-template-columns: 1fr !important;
        gap: 0.65rem !important;
        margin-bottom: 1rem !important;
      }
      .cuisine-card {
        display: flex !important;
        align-items: center !important;
        text-align: left !important;
        padding: 0.75rem 1rem !important;
        gap: 1rem !important;
        border-radius: 12px !important;
      }
      .cuisine-card i {
        margin-bottom: 0 !important;
        font-size: 1.25rem !important;
        flex-shrink: 0 !important;
      }
      .cuisine-card .cuisine-name {
        font-size: 0.98rem !important;
        margin-bottom: 0.1rem !important;
      }
    }

    /* STEP 7: RECAPITULATIF CARDS */
    .recap-box {
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 1.15rem 1.25rem;
      background: var(--bg-white);
      box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05);
    }
    .recap-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #F1F5F9;
    }
    .recap-label {
      color: #64748B;
      font-weight: 600;
      font-size: 0.82rem;
      display: block;
      margin-bottom: 0.15rem;
    }
    .recap-value {
      color: #1E293B;
      font-weight: 700;
      font-size: 0.92rem;
    }
    .btn-edit-recap {
      background: #F1F5F9;
      color: #475569;
      border: 1px solid #E2E8F0;
      border-radius: 20px;
      padding: 0.35rem 0.8rem;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-edit-recap:hover {
      background: #E2E8F0;
      color: #7A1C1C;
      border-color: #CBD5E1;
    }

    /* BUTTONS & FORM GROUPS RESPONSIVE */
    .form-group-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 600px) {
      .form-group-row {
        grid-template-columns: 1fr !important;
        gap: 0.75rem !important;
      }
      .form-group {
        margin-bottom: 0.85rem !important;
      }
    }
    .wizard-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    @media (max-width: 480px) {
      .wizard-actions {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }
      .btn-secondary-kiki, .btn-red-pill {
        padding: 0.7rem 1.15rem !important;
        font-size: 0.82rem !important;
        white-space: nowrap !important;
      }
    }
    .btn-secondary-kiki {
      background: #F8FAFC;
      color: #334155;
      border: 1.5px solid #CBD5E1;
      padding: 0.8rem 1.8rem;
      border-radius: 50px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-secondary-kiki:hover {
      background: #E2E8F0;
      color: #0F172A;
    }
    .btn-red-pill {
      background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
      color: #FFFFFF;
      border: none;
      padding: 0.85rem 2.2rem;
      border-radius: 50px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3);
      transition: all 0.3s ease;
    }
    .btn-red-pill:hover:not([disabled]) {
      background: linear-gradient(135deg, #B91C1C 0%, #7F1D1D 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(220, 38, 38, 0.4);
    }
    .btn-red-pill[disabled] {
      background: #CBD5E1;
      cursor: not-allowed;
      box-shadow: none;
    }
    .form-group-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1.5px solid #CBD5E1;
      border-radius: 10px;
      font-size: 0.95rem;
      transition: border-color 0.2s;
    }
    .form-control:focus {
      border-color: #DC2626;
      outline: none;
    }

    /* ===== DARK MODE OVERRIDES (BULLETPROOF ANGULAR ENCAPSULATION) ===== */
    :host-context([data-theme="dark"]) .contact-form-panel {
      background: #0A0A0A !important;
      border-color: #262626 !important;
      color: #FFFFFF !important;
    }
    :host-context([data-theme="dark"]) .contact-info-panel {
      background: #0D0D0D !important;
      border-color: #262626 !important;
    }
    :host-context([data-theme="dark"]) .cat-card-item,
    :host-context([data-theme="dark"]) .prestation-card-img,
    :host-context([data-theme="dark"]) .lieu-card-item,
    :host-context([data-theme="dark"]) .cuisine-card,
    :host-context([data-theme="dark"]) .recap-box {
      background: #141414 !important;
      border-color: #262626 !important;
      color: #FFFFFF !important;
    }
    :host-context([data-theme="dark"]) .cat-card-item.active,
    :host-context([data-theme="dark"]) .prestation-card-img.active,
    :host-context([data-theme="dark"]) .lieu-card-item.active,
    :host-context([data-theme="dark"]) .cuisine-card.active {
      background: rgba(229, 29, 36, 0.15) !important;
      border-color: #E51D24 !important;
      box-shadow: 0 0 0 3px rgba(229, 29, 36, 0.25) !important;
    }
    :host-context([data-theme="dark"]) .wizard-step-header h2,
    :host-context([data-theme="dark"]) .cat-title,
    :host-context([data-theme="dark"]) .prest-name,
    :host-context([data-theme="dark"]) .lieu-title,
    :host-context([data-theme="dark"]) .cuisine-card .cuisine-name,
    :host-context([data-theme="dark"]) .recap-value,
    :host-context([data-theme="dark"]) .mobile-step-title,
    :host-context([data-theme="dark"]) label {
      color: #FFFFFF !important;
    }
    :host-context([data-theme="dark"]) .wizard-step-header p,
    :host-context([data-theme="dark"]) .cat-sub,
    :host-context([data-theme="dark"]) .lieu-sub,
    :host-context([data-theme="dark"]) .cuisine-card .cuisine-sub,
    :host-context([data-theme="dark"]) .recap-label {
      color: #A3A3A3 !important;
    }
    :host-context([data-theme="dark"]) .cat-card-item i,
    :host-context([data-theme="dark"]) .prestation-card-img .icon-box,
    :host-context([data-theme="dark"]) .lieu-card-item i,
    :host-context([data-theme="dark"]) .cuisine-card i {
      color: #FFFFFF !important;
      background: #262626 !important;
    }
    :host-context([data-theme="dark"]) .icon-circle {
      background: #262626 !important;
    }
    :host-context([data-theme="dark"]) .step-circle {
      background: #141414 !important;
      color: #A3A3A3 !important;
    }
    :host-context([data-theme="dark"]) .step-label {
      color: #A3A3A3 !important;
    }
    :host-context([data-theme="dark"]) .step-line {
      background: #262626 !important;
    }
    :host-context([data-theme="dark"]) .recap-row {
      border-color: #262626 !important;
    }
    :host-context([data-theme="dark"]) .btn-edit-recap,
    :host-context([data-theme="dark"]) .btn-secondary-kiki {
      background: #1C1C1C !important;
      color: #FFFFFF !important;
      border-color: #333333 !important;
    }
    :host-context([data-theme="dark"]) .form-control {
      background: #141414 !important;
      color: #FFFFFF !important;
      border-color: #2D2D2D !important;
    }
    :host-context([data-theme="dark"]) .mobile-step-header {
      border-color: #262626 !important;
    }
    :host-context([data-theme="dark"]) .mobile-step-badge {
      background: rgba(229, 29, 36, 0.2) !important;
      color: #F03C42 !important;
    }
  `]
})
export class DevisComponent implements OnInit {
  currentStep = 1;

  form = {
    clientType: 'particulier',
    organization: '',
    prestationId: 'restauration-entreprise',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: 50,
    locationType: 'salle-diva',
    locationDetails: 'Salle La Diva, Dakar',
    cuisine: 'classique',
    cuisineAutre: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  };

  prestationsList = [
    { id: 'restauration-entreprise', label: 'Restauration d\'Entreprise', icon: 'fa-briefcase' },
    { id: 'restauration-evenementielle', label: 'Restauration Événementielle', icon: 'fa-glass-cheers' },
    { id: 'salle-diva', label: 'Salle La Diva', icon: 'fa-hotel' },
    { id: 'scenographie', label: 'Scénographie & Décoration', icon: 'fa-paint-brush' },
    { id: 'location', label: 'Location de Matériel', icon: 'fa-box-open' },
    { id: 'takeaway', label: 'Plats à Emporter', icon: 'fa-shopping-bag' }
  ];

  cuisineList = [
    { id: 'classique', label: 'Classique Gourmet', sub: 'Tradition & Excellence', icon: 'fa-heart' },
    { id: 'moderne', label: 'Créativité Moderne', sub: 'Innovation & Fusion', icon: 'fa-wand-magic-sparkles' },
    { id: 'haute-couture', label: 'Collection Haute Couture', sub: 'Prestige & Rareté', icon: 'fa-crown' },
    { id: 'autre', label: 'Autre', sub: 'À préciser', icon: 'fa-pen' }
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

  selectLocationType(type: string, label: string): void {
    this.form.locationType = type;
    if (type === 'salle-diva') {
      this.form.locationDetails = 'Salle La Diva, Dakar';
    } else if (type === 'exception') {
      this.form.locationDetails = 'Villa prestige';
    } else {
      this.form.locationDetails = '';
    }
  }

  getLocationDisplay(): string {
    if (this.form.locationType === 'salle-diva') return 'Salle La Diva, Dakar';
    if (this.form.locationType === 'exception') return `Lieu d'Exception (${this.form.locationDetails || 'Villa prestige'})`;
    return `Autre : ${this.form.locationDetails || 'À définir'}`;
  }

  getPrestationLabel(id: string): string {
    const found = this.prestationsList.find(p => p.id === id);
    return found ? found.label : 'Restauration Événementielle';
  }

  getCuisineLabel(id: string): string {
    if (id === 'autre') {
      return this.form.cuisineAutre.trim() || 'Autre (à préciser)';
    }
    const found = this.cuisineList.find(c => c.id === id);
    return found ? found.label : 'Classique Gourmet';
  }

  isStep1Valid(): boolean {
    if (this.form.clientType === 'entreprise' && !this.form.organization.trim()) {
      return false;
    }
    return true;
  }

  isStep2Valid(): boolean {
    return !!this.form.prestationId;
  }

  isStep3Valid(): boolean {
    return !!(this.form.date && this.form.time && this.form.guests >= 10);
  }

  isStep4Valid(): boolean {
    if ((this.form.locationType === 'exception' || this.form.locationType === 'autre') && !this.form.locationDetails.trim()) {
      return false;
    }
    return !!this.form.locationType;
  }

  isStep5Valid(): boolean {
    if (this.form.cuisine === 'autre' && !this.form.cuisineAutre.trim()) {
      return false;
    }
    return !!this.form.cuisine;
  }

  isStep6Valid(): boolean {
    return !!(
      this.form.name.trim() &&
      this.form.phone.trim() &&
      this.form.email.trim()
    );
  }

  goToStep(step: number): void {
    if (step <= this.currentStep || step === 1) {
      this.currentStep = step;
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.isStep1Valid()) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.isStep2Valid()) {
      this.currentStep = 3;
    } else if (this.currentStep === 3 && this.isStep3Valid()) {
      this.currentStep = 4;
    } else if (this.currentStep === 4 && this.isStep4Valid()) {
      this.currentStep = 5;
    } else if (this.currentStep === 5 && this.isStep5Valid()) {
      this.currentStep = 6;
    } else if (this.currentStep === 6 && this.isStep6Valid()) {
      this.currentStep = 7;
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  }

  getStepIcon(step: number): string {
    switch(step) {
      case 1: return 'fa-user';
      case 2: return 'fa-concierge-bell';
      case 3: return 'fa-calendar-alt';
      case 4: return 'fa-map-marker-alt';
      case 5: return 'fa-utensils';
      case 6: return 'fa-phone-alt';
      case 7: return 'fa-clipboard-check';
      default: return 'fa-check';
    }
  }

  getStepName(step: number): string {
    switch(step) {
      case 1: return 'PROFIL';
      case 2: return 'PRESTATION';
      case 3: return 'DATE & CONVIVES';
      case 4: return 'LIEU';
      case 5: return 'CUISINE';
      case 6: return 'CONTACT';
      case 7: return 'RÉCAPITULATIF';
      default: return 'DEVIS';
    }
  }

  getStepSubtitle(step: number): string {
    switch(step) {
      case 1: return 'Qui êtes-vous ?';
      case 2: return 'Quelle prestation ?';
      case 3: return 'Date & Convives';
      case 4: return 'Lieu de l\'événement';
      case 5: return 'Signature gastronomique';
      case 6: return 'Vos coordonnées';
      case 7: return 'Vérification finale';
      default: return 'Demande de devis';
    }
  }

  getStepTitle(step: number): string {
    switch(step) {
      case 1: return 'Profil (Qui êtes-vous ?)';
      case 2: return 'Prestation souhaitée';
      case 3: return 'Date & Convives';
      case 4: return 'Lieu de l\'événement';
      case 5: return 'Signature gastronomique';
      case 6: return 'Vos coordonnées';
      case 7: return 'Récapitulatif de votre demande';
      default: return 'Demande de devis';
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
      message: `${this.getLocationDisplay()} | Cuisine: ${this.getCuisineLabel(this.form.cuisine)} | ${this.form.message}`
    });

    this.dataService.showToast('Votre demande de devis a été envoyée avec succès ! Notre équipe commerciale va vous recontacter.');
    this.currentStep = 1;
    this.form = {
      clientType: 'particulier',
      organization: '',
      prestationId: 'restauration-entreprise',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      guests: 50,
      locationType: 'salle-diva',
      locationDetails: 'Salle La Diva, Dakar',
      cuisine: 'classique',
      cuisineAutre: '',
      name: '',
      phone: '',
      email: '',
      message: ''
    };
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }
}
