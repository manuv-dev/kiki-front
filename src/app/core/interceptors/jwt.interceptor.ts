import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

const API_BASE = 'https://kiki-backend-iuyo.onrender.com';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // N'ajouter le token qu'aux requêtes vers notre API
  if (!req.url.startsWith(API_BASE)) {
    return next(req);
  }

  const token = authService.getToken();

  // Routes publiques — pas besoin de token
  const publicRoutes = ['/api/auth/login', '/api/client/devis', '/api/faqs', '/api/temoignages'];
  const isPublic = publicRoutes.some(route => req.url.includes(route));

  if (token && !isPublic) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token expiré ou invalide → déconnexion
        authService.logout();
        router.navigate(['/login'], { queryParams: { expired: true } });
      }
      return throwError(() => error);
    })
  );
};
