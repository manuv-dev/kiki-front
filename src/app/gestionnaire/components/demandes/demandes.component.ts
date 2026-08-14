import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionnaireDataService } from '../../services/gestionnaire-data.service';
import { KikiDataService } from '../../../services/kiki-data.service';
import { GestionnaireApiService } from '../../../services/gestionnaire-api.service';

@Component({
  selector: 'app-demandes',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  templateUrl: './demandes.component.html'
})
export class DemandesComponent implements OnInit {
  requests: any[] = [];
  clients: any[] = [];
  devisList: any[] = [];

  requestClientFilter = '';
  requestPrestationFilter = 'ALL';
  selectedRequestStatusFilter = 'ALL';
  requestPage = 1;
  requestPageSize = 5;

  showDevisModal = false;
  isDevisReadonly = false;
  isNewDevis = false;
  isCreatingNewClient = false;
  newClientForm: { name: string, email: string, phone: string, type: string, organization?: string } = { name: '', email: '', phone: '', type: 'particulier' };
  isDevisModified = false;
  selectedClientForDevis: any = null;
  devisSearchClientQuery = '';

  showRequestDetailsModal = false;
  currentDetailRequest: any = null;

  showTraceabilityModal = false;
  currentTraceRequest: any = null;
  currentTraceDevis: any = null;

  showRejectModal = false;
  requestToReject: any = null;

  showPropositionSelectionModal = false;
  requestToAccept: any = null;
  propositions: any[] = [];
  selectedPropositionIds: number[] = [];
  
  isSubmitting = false;

  devisForm: any = {
    requestId: '',
    clientEmail: '',
    clientName: '',
    clientId: '',
    prestationId: 'salle-diva',
    signatureGastronomique: 'Menu Signature Kiki Traiteur',
    guests: 50,
    location: 'Salle La Diva, Dakar',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    items: [{ desc: '', qty: 1, unitPrice: null }],
    tvaRate: 0,
    discount: 0,
    status: 'sent',
    history: [] as Array<{ date: string; action: string }>
  };

  statusFiltersList = [
    { label: 'Tous', value: 'ALL' },
    { label: 'En attente', value: 'pending' },
    { label: 'Accepté', value: 'accepted' },
    { label: 'Propositions envoyées', value: 'sent' },
    { label: 'Aboutis', value: 'aboutis' },
    { label: 'Refusé', value: 'rejected' }
  ];

  constructor(
    public gData: GestionnaireDataService,
    private dataService: KikiDataService,
    private apiService: GestionnaireApiService
  ) {}

  ngOnInit(): void {
    this.gData.loadAll();
    this.gData.requests$.subscribe(r => this.requests = r);
    this.gData.clients$.subscribe(c => this.clients = c);
    this.gData.devis$.subscribe(d => this.devisList = d);
    this.loadPropositions();
  }

  loadPropositions(): void {
    this.apiService.getPropositions().subscribe({
      next: (props) => {
        this.propositions = props;
      },
      error: (err) => console.error('Erreur lors du chargement des propositions', err)
    });
  }

  // --- FILTERS & PAGINATION ---
  getFilteredRequests(): any[] {
    return this.requests.filter(r => {
      const nameMatch = !this.requestClientFilter ||
        (r.clientName || this.gData.getClientName(r.clientId)).toLowerCase().includes(this.requestClientFilter.toLowerCase());
      const prestMatch = this.requestPrestationFilter === 'ALL' || r.prestationId === this.requestPrestationFilter;
      const statusMatch = this.selectedRequestStatusFilter === 'ALL' || r.status === this.selectedRequestStatusFilter;
      return nameMatch && prestMatch && statusMatch;
    });
  }

  getFilteredRequestsForPage(): any[] {
    const filtered = this.getFilteredRequests();
    const start = (this.requestPage - 1) * this.requestPageSize;
    return filtered.slice(start, start + this.requestPageSize);
  }

  getRequestTotalPages(): number {
    return Math.ceil(this.getFilteredRequests().length / this.requestPageSize) || 1;
  }

  getRequestPageArray(): number[] {
    return Array.from({ length: this.getRequestTotalPages() }, (_, i) => i + 1);
  }

  getRequestCountByStatus(status: string): number {
    if (status === 'ALL') return this.requests.length;
    return this.requests.filter(r => r.status === status).length;
  }

