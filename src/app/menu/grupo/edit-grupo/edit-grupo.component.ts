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

  formatUTC(date: NgbDateStruct | null): Date {
    moment.locale('es');    
    
     let fecha:Date=moment(new Date(date.year,date.month,date.day).toLocaleString().replace("Z","")).toDate();
    

    return fecha ? fecha: null;
  }
}


@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.css'],
  providers:[{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class EditGrupoComponent implements OnInit {
  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  user = new logueado();
  mensaje:Mensaje;
  showData:boolean=true;
  table:any;

  columnIndex:number;
  active=1;
  infoNombre:string;
  infoApellido:string;
  infoZona:string;
  infoCentro:string;
  infoEscuela:string;
  infoPrograma:string;
  fechaCreacion :NgbDateStruct;
  listCentro:Centro[]=[];
  selCentro:Centro;
  selArea:Area;
  listArea:Area[]=[];
  selLinea:Linea;
  listLinea:Linea[]=[];
  maxDate:NgbDateStruct;

  grupo= new Grupo();

  nombre:string="";
  GRU_COLC_CODI:string="";
  GRU_CATE_COLC:string="";

  selAvalado?:boolean=null;
  selNoAvalado?:boolean=null;
  disabled:boolean=true;
  //LINEA
  showDataLinea:boolean=true;   
  textoEstadoLinea:string;
  disabledFechaFinLinea:boolean=false;
  fechaInicioLinea:NgbDateStruct;
  fechaTerminaLinea:NgbDateStruct;
  grupoLinea= new GrupoLinea();
  tableLinea:any;
  listGrupoLinea:GrupoLinea[]=[];

  //INVESTIGADOR
  showDataInvestigador:boolean=true;   
  textoEstadoInvestigador:string;
  disabledFechaFinInvestigador:boolean=false;
  fechaInicioInvestigador:NgbDateStruct;
  fechaTerminaInvestigador:NgbDateStruct;
  grupoInvestigador= new InvestigadorGrupo();
  selInvestigador:Investigador=null;
  listInvestigador:Investigador[]=[];
  selTipoVinculacion:TipoVinculacion=null;
  listTipoVinculacion:TipoVinculacion[]=[]
  tableInvestigador:any;
  listGrupoInvestigador:InvestigadorGrupo[]=[];

 //SEMILLERO
  textoEstadoSemillero:string;
  showDataSemillero:boolean=true;   
  disabledFechaFinSemillero:boolean=false;
  fechaInicioSemillero:NgbDateStruct;
  fechaTerminaSemillero:NgbDateStruct;
  grupoSemillero= new SemilleroGrupo();
  selSemillero:Semillero=null;
  listSemillero:Semillero[]=[];  
  tableSemillero:any;
  listGrupoSemillero:SemilleroGrupo[]=[];


  //PRODUCCIÓN

  tableProduccion:any;
  selInvestigadorProd:Investigador=null;
  selProyecto:Proyecto=null;
  listProyecto:Proyecto[]=[];
  selProducto:Producto=null;
  listProducto:Producto[]=[];
  grupoProduccion =  new GrupoProyecto();
  listGrupoProduccion:GrupoProyecto[]=[];
  showDataProduccion:boolean=true;
  fechaInicioProyecto:NgbDateStruct;
  fechaFinalizaProyecto:NgbDateStruct;
  textoEstadoProduccion:string;
  disabledFechaFinProduccion:boolean=false;

  //PLAN TRABAJO

  tablePlanTrabajo:any;    
  grupoPlanTrabajo =  new PlanTrabajoGrupo();
  listGrupoPlanTrabajo:PlanTrabajoGrupo[]=[];
  showDataPlanTrabajo:boolean=true;
  fechaInicioPlanTrabajo:NgbDateStruct;
  fechaFinPlanTrabajo:NgbDateStruct;
  textoEstadoPlanTrabajo:string;
  disabledFechaFinPlanTrabajo:boolean=false;
  nombrePlanTrabajo:string;
  selectFile:File=null;
  archivoSeleccionado:string="";
  file:FormData;
  constructor(private serviceInevstigador:InvestigadorService,
    private serviceArea:AreaService,private serviceCentro:CentroService,
    private router:Router,private dateAdapter: CustomDateParserFormatter,
    private route:ActivatedRoute,private serviceGrupo:GrupoService,
    private serviceGrupoLinea:GrupoLineaService,
    private serviceLinea:LineaService,
    private serviceGrupoInvestigador:GrupoInvestigadorService,
    private serviceTipoVinculacion:TipoVinculacionService,
    private serviceSemillero:SemilleroService,
    private serviceSemilleroGrupo:ServiceGrupoSemillero,
    private serviceProyecto:ProyectoService,
    private serviceProducto:ProductoService,
    private serviceGrupoProyecto : ServiceGrupoProyecto,
    private servicePlanTrabajo:PlanTrabajoGrupoService ) { }

   
  ngOnInit(): void {    
    this.grupo.gru_codi=this.route.snapshot.params.id;    
    this.grupo.gru_inv_codi=this.user.inv_codi;
    moment.locale('es'); 
    this.maxDate=this.dateAdapter.parse(moment(new Date()).toString());  
    $('#iconoEspera').hide();
    this.user =JSON.parse(localStorage.getItem("user"));
    let investigador= new Investigador();
    investigador.INV_CODI=this.user.inv_codi;
    investigador.accion="GET";
    $('#iconoEspera').show();
    this.serviceInevstigador.getInvestigador(investigador).subscribe(res=>{     
      investigador=res;
      this.infoApellido=res.INV_APEL;
      this.infoNombre=res.INV_NOMB;
      investigador.accion="CENTRO"
      this.serviceInevstigador.getInvestigador(investigador).subscribe(res=>{
        this.infoCentro=res.CEN_NOMB;
        investigador.accion="ZONA"
        this.serviceInevstigador.getInvestigador(investigador).subscribe(res2=>{
          this.infoZona=res2.ZON_NOMB;
          investigador.accion="PROGRAMA"
          this.serviceInevstigador.getInvestigador(investigador).subscribe(res=>{
            this.infoPrograma=res.PAC_NOMB;
            investigador.accion="ESCUELA"
            this.serviceInevstigador.getInvestigador(investigador).subscribe(res2=>{
              this.infoEscuela=res2.ESC_NOMB;
              let centro=new Centro();
              centro.accion="listCentro";
              this.selCentro=null;
              this.serviceCentro.getListCentro(centro).subscribe(cent=>{
                this.listCentro=cent;
                let area= new Area();
                this.selArea=null;                
                area.accion="ALL";
                this.serviceArea.getALL(area).subscribe(are=>{
                  this.listArea=are;
                  $('#iconoEspera').hide();
                  if (this.route.snapshot.params.id==0)
                  {
                    this.fechaCreacion=this.dateAdapter.parse(moment(new Date()).toString());
                    this.disabled=true;
                  }
                  else{
                    this.disabled=false;
                    $('#iconoEspera').show();
                    this.grupo.accion="SELECT";
                    this.serviceGrupo.get(this.grupo).subscribe(res=>{
                        this.nombre=res.gru_nomb;                       
                        this.fechaCreacion=this.dateAdapter.parse(res.gru_fech_ini.toString());
                        this.GRU_COLC_CODI=res.gru_colc_codi;
                        this.GRU_CATE_COLC=res.gru_cate_colc;
                        this.selAvalado=(res.gru_aval_inst==1)? true:false;
                        this.selNoAvalado=!this.selAvalado;
                        this.selArea=this.listArea.find(x=>x.ARE_CODI==res.gru_area_codi);
                        this.selCentro=this.listCentro.find(x=>x.CEN_CODI==res.gru_cent_codi);
                        $('#iconoEspera').hide();
                    },error=> {
                      $('#iconoEspera').hide();
                      console.clear();
                      var errorComponent = new ErrorComponent();            
                      this.mensaje =errorComponent.GenerarMensaje(error);          
                      this.mensaje.nVentana="IdError";
                      this.alerta.onChangedMyId("IdError");                      
                      $('#IdError').show();
                    })
                  }

                },error=> {
                  $('#iconoEspera').hide();
                  console.clear();
                  var errorComponent = new ErrorComponent();            
                  this.mensaje =errorComponent.GenerarMensaje(error);          
                  this.mensaje.nVentana="IdError";
                  this.alerta.onChangedMyId("IdError");                      
                  $('#IdError').show();
                })
              },error=> {
                $('#iconoEspera').hide();
                console.clear();
                var errorComponent = new ErrorComponent();            
                this.mensaje =errorComponent.GenerarMensaje(error);          
                this.mensaje.nVentana="IdError";
                this.alerta.onChangedMyId("IdError");                      
                $('#IdError').show();
              });

              
            },error=> {
              $('#iconoEspera').hide();
              console.clear();
              var errorComponent = new ErrorComponent();            
              this.mensaje =errorComponent.GenerarMensaje(error);          
              this.mensaje.nVentana="IdError";
              this.alerta.onChangedMyId("IdError");                      
              $('#IdError').show();
            });  
          },error=> {
            $('#iconoEspera').hide();
            console.clear();
            var errorComponent = new ErrorComponent();            
            this.mensaje =errorComponent.GenerarMensaje(error);          
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();
          });  
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });  
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });          
    },error=> {
      $('#iconoEspera').hide();
      console.clear();
      var errorComponent = new ErrorComponent();            
      this.mensaje =errorComponent.GenerarMensaje(error);          
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();
    });

  }

  //SI
  onClicBoton1(event:any)
  {
    if (event.nVentana=="IdError")
       $('#IdError').hide();
    if (event.nVentana=="IdEliminarLinea")
    {
      $('#iconoEspera').show();
        this.serviceGrupoLinea.delete(this.grupoLinea).subscribe(res=>{
          $('#iconoEspera').hide();
          var indexes = this.tableLinea
          .rows()
          .indexes()
          .filter((value:any,index:any) => {
            return  this.grupoLinea.gli_codi==this.tableLinea.row(value).data().gli_codi;
          } );
      
          this.tableLinea.rows(indexes).remove().draw();
          let index = this.listGrupoLinea.findIndex(x=>x.gli_codi==this.grupoLinea.gli_codi);
          this.listGrupoLinea.splice(index,1);
        },error=> {
          $('#iconoEspera').hide();
          $('#IdEliminarLinea').hide();    
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
      });

       $('#IdEliminarLinea').hide();       
    }

    if (event.nVentana=="IdEliminarInvestigador")
    {
      $('#iconoEspera').show();
      this.serviceGrupoInvestigador.delete(this.grupoInvestigador).subscribe(res=>{
        $('#iconoEspera').hide();
        var indexes = this.tableInvestigador
        .rows()
        .indexes()
        .filter((value:any,index:any) => {
          return  this.grupoInvestigador.IGR_CODI==this.tableInvestigador.row(value).data().IGR_CODI;
        } );
    
        this.tableInvestigador.rows(indexes).remove().draw();
        let index = this.listGrupoInvestigador.findIndex(x=>x.IGR_CODI==this.grupoInvestigador.IGR_CODI);
        this.listGrupoInvestigador.splice(index,1);
        $('#IdEliminarInvestigador').hide();    
      },error=> {
          $('#iconoEspera').hide();
          $('#IdEliminarInvestigador').hide();    
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
       });   
    }

    if (event.nVentana=="IdEliminarSemillero")
    {
      $('#iconoEspera').show();
      this.serviceSemilleroGrupo.delete(this.grupoSemillero).subscribe(res=>{
        $('#iconoEspera').hide();
        var indexes = this.tableSemillero
        .rows()
        .indexes()
        .filter((value:any,index:any) => {
          return  this.grupoSemillero.sgr_codi==this.tableSemillero.row(value).data().sgr_codi;
        } );
    
        this.tableSemillero.rows(indexes).remove().draw();
        let index = this.listGrupoSemillero.findIndex(x=>x.sgr_codi==this.grupoSemillero.sgr_codi);
        this.listGrupoSemillero.splice(index,1);
        $('#IdEliminarSemillero').hide();    
      },error=> {
          $('#iconoEspera').hide();
          $('#IdEliminarSemillero').hide();    
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
       });   
    }

    if (event.nVentana=="IdEliminarProducto")
    {
      $('#iconoEspera').show();
      this.serviceGrupoProyecto.delete(this.grupoProduccion).subscribe(res=>{
        $('#iconoEspera').hide();
        var indexes = this.tableProduccion
        .rows()
        .indexes()
        .filter((value:any,index:any) => {
          return  this.grupoProduccion.id==this.tableProduccion.row(value).data().id;
        } );
    
        this.tableProduccion.rows(indexes).remove().draw();
        let index = this.listGrupoProduccion.findIndex(x=>x.id==this.grupoProduccion.id);
        this.listGrupoProduccion.splice(index,1);
        $('#IdEliminarProducto').hide();    
      },error=> {
          $('#iconoEspera').hide();
          $('#IdEliminarProducto').hide();    
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
       });   
    }

    if (event.nVentana=="IdEliminarPlanTrabajo")
    {
      $('#iconoEspera').show();
      this.servicePlanTrabajo.delete(this.grupoPlanTrabajo).subscribe(res=>{
        $('#iconoEspera').hide();
        var indexes = this.tablePlanTrabajo
        .rows()
        .indexes()
        .filter((value:any,index:any) => {
          return  this.grupoPlanTrabajo.pgr_plnt_codi==this.tablePlanTrabajo.row(value).data().pgr_plnt_codi;
        } );
    
        this.tablePlanTrabajo.rows(indexes).remove().draw();
      
        $('#IdEliminarPlanTrabajo').hide();    
      },error=> {
          $('#iconoEspera').hide();
          $('#IdEliminarPlanTrabajo').hide();    
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
       });   
    }

    

    
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


  Validar():boolean {
    if (this.nombre.replace(/\s/g, "")=="")
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Grupo"
      this.mensaje.cuerpo="Falta nombre del grupo";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }


    let fecha :Date;
    let fechaMoment:moment.Moment;
    fecha =moment(this.dateAdapter.format(this.fechaCreacion),"DD MMMM YYYY").toDate();

    fechaMoment=moment(fecha);


    if (!fechaMoment.isValid())
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Grupo"
      this.mensaje.cuerpo="La fecha no es válida";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    

    if (moment(this.dateAdapter.format(this.fechaCreacion)).toDate()>(new Date()))
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Grupo"
      this.mensaje.cuerpo="La fecha no debe ser mayor al día de hoy";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

   

    if (this.selAvalado==null)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Grupo"
      this.mensaje.cuerpo="Falta si es avalado";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.selArea==null)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Grupo"
      this.mensaje.cuerpo="Falta seleccionar área";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.selCentro==null)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Grupo"
      this.mensaje.cuerpo="Falta seleccionar centro";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }




    return true;
  }

  onChangeNavs(changeEvent: NgbNavChangeEvent)
  {
    switch (changeEvent.nextId) {
      case 2:        
        this.showDataLinea=true;
        $('#iconoEspera').show();
        this.serviceGrupoLinea.getALL(this.grupo.gru_codi).subscribe(res=>{
          this.iniciarTablaLineas();
            setTimeout(() => {
              if (res!=null)
              {
              this.listGrupoLinea=[];
              this.tableLinea = $('#dataLineas').DataTable();
              this.tableLinea.clear();
              this.tableLinea.rows.add(res);
              this.tableLinea.draw();
              let data= this.tableLinea.rows().data();
                data.each((value:GrupoLinea, index:number) =>{
                  let item = new GrupoLinea();
                  item.gli_codi=value.gli_codi;
                  item.gli_fech_inic=value.gli_fech_inic;
                  item.gli_fech_term=value.gli_fech_term;  
                  item.gli_line_inve_codi=value.gli_line_inve_codi;
                  this.listGrupoLinea.push(item);
                  

                });
              }
              $('#iconoEspera').hide();    
            });
          
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        })

        break;
    case 3:
        this.showDataInvestigador=true;
        $('#iconoEspera').show();
        this.serviceGrupoInvestigador.getALL(this.grupo.gru_codi).subscribe(res=>{
          $('#iconoEspera').hide();
          this.iniciarTablaInvestigador();
          setTimeout(() => {
            if (res!=null)
            {
             
            this.tableInvestigador = $('#dataInvestigador').DataTable();
                this.tableInvestigador.clear();
                this.tableInvestigador.rows.add(res);
                this.tableInvestigador.draw();
                let data= this.tableInvestigador.rows().data();
                  data.each((value:InvestigadorGrupo, index:number) =>{
                    let item = new InvestigadorGrupo();
                    item.IGR_CODI=value.IGR_CODI;
                    item.IGR_FECH_INIC=value.IGR_FECH_INIC;
                    item.IGR_FECH_TERM=value.IGR_FECH_TERM;  
                    item.IGR_INVE_IDEN=value.IGR_INVE_IDEN;
                    this.listGrupoInvestigador.push(item);                  
                  });                             
              }
            });
          },error=> {
            $('#iconoEspera').hide();
            console.clear();
            var errorComponent = new ErrorComponent();            
            this.mensaje =errorComponent.GenerarMensaje(error);          
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();
          });
        
         

             break;
      case 4:
        this.showDataSemillero=true;
        $('#iconoEspera').show();

        this.serviceSemilleroGrupo.getALL(this.grupo.gru_codi).subscribe(res=>{
          $('#iconoEspera').hide();
          this.iniciarTablaSemillero();
          if (res!=null)
          {
           
              this.tableSemillero = $('#dataSemillero').DataTable();
              this.tableSemillero.clear();
              this.tableSemillero.rows.add(res);
              this.tableSemillero.draw();
              let data= this.tableSemillero.rows().data();
                data.each((value:SemilleroGrupo, index:number) =>{
                  let item = new SemilleroGrupo();
                  item.sgr_codi=value.sgr_codi;
                  item.sgr_fech_inic=value.sgr_fech_inic;
                  item.sgr_fech_term=value.sgr_fech_term;  
                  item.sgr_semi_codi=value.sgr_semi_codi;
                  this.listGrupoSemillero.push(item);                  
                });

          }
              },error=> {
                $('#iconoEspera').hide();
                console.clear();
                var errorComponent = new ErrorComponent();            
                this.mensaje =errorComponent.GenerarMensaje(error);          
                this.mensaje.nVentana="IdError";
                this.alerta.onChangedMyId("IdError");                      
                $('#IdError').show();
              });  
        break;
        case 5:
          $('#iconoEspera').show();
          this.showDataProduccion=true;
          this.serviceGrupoProyecto.getALL(this.grupo.gru_codi).subscribe(res=>{
            $('#iconoEspera').hide();
            this.iniciarTablaProduccion();
            if (res!=null)
            {
              this.tableProduccion = $('#dataProduccion').DataTable();
              this.tableProduccion.clear();
              this.tableProduccion.rows.add(res);
              this.tableProduccion.draw();  
              this.listGrupoProduccion=[];
               let data= this.tableProduccion.rows().data();
                data.each((value:GrupoProyecto, index:number) =>{
                  let item = new GrupoProyecto();
                  item.id=value.id;
                  item.id_grup=value.id_grup;
                  item.id_inve=value.id_inve;
                  item.id_prod=value.id_prod;
                  item.id_proy=value.id_proy;
                  item.fech_ini=value.fech_ini;
                  item.fech_term=value.fech_term;
                  
                  this.listGrupoProduccion.push(item);                  
                });         
            }         
          },error=> {
            $('#iconoEspera').hide();
            console.clear();
            var errorComponent = new ErrorComponent();            
            this.mensaje =errorComponent.GenerarMensaje(error);          
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();
          });

      case 6:
        this.showDataPlanTrabajo=true;
        $('#iconoEspera').show();
        this.servicePlanTrabajo.getALL(this.grupo.gru_codi).subscribe(res=>{
          $('#iconoEspera').hide();
          this.iniciarTablaPlanTrabajo();
          if (res!=null)
          {
            this.tablePlanTrabajo = $('#dataPlanTrabajo').DataTable();
            this.tablePlanTrabajo.clear();
            this.tablePlanTrabajo.rows.add(res);
            this.tablePlanTrabajo.draw();  
            this.listGrupoPlanTrabajo=[];
             let data= this.tablePlanTrabajo.rows().data();
              data.each((value:PlanTrabajoGrupo, index:number) =>{
                let item = new PlanTrabajoGrupo();
                item.pgr_plnt_codi =value.pgr_plnt_codi;
                item.pgr_grup_codi=value.pgr_grup_codi;
                item.pgr_nombre=value.pgr_nombre;
                item.pgr_fech_inic=value.pgr_fech_inic;
                item.pgr_fech_term=value.pgr_fech_term;                                
                this.listGrupoPlanTrabajo.push(item);                  
              });         
          }         
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });         
      default:
        break;
    }
  }
  onGuardar()
  {
    switch (this.active) {
      case 1:
        if (this.Validar())
        {       
          this.grupo.gru_nomb=this.nombre;
          
          this.grupo.gru_fech_ini=moment(this.dateAdapter.format(this.fechaCreacion),"DD MMMM YYYY").toDate();
          this.grupo.gru_codi_colc=this.GRU_COLC_CODI;
          this.grupo.gru_cate_colc=this.GRU_CATE_COLC;
          this.grupo.gru_area_codi=this.selArea.ARE_CODI;
          this.grupo.gru_cent_codi=this.selCentro.CEN_CODI;
          this.grupo.gru_aval_inst=(this.selAvalado==true)? 1:0;
          this.grupo.gru_inv_codi=this.user.inv_codi;
          if (this.grupo.gru_codi==0)
          {
            
            $('#iconoEspera').show();
            this.serviceGrupo.insert(this.grupo).subscribe(res=>{
              this.grupo.gru_codi=res;
              $('#iconoEspera').hide();
              this.disabled=false;
            },error=> {
              $('#iconoEspera').hide();
              console.clear();
              var errorComponent = new ErrorComponent();            
              this.mensaje =errorComponent.GenerarMensaje(error);          
              this.mensaje.nVentana="IdError";
              this.alerta.onChangedMyId("IdError");                      
              $('#IdError').show();
            });
          }
          else
          {
            $('#iconoEspera').show();
              this.serviceGrupo.update(this.grupo).subscribe(result=>{
                $('#iconoEspera').hide();
              },error=> {
                $('#iconoEspera').hide();
                console.clear();
                var errorComponent = new ErrorComponent();            
                this.mensaje =errorComponent.GenerarMensaje(error);          
                this.mensaje.nVentana="IdError";
                this.alerta.onChangedMyId("IdError");                      
                $('#IdError').show();
              });
          }
                   
        }          
        break;
    
      default:
        break;
    }



  
  }

  onSalir()
  {
    this.router.navigate(['/grupo/0']);
  }

  /////////////////////////// LÍNEAS DE INVESTIGACIÓN    ////////////////////////////////////////////////////////

  iniciarTablaLineas() {
    this.tableLinea = $('#dataLineas').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',   
      searching: false,
      order: [],   
      columns: [
        { title: 'Nombre', data: 'nombreLinea',width:'10%' },        
        { title: 'Fecha inicio', data: 'gli_fech_inic',width:'10%' },  
        { title: 'Fecha Termina', data: 'gli_fech_term',width:'10%' }         
      ],
      columnDefs: [
        {
          targets: [1],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:GrupoLinea, meta:any) => {
              return moment(full.gli_fech_inic).format("DD MMMM YYYY");                
          }
        },{
          targets: [2],
          data: null,                   
          className: "text-left",          
          
          render: (data:any, type:any, full:GrupoLinea, meta:any) => {
              if (full.gli_fech_term!=null)              
                return moment(full.gli_fech_term).format("DD MMMM YYYY");                              
              else
                return '';
          }
        }, {
          targets: [3],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:any, meta:any) => {
            
                return  '<i title="Editar grupo" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.gli_codi + ' data-element-nombre="' + full.gru_nomb  + '"></i>'                                            
          }
        },{
          targets: [4],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:any, meta:any) => {
          
               return  '<i title="Eliminar grupo" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.gli_codi + ' data-element-nombre="' + full.gru_nomb + '"></i>'                                
                                           
          }
        }
      ],

      responsive: true,
      scrollY: 200,
      language:lenguajeSpanish
      
    });
   
    

    $('#dataLineas tbody').on('click', 'td', event => {
    this.columnIndex=event.currentTarget.cellIndex;
    });

    $('#dataLineas tbody').on('click', 'tr', event => {
     
      let id:number=event.currentTarget.cells[3].children[0].dataset.elementId;  
      this.grupoLinea.gli_codi=id;   
      if (this.columnIndex==3)
      {                   
        this.showDataLinea=false;
        $('#iconoEspera').show();        
        this.serviceLinea.getALL().subscribe(res=>{
          if (res!=null)
          {
            this.listLinea=res;
            this.selLinea=null;
            this.fechaInicioLinea=null;
            this.disabledFechaFinLinea=false;
            this.fechaTerminaLinea=null;
            this.serviceGrupoLinea.get(id).subscribe(res=>{
              this.grupoLinea.gli_codi=res.gli_codi;
              this.selLinea = this.listLinea.find(x=>x.lin_codi==res.gli_line_inve_codi);
              this.fechaInicioLinea=this.dateAdapter.parse(res.gli_fech_inic.toString());   
              if (res.gli_fech_term!=null)
              {  
                this.fechaTerminaLinea=this.dateAdapter.parse(res.gli_fech_term.toString());     
                this.disabledFechaFinLinea=true;
              }
              $('#iconoEspera').hide();
           },error=> {
            $('#iconoEspera').hide();
            console.clear();
            var errorComponent = new ErrorComponent();            
            this.mensaje =errorComponent.GenerarMensaje(error);          
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();
          }); 
          }
          $('#iconoEspera').hide();
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });
                    
      }  
      if (this.columnIndex==4)
      {
        $('#iconoEspera').show();
        this.serviceGrupoLinea.get(this.grupoLinea.gli_codi).subscribe(res=>{
          $('#iconoEspera').hide();
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.CondicionSINO;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar líneas de investigación"
          this.mensaje.cuerpo="Desea eliminar la línea " + res.nombreLinea  + " ?";                                     
          this.mensaje.nVentana="IdEliminarLinea";
          this.alerta.onChangedMyId("IdEliminarLinea");                      
          $('#IdEliminarLinea').show();   
          return false;   
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });

        
      }   
    });
  }  


  showFormCreacionLineas()
  {
    this.showDataLinea=false;
    this.textoEstadoLinea="Agregar línea de investigación";
    $('#iconoEspera').show();
    this.serviceLinea.getALL().subscribe(res=>{
      if (res!=null)
      {
        this.listLinea=res;
        this.selLinea=null;
        this.fechaInicioLinea=null;
        this.disabledFechaFinLinea=false;
        this.fechaTerminaLinea=null;
        this.grupoLinea.gli_codi=0;
      }
      $('#iconoEspera').hide();
    },error=> {
      $('#iconoEspera').hide();
      console.clear();
      var errorComponent = new ErrorComponent();            
      this.mensaje =errorComponent.GenerarMensaje(error);          
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();
    });
  }

  onClicGuardarLinea()
  {
      if (this.selLinea==null)
      {
       
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Agregar líneas de investigación"
          this.mensaje.cuerpo="Falta seleccionar línea de investigación";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
        }

        let fecha :Date;
        let fechaMoment:moment.Moment;
        fecha =moment(this.dateAdapter.format(this.fechaInicioLinea),"DD MMMM YYYY").toDate();
    
        fechaMoment=moment(fecha);
    
    
        if (!fechaMoment.isValid())
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Agregar líneas de investigación"
          this.mensaje.cuerpo="La fecha de inicio no  es válida";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
        }

        if (this.disabledFechaFinLinea==true)
        {
          fecha =moment(this.dateAdapter.format(this.fechaTerminaLinea),"DD MMMM YYYY").toDate();
    
          fechaMoment=moment(fecha);
      
      
          if (!fechaMoment.isValid())
          {
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Agregar líneas de investigación"
            this.mensaje.cuerpo="La fecha de finalización no  es válida";                                     
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return false;   
          }

          if (moment(this.fechaTerminaLinea)<moment(this.fechaInicioLinea))
          {
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Agregar líneas de investigación"
            this.mensaje.cuerpo="La fecha de finalización debe ser mayor que la fecha de inicio";                                     
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return false;   
          }


        }

        let existe =this.listGrupoLinea.find(x=>x.gli_line_inve_codi==this.selLinea.lin_codi && x.gli_fech_term==null);
        if (existe!=undefined && this.grupoLinea.gli_codi==0)
        {
          let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Agregar líneas de investigación"
            this.mensaje.cuerpo="La línea de investigación " + this.selLinea.lin_desc + " se ecuentra  activa";                                     
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return false;   
        }

        this.grupoLinea.gli_line_inve_codi=this.selLinea.lin_codi;
        this.grupoLinea.gli_fech_inic=moment(moment(this.dateAdapter.format(this.fechaInicioLinea),"DD MMMM YYYY").toDate()).toDate();;        
        this.grupoLinea.gli_grup_codi=this.grupo.gru_codi;
        this.grupoLinea.gli_fech_term=(this.fechaTerminaLinea==null)? null: moment(moment(this.dateAdapter.format(this.fechaTerminaLinea),"DD MMMM YYYY").toDate()).toDate();;        
        if (this.grupoLinea.gli_codi==0)
        {                               
            $('#iconoEspera').show();
            this.serviceGrupoLinea.insert(this.grupoLinea).subscribe(res=>{
              this.listGrupoLinea.push(this.grupoLinea);
              this.goBackLineas();
              $('#iconoEspera').hide();              
            },error=> {
              $('#iconoEspera').hide();
              console.clear();
              var errorComponent = new ErrorComponent();            
              this.mensaje =errorComponent.GenerarMensaje(error);          
              this.mensaje.nVentana="IdError";
              this.alerta.onChangedMyId("IdError");                      
              $('#IdError').show();
            });     
        }
        else
        {
          $('#iconoEspera').show();
          this.serviceGrupoLinea.update(this.grupoLinea).subscribe(res=>{           
            this.goBackLineas();
            $('#iconoEspera').hide();              
          },error=> {
            $('#iconoEspera').hide();
            console.clear();
            var errorComponent = new ErrorComponent();            
            this.mensaje =errorComponent.GenerarMensaje(error);          
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();
          });     
        }
      
  }

  goBackLineas()
  {
    this.showDataLinea=true;
    $('#iconoEspera').show();
    this.serviceGrupoLinea.getALL(this.grupo.gru_codi).subscribe(res=>{
      this.iniciarTablaLineas();
        setTimeout(() => {
          if (res!=null)
          {
            this.tableLinea = $('#dataLineas').DataTable();
            this.tableLinea.clear();
            this.tableLinea.rows.add(res);
            this.tableLinea.draw();
            this.listGrupoLinea=[];
            let data= this.tableLinea.rows().data();
                data.each((value:GrupoLinea, index:number) =>{
                  let item = new GrupoLinea();
                  item.gli_codi=value.gli_codi;
                  item.gli_fech_inic=value.gli_fech_inic;
                  item.gli_fech_term=value.gli_fech_term;  
                  item.gli_line_inve_codi=value.gli_line_inve_codi;
                  this.listGrupoLinea.push(item);
                  
                });
          }         
          $('#iconoEspera').hide();    
        });
      
    },error=> {
      $('#iconoEspera').hide();
      console.clear();
      var errorComponent = new ErrorComponent();            
      this.mensaje =errorComponent.GenerarMensaje(error);          
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();
    })
  }

  onChangeDisabledFechaFinLinea()
  {
    this.disabledFechaFinLinea=!this.disabledFechaFinLinea;
   (this.disabledFechaFinLinea==false)? this.fechaTerminaLinea=null:null;
  }



  ///////////////////////////////////////// INVESTIGADORES ///////////////////////////////////////////////////////////

  iniciarTablaInvestigador() {
    this.tableLinea = $('#dataInvestigador').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',   
      searching: false,
      order: [],   
      columns: [
        
        { title: 'Nombre', data: 'nombreInvestigador',width:'10%' },     
        { title: 'Vinculación', data: 'nombreTipoVinculacion',width:'10%' },     
        { title: 'Fecha inicio', data: 'IGR_FECH_INIC',width:'10%' },  
        { title: 'Fecha Termina', data: 'IGR_FECH_TERM',width:'10%' }         
      ],
      columnDefs: [
        {
          targets: [2],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:InvestigadorGrupo, meta:any) => {
              return moment(full.IGR_FECH_INIC).format("DD MMMM YYYY");                
          }
        },{
          targets: [3],
          data: null,                   
          className: "text-left",          
          
          render: (data:any, type:any, full:InvestigadorGrupo, meta:any) => {
              if (full.IGR_FECH_TERM!=null)              
                return moment(full.IGR_FECH_TERM).format("DD MMMM YYYY");                              
              else
                return '';
          }
        }, {
          targets: [4],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:any, meta:any) => {
            
                return  '<i title="Editar investigador" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.IGR_CODI +  '></i>'                                            
          }
        },{
          targets: [5],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:any, meta:any) => {
          
               return  '<i title="Eliminar investigador" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.IGR_CODI +  '></i>'                                
                                           
          }
        }
      ],

      responsive: true,
      scrollY: 200,
      language:lenguajeSpanish
      
    });
   
    

    $('#dataInvestigador tbody').on('click', 'td', event => {
    this.columnIndex=event.currentTarget.cellIndex;
    });

    $('#dataInvestigador tbody').on('click', 'tr', event => {
     
      let id:number=event.currentTarget.cells[4].children[0].dataset.elementId;  
      this.grupoInvestigador.IGR_CODI=id;   
      if (this.columnIndex==4)
      {                   
        this.showDataInvestigador=false;
        $('#iconoEspera').show();
        let investigador = new Investigador();
        investigador.accion="ALL";
        this.serviceInevstigador.getAll(investigador).subscribe(res=>{
          if (res!=null)
          {
            this.listInvestigador=res;
            this.selInvestigador =null;
            this.fechaInicioInvestigador=null;
            this.disabledFechaFinInvestigador=false;
            this.fechaTerminaInvestigador=null;
            this.grupoInvestigador.IGR_CODI=id;
          }
          this.serviceTipoVinculacion.getALL().subscribe(res=>{
            this.listTipoVinculacion=res;
            this.selTipoVinculacion=null;

            this.serviceGrupoInvestigador.get(id).subscribe(inves=>{
              this.selInvestigador=this.listInvestigador.find(x=>x.INV_CODI==inves.IGR_INVE_IDEN);
              this.selTipoVinculacion=this.listTipoVinculacion.find(x=>x.TIV_CODI==inves.IGR_TIPO_VINC_CODI);
              this.fechaInicioInvestigador=this.dateAdapter.parse(inves.IGR_FECH_INIC.toString());   
              if (inves.IGR_FECH_TERM!=null)
              {  
                this.fechaTerminaInvestigador=this.dateAdapter.parse(inves.IGR_FECH_TERM.toString());     
                this.disabledFechaFinInvestigador=true;
              }
              $('#iconoEspera').hide();
            },error=> {
              $('#iconoEspera').hide();
              console.clear();
              var errorComponent = new ErrorComponent();            
              this.mensaje =errorComponent.GenerarMensaje(error);          
              this.mensaje.nVentana="IdError";
              this.alerta.onChangedMyId("IdError");                      
              $('#IdError').show();
            });                      
          },error=> {
            $('#iconoEspera').hide();
            console.clear();
            var errorComponent = new ErrorComponent();            
            this.mensaje =errorComponent.GenerarMensaje(error);          
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();
          });         
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });        
                    
      }  
      if (this.columnIndex==5)
      {
        $('#iconoEspera').show();
        this.serviceGrupoInvestigador.get(this.grupoInvestigador.IGR_CODI).subscribe(res=>{
          $('#iconoEspera').hide();
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.CondicionSINO;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar investigador"
          this.mensaje.cuerpo="Desea eliminar el investigador " + res.nombreInvestigador  + " ?";                                     
          this.mensaje.nVentana="IdEliminarInvestigador";
          this.alerta.onChangedMyId("IdEliminarInvestigador");                      
          $('#IdEliminarInvestigador').show();   
          return false;   
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });

        
      }   
    });
  } 


  showFormCreacionInvestigador()
  {
    this.showDataInvestigador=false;
    this.textoEstadoInvestigador="Agregar investigador";
    $('#iconoEspera').show();
    let investigador = new Investigador();
    investigador.accion="ALL";
    this.serviceInevstigador.getAll(investigador).subscribe(res=>{
      if (res!=null)
      {
        this.listInvestigador=res;
        this.selInvestigador =null;
        this.fechaInicioInvestigador=null;
        this.disabledFechaFinInvestigador=false;
        this.fechaTerminaInvestigador=null;
        this.grupoInvestigador.IGR_CODI=0;
      }
      this.serviceTipoVinculacion.getALL().subscribe(res=>{
        this.listTipoVinculacion=res;
        this.selTipoVinculacion=null;
        $('#iconoEspera').hide();
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      })
     
    },error=> {
      $('#iconoEspera').hide();
      console.clear();
      var errorComponent = new ErrorComponent();            
      this.mensaje =errorComponent.GenerarMensaje(error);          
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();
    });
  }

  goBackInvestigador()
  {
    this.showDataInvestigador=true;
    $('#iconoEspera').show();
    this.serviceGrupoInvestigador.getALL(this.grupo.gru_codi).subscribe(res=>{
      this.iniciarTablaInvestigador();
        setTimeout(() => {
          if (res!=null)
          {
            this.tableInvestigador = $('#dataInvestigador').DataTable();
            this.tableInvestigador.clear();
            this.tableInvestigador.rows.add(res);
            this.tableInvestigador.draw();
            this.listGrupoInvestigador=[];
            let data= this.tableInvestigador.rows().data();
            data.each((value:InvestigadorGrupo, index:number) =>{
              let item = new InvestigadorGrupo();
              item.IGR_CODI=value.IGR_CODI;
              item.IGR_FECH_INIC=value.IGR_FECH_INIC;
              item.IGR_FECH_TERM=value.IGR_FECH_TERM;  
              item.IGR_INVE_IDEN=value.IGR_INVE_IDEN;
              this.listGrupoInvestigador.push(item);                  
            });
          }         
          $('#iconoEspera').hide();    
        });
      
    },error=> {
      $('#iconoEspera').hide();
      console.clear();
      var errorComponent = new ErrorComponent();            
      this.mensaje =errorComponent.GenerarMensaje(error);          
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();
    })
  }

  onClicGuardarInvestigador()
  {
    if (this.selInvestigador==null)
    {
     
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Agregar investigador"
        this.mensaje.cuerpo="Falta seleccionar investigador";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
    }

    if (this.selInvestigador.INV_CODI== this.grupo.gru_inv_codi)
    {
     
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Agregar investigador"
        this.mensaje.cuerpo="No se puede seleccionar el director de grupo ya se encuentra en la lista";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
    }

   

      let fecha :Date;
      let fechaMoment:moment.Moment;
      fecha =moment(this.dateAdapter.format(this.fechaInicioInvestigador),"DD MMMM YYYY").toDate();
  
      fechaMoment=moment(fecha);
  
  
      if (!fechaMoment.isValid())
      {
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Agregar investigador"
        this.mensaje.cuerpo="La fecha de inicio no  es válida";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
      }

      if (this.disabledFechaFinInvestigador==true)
      {
        fecha =moment(this.dateAdapter.format(this.fechaTerminaInvestigador),"DD MMMM YYYY").toDate();
  
        fechaMoment=moment(fecha);
    
    
        if (!fechaMoment.isValid())
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Agregar investigador"
          this.mensaje.cuerpo="La fecha de finalización no  es válida";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
        }

        if (moment(this.fechaTerminaInvestigador)<moment(this.fechaInicioInvestigador))
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Agregar investigador"
          this.mensaje.cuerpo="La fecha de finalización debe ser mayor que la fecha de inicio";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
        }


      }

      let existe =this.listGrupoInvestigador.find(x=>x.IGR_INVE_IDEN ==this.selInvestigador.INV_CODI && x.IGR_FECH_TERM==null);
      if (existe!=undefined && this.grupoInvestigador.IGR_CODI==0)
      {
        let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Agregar investigador"
          this.mensaje.cuerpo="El investigador " + this.selInvestigador.INV_NOMB + " " + this.selInvestigador.INV_APEL + " se ecuentra  activo";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
      }

      if (this.selTipoVinculacion==null)
      {
       
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Agregar investigador"
          this.mensaje.cuerpo="Falta seleccionar tipo vinculación";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
        }

    
      this.grupoInvestigador.IGR_INVE_IDEN=this.selInvestigador.INV_CODI;
      this.grupoInvestigador.IGR_TIPO_VINC_CODI=this.selTipoVinculacion.TIV_CODI;
      this.grupoInvestigador.IGR_FECH_INIC =moment(moment(this.dateAdapter.format(this.fechaInicioInvestigador),"DD MMMM YYYY").toDate()).toDate();;        
      this.grupoInvestigador.IGR_GRUP_CODI=this.grupo.gru_codi;
      this.grupoInvestigador.IGR_FECH_TERM=(this.fechaTerminaInvestigador!=null)?  moment(moment(this.dateAdapter.format(this.fechaTerminaInvestigador),"DD MMMM YYYY").toDate()).toDate():null;        
      if (this.grupoInvestigador.IGR_CODI==0)
      {                               
          $('#iconoEspera').show();
          this.serviceGrupoInvestigador.insert(this.grupoInvestigador).subscribe(res=>{
            this.listGrupoInvestigador.push(this.grupoInvestigador);
            this.goBackInvestigador();
            $('#iconoEspera').hide();              
          },error=> {
            $('#iconoEspera').hide();
            console.clear();
            var errorComponent = new ErrorComponent();            
            this.mensaje =errorComponent.GenerarMensaje(error);          
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();
          });     
      }
      else
      {
        $('#iconoEspera').show();
        this.serviceGrupoInvestigador.update(this.grupoInvestigador).subscribe(res=>{           
          this.goBackInvestigador();
          $('#iconoEspera').hide();              
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });     
      }
  }

  onChangeDisabledFechaFinInvestigador()
  {
    this.disabledFechaFinInvestigador=!this.disabledFechaFinInvestigador;
    (this.disabledFechaFinInvestigador==false)? this.fechaTerminaInvestigador=null:null;
  }


