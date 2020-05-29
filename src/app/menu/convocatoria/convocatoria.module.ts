import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConvocatoriaRoutes } from './convocatoria.routing';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ConvocatoriaRoutes),
  ]
})
export class ConvocatoriaModule { }
