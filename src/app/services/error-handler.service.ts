import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  localStorageUtil = new LocalStorageService();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.localStorageUtil.limparDadosLocaisUsuario();
            this.router.navigate(['/usuario/login'], {
              queryParams: { returnUrl: this.router.url },
            });
          }
          if (error.status === 403) {
            this.router.navigate(['/acesso-negado']);
          }
        }
        return throwError(error);
      })
    );
  }
}
