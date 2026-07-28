import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KikiDataService } from '../services/kiki-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- HERO SECTION -->
    <section class="hero pattern-hero bg-parallax">
      <div class="hbgtxt">TRAITEUR</div>
      <div class="container hero-grid">
        <div class="hero-content animate-fade">
          <h1>La Poésie des Saveurs & <span>l'Art Culinaire</span></h1>
          <p class="hero-desc">Une expérience gastronomique inégalée depuis 1997. Kiki Traiteur orchestre vos réceptions
            privées et professionnelles et met à votre disposition la prestigieuse salle La Diva.</p>

          <div class="hero-actions">
            <a routerLink="/prestations" class="btn-red"><i class="fas fa-utensils"></i>Nos Prestations</a>
            <a href="https://www.youtube.com/watch?v=RXv_uIN6e-Y" class="btn-play popup-youtube"
              (click)="onPlayVideo($event)">
              <div class="pico"><i class="fas fa-play"></i></div>
              <span>Regarder Notre Histoire</span>
            </a>
          </div>

          <div class="hstats">
            <div class="hstat">
              <span class="snum">25<em>+</em></span>
              <small>Ans d'expérience</small>
            </div>
            <div class="sdiv"></div>
            <div class="hstat">
              <span class="snum">500<em>+</em></span>
              <small>Événements gérés</small>
            </div>
            <div class="sdiv"></div>
            <div class="hstat">
              <span class="snum">250</span>
              <small>Capacité La Diva</small>
            </div>
            <div class="sdiv"></div>
            <div class="hstat">
              <span class="snum">100%</span>
              <small>Fait Maison</small>
            </div>
          </div>
        </div>

        <!-- Floating Circle Hero Image (Sarab style) -->
        <div class="hero-media animate-fade delay-1">
          <div style="position:relative; text-align:center;">
            <div class="hcircle">
              <img src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800"
                alt="Gastronomie Kiki Traiteur">
            </div>

            <div class="fcard fc1">
              <div class="fcoi r"><i class="fas fa-fire"></i></div>
              <div>
                <span class="fcnum">Salle La Diva</span>
                <span class="fcsm">Espace de réception exclusif</span>
              </div>
            </div>

            <div class="fcard fc2">
              <div class="fcoi y"><i class="fas fa-star"></i></div>
              <div>
                <span class="fcnum">4.9/5 Avis</span>
                <span class="fcsm">Plus de 2k+ avis positifs</span>
              </div>
            </div>

            <div class="fcard fc3">
              <div class="steam-pan-wrapper"
                style="margin: 0; margin-right: 0.75rem; display: flex; align-items: center; justify-content: center; position: relative; width: 45px; height: 45px; background: rgba(56, 125, 34, 0.1); border-radius: 50%;">
                <div class="steam-cloud" style="top: -6px;">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="steam-pan-icon"
                  style="font-size: 1.4rem; color: #387D22; animation: pan-bounce 3s infinite ease-in-out;">
                  <i class="fa-solid fa-bowl-food"></i>
                </div>
              </div>
              <div>
                <span class="fcnum">Fait Maison</span>
                <span class="fcsm">Produits frais & locaux</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ROLLING MARQUEE (Sarab Ticker Style) -->
    <div class="mqsec">
      <div class="mqtrack">
        <div class="mqitem"><i class="fas fa-circle"></i>Restauration d'Entreprise</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Restauration Événementielle</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Salle de Réception La Diva</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Plats à Emporter</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Scénographie & Décors de Tables</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Location de Matériel & Tentes</div>

        <div class="mqitem"><i class="fas fa-circle"></i>Restauration d'Entreprise</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Restauration Événementielle</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Salle de Réception La Diva</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Plats à Emporter</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Scénographie & Décors de Tables</div>
        <div class="mqitem"><i class="fas fa-circle"></i>Location de Matériel & Tentes</div>
      </div>
    </div>

    <!-- ABOUT PREVIEW SECTION -->
    <section class="section-padding" style="background-color: var(--bg-secondary);">
      <div class="container about-grid">
        <div class="animate-fade" style="position: relative;">
          <div class="hero-frame" style="border-radius: var(--border-radius-xl); overflow:hidden; box-shadow: var(--shadow-lg); background: #000;">
            <video src="https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-in-a-kitchen-41006-large.mp4"
              autoplay loop muted playsinline
              style="width:100%; height:420px; object-fit:cover; display:block;">
            </video>
          </div>
        </div>
        <div class="animate-fade delay-1">
          <span class="slbl">Notre Histoire</span>
          <h2
            style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--primary-dark); margin-bottom: 1.5rem;">
            Une expérience gastronomique inégalée depuis 1997</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size:1.05rem;">Dirigée par <strong>Mme
              Christiane Lopez Diaw</strong>, Kiki Traiteur est une entreprise sénégalaise spécialisée en restauration
            d’entreprise et événementielle.</p>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">Avec plus de 25 ans d’expertise culinaire, nous
            proposons une cuisine raffinée et des produits frais de qualité. Notre engagement se traduit par des
            expériences gastronomiques uniques, mêlant saveurs authentiques et créativité. Personnalisant chaque événement
            selon les besoins, notre équipe met l’accent sur les détails et un service clientèle de premier ordre.</p>
          <a routerLink="/a-propos" class="btn-accent">Découvrir notre histoire</a>
        </div>
      </div>
    </section>

    <!-- CLIENTS DE CONFIANCE SECTION -->
    <section class="section-padding clients-section-bg">
      <div class="container" style="position: relative; z-index: 2;">
        <div class="section-header animate-fade" style="text-align: center;">
          <span class="slbl" style="color: #FFFFFF; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; font-size: 0.9rem;">Ils nous font confiance</span>
          <h2 style="font-size: 2.5rem; color: #fff; margin-bottom: 1.5rem; margin-top: 1rem; font-weight: 900; text-shadow: 0 2px 8px rgba(0,0,0,0.15);">Des institutions prestigieuses & clients de renom</h2>
          <div class="sline" style="background: rgba(255, 255, 255, 0.4); height: 3px;"></div>
        </div>

        <div class="clients-grid animate-fade delay-1" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem; margin-top: 4rem; align-items: center;">
          
          <div class="client-card animate-fade">
            <div style="min-width: 90px; flex-shrink: 0;">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYHcfvSND2RnyBQ7HAEpPhHnOgLYAv1CkZtI9kCj1vw&s=10" alt="Sonatel" style="width: 90px; height: 90px; object-fit: contain; background: rgba(255, 255, 255, 0.95); padding: 10px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            </div>
            <div>
              <h3 style="font-size: 1.4rem; font-weight: 900; margin-bottom: 0.5rem; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,0.2);">SONATEL</h3>
              <p style="color: rgba(255, 255, 255, 0.95); font-size: 0.95rem; line-height: 1.6; font-weight: 500;">Partenaire institutionnel majeur pour la haute restauration d'affaires</p>
            </div>
          </div>

          <div class="client-card animate-fade">
            <div style="min-width: 90px; flex-shrink: 0;">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0S8i_6PP9r-u5jmt8xanVHaxhwyTV17OUlNFzz27OPw&s=10" alt="Groupe ISM" style="width: 90px; height: 90px; object-fit: contain; background: rgba(255, 255, 255, 0.95); padding: 10px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            </div>
            <div>
              <h3 style="font-size: 1.4rem; font-weight: 900; margin-bottom: 0.5rem; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,0.2);">GROUPE ISM</h3>
              <p style="color: rgba(255, 255, 255, 0.95); font-size: 0.95rem; line-height: 1.6; font-weight: 500;">Partenaire académique d'excellence pour nos événements de prestige</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- CATEGORIES FILTER SECTION -->
    <section class="section-padding">
      <div class="container">
        <div class="section-header animate-fade">
          <span class="slbl">Notre Catalogue</span>
          <h2>Explorez nos <span>Prestations</span></h2>
          <div class="sline"></div>
          <p class="sdesc">De la restauration d'entreprise de prestige aux mariages d'exception, découvrez notre univers
            culinaire.</p>
        </div>

        <div class="cat-tabs animate-fade">
          <div class="catcard" [class.active]="selectedCat === 'all'" (click)="filterCat('all')">
            <div class="catnm">Toutes nos prestations</div>
            <div class="catct">5</div>
          </div>
          <div class="catcard" [class.active]="selectedCat === 'corporate'" (click)="filterCat('corporate')">
            <div class="catnm">Restauration d'Entreprise</div>
            <div class="catct">1</div>
          </div>
          <div class="catcard" [class.active]="selectedCat === 'events'" (click)="filterCat('events')">
            <div class="catnm">Restauration Événementielle</div>
            <div class="catct">1</div>
          </div>
          <div class="catcard" [class.active]="selectedCat === 'diva'" (click)="filterCat('diva')">
            <div class="catnm">Salle La Diva</div>
            <div class="catct">1</div>
          </div>
          <div class="catcard" [class.active]="selectedCat === 'takeaway'" (click)="filterCat('takeaway')">
            <div class="catnm">Plats à Emporter</div>
            <div class="catct">1</div>
          </div>
          <div class="catcard" [class.active]="selectedCat === 'foodtruck'" (click)="filterCat('foodtruck')">
            <div class="catnm">Food Truck Gourmet</div>
            <div class="catct">1</div>
          </div>
        </div>

        <!-- Prestations Cards Grid -->
        <div class="cards-grid animate-fade delay-1" id="prestations-grid">

          <div class="card" *ngIf="isShown('corporate')">
            <div class="card-img-wrapper">
              <img src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800"
                alt="Restauration d'Entreprise" class="card-img">
            </div>
            <div class="card-content">
              <h3 class="card-title">Restauration d'Entreprise</h3>
              <p class="card-desc">Catering quotidien et repas d'affaires pour les institutions les plus prestigieuses du
                Sénégal. Formules adaptées à vos collaborateurs.</p>
            </div>
          </div>

          <div class="card" *ngIf="isShown('events')">
            <div class="card-img-wrapper">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800"
                alt="Restauration Événementielle" class="card-img">
            </div>
            <div class="card-content">
              <h3 class="card-title">Restauration Événementielle</h3>
              <p class="card-desc">Mariages, dîners de gala, cocktails dînatoires et séminaires. Une signature culinaire
                sur-mesure pour tous vos moments importants.</p>
            </div>
          </div>

          <div class="card" *ngIf="isShown('diva')">
            <div class="card-img-wrapper">
              <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800" alt="Salle La Diva"
                class="card-img">
            </div>
            <div class="card-content">
              <h3 class="card-title">Salle La Diva</h3>
              <p class="card-desc">Notre salle de réception privée majestueuse. Formules combinées salle + traiteur tout
                inclus pour des réceptions d'exception.</p>
            </div>
          </div>

          <div class="card" *ngIf="isShown('takeaway')">
            <div class="card-img-wrapper" style="position: relative;">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800" alt="Plats à Emporter"
                class="card-img">
              <div class="steam-pan-wrapper"
                style="position: absolute; bottom: 12px; right: 12px; background: rgba(255,255,255,0.92); padding: 8px; border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); margin: 0;">
                <div class="steam-cloud" style="top: -8px;">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="steam-pan-icon"
                  style="font-size: 1.25rem; color: var(--primary-color); animation: pan-bounce 3s infinite ease-in-out;">
                  <i class="fa-solid fa-mug-hot"></i>
                </div>
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">Plats à Emporter</h3>
              <p class="card-desc">Savourez la gastronomie de Kiki Traiteur chez vous ou au bureau. Une sélection de plats
                raffinés préparés chaque jour à emporter.</p>
            </div>
          </div>

          <div class="card" *ngIf="isShown('foodtruck')">
            <div class="card-img-wrapper">
              <img src="https://images.unsplash.com/photo-1565123409695-7b5ff624d177?q=80&w=800" alt="Food Truck Gourmet"
                class="card-img">
            </div>
            <div class="card-content">
              <h3 class="card-title">Food Truck Gourmet</h3>
              <p class="card-desc">Une cuisine mobile festive et conviviale pour vos événements décontractés, festivals et
                retours de noces.</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- CARROUSEL NOS RÉALISATIONS SECTION -->
    <section class="section-padding" style="background-color: var(--bg-primary);">
      <div class="container">
        <div class="section-header animate-fade">
          <span class="slbl">Portfolio d'Exception</span>
          <h2>Nos <span>Réalisations</span></h2>
          <div class="sline"></div>
          <p class="sdesc">Découvrez en images nos réceptions institutionnelles et mariages prestigieux organisés à Dakar et partout au Sénégal.</p>
        </div>

        <div class="animate-fade delay-1" style="position: relative; border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-lg); height: 460px;">
          <div class="realisations-track" [style.transform]="'translateX(-' + (currentRealisation * 100) + '%)'" style="display: flex; height: 100%; transition: transform 0.5s ease-in-out;">
            
            <div class="realisation-slide" *ngFor="let slide of realisationSlides" style="min-width: 100%; height: 100%; position: relative;">
              <img [src]="slide.image" [alt]="slide.title" style="width: 100%; height: 100%; object-fit: cover;">
              <div class="realisation-overlay" style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(0deg, rgba(20,20,20,0.95) 0%, rgba(114,21,19,0.75) 50%, transparent 100%); padding: 3rem 2.5rem 2rem; color: #fff;">
                <span style="background: var(--primary-color); color: #fff; font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.9rem; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 0.8rem;">{{ slide.category }}</span>
                <h3 style="font-size: 1.9rem; font-weight: 900; margin: 0 0 0.5rem; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.4);">{{ slide.title }}</h3>
                <p style="font-size: 1rem; color: rgba(255,255,255,0.9); max-width: 650px; margin: 0 0 1rem;">{{ slide.description }}</p>
                <div style="display: flex; gap: 1.5rem; align-items: center; font-size: 0.85rem; color: #FFD700;">
                  <span><i class="fas fa-users me-1"></i> {{ slide.guests }}</span>
                  <span><i class="fas fa-map-marker-alt me-1"></i> {{ slide.location }}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Arrows -->
          <button (click)="prevRealisation()" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.4); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 5;"><i class="fas fa-chevron-left"></i></button>
          <button (click)="nextRealisation()" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.4); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 5;"><i class="fas fa-chevron-right"></i></button>

          <!-- Dots -->
          <div style="position: absolute; bottom: 15px; right: 25px; display: flex; gap: 8px; z-index: 5;">
            <span *ngFor="let slide of realisationSlides; let i = index"
              (click)="goToRealisation(i)"
              [style.background]="currentRealisation === i ? '#FFFFFF' : 'rgba(255,255,255,0.4)'"
              style="width: 32px; height: 4px; border-radius: 2px; cursor: pointer; transition: all 0.3s;">
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS SECTION (Slider) -->
    <section class="section-padding testimonials">
      <div class="container">
        <div class="section-header animate-fade">
          <span class="slbl">Témoignages</span>
          <h2>Ce que disent nos <span>Clients</span></h2>
          <div class="sline"></div>
        </div>

        <div class="testimonials-slider-container animate-fade delay-1">
          <div class="testimonials-track" [style.transform]="'translateX(-' + (currentTestimonial * 100) + '%)'">

            <div class="testimonial-slide" *ngFor="let item of testimonials; let i = index">
              <div class="testimonial-card">
                <div style="color: var(--primary-color); font-size: 2rem; margin-bottom: 1rem; opacity: 0.25;"><i class="fas fa-quote-left"></i></div>
                <p class="testimonial-quote" style="font-style:italic; color: var(--text-dark); margin-bottom: 1.5rem; line-height: 1.8;">"{{ item.quote }}"</p>
                <div style="color:#f5a623; margin-bottom: 0.75rem; font-size: 0.9rem;"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                <div class="testimonial-author" style="display: flex; gap: 0.75rem; align-items: center;">
                  <div class="author-avatar" style="width:44px;height:44px;min-width:44px;border-radius:50%;background:var(--primary-gradient);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;">{{ item.initials }}</div>
                  <div class="author-info">
                    <h4 style="color:var(--primary-dark);font-weight:700;margin:0;font-size:0.95rem;">{{ item.author }}</h4>
                    <p style="color:var(--text-muted);font-size:0.82rem;margin:0;">{{ item.role }}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Navigation Controls -->
          <div class="slider-controls">
            <button class="slider-arrow" (click)="prevTestimonial()" aria-label="Précédent"><i class="fas fa-chevron-left"></i></button>
            <div class="slider-dots">
              <span class="slider-dot" *ngFor="let item of testimonials; let idx = index"
                [class.active]="currentTestimonial === idx" (click)="goToTestimonial(idx)"></span>
            </div>
            <button class="slider-arrow" (click)="nextTestimonial()" aria-label="Suivant"><i class="fas fa-chevron-right"></i></button>
          </div>

        </div>
      </div>
    </section>

    <!-- DIVA RESERVATION BANNER -->
    <section class="section-padding"
      style="background: linear-gradient(180deg, #FFFFFF 0%, #FAF8F4 100%); text-align: center; border-top: 1px solid var(--border-color);">
      <div class="container animate-fade">
        <span class="slbl">Salle La Diva</span>
        <h2 style="font-size: 2.5rem; font-weight:900; color:var(--primary-dark); margin-bottom: 1.5rem;">Préparez votre
          événement à la Salle La Diva</h2>
        <p style="color: var(--text-muted); max-width: 650px; margin: 0 auto 2.5rem auto;">Notre équipe commerciale vous
          contactera rapidement après avoir reçu votre demande de réservation pour la salle La Diva afin de planifier
          une visite et vous proposer une offre personnalisée.</p>
        <a routerLink="/devis" [queryParams]="{prestation: 'salle-diva'}" class="btn-red" style="font-size: 1.1rem; padding: 1rem 2.5rem;"><i class="fas fa-calendar-check me-2"></i> Réserver La Diva maintenant</a>
      </div>
    </section>
  `,
  styles: [
    `
    :host { display: block; }
    .clients-section-bg {
      background: linear-gradient(135deg, rgba(114, 21, 19, 0.82) 0%, rgba(85, 15, 14, 0.90) 100%),
        url('/assets/images/KIKI TRAITEUR Logo animé [Récupéré].png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      color: #fff;
      position: relative;
    }
    .client-card {
      border: 2px solid rgba(255, 255, 255, 0.35);
      border-radius: 20px;
      padding: 2.5rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
      transition: var(--transition-normal);
      display: flex;
      gap: 1.5rem;
      align-items: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }
    .client-card:hover {
      background: rgba(255, 255, 255, 0.22);
      border-color: rgba(255, 255, 255, 0.6);
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
    }
    `
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedCat = 'all';
  currentTestimonial = 0;
  private timer: any;

  testimonials = [
    {
      quote: "Très bonne organisation. Accueil très agréable. Ces gens savent vous mettre à l'aise lorsque vous avez des choix difficiles à faire. Bref, de vrais professionnels !",
      initials: 'YN',
      author: 'Yohann De Sa Nogueira',
      role: 'Client Événementiel'
    },
    {
      quote: "Très belle organisation. Un service impeccable et un personnel souriant et à l'écoute. Nous avons passé une excellente soirée où l'animation a été à la hauteur de l'événement. Je recommande vivement.",
      initials: 'NP',
      author: 'Nino Poungoura',
      role: "Dîner d'Entreprise"
    },
    {
      quote: "Idéale pour une réception de mariage. La salle, la décoration, le service, le repas... tout est inclus dans le forfait proposé. Le service est vraiment de qualité. Les restes sont remis aux mariés pour éviter le gaspillage !",
      initials: 'JN',
      author: 'JT Ndione',
      role: 'Mariage à la Salle La Diva'
    },
    {
      quote: "Service exceptionnel du début à la fin. Les plats étaient savoureux et présentés avec beaucoup d'élégance. Notre événement d'entreprise a été une réussite totale grâce à Kiki Traiteur. Nous reviendrons sans hésitation !",
      initials: 'AD',
      author: 'Aminata Diallo',
      role: 'Réception Corporative'
    }
  ];

  constructor(private dataService: KikiDataService) {}

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  filterCat(cat: string): void {
    this.selectedCat = cat;
  }

  isShown(cat: string): boolean {
    return this.selectedCat === 'all' || this.selectedCat === cat;
  }

  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number): void {
    this.currentTestimonial = index;
  }

  currentRealisation = 0;
  realisationSlides = [
    {
      title: "Dîner de Gala Prestige - SONATEL",
      category: "Restauration d'Entreprise",
      description: "Service protocolaire gastronomique et cocktail VIP pour 500 collaborateurs à la Salle La Diva.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200",
      guests: "500 invités",
      location: "Salle La Diva, Dakar"
    },
    {
      title: "Mariage Royal & Scénographie Florale",
      category: "Événementiel Privé",
      description: "Organisation complète, dîner assis raffiné et mise en lumière d'exception pour un mariage inoubliable.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200",
      guests: "300 convives",
      location: "Dakar, Sénégal"
    },
    {
      title: "Sommet Économique International",
      category: "Institutionnel",
      description: "Catering de haut niveau, buffets et pauses-café gourmandes pour délégations diplomatiques.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200",
      guests: "800 participants",
      location: "CICAD / Dakar"
    },
    {
      title: "Cocktails Dînatoires d'Entreprise",
      category: "Cocktail VIP",
      description: "Assortiment de verrines, canapés gastronomiques et animations culinaires en direct par notre brigade.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
      guests: "250 invités",
      location: "Plateau, Dakar"
    }
  ];

  nextRealisation(): void {
    this.currentRealisation = (this.currentRealisation + 1) % this.realisationSlides.length;
  }

  prevRealisation(): void {
    this.currentRealisation = (this.currentRealisation - 1 + this.realisationSlides.length) % this.realisationSlides.length;
  }

  goToRealisation(index: number): void {
    this.currentRealisation = index;
  }

  onPlayVideo(e: Event): void {
    e.preventDefault();
    this.dataService.showToast('Lecture vidéo simulée.');
  }
}
