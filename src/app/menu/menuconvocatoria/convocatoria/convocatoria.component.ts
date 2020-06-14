import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaComponent } from 'src/app/alerta/alerta';
import { Mensaje, TipoMensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { Router } from '@angular/router';
import { Convocatoria } from 'src/app/entidad/convocatoria/entidad.convocatoria';
import * as moment from 'moment';
import { lenguajeSpanish } from 'src/app/complement/languajeDatatable';
import { ErrorComponent } from 'src/app/error/error';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
import { Grupo } from 'src/app/entidad/grupo/entidad.grupo';
import { ConvocatoriaService } from 'src/app/service/convocatoria/service.convocatoria';
declare const $: any;
@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {
  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  mensaje:Mensaje;
  table:any;
  columnIndex:number;
  convocatoria:Convocatoria= new Convocatoria();
  constructor(private router:Router,
    private serviceConvocatoria:ConvocatoriaService) { }

  
  ngAfterViewInit(): void {
    moment.locale('es'); 
    this.iniciarTabla();
    
  }

  iniciarTabla() {
    this.table = $('#dataConvocatoria').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',    
      order: [],   
      columns: [
        { title: 'Número', data: 'CON_NUME' },        
        { title: 'Descripción', data: 'CON_DESC'},
        { title: 'Fecha inicio', data: 'CON_FECH_INIC'},
        { title: 'Fecha final', data: 'CON_FECH_FINA'}   
              
      ],
      columnDefs: [
        {
          targets: [2],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:Convocatoria, meta:any) => {
              return moment(full.CON_FECH_INIC).format("DD MMMM YYYY");                
          }
        },{
          targets: [3],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:Convocatoria, meta:any) => {
            if (full.CON_FECH_FINA==null) return "";
              return moment(full.CON_FECH_FINA).format("DD MMMM YYYY");                
          }
        },  {
          targets: [4],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:Convocatoria, meta:any) => {
            
                return  '<i title="Editar convocatoria" style="color:blue;cursor:pointer;font-size:1.2rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.CON_CODI + '></i>'                                            
          }
        },{
          targets: [5],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:Convocatoria, meta:any) => {
          
               return  '<i title="Eliminar convocatoria" style="color:red;cursor:pointer;font-size:1.2rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.CON_CODI + '></i>'                                
                                           
          }
        }
      ],

      responsive: true,
      scrollY: 200,
      language:lenguajeSpanish
      
    });
   
    

    $('#dataConvocatoria tbody').on('click', 'td', event => {
    this.columnIndex=event.currentTarget.cellIndex;
    });

    $('#dataConvocatoria tbody').on('click', 'tr', event => {
     

      if (this.columnIndex==4)
      {
       let id:number=event.currentTarget.cells[4].children[0].dataset.elementId;
       this.router.navigate(['/convocatoria/editconvocatoria/' + id]);                                  
      }  
      if (this.columnIndex==5)
      {
        let id:number=event.currentTarget.cells[2].children[0].dataset.elementId;
        $('#iconoEspera').show();        
        this.serviceConvocatoria.get(id).subscribe(res=>{
          $('#iconoEspera').hide();
          this.convocatoria.CON_DESC=res.CON_DESC;
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.CondicionSINO;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar grupos"
          this.mensaje.cuerpo="Desea eliminar el grupo " + res.CON_DESC  + " ?";                                     
          this.mensaje.nVentana="IdEliminar";
          this.alerta.onChangedMyId("IdEliminar");                      
          $('#IdEliminar').show();   
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


  ngOnInit(): void {
    moment.locale('es');
    let user:logueado =JSON.parse(localStorage.getItem("user"));    
    $('#iconoEspera').show();
    this.serviceConvocatoria.getALL().subscribe(res=>{
      if (res!=null)
      {
        this.table = $('#dataConvocatoria').DataTable();
        this.table.clear();
        this.table.rows.add(res);
        this.table.draw();
      }
      $('#iconoEspera').hide();
    });

  }

  onClicBoton1(event:any)
  {
    if (event.nVentana=="IdError")
    {
      $('#IdError').hide();
    }

    
  }
  onClicBoton2(event:any)
  {
    if (event.nVentana=="IdEliminar")
    {
      $('#IdEliminar').hide();
    }

    
  }

  showFormCreacion()
  {
    this.router.navigate(['/convocatoria/editconvocatoria/0']);
  }

  onSalir()
  {
    this.router.navigate(['/convocatoria']);
  }


}
