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
  urgentRequests: number;
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
  private apiUrl = 'http://localhost:8080/api/gestionnaire';
  private devisApiUrl = 'http://localhost:8080/api/devis';

  constructor(private http: HttpClient) {}

  getAllDemandes(): Observable<GestionnaireDemandeDto[]> {
    return this.http.get<GestionnaireDemandeDto[]>(`${this.apiUrl}/demandes`);
  }

  getDemandeById(id: number): Observable<GestionnaireDemandeDto> {
    return this.http.get<GestionnaireDemandeDto>(`${this.apiUrl}/demandes/${id}`);
  }

  createDevisDirectly(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/devis/direct`, payload);
  }

  updateStatus(id: number, status: string): Observable<GestionnaireDemandeDto> {
    return this.http.put<GestionnaireDemandeDto>(`${this.apiUrl}/demandes/${id}/status`, { status });
  }

  createDemande(demande: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/client/devis', demande);
  }

  getDashboardStats(): Observable<DashboardStatsDto> {
    return this.http.get<DashboardStatsDto>(`${this.apiUrl}/dashboard/stats`);
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clients`, clientData);
  }

  createOrUpdateDevis(devis: any): Observable<any> {
    return this.http.post<any>(this.devisApiUrl, devis);
  }

  getDevisByDemandeId(demandeId: number): Observable<any> {
    return this.http.get<any>(`${this.devisApiUrl}/demande/${demandeId}`);
  }

  getAllDevis(): Observable<any[]> {
    return this.http.get<any[]>(this.devisApiUrl);
  }

  /**
   * Envoie le devis PDF par email depuis le backend Spring Boot
   * (Gmail SMTP → contact@kikitraiteursenegal.net → client)
   */
  sendDevisEmail(devisId: number): Observable<{ status: string; message: string }> {
    return this.http.post<{ status: string; message: string }>(
      `${this.devisApiUrl}/${devisId}/sendMail`,
      {}
    );
  }

  /**
   * Télécharge le PDF du devis depuis l'API (retourne un Blob)
   */
  downloadDevisPdf(devisId: number): Observable<Blob> {
    return this.http.get(`${this.devisApiUrl}/${devisId}/pdf`, {
      responseType: 'blob'
    });
  }

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/client/clients');
  }

  // --- FAQs ---
  getFaqs(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/faqs');
  }

  createFaq(faq: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/faqs', faq);
  }

  updateFaq(id: number | string, faq: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/faqs/${id}`, faq);
  }

  deleteFaq(id: number | string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/faqs/${id}`);
  }

  // --- Témoignages ---
  getTemoignages(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/temoignages');
  }

  createTemoignage(t: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/temoignages', t);
  }

  updateTemoignage(id: number | string, t: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/temoignages/${id}`, t);
  }

  deleteTemoignage(id: number | string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/temoignages/${id}`);
  }
}
