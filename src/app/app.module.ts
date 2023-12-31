import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrimengModule } from './primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RequestLimitInterceptor } from './interceptors/request-limit.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { DatosPersonalesComponent } from './modules/datos-personales/datos-personales.component';
import { CoberturaComponent } from './modules/cobertura/cobertura.component';
import { BiometriaFacialComponent } from './modules/biometria-facial/biometria-facial.component';
import { InstalacionComponent } from './modules/instalacion/instalacion.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    HeaderComponent,
    FooterComponent,
    DatosPersonalesComponent,
    CoberturaComponent,
    BiometriaFacialComponent,
    InstalacionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PrimengModule,
    SharedModule
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestLimitInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
