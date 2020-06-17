import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaComponent } from 'src/app/alerta/alerta';
import { Mensaje, TipoMensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { lenguajeSpanish } from 'src/app/complement/languajeDatatable';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
import { Semillero } from 'src/app/entidad/semillero/entidad.semillero';
import { SemilleroService } from 'src/app/service/semillero/serviceSemillero';
import { ErrorComponent } from 'src/app/error/error';
declare const $: any;

@Component({
  selector: 'app-semillero',
  templateUrl: './semillero.component.html',
  styleUrls: ['./semillero.component.css']
})
export class SemilleroComponent implements OnInit {

  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  mensaje:Mensaje;
  showData:boolean=true;
  table:any;
  columnIndex:number;
  semillero:Semillero= new Semillero();
  constructor(private router:Router,private serviceSemillero:SemilleroService) { }

  ngAfterViewInit(): void {
    moment.locale('es'); 
    this.iniciarTabla();
    
  }

  iniciarTabla() {
    this.table = $('#dataSemillero').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',    
      order: [],   
      columns: [
        { title: 'Nombre', data: 'SEM_NOMB' },        
        { title: 'Fecha inicio', data: 'Fecha' }         
      ],
      columnDefs: [
        {
          targets: [1],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:Semillero, meta:any) => {
              return moment(full.SEM_FECH_INI).format("DD MMMM YYYY");                
          }
        }, {
          targets: [2],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:Semillero, meta:any) => {
            
                return  '<i title="Editar semillero" style="color:blue;cursor:pointer;font-size:1.2rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.SEM_CODI + '></i>'                                            
          }
        },{
          targets: [3],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:any, meta:any) => {
          
               return  '<i title="Eliminar semillero" style="color:red;cursor:pointer;font-size:1.2rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.SEM_CODI + '></i>'                                
                                           
          }
        }
      ],

      responsive: true,
      scrollY: '200',
      language:lenguajeSpanish
      
    });
   
    

    $('#dataSemillero tbody').on('click', 'td', event => {
    this.columnIndex=event.currentTarget.cellIndex;
    });

    $('#dataSemillero tbody').on('click', 'tr', event => {
     

      if (this.columnIndex==2)
      {
        let id:number=event.currentTarget.cells[2].children[0].dataset.elementId;
       
        this.router.navigate(['/semillero/0/edit-semillero/' + id ]);  
         
           
      
      }  
      if (this.columnIndex==3)
      {
        let id:number=event.currentTarget.cells[2].children[0].dataset.elementId;
        $('#iconoEspera').show();
        this.semillero.SEM_CODI=id;
        this.semillero.accion="SELECT";
        this.serviceSemillero.get(id).subscribe(res=>{
          $('#iconoEspera').hide();
          this.semillero.SEM_NOMB=res.SEM_NOMB;
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.CondicionSINO;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar semilleros"
          this.mensaje.cuerpo="Desea eliminar el semillero " + res.SEM_NOMB  + " ?";                                     
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
    let semillero= new Semillero();   
    semillero.accion="ALL";
    $('#iconoEspera').show();
    this.serviceSemillero.getByInve(user.inv_codi).subscribe(res=>{
      if (res!=null)
      {
        this.table = $('#dataSemillero').DataTable();
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
    if (event.nVentana=="IdEliminar")
    {
      $('#iconoEspera').show();      
      this.serviceSemillero.delete(this.semillero).subscribe(res=>{
        $('#iconoEspera').hide();   
        if (res!=true)
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Advertencia;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar semillero"
          this.mensaje.cuerpo="No se puede eliminar el semillero " + this.semillero.SEM_NOMB  + " " + res;                                     
          this.mensaje.nVentana="IdError";
          this.alerta.onChangedMyId("IdError");                      
          $('#IdError').show(); 
          $('#IdEliminar').hide();   
          return;
        }
        $('#iconoEspera').hide();
        var indexes = this.table
        .rows()
        .indexes()
        .filter((value:any,index:any) => {
          return  this.semillero.SEM_CODI==this.table.row(value).data().SEM_CODI;
        } );
    
        this.table.rows(indexes).remove().draw();
      
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
    {
      $('#IdEliminar').hide();
    }

  }

  showFormCreacion()
  {
    this.router.navigate(['/semillero/0/edit-semillero/0']);  
  }

  onSalir()
  {
    this.router.navigate(['/menu']);
  }

}