//////////////////////////////////////////SEMILLEROS /////////////////////////////////////////////////////////////////////

iniciarTablaSemillero() {
  this.tableSemillero = $('#dataSemillero').DataTable({
    dom: '<"top"f>rt<"bottom"p><"clear">',   
    searching: false,
    order: [],   
    columns: [
      
      { title: 'Nombre', data: 'nombreSemillero',width:'10%' },           
      { title: 'Fecha inicio', data: 'sgr_fech_inic',width:'10%' },  
      { title: 'Fecha Termina', data: '	sgr_fech_term',width:'10%' }         
    ],
    columnDefs: [
      {
        targets: [1],
        data: null,                   
        className: "text-left",          

        render: (data:any, type:any, full:SemilleroGrupo, meta:any) => {
            return moment(full.sgr_fech_inic).format("DD MMMM YYYY");                
        }
      },{
        targets: [2],
        data: null,                   
        className: "text-left",          
        
        render: (data:any, type:any, full:SemilleroGrupo, meta:any) => {
            if (full.sgr_fech_term!=null)              
              return moment(full.sgr_fech_term).format("DD MMMM YYYY");                              
            else
              return '';
        }
      }, {
        targets: [3],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:SemilleroGrupo, meta:any) => {
          
              return  '<i title="Editar semillero grupo" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.sgr_codi +  '></i>'                                            
        }
      },{
        targets: [4],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:SemilleroGrupo, meta:any) => {
        
             return  '<i title="Eliminar semillero grupo" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.sgr_codi +  '></i>'                                
                                         
        }
      }
    ],

    responsive: true,
    scrollY: 200,
    language:lenguajeSpanish
    
  });
 
  

  $('#dataSemillero tbody').on('click', 'td', event => {
  this.columnIndex=event.currentTarget.cellIndex;
  });

  $('#dataSemillero tbody').on('click', 'tr', event => {
   
    let id:number=event.currentTarget.cells[3].children[0].dataset.elementId;  
    this.grupoSemillero.sgr_codi=id;   
    if (this.columnIndex==3)
    {                   
      this.showDataSemillero=false;
      $('#iconoEspera').show();      
      this.serviceSemillero.getALL().subscribe(res=>{
        this.listSemillero=res;
        this.selSemillero=null;                
        this.fechaInicioSemillero=null;
        this.disabledFechaFinSemillero=false;
        this.fechaTerminaSemillero=null;
        this.grupoSemillero.sgr_codi=id;
        this.serviceSemilleroGrupo.get(id).subscribe(res=>{
          if (res!=null)
          {         
            
            this.selSemillero=this.listSemillero.find(x=>x.SEM_CODI==res.sgr_semi_codi);  

            this.fechaInicioSemillero=this.dateAdapter.parse(res.sgr_fech_inic.toString());   
            if (res.sgr_fech_term!=null)
            {  
              this.fechaTerminaSemillero=this.dateAdapter.parse(res.sgr_fech_term.toString());     
              this.disabledFechaFinSemillero=true;
            }           
          }  
          $('#iconoEspera').hide();      
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        }); 
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });


       
                  
    }  
    if (this.columnIndex==4)
    {
      $('#iconoEspera').show();
      this.serviceSemilleroGrupo.get(this.grupoSemillero.sgr_codi).subscribe(res=>{
        $('#iconoEspera').hide();
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.CondicionSINO;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Eliminar semillero"
        this.mensaje.cuerpo="Desea eliminar el investigador " + res.nombreSemillero  + " ?";                                     
        this.mensaje.nVentana="IdEliminarSemillero";
        this.alerta.onChangedMyId("IdEliminarSemillero");                      
        $('#IdEliminarSemillero').show();   
        return false;   
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });

      
    }   
  });
} 


