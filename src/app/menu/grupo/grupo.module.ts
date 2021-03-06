import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GrupoRoutes } from './grupo.routing';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginService } from 'src/app/login/service';
import { EditGrupoComponent, CustomDateParserFormatter } from './edit-grupo/edit-grupo.component';
import { SharedAlerta } from 'src/app/alerta/alerta.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvestigadorService } from 'src/app/service/investigador/serviceInvestigador';
import { FormsModule } from '@angular/forms';
import { AreaService } from 'src/app/service/area/serviceArea';
import { CentroService } from 'src/app/service/centro/serviceCentro';
import { GrupoService } from 'src/app/service/grupo/serviceGrupo';
import { GrupoLineaService } from 'src/app/service/grupolinea/service.grupolinea';
import { LineaService } from 'src/app/service/linea/service.linea';
import { GrupoInvestigadorService } from 'src/app/service/investigadorgrupo/service.investigador.grupo';
import { TipoVinculacionService } from 'src/app/service/tipoVinculacion/service.tipovinculacion';
import { SemilleroService } from 'src/app/service/semillero/serviceSemillero';
import { ServiceGrupoSemillero } from 'src/app/service/gruposemillero/service.gruposemillero';
import { ProyectoService } from 'src/app/service/proyecto/service.proyecto';
import { ProductoService } from 'src/app/service/producto/service.producto';
import { ServiceGrupoProyecto } from 'src/app/service/grupoproyecto/service.grupoproyecto';
import { PlanTrabajoGrupoService } from 'src/app/service/plantrabajogrupo/service.plantrabajogrupo';


@NgModule({
    declarations: [EditGrupoComponent],
    imports: [
      CommonModule,
      SharedAlerta,
      NgbModule,
      FormsModule,
      RouterModule.forChild(GrupoRoutes),
    ],
    providers:[AuthGuard,LoginService,InvestigadorService,AreaService,CentroService,
      GrupoService,CustomDateParserFormatter,GrupoLineaService,LineaService,
      GrupoInvestigadorService,TipoVinculacionService,SemilleroService,ServiceGrupoSemillero,ProyectoService,
      ProductoService,ServiceGrupoProyecto,PlanTrabajoGrupoService]
  })
  export class GrupoModule { }