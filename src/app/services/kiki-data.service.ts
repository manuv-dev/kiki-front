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
  location?: string;
  time?: string;
  signatureGastronomique?: string;
}

export interface DevisItem {
  id: string;
  requestId: string;
  dateCreated: string;
  items: Array<{ desc: string; qty: number; unitPrice: number }>;
  tvaRate: number;
  discount: number;
  status: string;
  signatureGastronomique?: string;
  history?: Array<{ date: string; action: string }>;
  guests?: number;
  location?: string;
  date?: string;
  time?: string;
}

export interface RealisationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  guests: number;
  clientId: string;
  clientName?: string;
  clientPhone?: string;
  location: string;
  staffIds: string[];
  requestId?: string;
  signatureGastronomique?: string;
  status: 'confirmé' | 'en cours' | 'terminé' | string;
  createdDate: string;
}

export interface StaffItem {
  id: string;
  name: string;
  role: string;
  phone: string;
  available: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  id: string;
  text: string;
  clientName: string;
  clientTitle: string;
  stars: number;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  eventId?: string;
  eventTitle?: string;
  category?: string;
}

export interface ManagerItem {
  id: string;
  name: string;
  email: string;
  role: string;
  blocked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class KikiDataService {
  private readonly STORAGE_KEYS = {
    PRESTATIONS: 'kiki_prestations',
    CLIENTS: 'kiki_clients',
    REQUESTS: 'kiki_requests',
    DEVIS: 'kiki_devis',
    EVENTS: 'kiki_events',
    STAFF: 'kiki_staff',
    FAQS: 'kiki_faqs',
    MEDIA: 'kiki_media',
    MANAGERS: 'kiki_managers',
    TESTIMONIALS: 'kiki_testimonials'
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

    // Nettoyage complet de toutes les fausses données (clients, demandes, devis, événements, médias, gestionnaires, témoignages, faqs)
    localStorage.removeItem(this.STORAGE_KEYS.CLIENTS);
    localStorage.removeItem(this.STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(this.STORAGE_KEYS.DEVIS);
    localStorage.removeItem(this.STORAGE_KEYS.EVENTS);
    localStorage.removeItem(this.STORAGE_KEYS.MEDIA);
    localStorage.removeItem(this.STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(this.STORAGE_KEYS.MANAGERS);
    localStorage.removeItem(this.STORAGE_KEYS.FAQS);

    if (!localStorage.getItem(this.STORAGE_KEYS.CLIENTS)) {
      localStorage.setItem(this.STORAGE_KEYS.CLIENTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.REQUESTS)) {
      localStorage.setItem(this.STORAGE_KEYS.REQUESTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.DEVIS)) {
      localStorage.setItem(this.STORAGE_KEYS.DEVIS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.EVENTS)) {
      localStorage.setItem(this.STORAGE_KEYS.EVENTS, JSON.stringify([]));
    }

    if (!localStorage.getItem(this.STORAGE_KEYS.STAFF)) {
      const initialStaff: StaffItem[] = [
        { id: 'st_1', name: 'Mamadou Ndiaye', role: 'Chef Cuisinier Exécutif', phone: '+221 77 123 45 67', available: true },
        { id: 'st_2', name: 'Fatou Sow', role: 'Responsable Salle La Diva', phone: '+221 78 234 56 78', available: true },
        { id: 'st_3', name: 'Ousmane Fall', role: 'Chef Scénographe & Décoration', phone: '+221 76 345 67 89', available: true },
        { id: 'st_4', name: 'Awa Diop', role: 'Maître d\'Hôtel Réceptions', phone: '+221 77 456 78 90', available: false }
      ];
      localStorage.setItem(this.STORAGE_KEYS.STAFF, JSON.stringify(initialStaff));
    }

    if (!localStorage.getItem(this.STORAGE_KEYS.FAQS)) {
      localStorage.setItem(this.STORAGE_KEYS.FAQS, JSON.stringify([]));
    }

    if (!localStorage.getItem(this.STORAGE_KEYS.MEDIA)) {
      localStorage.setItem(this.STORAGE_KEYS.MEDIA, JSON.stringify([]));
    }

    if (!localStorage.getItem(this.STORAGE_KEYS.MANAGERS)) {
      localStorage.setItem(this.STORAGE_KEYS.MANAGERS, JSON.stringify([]));
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

  addClient(client: Partial<ClientItem>): ClientItem {
    const clients = this.getClients();
    const newClient: ClientItem = {
      id: 'cli_' + (Math.floor(Math.random() * 899) + 100),
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      type: client.type || 'particulier',
      organization: client.organization || ''
    };
    clients.unshift(newClient);
    localStorage.setItem(this.STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    return newClient;
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

  getEvents(): EventItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
  }

  saveEvents(events: EventItem[]): void {
    localStorage.setItem(this.STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }

  addEvent(event: Partial<EventItem>): EventItem {
    const events = this.getEvents();
    const newEvent: EventItem = {
      id: 'ev_' + (Math.floor(Math.random() * 8999) + 1000),
      title: event.title || 'Nouvel événement',
      type: event.type || 'traiteur',
      date: event.date || new Date().toISOString().split('T')[0],
      time: event.time || '12:00',
      guests: Number(event.guests) || 50,
      clientId: event.clientId || '',
      clientName: event.clientName || '',
      location: event.location || 'Dakar',
      staffIds: event.staffIds || [],
      requestId: event.requestId || '',
      signatureGastronomique: event.signatureGastronomique || 'Menu Signature Kiki Traiteur',
      status: 'confirmé',
      createdDate: new Date().toISOString().split('T')[0]
    };
    events.unshift(newEvent);
    this.saveEvents(events);
    return newEvent;
  }

  updateEvent(id: string, updated: Partial<EventItem>): void {
    let events = this.getEvents();
    events = events.map(e => e.id === id ? { ...e, ...updated } : e);
    this.saveEvents(events);
  }

  deleteEvent(id: string): void {
    let events = this.getEvents();
    events = events.filter(e => e.id !== id);
    this.saveEvents(events);
  }

  getStaff(): StaffItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.STAFF);
    return data ? JSON.parse(data) : [];
  }

  saveStaff(staff: StaffItem[]): void {
    localStorage.setItem(this.STORAGE_KEYS.STAFF, JSON.stringify(staff));
  }

  addStaff(member: Partial<StaffItem>): StaffItem {
    const staff = this.getStaff();
    const newStaff: StaffItem = {
      id: 'st_' + (Math.floor(Math.random() * 899) + 100),
      name: member.name || 'Nouveau Personnel',
      role: member.role || 'Service',
      phone: member.phone || '',
      available: member.available !== undefined ? member.available : true
    };
    staff.push(newStaff);
    this.saveStaff(staff);
    return newStaff;
  }

  updateStaff(id: string, updated: Partial<StaffItem>): void {
    let staff = this.getStaff();
    staff = staff.map(s => s.id === id ? { ...s, ...updated } : s);
    this.saveStaff(staff);
  }

  deleteStaff(id: string): void {
    let staff = this.getStaff();
    staff = staff.filter(s => s.id !== id);
    this.saveStaff(staff);
  }

  getFaqs(): FaqItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.FAQS);
    return data ? JSON.parse(data) : [];
  }

  saveFaqs(faqs: FaqItem[]): void {
    localStorage.setItem(this.STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }

  addFaq(faq: Partial<FaqItem>): FaqItem {
    const faqs = this.getFaqs();
    const newFaq: FaqItem = {
      id: 'faq_' + (Math.floor(Math.random() * 899) + 100),
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'Général'
    };
    faqs.unshift(newFaq);
    this.saveFaqs(faqs);
    return newFaq;
  }

  updateFaq(id: string, updated: Partial<FaqItem>): void {
    let faqs = this.getFaqs();
    faqs = faqs.map(f => f.id === id ? { ...f, ...updated } : f);
    this.saveFaqs(faqs);
  }

  deleteFaq(id: string): void {
    let faqs = this.getFaqs();
    faqs = faqs.filter(f => f.id !== id);
    this.saveFaqs(faqs);
  }

  // --- TESTIMONIALS ---
  getTestimonials(): TestimonialItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.TESTIMONIALS);
    return data ? JSON.parse(data) : [];
  }

  saveTestimonials(list: TestimonialItem[]): void {
    localStorage.setItem(this.STORAGE_KEYS.TESTIMONIALS, JSON.stringify(list));
  }

  addTestimonial(t: Partial<TestimonialItem>): TestimonialItem {
    const list = this.getTestimonials();
    const newT: TestimonialItem = {
      id: 'tst_' + (Math.floor(Math.random() * 8999) + 1000),
      text: t.text || '',
      clientName: t.clientName || '',
      clientTitle: t.clientTitle || '',
      stars: t.stars !== undefined ? t.stars : 5,
      createdAt: new Date().toISOString().split('T')[0]
    };
    list.unshift(newT);
    this.saveTestimonials(list);
    return newT;
  }

  updateTestimonial(id: string, updated: Partial<TestimonialItem>): void {
    let list = this.getTestimonials();
    list = list.map(t => t.id === id ? { ...t, ...updated } : t);
    this.saveTestimonials(list);
  }

  deleteTestimonial(id: string): void {
    let list = this.getTestimonials();
    list = list.filter(t => t.id !== id);
    this.saveTestimonials(list);
  }

  getMedia(): MediaItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.MEDIA);
    return data ? JSON.parse(data) : [];
  }

