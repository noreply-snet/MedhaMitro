import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CasheService } from '../../shared/services/shared/cashe.service';

export const cashApisInterceptor: HttpInterceptorFn = (req: HttpRequest<any>,next: HttpHandlerFn): Observable<any> => {
  // Inject the CacheService
  const cacheService = inject(CasheService);

  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  // Check if the response is cached
  const cachedResponse = cacheService.get(req.url);
  if (cachedResponse) {

    // Check if the response is cached
    console.log( "Cashe DATA Reviced!! for", req.url);

    return of(cachedResponse.clone());
  }

  // If not cached, make the request and cache the response
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cacheService.set(req.url, event.clone());
      }
    })
  );
};
