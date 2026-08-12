import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Page Hero -->
    <section class="page-hero" style="background: #fff; padding: 6rem 0 3rem; text-align: center;">
      <div class="container">
        <h1 style="font-size: 3.5rem; text-shadow: none; font-weight: 900; color: var(--primary-dark); font-family: var(--font-heading); margin-bottom: 1rem;">Notre Maison &amp; Histoire</h1>
        <div class="page-hero-path" style="color: #666; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Accueil &nbsp;&gt;&nbsp; À Propos</div>
      </div>
    </section>

    <!-- Notre Histoire & Video -->
    <section class="section-padding" style="background-color: var(--bg-primary);">
      <div class="container about-grid" style="align-items: center;">
        <div class="animate-fade">
          <span class="slbl" style="display: inline-block; padding: 0.3rem 1rem; background: rgba(114,21,19,0.1); color: var(--primary-dark); border-radius: 20px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; margin-bottom: 1rem;">Notre Histoire</span>
          <h2 class="history-title" style="font-size: 2.3rem; font-weight: 900; margin-bottom: 1.5rem; color: var(--primary-dark);">30 Ans d'Expertise au Service de la Gastronomie Sénégalaise</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 1.05rem; line-height: 1.7;">Créée en 1997 par <strong>Mme Christiane Lopez Diaw</strong> sous la forme d’une entreprise individuelle, Kiki Traiteur a rapidement prospéré grâce à sa passion et son exigence. L'entreprise s'est transformée en Société à Responsabilité Limitée (SARL) en 2008 pour répondre à une expansion spectaculaire.</p>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.7;">Aujourd’hui, nous sommes l'acteur majeur de la restauration commerciale hors foyer au Sénégal. Grâce à notre site de production de 1500 m² à Hann Maristes et à plus de 150 collaborateurs passionnés, nous assurons une production quotidienne d'excellence pour plus de <strong>2500 couverts par jour</strong>.</p>
        </div>

        <!-- SLIDER SPOT VIDÉO -->
        <div class="animate-fade delay-1">
          <div class="video-slider-card hover-lift" style="position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); background: #000; border: 4px solid #fff;">
            <video [src]="videoSpots[currentSpotIndex].videoUrl"
              autoplay loop muted playsinline
              class="spot-video"
              style="width: 100%; height: 450px; object-fit: cover; display: block; transition: opacity 0.5s ease;">
            </video>
            
            <div class="video-overlay" style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%); padding: 2rem 1.5rem 1.5rem; color: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                  <h4 style="font-size: 1.4rem; font-weight: 700; margin: 0; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">{{ videoSpots[currentSpotIndex].title }}</h4>
                  <p style="margin: 0.5rem 0 0; font-size: 0.95rem; color: rgba(255,255,255,0.9);">{{ videoSpots[currentSpotIndex].subtitle }}</p>
                </div>
                <div class="slider-arrows" style="display: flex; gap: 0.6rem;">
                  <button (click)="prevVideo()" class="glass-btn"><i class="fas fa-chevron-left"></i></button>
                  <button (click)="nextVideo()" class="glass-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre Mission (Cards) -->
    <section class="section-padding" style="background-color: var(--bg-secondary); position: relative; overflow: hidden;">
      <div class="container">
        <div class="section-header animate-fade" style="text-align: center;">
          <span class="slbl" style="display: inline-block; padding: 0.3rem 1rem; background: #fff; color: var(--primary-dark); border-radius: 20px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; margin-bottom: 1rem; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">Notre Mission</span>
          <h2 style="font-size: 2.8rem; color: var(--text-dark); font-weight: 900; margin-bottom: 1rem;">Au cœur de vos <span>Événements</span></h2>
          <div class="sline" style="margin: 0 auto;"></div>
        </div>

        <div class="cards-grid animate-fade delay-1" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); margin-top: 4rem;">
          <div class="premium-card">
            <div class="card-icon" style="color: var(--primary-color);"><i class="fas fa-camera-retro"></i></div>
            <h3>Créateur de Souvenirs</h3>
            <p>Nous transformons chaque repas en un moment mémorable, gravant des souvenirs impérissables dans l'esprit de vos convives.</p>
          </div>
          
          <div class="premium-card" style="transform: translateY(-20px);">
            <div class="card-icon" style="color: var(--primary-dark);"><i class="fas fa-utensils"></i></div>
            <h3>Excellence Culinaire</h3>
            <p>Nous mettons l'art culinaire au service de l'événementiel, offrant une symphonie de saveurs raffinées et innovantes.</p>
          </div>
          
          <div class="premium-card">
            <div class="card-icon heart-icon" style="color: var(--accent-color);"><i class="fas fa-heart"></i></div>
            <h3>Présent au Quotidien</h3>
            <p>Être présent dans le quotidien des Sénégalais, en apportant chaleur, convivialité et qualité à chaque instant partagé.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos Valeurs (Animation Poêle) -->
    <section class="section-padding values-section" style="position: relative; background: url('assets/images/KIKI TRAITEUR Logo animé Beige.png') center/cover fixed; padding: 4rem 0;">
      <div style="position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(250, 248, 245, 0.85); z-index: 1;"></div>
      <div class="container" style="position: relative; z-index: 2;">
        <h2 style="text-align: center; font-size: 2.5rem; font-weight: 900; margin-bottom: 2rem; color: var(--primary-dark) !important; font-family: var(--font-heading);">Les Valeurs qui nous Animent</h2>
        
        <div class="smoke-container" style="position: relative; height: 450px; width: 100%; display: flex; justify-content: center; align-items: flex-end; overflow: hidden; max-width: 800px; margin: 0 auto;">
          
          <!-- Arrière de la poêle (z-index: 1) -->
          <div class="pan-back" style="position: absolute; bottom: -10px; z-index: 1; transform: scale(1.2); transform-origin: bottom center; pointer-events: none;">
            <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
              <!-- Manche -->
              <rect x="280" y="65" width="110" height="22" rx="10" fill="#2a2a2a" transform="rotate(-15 280 65)"/>
              <rect x="290" y="70" width="80" height="8" rx="4" fill="#111" transform="rotate(-15 280 65)"/>
              <circle cx="375" cy="50" r="4" fill="#555" />
              
              <!-- Contour Supérieur (Rim) -->
              <ellipse cx="170" cy="80" rx="120" ry="28" fill="#3a3a3a"/>
              <!-- Fond intérieur -->
              <ellipse cx="170" cy="85" rx="105" ry="20" fill="#151515"/>
              
              <!-- Reflet intérieur -->
              <path d="M 80 85 C 80 95, 260 95, 260 85" fill="none" stroke="#2a2a2a" stroke-width="4"/>
            </svg>
          </div>
          
          <!-- Fumée (z-index: 2) -->
          <div class="smoke-values" style="position: relative; z-index: 2; width: 100%; height: 100%;">
            <div *ngFor="let val of valeurs; let i = index" 
                 class="smoke-pill" 
                 [style.animation-delay]="(i * 1.5) + 's'">
              <i class="fas fa-star" style="color: var(--primary-color); font-size: 0.9rem;"></i>
              {{ val }}
            </div>
          </div>

          <!-- Avant de la poêle (z-index: 3) -->
          <div class="pan-front" style="position: absolute; bottom: -10px; z-index: 3; transform: scale(1.2); transform-origin: bottom center; pointer-events: none;">
            <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
              <!-- Corps de la poêle (moitié avant) -->
              <path d="M 50 80 C 50 170, 290 170, 290 80 Z" fill="#222"/>
              <!-- Courbe du bord avant pour cacher proprement la base de la fumée -->
              <path d="M 50 80 A 120 28 0 0 0 290 80" fill="none" stroke="#3a3a3a" stroke-width="2"/>
            </svg>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Le Triptyque Fondamental (Hover-Lift Cards) -->
    <section class="section-padding" style="background-color: var(--bg-primary);">
      <div class="container">
        <div class="section-header animate-fade">
          <span class="slbl">Nos Piliers</span>
          <h2>Le Triptyque <span>Fondamental</span></h2>
          <div class="sline"></div>
          <p style="color: var(--text-muted); max-width: 650px; margin: 1rem 0 3rem 0;">Notre succès repose sur trois principes non négociables.</p>
        </div>

        <div class="cards-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
          <div class="triptych-card animate-fade">
            <div class="t-number">01</div>
            <h3>Qualité Irréprochable</h3>
            <p>Le choix rigoureux des ingrédients frais, l'application stricte des normes HACCP et le savoir-faire de nos chefs expérimentés garantissent l'excellence.</p>
          </div>

          <div class="triptych-card animate-fade delay-1">
            <div class="t-number">02</div>
            <h3>Respect des Engagements</h3>
            <p>Une fiabilité reconnue. Nous tenons nos promesses en termes de qualité, de délais et de respect des budgets, assurant la confiance absolue de nos partenaires.</p>
          </div>

          <div class="triptych-card animate-fade delay-2">
            <div class="t-number">03</div>
            <h3>Satisfaction Client</h3>
            <p>Nous nous adaptons aux besoins spécifiques de chaque client avec des solutions sur mesure, du simple déjeuner d'entreprise au grand dîner de gala.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Accessibilité & Vision (Interactive Grid) -->
    <section class="section-padding vision-section" style="position: relative; background: url('assets/images/KIKI TRAITEUR Logo animé Beige.png') center/cover fixed;">
      <div class="vision-overlay" style="position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(250, 248, 245, 0.85); z-index: 1;"></div>
      <div class="container" style="position: relative; z-index: 2;">
        <div class="section-header animate-fade" style="text-align: center; margin-bottom: 4rem;">
          <h2 style="font-size: 2.2rem; color: var(--primary-dark); font-family: var(--font-heading); font-weight: 800; margin-bottom: 0.5rem;">Accessibilité &amp; Vision</h2>
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
            <div style="width: 40px; height: 2px; background-color: var(--primary-color);"></div>
            <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #e0d5c1;"></div>
            <div style="width: 40px; height: 2px; background-color: var(--primary-color);"></div>
          </div>
        </div>

        <div class="vision-grid animate-fade delay-1" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem;">
          <div class="vision-card">
            <h4>Affirmation</h4>
            <div class="v-line"></div>
            <p>S'affirmer comme le choix évident de la haute gastronomie.</p>
          </div>
          <div class="vision-card">
            <h4>Innovation</h4>
            <div class="v-line"></div>
            <p>Repousser sans cesse les limites de l'art culinaire.</p>
          </div>
          <div class="vision-card">
            <h4>Réinvention</h4>
            <div class="v-line"></div>
            <p>Se moderniser tout en gardant l'authenticité de notre signature.</p>
          </div>
          <div class="vision-card">
            <h4>Constance</h4>
            <div class="v-line"></div>
            <p>Maintenir un niveau d'excellence absolu, jour après jour.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ÉQUIPE DE DIRECTION (Fond Logo) -->
    <section class="section-padding team-section" style="position: relative; background: url('assets/images/KIKI TRAITEUR Logo animé [Récupéré].png') center/cover fixed;">
      <div class="team-overlay" style="position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(255,255,255,0.92); z-index: 1;"></div>
      <div class="container" style="position: relative; z-index: 2;">
        <div class="section-header animate-fade" style="text-align: center;">
          <span class="slbl">L'Équipe</span>
          <h2 style="font-size: 2.5rem; color: var(--primary-dark); font-weight: 900; margin-bottom: 1rem;">Les visages de <span>l'Excellence</span></h2>
          <div class="sline" style="margin: 0 auto;"></div>
        </div>

        <div class="team-slider-wrapper" style="position: relative; margin-top: 4rem;">
          <div #teamTrack class="team-track" style="display: flex; gap: 2rem; overflow-x: auto; scroll-behavior: smooth; scroll-snap-type: x mandatory; padding: 1rem 0 3rem; scrollbar-width: none; -ms-overflow-style: none;">
            <div class="team-card premium-team-card" *ngFor="let member of extendedTeam">
              <div class="team-inner">
                <img [src]="member.image" [alt]="member.name">
                <div class="team-glass-content">
                  <h3>{{ member.name }}</h3>
                  <p class="role">{{ member.role }}</p>
                  <p class="desc">{{ member.desc }}</p>
                  <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
                    <span class="team-tag-btn">{{ member.tag }} <i class="fas fa-plus" style="margin-left: 4px; font-size: 0.8rem;"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Flèches de navigation -->
          <button (click)="scrollTeam(teamTrack, -1)" class="glass-btn team-prev-btn"><i class="fas fa-chevron-left"></i></button>
          <button (click)="scrollTeam(teamTrack, 1)" class="glass-btn team-next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </section>

    <!-- Infrastructure & Logistique -->
    <section class="section-padding infra-section" style="background: linear-gradient(135deg, var(--bg-secondary) 0%, #fff 100%);">
      <div class="container">
        <div class="infra-box animate-fade">
          <div class="infra-content">
            <span class="slbl">Nos Moyens</span>
            <h2>Infrastructures & <span>Logistique</span></h2>
            <p>Notre site de production principal de <strong>1500 m² à Hann Maristes</strong> nous confère une autonomie totale et une flexibilité remarquable pour des événements de grande envergure.</p>
            
            <ul class="infra-list">
              <li><i class="fas fa-fire-burner"></i> <span>Deux cuisines entièrement équipées (chaude et froide)</span></li>
              <li><i class="fas fa-snowflake"></i> <span>4 chambres froides et armoires de maintien en température</span></li>
              <li><i class="fas fa-bolt"></i> <span>Groupe électrogène 110 KVA et 20m³ de réserves d'eau</span></li>
              <li><i class="fas fa-truck"></i> <span>Parc logistique complet (camions frigorifiques, scooters, fourgonnettes)</span></li>
              <li><i class="fas fa-glass-cheers"></i> <span>Salle de réception "La Diva" de plus de 400 places</span></li>
            </ul>
          </div>
          <div class="infra-image">
            <img src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800" alt="Nos cuisines" style="width: 100%; height: 100%; object-fit: cover; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    :host { display: block; overflow-x: hidden; }

    .hover-lift {
      transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
    }
    .hover-lift:hover {
      transform: translateY(-10px);
      box-shadow: 0 25px 50px rgba(0,0,0,0.15);
    }

    .glass-btn {
      width: 40px; height: 40px; 
      border-radius: 50%; 
      border: 1px solid rgba(255,255,255,0.4); 
      background: rgba(255,255,255,0.1); 
      backdrop-filter: blur(5px);
      color: #fff; cursor: pointer; 
      display: flex; align-items: center; justify-content: center; 
      transition: all 0.3s;
    }
    .glass-btn:hover { background: rgba(255,255,255,0.3); transform: scale(1.05); }

    .premium-card {
      background: #fff;
      border-radius: 24px;
      padding: 3rem 2rem;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      border: 1px solid rgba(0,0,0,0.02);
      transition: all 0.4s ease;
    }
    .premium-card:hover {
      transform: translateY(-15px) !important;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      border-color: rgba(114,21,19,0.1);
    }
    .card-icon {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      opacity: 0.9;
    }
    .premium-card h3 {
      font-size: 1.5rem; color: var(--text-dark); font-weight: 800; margin-bottom: 1rem;
    }
    .premium-card p {
      color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;
    }

    /* Animation Poêle (Smoke) */
    .smoke-pill {
      position: absolute;
      bottom: 80px; /* Commence juste au-dessus du fond de la poêle */
      left: 50%; /* centré par rapport à la div globale */
      transform: translateX(-50%) scale(0);
      opacity: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(114, 21, 19, 0.15);
      padding: 0.8rem 1.8rem;
      border-radius: 50px;
      font-size: 1.2rem;
      font-weight: 700;
      color: #111 !important;
      white-space: nowrap;
      animation: smokeRise 16.5s infinite linear;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      text-transform: uppercase;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    @keyframes smokeRise {
      0% { opacity: 0; transform: translate(calc(-50% - 15px), 0) scale(0.5); }
      5% { opacity: 1; transform: translate(calc(-50% - 40px), -60px) scale(0.9); }
      15% { opacity: 1; transform: translate(calc(-50% + 40px), -150px) scale(1.05); }
      30% { opacity: 1; transform: translate(calc(-50% - 30px), -250px) scale(1.15); }
      45% { opacity: 0; transform: translate(calc(-50% + 30px), -360px) scale(1.3); }
      100% { opacity: 0; transform: translate(-50%, -450px) scale(1.3); }
    }

    /* Triptych */
    .triptych-card {
      background: #fff;
      padding: 2.5rem;
      border-radius: 16px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(0,0,0,0.03);
      border-left: 4px solid var(--primary-color);
      transition: all 0.4s ease;
      z-index: 1;
    }
    .triptych-card::before {
      content: '';
      position: absolute; top:0; left:0; width: 100%; height: 100%;
      background: var(--primary-color);
      z-index: -1;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }
    .t-number {
      font-size: 4rem; font-weight: 900; color: rgba(114,21,19,0.08);
      position: absolute; top: 10px; right: 20px;
      transition: color 0.4s;
    }
    .triptych-card h3 { font-size: 1.4rem; color: var(--primary-dark); margin-bottom: 1rem; font-weight: 800; transition: color 0.4s; }
    .triptych-card p { color: var(--text-muted); line-height: 1.6; transition: color 0.4s; margin: 0; }
    
    .triptych-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .triptych-card:hover::before { transform: scaleX(1); }
    .triptych-card:hover .t-number { color: rgba(255,255,255,0.2); }
    .triptych-card:hover h3, .triptych-card:hover p { color: #fff; }

    /* Vision Grid */
    .vision-card {
      background: #fff; border-radius: 24px; padding: 2.5rem 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.04);
      border: none;
      transition: all 0.3s;
    }
    .vision-card:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
    .vision-card h4 { font-family: var(--font-heading); font-size: 1.5rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 0.8rem; }
    .v-line { width: 40px; height: 2px; background: #e0d5c1; margin-bottom: 1.5rem; transition: width 0.3s; }
    .vision-card:hover .v-line { width: 60px; }
    .vision-card p { color: #555; font-size: 0.95rem; line-height: 1.7; margin:0; }

    /* Slider Track */
    .team-track::-webkit-scrollbar { display: none; }

    /* Premium Team (Style Glassmorphism Image 1) */
    .premium-team-card {
      padding: 10px;
      background: #fff;
      border-radius: 36px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.08);
      min-width: 320px;
      height: 480px;
      scroll-snap-align: center;
      flex: 0 0 auto;
      transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .premium-team-card:hover { 
      transform: translateY(-15px) scale(1.02); 
      box-shadow: 0 30px 60px rgba(0,0,0,0.15);
    }
    .team-inner {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 26px;
      overflow: hidden;
      background: #eee;
    }
    .team-inner img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .premium-team-card:hover .team-inner img {
      transform: scale(1.1);
    }
    .team-glass-content {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      padding: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.4);
      text-align: left;
      transition: all 0.5s ease;
    }
    .premium-team-card:hover .team-glass-content {
      background: rgba(255, 255, 255, 0.9);
      padding-bottom: 2rem;
    }
    .team-glass-content h3 { font-size: 1.35rem; color: #111; margin: 0 0 0.2rem; font-weight: 800; display: flex; align-items: center; }
    .team-glass-content .role { color: var(--primary-dark); font-size: 0.85rem; font-weight: 800; margin: 0 0 0.8rem; }
    .team-glass-content .desc { color: #333; font-size: 0.95rem; line-height: 1.5; margin: 0; }
    .team-tag-btn {
      background: #fff;
      color: var(--text-dark);
      font-weight: 700;
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      display: inline-block;
      transition: all 0.3s;
    }
    .premium-team-card:hover .team-tag-btn {
      background: var(--primary-dark);
      color: #fff;
    }

    /* Infrastructure Box */
    .infra-box {
      display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
      background: #fff; border-radius: 30px; padding: 3rem;
      box-shadow: 0 15px 40px rgba(0,0,0,0.05);
    }
    @media (max-width: 991px) { .infra-box { grid-template-columns: 1fr; gap: 2rem; padding: 2rem; } }
    .infra-content h2 { font-size: 2.5rem; color: var(--text-dark); font-weight: 900; margin-bottom: 1.5rem; }
    .infra-content p { color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem; }
    .infra-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
    .infra-list li { display: flex; align-items: center; gap: 15px; font-size: 0.95rem; color: var(--text-dark); font-weight: 500; }
    .infra-list li i { width: 40px; height: 40px; border-radius: 50%; background: rgba(114,21,19,0.1); color: var(--primary-color); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
    
    /* Dark Mode (Inversion Blanc/Noir) géré par l'application (bouton du site) */
    :host-context([data-theme="dark"]) .page-hero,
    :host-context([data-theme="dark"]) .premium-card,
    :host-context([data-theme="dark"]) .triptych-card,
    :host-context([data-theme="dark"]) .vision-card,
    :host-context([data-theme="dark"]) .premium-team-card,
    :host-context([data-theme="dark"]) .infra-box {
      background-color: #1a1a1a !important;
      border-color: rgba(255,255,255,0.05) !important;
    }
    /* Forcer le maintien des couleurs d'origine (outrepasse les CSS globaux éventuels) */
    :host-context([data-theme="dark"]) .history-title {
      color: var(--primary-dark) !important;
    }
    :host-context([data-theme="dark"]) .values-section {
      background-color: #721513 !important;
    }
    :host-context([data-theme="dark"]) .heart-icon,
    :host-context([data-theme="dark"]) .heart-icon i {
      color: #e0d5c1 !important;
    }

    /* Inversion des textes noirs en blanc */
    :host-context([data-theme="dark"]) h2[style*="var(--text-dark)"],
    :host-context([data-theme="dark"]) .section-header h2,
    :host-context([data-theme="dark"]) .premium-card h3,
    :host-context([data-theme="dark"]) .infra-box h2,
    :host-context([data-theme="dark"]) .team-glass-content h3 {
      color: #fff !important;
    }
    
    /* Ne pas toucher aux h2 qui sont rouges ! */
    :host-context([data-theme="dark"]) .section-header h2[style*="var(--primary-dark)"] {
      color: var(--primary-dark) !important;
    }

    /* Inversion des textes gris/noirs secondaires en gris clair */
    :host-context([data-theme="dark"]) p[style*="var(--text-muted)"],
    :host-context([data-theme="dark"]) .page-hero-path,
    :host-context([data-theme="dark"]) .premium-card p,
    :host-context([data-theme="dark"]) .triptych-card p,
    :host-context([data-theme="dark"]) .vision-card p,
    :host-context([data-theme="dark"]) .infra-box p,
    :host-context([data-theme="dark"]) .team-glass-content .desc,
    :host-context([data-theme="dark"]) .infra-list li {
      color: #ddd !important;
    }
    
    /* Inversion des petits labels blancs */
    :host-context([data-theme="dark"]) .slbl[style*="background: #fff"] {
      background: #2a2a2a !important;
    }
    
    /* Inversion du dégradé blanc de la section Infra */
    :host-context([data-theme="dark"]) .infra-section {
      background: linear-gradient(135deg, var(--bg-secondary) 0%, #1a1a1a 100%) !important;
    }
    :host-context([data-theme="dark"]) .team-glass-content {
      background: rgba(20, 20, 20, 0.75) !important;
      border-top: 1px solid rgba(255,255,255,0.1) !important;
    }
    :host-context([data-theme="dark"]) .vision-section {
      background-image: url('/assets/images/KIKI%20TRAITEUR%20Logo%20anim%C3%A9%20%5BR%C3%A9cup%C3%A9r%C3%A9%5D.png') !important;
    }
    :host-context([data-theme="dark"]) .vision-overlay {
      background: rgba(20, 20, 20, 0.88) !important;
    }
    :host-context([data-theme="dark"]) .team-overlay {
      background: rgba(20, 20, 20, 0.90) !important;
    }
    :host-context([data-theme="dark"]) .team-tag-btn {
      background: #333 !important;
      color: #fff !important;
    }
    :host-context([data-theme="dark"]) .premium-team-card:hover .team-glass-content {
      background: rgba(30, 30, 30, 0.9) !important;
    }
    :host-context([data-theme="dark"]) .premium-team-card:hover .team-tag-btn {
      background: var(--primary-color) !important;
    }

    /* Flèches slider équipe */
    .team-prev-btn { position: absolute; left: -25px; top: 45%; transform: translateY(-50%); z-index: 10; background: var(--primary-dark); color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); border: none; }
    .team-next-btn { position: absolute; right: -25px; top: 45%; transform: translateY(-50%); z-index: 10; background: var(--primary-dark); color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); border: none; }

    /* MEDIA QUERIES RESPONSIVITÉ MOBILE */
    @media (max-width: 768px) {
      /* Section Valeurs (Poêle) */
      .smoke-container { height: 320px !important; }
      .pan-back, .pan-front { transform: scale(0.7) !important; bottom: 0px !important; }
      .smoke-pill { font-size: 0.9rem !important; padding: 0.5rem 1rem !important; }

      /* Section Équipe */
      .premium-team-card { min-width: 260px; height: 420px; }
      .team-prev-btn { left: 10px; width: 35px; height: 35px; }
      .team-next-btn { right: 10px; width: 35px; height: 35px; }
      .team-track { gap: 1rem !important; padding: 1rem 1rem 3rem !important; }
      .team-glass-content h3 { font-size: 1.2rem; }
    }
    `
  ]
})
export class AboutComponent implements OnInit, OnDestroy {
  currentSpotIndex = 0;
  private autoSlideInterval: any;

  valeurs = [
    'Savoir-faire', 'Expérience', 'Notoriété', 'Professionnalisme', 
    'Convivialité', 'Loyauté', 'Fiabilité', 'Longévité', 
    'Compétence', 'Excellence', 'Restauration'
  ];

  videoSpots = [
    {
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-in-a-kitchen-41006-large.mp4',
      title: 'L\'Art Culinaire & Brigade de Cuisine',
      subtitle: 'Dans les coulisses de notre laboratoire gastronomique de Hann Maristes.'
    },
    {
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-serving-dinner-at-a-restaurant-41014-large.mp4',
      title: 'Réceptions & Mariages à La Diva',
      subtitle: 'L\'excellence du service et l\'élégance des tables dressées par Kiki Traiteur.'
    },
    {
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waiter-serving-champagne-glasses-41010-large.mp4',
      title: 'Banquets Institutionnels & Cocktails',
      subtitle: 'Un savoir-faire reconnu par les plus grandes institutions du Sénégal depuis 1997.'
    }
  ];

  directionTeam = [
    {
      name: 'Mme Christiane Lopez Diaw',
      role: 'Gérante (43 ans d\'expérience)',
      tag: 'Direction',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600',
      desc: 'Visionnaire de l\'excellence, elle guide Kiki Traiteur vers les sommets du prestige.'
    },
    {
      name: 'Docteur Ignace Coly',
      role: 'Resp. Hygiène et Qualité',
      tag: 'Qualité',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600',
      desc: 'Il veille à l\'application rigoureuse des principes HACCP à chaque étape.'
    },
    {
      name: 'Chef Amadou Ndiaye',
      role: 'Chef de Cuisine',
      tag: 'Gastronomie',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600',
      desc: 'Il dirige notre brigade culinaire avec rigueur pour garantir nos standards d\'excellence.'
    },
    {
      name: 'Mr Daniel Diop',
      role: 'Directeur d\'Exploitation',
      tag: 'Opérations',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600',
      desc: 'Il orchestre notre capacité opérationnelle, gérant la logistique complexe avec brio.'
    }
  ];

  extendedTeam: any[] = [];
  private teamAutoSlideInterval: any;
  private readonly CARD_WIDTH = 352; // 320px width + 32px gap
  private readonly SET_SIZE = 4; // Nombre de membres par set

  ngOnInit() {
    // On duplique largement pour la boucle infinie fluide
    this.extendedTeam = [
      ...this.directionTeam, 
      ...this.directionTeam, 
      ...this.directionTeam, 
      ...this.directionTeam, 
      ...this.directionTeam
    ];
    
    if (typeof window !== 'undefined') {
      this.autoSlideInterval = setInterval(() => {
        this.nextVideo();
      }, 5000);
      
      this.teamAutoSlideInterval = setInterval(() => {
        const track = document.querySelector('.team-track') as HTMLElement;
        if (track) {
          const setWidth = this.CARD_WIDTH * this.SET_SIZE;
          
          // Si on a dépassé le premier set, on recule silencieusement
          if (track.scrollLeft >= setWidth) {
            track.style.scrollBehavior = 'auto'; // Instantané
            track.scrollLeft = track.scrollLeft - setWidth;
            
            // On lance le scroll smooth juste après
            setTimeout(() => {
              track.style.scrollBehavior = 'smooth';
              track.scrollLeft += this.CARD_WIDTH;
            }, 50);
          } else {
            track.scrollBy({ left: this.CARD_WIDTH, behavior: 'smooth' });
          }
        }
      }, 3500);
    }
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    if (this.teamAutoSlideInterval) {
      clearInterval(this.teamAutoSlideInterval);
    }
  }

  scrollTeam(track: HTMLElement, direction: number) {
    const setWidth = this.CARD_WIDTH * this.SET_SIZE;
    
    if (direction < 0 && track.scrollLeft <= 0) {
      // Reculer à partir du début : on avance silencieusement avant de reculer
      track.style.scrollBehavior = 'auto';
      track.scrollLeft += setWidth;
      setTimeout(() => {
        track.style.scrollBehavior = 'smooth';
        track.scrollLeft -= this.CARD_WIDTH;
      }, 50);
      return;
    }
    
    if (direction > 0 && track.scrollLeft >= setWidth * 2) {
      // Avancer très loin : on recule silencieusement avant d'avancer
      track.style.scrollBehavior = 'auto';
      track.scrollLeft -= setWidth;
      setTimeout(() => {
        track.style.scrollBehavior = 'smooth';
        track.scrollLeft += this.CARD_WIDTH;
      }, 50);
      return;
    }

    track.style.scrollBehavior = 'smooth';
    track.scrollLeft += direction * this.CARD_WIDTH;
  }

  nextVideo() {
    this.currentSpotIndex = (this.currentSpotIndex + 1) % this.videoSpots.length;
  }

  prevVideo() {
    this.currentSpotIndex = (this.currentSpotIndex - 1 + this.videoSpots.length) % this.videoSpots.length;
  }

  goToVideo(index: number) {
    this.currentSpotIndex = index;
  }
}
