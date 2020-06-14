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



@NgModule({
  declarations: [ConvocatoriaComponent, EditConvocatoriaComponent],
  imports: [
    CommonModule,
      SharedAlerta,
      NgbModule,
      FormsModule,
    RouterModule.forChild(ConvocatoriaRoutes),
  ],
  providers:[AuthGuard,LoginService,ConvocatoriaService,CustomDateParserFormatter,
    TipoConvocatoriaService,ConvocatoriaParametroService,ParametroService ]
})
export class ConvocatoriaModule { }
