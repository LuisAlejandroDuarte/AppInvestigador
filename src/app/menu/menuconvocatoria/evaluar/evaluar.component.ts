import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaComponent } from 'src/app/alerta/alerta';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
import { Mensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { EvaluarPropuesta } from 'src/app/entidad/evaluarpropuesta/entidad.evaluarpropuesta';
import { lenguajeSpanish } from 'src/app/complement/languajeDatatable';
import { Router } from '@angular/router';
import { EvaluarPropuestaService } from 'src/app/service/evaluarpropuesta/service.evaluarpropuesta';




declare const $: any;
@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.css']
})
export class EvaluarComponent implements OnInit {
  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  user = new logueado();
  mensaje:Mensaje;
  table:any;
  columnIndex:number;

  constructor(private router:Router,private serviceEvaluarPropuesta:EvaluarPropuestaService) { }

  ngAfterViewInit(): void {
    
    this.iniciarTabla();
    
  }

  iniciarTabla() {
    this.table = $('#dataEvaluarPropuesta').DataTable({
      dom: '<"top"f>rt<"bottom"p><"clear">',    
      order: [],   
      columns: [
        { title: 'Propuesta', data: 'Propuesta' },        
        { title: 'Convocatoria', data: 'Convocatoria'},      
              
      ],
      columnDefs: [
        {
          targets: [2],
          data: null,                   
          className: "text-left",          

          render: (data:any, type:any, full:EvaluarPropuesta, meta:any) => {
            
            return  '<i title="Editar propuesta" style="color:blue;cursor:pointer;font-size:1.2rem" class="fas fa-info-circle" aria-hidden="true" data-element-id=' + full.PCJU_CODI + '></i>'                                            
           }
        }],

      responsive: true,
      scrollY: '200',
      language:lenguajeSpanish
      
    });
   
    

    $('#dataEvaluarPropuesta tbody').on('click', 'td', event => {
    this.columnIndex=event.currentTarget.cellIndex;
    });

    $('#dataEvaluarPropuesta tbody').on('click', 'tr', event => {
     

      if (this.columnIndex==2)
      {
       let id:number=event.currentTarget.cells[2].children[0].dataset.elementId;
       this.router.navigate(['/convocatoria/editevaluar/' + id]);                                  
      }        
    });
  }

  ngOnInit(): void {
    $('#iconoEspera').show();
    this.user =JSON.parse(localStorage.getItem("user"));
    this.serviceEvaluarPropuesta.getAll(this.user.inv_codi).subscribe(res=>{
      this.table = $('#dataEvaluarPropuesta').DataTable();
      this.table.clear();
      this.table.rows.add([]);
      this.table.draw();    
      if (res!=null)
      {
        this.table.rows.add(res);
        this.table.draw();       
      }
      $('#iconoEspera').hide()
    });
  }

  onClicBoton1(event:any)
  {

  }

  onClicBoton2(event:any)
  {

  }

  onSalir()
  {
    this.router.navigate(['/convocatoria']);
  }



}
