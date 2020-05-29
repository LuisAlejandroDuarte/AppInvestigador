import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrarRoutes } from './administrar.routing';
import { SharedAlerta } from 'src/app/alerta/alerta.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InvestigadorComponent } from 'src/app/menu/administrar/investigador/investigador.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdministrarComponent } from './administrar.component';
import { LoginService } from 'src/app/login/service';



@NgModule({
  imports: [
    CommonModule,   
    RouterModule.forChild(AdministrarRoutes),
    FormsModule,    
    ReactiveFormsModule,   
    NgbModule, 
    SharedAlerta,
    FontAwesomeModule
  ],
  providers:[AuthGuard,LoginService],
  declarations: [    
    UsuariosComponent,
    InvestigadorComponent,
    AdministrarComponent 
  ]  
})

export class AdministrarModule {}