import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KikiDataService } from '../../services/kiki-data.service';
import { GestionnaireApiService } from '../../services/gestionnaire-api.service';

@Injectable({ providedIn: 'root' })
export class GestionnaireDataService {
  private requestsSubject = new BehaviorSubject<any[]>([]);
  private clientsSubject = new BehaviorSubject<any[]>([]);
  private eventsSubject = new BehaviorSubject<any[]>([]);
  private staffSubject = new BehaviorSubject<any[]>([]);
  private faqsSubject = new BehaviorSubject<any[]>([]);
  private testimonialsSubject = new BehaviorSubject<any[]>([]);
  private mediaSubject = new BehaviorSubject<any[]>([]);
  private devisSubject = new BehaviorSubject<any[]>([]);

  requests$ = this.requestsSubject.asObservable();
  clients$ = this.clientsSubject.asObservable();
  events$ = this.eventsSubject.asObservable();
  staff$ = this.staffSubject.asObservable();
  faqs$ = this.faqsSubject.asObservable();
  testimonials$ = this.testimonialsSubject.asObservable();
  media$ = this.mediaSubject.asObservable();
  devis$ = this.devisSubject.asObservable();

  get requests(): any[] { return this.requestsSubject.value; }
  get clients(): any[] { return this.clientsSubject.value; }
  get events(): any[] { return this.eventsSubject.value; }
  get staff(): any[] { return this.staffSubject.value; }
  get faqs(): any[] { return this.faqsSubject.value; }
  get testimonials(): any[] { return this.testimonialsSubject.value; }
  get media(): any[] { return this.mediaSubject.value; }
  get devis(): any[] { return this.devisSubject.value; }

  constructor(
    private dataService: KikiDataService,
    private apiService: GestionnaireApiService
  ) {}

