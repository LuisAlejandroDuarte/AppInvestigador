import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { AlertaComponent } from 'src/app/alerta/alerta';
import { NgbDateParserFormatter, NgbDateStruct, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Convocatoria } from 'src/app/entidad/convocatoria/entidad.convocatoria';
import { Router, ActivatedRoute } from '@angular/router';
import { Mensaje, TipoMensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { TipoConvocatoria } from 'src/app/entidad/tipoconvocatoria/entidad.tipoconvocatoria';
import { TipoConvocatoriaService } from 'src/app/service/tipoconvocatoria/service.convocatoria';
import { ErrorComponent } from 'src/app/error/error';
import { ConvocatoriaService } from 'src/app/service/convocatoria/service.convocatoria';
import { ConvocatoriaParametro } from 'src/app/entidad/convocatoriaparametro/entidad.convocatoriaparametro';
import { ConvocatoriaParametroService } from 'src/app/service/convocatoriaparametro/service.convocatoriaparametro';
import { Parametro } from 'src/app/entidad/parametro/entidad.parametro';
import { ParametroService } from 'src/app/service/parametro/service.parametro';
import { Propuesta, PropuestaInvestigador } from 'src/app/entidad/propuesta/entidad.propuesta';
import { PropouestaService } from 'src/app/service/propuesta/service.propuesta';
import { lenguajeSpanish } from 'src/app/complement/languajeDatatable';
import { Evaluador, Investigador } from 'src/app/entidad/investigador/entidad.investigador';
import { InvestigadorService } from 'src/app/service/investigador/serviceInvestigador';
import { Juez } from 'src/app/entidad/juez/entidad.juez';
import { JuezService } from 'src/app/service/juez/serviceJuez';
import { ThrowStmt } from '@angular/compiler';
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
  selector: 'app-editconvocatoria',
  templateUrl: './editconvocatoria.component.html',
  styleUrls: ['./editconvocatoria.component.css'],
  providers:[{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})




export class EditConvocatoriaComponent implements OnInit {
  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  convocatoria:Convocatoria = new Convocatoria();
  active=1;
  numero:string="";
  descripcion:string="";
  texto:string="";
  resolucion:string="";
  selTipoConvocatoria:TipoConvocatoria=null;
  listTipoConvocatoria:TipoConvocatoria[]=[];
  puntaje:number=null;
  mensaje:Mensaje;
  disabled:boolean=true;
  fechaInicioConvocatoria:NgbDateStruct;
  fechaTerminaConvocatoria:NgbDateStruct;
  disabledFechaFinConvocatoria:boolean=false;
  textoSelectFile:File=null;
  textoArchivoSeleccionado:string="";
  textoFile:FormData=null;
  maxDate:NgbDateStruct;
  resolucionSelectFile:File=null;
  resolucionArchivoSeleccionado:string="";
  resolucionFile:FormData=null;


  //PARAMETROS 

  selParametro:Parametro=null;
  listParametro:Parametro[]=[];
  listConvocatoriaParametro:ConvocatoriaParametro[]=[];
  selConvocatoriaParametro:ConvocatoriaParametro=null;
  valorParametro:number=null;


  //ASIGNAR EVALUADORES
  listPropuesta:Propuesta[]=[];
  selPropuesta:Propuesta=null;
  table:any;
  selEvaluador:Evaluador=null;
  listEvaluador:Evaluador[]=[];
  listTablaEvaluador:Evaluador[]=[];
  columnIndex:number;
  listPropuestaInvestigador:PropuestaInvestigador[]=[];
  listJuez:Juez[]=[];

  selJuez:Juez=null;

  constructor(private router:Router,
    private dateAdapter: CustomDateParserFormatter, 
    private serviceTipoConvocatoria:TipoConvocatoriaService,
    private servicecConvocatoria:ConvocatoriaService,
    private route:ActivatedRoute,
    private serviceConvocatoriaParametro:ConvocatoriaParametroService,
    private serviceConvocatoria:ConvocatoriaService,private servicePropuesta:PropouestaService,
    private serviceEvaluador:InvestigadorService,
    private serviceParametro:ParametroService,
    private serviceJuez:JuezService) { }


  valuechange(event:KeyboardEvent)
  {
    let e = event;
    
    if (e.keyCode==8) return;

      if ([46, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
      
  }


  ngOnInit(): void {
    $('#iconoEspera').show();
    this.convocatoria.CON_CODI=this.route.snapshot.params.id;    
    moment.locale('es'); 
    this.maxDate=this.dateAdapter.parse(moment(new Date()).toString());  
    this.serviceTipoConvocatoria.getALL().subscribe(res=>{
      this.listTipoConvocatoria=res;
      if (this.convocatoria.CON_CODI!=0)
      {
        this.disabled=false;
        this.servicecConvocatoria.get(this.convocatoria.CON_CODI).subscribe(res=>{
          this.convocatoria=res;
          this.numero=res.CON_NUME;
          this.descripcion=res.CON_DESC;
          this.puntaje=res.CON_PUNT_TOTA;
          this.texto=res.CON_TEXT_NOMB;
          this.resolucion=res.CON_RESO_NOMB;
          this.selTipoConvocatoria=this.listTipoConvocatoria.find(x=>x.TCO_CODI==res.CON_TIPO_CONV_CODI);
          this.textoArchivoSeleccionado=res.CON_TEXT;
          this.resolucionArchivoSeleccionado=res.CON_RESO;
          this.fechaInicioConvocatoria=this.dateAdapter.parse(res.CON_FECH_INIC.toString());   
          if (res.CON_FECH_FINA!=null)
          {  
            this.fechaTerminaConvocatoria=this.dateAdapter.parse(res.CON_FECH_FINA.toString());     
            this.disabledFechaFinConvocatoria=true;
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
      else
      {
        this.disabled=true;
      $('#iconoEspera').hide();    
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
  }

  onClicBoton1(event:any)
  {
    if (event.nVentana=="IdError")
    $('#IdError').hide();

    if (event.nVentana=="IdEliminarParametro")
    {
      $('#iconoEspera').show();
        this.serviceConvocatoriaParametro.delete(this.selConvocatoriaParametro).subscribe(res=>{
          let index = this.listConvocatoriaParametro.findIndex(x=>x.PCO_PARA_CODI==this.selConvocatoriaParametro.PCO_PARA_CODI);         
              this.listConvocatoriaParametro.splice(index,1);
              $('#iconoEspera').hide();
              $('#IdEliminarParametro').hide();
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
    if (event.nVentana=="IdEliminarJuez")
    {
      $('#iconoEspera').show();
      this.serviceJuez.delete(this.selJuez).subscribe(res=>{
        this.serviceConvocatoria.getEvaluadores(this.convocatoria.CON_CODI,this.selPropuesta.PRO_CODI).subscribe(res2=>{
          let index =this.listTablaEvaluador.findIndex(x=>x.PCJU_CODI==this.selJuez.PCJU_CODI);
          this.listTablaEvaluador.splice(index,1);
          this.table = $('#dataEvaluador').DataTable();
          this.table.clear();
          this.table.rows.add([]);
          this.table.draw();    
          if (res2!=null)
          {
            this.table.rows.add(res2);
            this.table.draw();       
          }
          $('#iconoEspera').hide();
          $('#IdEliminarJuez').hide();
          
        },error=> {
          $('#iconoEspera').hide();
          $('#IdEliminarJuez').hide();
          console.clear();
          var errorComponent = new ErrorComponent();            
          this.mensaje =errorComponent.GenerarMensaje(error);          
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();
        });
      },error=> {
        $('#iconoEspera').hide();
        $('#IdEliminarJuez').hide();
        console.clear();
        var errorComponent = new ErrorComponent();            
        this.mensaje =errorComponent.GenerarMensaje(error);          
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();
      });
    }
  }

  onClicBoton2(event:any)
  {
    if (event.nVentana=="IdEliminar")
    $('#IdEliminar').hide();
    
    if (event.nVentana=="IdEliminarJuez")
    $('#IdEliminarJuez').hide();

    if (event.nVentana=="IdEliminarParametro")
    $('#IdEliminarParametro').hide();

    if (event.nVentana=="IdError")
    $('#IdError').hide();
  }

  iniciarTablaInvestigador() {
    this.table = $('#dataInvestigador').DataTable({
      dom: '<"top">rt<"bottom"><"clear">',    
      order: [],   
      columns: [
        { title: 'Investigador', data: 'Investigador' },        
        { title: 'Rol', data: 'Rol'},
        { title: 'Grupo', data: 'Grupo'},
        { title: 'Escuela', data: 'Escuela'},
        { title: 'Programa', data: 'Programa'}      
              
      ],
      
      responsive: true,
      scrollY: '100',
      language:lenguajeSpanish
      
    });
        
  }

  iniciarTablaEvaluador() {
    this.table = $('#dataEvaluador').DataTable({
      dom: '<"top">rt<"bottom"><"clear">',    
      order: [],   
      columns: [
        { title: 'Investigador', data: 'Nombre' },        
        { title: 'Cargo', data: 'Cargo'},        
        { title: 'Escuela', data: 'Escuela'},
        { title: 'Programa', data: 'Programa'}      
              
      ],
      columnDefs: [
        {
          targets: [4],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:Evaluador, meta:any) => {
            
            return  '<i title="Eliminar evaluador" style="color:red;cursor:pointer;font-size:1.2rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.INV_CODI + ' data-element-idjuez=' + full.PCJU_CODI + '></i>'                                
          }
        }],
      responsive: true,
      scrollY: '100',
      language:lenguajeSpanish
      
    });
    $('#dataEvaluador tbody').on('click', 'td', event => {
      this.columnIndex=event.currentTarget.cellIndex;
      });
  
      $('#dataEvaluador tbody').on('click', 'tr', event => {
       
  
        if (this.columnIndex==4)
        {
          let id:number=event.currentTarget.cells[4].children[0].dataset.elementId;
          let idJuez:number=event.currentTarget.cells[4].children[0].dataset.elementIdjuez;
          this.selJuez = new Juez();
          this.selJuez.PCJU_CODI=idJuez;
          if ( this.listEvaluador.find(x=>x.INV_CODI==id).seleccionado==true)
          {
            let index=this.listTablaEvaluador.findIndex(x=>x.INV_CODI==id);
            this.listTablaEvaluador.splice(index,1);
            this.table = $('#dataEvaluador').DataTable();
            this.table.clear();
            this.table.rows.add([]);
            this.table.draw();    
            if (this.listTablaEvaluador!=null)
            {
              this.table.rows.add(this.listTablaEvaluador);
              this.table.draw();       
            }
          }
          else
          {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.CondicionSINO;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar investigador"
          this.mensaje.cuerpo="Desea eliminar el investigador " + this.listEvaluador.find(x=>x.INV_CODI==id).Nombre  + " ?";                                     
          this.mensaje.nVentana="IdEliminarJuez";
          this.alerta.onChangedMyId("IdEliminarJuez");                      
          $('#IdEliminarJuez').show(); 
          }
        }
      });
        
  }

  onClickAgregarEvaluador()
  {
    
    if (this.selPropuesta==null)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Seleccione una propuesta";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.selEvaluador==null)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Seleccione un evaluador";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.listTablaEvaluador.find(x=>x.INV_CODI==this.selEvaluador.INV_CODI)!=undefined)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Ya se encuentra el evaluador seleccioando";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;  
    }

    if (this.listPropuestaInvestigador.find(x=>x.PIN_INVE_CODI==this.selEvaluador.INV_CODI)!=undefined)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Es integrante de la propuesta";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;  
    }


    this.selEvaluador.seleccionado=true;
    this.listTablaEvaluador.splice(0,0,this.selEvaluador);

      this.table = $('#dataEvaluador').DataTable();
      this.table.clear();
      this.table.rows.add([]);
      this.table.draw();    
      if (this.listTablaEvaluador!=null)
      {
        this.table.rows.add(this.listTablaEvaluador);
        this.table.draw();       
      }
      


  }

  onChangePropuesta()
  {
    this.listTablaEvaluador=[];
    this.table = $('#dataInvestigador').DataTable();
    this.table.clear();
    this.table.rows.add([]);
    this.table.draw();    
    if (this.selPropuesta==null) return;
    $('#iconoEspera').show();
    this.servicePropuesta.getInvestigadorByPropuesta(this.selPropuesta.PRO_CODI).subscribe(res=>{
      this.listPropuestaInvestigador=res;
      this.table = $('#dataInvestigador').DataTable();
      this.table.clear();
      this.table.rows.add([]);
      this.table.draw();    
      if (res!=null)
      {
        this.table.rows.add(res);
        this.table.draw();       
      }
      this.serviceConvocatoria.getEvaluadores(this.convocatoria.CON_CODI,this.selPropuesta.PRO_CODI).subscribe(res2=>{
        this.listTablaEvaluador=[];        
        let evaluador:Evaluador;
        if (res2!=null)
        {
          res2.forEach(element => {
              evaluador= new Evaluador();              
              evaluador.Cargo=element.Cargo;
              evaluador.ESC_CODI=element.ESC_CODI;
              evaluador.Escuela=element.Escuela;
              evaluador.INV_CODI =element.INV_CODI;
              evaluador.Nombre=element.Nombre;              
              evaluador.PCJU_CODI=element.PCJU_CODI;    
              evaluador.Programa=element.Programa;
              evaluador.TICA_CODI=element.TICA_CODI;        
              evaluador.seleccionado=false;                 
              this.listTablaEvaluador.splice(0,0,evaluador);           
          });
        }

        
        this.table = $('#dataEvaluador').DataTable();
        this.table.clear();
        this.table.rows.add([]);
        this.table.draw();    
        if (res2!=null)
        {
          this.table.rows.add(res2);
          this.table.draw();       
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


  onChangeNavs(changeEvent: NgbNavChangeEvent)
  {
    switch (changeEvent.nextId) {
      case 2:      
      $('#iconoEspera').show();
      this.serviceParametro.getALL().subscribe(res=>{
        this.listParametro=res;
        this.selParametro=null;
        this.serviceConvocatoriaParametro.getALL(this.convocatoria.CON_CODI).subscribe(res2=>{
          this.listConvocatoriaParametro=(res2==null)? []:res2;
          this.listConvocatoriaParametro.forEach(x=>x.seleccionado=false);
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
        break;
      case 3:
        $('#iconoEspera').show();
        this.servicePropuesta.getByconvocatoria(this.convocatoria.CON_CODI).subscribe(res=>{
          this.listPropuesta=res;
          this.selPropuesta=null;
          this.iniciarTablaInvestigador();
        
          let inve= new Investigador();
          inve.accion="Evaluador";
          this.serviceEvaluador.getEvaluador(inve).subscribe(res=>{
            this.listEvaluador=res;
            this.selEvaluador=null;
            this.iniciarTablaEvaluador();
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

      default:
        break;
    }
  }

  Validar():boolean {
    if (this.numero.replace(/\s/g, "")=="")
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Falta número de la convocatoria";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.descripcion.replace(/\s/g, "")=="")
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Falta descripción";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.puntaje==null || this.puntaje.toString()=="")
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Falta puntaje";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.selTipoConvocatoria==null)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Seleccione tipo convocatoria";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }



    let fecha :Date;
    let fechaMoment:moment.Moment;
    fecha =moment(this.dateAdapter.format(this.fechaInicioConvocatoria),"DD MMMM YYYY").toDate();

    fechaMoment=moment(fecha);


    if (!fechaMoment.isValid())
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="convocatorias"
      this.mensaje.cuerpo="La fecha no es válida";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    

    if (moment(this.dateAdapter.format(this.fechaInicioConvocatoria)).toDate()>(new Date()))
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="La fecha no debe ser mayor al día de hoy";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

   
    if (this.disabledFechaFinConvocatoria==true)
      {
        fecha =moment(this.dateAdapter.format(this.fechaTerminaConvocatoria),"DD MMMM YYYY").toDate();
  
        fechaMoment=moment(fecha);
    
    
        if (!fechaMoment.isValid())
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Convocatoria"
          this.mensaje.cuerpo="La fecha de finalización no  es válida";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
        }

        if (moment(this.fechaTerminaConvocatoria)<moment(this.fechaInicioConvocatoria))
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Convocatoria"
          this.mensaje.cuerpo="La fecha de finalización debe ser mayor que la fecha de inicio";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return false;   
        }


      }
   
      if (this.textoFile==null && this.convocatoria.CON_CODI==0)
      {
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Convocatoria"
        this.mensaje.cuerpo="Seleccionar un documento para texto";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
      }


      if (this.resolucionFile==null && this.convocatoria.CON_CODI==0)
      {
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Convocatoria"
        this.mensaje.cuerpo="Seleccionar un documento para resolución";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
      }
   if (this.texto.replace(/\s/g, "")=="")
      {
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Convocatoria"
        this.mensaje.cuerpo="El texto esta vacío";                                     
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return false;   
      }
  
      if (this.resolucion.replace(/\s/g, "")=="")
      {
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Convocatoria"
        this.mensaje.cuerpo="La resolución está vacía";                                     
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
          this.convocatoria.CON_NUME=this.numero;
          this.convocatoria.CON_PUNT_TOTA=this.puntaje;  
          this.convocatoria.CON_DESC=this.descripcion;
          this.convocatoria.CON_TEXT_NOMB=this.texto;
          this.convocatoria.CON_RESO_NOMB=this.resolucion;
          this.convocatoria.CON_TIPO_CONV_CODI=this.selTipoConvocatoria.TCO_CODI;
          this.convocatoria.CON_FECH_FINA=(this.fechaTerminaConvocatoria==null)? null: moment(moment(this.dateAdapter.format(this.fechaTerminaConvocatoria),"DD MMMM YYYY").toDate()).toDate();
          this.convocatoria.CON_FECH_INIC=moment(moment(this.dateAdapter.format(this.fechaInicioConvocatoria),"DD MMMM YYYY").toDate()).toDate();

          if (this.convocatoria.CON_CODI==0)
          {
            $('#iconoEspera').show();
            this.servicecConvocatoria.insert(this.convocatoria).subscribe(res=>{    
              if (res!=0 && res!=false)
              {
                this.disabled=false;
                this.convocatoria.CON_CODI=res;
                this.textoFile.append('CON_CODI', this.convocatoria.CON_CODI.toString());
                this.servicecConvocatoria.insertTextoFile(this.textoFile).subscribe(f=>{
                  this.resolucionFile.append('CON_CODI', this.convocatoria.CON_CODI.toString());
                    this.servicecConvocatoria.insertResoFile(this.resolucionFile).subscribe(f2=>{
                      $('#iconoEspera').hide();
                      this.resolucionFile=null;
                      this.textoFile=null;
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
                this.resolucionFile=null;
                this.textoFile=null;
                let mensaje = new Mensaje();
                mensaje.tipo=TipoMensaje.Error;       
                this.mensaje = new Mensaje(mensaje);     
                this.mensaje.titulo="Convocatoria"
                this.mensaje.cuerpo="Error al ingresar el registro";                                     
                this.mensaje.nVentana="IdError";
                this.alerta.onChangedMyId("IdError");                      
                $('#IdError').show();   
                return false;  
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
          else
          {
            $('#iconoEspera').show();
            this.servicecConvocatoria.update(this.convocatoria).subscribe(res=>{    
              $('#iconoEspera').hide();
              if (this.textoFile!=null)
              {
                $('#iconoEspera').show();
                this.textoFile.append('CON_CODI', this.convocatoria.CON_CODI.toString());
                this.servicecConvocatoria.insertTextoFile(this.textoFile).subscribe(f=>{
                  if (this.resolucionFile!=null)
                  {
                    this.resolucionFile.append('CON_CODI', this.convocatoria.CON_CODI.toString());
                    this.servicecConvocatoria.insertResoFile(this.resolucionFile).subscribe(f2=>{
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
                  },error=> {
                    $('#iconoEspera').hide();
                    console.clear();
                    var errorComponent = new ErrorComponent();            
                    this.mensaje =errorComponent.GenerarMensaje(error);          
                    this.mensaje.nVentana="IdError";
                    this.alerta.onChangedMyId("IdError");                      
                    $('#IdError').show();
                  });
                $('#iconoEspera').hide();
              }
              else
              {
                if (this.resolucionFile!=null)
                {
                  $('#iconoEspera').show();
                  this.resolucionFile.append('CON_CODI', this.convocatoria.CON_CODI.toString());
                  this.servicecConvocatoria.insertResoFile(this.resolucionFile).subscribe(f2=>{
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
      case 2:
        $('#iconoEspera').show();
        this.serviceConvocatoriaParametro.insert(this.listConvocatoriaParametro).subscribe(res=>{
          this.listConvocatoriaParametro.forEach(x=>x.seleccionado=false);
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
        break;
      case 3:

        if (this.selPropuesta==null)
          {
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Convocatoria"
            this.mensaje.cuerpo="Seleccione propuesta";                                     
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return false;   
          }

        $('#iconoEspera').show();        
        let juez : Juez;
        this.listJuez=[];
        this.listTablaEvaluador.forEach(element=> {
          juez = new Juez();
          juez.PCJU_CON_CODI=this.convocatoria.CON_CODI;
          juez.PCJU_INV_CODI=element.INV_CODI;
          juez.PCJU_PCAT_CODI=this.selPropuesta.PRO_CODI;          
          juez.seleccionado=element.seleccionado;
          this.listJuez.splice(0,0,juez);
        });
        this.serviceJuez.insert(this.listJuez).subscribe(res=>{
          this.listTablaEvaluador.forEach(x=>x.seleccionado=false);
          this.serviceConvocatoria.getEvaluadores(this.convocatoria.CON_CODI,this.selPropuesta.PRO_CODI).subscribe(res2=>{
            this.table = $('#dataEvaluador').DataTable();
            this.table.clear();
            this.table.rows.add([]);
            this.table.draw();    
            if (res2!=null)
            {
              this.table.rows.add(res2);
              this.table.draw();       
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

        });
      }
  }

  onSalir()
  {
    this.router.navigate(['/convocatoria/gestion']);
  }

  
  onChangeDisabledFechaFinConvocatoria()
  {
    this.disabledFechaFinConvocatoria=!this.disabledFechaFinConvocatoria;
    (this.disabledFechaFinConvocatoria==false)? this.fechaTerminaConvocatoria=null:null;
  }

  onTextoFileChanged(fileInput:any)
  {      
    var reader = new FileReader();
    this.textoSelectFile = <File>fileInput.target.files[0];                   
    if (this.textoSelectFile==undefined) return;

    this.textoArchivoSeleccionado=this.textoSelectFile.name;
    $('#iconoEspera').show();
    reader.readAsDataURL(this.textoSelectFile); // read file as data url
    this.textoFile= new FormData();
    this.textoFile.append('TEXTO', fileInput.target.files[0]);
   
    reader.onload = (event : any) => { // called once readAsDataURL is completed
      $('#iconoEspera').hide();
      this.textoArchivoSeleccionado=this.textoSelectFile.name;
    }
  }

  onResolucionFileChanged(fileInput:any)
  {      
    var reader = new FileReader();
    this.resolucionSelectFile = <File>fileInput.target.files[0];                   
    if (this.resolucionSelectFile==undefined) return;

    this.resolucionArchivoSeleccionado=this.resolucionSelectFile.name;
    $('#iconoEspera').show();
    reader.readAsDataURL(this.resolucionSelectFile); // read file as data url
    this.resolucionFile= new FormData();
    this.resolucionFile.append('RESO', fileInput.target.files[0]);
   
    reader.onload = (event : any) => { // called once readAsDataURL is completed
      $('#iconoEspera').hide();
      this.resolucionArchivoSeleccionado=this.resolucionSelectFile.name;
    }
  }

  onClicDownloadTexto()
  {
    if (this.convocatoria.CON_CODI==0) return;
    $('#iconoEspera').show();
    this.servicecConvocatoria.getTextoFile(this.convocatoria).subscribe(res=>{
      $('#iconoEspera').hide();
      window.open(res,"_blank");
    });
  }

  onClicDownloadResolucion()
  {
    if (this.convocatoria.CON_CODI==0) return;
    $('#iconoEspera').show();
    this.servicecConvocatoria.getResoFile(this.convocatoria).subscribe(res=>{
      $('#iconoEspera').hide();
      window.open(res,"_blank");
    });
  }

  onClickAgregarParametro()
  {
    if (this.selParametro==null)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Falta seleccionar parámetro";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.valorParametro==null || this.valorParametro.toString()=="")
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Falta seleccioanr valor del parámetro";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.listConvocatoriaParametro.find(x=>x.PCO_PARA_CODI==this.selParametro.CPA_CODI)!=undefined)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Convocatoria"
      this.mensaje.cuerpo="Ya existe el parámetro en la lista";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }  

    this.selConvocatoriaParametro= new ConvocatoriaParametro();
    this.selConvocatoriaParametro.PCO_CONV_CODI=this.convocatoria.CON_CODI;
    this.selConvocatoriaParametro.PCO_PARA_CODI=this.selParametro.CPA_CODI;
    this.selConvocatoriaParametro.nombreParametro=this.selParametro.CPA_NOMB;
    this.selConvocatoriaParametro.PCO_VALO=this.valorParametro;
    this.selConvocatoriaParametro.seleccionado=true;
    this.listConvocatoriaParametro.splice(0,0,this.selConvocatoriaParametro);
     
    this.selParametro=null;
    this.valorParametro=null; 

  }

  onClickEliminarParametro(item:ConvocatoriaParametro)
  {
    let index = this.listConvocatoriaParametro.findIndex(x=>x.PCO_PARA_CODI==item.PCO_PARA_CODI);
    if (item.seleccionado==true)
        this.listConvocatoriaParametro.splice(index,1);
    else
        {
            this.selConvocatoriaParametro=item;
            this.selConvocatoriaParametro.PCO_CONV_CODI=this.convocatoria.CON_CODI;
            this.selConvocatoriaParametro.PCO_PARA_CODI=item.PCO_PARA_CODI;
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.CondicionSINO;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Eliminar parámetro"
            this.mensaje.cuerpo="Desea eliminar el parámetro " + item.nombreParametro  + " ?";                                     
            this.mensaje.nVentana="IdEliminarParametro";
            this.alerta.onChangedMyId("IdEliminarParametro");                      
            $('#IdEliminarParametro').show();   
        }
  }

  

}
