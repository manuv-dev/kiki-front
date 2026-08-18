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
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  clientPage = 1;
  clientPageSize = 5;
  showEditClientModal = false;
  editingClient: any = null;

  showCreateClientModal = false;
  isCreating = false;
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

  openEditClientModal(c: any): void { this.editingClient = { ...c }; this.showEditClientModal = true; }
  closeEditClientModal(): void { this.showEditClientModal = false; this.editingClient = null; }

  submitEditClient(): void {
    if (!this.editingClient) return;
    this.dataService.updateClient(this.editingClient.id, this.editingClient);
    this.dataService.showToast('Client mis à jour.');
    // Keep 2s timeout to align with other popup closing logic
    setTimeout(() => {
      this.showEditClientModal = false;
      this.gData.loadAll();
    }, 2000);
  }

  openCreateClientModal(): void {
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
      error: (err) => {
        this.isCreating = false;
        const msg = err.error?.message || err.error || 'Erreur lors de la création du client.';
        this.dataService.showToast(msg, true);
      }
    });
  }
}
