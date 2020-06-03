import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { AlertaComponent } from 'src/app/alerta/alerta';
import {  NgbDateStruct, NgbDate, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje, TipoMensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
import { InvestigadorService } from 'src/app/service/investigador/serviceInvestigador';
import { Investigador } from 'src/app/entidad/investigador/entidad.investigador';
import { ErrorComponent } from 'src/app/error/error';
import { AreaService } from 'src/app/service/area/serviceArea';
import { CentroService } from 'src/app/service/centro/serviceCentro';
import { Centro } from 'src/app/entidad/centro/entidad.centro';
import { Area } from 'src/app/entidad/area/entidad.area';
import { Linea } from 'src/app/entidad/linea/entidad.linea';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Grupo } from 'src/app/entidad/grupo/entidad.grupo';
import { GrupoService } from 'src/app/service/grupo/serviceGrupo';
import { lenguajeSpanish } from 'src/app/complement/languajeDatatable';
import { GrupoLineaService } from 'src/app/service/grupolinea/service.grupolinea';
import { LineaService } from 'src/app/service/linea/service.linea';
import { GrupoLinea } from 'src/app/entidad/lineagrupo/entidad.lineagrupo';
import { InvestigadorGrupo } from 'src/app/entidad/investigadorGrupo/investigadorGrupo';
import { TipoVinculacion } from 'src/app/entidad/tipoVinculacion/entidad.tipovinculacion';
import { GrupoInvestigadorService } from 'src/app/service/investigadorgrupo/service.investigador.grupo';
import { TipoVinculacionService } from 'src/app/service/tipoVinculacion/service.tipovinculacion';
import { SemilleroGrupo } from 'src/app/entidad/semillerogrupo/entidad.semillerogrupo';
import { Semillero } from 'src/app/entidad/semillero/entidad.semillero';
import { SemilleroService } from 'src/app/service/semillero/serviceSemillero';
import { ServiceGrupoSemillero } from 'src/app/service/gruposemillero/service.gruposemillero';
import { Proyecto } from 'src/app/entidad/proyecto/entidad.proyecto';
import { Producto } from 'src/app/entidad/producto/entidad.producto';
import { ProyectoService } from 'src/app/service/proyecto/service.proyecto';
import { ProductoService } from 'src/app/service/producto/service.producto';
import { ServiceGrupoProyecto } from 'src/app/service/grupoproyecto/service.grupoproyecto';
import { GrupoProyecto } from 'src/app/entidad/grupoproyecto/grupoproyecto';
import { PlanTrabajoGrupoService } from 'src/app/service/plantrabajogrupo/service.plantrabajogrupo';
import { PlanTrabajoGrupo } from 'src/app/entidad/plantrabajogrupo/entidad.plantrabajogrupo';

declare const $: any;


@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';
 
  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date:Date = moment(value).toDate();
      return {
        day : date.getDate(),
        month : date.getMonth()+1,
        year : date.getFullYear()
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    moment.locale('es');    
    
    return date ? moment([date.year, date.month-1, date.day]).format("DD MMMM YYYY"): '';
  }
}


@Component({
  selector: 'app-edit-semillero',
  templateUrl: './edit-semillero.component.html',
  styleUrls: ['./edit-semillero.component.css'],
  providers:[{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class EditSemilleroComponent implements OnInit {
  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  mensaje:Mensaje;
  active:number;
  disabled:boolean;
  
  constructor(private router:Router ) { }

   
  ngOnInit(): void {
    
    $('#iconoEspera').hide();
  }

  onChangeNavs(changeEvent: NgbNavChangeEvent)
  {
  }

  //SI
  onClicBoton1(event:any)
  {
    

    
  }

  //NO
  onClicBoton2(event:any)
  {
    if (event.nVentana=="IdEliminarLinea")
    $('#IdEliminarLinea').hide();    
    
    if (event.nVentana=="IdEliminarInvestigador")
    {
      $('#IdEliminarInvestigador').hide();    
    }

    if (event.nVentana=="IdEliminarSemillero")
    $('#IdEliminarSemillero').hide();    

    if (event.nVentana=="IdEliminarProducto")
    $('#IdEliminarProducto').hide();    

    if (event.nVentana=="IdEliminarPlanTrabajo")
    $('#IdEliminarPlanTrabajo').hide();    
  }

  onGuardar()
  {

  }

  onSalir()
  {
    this.router.navigate(['/semillero/0']);
  }

}
