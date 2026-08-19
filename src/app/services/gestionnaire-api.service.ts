import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  propositionIds?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class GestionnaireApiService {
  private apiUrl = 'https://kiki-backend-iuyo.onrender.com/api/gestionnaire';
  private devisApiUrl = 'https://kiki-backend-iuyo.onrender.com/api/devis';

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

  updateStatus(id: number, status: string, propositionIds?: number[]): Observable<GestionnaireDemandeDto> {
    const payload: UpdateStatusRequestDto = { status };
    if (propositionIds) payload.propositionIds = propositionIds;
    return this.http.put<GestionnaireDemandeDto>(`${this.apiUrl}/demandes/${id}/status`, payload);
  }

  getPropositions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/propositions`);
  }

  getPropositionsEnvoyees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/propositions-envoyees`);
  }

  createProposition(prop: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/propositions`, prop);
  }

  updateProposition(id: number, prop: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/propositions/${id}`, prop);
  }

  deleteProposition(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/propositions/${id}`);
  }

  createDemande(demande: any): Observable<any> {
    return this.http.post<any>('https://kiki-backend-iuyo.onrender.com/api/client/devis', demande);
  }

  getDashboardStats(year?: number, month?: number): Observable<DashboardStatsDto> {
    let params = new HttpParams();
    if (year) params = params.set('year', year.toString());
    if (month) params = params.set('month', month.toString());
    return this.http.get<DashboardStatsDto>(`${this.apiUrl}/dashboard/stats`, { params });
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clients`, clientData);
  }

  updateClient(id: number, clientData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/clients/${id}`, clientData);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/clients/${id}`);
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
