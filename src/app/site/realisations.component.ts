import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realisations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>Nos Réalisations</h1>
        <div class="page-hero-path">Accueil &nbsp;&gt;&nbsp; Réalisations</div>
      </div>
    </section>

    <!-- CARROUSEL NOS RÉALISATIONS SECTION -->
    <section class="section-padding" style="background-color: var(--bg-primary); padding-bottom: 2rem;">
      <div class="container">
        <div class="section-header animate-fade" style="text-align: center;">
          <span class="slbl">Portfolio d'Exception</span>
          <h2>Carrousel de nos <span>Réalisations</span></h2>
          <div class="sline"></div>
          <p class="sdesc" style="max-width: 650px; margin: 0.5rem auto 2rem;">Revivez en images les événements institutionnels, mariages royaux et réceptions de prestige signés Kiki Traiteur.</p>
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

    <!-- Gallery Section -->
    <section class="section-padding" style="padding-top: 1rem;">
      <div class="container">
        
        <!-- Filter Tabs (Sarab style) -->
        <div class="cat-tabs animate-fade">
          <div class="catcard" [class.active]="selectedFilter === 'all'" (click)="setFilter('all')">
            <i class="fa-solid fa-layer-group"></i>
            <div class="catnm">Toutes</div>
          </div>
          <div class="catcard" [class.active]="selectedFilter === 'corporate'" (click)="setFilter('corporate')">
            <i class="fa-solid fa-briefcase"></i>
            <div class="catnm">Restauration d'Entreprise</div>
          </div>
          <div class="catcard" [class.active]="selectedFilter === 'diva'" (click)="setFilter('diva')">
            <i class="fa-solid fa-hotel"></i>
            <div class="catnm">Salle La Diva</div>
          </div>
          <div class="catcard" [class.active]="selectedFilter === 'takeaway'" (click)="setFilter('takeaway')">
            <i class="fa-solid fa-bag-shopping"></i>
            <div class="catnm">Plats à Emporter</div>
          </div>
          <div class="catcard" [class.active]="selectedFilter === 'foodtruck'" (click)="setFilter('foodtruck')">
            <i class="fa-solid fa-truck"></i>
            <div class="catnm">Food Truck Gourmet</div>
          </div>
          <div class="catcard" [class.active]="selectedFilter === 'events'" (click)="setFilter('events')">
            <i class="fa-solid fa-champagne-glasses"></i>
            <div class="catnm">Événements</div>
          </div>
          <div class="catcard" [class.active]="selectedFilter === 'dishes'" (click)="setFilter('dishes')">
            <i class="fa-solid fa-utensils"></i>
            <div class="catnm">Plats</div>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid animate-fade delay-1">
          <div class="gallery-item" *ngIf="isShown('corporate')" (click)="openLightbox('https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200', 'Dîner Corporate')">
            <img src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600" alt="Cocktail dînatoire d'entreprise">
            <div class="gallery-overlay">
              <h3>Dîner Corporate</h3>
              <p>Restauration d'Entreprise</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('diva')" (click)="openLightbox('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200', 'Soirée Saint-Sylvestre')">
            <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600" alt="Réception de gala dans la Salle Diva">
            <div class="gallery-overlay">
              <h3>Soirée Saint-Sylvestre</h3>
              <p>Salle La Diva</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('takeaway')" (click)="openLightbox('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200', 'Coffrets Gastronomiques')">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600" alt="Plats gourmets à emporter">
            <div class="gallery-overlay">
              <h3>Coffrets Gastronomiques</h3>
              <p>Plats à Emporter</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('foodtruck')" (click)="openLightbox('https://images.unsplash.com/photo-1565123409695-7b5ff624d177?q=80&w=1200', 'Animation Food Truck')">
            <img src="https://images.unsplash.com/photo-1565123409695-7b5ff624d177?q=80&w=600" alt="Food Truck Gourmet Kiki Traiteur">
            <div class="gallery-overlay">
              <h3>Animation Food Truck</h3>
              <p>Food Truck Gourmet</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('corporate')" (click)="openLightbox('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200', 'Cocktail Caritatif')">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600" alt="Amuse-bouches gastronomiques pour séminaire">
            <div class="gallery-overlay">
              <h3>Cocktail Caritatif</h3>
              <p>Restauration d'Entreprise</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('diva')" (click)="openLightbox('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200', 'Mariage Sophie & Marc')">
            <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600" alt="Mariage somptueux à La Diva">
            <div class="gallery-overlay">
              <h3>Mariage Sophie & Marc</h3>
              <p>Salle La Diva</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('takeaway')" (click)="openLightbox('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200', 'Plats du Jour Raffinés')">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600" alt="Assiette gastronomique prête à emporter">
            <div class="gallery-overlay">
              <h3>Plats du Jour Raffinés</h3>
              <p>Plats à Emporter</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('foodtruck')" (click)="openLightbox('https://images.unsplash.com/photo-1579618218290-00c5c36f5fbf?q=80&w=1200', 'Buffet Street Food Chic')">
            <img src="https://images.unsplash.com/photo-1579618218290-00c5c36f5fbf?q=80&w=600" alt="Burgers gourmets et verrines">
            <div class="gallery-overlay">
              <h3>Buffet Street Food Chic</h3>
              <p>Food Truck Gourmet</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('events')" (click)="openLightbox('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200', 'Mariage Royal de Prestige')">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600" alt="Mariage somptueux en plein air">
            <div class="gallery-overlay">
              <h3>Mariage Royal de Prestige</h3>
              <p>Événementiel</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('events')" (click)="openLightbox('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200', 'Gala Annuel de Charité')">
            <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600" alt="Gala dînatoire de charité">
            <div class="gallery-overlay">
              <h3>Gala Annuel de Charité</h3>
              <p>Événementiel</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('dishes')" (click)="openLightbox('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200', 'Homard Grillé Signature')">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600" alt="Homard grillé sauce gourmet">
            <div class="gallery-overlay">
              <h3>Homard Grillé Signature</h3>
              <p>Créations culinaires / Plats</p>
            </div>
          </div>

          <div class="gallery-item" *ngIf="isShown('dishes')" (click)="openLightbox('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200', 'Mignardises Sucrées d\\'Apparat')">
            <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600" alt="Assortiment de mignardises sucrées fines">
            <div class="gallery-overlay">
              <h3>Mignardises Sucrées d'Apparat</h3>
              <p>Douceurs sucrées / Plats</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Lightbox Modal -->
    <div class="lightbox" [class.active]="lightboxOpen" (click)="closeLightbox()">
      <button class="lightbox-close" (click)="closeLightbox()">&times;</button>
      <div class="lightbox-content" (click)="$event.stopPropagation()">
        <img [src]="lightboxImgSrc" [alt]="lightboxCaption" class="lightbox-img">
        <div class="lightbox-caption">{{ lightboxCaption }}</div>
      </div>
    </div>
  `,
  styles: [":host { display: block; }"]
})
export class RealisationsComponent {
  selectedFilter = 'all';
  lightboxOpen = false;
  lightboxImgSrc = '';
  lightboxCaption = '';

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

  setFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  isShown(category: string): boolean {
    return this.selectedFilter === 'all' || this.selectedFilter === category;
  }

  openLightbox(src: string, caption: string): void {
    this.lightboxImgSrc = src;
    this.lightboxCaption = caption;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }
}
