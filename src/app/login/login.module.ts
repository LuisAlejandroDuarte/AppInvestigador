import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';
import { SharedAlerta } from '../alerta/alerta.module';
import { LoginService } from './service';
import { UsuarioService } from '../service/usuario/service.usuario';
import { InvestigadorService } from '../service/investigador/serviceInvestigador';



@NgModule({
  imports: [
    CommonModule,   
    FormsModule,
    RouterModule.forChild(LoginRoutes),
    ReactiveFormsModule,
    SharedAlerta
    
  ],
  declarations: [
    LoginComponent   
  ],
  providers:[LoginService,UsuarioService,InvestigadorService]
})
 
export class LoginModule {}
