import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PrimengModule } from './primeng.module';
import { SharedModule } from './shared/shared.module';
import { DatosPersonalesComponent } from './modules/datos-personales/datos-personales.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    HeaderComponent,
    FooterComponent,
    DatosPersonalesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PrimengModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
