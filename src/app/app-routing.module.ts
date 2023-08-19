import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { DatosPersonalesComponent } from './modules/datos-personales/datos-personales.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    // children :[
    //   {
    //     path: '', component: DatosPersonalesComponent,
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
