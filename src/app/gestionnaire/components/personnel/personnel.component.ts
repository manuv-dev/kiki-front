import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminPersonnelService, AdminUserResponse, AdminCreateUserRequest, AdminUpdateUserRequest } from '../../services/admin-personnel.service';
import { KikiDataService } from '../../../services/kiki-data.service';

const CACHE_KEY = 'kiki_personnel_cache';

/** Liste des postes disponibles pour le personnel */
export const POSTES_PERSONNEL = [
  { value: 'RESPONSABLE_CUISINE', label: 'Responsable Cuisine' },
  { value: 'SOUS_CHEF',           label: 'Sous-Chef Cuisinier' },
  { value: 'ECONOME',             label: 'Economes' },
  { value: 'MAGASINIER',          label: 'Magasiniers' },
  { value: 'CONTROLEUR',          label: 'Contrôleurs' },
  { value: 'CUISINIER',           label: 'Cuisiniers' },
  { value: 'SERVEUR',             label: 'Serveurs' },
  { value: 'AIDE_CUISINIER',      label: 'Aide Cuisiniers' },
  { value: 'CHAUFFEUR',           label: 'Chauffeurs' },
  { value: 'PLONGEUR',            label: 'Plongeurs' },
  { value: 'AGENT_SECURITE',      label: 'Agents de Sécurité' },
  { value: 'GESTIONNAIRE',        label: 'Gestionnaire (Accès Back-office)' },
];