showFormCreacionSemilleros()
{
  this.showDataSemillero=false;
  this.textoEstadoSemillero="Agregar semillero";
  $('#iconoEspera').show();
  let semillero = new Semillero();
  semillero.accion="ALL";
  this.serviceSemillero.getALL().subscribe(res=>{
    if (res!=null)
    {
      this.listSemillero=res;
      this.selSemillero =null;
      this.fechaInicioSemillero=null;
      this.disabledFechaFinSemillero=false;
      this.fechaTerminaSemillero=null;
      this.grupoSemillero.sgr_codi=0;
    }    
      $('#iconoEspera').hide();    
   
  },error=> {
    $('#iconoEspera').hide();
    console.clear();
    var errorComponent = new ErrorComponent();            
    this.mensaje =errorComponent.GenerarMensaje(error);          
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();
  });
}

goBackSemillero()
{
  this.showDataSemillero=true;
  $('#iconoEspera').show();
  this.serviceSemilleroGrupo.getALL(this.grupo.gru_codi).subscribe(res=>{
    this.iniciarTablaSemillero();
      setTimeout(() => {
        if (res!=null)
        {
          this.tableSemillero = $('#dataSemillero').DataTable();
          this.tableSemillero.clear();
          this.tableSemillero.rows.add(res);
          this.tableSemillero.draw();
          this.listGrupoSemillero=[];
          let data= this.tableSemillero.rows().data();
          data.each((value:SemilleroGrupo, index:number) =>{
            let item = new SemilleroGrupo();
            item.sgr_codi=value.sgr_codi;
            item.sgr_fech_inic=value.sgr_fech_inic;
            item.sgr_fech_term=value.sgr_fech_term;  
            item.sgr_semi_codi=value.sgr_semi_codi;
            this.listGrupoSemillero.push(item);                  
          });
        }         
        $('#iconoEspera').hide();    
      });
    
  },error=> {
    $('#iconoEspera').hide();
    console.clear();
    var errorComponent = new ErrorComponent();            
    this.mensaje =errorComponent.GenerarMensaje(error);          
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();
  })
}

