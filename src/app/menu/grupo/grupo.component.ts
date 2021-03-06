import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaComponent } from 'src/app/alerta/alerta';
import { Mensaje, TipoMensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { lenguajeSpanish } from 'src/app/complement/languajeDatatable';
import { Router } from '@angular/router';
import { GrupoService } from 'src/app/service/grupo/serviceGrupo';
import { Grupo } from 'src/app/entidad/grupo/entidad.grupo';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
import * as moment from 'moment';
import { ErrorComponent } from 'src/app/error/error';
declare const $: any;
@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  mensaje:Mensaje;
  showData:boolean=true;
  table:any;
  columnIndex:number;
  grupo:Grupo= new Grupo();
  constructor(private router:Router,private serviceGrupo:GrupoService) { }
  
  ngAfterViewInit(): void {
    moment.locale('es'); 
    this.iniciarTabla();
    
  }

  iniciarTabla() {
    this.table = $('#dataGrupo').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',    
      order: [],   
      columns: [
        { title: 'Nombre', data: 'Grupo' },        
        { title: 'Fecha inicio', data: 'Fecha' }         
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
          targets: [2],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:any, meta:any) => {
            
                return  '<i title="Editar grupo" style="color:blue;cursor:pointer;font-size:1.2rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.gru_codi + ' data-element-nombre="' + full.gru_nomb  + '"></i>'                                            
          }
        },{
          targets: [3],
          data: null,
          width: '0.1%',
          orderable: false,
          className: "text-left",          

          render: (data:any, type:any, full:any, meta:any) => {
          
               return  '<i title="Eliminar grupo" style="color:red;cursor:pointer;font-size:1.2rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.gru_codi + ' data-element-nombre="' + full.gru_nomb + '"></i>'                                
                                           
          }
        }
      ],

      responsive: true,
      scrollY: 200,
      language:lenguajeSpanish
      
    });
   
    

    $('#dataGrupo tbody').on('click', 'td', event => {
    this.columnIndex=event.currentTarget.cellIndex;
    });

    $('#dataGrupo tbody').on('click', 'tr', event => {
     

      if (this.columnIndex==2)
      {
       let id:number=event.currentTarget.cells[2].children[0].dataset.elementId;
       
        this.router.navigate(['/grupo/0/edit-grupo/' + id ]);  

         
           
      
      }  
      if (this.columnIndex==3)
      {
        let id:number=event.currentTarget.cells[2].children[0].dataset.elementId;
        $('#iconoEspera').show();
        this.grupo.gru_codi=id;
        this.grupo.accion="SELECT";
        this.serviceGrupo.get(this.grupo).subscribe(res=>{
          $('#iconoEspera').hide();
          this.grupo.gru_nomb=res.gru_nomb;
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.CondicionSINO;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar grupos"
          this.mensaje.cuerpo="Desea eliminar el grupo " + res.gru_nomb  + " ?";                                     
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
    let grupo= new Grupo();
    grupo.gru_inv_codi=user.inv_codi;
    grupo.accion="ALL";
    $('#iconoEspera').show();
    this.serviceGrupo.getALL(grupo).subscribe(res=>{
      if (res!=null)
      {
        this.table = $('#dataGrupo').DataTable();
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
      this.serviceGrupo.delete(this.grupo).subscribe(res=>{
        $('#iconoEspera').hide();   
        if (res!=true)
        {
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.Advertencia;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar grupos"
          this.mensaje.cuerpo="No se puede eliminar el grupo " + this.grupo.gru_nomb  + " " + res;                                     
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
          return  this.grupo.gru_codi==this.table.row(value).data().gru_codi;
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
    this.router.navigate(['/grupo/0/edit-grupo/0']);  
  }

  onSalir()
  {
    this.router.navigate(['/menu']);
  }

}
