import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { DatosPersonalesComponent } from './modules/datos-personales/datos-personales.component';
import { CoberturaComponent } from './modules/cobertura/cobertura.component';
import { BiometriaFacialComponent } from './modules/biometria-facial/biometria-facial.component';
import { InstalacionComponent } from './modules/instalacion/instalacion.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorComponent } from './shared/error/error.component';
import { TestComponent } from './modules/test/test.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'compra-en-linea/cobertura',
    pathMatch: 'full'
  },
  {
    path: 'compra-en-linea',
    component: ContentLayoutComponent,
    children :[
      {
        path: 'datos-personales', component: DatosPersonalesComponent,
      },
      {
        path: 'cobertura', component: CoberturaComponent,
      },
      {
        path: 'biometria-facial', component: BiometriaFacialComponent,
      },
      {
        path: 'instalacion', component: InstalacionComponent,
      },
      {
        path: 'test', component: TestComponent
      }
    ]
  },
  {
    path: '**',
    component: ErrorComponent
    // redirectTo: 'compra-en-linea/cobertura'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
