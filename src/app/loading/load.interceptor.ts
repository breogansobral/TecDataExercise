// loading.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { LoadService } from './load.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private loadService: LoadService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('X-LOADING') === 'false') {
      return next.handle(req);
    }
    this.loadService.show();
    return next.handle(req).pipe(
      delay(500),
      finalize(() => this.loadService.hide())
    );
  }
}
