import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval, switchMap, startWith } from 'rxjs';
import { AuthService } from '../services/auth.service';

export interface AppNotification {
  id: number;
  type: string;
  message: string;
  demandeId?: number;
  propositionEnvoyeeId?: number;
  lu: boolean;
  createdAt: string;
}

const API_BASE = 'https://kiki-backend-iuyo.onrender.com';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  private countSubject = new BehaviorSubject<number>(0);

  notifications$ = this.notificationsSubject.asObservable();
  count$ = this.countSubject.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) {}

  /**
   * Démarre le polling des notifications toutes les 30 secondes.
   * À appeler depuis le layout gestionnaire au ngOnInit.
   */
  startPolling(): void {
    if (!this.auth.isLoggedIn()) return;

    interval(30000).pipe(
      startWith(0),
      switchMap(() => this.fetchCount())
    ).subscribe({
      next: (data) => this.countSubject.next(data.count || 0),
      error: (e) => console.warn('Erreur polling notifications:', e)
    });
  }

  /** Récupère les notifications non lues */
  getUnread(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${API_BASE}/api/notifications`);
  }

  /** Nombre de notifications non lues */
  fetchCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${API_BASE}/api/notifications/count`);
  }

  /** Charge et met à jour le sujet */
  loadNotifications(): void {
    this.getUnread().subscribe({
      next: (notifs) => {
        this.notificationsSubject.next(notifs);
        this.countSubject.next(notifs.length);
      },
      error: (e) => console.warn('Erreur chargement notifications:', e)
    });
  }

  /** Marque une notification comme lue */
  markAsRead(id: number): Observable<void> {
    return this.http.put<void>(`${API_BASE}/api/notifications/${id}/read`, {});
  }

  /** Marque toutes comme lues */
  markAllAsRead(): Observable<void> {
    return this.http.put<void>(`${API_BASE}/api/notifications/read-all`, {});
  }

  get count(): number {
    return this.countSubject.value;
  }

  get notifications(): AppNotification[] {
    return this.notificationsSubject.value;
  }
}
