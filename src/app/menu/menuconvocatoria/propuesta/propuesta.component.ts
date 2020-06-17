import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { lenguajeSpanish } from 'src/app/complement/languajeDatatable';
import { Mensaje, TipoMensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { ErrorComponent } from 'src/app/error/error';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
import { AlertaComponent } from 'src/app/alerta/alerta';
import { Router } from '@angular/router';
import { Propuesta } from 'src/app/entidad/propuesta/entidad.propuesta';
import { PropouestaService } from 'src/app/service/propuesta/service.propuesta';
declare const $: any;

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.css']
})
export class PropuestaComponent implements OnInit {
  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  user = new logueado();
  mensaje:Mensaje;
  table:any;
  columnIndex:number;
  propuesta:Propuesta= new Propuesta();
  constructor(private router:Router,private servicePropuesta:PropouestaService) { }


  ngAfterViewInit(): void {
    moment.locale('es'); 
    this.iniciarTabla();
    
  }

  iniciarTabla() {
    this.table = $('#dataPropuesta').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',    
      order: [],   
      columns: [
        { title: 'Propuesta', data: 'PRO_NOMB' },        
        { title: 'Convocatoria', data: 'CON_DESC'},      
              
      ],
      columnDefs: [
        {
          targets: [2],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:Propuesta, meta:any) => {
            
            return  '<i title="Editar propuesta" style="color:blue;cursor:pointer;font-size:1.2rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.PRO_CODI + '></i>'                                            
           }
        },{
          targets: [3],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:Propuesta, meta:any) => {
            
            return  '<i title="Eliminar propuesta" style="color:red;cursor:pointer;font-size:1.2rem" class="fas fa-trash-alt" aria-hidden="true" data-element-id=' + full.PRO_CODI + '></i>'                                
           }
        }
      ],

      responsive: true,
      scrollY: '200',
      language:lenguajeSpanish
      
    });
   
    

    $('#dataPropuesta tbody').on('click', 'td', event => {
    this.columnIndex=event.currentTarget.cellIndex;
    });

    $('#dataPropuesta tbody').on('click', 'tr', event => {
     

      if (this.columnIndex==2)
      {
       let id:number=event.currentTarget.cells[2].children[0].dataset.elementId;
       this.router.navigate(['/convocatoria/editpropuesta/' + id]);                                  
      }  
      if (this.columnIndex==3)
      {
        let id:number=event.currentTarget.cells[2].children[0].dataset.elementId;
        $('#iconoEspera').show();        
        this.servicePropuesta.get(id).subscribe(res=>{
          $('#iconoEspera').hide();
          this.propuesta.PRO_CODI=res.PRO_CODI;
          let mensaje = new Mensaje();
          mensaje.tipo=TipoMensaje.CondicionSINO;       
          this.mensaje = new Mensaje(mensaje);     
          this.mensaje.titulo="Eliminar propuesta"
          this.mensaje.cuerpo="Desea eliminar la proppuesta " + res.PRO_NOMB  + " ?";                                     
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
    this.user =JSON.parse(localStorage.getItem("user"));
    this.propuesta.PRO_INVE_CODI=this.user.inv_codi;
    let user:logueado =JSON.parse(localStorage.getItem("user"));    
    $('#iconoEspera').show();
    this.servicePropuesta.getByInvestigador(this.user.inv_codi).subscribe(res=>{
      if (res!=null)
      {
        this.table = $('#dataPropuesta').DataTable();
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
    this.router.navigate(['/convocatoria/editpropuesta/0']);
  }

  onSalir()
  {
    this.router.navigate(['/convocatoria']);
  }



}
