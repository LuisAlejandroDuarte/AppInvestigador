import { Component, ViewChild, Injectable } from '@angular/core';

declare const $: any;
import * as moment from 'moment';

import { faUser,faCalendar } from '@fortawesome/free-solid-svg-icons';
import {  NgbDateStruct, NgbCalendar,  NgbDateParserFormatter, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AlertaComponent } from 'src/app/alerta/alerta';
import { Mensaje, TipoMensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { TipoDocumento, Investigador } from 'src/app/entidad/investigador/entidad.investigador';
import { Centro } from 'src/app/entidad/centro/entidad.centro';
import { Zona } from 'src/app/entidad/zona/entidad.zona';
import { Programa } from 'src/app/entidad/programa/entidad.programa';
import { Escuela } from 'src/app/entidad/escuela/entidad.escuela';
import { TipoCargo } from 'src/app/entidad/tipoCargo/entidad.tipoCargo';
import { InvestigadorService } from 'src/app/service/investigador/serviceInvestigador';
import { CentroService } from 'src/app/service/centro/serviceCentro';
import { ZonaService } from 'src/app/service/zona/serviceZona';
import { ProgramaService } from 'src/app/service/programa/servicePrograma';
import { EscuelaService } from 'src/app/service/escuela/serviceEscuela';
import { TipoCargoService } from 'src/app/service/tipoCargo/service.tipoCargo';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
import { NivelFormacion } from 'src/app/entidad/nivelFormacion/nivelformacion';
import { ServiceNivelFormacion } from 'src/app/service/nivelFormacion/serviceNivelFormacion';
import { NivelFormacionInvestigador } from 'src/app/entidad/nivelInvestigador/nivelInvestigador';
import { ServiceNivelFormacionInvestigador } from 'src/app/service/nivelFormacionInvestigador/serviceNivelFormacionInvestigador';



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

    return date ? moment([date.year, date.month - 1, date.day]).format("DD MMMM YYYY"): '';
  }
}