  saveMedia(media: MediaItem[]): void {
    localStorage.setItem(this.STORAGE_KEYS.MEDIA, JSON.stringify(media));
  }

  addMedia(media: Partial<MediaItem>): MediaItem {
    const list = this.getMedia();
    const newMed: MediaItem = {
      id: 'med_' + (Math.floor(Math.random() * 899) + 100),
      title: media.title || 'Nouveau Média',
      url: media.url || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
      type: media.type || 'image',
      eventId: media.eventId || '',
      eventTitle: media.eventTitle || 'Autre Média',
      category: media.category || ''
    };
    list.unshift(newMed);
    this.saveMedia(list);
    return newMed;
  }

  deleteMedia(id: string): void {
    let list = this.getMedia();
    list = list.filter(m => m.id !== id);
    this.saveMedia(list);
  }

  updateClient(id: string, updated: Partial<ClientItem>): void {
    const data = localStorage.getItem(this.STORAGE_KEYS.CLIENTS);
    let clients: ClientItem[] = data ? JSON.parse(data) : [];
    clients = clients.map(c => c.id === id ? { ...c, ...updated } : c);
    localStorage.setItem(this.STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
  }

  getManagers(): ManagerItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.MANAGERS);
    return data ? JSON.parse(data) : [];
  }

  saveManagers(managers: ManagerItem[]): void {
    localStorage.setItem(this.STORAGE_KEYS.MANAGERS, JSON.stringify(managers));
  }

  addManager(mgr: Partial<ManagerItem>): ManagerItem {
    const list = this.getManagers();
    const newMgr: ManagerItem = {
      id: 'mng_' + (Math.floor(Math.random() * 899) + 100),
      name: mgr.name || 'Nouveau Gestionnaire',
      email: mgr.email || '',
      role: mgr.role || 'Gestionnaire ERP',
      blocked: false
    };
    list.push(newMgr);
    this.saveManagers(list);
    return newMgr;
  }

  toggleManagerBlock(id: string): void {
    let list = this.getManagers();
    list = list.map(m => m.id === id ? { ...m, blocked: !m.blocked } : m);
    this.saveManagers(list);
  }

  getDevis(): DevisItem[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.DEVIS);
    return data ? JSON.parse(data) : [];
  }

  saveDevis(devis: DevisItem[]): void {
    localStorage.setItem(this.STORAGE_KEYS.DEVIS, JSON.stringify(devis));
  }

  addDevis(devis: Partial<DevisItem>): DevisItem {
    const list = this.getDevis();
    const newDevis: DevisItem = {
      id: 'dev_' + (Math.floor(Math.random() * 899) + 100),
      requestId: devis.requestId || '',
      dateCreated: new Date().toISOString().split('T')[0],
      items: devis.items || [{ desc: '', qty: 1, unitPrice: null as any }],
      tvaRate: devis.tvaRate !== undefined ? devis.tvaRate : 18,
      discount: devis.discount || 0,
      status: devis.status || 'sent',
      signatureGastronomique: devis.signatureGastronomique || 'Menu Signature Kiki Traiteur',
      history: [
        { date: new Date().toISOString().split('T')[0], action: 'Devis créé et envoyé par mail au client' }
      ]
    };
    list.unshift(newDevis);
    this.saveDevis(list);
    return newDevis;
  }

  updateDevis(id: string, updated: Partial<DevisItem>, actionMsg?: string): void {
    let list = this.getDevis();
    list = list.map(d => {
      if (d.id === id) {
        const history = d.history ? [...d.history] : [];
        if (actionMsg) {
          history.push({ date: new Date().toISOString().split('T')[0], action: actionMsg });
        }
        return { ...d, ...updated, history };
      }
      return d;
    });
    this.saveDevis(list);
  }

  getDevisByRequest(requestId: string): DevisItem | undefined {
    return this.getDevis().find(d => d.requestId === requestId);
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