onClicGuardarSemillero()
{
  if (this.selSemillero==null)
  {
   
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar semillero"
      this.mensaje.cuerpo="Falta seleccionar semillero";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
  }  

 

    let fecha :Date;
    let fechaMoment:moment.Moment;
    fecha =moment(this.dateAdapter.format(this.fechaInicioSemillero),"DD MMMM YYYY").toDate();

    fechaMoment=moment(fecha);


    if (!fechaMoment.isValid())
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar semillero"
      this.mensaje.cuerpo="La fecha de inicio no  es válida";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.disabledFechaFinSemillero==true)
    {
      fecha =moment(this.dateAdapter.format(this.fechaTerminaSemillero),"DD MMMM YYYY").toDate();

      fechaMoment=moment(fecha);
  
  
      if (!fechaMoment.isValid())
      {
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Agregar semillero"
        this.mensaje.cuerpo="La fecha de finalización no  es válida";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
      }

      if (moment(this.fechaTerminaSemillero)<moment(this.fechaInicioSemillero))
      {
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Agregar semillero"
        this.mensaje.cuerpo="La fecha de finalización debe ser mayor que la fecha de inicio";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
      }


    }

    let existe =this.listGrupoSemillero.find(x=>x.sgr_semi_codi ==this.selSemillero.SEM_CODI && x.sgr_fech_term==null);
    if (existe!=undefined && this.grupoSemillero.sgr_codi==0)
    {
      let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Agregar semillero";
        this.mensaje.cuerpo="El semillero " + this.selSemillero.SEM_NOMB + " se ecuentra  activo";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
    }

   

  
    this.grupoSemillero.sgr_semi_codi=this.selSemillero.SEM_CODI;    
    this.grupoSemillero.sgr_fech_inic =moment(moment(this.dateAdapter.format(this.fechaInicioSemillero),"DD MMMM YYYY").toDate()).toDate();;        
    this.grupoSemillero.sgr_grup_codi=this.grupo.gru_codi;
    this.grupoSemillero.sgr_fech_term=(this.fechaTerminaSemillero!=null)?  moment(moment(this.dateAdapter.format(this.fechaTerminaSemillero),"DD MMMM YYYY").toDate()).toDate():null;        
    if (this.grupoSemillero.sgr_codi==0)
    {                               
        $('#iconoEspera').show();
        this.serviceSemilleroGrupo.insert(this.grupoSemillero).subscribe(res=>{
          this.listGrupoSemillero.push(this.grupoSemillero);
          this.goBackSemillero();
          $('#iconoEspera').hide();              
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });     
    }
    else
    {
      $('#iconoEspera').show();
      this.serviceSemilleroGrupo.update(this.grupoSemillero).subscribe(res=>{           
        this.goBackSemillero();
        $('#iconoEspera').hide();              
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });     
    }
}