@Component({
  selector: 'app-investigador',
  templateUrl: './investigador.component.html',
  styleUrls: ['./investigador.component.scss'],    
  providers:[{provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})

export class InvestigadorComponent {

  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  readonly DT_FORMAT = 'DD-MMMM-YYYY';
  mensaje:Mensaje;
  faUser = faUser;
  faCalendar =faCalendar;
  fechaNacimiento :NgbDateStruct;
  listTipoDocumento : TipoDocumento[];
  selTipoDocumento:number;
  listCentro:Centro[];
  listZona:Zona[];
  listPrograma:Programa[];
  listEscuela:Escuela[];
  listTipoCargo:TipoCargo[];
  investigador:Investigador;
  escuela:Escuela;
  zona:Zona;
  nombreZona:string;
  programa :Programa;
  tipoCargo:TipoCargo;
  justified:string="justified";
  selectedFile: File = null;
  src:string;
  imageDefer:boolean=false;
  dataAlert:Mensaje;
  fd:FormData=null;
  uploadResponse:any;
  nuevaFoto:boolean=true;
  active = 1;
  listNivelFormacion:NivelFormacion[];
  selNivelFormacion:NivelFormacion;
  grado:string="";
  listInformacionAcademica:NivelFormacionInvestigador[]=[];
  tituloObtenido:string="";
  institucion:string="";
  itemSeleccionado:NivelFormacionInvestigador;
  constructor(private serviceInvestigador:InvestigadorService,
    private serviceCentro:CentroService,
    private serviceZona:ZonaService,
    private servicePrograma:ProgramaService,
    private serviceEscuela:EscuelaService,
    private serviceTipoCargo:TipoCargoService,
    private activeRoute:ActivatedRoute,
    private route:Router,private ngbCalendar: NgbCalendar, private dateAdapter: CustomDateParserFormatter,
    private serviceNivelFormacion:ServiceNivelFormacion,
    private serviceNivelformacionInvestigador:ServiceNivelFormacionInvestigador
    ){}
  
    public ngOnInit() {     
      this.investigador = new Investigador();
      this.investigador.INV_CODI =parseInt(this.activeRoute.snapshot.paramMap.get('id'));  
      let user:logueado =JSON.parse(localStorage.getItem("user"));
      if (this.investigador.INV_CODI==0 && user!=null)
      {
        
        this.investigador.INV_CODI=user.inv_codi;
      }
        

      let tipo  =  new TipoDocumento();
      tipo.accion="listTipoDocumento";
      $('#iconoEspera').show();
      this.serviceInvestigador.getTipoDocumento(tipo).subscribe(result=>{
        this.listTipoDocumento = result;
        let centro = new Centro();
        centro.accion="listCentro";
        this.serviceCentro.getListCentro(centro).subscribe(centro=>{
          this.listCentro = centro;

          let programa = new Programa();
          programa.ACCION="listPrograma";
          this.servicePrograma.getListPrograma(programa).subscribe(progra=>{
            this.listPrograma=progra;

            let tipoCargo= new TipoCargo();
              tipoCargo.ACCION="listTipoCargo";
              this.serviceTipoCargo.getListTipoCargo(tipoCargo).subscribe(res=>{
                this.listTipoCargo=res;
                this.mostrarInvestigador();
               
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
    })

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
    
    onChangeCentro(event)
    {
      let centro = new Centro();
      centro.CEN_ZONA_CODI=event.target.value;
      centro.accion="listZonaByCentro";
      $('#iconoEspera').show();
      this.serviceZona.getZonaByCentro(centro).subscribe(result=>{
       // this.listZona=result;
        this.nombreZona = result.ZON_NOMB;        
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

    onChangePrograma(event)
    {
      let programa =new  Programa();
      programa.PAC_ESCU_CODI =event.target.value;
      programa.ACCION="listEscuelaByPrograma";
      $('#iconoEspera').show();
      this.serviceEscuela.getListEscuelaByPrograma(programa).subscribe(result=>{
        this.listEscuela =result;
        this.investigador.INV_ESC_CODI=programa.PAC_ESCU_CODI;
        
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

    onClicBoton1(event){  
      if (event.nVentana=="IdError")
              $('#IdError').hide();
      if (event.nVentana=="IdEliminar")
      {
        let nivel = new NivelFormacionInvestigador();
        nivel.NIN_INV_CODI=this.investigador.INV_CODI;
        nivel
        this.itemSeleccionado.ACCION="delete";
        $('#iconoEspera').show();
        this.serviceNivelformacionInvestigador.delete(this.itemSeleccionado).subscribe(res=>{

          if (res==true)
          {
            let index = this.listInformacionAcademica.findIndex(x=>x.NIN_NIV_CODI==this.itemSeleccionado.NIN_NIV_CODI);
            this.listInformacionAcademica.splice(index,1);
            $('#IdEliminar').hide();
            $('#iconoEspera').hide();
          }   
          else
          {
            $('#IdEliminar').hide();
            $('#iconoEspera').hide();
            let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Error"
            this.mensaje.cuerpo="Error al eliminar el nivel de formación";      
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return;   
                    
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

    onClicBoton2(event){  
      if (event.nVentana=="IdEliminar")
              $('#IdEliminar').hide();
  
    }

    mostrarInvestigador()
    {
      $('#iconoEspera').show();
        this.investigador.accion="GET";
        this.serviceInvestigador.getInvestigador(this.investigador).subscribe(res=>{
          if (res!=null)
          {                                   
            this.investigador=res;     
             
            this.fechaNacimiento=this.dateAdapter.parse(res.INV_FECH_NACI.toString());                     
            let centro = new Centro();
            centro.CEN_ZONA_CODI=this.investigador.INV_CENT_CODI;
            centro.accion="listZonaByCentro";
           
            this.serviceZona.getZonaByCentro(centro).subscribe(result=>{
             // this.listZona=result;
              this.nombreZona = result.ZON_NOMB;   
              
              let programa= new Programa();
             
              programa= this.listPrograma.find(x=>x.PAC_CODI==this.investigador.INV_PROG_ACAD_CODI);                        
              programa.ACCION="listEscuelaByPrograma";
              this.serviceEscuela.getListEscuelaByPrograma(programa).subscribe(res=>{
                
                this.listEscuela=res;

                this.escuela = new Escuela();
                this.escuela =this.listEscuela.find(x=>x.ESC_CODI==res[0].ESC_CODI);
                this.investigador.INV_ESC_CODI=this.escuela.ESC_CODI;

                this.tipoCargo = new TipoCargo();
                this.tipoCargo=this.listTipoCargo.find(x=>x.TICA_CODI==this.investigador.INV_TICA_CODI);
                this.investigador.accion="Foto";
                this.serviceInvestigador.getFoto(this.investigador).subscribe(foto=>{
                  if (foto!=null)
                  {
                    this.nuevaFoto=false;
                    this.fd=null;
                    //this.src= foto;
                    this.src="data:image/jpeg;base64," + foto;
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

    onDateSelection(date: NgbDateStruct)
    {
      const mdt = moment([date.year, date.month - 1, date.day]);
   //  this.fechaNacimiento= this.dateAdapter.format(date);
    }

    onGuardar()
    {                  
      switch (this.active) {
        case 1:
          this.investigador.accion="InsertData";
          $('#iconoEspera').show();
          this.serviceInvestigador.setInvestigador(this.investigador).subscribe(rs=>{
            if (rs==true)
            {
              if (this.fd!=null && this.nuevaFoto)
              {
                this.serviceInvestigador.insertFoto(this.fd).subscribe((res) => {
                  this.uploadResponse = res;
                  $('#iconoEspera').hide();
                  if (res.error==true)
                  {
                    let mensaje = new Mensaje();
                    mensaje.tipo=TipoMensaje.Error;       
                    this.mensaje = new Mensaje(mensaje);     
                    this.mensaje.titulo="Foto"
                    this.mensaje.cuerpo=res.message;                                     
                    this.mensaje.nVentana="IdError";
                    this.alerta.onChangedMyId("IdError");                      
                    $('#IdError').show();   
                    return;   
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
              else{
                if (this.fd==null && this.nuevaFoto==true)
                {
                  $('#iconoEspera').hide();
                  this.investigador.accion="deleteFoto";
                  this.serviceInvestigador.setInvestigador(this.investigador).subscribe(del=>{
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
          case 2:
            $('#iconoEspera').show();
          this.serviceNivelformacionInvestigador.set(this.listInformacionAcademica).subscribe(res=>{
            if (res==true)
            {
              $('#iconoEspera').hide();
            }
            else
            {
              $('#iconoEspera').hide();
              let mensaje = new Mensaje();
            mensaje.tipo=TipoMensaje.Error;       
            this.mensaje = new Mensaje(mensaje);     
            this.mensaje.titulo="Error"
            this.mensaje.cuerpo="Error al consultar niveles de formación";      
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();   
            return;   
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
        default:
          break;
      }
     


    }

    onSalir()
    {
      this.route.navigate(['/menu']);
    }


    onFileChanged(fileInput:any)
    {
      var reader = new FileReader();
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      this.selectedFile = <File>fileInput.target.files[0];   
      
      if (this.selectedFile==undefined) return;
      
      
      
      if (this.selectedFile.size > max_size) {             
        let mensaje = new Mensaje();
        mensaje.tipo=TipoMensaje.Error;       
        this.mensaje = new Mensaje(mensaje);     
        this.mensaje.titulo="Foto"
        this.mensaje.cuerpo="La foto es muy grande máximo tamaño"  + max_size / 1000 + "Mb";      
        this.mensaje.nVentana="IdError";
        this.alerta.onChangedMyId("IdError");                      
        $('#IdError').show();   
        return;   
                
    }



      if (this.selectedFile==undefined) return;     
      $('#iconoEspera').show();
      reader.readAsDataURL(fileInput.target.files[0]); // read file as data url
      this.fd= new FormData();
      this.fd.append('FOTO', fileInput.target.files[0]);
      this.fd.append('Id', this.investigador.INV_CODI.toString());
      reader.onload = (event : any) => { // called once readAsDataURL is completed
        $('#iconoEspera').hide();
        this.src=event.target.result; 
        this.nuevaFoto=true;
        this.imageDefer=true;
      }
    }

    onClicEliminarFoto()
    {
      this.src="";
      this.fd=null;
      this.nuevaFoto=true;
    }
    onChangeNavs(changeEvent: NgbNavChangeEvent)
    {
      $('#iconoEspera').show();
        switch (changeEvent.nextId) {
          case 2:

            this.serviceNivelFormacion.getList().subscribe(res=>{
              this.listNivelFormacion=res;
              this.selNivelFormacion=null;

              this.serviceNivelformacionInvestigador.get(this.investigador.INV_CODI).subscribe(res=>{
                if (res!=null)
                {
                res.forEach(element => {
                    element.nombreNivel=this.listNivelFormacion.find(x=>x.NIV_CODI==element.NIN_NIV_CODI).NIV_NOMB;
                    element.seleccionado=false;
                  });
                  this.listInformacionAcademica=res;
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
            
            break;
        
          default:
            $('#iconoEspera').hide();
            break;
        }
    }

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

    onClicAgregarInformacionAcademica()
    {
        if (this.tituloObtenido.replace(/\s/g, "")=="")
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Información académica"
          this.mensaje.cuerpo="Falta título obtenido";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return;   
        }
        if (this.institucion.replace(/\s/g, "")=="")
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Información académica"
          this.mensaje.cuerpo="Falta institución";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return;   
        }

        if (this.institucion.replace(/\s/g, "")=="")
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Información académica"
          this.mensaje.cuerpo="Falta institución";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return;   
        }

        if (this.grado.replace(/\s/g, "")=="")
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Información académica"
          this.mensaje.cuerpo="Falta año del grado";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return;   
        }

        if (this.selNivelFormacion==null)
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Información académica"
          this.mensaje.cuerpo="Falta nivel de formación";                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show();   
          return;   
        }

        // let existe=this.listInformacionAcademica.find(x=>x.NIN_NIV_CODI==this.selNivelFormacion.NIV_CODI);
        // if (existe!=undefined)
        // {
        //   let mensaje = new Mensaje();
        //   mensaje.tipo=TipoMensaje.Error;       
        //   this.mensaje = new Mensaje(mensaje);     
        //   this.mensaje.titulo="Información académica"
        //   this.mensaje.cuerpo="Ya existe el nivel de formación";                                     
        //   this.mensaje.nVentana="IdError";
        //   this.alerta.onChangedMyId("IdError");                      
        //   $('#IdError').show();   
        //   return;   
        // }

      let nivelFormacion= new NivelFormacionInvestigador();
      nivelFormacion.NIN_INV_CODI=this.investigador.INV_CODI;
      nivelFormacion.NIN_NIV_CODI=this.selNivelFormacion.NIV_CODI;
      nivelFormacion.NIN_INST=this.institucion;
      nivelFormacion.NIN_TITU_OBTE=this.tituloObtenido;
      nivelFormacion.NIN_AGNO=parseInt(this.grado);  
      nivelFormacion.nombreNivel=this.selNivelFormacion.NIV_NOMB;
      nivelFormacion.seleccionado=true;
      this.listInformacionAcademica.splice(0,0,nivelFormacion);    
      
      this.institucion="";
      this.tituloObtenido="";
      this.grado="";
      this.selNivelFormacion=null;

    }

    onClicEliminarInformacionAcademica(item:NivelFormacionInvestigador)
    {
      if (item.seleccionado==true)
      {
        let index = this.listInformacionAcademica.findIndex(x=>x.NIN_NIV_CODI==item.NIN_NIV_CODI);
        this.listInformacionAcademica.splice(index,1);
        
      }
      else
      {
        this.itemSeleccionado=item;
        let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Error;
         
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar nivel formación"
          this.mensaje.cuerpo="Desea eliminar el nivel " + item.nombreNivel + "?";
          this.mensaje.botones[0].label="SI";
          this.mensaje.botones[1].label="NO";
          this.mensaje.botones[1].visible=true;
          this.mensaje.nVentana="IdEliminar";
          this.alerta.onChangedMyId("IdEliminar");                      
          $('#IdEliminar').show();     
      }
    }

}


