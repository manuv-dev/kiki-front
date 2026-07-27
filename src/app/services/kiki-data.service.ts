import { Injectable } from '@angular/core';

export interface PrestationItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  category?: string;
}

export interface ClientItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  organization?: string;
}

export interface RequestItem {
  id: string;
  clientId: string;
  prestationId: string;
  date: string;
  guests: number;
  isInstitution: boolean;
  organization?: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  dateSubmitted: string;
  message: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  prestationTitle?: string;
}

export interface DevisItem {
  id: string;
  requestId: string;
  dateCreated: string;
  items: Array<{ desc: string; qty: number; unitPrice: number }>;
  tvaRate: number;
  discount: number;
  status: string;
}

export interface RealisationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
}

@Injectable({
  providedIn: 'root'
})
export class KikiDataService {
  private readonly STORAGE_KEYS = {
    PRESTATIONS: 'kiki_prestations',
    CLIENTS: 'kiki_clients',
    REQUESTS: 'kiki_requests',
    DEVIS: 'kiki_devis'
  };

  constructor() {
    this.initDefaultData();
  }

  private getRelativeDate(offsetDays: number): string {
    const date = new Date('2026-07-21T12:00:00');
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split('T')[0];
  }

  private initDefaultData(): void {
    if (!localStorage.getItem(this.STORAGE_KEYS.PRESTATIONS)) {
      const initialPrestations: PrestationItem[] = [
        {
          id: 'traiteur',
          title: 'Service Traiteur Prestige',
          desc: 'Des créations gastronomiques sur-mesure pour vos mariages, galas et banquets officiels. Une signature culinaire haut de gamme.',
          image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
          category: 'corporate'
        },
        {
          id: 'evenements',
          title: "Organisation d'Événements",
          desc: 'Planification complète de réceptions privées et corporatives d’exception, de la conception à la coordination le jour J.',
          image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop',
          category: 'events'
        },
        {
          id: 'salle-diva',
          title: 'Salle La Diva',
          desc: 'Notre salle de réception exclusive. Un espace raffiné avec équipements de pointe pouvant accueillir jusqu’à 250 convives.',
          image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
          category: 'diva'
        },
        {
          id: 'decoration',
          title: 'Design & Décoration',
          desc: 'Mise en scène florale et scénographie sur-mesure pour transformer vos lieux de réception en décors enchanteurs.',
          image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop',
          category: 'decoration'
        },
        {
          id: 'location',
          title: 'Location de Matériel',
          desc: 'Mobilier de prestige, vaisselle fine et tentes d’apparat. Tout le matériel nécessaire pour un confort haut de gamme.',
          image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop',
          category: 'events'
        },
        {
          id: 'takeaway',
          title: 'Plats à Emporter',
          desc: 'Savourez la gastronomie de Kiki Traiteur chez vous ou au bureau. Une sélection de plats raffinés préparés chaque jour à emporter.',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800',
          category: 'corporate'
        },
        {
          id: 'foodtruck',
          title: 'Food Truck Gourmet',
          desc: 'Une cuisine mobile festive et conviviale pour vos événements décontractés, festivals et retours de noces.',
          image: 'https://images.unsplash.com/photo-1565123409695-7b5ff624d177?q=80&w=800',
          category: 'events'
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.PRESTATIONS, JSON.stringify(initialPrestations));
    }

    if (!localStorage.getItem(this.STORAGE_KEYS.CLIENTS)) {
      const initialClients: ClientItem[] = [
        { id: 'cli_1', name: 'Sophie Laurent', email: 'sophie.l@gmail.com', phone: '06 12 34 56 78', type: 'particular', organization: '' },
        { id: 'cli_2', name: 'Jean-Marc Dubois', email: 'j.dubois@lvmh.com', phone: '01 45 67 89 10', type: 'institution', organization: 'LVMH Group' },
        { id: 'cli_3', name: 'Hélène Rocher', email: 'contact@fondation-rocher.fr', phone: '07 89 01 23 45', type: 'institution', organization: 'Fondation Rocher' },
        { id: 'cli_4', name: 'Antoine Morel', email: 'antoine.morel@yahoo.fr', phone: '06 98 76 54 32', type: 'particular', organization: '' }
      ];
      localStorage.setItem(this.STORAGE_KEYS.CLIENTS, JSON.stringify(initialClients));
    }

    if (!localStorage.getItem(this.STORAGE_KEYS.REQUESTS)) {
      const initialRequests: RequestItem[] = [
        {
          id: 'req_101',
          clientId: 'cli_1',
          prestationId: 'salle-diva',
          date: this.getRelativeDate(1),
          guests: 120,
          isInstitution: false,
          organization: '',
          status: 'approved',
          dateSubmitted: this.getRelativeDate(-3),
          message: 'Demande pour le mariage de ma fille. Nous souhaitons la salle La Diva et le service traiteur associé.'
        },
        {
          id: 'req_102',
          clientId: 'cli_2',
          prestationId: 'traiteur',
          date: this.getRelativeDate(4),
          guests: 80,
          isInstitution: true,
          organization: 'LVMH Group',
          status: 'pending',
          dateSubmitted: this.getRelativeDate(-1),
          message: 'Dîner de gala annuel de l’entreprise. Menu gastronomique 5 services avec accords mets-vins.'
        },
        {
          id: 'req_103',
          clientId: 'cli_3',
          prestationId: 'salle-diva',
          date: this.getRelativeDate(10),
          guests: 200,
          isInstitution: true,
          organization: 'Fondation Rocher',
          status: 'pending',
          dateSubmitted: this.getRelativeDate(0),
          message: 'Conférence de presse et cocktail dinatoire caritatif dans votre salle La Diva.'
        },
        {
          id: 'req_104',
          clientId: 'cli_4',
          prestationId: 'decoration',
          date: this.getRelativeDate(-2),
          guests: 50,
          isInstitution: false,
          organization: '',
          status: 'approved',
          dateSubmitted: this.getRelativeDate(-10),
          message: 'Anniversaire privé. Thème bohème chic avec décoration florale suspendue.'
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.REQUESTS, JSON.stringify(initialRequests));
    }

    if (!localStorage.getItem(this.STORAGE_KEYS.DEVIS)) {
      const initialDevis: DevisItem[] = [
        {
          id: 'dev_501',
          requestId: 'req_101',
          dateCreated: this.getRelativeDate(-2),
          items: [
            { desc: 'Location Salle La Diva (forfait journée)', qty: 1, unitPrice: 3500 },
            { desc: 'Menu Gastronomique 3 services (par pers.)', qty: 120, unitPrice: 65 },
            { desc: 'Forfait Boissons fines (par pers.)', qty: 120, unitPrice: 20 },
            { desc: 'Service en salle & Maître d’hôtel', qty: 5, unitPrice: 250 }
          ],
          tvaRate: 20,
          discount: 0,
          status: 'sent'
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.DEVIS, JSON.stringify(initialDevis));
    }
  }

  getPrestations(): PrestationItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.PRESTATIONS);
    return data ? JSON.parse(data) : [];
  }

  getRealisations(): RealisationItem[] {
    return [
      {
        id: 'real-1',
        title: 'Banquets & Mariages de Prestige',
        category: 'mariage',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
        desc: 'Réception exclusive avec scénographie raffinée et service d’apparat.'
      },
      {
        id: 'real-2',
        title: 'Cocktail Dînatoire VIP',
        category: 'gala',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
        desc: 'Mise en scène gastronomique pour soirée privée à Dakar.'
      },
      {
        id: 'real-3',
        title: 'Gala d’Entreprise au Sommet',
        category: 'institutionnel',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
        desc: 'Accueil institutionnel et service traiteur 500 convives.'
      },
      {
        id: 'real-4',
        title: 'Buffet Architectural La Diva',
        category: 'diva',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800',
        desc: 'Réception d’honneur dans la prestigieuse salle La Diva.'
      },
      {
        id: 'real-5',
        title: 'Scénographie Florale Royale',
        category: 'mariage',
        image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800',
        desc: 'Décoration florale et art de la table pour mariage princier.'
      },
      {
        id: 'real-6',
        title: 'Sommet Diplomatique & Buffet Gourmet',
        category: 'institutionnel',
        image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800',
        desc: 'Prestation sur-mesure pour délégation ministérielle.'
      }
    ];
  }

  getClients(): ClientItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.CLIENTS);
    return data ? JSON.parse(data) : [];
  }

  getRequests(): RequestItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.REQUESTS);
    const requests: RequestItem[] = data ? JSON.parse(data) : [];
    const clients = this.getClients();
    const prestations = this.getPrestations();

    return requests.map(req => {
      const client = clients.find(c => c.id === req.clientId);
      const prestation = prestations.find(p => p.id === req.prestationId);
      return {
        ...req,
        clientName: client ? client.name : 'Client inconnu',
        clientEmail: client ? client.email : '',
        clientPhone: client ? client.phone : '',
        prestationTitle: prestation ? prestation.title : req.prestationId
      };
    });
  }

  addRequest(request: Partial<RequestItem>): RequestItem {
    const requests = this.getRequests();
    const newReq: RequestItem = {
      id: 'req_' + (Math.floor(Math.random() * 899) + 100),
      clientId: request.clientId || 'cli_1',
      prestationId: request.prestationId || 'traiteur',
      date: request.date || new Date().toISOString().split('T')[0],
      guests: Number(request.guests) || 50,
      isInstitution: !!request.isInstitution,
      organization: request.organization || '',
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      message: request.message || ''
    };

    requests.unshift(newReq);
    localStorage.setItem(this.STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    return newReq;
  }

  updateRequestStatus(id: string, status: string): void {
    const data = localStorage.getItem(this.STORAGE_KEYS.REQUESTS);
    let requests: RequestItem[] = data ? JSON.parse(data) : [];
    requests = requests.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem(this.STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }

  deleteRequest(id: string): void {
    const data = localStorage.getItem(this.STORAGE_KEYS.REQUESTS);
    let requests: RequestItem[] = data ? JSON.parse(data) : [];
    requests = requests.filter(r => r.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }

  getDevis(): DevisItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.DEVIS);
    return data ? JSON.parse(data) : [];
  }

  showToast(message: string, isError = false): void {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast-msg show ${isError ? 'error' : ''}`;
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4000);
  }
}
