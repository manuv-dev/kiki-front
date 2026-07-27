import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>Notre Maison & Histoire</h1>
        <div class="page-hero-path">Accueil &nbsp;&gt;&nbsp; À Propos</div>
      </div>
    </section>

    <!-- Histoire (Mme Christiane Lopez Diaw) + Video Spot Slider -->
    <section class="section-padding">
      <div class="container about-grid">
        <div class="animate-fade">
          <span class="slbl">Notre Histoire</span>
          <h2 style="font-size: 2.3rem; font-weight: 900; margin-bottom: 1.5rem; color: var(--primary-dark);">Une expérience gastronomique inégalée depuis 1997</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 1.05rem;">Dirigée par <strong>Mme Christiane Lopez Diaw</strong>, Kiki Traiteur est une entreprise sénégalaise spécialisée en restauration d’entreprise et événementielle basée à Dakar (Hann Maristes).</p>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Avec plus de 25 ans d’expertise culinaire, nous proposons une cuisine raffinée et des produits frais de qualité. Notre engagement se traduit par des expériences gastronomiques uniques, mêlant saveurs authentiques et créativité.</p>
          <p style="color: var(--text-muted);">Personnalisant chaque événement selon les besoins, notre équipe met l’accent sur les détails et un service clientèle de premier ordre pour offrir des prestations d'exception.</p>
        </div>

        <!-- SLIDER SPOT VIDÉO -->
        <div class="animate-fade delay-1">
          <div class="video-slider-card" style="position: relative; border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-lg); background: #000;">
            <video [src]="videoSpots[currentSpotIndex].videoUrl"
              autoplay loop muted playsinline
              class="spot-video"
              style="width: 100%; height: 420px; object-fit: cover; display: block;">
            </video>
            
            <div class="video-overlay" style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(0deg, rgba(114,21,19,0.92) 0%, rgba(114,21,19,0.3) 70%, transparent 100%); padding: 2rem 1.5rem 1.5rem; color: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                  <span class="spot-badge" style="background: var(--primary-color); color: #fff; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; margin-bottom: 0.5rem;">Spot Vidéo #{{ currentSpotIndex + 1 }}</span>
                  <h4 style="font-size: 1.3rem; font-weight: 700; margin: 0; color: #fff;">{{ videoSpots[currentSpotIndex].title }}</h4>
                  <p style="margin: 0.3rem 0 0; font-size: 0.9rem; color: rgba(255,255,255,0.85);">{{ videoSpots[currentSpotIndex].subtitle }}</p>
                </div>
                <div class="slider-arrows" style="display: flex; gap: 0.6rem;">
                  <button (click)="prevVideo()" style="width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.4); background: rgba(0,0,0,0.4); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;"><i class="fas fa-chevron-left"></i></button>
                  <button (click)="nextVideo()" style="width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.4); background: rgba(0,0,0,0.4); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;"><i class="fas fa-chevron-right"></i></button>
                </div>
              </div>
              <div class="video-dots" style="display: flex; gap: 6px; margin-top: 1rem; justify-content: center;">
                <span *ngFor="let spot of videoSpots; let i = index"
                  (click)="goToVideo(i)"
                  [style.background]="currentSpotIndex === i ? '#FFFFFF' : 'rgba(255,255,255,0.4)'"
                  style="width: 28px; height: 4px; border-radius: 2px; cursor: pointer; transition: all 0.3s;">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ÉQUIPE DE DIRECTION SECTION (NEW) -->
    <section class="section-padding" style="background-color: var(--bg-primary); border-top: 1px solid var(--border-color);">
      <div class="container">
        <div class="section-header animate-fade" style="text-align: center;">
          <span class="slbl">L'Équipe de Direction</span>
          <h2 style="font-size: 2.5rem; color: var(--primary-dark); font-weight: 900; margin-bottom: 1rem;">Les visages de <span>l'Excellence</span></h2>
          <div class="sline"></div>
          <p style="color: var(--text-muted); max-width: 650px; margin: 1rem auto 3rem auto;">Une direction passionnée et rigoureuse qui veille à faire de chaque événement un chef-d'œuvre gastronomique.</p>
        </div>

        <div class="team-grid animate-fade delay-1" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2.5rem;">
          
          <div class="team-card" *ngFor="let member of directionTeam" style="background: var(--bg-secondary); border-radius: var(--border-radius-xl); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid rgba(114,21,19,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease;">
            <div class="team-img-wrapper" style="position: relative; height: 310px; overflow: hidden;">
              <img [src]="member.image" [alt]="member.name" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;">
              <div class="team-tag" style="position: absolute; top: 15px; right: 15px; background: var(--primary-dark); color: #fff; font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.8rem; border-radius: 20px; text-transform: uppercase;">{{ member.tag }}</div>
            </div>
            <div class="team-content" style="padding: 1.8rem 1.5rem; text-align: center;">
              <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--primary-dark); margin: 0 0 0.4rem; font-weight: 700;">{{ member.name }}</h3>
              <p style="color: var(--primary-color); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 1rem;">{{ member.role }}</p>
              <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.5; margin: 0;">{{ member.desc }}</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Mission & Vision Cards (Sarab Style) -->
    <section class="section-padding" style="background-color: var(--bg-secondary);">
      <div class="container">
        <div class="section-header animate-fade">
          <span class="slbl">Nos Piliers</span>
          <h2>Mission & <span>Vision</span></h2>
          <div class="sline"></div>
        </div>

        <div class="cards-grid">
          <div class="card animate-fade" style="border-top: 4px solid var(--primary-color);">
            <div class="card-content" style="padding: 3rem 2rem;">
              <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--primary-dark); margin-bottom: 1rem;">Notre Mission</h3>
              <p style="color: var(--text-muted); font-size: 0.95rem;">Fournir des services de restauration de qualité supérieure tout en respectant les normes les plus élevées en matière d'hygiène et de sécurité alimentaire au Sénégal.</p>
            </div>
          </div>

          <div class="card animate-fade delay-1" style="border-top: 4px solid var(--primary-dark);">
            <div class="card-content" style="padding: 3rem 2rem;">
              <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--primary-dark); margin-bottom: 1rem;">Notre Vision</h3>
              <p style="color: var(--text-muted); font-size: 0.95rem;">Demeurer le leader incontesté de l'art culinaire et du service traiteur de prestige à Dakar, reconnu pour la salle La Diva et l'excellence de ses réceptions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    :host { display: block; }
    .team-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }
    .team-card:hover .team-img-wrapper img {
      transform: scale(1.06);
    }
    `
  ]
})
export class AboutComponent {
  currentSpotIndex = 0;

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
      role: 'Fondatrice & Directrice Générale',
      tag: 'Direction',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600',
      desc: 'Visionnaire de l\'excellence gastronomique, elle guide Kiki Traiteur vers les sommets du prestige événementiel au Sénégal depuis 1997.'
    },
    {
      name: 'M. Pierre Kiki Diaw',
      role: 'Directeur Commercial & Événementiel',
      tag: 'Événements',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600',
      desc: 'Architecte de vos réceptions, il accompagne chaque client institutionnel ou privé dans l\'orchestration sur-mesure de son événement.'
    },
    {
      name: 'Chef Mamadou Ndiaye',
      role: 'Chef Cuisinier Exécutif',
      tag: 'Gastronomie',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600',
      desc: 'Maître des saveurs sénégalaises et internationales, il dirige notre brigade culinaire avec rigueur, créativité et passion.'
    },
    {
      name: 'Mme Marie V. Diaw',
      role: 'Gestionnaire des Opérations',
      tag: 'La Diva',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600',
      desc: 'Responsable de la logistique de la Salle La Diva et du contrôle qualité, elle veille à une exécution protocolaire sans faille.'
    }
  ];

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
