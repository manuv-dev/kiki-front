import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PrestationImage {
  url: string;
  alt: string;
  caption: string;
}

interface PrestationData {
  id: string;
  indexNum: string;
  tabTitle: string;
  subtitle: string;
  title: string;
  desc: string;
  images: PrestationImage[];
  currentPhotoIndex: number;
}

@Component({
  selector: 'app-prestations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container">
        <h1>Nos Prestations</h1>
        <div class="page-hero-path">Accueil &nbsp;&gt;&nbsp; Prestations</div>
      </div>
    </section>

    <!-- Master Prestations Slider Section -->
    <section class="section-padding">
      <div class="container">

        <!-- En-tête -->
        <div class="section-header text-center" style="margin-bottom: 2.5rem;">
          <span class="slbl">Nos Domaines d'Expertise</span>
          <h2>Le Grand Carrousel de nos Prestations</h2>
          <div class="sline" style="margin: 0.8rem auto 0;"></div>
        </div>

        <!-- 1. Barre de navigation par onglets (Master Slider Tabs) -->
        <div class="master-tabs-bar">
          <button *ngFor="let prest of prestationsList; let i = index"
            class="master-tab-btn"
            [class.active-tab]="currentPrestationIndex === i"
            (click)="selectPrestation(i)">
            <span class="tab-num">{{ prest.indexNum }}</span>
            <span class="tab-label">{{ prest.tabTitle }}</span>
          </button>
        </div>

        <!-- 2. Le Slider Principal : Section Active en 2 Colonnes -->
        <div class="prestation-item active-prestation animate-fade" *ngIf="currentPrestation">
          
          <!-- Colonne Gauche : Infos + 5 Vignettes -->
          <div class="prestation-text-wrapper">
            <div class="prestation-info">
              <span class="slbl">{{ currentPrestation.subtitle }}</span>
              <h3>{{ currentPrestation.title }}</h3>
              <p class="prestation-desc">{{ currentPrestation.desc }}</p>

              <!-- 5 Vignettes cliquables pour cette prestation -->
              <div class="prestation-thumbs">
                <img *ngFor="let img of currentPrestation.images; let idx = index"
                  [src]="img.url" [alt]="img.alt"
                  class="prestation-thumb"
                  [class.active-thumb]="currentPrestation.currentPhotoIndex === idx"
                  (click)="goToPhoto(idx)"
                  title="Voir la photo {{ idx + 1 }}">
              </div>
            </div>
          </div>

          <!-- Colonne Droite : Le Slider de 5 photos de la prestation -->
          <div class="prestation-slider-card">
            <img [src]="currentPrestation.images[currentPrestation.currentPhotoIndex].url"
              [alt]="currentPrestation.images[currentPrestation.currentPhotoIndex].alt"
              class="slider-main-img"
              (click)="openLightbox(currentPrestation.images[currentPrestation.currentPhotoIndex].url, currentPrestation.images[currentPrestation.currentPhotoIndex].caption)">
            
            <!-- Overlay & Contrôles Photos -->
            <div class="slider-overlay">
              <div>
                <span class="photo-counter-badge">Photo {{ currentPrestation.currentPhotoIndex + 1 }}/{{ currentPrestation.images.length }}</span>
                <p class="slider-caption-text">{{ currentPrestation.images[currentPrestation.currentPhotoIndex].caption }}</p>
              </div>
              <div class="slider-controls-group">
                <button (click)="prevPhoto()" class="slider-btn" title="Photo précédente"><i class="fas fa-chevron-left"></i></button>
                <button (click)="nextPhoto()" class="slider-btn" title="Photo suivante"><i class="fas fa-chevron-right"></i></button>
              </div>
            </div>
          </div>

        </div>

        <!-- 3. Footer du Master Slider (Navigation Prestation Précédente / Suivante) -->
        <div class="master-slider-footer">
          <button (click)="prevPrestation()" class="master-nav-btn">
            <i class="fas fa-arrow-left"></i>
            <span>Prestation précédente</span>
          </button>

          <div class="master-counter">
            <span class="current-num">{{ currentPrestationIndex + 1 }}</span>
            <span class="sep">/</span>
            <span class="total-num">{{ prestationsList.length }}</span>
            <span class="prest-name">— {{ currentPrestation.tabTitle }}</span>
          </div>

          <button (click)="nextPrestation()" class="master-nav-btn">
            <span>Prestation suivante</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>

      </div>
    </section>

    <!-- Lightbox Modal -->
    <div class="lightbox" id="lightbox" [class.active]="lightboxOpen" (click)="closeLightbox()">
      <span class="lightbox-close" (click)="closeLightbox()">&times;</span>
      <div class="lightbox-content" (click)="$event.stopPropagation()">
        <img [src]="lightboxImgSrc" alt="Kiki Traiteur - Vue Prestation">
        <p class="lightbox-caption" *ngIf="lightboxCaption">{{ lightboxCaption }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      :host { display: block; }

      /* Master Tabs Bar */
      .master-tabs-bar {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 3.5rem;
      }
      .master-tab-btn {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        background: var(--bg-white);
        border: 2px solid rgba(114, 21, 19, 0.15);
        color: #1e293b;
        padding: 0.75rem 1.4rem;
        border-radius: 50px;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      }
      .master-tab-btn:hover {
        border-color: #721513;
        transform: translateY(-2px);
      }
      .master-tab-btn.active-tab {
        background: #721513;
        color: #ffffff;
        border-color: #721513;
        box-shadow: 0 6px 20px rgba(114, 21, 19, 0.25);
      }
      .tab-num {
        font-size: 0.75rem;
        font-weight: 800;
        opacity: 0.8;
      }

      /* Section Prestation 2-Colonnes (Exactement le layout de la capture) */
      .prestation-item {
        display: grid;
        grid-template-columns: 1fr 1.15fr;
        gap: 3.5rem;
        align-items: center;
        background: var(--bg-white);
        padding: 1rem 0 2rem;
        min-height: 420px;
      }
      .prestation-info h3 {
        font-size: 2.2rem;
        font-weight: 800;
        color: var(--primary-dark);
        margin: 0.3rem 0 1.2rem;
      }
      .prestation-desc {
        font-size: 1.05rem;
        color: #475569;
        line-height: 1.7;
        margin-bottom: 0;
      }

      /* 5 Vignettes */
      .prestation-thumbs {
        display: flex;
        gap: 0.65rem;
        flex-wrap: wrap;
        margin-top: 1.8rem;
      }
      .prestation-thumb {
        width: 72px;
        height: 52px;
        border-radius: 10px;
        object-fit: cover;
        cursor: pointer;
        border: 2px solid transparent;
        transition: all 0.25s ease;
        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      }
      .prestation-thumb:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .prestation-thumb.active-thumb {
        border-color: #721513;
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(114, 21, 19, 0.3);
      }

      /* Slider Photo de 5 images */
      .prestation-slider-card {
        position: relative;
        border-radius: var(--border-radius-xl, 22px);
        overflow: hidden;
        box-shadow: 0 12px 35px rgba(0,0,0,0.14);
        height: 400px;
        background: #000;
      }
      .slider-main-img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        cursor: zoom-in;
        transition: transform 0.6s ease;
      }
      .prestation-slider-card:hover .slider-main-img {
        transform: scale(1.04);
      }
      .slider-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(0deg, rgba(20,20,20,0.85) 0%, rgba(114,21,19,0.5) 50%, transparent 100%);
        padding: 1.5rem 1.4rem 1.2rem;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .photo-counter-badge {
        background: #721513;
        color: #fff;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0.28rem 0.75rem;
        border-radius: 50px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .slider-caption-text {
        margin: 0.4rem 0 0;
        font-size: 0.95rem;
        font-weight: 600;
        color: #fff;
        text-shadow: 0 1px 3px rgba(0,0,0,0.5);
      }
      .slider-controls-group {
        display: flex;
        gap: 0.5rem;
      }
      .slider-btn {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1.5px solid rgba(255, 255, 255, 0.4);
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      .slider-btn:hover {
        background: #721513;
        border-color: #721513;
        transform: scale(1.08);
      }

      /* Master Slider Footer */
      .master-slider-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 3.5rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        flex-wrap: wrap;
        gap: 1.5rem;
      }
      .master-nav-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        background: var(--bg-white);
        color: #721513;
        border: 2px solid rgba(114, 21, 19, 0.2);
        padding: 0.75rem 1.6rem;
        border-radius: 50px;
        font-weight: 700;
        font-size: 0.92rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .master-nav-btn:hover {
        background: #721513;
        color: #ffffff;
        border-color: #721513;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(114, 21, 19, 0.2);
      }
      .master-counter {
        font-weight: 700;
        font-size: 1.05rem;
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
      .master-counter .current-num {
        color: #721513;
        font-weight: 900;
        font-size: 1.25rem;
      }
      .master-counter .sep {
        color: #94a3b8;
      }
      .master-counter .total-num {
        color: #64748b;
      }
      .master-counter .prest-name {
        margin-left: 0.4rem;
        color: #475569;
        font-weight: 600;
      }

      /* Lightbox */
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.92);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        backdrop-filter: blur(5px);
      }
      .lightbox.active {
        display: flex;
      }
      .lightbox-close {
        position: absolute;
        top: 2rem;
        right: 2.5rem;
        color: #fff;
        font-size: 2.5rem;
        cursor: pointer;
        z-index: 10000;
      }
      .lightbox-content {
        max-width: 900px;
        max-height: 85vh;
        text-align: center;
      }
      .lightbox-content img {
        max-width: 100%;
        max-height: 78vh;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      }
      .lightbox-caption {
        color: #fff;
        margin-top: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
      }

      @media (max-width: 992px) {
        .prestation-item {
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .prestation-slider-card {
          height: 330px;
        }
        .master-slider-footer {
          flex-direction: column;
          text-align: center;
        }
      }

      /* ===== DARK MODE OVERRIDES ===== */
      [data-theme="dark"] .master-tab-btn {
        color: var(--text-main);
        border-color: var(--border-color);
      }
      [data-theme="dark"] .master-nav-btn {
        color: var(--primary-dark);
        border-color: var(--border-color);
      }
      [data-theme="dark"] .prestation-info h3,
      [data-theme="dark"] .prestation-desc {
        color: var(--text-main);
      }
      [data-theme="dark"] .master-counter .sep,
      [data-theme="dark"] .master-counter .total-num,
      [data-theme="dark"] .master-counter .prest-name {
        color: var(--text-muted);
      }
    `
  ]
})
export class PrestationsComponent {
  currentPrestationIndex = 0;

  prestationsList: PrestationData[] = [
    {
      id: 'corporate',
      indexNum: '01',
      tabTitle: 'Entreprises',
      subtitle: 'Entreprises & Institutions',
      title: "Restauration d'Entreprise",
      desc: "Des repas équilibrés, préparés avec des produits frais et locaux pour la gestion quotidienne ou événementielle de vos cantines et cocktails d'affaires à Dakar.",
      currentPhotoIndex: 0,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200',
          alt: "Buffet d'entreprise traiteur",
          caption: "Buffet d'entreprise haut de gamme & service traiteur à Dakar"
        },
        {
          url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200',
          alt: "Plats chauds traiteur",
          caption: "Plats chauds et accompagnements locaux raffinés"
        },
        {
          url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200',
          alt: "Cocktail dînatoire affaires",
          caption: "Cocktails dînatoires et séminaires de direction VIP"
        },
        {
          url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200',
          alt: "Plateau repas réunion",
          caption: "Plateaux repas gastronomiques pour réunions de direction"
        },
        {
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
          alt: "Pause-café et accueil entreprise",
          caption: "Accueil petit-déjeuner gourmand et pauses-café en entreprise"
        }
      ]
    },
    {
      id: 'events',
      indexNum: '02',
      tabTitle: 'Événementiel',
      subtitle: 'Grandes Réceptions',
      title: "Restauration Événementielle",
      desc: "Mariages, baptêmes, dîners de gala et banquets. Notre brigade culinaire conçoit des menus gastronomiques personnalisés qui séduiront le palais de vos convives.",
      currentPhotoIndex: 0,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
          alt: "Réception mariage gala",
          caption: "Réception de mariage et banquets d'exception à Dakar"
        },
        {
          url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200',
          alt: "Dressage et art de la table",
          caption: "Art de la table & dressage protocolaire raffiné"
        },
        {
          url: 'https://images.unsplash.com/photo-1505232458627-537f8c476b5b?q=80&w=1200',
          alt: "Soirée de gala et célébrations",
          caption: "Soirée de gala et célébrations de prestige à Dakar"
        },
        {
          url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200',
          alt: "Cocktail champagne",
          caption: "Cocktail champagne et verrines gastronomiques savoureuses"
        },
        {
          url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200',
          alt: "Pièces montées et pâtisserie",
          caption: "Pièces montées et créations pâtissières d'exception pour vos invités"
        }
      ]
    },
    {
      id: 'diva',
      indexNum: '03',
      tabTitle: 'Salle La Diva',
      subtitle: "Lieu d'Exception à Dakar",
      title: "Salle La Diva",
      desc: "Espace de réception exclusif modulable jusqu'à 250 personnes. Forfaits tout inclus comprenant la salle, la restauration, le service à table et les boissons.",
      currentPhotoIndex: 0,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200',
          alt: "Salle La Diva vue d'ensemble",
          caption: "La Salle La Diva — jusqu'à 250 convives en banquet"
        },
        {
          url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
          alt: "Éclairage et sonorisation",
          caption: "Acoustique, jeux de lumières et mise en scène féerique"
        },
        {
          url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200',
          alt: "Réception clé en main",
          caption: "Réception clé en main avec service protocolaire à table"
        },
        {
          url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200',
          alt: "Configuration cocktail dînatoire",
          caption: "Configuration cocktail dînatoire moderne et chaleureuse"
        },
        {
          url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200',
          alt: "Décoration florale table d'honneur",
          caption: "Décoration florale et tables d'honneur personnalisées sur-mesure"
        }
      ]
    },
    {
      id: 'takeaway',
      indexNum: '04',
      tabTitle: 'À Emporter',
      subtitle: 'Service à Emporter & Livraison',
      title: "Plats à Emporter",
      desc: "Savourez la gastronomie de Kiki Traiteur dans le confort de votre maison ou au bureau. Une sélection de plats raffinés et créations culinaires du jour préparés avec le plus grand soin par notre brigade.",
      currentPhotoIndex: 0,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200',
          alt: "Coffret repas gastronomique",
          caption: "Coffrets repas & plats individuels livrés ou à emporter"
        },
        {
          url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',
          alt: "Plats chauds du jour",
          caption: "Plats chauds cuisinés le jour-même par nos chefs brigades"
        },
        {
          url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200',
          alt: "Plateau de douceurs et canapés",
          caption: "Sélection de douceurs et plateaux de canapés à partager"
        },
        {
          url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200',
          alt: "Grillades et spécialités sénégalaises",
          caption: "Grillades et spécialités sénégalaises revisitées avec passion"
        },
        {
          url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200',
          alt: "Emballages éco-responsables",
          caption: "Emballages éco-responsables pour toutes vos commandes à emporter"
        }
      ]
    },
    {
      id: 'foodtruck',
      indexNum: '05',
      tabTitle: 'Food Truck',
      subtitle: 'Événements Festifs & Mobiles',
      title: "Food Truck Gourmet",
      desc: "Une cuisine de rue mobile festive, haut de gamme et conviviale pour vos retours de noces, festivals, tournages de films ou soirées d'entreprise détendues. Une expérience originale et mémorable.",
      currentPhotoIndex: 0,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1565123409695-7b5ff624d177?q=80&w=1200',
          alt: "Animation Food Truck Gourmet",
          caption: "Food Truck Gourmet Kiki Traiteur en prestation mobile"
        },
        {
          url: 'https://images.unsplash.com/photo-1579618218290-00c5c36f5fbf?q=80&w=1200',
          alt: "Street food fine et burgers",
          caption: "Street food chic : burgers gourmets & mini-brochettes"
        },
        {
          url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200',
          alt: "Cuisine extérieure festive",
          caption: "Animation culinaire conviviale et festive sur site"
        },
        {
          url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200',
          alt: "Service rapide sur site",
          caption: "Service rapide et gourmand pour festivals et retours de noces"
        },
        {
          url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200',
          alt: "Spécialités nomades à partager",
          caption: "Créations culinaires nomades et tapas festives à partager"
        }
      ]
    }
  ];

  get currentPrestation(): PrestationData {
    return this.prestationsList[this.currentPrestationIndex];
  }

  /* Master Slider Controls */
  selectPrestation(index: number): void {
    this.currentPrestationIndex = index;
  }

  nextPrestation(): void {
    this.currentPrestationIndex = (this.currentPrestationIndex + 1) % this.prestationsList.length;
  }

  prevPrestation(): void {
    this.currentPrestationIndex =
      (this.currentPrestationIndex - 1 + this.prestationsList.length) % this.prestationsList.length;
  }

  /* Photo Slider Controls (pour la prestation en cours) */
  nextPhoto(): void {
    const prest = this.currentPrestation;
    prest.currentPhotoIndex = (prest.currentPhotoIndex + 1) % prest.images.length;
  }

  prevPhoto(): void {
    const prest = this.currentPrestation;
    prest.currentPhotoIndex =
      (prest.currentPhotoIndex - 1 + prest.images.length) % prest.images.length;
  }

  goToPhoto(idx: number): void {
    this.currentPrestation.currentPhotoIndex = idx;
  }

  /* Lightbox */
  lightboxOpen = false;
  lightboxImgSrc = '';
  lightboxCaption = '';

  openLightbox(src: string, caption: string): void {
    this.lightboxImgSrc = src;
    this.lightboxCaption = caption;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }
}
