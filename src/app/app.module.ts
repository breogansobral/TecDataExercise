import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorPageModule } from './error-page/error-page.module';
import { LoadingInterceptor } from './loading/load.interceptor';
import { LoadingModule } from './loading/loading.module';
import { NotificationInterceptor } from './notification/notification.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ErrorPageModule,
    LoadingModule
  ],
  providers: [
              { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
