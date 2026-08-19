import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionnaireDataService } from '../../services/gestionnaire-data.service';
import { KikiDataService } from '../../../services/kiki-data.service';
import { GestionnaireApiService } from '../../../services/gestionnaire-api.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  clientPage = 1;
  clientPageSize = 5;
  showEditClientModal = false;
  editingClient: any = null;

  showViewClientModal = false;
  viewingClient: any = null;
  clientRequests: any[] = [];

  showCreateClientModal = false;
  isCreating = false;
  isEditing = false;
  showDeleteClientModal = false;
  deletingClient: any = null;
  isDeleting = false;
  newClientForm: { name: string, email: string, phone: string, type: string, organization: string } = {
    name: '',
    email: '',
    phone: '',
    type: 'particulier',
    organization: ''
  };

  constructor(
    public gData: GestionnaireDataService, 
    private dataService: KikiDataService,
    private apiService: GestionnaireApiService
  ) {}

  ngOnInit(): void {
    this.gData.loadAll();
    this.gData.clients$.subscribe(c => this.clients = c);
  }

  getClientsForPage(): any[] { const start = (this.clientPage - 1) * this.clientPageSize; return this.clients.slice(start, start + this.clientPageSize); }
  getClientTotalPages(): number { return Math.max(1, Math.ceil(this.clients.length / this.clientPageSize)); }
  getClientPageArray(): number[] { return Array.from({ length: this.getClientTotalPages() }, (_, i) => i + 1); }

  openEditClientModal(c: any): void { 
    this.closeViewClientModal();
    this.closeCreateClientModal();
    this.editingClient = { ...c }; 
    this.isEditing = false;
    this.showEditClientModal = true; 
  }
  closeEditClientModal(): void { this.showEditClientModal = false; this.editingClient = null; }

  openViewClientModal(c: any): void {
    this.closeEditClientModal();
    this.closeCreateClientModal();
    this.viewingClient = { ...c };
    // Get requests for this client
    const allRequests = this.gData.requests || [];
    this.clientRequests = allRequests.filter(req => String(req.clientId) === String(c.id));
    this.showViewClientModal = true;
  }
  
  closeViewClientModal(): void {
    this.showViewClientModal = false;
    this.viewingClient = null;
    this.clientRequests = [];
  }

  submitEditClient(): void {
    if (!this.editingClient || this.isEditing) return;
    this.isEditing = true;
    
    // Call the real backend API endpoint
    this.apiService.updateClient(this.editingClient.id, this.editingClient).subscribe({
      next: () => {
        this.isEditing = false;
        this.showEditClientModal = false;
        this.dataService.showToast('Client mis à jour avec succès.');
        this.gData.loadAll();
      },
      error: (err: any) => {
        this.isEditing = false;
        console.error("API Update Error:", err);
        let msg = 'Erreur lors de la mise à jour.';
        if (err.error && typeof err.error === 'string') {
          msg = err.error;
        } else if (err.error && err.error.message) {
          msg = err.error.message;
        } else if (err.message) {
          msg = err.message;
        }
        this.dataService.showToast(msg, true);
        this.showEditClientModal = false;
      }
    });
  }

  openCreateClientModal(): void {
    this.closeViewClientModal();
    this.closeEditClientModal();
    this.newClientForm = { name: '', email: '', phone: '', type: 'particulier', organization: '' };
    this.showCreateClientModal = true;
  }

  closeCreateClientModal(): void {
    this.showCreateClientModal = false;
  }

  submitCreateClient(): void {
    if (!this.newClientForm.name || !this.newClientForm.email) {
      this.dataService.showToast('Le nom et l\'email sont requis.', true);
      return;
    }
    if (this.newClientForm.type === 'entreprise' && !this.newClientForm.organization) {
      this.dataService.showToast('Le nom de l\'entreprise est requis.', true);
      return;
    }
    if (this.isCreating) return; // Prévenir le double clic

    this.isCreating = true;
    this.apiService.createClient(this.newClientForm).subscribe({
      next: () => {
        this.isCreating = false;
        this.closeCreateClientModal();
        this.dataService.showToast('Client créé avec succès.');
        this.gData.loadAll(); // Rafraîchir la liste
      },
      error: (err: any) => {
        this.isCreating = false;
        const msg = err.error?.message || err.error || 'Erreur lors de la création du client.';
        this.dataService.showToast(msg, true);
      }
    });
  }

  openDeleteClientModal(c: any): void {
    this.closeViewClientModal();
    this.closeEditClientModal();
    this.closeCreateClientModal();
    this.deletingClient = { ...c };
    this.showDeleteClientModal = true;
    this.isDeleting = false;
  }

  closeDeleteClientModal(): void {
    this.showDeleteClientModal = false;
    this.deletingClient = null;
  }

  confirmDeleteClient(): void {
    if (!this.deletingClient || this.isDeleting) return;
    this.isDeleting = true;

    this.apiService.deleteClient(this.deletingClient.id).subscribe({
      next: () => {
        this.dataService.showToast('Client supprimé avec succès.');
        this.closeDeleteClientModal();
        this.gData.loadAll();
      },
      error: (err: any) => {
        this.isDeleting = false;
        console.error("Erreur suppression client:", err);
        let msg = 'Erreur lors de la suppression.';
        if (err.error && typeof err.error === 'string') {
          msg = err.error;
        } else if (err.error && err.error.message) {
          msg = err.error.message;
        }
        this.dataService.showToast(msg, true);
        this.closeDeleteClientModal();
      }
    });
  }
}
