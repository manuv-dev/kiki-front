import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { KikiDataService } from './services/kiki-data.service';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-logo">
          <img src="assets/images/logo.png" alt="Kiki Traiteur Logo">
          <div class="brand-text">
            <span class="brand-title" style="color: white; font-size: 1.1rem;">Kiki Traiteur</span>
            <span class="brand-subtitle" style="color: var(--accent-color); font-size: 0.6rem;">Espace Client</span>
          </div>
        </div>

        <ul class="sidebar-menu">
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'quotes'" (click)="activeTab = 'quotes'">
              <i class="fas fa-file-invoice me-2"></i> Mes Demandes & Devis
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="sidebar-link" [class.active]="activeTab === 'chat'" (click)="activeTab = 'chat'">
              <i class="fas fa-comments me-2"></i> Messagerie Directe
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <div class="user-badge">
            <div class="user-avatar">{{ clientInitials }}</div>
            <div class="user-info">
              <span class="user-name">{{ clientName }}</span>
              <span class="user-role">{{ clientOrg ? clientOrg : 'Client Particulier' }}</span>
            </div>
          </div>
          <a href="javascript:void(0)" (click)="logout()" class="sidebar-link" style="color: #FCA5A5; border-top: 1px solid rgba(197, 168, 128, 0.1); margin-top: 0.5rem; padding-top: 1rem;">
            🚪 Déconnexion
          </a>
        </div>
      </aside>

      <!-- Main Workspace -->
      <main class="main-content">
        <!-- Top header -->
        <div class="dashboard-header">
          <div class="dashboard-title">
            <h1>Bonjour, {{ clientName.split(' ')[0] }}</h1>
            <p>Suivez en temps réel l'avancement de vos demandes de réceptions.</p>
          </div>
          <a routerLink="/devis" class="btn btn-accent" style="color: white;"><i class="fas fa-plus me-1"></i> Nouvelle Demande</a>
        </div>

        <!-- 1. Quotes and requests section -->
        <section *ngIf="activeTab === 'quotes'" class="dashboard-section active">
          <div class="panel">
            <div class="panel-header">
              <h2 class="panel-title">Historique de mes demandes</h2>
            </div>
            
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>ID Demande</th>
                    <th>Prestation</th>
                    <th>Date Soumise</th>
                    <th>Date Événement</th>
                    <th>Invités</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let req of clientRequests">
                    <td><strong>#{{ req.id }}</strong></td>
                    <td>{{ getPrestationName(req.prestationId) }}</td>
                    <td>{{ formatDate(req.submittedDate) }}</td>
                    <td>{{ formatDate(req.date) }}</td>
                    <td>{{ req.guests }} pers.</td>
                    <td>
                      <span class="badge" [ngClass]="getBadgeClass(req.status)">
                        {{ getStatusLabel(req.status) }}
                      </span>
                    </td>
                    <td>
                      <button *ngIf="req.status !== 'pending'" class="btn btn-sm btn-primary" (click)="openInvoiceModal(req)">
                        📄 Voir Devis PDF
                      </button>
                      <span *ngIf="req.status === 'pending'" style="color: var(--text-muted); font-size: 0.85rem;">En attente de chiffrage</span>
                    </td>
                  </tr>
                  <tr *ngIf="clientRequests.length === 0">
                    <td colspan="7" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                      Aucune demande trouvée pour cet espace client. <a routerLink="/devis" style="color: var(--primary-color);">Créer votre première demande</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- 2. Chat direct section -->
        <section *ngIf="activeTab === 'chat'" class="dashboard-section active">
          <div class="panel">
            <div class="panel-header">
              <h2 class="panel-title">Échanger avec Pierre Kiki (Votre Organisateur)</h2>
            </div>
            
            <div class="chat-container">
              <div class="chat-messages" id="chat-box">
                <div *ngFor="let msg of messages" class="chat-bubble" [class.sent]="msg.sender === 'me'" [class.received]="msg.sender !== 'me'">
                  <div style="font-size: 0.75rem; opacity: 0.7; margin-bottom: 0.25rem;">{{ msg.senderName }} • {{ msg.time }}</div>
                  {{ msg.text }}
                </div>
              </div>
              <form (ngSubmit)="sendMessage()" class="chat-input-area">
                <input type="text" [(ngModel)]="newChatText" name="chatInput" class="form-control" placeholder="Saisissez votre message..." required>
                <button type="submit" class="btn btn-primary" style="padding: 0 1.5rem;" [disabled]="!newChatText.trim()">Envoyer</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- Devis PDF Viewer Modal -->
    <div class="modal" [class.active]="invoiceModalOpen" (click)="closeInvoiceModal()">
      <div class="modal-content" style="max-width: 800px;" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Proposition Commerciale (Devis PDF)</h3>
          <button class="modal-close" (click)="closeInvoiceModal()">&times;</button>
        </div>
        <div class="modal-body" id="print-area">
          <div class="invoice-print-container" *ngIf="selectedRequest">
            <div class="invoice-header">
              <div class="invoice-logo-title">
                <h2>Kiki Traiteur</h2>
                <p style="font-size: 0.85rem; color: #555;">La poésie des saveurs & l'art culinaire</p>
                <p style="font-size: 0.8rem; margin-top: 0.5rem;">Hann Maristes, Dakar, Sénégal<br>NINEA : 0045892342A1</p>
              </div>
              <div class="invoice-meta">
                <h3 style="font-family: var(--font-heading); color: var(--primary-color);">DEVIS #{{ selectedRequest.id }}</h3>
                <p>Date : {{ formatDate(selectedRequest.submittedDate) }}</p>
                <p>Échéance : Valable 30 jours</p>
              </div>
            </div>

            <div class="invoice-details-grid">
              <div class="invoice-details-col">
                <h4>Émetteur</h4>
                <p><strong>Kiki Traiteur SAS</strong></p>
                <p>Responsable client : Pierre Kiki</p>
                <p>Email : commercial&#64;kikitraiteursenegal.net</p>
              </div>
              <div class="invoice-details-col">
                <h4>Destinataire</h4>
                <p><strong>{{ clientName }}</strong></p>
                <p *ngIf="clientOrg">{{ clientOrg }}</p>
                <p>{{ clientEmail }}</p>
              </div>
            </div>

            <p style="margin-bottom: 1.5rem; font-size: 0.95rem;"><strong>Événement prévu le :</strong> {{ formatDate(selectedRequest.date) }} &nbsp;|&nbsp; <strong>Nombre de convives :</strong> {{ selectedRequest.guests }} pers.</p>

            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Description des Prestations</th>
                  <th style="text-align: center; width: 80px;">Qté</th>
                  <th style="text-align: right; width: 150px;">P.U. HT</th>
                  <th style="text-align: right; width: 180px;">Total HT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{{ getPrestationName(selectedRequest.prestationId) }}</strong><br>
                    <small style="color: #666;">{{ selectedRequest.message || 'Service traiteur / organisation événementielle selon formule.' }}</small>
                  </td>
                  <td style="text-align: center;">{{ selectedRequest.guests }}</td>
                  <td style="text-align: right;">{{ getUnitPrice(selectedRequest.prestationId).toLocaleString('fr-FR') }} XOF</td>
                  <td style="text-align: right;">{{ (getUnitPrice(selectedRequest.prestationId) * selectedRequest.guests).toLocaleString('fr-FR') }} XOF</td>
                </tr>
              </tbody>
            </table>

            <div class="invoice-totals-box">
              <div style="font-size: 0.95rem;"><span>Total Hors Taxes :</span> <strong>{{ (getUnitPrice(selectedRequest.prestationId) * selectedRequest.guests).toLocaleString('fr-FR') }} XOF</strong></div>
              <div style="font-size: 0.95rem; margin-bottom: 0.5rem;"><span>TVA (18%) :</span> <strong>{{ (getUnitPrice(selectedRequest.prestationId) * selectedRequest.guests * 0.18).toLocaleString('fr-FR') }} XOF</strong></div>
              <div style="font-size: 1.4rem; color: var(--primary-color); border-top: 2px solid var(--accent-color); padding-top: 0.5rem; font-weight: 700;">
                <span>Total TTC :</span> <span>{{ (getUnitPrice(selectedRequest.prestationId) * selectedRequest.guests * 1.18).toLocaleString('fr-FR') }} XOF</span>
              </div>
            </div>

            <div style="margin-top: 4rem; font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 1rem; text-align: center;">
              KIKI TRAITEUR - Hann Maristes, Dakar - NINEA 0045892342A1. Merci pour votre confiance.
            </div>
          </div>
        </div>
        <div class="modal-footer no-print">
          <button class="btn btn-outline" (click)="closeInvoiceModal()">Fermer</button>
          <button class="btn btn-primary" (click)="printInvoice()"><i class="fas fa-print me-1"></i> Imprimer / PDF</button>
          <div *ngIf="selectedRequest && selectedRequest.status === 'quoted'" style="display: inline-block; margin-left: 1rem;">
            <button class="btn btn-success me-2" style="background:#059669; color:white;" (click)="acceptQuote(selectedRequest.id)">
              <i class="fas fa-check me-1"></i> Accepter le devis
            </button>
            <button class="btn btn-danger" style="background:#DC2626; color:white;" (click)="rejectQuote(selectedRequest.id)">
              <i class="fas fa-times me-1"></i> Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    :host { display: block; }
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 420px;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      background: var(--bg-primary);
    }
    .chat-messages {
      flex-grow: 1;
      padding: 1.5rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .chat-bubble {
      max-width: 70%;
      padding: 0.8rem 1.2rem;
      border-radius: var(--border-radius-md);
      font-size: 0.9rem;
    }
    .chat-bubble.sent {
      align-self: flex-end;
      background-color: var(--primary-color);
      color: var(--bg-white);
      border-bottom-right-radius: 2px;
    }
    .chat-bubble.received {
      align-self: flex-start;
      background-color: var(--bg-white);
      color: var(--text-main);
      border: 1px solid var(--border-color);
      border-bottom-left-radius: 2px;
    }
    .chat-input-area {
      display: flex;
      padding: 1rem;
      background: var(--bg-white);
      border-top: 1px solid var(--border-color);
      gap: 1rem;
    }
    `
  ]
})
export class ClientDashboardComponent implements OnInit {
  activeTab: 'quotes' | 'chat' = 'quotes';
  clientRequests: any[] = [];
  clientId = 'cli_1';
  clientName = 'Sophie Laurent';
  clientInitials = 'SL';
  clientOrg = '';
  clientEmail = 'sophie.l@gmail.com';

  invoiceModalOpen = false;
  selectedRequest: any = null;

  messages = [
    {
      sender: 'pierre',
      senderName: 'Pierre Kiki',
      time: '10:30',
      text: "Bonjour Sophie, nous avons bien reçu votre demande pour la salle La Diva. Notre équipe prépare actuellement la proposition commerciale. N'hésitez pas si vous avez des précisions à apporter !"
    }
  ];
  newChatText = '';

  constructor(private dataService: KikiDataService, private router: Router) {}

  ngOnInit(): void {
    const logged = localStorage.getItem('kiki_current_client_id') || 'cli_1';
    this.clientId = logged;
    const clients = this.dataService.getClients();
    const c = clients.find((item: any) => item.id === logged);
    if (c) {
      this.clientName = c.name;
      this.clientEmail = c.email;
      this.clientOrg = c.organization || '';
      this.clientInitials = c.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    this.loadRequests();
  }

  loadRequests(): void {
    const all = this.dataService.getRequests();
    this.clientRequests = all.filter((r: any) => r.clientId === this.clientId);
  }

  getPrestationName(id: string): string {
    const names: Record<string, string> = {
      'traiteur': 'Service Traiteur Prestige',
      'evenements': 'Organisation d\'Événements',
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
      'traiteur': 15000,
      'evenements': 20000,
      'salle-diva': 25000,
      'decoration': 5000,
      'location': 3000,
      'takeaway': 8000,
      'foodtruck': 12000
    };
    return prices[id] || 15000;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'quoted': return 'Devis Prêt';
      case 'accepted': return 'Accepté';
      case 'rejected': return 'Refusé';
      default: return 'En attente';
    }
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'quoted': return 'badge-quoted';
      case 'accepted': return 'badge-accepted';
      case 'rejected': return 'badge-rejected';
      default: return 'badge-pending';
    }
  }

  formatDate(d: string): string {
    if (!d) return '';
    try {
      return new Date(d).toLocaleDateString('fr-FR');
    } catch {
      return d;
    }
  }

  openInvoiceModal(req: any): void {
    this.selectedRequest = req;
    this.invoiceModalOpen = true;
  }

  closeInvoiceModal(): void {
    this.invoiceModalOpen = false;
    this.selectedRequest = null;
  }

  printInvoice(): void {
    window.print();
  }

  acceptQuote(id: string): void {
    this.dataService.updateRequestStatus(id, 'accepted');
    this.dataService.showToast('Vous avez accepté le devis ! Merci pour votre confiance.');
    this.loadRequests();
    if (this.selectedRequest && this.selectedRequest.id === id) {
      this.selectedRequest.status = 'accepted';
    }
  }

  rejectQuote(id: string): void {
    this.dataService.updateRequestStatus(id, 'rejected');
    this.dataService.showToast('Le devis a été refusé.');
    this.loadRequests();
    if (this.selectedRequest && this.selectedRequest.id === id) {
      this.selectedRequest.status = 'rejected';
    }
  }

  sendMessage(): void {
    if (!this.newChatText.trim()) return;
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    this.messages.push({
      sender: 'me',
      senderName: this.clientName,
      time: timeStr,
      text: this.newChatText.trim()
    });
    this.newChatText = '';
    this.dataService.showToast('Message envoyé au responsable Kiki Traiteur.');
    setTimeout(() => {
      const box = document.getElementById('chat-box');
      if (box) box.scrollTop = box.scrollHeight;
    }, 50);
  }

  logout(): void {
    localStorage.removeItem('kiki_current_client_id');
    this.dataService.showToast('Déconnexion effectuée.');
    this.router.navigate(['/auth'], { queryParams: { type: 'client' } });
  }
}