  loadAll(): void {
    this.staffSubject.next(this.dataService.getStaff());
    this.mediaSubject.next(this.dataService.getMedia());

    this.apiService.getAllDemandes().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          const reqs = data.map((d: any) => ({
            id: String(d.id),
            clientId: String(d.clientId || ''),
            prestationId: d.prestationId,
            date: d.date || '',
            time: d.time || '',
            guests: d.guests || 50,
            isInstitution: !!d.isInstitution,
            organization: d.organization || d.clientOrganization || '',
            status: d.status || 'pending',
            dateSubmitted: d.dateSubmitted ? String(d.dateSubmitted).split('T')[0] : '',
            message: d.message || '',
            clientName: d.clientName || 'Client inconnu',
            clientEmail: d.clientEmail || '',
            clientPhone: d.clientPhone || '',
            prestationTitle: d.prestationTitle || d.prestationId,
            location: d.location || ''
          }));
          this.requestsSubject.next(reqs);

          const evs = reqs
            .filter(r => ['accepted', 'approved', 'aboutis', 'confirmé'].includes(r.status))
            .map(r => ({
              id: 'ev_' + r.id,
              title: 'Événement - ' + r.prestationTitle,
              type: r.prestationId,
              date: r.date || new Date().toISOString().split('T')[0],
              time: r.time || '12:00',
              guests: r.guests || 50,
              clientId: r.clientId,
              clientName: r.clientName,
              location: r.location || 'Dakar',
              staffIds: [],
              requestId: r.id,
              signatureGastronomique: 'Menu Signature Kiki Traiteur',
              status: 'confirmé',
              createdDate: r.dateSubmitted
            }));
          this.eventsSubject.next(evs);
        }
      },
      error: (e) => console.warn('API getAllDemandes non accessible', e)
    });

    this.apiService.getAllClients().subscribe({
      next: (data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          this.clientsSubject.next(data.map((c: any) => ({
            id: String(c.id),
            name: c.name || c.nom || 'Client',
            email: c.email || '',
            phone: c.phone || c.telephone || '',
            type: c.clientType || c.type || 'particulier',
            organization: c.organization || c.clientOrganization || ''
          })));
        }
      },
      error: (e) => console.warn('Erreur clients', e)
    });

    this.apiService.getAllDevis().subscribe({
      next: (data) => { if (data && Array.isArray(data)) this.devisSubject.next(data); },
      error: (e) => console.warn('Erreur devis', e)
    });

    this.apiService.getFaqs().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.faqsSubject.next(data.map((f: any) => ({
            id: String(f.id),
            question: f.question,
            answer: f.reponse || f.answer,
            category: f.categorie || f.category || 'Général'
          })));
        }
      },
      error: (e) => { console.warn('Erreur FAQs', e); this.faqsSubject.next([]); }
    });

    this.apiService.getTemoignages().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.testimonialsSubject.next(data.map((t: any) => ({
            id: String(t.id),
            text: t.temoignage || t.content || '',
            clientName: t.nomClient || t.clientName || '',
            clientTitle: t.titreFonction || t.clientRole || '',
            stars: t.note || t.rating || 5
          })));
        }
      },
      error: (e) => { console.warn('Erreur témoignages', e); this.testimonialsSubject.next([]); }
    });
  }

  // --- Shared Helpers ---
  getClientName(clientId: string): string {
    const r = this.requests.find(item => String(item.clientId) === String(clientId) && item.clientName && item.clientName !== 'Client inconnu');
    if (r?.clientName) return r.clientName;
    const c = this.clients.find(item => String(item.id) === String(clientId));
    return c ? c.name : (clientId ? `Client #${clientId}` : 'Client inconnu');
  }

  getClientType(clientId: string): string {
    const r = this.requests.find(item => String(item.clientId) === String(clientId));
    if (r?.isInstitution || r?.organization) return 'Entreprise';
    const c = this.clients.find(item => String(item.id) === String(clientId));
    if (!c) return 'Particulier';
    return (c.type === 'entreprise' || c.type === 'institution' || c.organization) ? 'Entreprise' : 'Particulier';
  }

  getClientEmail(clientId: string): string {
    const c = this.clients.find(item => item.id === clientId);
    return c ? c.email : 'client@gmail.com';
  }

  getClientPhone(clientId: string): string {
    const c = this.clients.find(item => item.id === clientId);
    return c ? (c.phone || '') : '';
  }

  getClientOrg(clientId: string): string {
    const r = this.requests.find(item => String(item.clientId) === String(clientId));
    if (r?.organization) return r.organization;
    const c = this.clients.find(item => String(item.id) === String(clientId));
    return (c?.organization) ? c.organization : '';
  }

  getPrestationName(id: string): string {
    const names: Record<string, string> = {
      'traiteur': 'Service Traiteur Prestige',
      'evenements': "Organisation d'Événements",
      'salle-diva': 'Salle La Diva',
      'decoration': 'Design & Décoration',
      'location': 'Location de Matériel',
      'takeaway': 'Plats à Emporter',
      'foodtruck': 'Food Truck Gourmet'
    };
    return names[id] || id;
  }

  getUnitPrice(id: string): number {
    const prices: Record<string, number> = {
      'traiteur': 15000, 'evenements': 20000, 'salle-diva': 25000,
      'decoration': 5000, 'location': 3000, 'takeaway': 8000, 'foodtruck': 12000
    };
    return prices[id] || 15000;
  }

  formatDate(d: string): string {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString('fr-FR'); } catch { return d; }
  }

  getStaffName(id: string): string {
    const s = this.staff.find(item => item.id === id);
    return s ? s.name : id;
  }

  getStaffRole(id: string): string {
    const s = this.staff.find(item => item.id === id);
    return s ? s.role : '';
  }

  getDevisForRequest(requestId: string): any {
    return this.devis.find(d => String(d.requestId) === String(requestId));
  }

  // Status helpers
  isPendingStatus(status: string): boolean {
    return !status || status === 'pending' || status === 'new' || status === 'en_attente' ||
      (!this.isSentStatus(status) && !this.isAcceptedStatus(status) && !this.isAboutisStatus(status) && !this.isRejectedStatus(status));
  }
  isAcceptedStatus(status: string): boolean { return status === 'accepted' || status === 'approved'; }
  isSentStatus(status: string): boolean { return status === 'sent' || status === 'quoted' || status === 'devis_envoye'; }
  isAboutisStatus(status: string): boolean { return status === 'aboutis' || status === 'conclue' || status === 'event_created'; }
  isRejectedStatus(status: string): boolean { return status === 'rejected' || status === 'refuse'; }

  getStatusLabel(status: string): string {
    if (this.isSentStatus(status)) return 'Devis envoyé';
    if (this.isAcceptedStatus(status)) return 'Accepté';
    if (this.isAboutisStatus(status)) return 'Aboutis';
    if (this.isRejectedStatus(status)) return 'Refusé';
    return 'En attente';
  }

  getBadgeClass(status: string): string {
    if (this.isSentStatus(status)) return 'badge-quoted';
    if (this.isAcceptedStatus(status)) return 'badge-accepted';
    if (this.isAboutisStatus(status)) return 'badge-aboutis';
    if (this.isRejectedStatus(status)) return 'badge-rejected';
    return 'badge-pending';
  }
}
