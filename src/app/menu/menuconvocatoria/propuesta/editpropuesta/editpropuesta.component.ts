import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaComponent } from 'src/app/alerta/alerta';
import { Mensaje, TipoMensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { NgbDateParserFormatter, NgbDateStruct, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Convocatoria } from 'src/app/entidad/convocatoria/entidad.convocatoria';
import { ConvocatoriaService } from 'src/app/service/convocatoria/service.convocatoria';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { ConvocatoriaParametroService } from 'src/app/service/convocatoriaparametro/service.convocatoriaparametro';
import { InvestigadorService } from 'src/app/service/investigador/serviceInvestigador';
import { TipoVinculacionService } from 'src/app/service/tipoVinculacion/service.tipovinculacion';
import { GrupoService } from 'src/app/service/grupo/serviceGrupo';
import { Investigador } from 'src/app/entidad/investigador/entidad.investigador';
import { TipoVinculacion } from 'src/app/entidad/tipoVinculacion/entidad.tipovinculacion';
import { Grupo } from 'src/app/entidad/grupo/entidad.grupo';
import { ErrorComponent } from 'src/app/error/error';
import { PropuestaInvestigador, Propuesta } from 'src/app/entidad/propuesta/entidad.propuesta';
import { lenguajeSpanish } from 'src/app/complement/languajeDatatable';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
import { PropouestaService } from 'src/app/service/propuesta/service.propuesta';


declare const $: any;
@Component({
  selector: 'app-editpropuesta',
  templateUrl: './editpropuesta.component.html',
  styleUrls: ['./editpropuesta.component.css']
})
export class EditPropuestaComponent implements OnInit {
  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  mensaje:Mensaje;
  active=1;
  disabled:boolean=false;
  listConvocatoria:Convocatoria[]=[];
  selConvocatoria:Convocatoria=null;
  user:logueado;
  propuesta = new Propuesta;
  tituloPropuesta:string="";
  listInvestigador:Investigador[]=[];
  selInvestigador:Investigador=null;
  listTipoVinculacion:TipoVinculacion[]=[];
  selTipoVinculacion:TipoVinculacion=null;
  listGrupo:Grupo[]=[];
  selGrupo:Grupo=null;
  programa:string;
  escuela:string;
  idPrograma:number;
  idEscuela:number;
  listPropuestaInvestigador:PropuestaInvestigador[]=[];
  selPropuestaInvestigador:PropuestaInvestigador=null;
  table:any;

  documentoSelectFile:File=null;
  documentoArchivoSeleccionado:string="";
  documentoFile:FormData=null;
  maxDate:NgbDateStruct;
  cartaSelectFile:File=null;
  cartaArchivoSeleccionado:string="";
  cartaFile:FormData=null;
  nameTab:string="";
  
  columnIndex:number;
  constructor(private router:Router, private serviceConvocatoria:ConvocatoriaService,
    private serviceInvestigador:InvestigadorService,private serviceTipoVinculacion:TipoVinculacionService,
    private servicePropuesta:PropouestaService,
    private serviceGrupo:GrupoService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    moment.locale('es');
    this.user =JSON.parse(localStorage.getItem("user"));
    this.propuesta.PRO_CODI=this.route.snapshot.params.id;  
    this.nameTab=(this.route.snapshot.params.id==0)? "Crear propuesta":"Editando propuesta";
    moment.locale('es');
    $('#iconoEspera').show();
    this.serviceConvocatoria.getALL().subscribe(res=>{
      
      this.listConvocatoria=res;
      this.listConvocatoria.forEach(x=>x.fechaInicioString=moment(x.CON_FECH_INIC).format("DD MMMM YYYY"));
      this.listConvocatoria.forEach(x=>x.fechaFinString=(x.CON_FECH_FINA)? moment(x.CON_FECH_FINA).format("DD MMMM YYYY"):"");
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

  iniciarTablaInvestigador() {
    this.table = $('#dataInvestigador').DataTable({
      dom: '<"top">rt<"bottom"p><"clear">',    
      order: [],   
      columns: [
        { title: 'Investigador', data: 'nombreInvestigador' },        
        { title: 'Rol', data: 'Rol'},
        { title: 'Grupo', data: 'Grupo'},
        { title: 'Escuela', data: 'escuela'},
        { title: 'Programa', data: 'programa'}      
              
      ],
      columnDefs: [
        {
          targets: [5],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:PropuestaInvestigador, meta:any) => {
            
            return  '<i title="Eliminar convocatoria" style="color:red;cursor:pointer;font-size:1.2rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.PIN_INVE_CODI + '></i>'                                
          }
        }],
      responsive: true,
      scrollY: '100',
      language:lenguajeSpanish
      
    });

    $('#dataInvestigador tbody').on('click', 'td', event => {
      this.columnIndex=event.currentTarget.cellIndex;
      });
  
      $('#dataInvestigador tbody').on('click', 'tr', event => {
       
  
        if (this.columnIndex==5)
        {
          let id:number=event.currentTarget.cells[5].children[0].dataset.elementId;
          if ( this.listPropuestaInvestigador.find(x=>x.PIN_INVE_CODI==id).seleccionado==false)
          {      
            this.selPropuestaInvestigador = new PropuestaInvestigador();
            this.selPropuestaInvestigador.PIN_INVE_CODI=id;
            this.selPropuestaInvestigador.PIN_PROP_CODI=this.propuesta.PRO_CODI;
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.CondicionSINO;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Eliminar investigador"
            this.mensaje.cuerpo="Desea eliminar el investigador " + this.listPropuestaInvestigador.find(x=>x.PIN_INVE_CODI==id).nombreInvestigador  + " ?";                                     
            this.mensaje.nVentana="IdEliminar";
            this.alerta.onChangedMyId("IdEliminar");                      
            $('#IdEliminar').show();   
            return false;   
          }
          else
          {
           let index =this.listPropuestaInvestigador.findIndex(x=>x.PIN_INVE_CODI==id)
           this.listPropuestaInvestigador.splice(index,1);
           this.table = $('#dataInvestigador').DataTable();
           this.table.clear();
           this.table.rows.add(this.listPropuestaInvestigador);
           this.table.draw();
          }
        }
      });
        
  }

  onClicBoton1(event:any)
  {
    if (event.nVentana=="IdError")
    $('#IdError').hide();

    if (event.nVentana=="IdEliminar")
    {
      $('#iconoEspera').show();
      this.servicePropuesta.deleteInvestigador(this.selPropuestaInvestigador).subscribe(res=>{

        let index =this.listPropuestaInvestigador.findIndex(x=>x.PIN_INVE_CODI==this.selPropuestaInvestigador.PIN_INVE_CODI);
        this.listPropuestaInvestigador.splice(index,1);
        this.table = $('#dataInvestigador').DataTable();
        this.table.clear();
        this.table.rows.add(this.listPropuestaInvestigador);
        this.table.draw();
        $('#iconoEspera').hide();
        $('#IdEliminar').hide();
      },error=> {
        $('#iconoEspera').hide();
        $('#IdEliminar').hide();
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
  }

  onChangeNavs(changeEvent: NgbNavChangeEvent)
  {
    switch (changeEvent.nextId) {
      case 2:      
      $('#iconoEspera').show();
      let inves:Investigador=new Investigador();
      inves.accion="ALL";
      this.serviceInvestigador.getAll(inves).subscribe(investigador=>{
              this.listInvestigador=investigador;
              this.selInvestigador=null;
              this.serviceTipoVinculacion.getALL().subscribe(tipo=>{
              this.listTipoVinculacion=tipo;
              this.selTipoVinculacion=null;
            
              this.iniciarTablaInvestigador();

              if (this.propuesta.PRO_CODI!=0)
              {
                this.servicePropuesta.get(this.propuesta.PRO_CODI).subscribe(res=>{
                  this.tituloPropuesta=res.PRO_NOMB;
                  this.selConvocatoria=this.listConvocatoria.find(x=>x.CON_CODI==res.PRO_CONV_CODI);
                  this.documentoArchivoSeleccionado=res.PRO_LINK_GLAC;
                  this.cartaArchivoSeleccionado=res.PRO_LINK_CVLA;
                  this.documentoFile=null;
                  this.cartaFile=null;
                  this.servicePropuesta.getPropuestaInvestigador(this.propuesta.PRO_CODI).subscribe(res2=>{
                    if (res2!=null)
                    {
                      this.listPropuestaInvestigador=(res2==null)? []:res2;
                      if (this.listPropuestaInvestigador.length>0)    this.listPropuestaInvestigador.forEach(x=>x.seleccionado=false);
                      this.table = $('#dataInvestigador').DataTable();
                      this.table.clear();
                      this.table.rows.add(this.listPropuestaInvestigador);
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
              else
              {
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
    }
  }

  onChangeInvestigador()
  {
    let inve = new Investigador();
    inve.INV_CODI=this.selInvestigador.INV_CODI;
    inve.accion="ProgramaEscuela";
    $('#iconoEspera').show();
    this.serviceInvestigador.getProgramaEscuela(inve).subscribe(res=>{
      if (res!=null)
      {
        this.programa=res.Programa;
        this.escuela=res.Escuela;   
        this.idPrograma=res.PAC_CODI;
        this.idEscuela=res.ESC_CODI;     
      }
        let grupo= new Grupo();
        grupo.accion="byInve";
        grupo.gru_inv_codi=this.selInvestigador.INV_CODI;
        this.serviceGrupo.getALL(grupo).subscribe(grupo=>{
            this.listGrupo=grupo;
            this.selGrupo=null;
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

  onClickAgregarInvestigador()
  {
    if (this.selInvestigador==null)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Propuesta"
      this.mensaje.cuerpo="Falta seleccionar investigador";                                     
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
      this.mensaje.titulo="Propuesta"
      this.mensaje.cuerpo="Falta seleccionar rol";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.selGrupo==null)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Propuesta"
      this.mensaje.cuerpo="Falta seleccionar grupo";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.selInvestigador.INV_CODI==this.user.inv_codi)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Propuesta"
      this.mensaje.cuerpo="Ya está incluido el investigador de la propuesta";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.listPropuestaInvestigador.find(x=>x.PIN_INVE_CODI==this.selInvestigador.INV_CODI)!=undefined)
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Propuesta"
      this.mensaje.cuerpo="Ya existe el investigador";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    let propuestaInvestigador = new PropuestaInvestigador();
    propuestaInvestigador.nombreInvestigador=this.selInvestigador.INV_NOMB + ' '  + this.selInvestigador.INV_APEL;
    propuestaInvestigador.Grupo=this.selGrupo.gru_nomb;
    propuestaInvestigador.PIN_TGRU_CODI=this.selGrupo.gru_codi;
    propuestaInvestigador.escuela=this.escuela;
    propuestaInvestigador.programa=this.programa;
    propuestaInvestigador.Rol=this.selTipoVinculacion.TIV_DESC;
    propuestaInvestigador.PIN_TVIN_CODI=this.selTipoVinculacion.TIV_CODI;
    propuestaInvestigador.PIN_INVE_CODI=this.selInvestigador.INV_CODI;
    propuestaInvestigador.PIN_TPRO_CODI=this.idPrograma;
    propuestaInvestigador.PIN_TESC_CODI=this.idEscuela;
    propuestaInvestigador.seleccionado=true;
    this.listPropuestaInvestigador.splice(0,0,propuestaInvestigador);

    this.table = $('#dataInvestigador').DataTable();
    this.table.clear();
    this.table.rows.add(this.listPropuestaInvestigador);
    this.table.draw();

    this.selInvestigador=null;
    this.selTipoVinculacion=null;
    this.selGrupo=null;
  }

  onGuardar()
  {
      if (this.active==2)
      {

        if (this.tituloPropuesta.replace(/\s/g, "")=="")
          {
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Propuesta"
            this.mensaje.cuerpo="Falta nombre de la propuesta";                                     
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return false;   
          }

          if (this.selConvocatoria==null)
          {
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Propuesta"
            this.mensaje.cuerpo="Falta seleccionar convocatoria";                                     
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return false;   
          }


          if (this.documentoFile==null && this.propuesta.PRO_CODI==0)
          {
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Propuesta"
            this.mensaje.cuerpo="Falta seleccionar documento";                                     
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return false;   
          }

          if (this.cartaFile==null && this.propuesta.PRO_CODI==0)
          {
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Propuesta"
            this.mensaje.cuerpo="Falta seleccionar carta";                                     
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return false;   
          }
        
          this.propuesta.PRO_FECH_REGI =  new Date();
          this.propuesta.PRO_INVE_CODI=this.user.inv_codi;
          this.propuesta.PRO_NOMB=this.tituloPropuesta;
          this.propuesta.PRO_CONV_CODI=this.selConvocatoria.CON_CODI;


        $('#iconoEspera').show();
        if ( this.propuesta.PRO_CODI==0)
        {
        this.servicePropuesta.insert(this.propuesta).subscribe(res=>{
         
          if (res!=0 || res!=false)
          {
            this.propuesta.PRO_CODI=res;
           (this.listPropuestaInvestigador.length>0)? this.listPropuestaInvestigador.forEach(x=>x.PIN_PROP_CODI=this.propuesta.PRO_CODI):[];
            this.documentoFile.append('PRO_CODI', this.propuesta.PRO_CODI.toString());
            this.servicePropuesta.insertDocumentoFile(this.documentoFile).subscribe(docu=>{
              this.cartaFile.append('PRO_CODI', this.propuesta.PRO_CODI.toString());
                this.servicePropuesta.insertCartaFile(this.cartaFile).subscribe(carta=>{
                  this.servicePropuesta.insertInvestigador(this.listPropuestaInvestigador).subscribe(res3=>{
                    this.cartaFile=null;
                    this.documentoFile=null;
                    (this.listPropuestaInvestigador.length>0)? this.listPropuestaInvestigador.forEach(x=>x.seleccionado=false):[];            
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
            });

          }
            else{
              $('#iconoEspera').hide();
              this.cartaFile=null;
              this.documentoFile=null;
              let mensaje = new Mensaje();
              mensaje.tipo=TipoMensaje.Error;       
              this.mensaje = new Mensaje(mensaje);     
              this.mensaje.titulo="Propuesta"
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
        this.servicePropuesta.update(this.propuesta).subscribe(res=>{
          (this.listPropuestaInvestigador.length>0)? this.listPropuestaInvestigador.forEach(x=>x.PIN_PROP_CODI=this.propuesta.PRO_CODI):[];
          this.servicePropuesta.insertInvestigador(this.listPropuestaInvestigador).subscribe(res3=>{    
            (this.listPropuestaInvestigador.length>0)? this.listPropuestaInvestigador.forEach(x=>x.seleccionado=false):[];            
            if (this.cartaFile!=null)
            {                  
              this.cartaFile.append('PRO_CODI', this.propuesta.PRO_CODI.toString());
              this.servicePropuesta.insertCartaFile(this.cartaFile).subscribe(carta=>{
                this.cartaFile=null;
                if (this.documentoFile!=null)
                {
                  this.documentoFile.append('PRO_CODI', this.propuesta.PRO_CODI.toString());
                  this.servicePropuesta.insertDocumentoFile(this.documentoFile).subscribe(docu=>{
                    this.documentoFile=null;
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
              });
            }
            else
            {
              if (this.documentoFile!=null)
              {
                this.documentoFile.append('PRO_CODI', this.propuesta.PRO_CODI.toString());
                this.servicePropuesta.insertDocumentoFile(this.documentoFile).subscribe(docu=>{
                  this.documentoFile=null;
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
                $('#iconoEspera').hide();
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
  }

  onClicDownloadDocumento()
  {
    if (this.propuesta.PRO_CODI==0) return;
    $('#iconoEspera').show();
    this.servicePropuesta.getDocumentoFile(this.propuesta).subscribe(res=>{
      $('#iconoEspera').hide();
      window.open(res,"_blank");
    });
  }

  onClicDownloadCarta()
  {
    if (this.propuesta.PRO_CODI==0) return;
    $('#iconoEspera').show();
    this.servicePropuesta.getCartaFile(this.propuesta).subscribe(res=>{
      $('#iconoEspera').hide();
      window.open(res,"_blank");
    });
  }

  onDocumentoFileChanged(fileInput:any)
  {      
    var reader = new FileReader();
    this.documentoSelectFile = <File>fileInput.target.files[0];                   
    if (this.documentoSelectFile==undefined) return;

    this.documentoArchivoSeleccionado=this.documentoSelectFile.name;
    $('#iconoEspera').show();
    reader.readAsDataURL(this.documentoSelectFile); // read file as data url
    this.documentoFile= new FormData();
    this.documentoFile.append('DOCU', fileInput.target.files[0]);
   
    reader.onload = (event : any) => { // called once readAsDataURL is completed
      $('#iconoEspera').hide();
      this.documentoArchivoSeleccionado=this.documentoSelectFile.name;
    }
  }

  onCartaFileChanged(fileInput:any)
  {      
    var reader = new FileReader();
    this.cartaSelectFile = <File>fileInput.target.files[0];                   
    if (this.cartaSelectFile==undefined) return;

    this.cartaArchivoSeleccionado=this.cartaSelectFile.name;
    $('#iconoEspera').show();
    reader.readAsDataURL(this.cartaSelectFile); // read file as data url
    this.cartaFile= new FormData();
    this.cartaFile.append('CARTA', fileInput.target.files[0]);
   
    reader.onload = (event : any) => { // called once readAsDataURL is completed
      $('#iconoEspera').hide();
      this.cartaArchivoSeleccionado=this.cartaSelectFile.name;
    }
  }

  onSalir()
  {
    this.router.navigate(['/convocatoria/propuesta']);
  }

}