  selectRequestStatusFilter(val: string): void {
    this.selectedRequestStatusFilter = val;
    this.requestPage = 1;
  }

  // --- MODAL DEVIS ---
  openCreateDevisModal(): void {
    this.isNewDevis = true;
    this.isDevisReadonly = false;
    this.isCreatingNewClient = false;
    this.newClientForm = { name: '', email: '', phone: '', type: 'particulier', organization: '' };
    this.selectedClientForDevis = null;
    this.devisSearchClientQuery = '';
    this.devisForm = {
      requestId: '', clientEmail: '', clientName: '', clientId: '',
      prestationId: 'salle-diva', signatureGastronomique: 'Menu Signature Kiki Traiteur',
      guests: 50, location: 'Salle La Diva, Dakar',
      date: new Date().toISOString().split('T')[0], time: '19:00',
      items: [{ desc: '', qty: 1, unitPrice: null }],
      tvaRate: 0, discount: 0, status: 'sent', history: []
    };
    this.showDevisModal = true;
  }

  openDevisModal(req: any, readonly: boolean): void {
    this.isNewDevis = false;
    this.isDevisReadonly = readonly;
    this.isDevisModified = false;

    // Fetch devis from backend to ensure we have the latest data
    this.apiService.getDevisByDemandeId(req.id).subscribe({
      next: (apiDevis) => {
        this.populateDevisForm(req, apiDevis);
      },
      error: () => {
        // Fallback to local data or empty if not found in backend
        const existingDevis = this.gData.getDevisForRequest(req.id);
        this.populateDevisForm(req, existingDevis);
      }
    });
  }

  populateDevisForm(req: any, existingDevis: any): void {
    this.devisForm = {
      requestId: req.id,
      clientEmail: req.clientEmail || this.gData.getClientEmail(req.clientId),
      clientName: req.clientName || this.gData.getClientName(req.clientId),
      clientPhone: existingDevis?.clientPhone || req.clientPhone || '+221 77 777 77 77',
      clientId: req.clientId,
      prestationId: existingDevis?.prestationId || req.prestationId || 'salle-diva',
      signatureGastronomique: existingDevis?.signatureGastronomique || req.signatureGastronomique || 'Menu Signature Kiki Traiteur',
      guests: existingDevis?.guests || req.guests || 50,
      location: existingDevis?.location || req.location || 'Salle La Diva, Dakar',
      date: existingDevis?.date || req.date || new Date().toISOString().split('T')[0],
      time: existingDevis?.time || req.time || '19:00',
      items: (existingDevis?.items && existingDevis.items.length > 0) ? existingDevis.items : [{ desc: '', qty: 1, unitPrice: null }],
      tvaRate: existingDevis?.tvaRate || 0,
      discount: existingDevis?.discount || 0,
      status: existingDevis?.status || 'sent',
      history: existingDevis?.history || []
    };
    this.showDevisModal = true;
  }

  closeDevisModal(): void { this.showDevisModal = false; }

  getFilteredClientsForDevis(): any[] {
    if (!this.devisSearchClientQuery) return this.clients.slice(0, 8);
    return this.clients.filter(c => c.name?.toLowerCase().includes(this.devisSearchClientQuery.toLowerCase()));
  }

  selectClientForDevis(c: any): void {
    this.selectedClientForDevis = c;
    this.devisForm.clientId = c.id;
    this.devisForm.clientEmail = c.email;
    this.devisForm.clientName = c.name;
  }

  getDevisTotal(): number {
    const subtotal = (this.devisForm.items || []).reduce((s: number, i: any) => s + (i.qty * i.unitPrice), 0);
    const discount = this.devisForm.discount || 0;
    return subtotal - discount;
  }

  addDevisItem(): void {
    this.devisForm.items = [...(this.devisForm.items || []), { desc: '', qty: 1, unitPrice: null }];
  }

  removeDevisItem(idx: number): void {
    this.devisForm.items = this.devisForm.items.filter((_: any, i: number) => i !== idx);
  }

  isDevisFormValid(): boolean {
    if (!this.devisForm || !this.devisForm.items || this.devisForm.items.length === 0) {
      return false;
    }
    return this.devisForm.items.every((item: any) => item.desc && item.desc.trim() !== '' && item.unitPrice != null && item.unitPrice > 0);
  }

