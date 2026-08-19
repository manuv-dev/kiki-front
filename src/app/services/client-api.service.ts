import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DemandeDevisRequestDto {
  name: string;
  email: string;
  phone: string;
  clientType: string;
  organization?: string;
  prestationId: string;
  prestationTitle?: string;
  date: string;
  time: string;
  guests: number;
  isInstitution?: boolean;
  locationType?: string;
  locationDetails?: string;
  cuisine?: string;
  evenementNature?: string;
  message?: string;
}

export interface DemandeDevisResponseDto {
  id: number;
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
    organization?: string;
  };
  prestationId: string;
  prestationTitle: string;
  date: string;
  time: string;
  guests: number;
  isInstitution: boolean;
  organization?: string;
  location: string;
  cuisine: string;
  message: string;
  status: string;
  dateSubmitted: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {
  private apiUrl = 'https://kiki-backend-iuyo.onrender.com/api/client';

  constructor(private http: HttpClient) {}

  creerDemandeDevis(payload: DemandeDevisRequestDto): Observable<DemandeDevisResponseDto> {
    return this.http.post<DemandeDevisResponseDto>(`${this.apiUrl}/devis`, payload);
  }

  getAllDemandes(): Observable<DemandeDevisResponseDto[]> {
    return this.http.get<DemandeDevisResponseDto[]>(`${this.apiUrl}/devis`);
  }

  getDemandesByEmail(email: string): Observable<DemandeDevisResponseDto[]> {
    return this.http.get<DemandeDevisResponseDto[]>(`${this.apiUrl}/devis/client/${email}`);
  }
}
