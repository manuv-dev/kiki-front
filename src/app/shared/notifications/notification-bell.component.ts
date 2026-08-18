import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService, AppNotification } from '../../core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="notif-bell-wrapper" (clickOutside)="closeDropdown()">
      <!-- Bouton cloche -->
      <button class="notif-bell-btn" (click)="toggleDropdown()" [class.has-notif]="count > 0">
        <i class="fas fa-bell"></i>
        <span class="notif-badge" *ngIf="count > 0">{{ count > 99 ? '99+' : count }}</span>
      </button>

      <!-- Dropdown -->
      <div class="notif-dropdown glass-card" *ngIf="isOpen" @dropdownAnim>
        <div class="notif-header">
          <h4>Notifications</h4>
          <button class="mark-all-read" (click)="markAllRead()" *ngIf="count > 0">
            Tout marquer comme lu
          </button>
        </div>

        <div class="notif-list" *ngIf="notifications.length > 0; else empty">
          <div
            class="notif-item"
            *ngFor="let notif of notifications"
            [class.unread]="!notif.lu"
            (click)="onNotifClick(notif)"
          >
            <div class="notif-icon" [ngClass]="getNotifIconClass(notif.type)">
              <i class="fas" [ngClass]="getNotifIcon(notif.type)"></i>
            </div>
            <div class="notif-content">
              <p class="notif-message">{{ notif.message }}</p>
              <span class="notif-time">{{ formatTime(notif.createdAt) }}</span>
            </div>
            <div class="notif-dot" *ngIf="!notif.lu"></div>
          </div>
        </div>

        <ng-template #empty>
          <div class="notif-empty">
            <i class="fas fa-check-circle"></i>
            <p>Aucune notification</p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .notif-bell-wrapper {
      position: relative;
    }

    .notif-bell-btn {
      position: relative;
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      width: 42px; height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #7A1C1C;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 1rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }

    .notif-bell-btn:hover,
    .notif-bell-btn.has-notif {
      background: #7A1C1C;
      border-color: #7A1C1C;
      color: white;
      box-shadow: 0 4px 12px rgba(122, 28, 28, 0.3);
    }

    .notif-bell-btn.has-notif {
      animation: bellShake 1s ease-in-out 2s 3;
    }

    @keyframes bellShake {
      0%, 100% { transform: rotate(0); }
      20% { transform: rotate(-15deg); }
      40% { transform: rotate(15deg); }
      60% { transform: rotate(-8deg); }
      80% { transform: rotate(8deg); }
    }

    .notif-badge {
      position: absolute;
      top: -6px; right: -6px;
      background: #e53e3e;
      color: white;
      font-size: 0.65rem;
      font-weight: 700;
      min-width: 18px;
      height: 18px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      border: 2px solid #1a0a0f;
    }

    .notif-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 340px;
      background: rgba(26, 10, 15, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      z-index: 1000;
      overflow: hidden;
    }

    .notif-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .notif-header h4 {
      font-size: 0.95rem;
      font-weight: 600;
      color: white;
    }

    .mark-all-read {
      background: none;
      border: none;
      color: rgba(196, 93, 42, 0.9);
      font-size: 0.75rem;
      cursor: pointer;
      padding: 0;
      transition: color 0.2s;
    }

    .mark-all-read:hover { color: #c45d2a; }

    .notif-list {
      max-height: 360px;
      overflow-y: auto;
    }

    .notif-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      cursor: pointer;
      transition: background 0.2s;
      border-bottom: 1px solid rgba(255,255,255,0.04);
      position: relative;
    }

    .notif-item:hover { background: rgba(255,255,255,0.05); }

    .notif-item.unread { background: rgba(139, 34, 64, 0.08); }

    .notif-icon {
      width: 36px; height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      flex-shrink: 0;
    }

    .notif-icon.type-new-request { background: rgba(59, 130, 246, 0.2); color: #93c5fd; }
    .notif-icon.type-proposition { background: rgba(245, 158, 11, 0.2); color: #fcd34d; }
    .notif-icon.type-selection { background: rgba(34, 197, 94, 0.2); color: #86efac; }
    .notif-icon.type-aboutie { background: rgba(139, 34, 64, 0.3); color: #f9a8d4; }

    .notif-content { flex: 1; min-width: 0; }

    .notif-message {
      font-size: 0.82rem;
      color: rgba(255,255,255,0.85);
      line-height: 1.4;
      margin-bottom: 0.25rem;
    }

    .notif-time {
      font-size: 0.72rem;
      color: rgba(255,255,255,0.35);
    }

    .notif-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #8b2240;
      flex-shrink: 0;
      margin-top: 6px;
    }

    .notif-empty {
      padding: 2rem;
      text-align: center;
      color: rgba(255,255,255,0.35);
    }

    .notif-empty i { font-size: 2rem; margin-bottom: 0.5rem; color: rgba(34,197,94,0.5); }
    .notif-empty p { font-size: 0.875rem; }
  `]
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  isOpen = false;
  notifications: AppNotification[] = [];
  count = 0;
  private subs: Subscription[] = [];

  constructor(private notifService: NotificationService) {}

  ngOnInit(): void {
    this.notifService.startPolling();

    this.subs.push(
      this.notifService.count$.subscribe(c => this.count = c),
      this.notifService.notifications$.subscribe(n => this.notifications = n)
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.notifService.loadNotifications();
    }
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  onNotifClick(notif: AppNotification): void {
    if (!notif.lu) {
      this.notifService.markAsRead(notif.id).subscribe(() => {
        notif.lu = true;
        this.count = Math.max(0, this.count - 1);
      });
    }
    // Navigation selon le type
    if (notif.demandeId) {
      // TODO: naviguer vers la demande concernée
    }
    this.isOpen = false;
  }

  markAllRead(): void {
    this.notifService.markAllAsRead().subscribe(() => {
      this.notifications.forEach(n => n.lu = true);
      this.count = 0;
    });
  }

  getNotifIcon(type: string): string {
    const icons: Record<string, string> = {
      'NOUVELLE_DEMANDE': 'fa-file-invoice',
      'PROPOSITION_ENVOYEE': 'fa-paper-plane',
      'SELECTION_CLIENT': 'fa-check-double',
      'DEMANDE_ABOUTIE': 'fa-trophy',
      'DEMANDE_REFUSEE': 'fa-times-circle'
    };
    return icons[type] || 'fa-bell';
  }

  getNotifIconClass(type: string): string {
    const classes: Record<string, string> = {
      'NOUVELLE_DEMANDE': 'type-new-request',
      'PROPOSITION_ENVOYEE': 'type-proposition',
      'SELECTION_CLIENT': 'type-selection',
      'DEMANDE_ABOUTIE': 'type-aboutie',
    };
    return classes[type] || 'type-new-request';
  }

  formatTime(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return 'À l\'instant';
      if (diffMins < 60) return `Il y a ${diffMins} min`;
      if (diffMins < 1440) return `Il y a ${Math.floor(diffMins / 60)}h`;
      return date.toLocaleDateString('fr-FR');
    } catch {
      return '';
    }
  }
}
