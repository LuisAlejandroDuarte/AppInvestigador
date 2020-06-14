import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuRoutes } from './menu.routing';
import { MenuComponent } from './menu/menu.component';
import { SharedAlerta } from '../alerta/alerta.module';
import { AuthGuard } from '../guards/auth.guard';
import { MenuConvocatoriaComponent } from './menuconvocatoria/menuconvocatoria.component';
import { SemilleroComponent } from './semillero/semillero.component';
import { GrupoComponent } from './grupo/grupo.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MenuRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedAlerta
   
  ],
  declarations: [
    MenuComponent,
    MenuConvocatoriaComponent,
    SemilleroComponent,
    GrupoComponent    
  ],
  providers:[AuthGuard]
})

export class MenuModule {}