onChangeDisabledFechaFinSemillero()
{
  this.disabledFechaFinSemillero=!this.disabledFechaFinSemillero;
  (this.disabledFechaFinSemillero==false)? this.fechaTerminaSemillero=null:null;
}

//////////////////////////////////////////PRODUCCIÓN///////////////////////////////////////////////////////////////////////////


iniciarTablaProduccion() {
  this.tableProduccion = $('#dataProduccion').DataTable({
    dom: '<"top"f>rt<"bottom"p><"clear">',   
    searching: false,
    order: [],   
    columns: [
      { title: 'Investigador', data: 'nombreInvestigador',width:'10%' },        
      { title: 'Proyecto', data: 'nombreProyecto',width:'10%' },                    
      { title: 'Producto', data: 'nombreProducto',width:'10%' },        
      { title: 'Fecha inicio', data: 'fech_ini',width:'10%' },  
      { title: 'Fecha Termina', data: 'fech_term',width:'10%' }         
    ],
    columnDefs: [
      {
        targets: [3],
        data: null,                   
        className: "text-left",          

        render: (data:any, type:any, full:GrupoProyecto, meta:any) => {
            return moment(full.fech_ini).format("DD MMMM YYYY");                
        }
      },{
        targets: [4],
        data: null,                   
        className: "text-left",          
        
        render: (data:any, type:any, full:GrupoProyecto, meta:any) => {
            if (full.fech_term!=null)              
              return moment(full.fech_term).format("DD MMMM YYYY");                              
            else
              return '';
        }
      }, {
        targets: [5],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:GrupoProyecto, meta:any) => {
          
              return  '<i title="Editar grupo proyecto" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.id + '></i>'                                            
        }
      },{
        targets: [6],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:GrupoProyecto, meta:any) => {
        
             return  '<i title="Eliminar grupo proyecto" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.id + '></i>'                                
                                         
        }
      }
    ],

    responsive: true,
    scrollY: 200,
    language:lenguajeSpanish
    
  });
 
  

  $('#dataProduccion tbody').on('click', 'td', event => {
  this.columnIndex=event.currentTarget.cellIndex;
  });

  $('#dataProduccion tbody').on('click', 'tr', event => {
   
    let id:number=event.currentTarget.cells[5].children[0].dataset.elementId;  
    this.grupoProduccion.id=id;   
    if (this.columnIndex==5)
    {                   
      this.textoEstadoProduccion="Editar producto";
      this.showDataProduccion=false;
      $('#iconoEspera').show(); 

      this.serviceGrupoProyecto.get(id).subscribe(producto=>{
        let inve= new Investigador();
        inve.accion="ALL";       
        this.serviceInevstigador.getAll(inve).subscribe(res=>{
          if (res!=null)
          {
              this.listInvestigador=res;
              this.selInvestigadorProd=this.listInvestigador.find(x=>x.INV_CODI==producto.id_inve);
          }

          this.serviceProyecto.getByInve(producto.id_inve).subscribe(proyecto=>{
            this.listProyecto=proyecto;
            this.selProyecto=this.listProyecto.find(x=>x.PRO_CODI==producto.id_proy);

            this.serviceProducto.getByProyecto(producto.id_proy).subscribe(pro=>{
              this.listProducto=pro;
              this.selProducto=this.listProducto.find(x=>x.Id==producto.id_prod);
              this.fechaInicioProyecto=this.dateAdapter.parse(producto.fech_ini.toString());   
              if (producto.fech_term!=null)
              {  
                this.fechaFinalizaProyecto=this.dateAdapter.parse(producto.fech_term.toString());     
                this.disabledFechaFinProduccion=true;
              }      
              $('#iconoEspera').hide();
            },error=> {
              $('#iconoEspera').hide();
              console.clear();
              var errorComponent = new ErrorComponent();            
              this.mensaje =errorComponent.GenerarMensaje(error);          
              this.mensaje.nVentana="IdError";
              this.alerta.onChangedMyId("IdError");                      
              $('#IdError').show();
            });

           
          },error=> {
            $('#iconoEspera').hide();
            console.clear();
            var errorComponent = new ErrorComponent();            
            this.mensaje =errorComponent.GenerarMensaje(error);          
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();
          });

         
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });

     
                  
    }  
    if (this.columnIndex==6)
    {
      $('#iconoEspera').show();
      this.serviceGrupoProyecto.get(this.grupoProduccion.id).subscribe(res=>{
        $('#iconoEspera').hide();
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.CondicionSINO;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Eliminar producto"
        this.mensaje.cuerpo="Desea eliminar el producto " + res.nombreProducto  + " ?";                                     
        this.mensaje.nVentana="IdEliminarProducto";
        this.alerta.onChangedMyId("IdEliminarProducto");                      
        $('#IdEliminarProducto').show();   
        return false;   
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });

      
    }   
  });
} 

onClicGuardarProduccion()
{
  if (this.selInvestigadorProd==null)
  {
    let mensaje = new Mensaje();
    mensaje.tipo=TipoMensaje.Error;       
    this.mensaje = new Mensaje(mensaje);     
    this.mensaje.titulo="Producción de investigación"
    this.mensaje.cuerpo="Falta seleccionar el investigador";                                     
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();   
    return false;   
  }

  if (this.selProyecto==null)
  {
    let mensaje = new Mensaje();
    mensaje.tipo=TipoMensaje.Error;       
    this.mensaje = new Mensaje(mensaje);     
    this.mensaje.titulo="Producción de investigación"
    this.mensaje.cuerpo="Falta seleccionar el proyecto";                                     
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();   
    return false;   
  }

  if (this.selProducto==null)
  {
    let mensaje = new Mensaje();
    mensaje.tipo=TipoMensaje.Error;       
    this.mensaje = new Mensaje(mensaje);     
    this.mensaje.titulo="Producción de investigación"
    this.mensaje.cuerpo="Falta seleccionar el producto";                                     
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();   
    return false;   
  }


  

  let fecha :Date;
  let fechaMoment:moment.Moment;
  fecha =moment(this.dateAdapter.format(this.fechaInicioProyecto),"DD MMMM YYYY").toDate();

  fechaMoment=moment(fecha);


  if (!fechaMoment.isValid())
  {
    let mensaje = new Mensaje();
    mensaje.tipo=TipoMensaje.Error;       
    this.mensaje = new Mensaje(mensaje);     
    this.mensaje.titulo="Agregar producción"
    this.mensaje.cuerpo="La fecha de inicio no  es válida";                                     
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();   
    return false;   
  }

  if (this.disabledFechaFinProduccion==true)
  {
    fecha =moment(this.dateAdapter.format(this.fechaFinalizaProyecto),"DD MMMM YYYY").toDate();

    fechaMoment=moment(fecha);


    if (!fechaMoment.isValid())
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar producción"
      this.mensaje.cuerpo="La fecha de finalización no  es válida";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (moment(this.fechaFinalizaProyecto)<moment(this.fechaInicioProyecto))
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar prodcucción"
      this.mensaje.cuerpo="La fecha de finalización debe ser mayor que la fecha de inicio";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }


  }

  let existe =this.listGrupoProduccion.find(x=>x.id_inve ==this.selInvestigadorProd.INV_CODI && 
    x.id_proy==this.selProyecto.PRO_CODI && x.id_prod==this.selProducto.Id && x.fech_term==null);
  if (existe!=undefined && this.grupoProduccion.id==0)
  {
    let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar producción";
      this.mensaje.cuerpo="El producto " + this.selProducto.nombre + " ya  se ecuentra  activo";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
  }




    
    this.grupoProduccion.id_grup=this.grupo.gru_codi;
    this.grupoProduccion.id_inve=this.selInvestigadorProd.INV_CODI;
    this.grupoProduccion.id_prod=this.selProducto.Id;
    this.grupoProduccion.id_proy=this.selProyecto.PRO_CODI;
    this.grupoProduccion.fech_ini =moment(moment(this.dateAdapter.format(this.fechaInicioProyecto),"DD MMMM YYYY").toDate()).toDate();;            
    this.grupoProduccion.fech_term=(this.fechaFinalizaProyecto!=null)?  moment(moment(this.dateAdapter.format(this.fechaFinalizaProyecto),"DD MMMM YYYY").toDate()).toDate():null;        


    $('#iconoEspera').show();
    if (this.grupoProduccion.id==0)
    {
      this.serviceGrupoProyecto.insert(this.grupoProduccion).subscribe(res=>{
        this.grupoProduccion.id=res;
        this.listGrupoProduccion.push(this.grupoProduccion);
        $('#iconoEspera').hide();
        this.goBackProducccion();
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });
    }
    else
    {
      this.serviceGrupoProyecto.update(this.grupoProduccion).subscribe(res=>{                
        $('#iconoEspera').hide();
        this.goBackProducccion();
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });
    }

}