  sendDevis(): void {
    const reqId = this.devisForm.requestId;
    const payload = {
      demandeId: Number(reqId) || 0,
      devisRef: `#DEV-${reqId}-${Date.now()}`,
      clientName: this.devisForm.clientName,
      clientEmail: this.devisForm.clientEmail,
      clientPhone: this.devisForm.clientPhone,
      gestionnaireName: localStorage.getItem('userName') || 'Marie V.',
      prestationId: this.devisForm.prestationId,
      signatureGastronomique: this.devisForm.signatureGastronomique || 'Menu Signature Kiki Traiteur',
      tvaRate: 0,
      discount: this.devisForm.discount || 0,
      guests: this.devisForm.guests,
      location: this.devisForm.location,
      date: this.devisForm.date,
      time: (this.devisForm as any).time,
      status: 'sent',
      items: this.devisForm.items || []
    };
    if (!this.devisForm.requestId) return;
    this.isSubmitting = true;

    this.apiService.createOrUpdateDevis(payload).subscribe({
      next: (apiDevis) => {
        if (apiDevis && apiDevis.id) {
          this.apiService.sendDevisEmail(apiDevis.id).subscribe({
            next: () => {
              this.setStatus(this.devisForm.requestId, 'sent');
              this.dataService.showToast('Devis enregistré et PDF envoyé au client !');
              setTimeout(() => {
                this.showDevisModal = false;
                this.isSubmitting = false;
                this.gData.loadAll();
              }, 2000);
            },
            error: (e) => {
              console.error('Erreur lors de l\'envoi de l\'email', e);
              this.isSubmitting = false;
              this.dataService.showToast('Erreur lors de l\'envoi de l\'email', true);
            }
          });
        } else {
          this.isSubmitting = false;
        }
      },
      error: (e) => {
        console.warn('Backend non accessible', e);
        this.isSubmitting = false;
        this.dataService.showToast('Erreur lors de la création du devis', true);
      }
    });
  }

