import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  private snackBar = inject(MatSnackBar);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        console.log(event);
        if (event instanceof HttpResponse && event.status === 201) {
          this.snackBar.open(`Se ha creado el SuperHeroe: ${event.body.name}`, 'Cerrar', {
            duration: 2000,
          });
        } else if(event instanceof HttpErrorResponse) {
          this.snackBar.open(`Ha sucedido un error: ${event.error}`, 'Cerrar', {
            duration: 2000,
          });
        }
      })
    );
  }
}
