import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminPersonnelService, AdminUserResponse, AdminCreateUserRequest, AdminUpdateUserRequest } from '../../services/admin-personnel.service';
import { KikiDataService } from '../../../services/kiki-data.service';

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  staffList: AdminUserResponse[] = [];
  loading = false;
  
  showModal = false;
  isEditing = false;
  
  formData: any = {
    id: null,
    fullName: '',
    username: '',
    role: 'PERSONNEL',
    active: true
  };
  
  newlyCreatedUser: AdminUserResponse | null = null;

  constructor(
    private personnelService: AdminPersonnelService,
    private toast: KikiDataService
  ) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.loading = true;
    this.personnelService.getAllStaff().subscribe({
      next: (data) => {
        this.staffList = data;
        this.loading = false;
      },
      error: (err) => {
        this.toast.showToast('Erreur lors du chargement du personnel.');
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.newlyCreatedUser = null;
    this.formData = { id: null, fullName: '', username: '', role: 'PERSONNEL', active: true };
    this.showModal = true;
  }

  openEditModal(user: AdminUserResponse): void {
    this.isEditing = true;
    this.newlyCreatedUser = null;
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
  }

  saveUser(): void {
    if (this.isEditing) {
      const request: AdminUpdateUserRequest = {
        fullName: this.formData.fullName,
        username: this.formData.username,
        role: this.formData.role,
        active: this.formData.active
      };
      
      this.personnelService.updateStaffUser(this.formData.id, request).subscribe({
        next: (updatedUser) => {
          this.toast.showToast('Utilisateur mis à jour avec succès.');
          this.loadStaff();
          this.closeModal();
        },
        error: (err) => {
          this.toast.showToast(err.error?.message || 'Erreur lors de la mise à jour.');
        }
      });
    } else {
      const request: AdminCreateUserRequest = {
        fullName: this.formData.fullName,
        username: this.formData.username,
        role: this.formData.role
      };
      
      this.personnelService.createStaffUser(request).subscribe({
        next: (createdUser) => {
          this.toast.showToast('Utilisateur créé avec succès.');
          this.newlyCreatedUser = createdUser;
          this.loadStaff();
          // On ne ferme pas la modal pour laisser l'admin copier le mot de passe
        },
        error: (err) => {
          this.toast.showToast(err.error?.message || 'Erreur lors de la création.');
        }
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.')) {
      this.personnelService.deleteStaffUser(id).subscribe({
        next: () => {
          this.toast.showToast('Utilisateur supprimé.');
          this.loadStaff();
        },
        error: (err) => {
          this.toast.showToast(err.error?.message || 'Erreur lors de la suppression.');
        }
      });
    }
  }
}
