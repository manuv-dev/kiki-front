import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GestionnaireDemandeDto {
  id: number;
  clientId: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientType: string;
  clientOrganization?: string;
  prestationId: string;
  prestationTitle: string;
  date: string;
  time: string;
  guests: number;
  isInstitution?: boolean;
  organization?: string;
  location?: string;
  cuisine?: string;
  message?: string;
  status: string;
  dateSubmitted: string;
}

export interface DashboardStatsDto {
  totalRequests: number;
  acceptedRequests: number;
  pendingRequests: number;
  rejectedRequests: number;
  conversionRate: number;
  totalRevenue: number;
  totalClients: number;
  particuliersCount: number;
  entreprisesCount: number;
  recentRequests: GestionnaireDemandeDto[];
}

export interface UpdateStatusRequestDto {
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class GestionnaireApiService {
  private apiUrl = 'https://kiki-backend-iuyo.onrender.com/api/gestionnaire';

  constructor(private http: HttpClient) {}

  getAllDemandes(): Observable<GestionnaireDemandeDto[]> {
    return this.http.get<GestionnaireDemandeDto[]>(`${this.apiUrl}/demandes`);
  }

  getDemandeById(id: number): Observable<GestionnaireDemandeDto> {
    return this.http.get<GestionnaireDemandeDto>(`${this.apiUrl}/demandes/${id}`);
  }

  updateStatus(id: number, status: string): Observable<GestionnaireDemandeDto> {
    return this.http.put<GestionnaireDemandeDto>(`${this.apiUrl}/demandes/${id}/status`, { status });
  }

  getDashboardStats(): Observable<DashboardStatsDto> {
    return this.http.get<DashboardStatsDto>(`${this.apiUrl}/dashboard/stats`);
  }

  createOrUpdateDevis(devis: any): Observable<any> {
    return this.http.post<any>('https://kiki-backend-iuyo.onrender.com/api/devis', devis);
  }

  getDevisByDemandeId(demandeId: number): Observable<any> {
    return this.http.get<any>(`https://kiki-backend-iuyo.onrender.com/api/devis/demande/${demandeId}`);
  }

  getAllDevis(): Observable<any[]> {
    return this.http.get<any[]>('https://kiki-backend-iuyo.onrender.com/api/devis');
  }

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>('https://kiki-backend-iuyo.onrender.com/api/client/clients');
  }

  // --- FAQs ---
  getFaqs(): Observable<any[]> {
    return this.http.get<any[]>('https://kiki-backend-iuyo.onrender.com/api/faqs');
  }

  createFaq(faq: any): Observable<any> {
    return this.http.post<any>('https://kiki-backend-iuyo.onrender.com/api/faqs', faq);
  }

  updateFaq(id: number | string, faq: any): Observable<any> {
    return this.http.put<any>(`https://kiki-backend-iuyo.onrender.com/api/faqs/${id}`, faq);
  }

  deleteFaq(id: number | string): Observable<void> {
    return this.http.delete<void>(`https://kiki-backend-iuyo.onrender.com/api/faqs/${id}`);
  }

  // --- Témoignages ---
  getTemoignages(): Observable<any[]> {
    return this.http.get<any[]>('https://kiki-backend-iuyo.onrender.com/api/temoignages');
  }

  createTemoignage(t: any): Observable<any> {
    return this.http.post<any>('https://kiki-backend-iuyo.onrender.com/api/temoignages', t);
  }

  updateTemoignage(id: number | string, t: any): Observable<any> {
    return this.http.put<any>(`https://kiki-backend-iuyo.onrender.com/api/temoignages/${id}`, t);
  }

  deleteTemoignage(id: number | string): Observable<void> {
    return this.http.delete<void>(`https://kiki-backend-iuyo.onrender.com/api/temoignages/${id}`);
  }
}
