import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConvocatoriaRoutes } from './convocatoria.routing';
import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';
import { SharedAlerta } from 'src/app/alerta/alerta.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ConvocatoriaService } from 'src/app/service/convocatoria/service.convocatoria';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginService } from 'src/app/login/service';
import { EditConvocatoriaComponent, CustomDateParserFormatter } from './convocatoria/editconvocatoria/editconvocatoria.component';
import { TipoConvocatoriaService } from 'src/app/service/tipoconvocatoria/service.convocatoria';
import { ConvocatoriaParametroService } from 'src/app/service/convocatoriaparametro/service.convocatoriaparametro';
import { ParametroService } from 'src/app/service/parametro/service.parametro';
import { PropuestaComponent } from './propuesta/propuesta.component';
import { PropouestaService } from 'src/app/service/propuesta/service.propuesta';
import { EditPropuestaComponent } from './propuesta/editpropuesta/editpropuesta.component';
import { InvestigadorService } from 'src/app/service/investigador/serviceInvestigador';
import { TipoVinculacionService } from 'src/app/service/tipoVinculacion/service.tipovinculacion';
import { GrupoService } from 'src/app/service/grupo/serviceGrupo';
import { JuezService } from 'src/app/service/juez/serviceJuez';
import { EvaluarComponent } from './evaluar/evaluar.component';
import { EvaluarPropuestaService } from 'src/app/service/evaluarpropuesta/service.evaluarpropuesta';
import { EditevaluarComponent } from './evaluar/editevaluar/editevaluar.component';



@NgModule({
  declarations: [ConvocatoriaComponent, EditConvocatoriaComponent, PropuestaComponent, EditPropuestaComponent, EvaluarComponent, EditevaluarComponent],
  imports: [
    CommonModule,
      SharedAlerta,
      NgbModule,
      FormsModule,
    RouterModule.forChild(ConvocatoriaRoutes),
  ],
  providers:[AuthGuard,LoginService,ConvocatoriaService,CustomDateParserFormatter,
    TipoConvocatoriaService,ConvocatoriaParametroService,ParametroService,PropouestaService,InvestigadorService,
    TipoVinculacionService,GrupoService,JuezService,EvaluarPropuestaService ]
})
export class ConvocatoriaModule { }
