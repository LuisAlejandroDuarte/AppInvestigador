import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SemilleroRoutes } from './semillero.routing';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginService } from 'src/app/login/service';
import { SemilleroService } from 'src/app/service/semillero/serviceSemillero';
import { EditSemilleroComponent, CustomDateParserFormatter } from './edit-semillero/edit-semillero.component';
import { SharedAlerta } from 'src/app/alerta/alerta.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { InvestigadorService } from 'src/app/service/investigador/serviceInvestigador';
import { SemilleroLineaService } from 'src/app/service/semillerolinea/service.semillerolinea';
import { LineaService } from 'src/app/service/linea/service.linea';
import { TipoVinculacionService } from 'src/app/service/tipoVinculacion/service.tipovinculacion';
import { SemilleroInvestigadorService } from 'src/app/service/semilleroinvestigador/service.semilleroinvestigador';
import { ServiceSemilleroPrograma } from 'src/app/service/semilleroprograma/service.semilleroprograma';
import { ServiceSemilleroProyectoProducto } from 'src/app/service/semilleroproyecto/service.semilleroproyecto';
import { ProyectoService } from 'src/app/service/proyecto/service.proyecto';
import { ProductoService } from 'src/app/service/producto/service.producto';
import { EstadoProyectoService } from 'src/app/service/estadoproyecto/service.estadoproyecto';
import { EstadoProductoService } from 'src/app/service/estadoproducto/service.estadoproducto';
import { ServiceSemilleroDocumento } from 'src/app/service/semillerodocumento/service.semillerodocumento';

@NgModule({
    declarations: [EditSemilleroComponent],
    imports: [
      CommonModule,
      SharedAlerta,
      NgbModule,
      FormsModule,
      RouterModule.forChild(SemilleroRoutes),
    ],
    providers:[AuthGuard,LoginService,SemilleroService,
      SemilleroLineaService,LineaService,CustomDateParserFormatter,InvestigadorService,
      TipoVinculacionService,SemilleroInvestigadorService,ServiceSemilleroPrograma,
      ServiceSemilleroProyectoProducto,ProyectoService,ProductoService,EstadoProyectoService,
      EstadoProductoService,ServiceSemilleroDocumento]
  })
  export class SemilleroModule { }