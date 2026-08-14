import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KikiDataService } from '../../../services/kiki-data.service';
import { GestionnaireApiService } from '../../../services/gestionnaire-api.service';
import { ActivatedRoute } from '@angular/router';

export interface PropositionSectionItem {
  id?: number;
  nom: string;
  description: string;
}

export interface PropositionSection {
  id?: number;
  nom: string;
  maxChoix: number;
  items: PropositionSectionItem[];
}

export interface Proposition {
  id?: number;
  titre: string;
  description: string;
  prixUnitairePersonne: number;
  imageUrl?: string;
  sections: PropositionSection[];
}

@Component({
  selector: 'app-propositions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.css']
})
export class PropositionsComponent implements OnInit {
  propositions: Proposition[] = [];
  envoyees: any[] = [];
  selectedProposition: Proposition | null = null;
  isEditing = false;
  isAdding = false;
  
  loading = false;
  activeTab = 'catalogue'; // 'catalogue' | 'envoyees'

  constructor(
    private apiService: GestionnaireApiService,
    private dataService: KikiDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });
    this.loadPropositions();
    this.loadEnvoyees();
  }

  loadEnvoyees() {
    this.apiService.getPropositionsEnvoyees().subscribe({
      next: (res) => {
        this.envoyees = res;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des propositions envoyées', err);
      }
    });
  }

  loadPropositions() {
    this.loading = true;
    this.apiService.getPropositions().subscribe({
      next: (res) => {
        this.propositions = res;
        this.loading = false;
      },
      error: (err) => {
        this.dataService.showToast("Erreur lors du chargement des propositions", true);
        console.error(err);
        this.loading = false;
      }
    });
  }

  openAddModal() {
    this.selectedProposition = {
      titre: '',
      description: '',
      prixUnitairePersonne: 0,
      sections: []
    };
    this.isAdding = true;
    this.isEditing = true;
  }

  openEditModal(prop: Proposition) {
    // Deep copy to avoid mutating the list directly before saving
    this.selectedProposition = JSON.parse(JSON.stringify(prop));
    this.isAdding = false;
    this.isEditing = true;
  }

  closeModal() {
    this.isEditing = false;
    this.selectedProposition = null;
  }

  addSection() {
    if (this.selectedProposition) {
      this.selectedProposition.sections.push({
        nom: '',
        maxChoix: 1,
        items: []
      });
    }
  }

  removeSection(index: number) {
    if (this.selectedProposition) {
      this.selectedProposition.sections.splice(index, 1);
    }
  }

  addItem(section: PropositionSection) {
    section.items.push({
      nom: '',
      description: ''
    });
  }

  removeItem(section: PropositionSection, index: number) {
    section.items.splice(index, 1);
  }

  saveProposition() {
    if (!this.selectedProposition) return;

    if (this.isAdding) {
      this.apiService.createProposition(this.selectedProposition).subscribe({
        next: (res) => {
          this.dataService.showToast("Proposition ajoutée avec succès");
          this.loadPropositions();
          this.closeModal();
        },
        error: (err) => {
          this.dataService.showToast("Erreur lors de l'ajout", true);
          console.error(err);
        }
      });
    } else {
      if (this.selectedProposition.id) {
        this.apiService.updateProposition(this.selectedProposition.id, this.selectedProposition).subscribe({
          next: (res) => {
            this.dataService.showToast("Proposition mise à jour avec succès");
            this.loadPropositions();
            this.closeModal();
          },
          error: (err) => {
            this.dataService.showToast("Erreur lors de la modification", true);
            console.error(err);
          }
        });
      }
    }
  }

  deleteProposition(id: number | undefined) {
    if (!id) return;
    if (confirm("Êtes-vous sûr de vouloir supprimer cette proposition ?")) {
      this.apiService.deleteProposition(id).subscribe({
        next: () => {
          this.dataService.showToast("Proposition supprimée");
          this.loadPropositions();
        },
        error: (err) => {
          this.dataService.showToast("Erreur lors de la suppression", true);
          console.error(err);
        }
      });
    }
  }
}
