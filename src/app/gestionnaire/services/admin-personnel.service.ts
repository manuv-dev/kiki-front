import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminUserResponse {
  id: number;
  username: string;
  fullName: string;
  role: string;
  customLoginSlug: string;
  active: boolean;
  createdAt: string;
  lastLoginAt: string;
  tempPassword?: string;
  loginUrl?: string;
}

export type PersonnelRole =
  'ADMIN' | 'GESTIONNAIRE' | 'PERSONNEL' |
  'RESPONSABLE_CUISINE' | 'SOUS_CHEF' | 'ECONOME' | 'MAGASINIER' |
  'CONTROLEUR' | 'CUISINIER' | 'SERVEUR' | 'AIDE_CUISINIER' |
  'CHAUFFEUR' | 'PLONGEUR' | 'AGENT_SECURITE';

export interface AdminCreateUserRequest {
  fullName: string;
  username: string;
  role: PersonnelRole;
}

export interface AdminUpdateUserRequest {
  fullName: string;
  username: string;
  role: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminPersonnelService {
  private apiUrl = 'https://kiki-backend-iuyo.onrender.com/api/admin/users';

  constructor(private http: HttpClient) {}

  getAllStaff(): Observable<AdminUserResponse[]> {
    return this.http.get<AdminUserResponse[]>(this.apiUrl);
  }

  createStaffUser(data: AdminCreateUserRequest): Observable<AdminUserResponse> {
    return this.http.post<AdminUserResponse>(this.apiUrl, data);
  }

  updateStaffUser(id: number, data: AdminUpdateUserRequest): Observable<AdminUserResponse> {
    return this.http.put<AdminUserResponse>(`${this.apiUrl}/${id}`, data);
  }

  deleteStaffUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