/** Labels lisibles pour les rôles */
export const ROLE_LABELS: Record<string, string> = {
  ADMIN:              'Administrateur',
  GESTIONNAIRE:       'Gestionnaire',
  PERSONNEL:          'Personnel',
  RESPONSABLE_CUISINE:'Responsable Cuisine',
  SOUS_CHEF:          'Sous-Chef Cuisinier',
  ECONOME:            'Econome',
  MAGASINIER:         'Magasinier',
  CONTROLEUR:         'Contrôleur',
  CUISINIER:          'Cuisinier',
  SERVEUR:            'Serveur',
  AIDE_CUISINIER:     'Aide Cuisinier',
  CHAUFFEUR:          'Chauffeur',
  PLONGEUR:           'Plongeur',
  AGENT_SECURITE:     'Agent de Sécurité',
};

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit, OnDestroy {
  staffList: AdminUserResponse[] = [];
  loading = false;       // true seulement si aucune donnée en cache
  refreshing = false;    // indicateur discret de rafraîchissement en arrière-plan

  showModal = false;
  isEditing = false;
  isSubmitting = false;

  /** Résultat d'un reset d'accès, affiché dans une modal dédiée */
  resetResult: AdminUserResponse | null = null;
  showResetModal = false;

  formData: any = {
    id: null,
    fullName: '',
    username: '',
    role: 'RESPONSABLE_CUISINE',
    active: true
  };

  newlyCreatedUser: AdminUserResponse | null = null;

  /** Expose la liste des postes au template */
  readonly postes = POSTES_PERSONNEL;
  readonly roleLabels = ROLE_LABELS;

  private subs: Subscription[] = [];

  constructor(
    private personnelService: AdminPersonnelService,
    private toast: KikiDataService
  ) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  loadStaff(silent = false): void {
    // Afficher le cache immédiatement si disponible
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        this.staffList = JSON.parse(cached);
      } catch { /* ignore */ }
    }

    // Montrer le spinner seulement si pas de cache
    if (!cached && !silent) {
      this.loading = true;
    } else if (!silent) {
      this.refreshing = true;
    }

    const sub = this.personnelService.getAllStaff().subscribe({
      next: (data) => {
        this.staffList = data;
        this.loading = false;
        this.refreshing = false;
        // Mettre à jour le cache
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      },
      error: () => {
        this.toast.showToast('Erreur lors du chargement du personnel.');
        this.loading = false;
        this.refreshing = false;
      }
    });
    this.subs.push(sub);
  }

  getRoleLabel(role: string): string {
    return this.roleLabels[role] || role;
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.newlyCreatedUser = null;
    this.isSubmitting = false;
    this.formData = { id: null, fullName: '', username: '', role: 'RESPONSABLE_CUISINE', active: true };
    this.showModal = true;
  }

  openEditModal(user: AdminUserResponse): void {
    this.isEditing = true;
    this.newlyCreatedUser = null;
    this.isSubmitting = false;
    this.formData = {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      role: user.role,
      active: user.active
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.isSubmitting = false;
    this.newlyCreatedUser = null;
  }

  saveUser(): void {
    // Prévenir les doubles soumissions
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    if (this.isEditing) {
      const request: AdminUpdateUserRequest = {
        fullName: this.formData.fullName,
        username: this.formData.username,
        role: this.formData.role,
        active: this.formData.active
      };

      const sub = this.personnelService.updateStaffUser(this.formData.id, request).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.toast.showToast('Utilisateur mis à jour avec succès.');
          this.closeModal();
          this.loadStaff(true); // rafraîchissement silencieux
        },
        error: (err) => {
          this.isSubmitting = false;
          this.toast.showToast(err.error?.message || 'Erreur lors de la mise à jour.');
        }
      });
      this.subs.push(sub);
    } else {
      const request: AdminCreateUserRequest = {
        fullName: this.formData.fullName,
        username: this.formData.username,
        role: this.formData.role
      };

      const sub = this.personnelService.createStaffUser(request).subscribe({
        next: (createdUser) => {
          this.isSubmitting = false;
          this.newlyCreatedUser = createdUser;
          // Ne pas fermer la modal : l'admin doit voir et copier le mot de passe
        },
        error: (err) => {
          this.isSubmitting = false;
          this.toast.showToast(err.error?.message || 'Erreur lors de la création.');
        }
      });
      this.subs.push(sub);
    }
  }

  deleteUser(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.')) {
      const sub = this.personnelService.deleteStaffUser(id).subscribe({
        next: () => {
          this.toast.showToast('Utilisateur supprimé.');
          this.loadStaff(true);
        },
        error: (err) => {
          this.toast.showToast(err.error?.message || 'Erreur lors de la suppression.');
        }
      });
      this.subs.push(sub);
    }
  }

  /**
   * Réinitialise l'accès d'un utilisateur :
   * génère un nouveau mot de passe temporaire et ouvre la modal de résultat.
   */
  resetAccess(user: AdminUserResponse): void {
    if (!confirm(`Réinitialiser l'accès de ${user.fullName} ? Un nouveau mot de passe temporaire sera généré.`)) return;
    const sub = this.personnelService.resetAccess(user.id).subscribe({
      next: (result) => {
        this.resetResult = result;
        this.showResetModal = true;
        this.loadStaff(true);
      },
      error: (err) => {
        this.toast.showToast(err.error?.message || 'Erreur lors de la réinitialisation.');
      }
    });
    this.subs.push(sub);
  }

  closeResetModal(): void {
    this.showResetModal = false;
    this.resetResult = null;
  }

  /**
   * Active ou désactive un compte en 1 clic.
   */
  toggleActive(user: AdminUserResponse): void {
    const action = user.active ? 'bloquer' : 'activer';
    if (!confirm(`Voulez-vous ${action} le compte de ${user.fullName} ?`)) return;
    const sub = this.personnelService.toggleActive(user.id, !user.active).subscribe({
      next: (updated) => {
        // Mise à jour locale immédiate
        const idx = this.staffList.findIndex(s => s.id === updated.id);
        if (idx !== -1) this.staffList[idx] = updated;
        this.toast.showToast(`Compte ${updated.active ? 'activé' : 'bloqué'} avec succès.`);
        // Mettre à jour le cache
        localStorage.setItem('kiki_personnel_cache', JSON.stringify(this.staffList));
      },
      error: (err) => {
        this.toast.showToast(err.error?.message || 'Erreur lors du changement de statut.');
      }
    });
    this.subs.push(sub);
  }

  /**
   * Copie le lien de connexion dans le presse-papier.
   */
  copyLoginUrl(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      this.toast.showToast('Lien de connexion copié !');
    });
  }
}
