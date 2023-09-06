// api-limit.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const API_MAIN = environment.MAIN_URL;
const API_CONSULTAR_TOKEN_CODIGO_DACTILAR = environment.API_CONSULTAR_TOKEN_CODIGO_DACTILAR;

@Injectable()
export class RequestLimitInterceptor implements HttpInterceptor {
  private requestCount = 0;
  private maxRequests = 2;
  private apiBaseUrl = `${API_MAIN + API_CONSULTAR_TOKEN_CODIGO_DACTILAR}`;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === this.apiBaseUrl) {
      if (this.requestCount >= this.maxRequests) {
        return throwError(null);
      }

      this.requestCount++;
    }

    return next.handle(req);
  }
}
