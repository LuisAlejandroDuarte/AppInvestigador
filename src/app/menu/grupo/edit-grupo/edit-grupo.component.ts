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
import { Validators } from '@angular/forms';
import { Grupo } from 'src/app/entidad/grupo/entidad.grupo';
import { GrupoService } from 'src/app/service/grupo/serviceGrupo';
import { lenguajeSpanish } from 'src/app/complement/languajeDatatable';
import { GrupoLineaService } from 'src/app/service/grupolinea/service.grupolinea';
import { LineaService } from 'src/app/service/linea/service.linea';
import { GrupoLinea } from 'src/app/entidad/lineagrupo/entidad.lineagrupo';
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
  tableLinea:any;
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

  textoEstadoInvestigador:string;
  textoEstadoSemillero:string;
  listGrupoLinea:GrupoLinea[]=[];
  constructor(private serviceInevstigador:InvestigadorService,
    private serviceArea:AreaService,private serviceCentro:CentroService,
    private router:Router,private dateAdapter: CustomDateParserFormatter,
    private route:ActivatedRoute,private serviceGrupo:GrupoService,
    private serviceGrupoLinea:GrupoLineaService,
    private serviceLinea:LineaService ) { }

   
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
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

  onClicBoton1(event:any)
  {
    if (event.nVentana=="IdError")
       $('#IdError').hide();
  }

  onClicBoton2(event:any)
  {

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
        let inves= new Investigador();
        this.showDataLinea=true;
        $('#iconoEspera').show();
        this.serviceGrupoLinea.getALL(this.grupo.gru_codi).subscribe(res=>{
          this.iniciarTablaLineas();
            setTimeout(() => {
              this.tableLinea = $('#dataLineas').DataTable();
              this.tableLinea.clear();
              this.tableLinea.rows.add(res);
              this.tableLinea.draw();
              let data= this.tableLinea.rows().data();
              data.each(function (value, index) {
              
                gli_grup_codi:number;
                gli_fech_inic:Date;
                gli_fech_term?:Date;
                this.listGrupoLinea.gli_codi=value.gli_codi;
                this.listGrupoLinea.gli_codi=value.gli_codi;

              });
              
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
          this.grupo.gru_fech_ini=moment(moment(this.dateAdapter.format(this.fechaCreacion),"DD MMMM YYYY").toDate()).toDate();
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

          render: (data:any, type:any, full:any, meta:any) => {
              return moment(full.Fecha).format("DD MMMM YYYY");                
          }
        }, {
          targets: [3],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:any, meta:any) => {
            
                return  '<i title="Editar grupo" style="color:blue;cursor:pointer;font-size:1.5rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.gru_codi + ' data-element-nombre="' + full.gru_nomb  + '"></i>'                                            
          }
        },{
          targets: [4],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:any, meta:any) => {
          
               return  '<i title="Eliminar grupo" style="color:red;cursor:pointer;font-size:1.5rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.gru_codi + ' data-element-nombre="' + full.gru_nomb + '"></i>'                                
                                           
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
     

      if (this.columnIndex==2)
      {
       let id:number=event.currentTarget.cells[2].children[0].dataset.elementId;                   
                      
      
      }  
      if (this.columnIndex==3)
      {
           
      }   
    });
  }  


  showFormCreacionLineas()
  {
    this.showDataLinea=false;
    this.textoEstadoLinea="Agregar línea de investigación";
    $('#iconoEspera').show();
    this.serviceLinea.getALL().subscribe(res=>{
      this.listLinea=res;
      this.selLinea=null;
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

  }

  goBackLineas()
  {
    this.showDataLinea=true;
    $('#iconoEspera').show();
    this.serviceGrupoLinea.getALL(this.grupo.gru_codi).subscribe(res=>{
      this.iniciarTablaLineas();
        setTimeout(() => {
          this.tableLinea = $('#dataLineas').DataTable();
          this.tableLinea.clear();
          this.tableLinea.rows.add(res);
          this.tableLinea.draw();
         
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
  }

}
