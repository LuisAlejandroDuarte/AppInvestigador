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
import { SemilleroLineaService } from 'src/app/service/semillerolinea/service.semillerolinea';
import { SemilleroLinea } from 'src/app/entidad/semillerolinea/entidad.semillerolinea';
import { SemilleroInvestigador } from 'src/app/entidad/semilleroinvestigador/entidad.semilleroinvestigador';
import { SemilleroInvestigadorService } from 'src/app/service/semilleroinvestigador/service.semilleroinvestigador';
import { Programa } from 'src/app/entidad/programa/entidad.programa';
import { ProgramaAcademicoSemillero } from 'src/app/entidad/proacasemillero/entidad.proacasemillero';
import { ProgramaService } from 'src/app/service/programa/servicePrograma';
import { ServiceSemilleroPrograma } from 'src/app/service/semilleroprograma/service.semilleroprograma';
import { SemilleroProyectoProducto } from 'src/app/entidad/semilleroproyecto/entidad.semilleroproyecto';
import { ServiceSemilleroProyectoProducto } from 'src/app/service/semilleroproyecto/service.semilleroproyecto';
import { EstadoProyectoService } from 'src/app/service/estadoproyecto/service.estadoproyecto';
import { EstadoProductoService } from 'src/app/service/estadoproducto/service.estadoproducto';
import { EstadoProyecto } from 'src/app/entidad/estadoproyecto/entidad.estadoproyecto';
import { EstadoProducto } from 'src/app/entidad/estadoproducto/entidad.estadoproducto';
import { SemilleroDocumento } from 'src/app/entidad/semillerodocumento/entidad.semillerodocumento';
import { ServiceSemilleroDocumento } from 'src/app/service/semillerodocumento/service.semillerodocumento';

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
  user = new logueado();
  mensaje:Mensaje;
  active:number;
  disabled:boolean;
  infoNombre:string;
  infoApellido:string;
  infoZona:string;
  infoCentro:string;
  infoEscuela:string;
  infoPrograma:string;
  selAvalado?:boolean=null;
  selNoAvalado?:boolean=null;
  nombre:string="";
  fechaCreacion :NgbDateStruct;
  maxDate:NgbDateStruct;
  semillero= new Semillero();
  objetivos:string="";
  proyeccionRegional:string="";
  tematicaInvestigacion:string="";
  mision:string="";
  vision:string="";
  columnIndex:number;
  ///LINEAS
  listLinea:Linea[]=[];
  selLinea:Linea=null;
  showDataLinea:boolean=true;   
  textoEstadoLinea:string;
  disabledFechaFinLinea:boolean=false;
  fechaInicioLinea:NgbDateStruct;
  fechaTerminaLinea:NgbDateStruct;
  semilleroLinea= new SemilleroLinea();
  tableLinea:any;
  listSemilleroLinea:SemilleroLinea[]=[];


  //INVESTIGADOR
  showDataInvestigador:boolean=true;   
  textoEstadoInvestigador:string;
  disabledFechaFinInvestigador:boolean=false;
  fechaInicioInvestigador:NgbDateStruct;
  fechaTerminaInvestigador:NgbDateStruct;
  semilleroInvestigador= new SemilleroInvestigador();
  selInvestigador:Investigador=null;
  listInvestigador:Investigador[]=[];
  selTipoVinculacion:TipoVinculacion=null;
  listTipoVinculacion:TipoVinculacion[]=[]
  tableInvestigador:any;
  listSemilleroInvestigador:SemilleroInvestigador[]=[];


  ///PROGRAMA
  listProgramaAcademico:Programa[]=[];
  selProgramaAcademico:Programa=null;
  showDataProgramaAcademico:boolean=true;   
  textoEstadoProgramaAcademico:string;
  disabledFechaFinProgramaAcademico:boolean=false;
  fechaInicioProgramaAcademico:NgbDateStruct;
  fechaTerminaProgramaAcademico:NgbDateStruct;
  semilleroProgramaAcademico= new ProgramaAcademicoSemillero();
  tableProgramaAcademico:any;
  listSemilleroProgramaAcademico:ProgramaAcademicoSemillero[]=[];


  //PROYECTOSPRODUCTOS
  tableProduccion:any;
  selInvestigadorProd:Investigador=null;
  selProyecto:Proyecto=null;
  listProyecto:Proyecto[]=[];
  selProducto:Producto=null;
  listProducto:Producto[]=[];
  semilleroProduccion =  new SemilleroProyectoProducto();
  listSemilleroProduccion:SemilleroProyectoProducto[]=[];
  showDataProduccion:boolean=true;
  fechaInicioProyecto:NgbDateStruct;
  fechaFinalizaProyecto:NgbDateStruct;
  textoEstadoProduccion:string;
  disabledFechaFinProduccion:boolean=false;
  selEstadoProyecto:EstadoProyecto=null;
  selEstadoProducto:EstadoProducto=null;
  listEstadoProyecto:EstadoProyecto[]=[];
  listEstadoProducto:EstadoProducto[]=[];


  //PLAN TRABAJO

  tableDocumento:any;    
  semilleroDocumento =  new SemilleroDocumento();
  listSemilleroDocumento:SemilleroDocumento[]=[];
  showDataDocumento:boolean=true;
  fechaInicioDocumento:NgbDateStruct;
  fechaFinDocumento:NgbDateStruct;
  textoEstadoDocumento:string;
  disabledFechaFinDocumento:boolean=false;
  nombreDocumento:string;
  selectFile:File=null;
  archivoSeleccionado:string="";
  file:FormData;

  constructor(private router:Router,private route:ActivatedRoute,
    private dateAdapter: CustomDateParserFormatter,
    private serviceInvestigador:InvestigadorService,
    private serviceSemillero:SemilleroService,
    private serviceLinea:LineaService,
    private serviceSemilleroLinea:SemilleroLineaService,
    private serviceSemilleroInvestigador:SemilleroInvestigadorService,
    private serviceTipoVinculacion:TipoVinculacionService,
    private serviceProgramaAcademico:ProgramaService,
    private serviceSemilleroPrograma:ServiceSemilleroPrograma,
    private serviceSemilleroProyecto:ServiceSemilleroProyectoProducto,
    private serviceProyecto:ProyectoService,
    private serviceProducto:ProductoService,
    private serviceEstadoProyecto:EstadoProyectoService,
    private serviceEstadoProducto:EstadoProductoService,
    private serviceSemilleroDocumento:ServiceSemilleroDocumento ) { }

   
  ngOnInit(): void {
    this.user =JSON.parse(localStorage.getItem("user"));
    this.semillero.SEM_CODI=this.route.snapshot.params.id;    
    this.semillero.SEM_INV_CODI=this.user.inv_codi;
    moment.locale('es'); 
    this.maxDate=this.dateAdapter.parse(moment(new Date()).toString());  
    $('#iconoEspera').hide();    
    let investigador= new Investigador();
    investigador.INV_CODI=this.user.inv_codi;
    investigador.accion="GET";
    $('#iconoEspera').show();
    this.serviceInvestigador.getInvestigador(investigador).subscribe(res=>{     
      investigador=res;
      this.infoApellido=res.INV_APEL;
      this.infoNombre=res.INV_NOMB;
      investigador.accion="CENTRO"
      this.serviceInvestigador.getInvestigador(investigador).subscribe(res=>{
        this.infoCentro=res.CEN_NOMB;
        investigador.accion="ZONA"
        this.serviceInvestigador.getInvestigador(investigador).subscribe(res2=>{
          this.infoZona=res2.ZON_NOMB;
          investigador.accion="PROGRAMA"
          this.serviceInvestigador.getInvestigador(investigador).subscribe(res=>{
            this.infoPrograma=res.PAC_NOMB;
            investigador.accion="ESCUELA"
            this.serviceInvestigador.getInvestigador(investigador).subscribe(res2=>{
              this.infoEscuela=res2.ESC_NOMB;
              $('#iconoEspera').hide();
              if (this.route.snapshot.params.id==0)
              {
                this.fechaCreacion=this.dateAdapter.parse(moment(new Date()).toString());
                this.disabled=true;
              }
              else{
                this.disabled=false;
                $('#iconoEspera').show();
                this.semillero.SEM_CODI=this.route.snapshot.params.id;
                this.serviceSemillero.get(this.semillero.SEM_CODI).subscribe(res=>{
                    this.nombre=res.SEM_NOMB;              
                    this.objetivos=(res.SEM_OBJE==null)? "":res.SEM_OBJE;
                    this.mision=(res.SEM_MISI==null)? "":res.SEM_MISI;
                    this.vision=(res.SEM_VISI==null)?"":res.SEM_VISI;
                    this.proyeccionRegional=(res.SEM_PROY_REGI==null)? "":res.SEM_PROY_REGI;
                    this.tematicaInvestigacion=(res.SEM_TEMA_INVE==null)? "":res.SEM_TEMA_INVE;         
                    this.fechaCreacion=this.dateAdapter.parse(res.SEM_FECH_INI.toString());                    
                    this.selAvalado=(res.SEM_AVAL==1)? true:false;
                    this.selNoAvalado=!this.selAvalado;                    
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

  onChangeNavs(changeEvent: NgbNavChangeEvent)
  {
    switch (changeEvent.nextId) {
      case 2:        
        this.showDataLinea=true;
        $('#iconoEspera').show();
        this.serviceSemilleroLinea.getALL(this.semillero.SEM_CODI).subscribe(res=>{
          this.iniciarTablaLineas();
            setTimeout(() => {
              if (res!=null)
              {
              this.listSemilleroLinea=[];
              this.tableLinea = $('#dataLineas').DataTable();
              this.tableLinea.clear();
              this.tableLinea.rows.add(res);
              this.tableLinea.draw();
              let data= this.tableLinea.rows().data();
                data.each((value:SemilleroLinea, index:number) =>{
                  let item = new SemilleroLinea();
                  item.LIS_CODI=value.LIS_CODI;
                  item.LIS_FECH_INI=value.LIS_FECH_INI;
                  item.LIS_FECH_TERM=value.LIS_FECH_TERM;  
                  item.LIS_LINE_INVE_CODI=value.LIS_LINE_INVE_CODI;
                  this.listSemilleroLinea.push(item);                  
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
      this.serviceSemilleroInvestigador.getALL(this.semillero.SEM_CODI).subscribe(res=>{
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
                data.each((value:SemilleroInvestigador, index:number) =>{
                  let item = new SemilleroInvestigador();
                  item.INS_CODI=value.INS_CODI;
                  item.INS_FECH_INIC=value.INS_FECH_INIC;
                  item.INS_FECH_TERM=value.INS_FECH_TERM;  
                  item.INS_INVE_IDEN=value.INS_INVE_IDEN;
                  this.listSemilleroInvestigador.push(item);                  
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
          this.showDataProgramaAcademico=true;
          $('#iconoEspera').show();
          this.serviceSemilleroPrograma.getALL(this.semillero.SEM_CODI).subscribe(res=>{
            $('#iconoEspera').hide();
            this.iniciarTablaProgramaAcademico();
            setTimeout(() => {
              if (res!=null)
              {
               
              this.tableProgramaAcademico = $('#dataProgramaAcademico').DataTable();
                  this.tableProgramaAcademico.clear();
                  this.tableProgramaAcademico.rows.add(res);
                  this.tableProgramaAcademico.draw();
                  let data= this.tableProgramaAcademico.rows().data();
                    data.each((value:ProgramaAcademicoSemillero, index:number) =>{
                      let item = new ProgramaAcademicoSemillero();
                      item.PAS_CODI=value.PAS_CODI;
                      item.PAS_FECH_INI=value.PAS_FECH_INI;
                      item.PAS_FECH_TERM=value.PAS_FECH_TERM;  
                      item.PAS_PACA_CODI=value.PAS_PACA_CODI;
                      this.listSemilleroProgramaAcademico.push(item);                  
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
    case 5:
      $('#iconoEspera').show();
      this.showDataProduccion=true;
      this.serviceSemilleroProyecto.getALL(this.semillero.SEM_CODI).subscribe(res=>{
        $('#iconoEspera').hide();
        this.iniciarTablaProduccion();
        if (res!=null)
        {
          this.tableProduccion = $('#dataProduccion').DataTable();
          this.tableProduccion.clear();
          this.tableProduccion.rows.add(res);
          this.tableProduccion.draw();  
          this.listSemilleroProduccion=[];
           let data= this.tableProduccion.rows().data();
            data.each((value:SemilleroProyectoProducto, index:number) =>{
              let item = new SemilleroProyectoProducto();
              item.PPR_CODI=value.PPR_CODI;              
              item.PPR_INVE_CODI=value.PPR_INVE_CODI;
              item.PPR_PROD_CODI=value.PPR_PROD_CODI;
              item.PPR_PROY_CODI=value.PPR_PROY_CODI;              
              item.PPR_FECH_INIC=value.PPR_FECH_INIC;
              item.PPR_FECH_TERM=value.PPR_FECH_TERM;
              
              this.listSemilleroProduccion.push(item);                  
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
        this.showDataDocumento=true;
        $('#iconoEspera').show();
        this.serviceSemilleroDocumento.getALL(this.semillero.SEM_CODI).subscribe(res=>{
          $('#iconoEspera').hide();
          this.iniciarTablaDocumento();
          if (res!=null)
          {
            this.tableDocumento = $('#dataDocumento').DataTable();
            this.tableDocumento.clear();
            this.tableDocumento.rows.add(res);
            this.tableDocumento.draw();  
            this.listSemilleroDocumento=[];
             let data= this.tableDocumento.rows().data();
              data.each((value:SemilleroDocumento, index:number) =>{
                let item = new SemilleroDocumento();
                item.DSEM_CODI =value.DSEM_CODI;
                item.DSEM_SEM_CODI=value.DSEM_SEM_CODI;
                item.DSEM_NOMB=value.DSEM_NOMB;
                item.DSEM_FECH_INIC=value.DSEM_FECH_INIC;
                item.DSEM_FECH_TERM=value.DSEM_FECH_TERM;                                
                this.listSemilleroDocumento.push(item);                    
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
  }

  //SI
  onClicBoton1(event:any)
  {
    if (event.nVentana=="IdError")
    $('#IdError').hide();

    if (event.nVentana=="IdEliminarLinea")
    {
      $('#iconoEspera').show();
        this.serviceSemilleroLinea.delete(this.semilleroLinea).subscribe(res=>{
          $('#iconoEspera').hide();
          var indexes = this.tableLinea
          .rows()
          .indexes()
          .filter((value:any,index:any) => {
            return  this.semilleroLinea.LIS_CODI==this.tableLinea.row(value).data().LIS_CODI;
          } );
      
          this.tableLinea.rows(indexes).remove().draw();
          let index = this.listSemilleroLinea.findIndex(x=>x.LIS_CODI==this.semilleroLinea.LIS_CODI);
          this.listSemilleroLinea.splice(index,1);
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
      this.serviceSemilleroInvestigador.delete(this.semilleroInvestigador).subscribe(res=>{
        $('#iconoEspera').hide();
        var indexes = this.tableInvestigador
        .rows()
        .indexes()
        .filter((value:any,index:any) => {
          return  this.semilleroInvestigador.INS_CODI==this.tableInvestigador.row(value).data().INS_CODI;
        } );
    
        this.tableInvestigador.rows(indexes).remove().draw();
        let index = this.listSemilleroInvestigador.findIndex(x=>x.INS_CODI==this.semilleroInvestigador.INS_CODI);
        this.listSemilleroInvestigador.splice(index,1);
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
    if (event.nVentana=="IdEliminarProgramaAcademico")
    {
      $('#iconoEspera').show();
      this.serviceSemilleroPrograma.delete(this.semilleroProgramaAcademico).subscribe(res=>{
        $('#iconoEspera').hide();
        var indexes = this.tableProgramaAcademico
        .rows()
        .indexes()
        .filter((value:any,index:any) => {
          return  this.semilleroProgramaAcademico.PAS_CODI==this.tableProgramaAcademico.row(value).data().PAS_CODI;
        } );
    
        this.tableProgramaAcademico.rows(indexes).remove().draw();
        let index = this.listSemilleroProgramaAcademico.findIndex(x=>x.PAS_CODI==this.semilleroProgramaAcademico.PAS_CODI);
        this.listSemilleroProgramaAcademico.splice(index,1);
        $('#IdEliminarProgramaAcademico').hide();    
      },error=> {
          $('#iconoEspera').hide();
          $('#IdEliminarProgramaAcademico').hide();    
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
      this.serviceSemilleroProyecto.delete(this.semilleroProduccion).subscribe(res=>{
        $('#iconoEspera').hide();
        var indexes = this.tableProduccion
        .rows()
        .indexes()
        .filter((value:any,index:any) => {
          return  this.semilleroProduccion.PPR_CODI==this.tableProduccion.row(value).data().PPR_CODI;
        } );
    
        this.tableProduccion.rows(indexes).remove().draw();
        let index = this.listSemilleroProduccion.findIndex(x=>x.PPR_CODI==this.semilleroProduccion.PPR_CODI);
        this.listSemilleroProduccion.splice(index,1);
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

    if (event.nVentana=="IdEliminarDocumento")
    {
      $('#iconoEspera').show();
      this.serviceSemilleroDocumento.delete(this.semilleroDocumento).subscribe(res=>{
        $('#iconoEspera').hide();
        var indexes = this.tableDocumento
        .rows()
        .indexes()
        .filter((value:any,index:any) => {
          return  this.semilleroDocumento.DSEM_CODI==this.tableDocumento.row(value).data().DSEM_CODI;
        } );
    
        this.tableDocumento.rows(indexes).remove().draw();
      
        $('#IdEliminarDocumento').hide();    
      },error=> {
          $('#iconoEspera').hide();
          $('#IdEliminarDocumento').hide();    
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

    if (event.nVentana=="IdEliminarProgramaAcademico")
    {
      $('#IdEliminarProgramaAcademico').hide();    
    }

    
    if (event.nVentana=="IdEliminarSemillero")
    $('#IdEliminarSemillero').hide();    

    if (event.nVentana=="IdEliminarProducto")
    $('#IdEliminarProducto').hide();    

    if (event.nVentana=="IdEliminarDocumento")
    $('#IdEliminarDocumento').hide();    
  }

  
  Validar():boolean {
    if (this.nombre.replace(/\s/g, "")=="")
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Semillero"
      this.mensaje.cuerpo="Falta nombre del semillero";                                     
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
      this.mensaje.titulo="Semillero"
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
      this.mensaje.titulo="Semillero"
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
      this.mensaje.titulo="Semillero"
      this.mensaje.cuerpo="Falta si es avalado";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    return true;
  }
  onGuardar()
  {
    switch (this.active) {
      case 1:

      if (this.Validar())
      {
          this.semillero.SEM_NOMB=this.nombre.replace(/\s/g, "");
          this.semillero.SEM_FECH_INI=moment(moment(this.dateAdapter.format(this.fechaCreacion),"DD MMMM YYYY").toDate()).toDate();
          this.semillero.SEM_OBJE=this.objetivos.replace(/\s/g, "");
          this.semillero.SEM_VISI=this.vision.replace(/\s/g, "");
          this.semillero.SEM_MISI=this.mision.replace(/\s/g, "");
          this.semillero.SEM_PROY_REGI=this.proyeccionRegional.replace(/\s/g, "");
          this.semillero.SEM_TEMA_INVE=this.tematicaInvestigacion.replace(/\s/g, "");
          this.semillero.SEM_AVAL=(this.selAvalado==true)? 1:0;
          this.semillero.SEM_INV_CODI=this.user.inv_codi;
          $('#iconoEspera').show();
          if (this.semillero.SEM_CODI==0)
          {
            this.serviceSemillero.insert(this.semillero).subscribe(res=>{
              this.semillero.SEM_CODI=res;
              this.disabled=false;
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
            this.serviceSemillero.update(this.semillero).subscribe(res=>{
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
      }
      break;
    }
  }

  onSalir()
  {
    this.router.navigate(['/semillero/0']);
  }





  /////////////////////////// LÍNEAS DE INVESTIGACIÓN    ////////////////////////////////////////////////////////

  iniciarTablaLineas() {
    this.tableLinea = $('#dataLineas').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',   
      searching: false,
      order: [],   
      columns: [
        { title: 'Nombre', data: 'nombreLinea',width:'10%' },        
        { title: 'Fecha inicio', data: 'LIS_FECH_INI',width:'10%' },  
        { title: 'Fecha Termina', data: 'LIS_FECH_TERM',width:'10%' }         
      ],
      columnDefs: [
        {
          targets: [1],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:SemilleroLinea, meta:any) => {
              return moment(full.LIS_FECH_INI).format("DD MMMM YYYY");                
          }
        },{
          targets: [2],
          data: null,                   
          className: "text-left",          
          
          render: (data:any, type:any, full:SemilleroLinea, meta:any) => {
              if (full.LIS_FECH_TERM!=null)              
                return moment(full.LIS_FECH_TERM).format("DD MMMM YYYY");                              
              else
                return '';
          }
        }, {
          targets: [3],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:SemilleroLinea, meta:any) => {
            
                return  '<i title="Editar grupo" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.LIS_CODI + '></i>'                                            
          }
        },{
          targets: [4],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:SemilleroLinea, meta:any) => {
          
               return  '<i title="Eliminar grupo" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.LIS_CODI + '></i>'                                
                                           
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
      this.semilleroLinea.LIS_CODI=id;   
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
            this.serviceSemilleroLinea.get(id).subscribe(res=>{
              this.semilleroLinea.LIS_CODI=res.LIS_CODI;
              this.selLinea = this.listLinea.find(x=>x.lin_codi==res.LIS_LINE_INVE_CODI);
              this.fechaInicioLinea=this.dateAdapter.parse(res.LIS_FECH_INI.toString());   
              if (res.LIS_FECH_TERM!=null)
              {  
                this.fechaTerminaLinea=this.dateAdapter.parse(res.LIS_FECH_TERM.toString());     
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
        this.serviceSemilleroLinea.get(this.semilleroLinea.LIS_CODI).subscribe(res=>{
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
        this.semilleroLinea.LIS_CODI=0;
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

        let existe =this.listSemilleroLinea.find(x=>x.LIS_LINE_INVE_CODI==this.selLinea.lin_codi && x.LIS_FECH_TERM==null);
        if (existe!=undefined && this.semilleroLinea.LIS_CODI==0)
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

        this.semilleroLinea.LIS_LINE_INVE_CODI=this.selLinea.lin_codi;
        this.semilleroLinea.LIS_FECH_INI=moment(moment(this.dateAdapter.format(this.fechaInicioLinea),"DD MMMM YYYY").toDate()).toDate();;        
        this.semilleroLinea.LIS_SEMI_CODI=this.semillero.SEM_CODI;
        this.semilleroLinea.LIS_FECH_TERM=(this.fechaTerminaLinea==null)? null: moment(moment(this.dateAdapter.format(this.fechaTerminaLinea),"DD MMMM YYYY").toDate()).toDate();;        
        if (this.semilleroLinea.LIS_CODI==0)
        {                               
            $('#iconoEspera').show();
            this.serviceSemilleroLinea.insert(this.semilleroLinea).subscribe(res=>{
              this.listSemilleroLinea.push(this.semilleroLinea);
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
          this.serviceSemilleroLinea.update(this.semilleroLinea).subscribe(res=>{           
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
    this.serviceSemilleroLinea.getALL(this.semillero.SEM_CODI).subscribe(res=>{
      this.iniciarTablaLineas();
        setTimeout(() => {
          if (res!=null)
          {
            this.tableLinea = $('#dataLineas').DataTable();
            this.tableLinea.clear();
            this.tableLinea.rows.add(res);
            this.tableLinea.draw();
            this.listSemilleroLinea=[];
            let data= this.tableLinea.rows().data();
                data.each((value:SemilleroLinea, index:number) =>{
                  let item = new SemilleroLinea();
                  item.LIS_CODI=value.LIS_CODI;
                  item.LIS_FECH_INI=value.LIS_FECH_INI;
                  item.LIS_FECH_TERM=value.LIS_FECH_TERM;  
                  item.LIS_LINE_INVE_CODI=value.LIS_LINE_INVE_CODI;
                  this.listSemilleroLinea.push(item);
                  
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
  this.tableInvestigador = $('#dataInvestigador').DataTable({
    dom: '<"top"f>rt<"bottom"p><"clear">',   
    searching: false,
    order: [],   
    columns: [
      
      { title: 'Nombre', data: 'nombreInvestigador',width:'10%' },     
      { title: 'Vinculación', data: 'nombreTipoVinculacion',width:'10%' },     
      { title: 'Fecha inicio', data: 'INS_FECH_INIC',width:'10%' },  
      { title: 'Fecha Termina', data: 'INS_FECH_TERM',width:'10%' }         
    ],
    columnDefs: [
      {
        targets: [2],
        data: null,                   
        className: "text-left",          

        render: (data:any, type:any, full:SemilleroInvestigador, meta:any) => {
            return moment(full.INS_FECH_INIC).format("DD MMMM YYYY");                
        }
      },{
        targets: [3],
        data: null,                   
        className: "text-left",          
        
        render: (data:any, type:any, full:SemilleroInvestigador, meta:any) => {
            if (full.INS_FECH_TERM!=null)              
              return moment(full.INS_FECH_TERM).format("DD MMMM YYYY");                              
            else
              return '';
        }
      }, {
        targets: [4],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:SemilleroInvestigador, meta:any) => {
          
              return  '<i title="Editar investigador" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.INS_CODI +  '></i>'                                            
        }
      },{
        targets: [5],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:SemilleroInvestigador, meta:any) => {
        
             return  '<i title="Eliminar investigador" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.INS_CODI +  '></i>'                                
                                         
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
    this.semilleroInvestigador.INS_CODI=id;   
    if (this.columnIndex==4)
    {                   
      this.showDataInvestigador=false;
      $('#iconoEspera').show();
      let investigador = new Investigador();
      investigador.accion="ALL";
      this.serviceInvestigador.getAll(investigador).subscribe(res=>{
        if (res!=null)
        {
          this.listInvestigador=res;
          this.selInvestigador =null;
          this.fechaInicioInvestigador=null;
          this.disabledFechaFinInvestigador=false;
          this.fechaTerminaInvestigador=null;
          this.semilleroInvestigador.INS_CODI=id;
        }
        this.serviceTipoVinculacion.getALL().subscribe(res=>{
          this.listTipoVinculacion=res;
          this.selTipoVinculacion=null;

          this.serviceSemilleroInvestigador.get(id).subscribe(inves=>{
            this.selInvestigador=this.listInvestigador.find(x=>x.INV_CODI==inves.INS_INVE_IDEN);
            this.selTipoVinculacion=this.listTipoVinculacion.find(x=>x.TIV_CODI==inves.INS_TIPO_VINC_CODI);
            this.fechaInicioInvestigador=this.dateAdapter.parse(inves.INS_FECH_INIC.toString());   
            if (inves.INS_FECH_TERM!=null)
            {  
              this.fechaTerminaInvestigador=this.dateAdapter.parse(inves.INS_FECH_TERM.toString());     
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
      this.serviceSemilleroInvestigador.get(this.semilleroInvestigador.INS_CODI).subscribe(res=>{
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
  this.serviceInvestigador.getAll(investigador).subscribe(res=>{
    if (res!=null)
    {
      this.listInvestigador=res;
      this.selInvestigador =null;
      this.fechaInicioInvestigador=null;
      this.disabledFechaFinInvestigador=false;
      this.fechaTerminaInvestigador=null;
      this.semilleroInvestigador.INS_CODI=0;
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
  this.serviceSemilleroInvestigador.getALL(this.semillero.SEM_CODI).subscribe(res=>{
    this.iniciarTablaInvestigador();
      setTimeout(() => {
        if (res!=null)
        {
          this.tableInvestigador = $('#dataInvestigador').DataTable();
          this.tableInvestigador.clear();
          this.tableInvestigador.rows.add(res);
          this.tableInvestigador.draw();
          this.listSemilleroInvestigador=[];
          let data= this.tableInvestigador.rows().data();
          data.each((value:SemilleroInvestigador, index:number) =>{
            let item = new SemilleroInvestigador();
            item.INS_CODI=value.INS_CODI;
            item.INS_FECH_INIC=value.INS_FECH_INIC;
            item.INS_FECH_TERM=value.INS_FECH_TERM;  
            item.INS_INVE_IDEN=value.INS_INVE_IDEN;
            this.listSemilleroInvestigador.push(item);                  
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

  if (this.selInvestigador.INV_CODI== this.semillero.SEM_INV_CODI)
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

    let existe =this.listSemilleroInvestigador.find(x=>x.INS_INVE_IDEN ==this.selInvestigador.INV_CODI && x.INS_FECH_TERM==null);
    if (existe!=undefined && this.semilleroInvestigador.INS_CODI==0)
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

  
    this.semilleroInvestigador.INS_INVE_IDEN=this.selInvestigador.INV_CODI;
    this.semilleroInvestigador.INS_TIPO_VINC_CODI=this.selTipoVinculacion.TIV_CODI;
    this.semilleroInvestigador.INS_FECH_INIC =moment(moment(this.dateAdapter.format(this.fechaInicioInvestigador),"DD MMMM YYYY").toDate()).toDate();;        
    this.semilleroInvestigador.INS_SEMI_CODI =this.semillero.SEM_CODI;
    this.semilleroInvestigador.INS_FECH_TERM=(this.fechaTerminaInvestigador!=null)?  moment(moment(this.dateAdapter.format(this.fechaTerminaInvestigador),"DD MMMM YYYY").toDate()).toDate():null;        
    if (this.semilleroInvestigador.INS_CODI==0)
    {                               
        $('#iconoEspera').show();
        this.serviceSemilleroInvestigador.insert(this.semilleroInvestigador).subscribe(res=>{
          this.listSemilleroInvestigador.push(this.semilleroInvestigador);
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
      this.serviceSemilleroInvestigador.update(this.semilleroInvestigador).subscribe(res=>{           
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

/////////////////////////PROGRAMAS ACADÉMICOS /////////////////////////////////////////////////////////////////////////

iniciarTablaProgramaAcademico() {
  this.tableProgramaAcademico = $('#dataProgramaAcademico').DataTable({
    dom: '<"top"f>rt<"bottom"p><"clear">',   
    searching: false,
    order: [],   
    columns: [
      { title: 'Nombre', data: 'nombreProgramaAcademico',width:'10%' },        
      { title: 'Fecha inicio', data: 'PAS_FECH_INI',width:'10%' },  
      { title: 'Fecha Termina', data: 'PAS_FECH_TERM',width:'10%' }         
    ],
    columnDefs: [
      {
        targets: [1],
        data: null,                   
        className: "text-left",          

        render: (data:any, type:any, full:ProgramaAcademicoSemillero, meta:any) => {
            return moment(full.PAS_FECH_INI).format("DD MMMM YYYY");                
        }
      },{
        targets: [2],
        data: null,                   
        className: "text-left",          
        
        render: (data:any, type:any, full:ProgramaAcademicoSemillero, meta:any) => {
            if (full.PAS_FECH_TERM!=null)              
              return moment(full.PAS_FECH_TERM).format("DD MMMM YYYY");                              
            else
              return '';
        }
      }, {
        targets: [3],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:ProgramaAcademicoSemillero, meta:any) => {
          
              return  '<i title="Editar grupo" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.PAS_CODI + '></i>'                                            
        }
      },{
        targets: [4],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:ProgramaAcademicoSemillero, meta:any) => {
        
             return  '<i title="Eliminar grupo" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.PAS_CODI + '></i>'                                
                                         
        }
      }
    ],

    responsive: true,
    scrollY: 200,
    language:lenguajeSpanish
    
  });
 
  

  $('#dataProgramaAcademico tbody').on('click', 'td', event => {
  this.columnIndex=event.currentTarget.cellIndex;
  });

  $('#dataProgramaAcademico tbody').on('click', 'tr', event => {
   
    let id:number=event.currentTarget.cells[3].children[0].dataset.elementId;  
    this.semilleroProgramaAcademico.PAS_CODI=id;   
    if (this.columnIndex==3)
    {                   
      this.showDataProgramaAcademico=false;
      $('#iconoEspera').show();        
      let programa = new Programa();
      programa.ACCION="listPrograma";
      this.serviceProgramaAcademico.getListPrograma(programa).subscribe(res=>{
        if (res!=null)
        {
          this.listProgramaAcademico=res;
          this.selProgramaAcademico=null;
          this.fechaInicioProgramaAcademico=null;
          this.disabledFechaFinProgramaAcademico=false;
          this.fechaTerminaProgramaAcademico=null;
          this.serviceSemilleroPrograma.get(id).subscribe(res=>{
            this.semilleroProgramaAcademico.PAS_CODI=res.PAS_CODI;
            this.selProgramaAcademico = this.listProgramaAcademico.find(x=>x.PAC_CODI==res.PAS_PACA_CODI);
            this.fechaInicioProgramaAcademico=this.dateAdapter.parse(res.PAS_FECH_INI.toString());   
            if (res.PAS_FECH_TERM!=null)
            {  
              this.fechaTerminaProgramaAcademico=this.dateAdapter.parse(res.PAS_FECH_TERM.toString());     
              this.disabledFechaFinProgramaAcademico=true;
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
      this.serviceSemilleroPrograma.get(this.semilleroProgramaAcademico.PAS_CODI).subscribe(res=>{
        $('#iconoEspera').hide();
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.CondicionSINO;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Eliminar programa académico"
        this.mensaje.cuerpo="Desea eliminar la línea " + res.nombreProgramaAcademico  + " ?";                                     
        this.mensaje.nVentana="IdEliminarProgramaAcademico";
        this.alerta.onChangedMyId("IdEliminarProgramaAcademico");                      
        $('#IdEliminarProgramaAcademico').show();   
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


showFormCreacionProgramaAcademico()
{
  this.showDataProgramaAcademico=false;
  this.textoEstadoProgramaAcademico="Agregar programa académico";
  $('#iconoEspera').show();
  let programa = new Programa();
  programa.ACCION="listPrograma";
  this.serviceProgramaAcademico.getListPrograma(programa).subscribe(res=>{
    if (res!=null)
    {
      this.listProgramaAcademico=res;
      this.selProgramaAcademico=null;
      this.fechaInicioProgramaAcademico=null;
      this.disabledFechaFinProgramaAcademico=false;
      this.fechaTerminaProgramaAcademico=null;
      this.semilleroProgramaAcademico.PAS_CODI=0;
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

onClicGuardarProgramaAcademico()
{
    if (this.selProgramaAcademico==null)
    {
     
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Agregar programa académico"
        this.mensaje.cuerpo="Falta seleccionar línea de investigación";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
      }

      let fecha :Date;
      let fechaMoment:moment.Moment;
      fecha =moment(this.dateAdapter.format(this.fechaInicioProgramaAcademico),"DD MMMM YYYY").toDate();
  
      fechaMoment=moment(fecha);
  
  
      if (!fechaMoment.isValid())
      {
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Agregar programa académico"
        this.mensaje.cuerpo="La fecha de inicio no  es válida";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
      }

      if (this.disabledFechaFinProgramaAcademico==true)
      {
        fecha =moment(this.dateAdapter.format(this.fechaTerminaProgramaAcademico),"DD MMMM YYYY").toDate();
  
        fechaMoment=moment(fecha);
    
    
        if (!fechaMoment.isValid())
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Agregar programa académico"
          this.mensaje.cuerpo="La fecha de finalización no  es válida";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
        }

        if (moment(this.fechaTerminaProgramaAcademico)<moment(this.fechaInicioProgramaAcademico))
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Agregar programa académico"
          this.mensaje.cuerpo="La fecha de finalización debe ser mayor que la fecha de inicio";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
        }


      }

      let existe =this.listSemilleroProgramaAcademico.find(x=>x.PAS_PACA_CODI==this.selProgramaAcademico.PAC_CODI && x.PAS_FECH_TERM==null);
      if (existe!=undefined && this.semilleroProgramaAcademico.PAS_CODI==0)
      {
        let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Agregar programa académico"
          this.mensaje.cuerpo="El programa académico " + this.selProgramaAcademico.PAC_NOMB + " se ecuentra  activa";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
      }

      this.semilleroProgramaAcademico.PAS_PACA_CODI=this.selProgramaAcademico.PAC_CODI;
      this.semilleroProgramaAcademico.PAS_FECH_INI=moment(moment(this.dateAdapter.format(this.fechaInicioProgramaAcademico),"DD MMMM YYYY").toDate()).toDate();;        
      this.semilleroProgramaAcademico.PAS_SEMI_CODI=this.semillero.SEM_CODI;
      this.semilleroProgramaAcademico.PAS_FECH_TERM=(this.fechaTerminaProgramaAcademico==null)? null: moment(moment(this.dateAdapter.format(this.fechaTerminaProgramaAcademico),"DD MMMM YYYY").toDate()).toDate();;        
      if (this.semilleroProgramaAcademico.PAS_CODI==0)
      {                               
          $('#iconoEspera').show();
          this.serviceSemilleroPrograma.insert(this.semilleroProgramaAcademico).subscribe(res=>{
            this.listSemilleroProgramaAcademico.push(this.semilleroProgramaAcademico);
            this.goBackProgramaAcademico();
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
        this.serviceSemilleroPrograma.update(this.semilleroProgramaAcademico).subscribe(res=>{           
          this.goBackProgramaAcademico();
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

goBackProgramaAcademico()
{
  this.showDataProgramaAcademico=true;
  $('#iconoEspera').show();
  this.serviceSemilleroPrograma.getALL(this.semillero.SEM_CODI).subscribe(res=>{
    this.iniciarTablaProgramaAcademico();
      setTimeout(() => {
        if (res!=null)
        {
          this.tableProgramaAcademico = $('#dataProgramaAcademico').DataTable();
          this.tableProgramaAcademico.clear();
          this.tableProgramaAcademico.rows.add(res);
          this.tableProgramaAcademico.draw();
          this.listSemilleroProgramaAcademico=[];
          let data= this.tableProgramaAcademico.rows().data();
              data.each((value:ProgramaAcademicoSemillero, index:number) =>{
                let item = new ProgramaAcademicoSemillero();
                item.PAS_CODI=value.PAS_CODI;
                item.PAS_FECH_INI=value.PAS_FECH_INI;
                item.PAS_FECH_TERM=value.PAS_FECH_TERM;  
                item.PAS_PACA_CODI=value.PAS_PACA_CODI;
                this.listSemilleroProgramaAcademico.push(item);
                
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

onChangeDisabledFechaFinProgramaAcademico()
{
  this.disabledFechaFinProgramaAcademico=!this.disabledFechaFinProgramaAcademico;
 (this.disabledFechaFinProgramaAcademico==false)? this.fechaTerminaProgramaAcademico=null:null;
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
      { title: 'Est. proy.', data: 'nombreEstadoProyecto',width:'10%' },                    
      { title: 'Est. prod.', data: 'nombreEstadoProducto',width:'10%' },              
      { title: 'Inicio', data: 'fech_ini',width:'10%' },  
      { title: 'Termina', data: 'fech_term',width:'10%' }         
    ],
    columnDefs: [
      {
        targets: [5],
        data: null,                   
        className: "text-left",          

        render: (data:any, type:any, full:SemilleroProyectoProducto, meta:any) => {
            return moment(full.PPR_FECH_INIC).format("DD MMMM YYYY");                
        }
      },{
        targets: [6],
        data: null,                   
        className: "text-left",          
        
        render: (data:any, type:any, full:SemilleroProyectoProducto, meta:any) => {
            if (full.PPR_FECH_TERM!=null)              
              return moment(full.PPR_FECH_TERM).format("DD MMMM YYYY");                              
            else
              return '';
        }
      }, {
        targets: [7],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:SemilleroProyectoProducto, meta:any) => {
          
              return  '<i title="Editar semillero proyecto" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.PPR_CODI + '></i>'                                            
        }
      },{
        targets: [8],
        data: null,
        width: '0.1%',
        orderable: false,
        className: "text-left",          

        render: (data:any, type:any, full:SemilleroProyectoProducto, meta:any) => {
        
             return  '<i title="Eliminar semillero proyecto" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.PPR_CODI + '></i>'                                
                                         
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
   
    let id:number=event.currentTarget.cells[7].children[0].dataset.elementId;  
    this.semilleroProduccion.PPR_CODI=id;   
    if (this.columnIndex==7)
    {                   
      this.textoEstadoProduccion="Editar producto";
      this.showDataProduccion=false;
      $('#iconoEspera').show(); 

      this.serviceEstadoProducto.getAll().subscribe(ep=>{
        this.listEstadoProducto=ep;
        this.serviceEstadoProyecto.getAll().subscribe(ey=>{
          this.listEstadoProyecto=ey;
          this.serviceSemilleroProyecto.get(id).subscribe(producto=>{
            let inve= new Investigador();
            inve.accion="ALL";       
            this.serviceInvestigador.getAll(inve).subscribe(res=>{
              if (res!=null)
              {
                  this.listInvestigador=res;
                  this.selInvestigadorProd=this.listInvestigador.find(x=>x.INV_CODI==producto.PPR_INVE_CODI);
              }
    
              this.serviceProyecto.getByInve(producto.PPR_INVE_CODI).subscribe(proyecto=>{
                this.listProyecto=proyecto;
                this.selProyecto=this.listProyecto.find(x=>x.PRO_CODI==producto.PPR_PROY_CODI);
    
                this.serviceProducto.getByProyecto(producto.PPR_PROY_CODI).subscribe(pro=>{
                  this.listProducto=pro;
                  this.selProducto=this.listProducto.find(x=>x.Id==producto.PPR_PROD_CODI);
                  this.fechaInicioProyecto=this.dateAdapter.parse(producto.PPR_FECH_INIC.toString());   
                  if (producto.PPR_FECH_TERM!=null)
                  {  
                    this.fechaFinalizaProyecto=this.dateAdapter.parse(producto.PPR_FECH_TERM.toString());     
                    this.disabledFechaFinProduccion=true;
                  }      
                  this.selEstadoProducto=this.listEstadoProducto.find(x=>x.ESPRODS_CODI==producto.PPR_EPD_CODI);
                  this.selEstadoProyecto=this.listEstadoProyecto.find(x=>x.ESPROYS_CODI==producto.PPR_EPY_CODI);
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
    if (this.columnIndex==8)
    {
      $('#iconoEspera').show();
      this.serviceSemilleroProyecto.get(this.semilleroProduccion.PPR_CODI).subscribe(res=>{
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

  if (this.selEstadoProyecto==null)
  {
    let mensaje = new Mensaje();
    mensaje.tipo=TipoMensaje.Error;       
    this.mensaje = new Mensaje(mensaje);     
    this.mensaje.titulo="Producción de investigación"
    this.mensaje.cuerpo="Seleccione estado del proyecto";                                     
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

  if (this.selEstadoProducto==null)
  {
    let mensaje = new Mensaje();
    mensaje.tipo=TipoMensaje.Error;       
    this.mensaje = new Mensaje(mensaje);     
    this.mensaje.titulo="Producción de investigación"
    this.mensaje.cuerpo="Seleccione estado del producto";                                     
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

  let existe =this.listSemilleroProduccion.find(x=>x.PPR_INVE_CODI ==this.selInvestigadorProd.INV_CODI && 
    x.PPR_PROY_CODI==this.selProyecto.PRO_CODI && x.PPR_PROD_CODI==this.selProducto.Id && x.PPR_FECH_TERM==null);
  if (existe!=undefined && this.semilleroProduccion.PPR_CODI==0)
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




    
    this.semilleroProduccion.PPR_SEMI_CODI =this.semillero.SEM_CODI;
    this.semilleroProduccion.PPR_INVE_CODI=this.selInvestigadorProd.INV_CODI;
    this.semilleroProduccion.PPR_PROD_CODI=this.selProducto.Id;
    this.semilleroProduccion.PPR_PROY_CODI=this.selProyecto.PRO_CODI;
    this.semilleroProduccion.PPR_FECH_INIC =moment(moment(this.dateAdapter.format(this.fechaInicioProyecto),"DD MMMM YYYY").toDate()).toDate();;            
    this.semilleroProduccion.PPR_FECH_TERM=(this.fechaFinalizaProyecto!=null)?  moment(moment(this.dateAdapter.format(this.fechaFinalizaProyecto),"DD MMMM YYYY").toDate()).toDate():null;        
    this.semilleroProduccion.PPR_EPY_CODI=this.selEstadoProyecto.ESPROYS_CODI;
    this.semilleroProduccion.PPR_EPD_CODI=this.selEstadoProducto.ESPRODS_CODI;

    $('#iconoEspera').show();
    if (this.semilleroProduccion.PPR_CODI==0)
    {
      this.serviceSemilleroProyecto.insert(this.semilleroProduccion).subscribe(res=>{
        this.semilleroProduccion.PPR_CODI=res;
        this.listSemilleroProduccion.push(this.semilleroProduccion);
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
      this.serviceSemilleroProyecto.update(this.semilleroProduccion).subscribe(res=>{                
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
  this.semilleroProduccion.PPR_CODI=0;
  this.textoEstadoProduccion="Nueva producción";
  this.serviceInvestigador.getAll(investigador).subscribe(res=>{
    this.listInvestigador=res; 
    this.selInvestigadorProd=null;
    this.listProducto=[];
    this.listProyecto=[];
    this.selProducto=null;
    this.selProyecto=null;
    this.fechaInicioProyecto=null;

    this.serviceEstadoProyecto.getAll().subscribe(res=>{      
      this.selEstadoProyecto=null;
      this.listEstadoProyecto=res;
      this.serviceEstadoProducto.getAll().subscribe(res2=>{
        this.selEstadoProducto=null;
        this.listEstadoProducto=res2;
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

goBackProducccion()
{
  this.showDataProduccion=true;

   
    $('#iconoEspera').show();
    this.serviceSemilleroProyecto.getALL(this.semillero.SEM_CODI).subscribe(res=>{
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

  iniciarTablaDocumento() {
    this.tableDocumento = $('#dataDocumento').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',   
      searching: false,
      order: [],   
      columns: [
        { title: 'Nombre', data: 'DSEM_NOMB',width:'10%' },        
        { title: 'Fecha inicio', data: 'DSEM_FECH_INIC',width:'10%' },  
        { title: 'Fecha Termina', data: 'DSEM_FECH_TERM',width:'10%' }         
      ],
      columnDefs: [
        {
          targets: [1],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:SemilleroDocumento, meta:any) => {
              return moment(full.DSEM_FECH_INIC).format("DD MMMM YYYY");                
          }
        },{
          targets: [2],
          data: null,                   
          className: "text-left",          
          
          render: (data:any, type:any, full:SemilleroDocumento, meta:any) => {
              if (full.DSEM_FECH_TERM!=null)              
                return moment(full.DSEM_FECH_TERM).format("DD MMMM YYYY");                              
              else
                return '';
          }
        }, {
          targets: [3],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:SemilleroDocumento, meta:any) => {
            
                return  '<i title="Descargar " style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-download"" aria-hidden="true" data-element-path=' + full.DSEM_PATH + '></i>'                                            
          }
        }, {
          targets: [4],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:SemilleroDocumento, meta:any) => {
            
                return  '<i title="Editar plan de trabajo" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.DSEM_CODI + '></i>'                                            
          }
        },{
          targets: [5],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:SemilleroDocumento, meta:any) => {
          
               return  '<i title="Eliminar plan trabajo" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.DSEM_CODI + '></i>'                                
                                           
          }
        }
      ],

      responsive: true,
      scrollY: 200,
      language:lenguajeSpanish
      
    });
   
    

    $('#dataDocumento tbody').on('click', 'td', event => {
    this.columnIndex=event.currentTarget.cellIndex;
    });

    $('#dataDocumento tbody').on('click', 'tr', event => {
     
      let id:number=event.currentTarget.cells[4].children[0].dataset.elementId;  
      this.semilleroDocumento.DSEM_CODI=id;  
      
      if (this.columnIndex==3)
      {         
        $('#iconoEspera').show();   
        let path :string=event.currentTarget.cells[3].children[0].dataset.elementPath; 
           this.semilleroDocumento.DSEM_PATH=path;
            this.serviceSemilleroDocumento.getFile(this.semilleroDocumento).subscribe(res=>{
                window.open(res,"_blank");
                $('#iconoEspera').hide();   
            });
        
      }


      if (this.columnIndex==4)
      {                   
        this.showDataDocumento=false;
        $('#iconoEspera').show();   
        this.semilleroDocumento.DSEM_CODI=id;     
        this.serviceSemilleroDocumento.get(this.semilleroDocumento.DSEM_CODI).subscribe(res=>{
          if (res!=null)
          {
            this.nombreDocumento=res.DSEM_NOMB;
            this.archivoSeleccionado=res.DSEM_PATH;
            this.file=null;
            this.selectFile=null;
            this.fechaInicioDocumento=null;
            this.disabledFechaFinDocumento=false;
            this.fechaFinDocumento=null;
            this.fechaInicioDocumento=this.dateAdapter.parse(res.DSEM_FECH_INIC.toString());   
            if (res.DSEM_FECH_TERM!=null)
            {  
              this.fechaFinDocumento=this.dateAdapter.parse(res.DSEM_FECH_TERM .toString());     
              this.disabledFechaFinDocumento=true;
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
        this.semilleroDocumento.DSEM_CODI=id;
        this.serviceSemilleroDocumento.get(this.semilleroDocumento.DSEM_CODI).subscribe(res=>{
          $('#iconoEspera').hide();
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.CondicionSINO;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar plan trabajo"
          this.mensaje.cuerpo="Desea eliminar el plan trabajo " + res.DSEM_NOMB  + " ?";                                     
          this.mensaje.nVentana="IdEliminarDocumento";
          this.alerta.onChangedMyId("IdEliminarDocumento");                      
          $('#IdEliminarDocumento').show();   
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

  goBackDocumento()
  {
    this.showDataDocumento=true;
    $('#iconoEspera').show();
    this.serviceSemilleroDocumento.getALL(this.semillero.SEM_CODI).subscribe(res=>{
      $('#iconoEspera').hide();
      this.iniciarTablaDocumento();
      if (res!=null)
      {
        this.tableDocumento = $('#dataDocumento').DataTable();
        this.tableDocumento.clear();
        this.tableDocumento.rows.add(res);
        this.tableDocumento.draw();  
        this.listSemilleroDocumento=[];
         let data= this.tableDocumento.rows().data();
          data.each((value:SemilleroDocumento, index:number) =>{
            let item = new SemilleroDocumento();
            item.DSEM_CODI =value.DSEM_CODI;
            item.DSEM_SEM_CODI=value.DSEM_SEM_CODI;
            item.DSEM_NOMB=value.DSEM_NOMB;
            item.DSEM_FECH_INIC=value.DSEM_FECH_INIC;
            item.DSEM_FECH_TERM=value.DSEM_FECH_TERM;                                
            this.listSemilleroDocumento.push(item);                  
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

  showFormCreacionDocumento()
  {
    this.showDataDocumento=false;    
    this.semilleroDocumento.DSEM_CODI=0;
    this.fechaInicioDocumento=null;    
    this.fechaFinDocumento=null;
    this.disabledFechaFinDocumento=false;
    this.textoEstadoDocumento="Nuevo documento";
    this.nombreDocumento="";
    this.selectFile=null;
    this.archivoSeleccionado="";
    this.file=null;
  }
  onClicGuardarDocumento()
  {
    if (this.nombreDocumento.replace(/\s/g, "")=="")
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar documento"
      this.mensaje.cuerpo="Debe digitar un nombre";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }



  let fecha :Date;
  let fechaMoment:moment.Moment;
  fecha =moment(this.dateAdapter.format(this.fechaInicioDocumento),"DD MMMM YYYY").toDate();

  fechaMoment=moment(fecha);


  if (!fechaMoment.isValid())
  {
    let mensaje = new Mensaje();
    mensaje.tipo=TipoMensaje.Error;       
    this.mensaje = new Mensaje(mensaje);     
    this.mensaje.titulo="Agregar documento"
    this.mensaje.cuerpo="La fecha de inicio no  es válida";                                     
    this.mensaje.nVentana="IdError";
    this.alerta.onChangedMyId("IdError");                      
    $('#IdError').show();   
    return false;   
  }

  if (this.disabledFechaFinDocumento==true)
  {
    fecha =moment(this.dateAdapter.format(this.fechaFinDocumento),"DD MMMM YYYY").toDate();

    fechaMoment=moment(fecha);


    if (!fechaMoment.isValid())
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar documento"
      this.mensaje.cuerpo="La fecha de finalización no  es válida";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (moment(this.fechaFinDocumento)<moment(this.fechaInicioDocumento))
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Agregar documento"
      this.mensaje.cuerpo="La fecha de finalización debe ser mayor que la fecha de inicio";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }     
   }
   if (this.file==null && this.semilleroDocumento.DSEM_CODI==0)
   {
     let mensaje = new Mensaje();
     mensaje.tipo=TipoMensaje.Error;       
     this.mensaje = new Mensaje(mensaje);     
     this.mensaje.titulo="Agregar documento"
     this.mensaje.cuerpo="Seleccionar un documento";                                     
     this.mensaje.nVentana="IdError";
     this.alerta.onChangedMyId("IdError");                      
     $('#IdError').show();   
     return false;   
   }

   this.semilleroDocumento.DSEM_SEM_CODI =this.semillero.SEM_CODI;
   this.semilleroDocumento.DSEM_FECH_INIC =moment(moment(this.dateAdapter.format(this.fechaInicioDocumento),"DD MMMM YYYY").toDate()).toDate();;        
   this.semilleroDocumento.DSEM_NOMB=this.nombreDocumento;
   this.semilleroDocumento.DSEM_FECH_TERM=(this.fechaFinDocumento==null)? null: moment(moment(this.dateAdapter.format(this.fechaFinDocumento),"DD MMMM YYYY").toDate()).toDate();;        

   if (this.semilleroDocumento.DSEM_CODI==0)
   {
    $('#iconoEspera').show();
    this.serviceSemilleroDocumento.insert(this.semilleroDocumento).subscribe(res=>{
      this.semilleroDocumento.DSEM_CODI=res;
      this.file.append('DSEM_CODI', this.semilleroDocumento.DSEM_CODI.toString());
      this.serviceSemilleroDocumento.insertFile(this.file).subscribe(f=>{
        $('#iconoEspera').hide();
        this.goBackDocumento();
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
    this.serviceSemilleroDocumento.update(this.semilleroDocumento).subscribe(res=>{
      if (this.file!=null)
      {
        this.file.append('DSEM_CODI', this.semilleroDocumento.DSEM_CODI.toString());
        this.serviceSemilleroDocumento.insertFile(this.file).subscribe(f=>{
          $('#iconoEspera').hide();
          this.goBackDocumento();
        });
        
      } 
      else
      {         
        $('#iconoEspera').hide();
        this.goBackDocumento();
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

  onChangeDisabledFechaFinDocumento()
  {
    this.disabledFechaFinDocumento=!this.disabledFechaFinDocumento;
    (this.disabledFechaFinDocumento==false)? this.fechaFinDocumento=null:null;
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