  createDevisDirectly(): void {
    if (!this.selectedClientForDevis && !this.devisForm.clientId && !this.isCreatingNewClient) {
      this.dataService.showToast('Veuillez sélectionner un client ou en créer un.', true);
      return;
    }
    
    if (this.isCreatingNewClient) {
      if (!this.newClientForm.name || !this.newClientForm.email) {
        this.dataService.showToast('Le nom et l\'email du client sont requis.', true);
        return;
      }
      if (this.newClientForm.type === 'entreprise' && !this.newClientForm.organization) {
        this.dataService.showToast('Le nom de l\'entreprise est requis.', true);
        return;
      }
    }

    const payload = {
      clientId: this.selectedClientForDevis ? this.selectedClientForDevis.id : this.devisForm.clientId,
      newClientName: this.isCreatingNewClient ? this.newClientForm.name : null,
      newClientEmail: this.isCreatingNewClient ? this.newClientForm.email : null,
      newClientPhone: this.isCreatingNewClient ? this.newClientForm.phone : null,
      newClientType: this.isCreatingNewClient ? (this.newClientForm.type || 'particulier') : null,
      newClientOrganization: (this.isCreatingNewClient && this.newClientForm.type === 'entreprise') ? this.newClientForm.organization : null,
      prestationId: this.devisForm.prestationId || 'salle-diva',
      signatureGastronomique: this.devisForm.signatureGastronomique || 'Menu Signature Kiki Traiteur',
      guests: this.devisForm.guests || 50,
      location: this.devisForm.location || 'Dakar',
      date: this.devisForm.date,
      time: this.devisForm.time,
      tvaRate: this.devisForm.tvaRate,
      discount: this.devisForm.discount,
      items: this.devisForm.items,
      gestionnaireName: localStorage.getItem('userName') || 'Marie V.'
    };

    this.isSubmitting = true;
    this.apiService.createDevisDirectly(payload).subscribe({
      next: (res) => {
        this.dataService.showToast('Devis créé et envoyé avec succès.');
        setTimeout(() => {
          this.isSubmitting = false;
          this.closeDevisModal();
          this.gData.loadAll();
        }, 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error(err);
        this.dataService.showToast('Erreur lors de la création du devis', true);
      }
    });
  }

  // --- STATUS ACTIONS ---
  setStatus(id: string, st: string, propIds?: number[]): void {
    const numId = Number(id);
    if (!isNaN(numId) && numId > 0) {
      this.apiService.updateStatus(numId, st, propIds).subscribe({
        next: () => { this.dataService.updateRequestStatus(id, st); this.gData.loadAll(); },
        error: () => { this.dataService.updateRequestStatus(id, st); this.gData.loadAll(); }
      });
    } else {
      this.dataService.updateRequestStatus(id, st);
      this.gData.loadAll();
    }
  }

  acceptRequest(req: any): void {
    this.requestToAccept = req;
    this.selectedPropositionIds = [];
    this.showPropositionSelectionModal = true;
  }

  togglePropositionSelection(id: number): void {
    const index = this.selectedPropositionIds.indexOf(id);
    if (index > -1) {
      this.selectedPropositionIds.splice(index, 1);
    } else {
      this.selectedPropositionIds.push(id);
    }
  }

  confirmAcceptRequest(): void {
    if (!this.requestToAccept || this.selectedPropositionIds.length === 0) return;
    this.setStatus(this.requestToAccept.id, 'sent', this.selectedPropositionIds);
    this.dataService.showToast(`Demande #${this.requestToAccept.id} acceptée et propositions envoyées.`);
    this.closePropositionSelectionModal();
  }

  closePropositionSelectionModal(): void {
    this.showPropositionSelectionModal = false;
    this.requestToAccept = null;
    this.selectedPropositionIds = [];
  }

  acceptRequestFromDetails(): void {
    if (this.currentDetailRequest) {
      this.acceptRequest(this.currentDetailRequest);
      this.closeRequestDetailsModal();
    }
  }

  rejectRequest(req: any): void {
    this.requestToReject = req;
    this.showRejectModal = true;
  }

  confirmReject(): void {
    if (!this.requestToReject) return;
    this.apiService.updateStatus(this.requestToReject.id, 'rejected').subscribe({
      next: (res) => {
        this.dataService.showToast(`Demande #${this.requestToReject.id} refusée.`);
        this.closeRejectModal();
        this.gData.loadAll();
      },
      error: (err) => {
        console.error(err);
        this.dataService.showToast('Erreur lors du refus', true);
      }
    });
  }

  closeRejectModal(): void {
    this.showRejectModal = false;
    this.requestToReject = null;
  }

  rejectRequestFromDetails(): void {
    if (this.currentDetailRequest) {
      this.rejectRequest(this.currentDetailRequest);
      this.closeRequestDetailsModal();
    }
  }

  acceptDevisAndCreateEvent(req: any): void {
    this.dataService.updateRequestStatus(req.id, 'aboutis');
    const dev = this.gData.getDevisForRequest(req.id);
    if (dev) this.dataService.updateDevis(dev.id, { status: 'conclue' }, 'Devis accepté');
    this.dataService.showToast("Devis accepté ! Statut passé à 'Aboutis'.");
    this.gData.loadAll();
  }

  // --- DETAILS MODAL ---
  openRequestDetailsModal(req: any): void {
    this.currentDetailRequest = req;
    this.showRequestDetailsModal = true;
  }

  closeRequestDetailsModal(): void {
    this.showRequestDetailsModal = false;
    this.currentDetailRequest = null;
  }

  // --- TRACEABILITY ---
  openTraceabilityModal(req: any): void {
    this.currentTraceRequest = req;
    this.currentTraceDevis = this.gData.getDevisForRequest(req.id);
    this.showTraceabilityModal = true;
  }

  closeTraceabilityModal(): void {
    this.showTraceabilityModal = false;
    this.currentTraceRequest = null;
  }

  // --- DELEGATES ---
  getClientName = (id: string) => this.gData.getClientName(id);
  getClientType = (id: string) => this.gData.getClientType(id);
  getPrestationName = (id: string) => this.gData.getPrestationName(id);
  formatDate = (d: string) => this.gData.formatDate(d);
  getBadgeClass = (s: string) => this.gData.getBadgeClass(s);
  getStatusLabel = (s: string) => this.gData.getStatusLabel(s);
  isPendingStatus = (s: string) => this.gData.isPendingStatus(s);
  isAcceptedStatus = (s: string) => this.gData.isAcceptedStatus(s);
  isSentStatus = (s: string) => this.gData.isSentStatus(s);
  isAboutisStatus = (s: string) => this.gData.isAboutisStatus(s);
  isRejectedStatus = (s: string) => this.gData.isRejectedStatus(s);
}