onChangeInvestigador()
{
  $('#iconoEspera').show();
  this.serviceProyecto.getByInve(this.selInvestigadorProd.INV_CODI).subscribe(res=>{
    $('#iconoEspera').hide();
    this.listProyecto=res;
    this.selProyecto=null;
    this.listProducto=[];
    this.selProducto=null;
  },error=> {
    $('#iconoEspera').hide();
    console.clear();
    var errorComponent = new ErrorComponent();            
    this.mensaje =errorComponent.GenerarMensaje(error);          
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();
  });
}

onChangeProyecto()
{
  $('#iconoEspera').show();
  this.serviceProducto.getByProyecto(this.selProyecto.PRO_CODI).subscribe(res=>{
    this.listProducto=res;
    this.selProducto=null;
    $('#iconoEspera').hide();

  },error=> {
    $('#iconoEspera').hide();
    console.clear();
    var errorComponent = new ErrorComponent();            
    this.mensaje =errorComponent.GenerarMensaje(error);          
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();
  });
}

showFormCreacionProduccion()
{
  this.showDataProduccion=false;
  let investigador = new Investigador();
  investigador.accion="ALL";
  $('#iconoEspera').show();
  this.grupoProduccion.id=0;
  this.textoEstadoProduccion="Nueva producción";
  this.serviceInevstigador.getAll(investigador).subscribe(res=>{
    this.listInvestigador=res; 
    this.selInvestigadorProd=null;
    this.listProducto=[];
    this.listProyecto=[];
    this.selProducto=null;
    this.selProyecto=null;
    this.fechaInicioProyecto=null;
    $('#iconoEspera').hide(); 
  },error=> {
    $('#iconoEspera').hide();
    console.clear();
    var errorComponent = new ErrorComponent();            
    this.mensaje =errorComponent.GenerarMensaje(error);          
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();
  })
}

