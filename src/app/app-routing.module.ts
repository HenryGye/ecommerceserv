import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { DatosPersonalesComponent } from './modules/datos-personales/datos-personales.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'compra-en-linea/datos-personales',
    pathMatch: 'full'
  },
  {
    path: 'compra-en-linea',
    component: ContentLayoutComponent,
    children :[
      {
        path: 'datos-personales', component: DatosPersonalesComponent,
      },
      // {
      //   path: 'cobertura', component: CoberturaComponent,
      // },
      // {
      //   path: 'biometria-facial', component: BiometriaFacialComponent,
      // },
      // {
      //   path: 'instalacion', component: InstalacionComponent,
      // }
    ]
  },
  {
    path: '**',
    redirectTo: 'compra-en-linea/datos-personales'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