goBackProducccion()
{
  this.showDataProduccion=true;

   
    $('#iconoEspera').show();
    this.serviceGrupoProyecto.getALL(this.grupo.gru_codi).subscribe(res=>{
      this.iniciarTablaProduccion();
        setTimeout(() => {
          if (res!=null)
          {
            this.tableProduccion = $('#dataProduccion').DataTable();
            this.tableProduccion.clear();
            this.tableProduccion.rows.add(res);
            this.tableProduccion.draw();           
          }         
          $('#iconoEspera').hide();    
        });
      
    },error=> {
      $('#iconoEspera').hide();
      console.clear();
      var errorComponent = new ErrorComponent();            
      this.mensaje =errorComponent.GenerarMensaje(error);          
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();
    })
  
  }

  onChangeDisabledFechaFinProduccion()
  {
    this.disabledFechaFinProduccion=!this.disabledFechaFinProduccion;
    (this.disabledFechaFinProduccion==false)? this.fechaFinalizaProyecto=null:null;
  }
  
  /////////////////////////////////////////////PLAN TRABAJO /////////////////////////////////////////////

  iniciarTablaPlanTrabajo() {
    this.tablePlanTrabajo = $('#dataPlanTrabajo').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',   
      searching: false,
      order: [],   
      columns: [
        { title: 'Nombre', data: 'pgr_nombre',width:'10%' },        
        { title: 'Fecha inicio', data: 'pgr_fech_inic',width:'10%' },  
        { title: 'Fecha Termina', data: 'pgr_fech_term',width:'10%' }         
      ],
      columnDefs: [
        {
          targets: [1],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:PlanTrabajoGrupo, meta:any) => {
              return moment(full.pgr_fech_inic).format("DD MMMM YYYY");                
          }
        },{
          targets: [2],
          data: null,                   
          className: "text-left",          
          
          render: (data:any, type:any, full:PlanTrabajoGrupo, meta:any) => {
              if (full.pgr_fech_term!=null)              
                return moment(full.pgr_fech_term).format("DD MMMM YYYY");                              
              else
                return '';
          }
        }, {
          targets: [3],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:PlanTrabajoGrupo, meta:any) => {
            
                return  '<i title="Descargar " style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-download"" aria-hidden="true" data-element-path=' + full.pgr_path + '></i>'                                            
          }
        }, {
          targets: [4],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:PlanTrabajoGrupo, meta:any) => {
            
                return  '<i title="Editar plan de trabajo" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.pgr_plnt_codi + '></i>'                                            
          }
        },{
          targets: [5],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:PlanTrabajoGrupo, meta:any) => {
          
               return  '<i title="Eliminar plan trabajo" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.pgr_plnt_codi + '></i>'                                
                                           
          }
        }
      ],

      responsive: true,
      scrollY: 200,
      language:lenguajeSpanish
      
    });
   
    

    $('#dataPlanTrabajo tbody').on('click', 'td', event => {
    this.columnIndex=event.currentTarget.cellIndex;
    });

    $('#dataPlanTrabajo tbody').on('click', 'tr', event => {
     
      let id:number=event.currentTarget.cells[4].children[0].dataset.elementId;  
      this.grupoLinea.gli_codi=id;  
      
      if (this.columnIndex==3)
      {         
        let path :string=event.currentTarget.cells[3].children[0].dataset.elementPath; 
           this.grupoPlanTrabajo.pgr_path=path;
            this.servicePlanTrabajo.getFile(this.grupoPlanTrabajo).subscribe(res=>{
                window.open(res,"_blank");
            });
        
      }


      if (this.columnIndex==4)
      {                   
        this.showDataPlanTrabajo=false;
        $('#iconoEspera').show();   
        this.grupoPlanTrabajo.pgr_plnt_codi=id;     
        this.servicePlanTrabajo.get(this.grupoPlanTrabajo.pgr_plnt_codi).subscribe(res=>{
          if (res!=null)
          {
            this.nombrePlanTrabajo=res.pgr_nombre;
            this.archivoSeleccionado=res.pgr_path;
            this.file=null;
            this.selectFile=null;
            this.fechaInicioPlanTrabajo=null;
            this.disabledFechaFinPlanTrabajo=false;
            this.fechaFinPlanTrabajo=null;
            this.fechaInicioPlanTrabajo=this.dateAdapter.parse(res.pgr_fech_inic.toString());   
            if (res.pgr_fech_term!=null)
            {  
              this.fechaFinPlanTrabajo=this.dateAdapter.parse(res.pgr_fech_term.toString());     
              this.disabledFechaFinPlanTrabajo=true;
            }          
          }
          $('#iconoEspera').hide();
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });
                    
      }  
      if (this.columnIndex==5)
      {
        $('#iconoEspera').show();
        this.grupoPlanTrabajo.pgr_plnt_codi=id;
        this.servicePlanTrabajo.get(this.grupoPlanTrabajo.pgr_plnt_codi).subscribe(res=>{
          $('#iconoEspera').hide();
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.CondicionSINO;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar plan trabajo"
          this.mensaje.cuerpo="Desea eliminar el plan trabajo " + res.pgr_nombre  + " ?";                                     
          this.mensaje.nVentana="IdEliminarPlanTrabajo";
          this.alerta.onChangedMyId("IdEliminarPlanTrabajo");                      
          $('#IdEliminarPlanTrabajo').show();   
          return false;   
        },error=> {
          $('#iconoEspera').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });

        
      }   
    });
  }  

  goBackPlanTrabajo()
  {
    this.showDataPlanTrabajo=true;
    $('#iconoEspera').show();
    this.servicePlanTrabajo.getALL(this.grupo.gru_codi).subscribe(res=>{
      $('#iconoEspera').hide();
      this.iniciarTablaPlanTrabajo();
      if (res!=null)
      {
        this.tablePlanTrabajo = $('#dataPlanTrabajo').DataTable();
        this.tablePlanTrabajo.clear();
        this.tablePlanTrabajo.rows.add(res);
        this.tablePlanTrabajo.draw();  
        this.listGrupoPlanTrabajo=[];
         let data= this.tablePlanTrabajo.rows().data();
          data.each((value:PlanTrabajoGrupo, index:number) =>{
            let item = new PlanTrabajoGrupo();
            item.pgr_plnt_codi =value.pgr_plnt_codi;
            item.pgr_grup_codi=value.pgr_grup_codi;
            item.pgr_nombre=value.pgr_nombre;
            item.pgr_fech_inic=value.pgr_fech_inic;
            item.pgr_fech_term=value.pgr_fech_term;                                
            this.listGrupoPlanTrabajo.push(item);                  
          });         
      }         
    },error=> {
      $('#iconoEspera').hide();
      console.clear();
      var errorComponent = new ErrorComponent();            
      this.mensaje =errorComponent.GenerarMensaje(error);          
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();
    });      
  }

  showFormCreacionPlanTrabajo()
  {
    this.showDataPlanTrabajo=false;    
    this.grupoPlanTrabajo.pgr_plnt_codi=0;
    this.fechaInicioPlanTrabajo=null;    
    this.fechaFinPlanTrabajo=null;
    this.disabledFechaFinPlanTrabajo=false;
    this.textoEstadoPlanTrabajo="Nuevo plan de trabajo";
    this.nombrePlanTrabajo="";
    this.selectFile=null;
    this.archivoSeleccionado="";
    this.file=null;
  }
  onClicGuardarPlanTrabajo()
  {
    if (this.nombrePlanTrabajo.replace(/\s/g, "")=="")
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar plan trabajo"
      this.mensaje.cuerpo="Debe digitar un nombre";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }



  let fecha :Date;
  let fechaMoment:moment.Moment;
  fecha =moment(this.dateAdapter.format(this.fechaInicioPlanTrabajo),"DD MMMM YYYY").toDate();

  fechaMoment=moment(fecha);


  if (!fechaMoment.isValid())
  {
    let mensaje = new Mensaje();
    mensaje.tipo=TipoMensaje.Error;       
    this.mensaje = new Mensaje(mensaje);     
    this.mensaje.titulo="Agregar plan de trabajo"
    this.mensaje.cuerpo="La fecha de inicio no  es válida";                                     
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();   
    return false;   
  }

  if (this.disabledFechaFinPlanTrabajo==true)
  {
    fecha =moment(this.dateAdapter.format(this.fechaFinPlanTrabajo),"DD MMMM YYYY").toDate();

    fechaMoment=moment(fecha);


    if (!fechaMoment.isValid())
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar plan trabajo"
      this.mensaje.cuerpo="La fecha de finalización no  es válida";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (moment(this.fechaFinPlanTrabajo)<moment(this.fechaInicioPlanTrabajo))
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar plan trabajo"
      this.mensaje.cuerpo="La fecha de finalización debe ser mayor que la fecha de inicio";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }     
   }
   if (this.file==null && this.grupoPlanTrabajo.pgr_plnt_codi==0)
   {
     let mensaje = new Mensaje();
     mensaje.tipo=TipoMensaje.Error;       
     this.mensaje = new Mensaje(mensaje);     
     this.mensaje.titulo="Agregar plan trabajo"
     this.mensaje.cuerpo="Seleccionar un documento";                                     
     this.mensaje.nVentana="IdError";
     this.alerta.onChangedMyId("IdError");                      
     $('#IdError').show();   
     return false;   
   }

   this.grupoPlanTrabajo.pgr_grup_codi =this.grupo.gru_codi;
   this.grupoPlanTrabajo.pgr_fech_inic =moment(moment(this.dateAdapter.format(this.fechaInicioPlanTrabajo),"DD MMMM YYYY").toDate()).toDate();;        
   this.grupoPlanTrabajo.pgr_nombre=this.nombrePlanTrabajo;
   this.grupoPlanTrabajo.pgr_fech_term=(this.fechaFinPlanTrabajo==null)? null: moment(moment(this.dateAdapter.format(this.fechaFinPlanTrabajo),"DD MMMM YYYY").toDate()).toDate();;        

   if (this.grupoPlanTrabajo.pgr_plnt_codi==0)
   {
    $('#iconoEspera').show();
    this.servicePlanTrabajo.insert(this.grupoPlanTrabajo).subscribe(res=>{
      this.grupoPlanTrabajo.pgr_plnt_codi=res;
      this.file.append('pgr_plnt_codi', this.grupoPlanTrabajo.pgr_plnt_codi.toString());
      this.servicePlanTrabajo.insertFile(this.file).subscribe(f=>{
        $('#iconoEspera').hide();
        this.goBackPlanTrabajo();
      },error=> {
        $('#iconoEspera').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });
    },error=> {
      $('#iconoEspera').hide();
      console.clear();
      var errorComponent = new ErrorComponent();            
      this.mensaje =errorComponent.GenerarMensaje(error);          
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();
    });
   }   
   else
   {
    $('#iconoEspera').show();
    this.servicePlanTrabajo.update(this.grupoPlanTrabajo).subscribe(res=>{
      if (this.file!=null)
      {
        this.file.append('pgr_plnt_codi', this.grupoPlanTrabajo.pgr_plnt_codi.toString());
        this.servicePlanTrabajo.insertFile(this.file).subscribe(f=>{
          $('#iconoEspera').hide();
          this.goBackPlanTrabajo();
        });
        
      } 
      else
      {         
        $('#iconoEspera').hide();
        this.goBackPlanTrabajo();
      }     
    },error=> {
      $('#iconoEspera').hide();
      console.clear();
      var errorComponent = new ErrorComponent();            
      this.mensaje =errorComponent.GenerarMensaje(error);          
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();
    });
   }

 }

  onChangeDisabledFechaFinPlanTrabajo()
  {
    this.disabledFechaFinPlanTrabajo=!this.disabledFechaFinPlanTrabajo;
    (this.disabledFechaFinPlanTrabajo==false)? this.fechaFinPlanTrabajo=null:null;
  }



  onFileChanged(fileInput:any)
  {      
    var reader = new FileReader();
    this.selectFile = <File>fileInput.target.files[0];                   
    if (this.selectFile==undefined) return;

    this.archivoSeleccionado=this.selectFile.name;
    $('#iconoEspera').show();
    reader.readAsDataURL(this.selectFile); // read file as data url
    this.file= new FormData();
    this.file.append('PLAN', fileInput.target.files[0]);
   
    reader.onload = (event : any) => { // called once readAsDataURL is completed
      $('#iconoEspera').hide();
      this.archivoSeleccionado=this.selectFile.name;
    }
  }
}
