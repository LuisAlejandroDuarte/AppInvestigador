import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { logueado } from 'src/app/entidad/usuario/entidad.usuario';
import { EvaluarPropuestaService } from 'src/app/service/evaluarpropuesta/service.evaluarpropuesta';
import { EvaluarPropuesta } from 'src/app/entidad/evaluarpropuesta/entidad.evaluarpropuesta';
import { ErrorComponent } from 'src/app/error/error';
import { Mensaje, TipoMensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { AlertaComponent } from 'src/app/alerta/alerta';
declare const $: any;
@Component({
  selector: 'app-editevaluar',
  templateUrl: './editevaluar.component.html',
  styleUrls: ['./editevaluar.component.css']
})
export class EditevaluarComponent implements OnInit {
  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  user:logueado;
  propuestaEvaluado:EvaluarPropuesta= new EvaluarPropuesta();
  propuesta:string="";
  convocatoria:string="";
  mensaje:Mensaje;
  documentoSelectFile:File=null;
  documentoArchivoSeleccionado:string="";
  documentoFile:FormData=null;
  valor:number=null;

  documento:string="";
  constructor(private router:Router,private route:ActivatedRoute,
    private serviceEvaluar:EvaluarPropuestaService) { }

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
    this.user =JSON.parse(localStorage.getItem("user"));
    this.propuestaEvaluado.PCJU_CODI=this.route.snapshot.params.id;  
    this.serviceEvaluar.get(this.propuestaEvaluado.PCJU_CODI).subscribe(res=>{
      this.propuesta=res.Propuesta;
      this.convocatoria=res.Convocatoria;
      this.valor=res.PCJU_EEVA_CODI;
      this.documento=res.PCJU_EVAL_PROP_LINK;
      if (res.PCJU_EVAL_PROP_LINK!="" || res.PCJU_EVAL_PROP_LINK!=null)
      {
        this.serviceEvaluar.getFile(res).subscribe(res2=>{
          this.documentoArchivoSeleccionado=res2;
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
      else
      { $('#iconoEspera').hide();}
      
     
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
  onDocumentoFileChanged(fileInput:any)
  {      
    var reader = new FileReader();
    this.documentoSelectFile = <File>fileInput.target.files[0];                   
    if (this.documentoSelectFile==undefined) return;

    this.documentoArchivoSeleccionado=this.documentoSelectFile.name;
    $('#iconoEspera').show();
    reader.readAsDataURL(this.documentoSelectFile); // read file as data url
    this.documentoFile= new FormData();
    this.documentoFile.append('EVAL', fileInput.target.files[0]);
   
    reader.onload = (event : any) => { // called once readAsDataURL is completed
      $('#iconoEspera').hide();
      this.documento=this.documentoSelectFile.name;
    }
  }
  
  onClicBoton1(event:any)
  {
    if (event.nVentana=="IdError")
    $('#IdError').hide();
  }

  onClicBoton2(event:any)
  {

  }

  onGuardar()
  {
    if (this.valor==null || this.valor.toString()=="")
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Evaluación"
      this.mensaje.cuerpo="Falta la evaluación asignada";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }

    if (this.documentoFile==null && (this.documento=="" || this.documento==null))
    {
      let mensaje = new Mensaje();
      mensaje.tipo=TipoMensaje.Error;       
      this.mensaje = new Mensaje(mensaje);     
      this.mensaje.titulo="Evaluación"
      this.mensaje.cuerpo="Cargar la evaluación";                                     
      this.mensaje.nVentana="IdError";
      this.alerta.onChangedMyId("IdError");                      
      $('#IdError').show();   
      return false;   
    }
    $('#iconoEspera').show();
    this.propuestaEvaluado.PCJU_EEVA_CODI=this.valor;
    this.serviceEvaluar.update(this.propuestaEvaluado).subscribe(res=>{    
      if (this.documentoFile!=null)
      {
        this.documentoFile.append('PCJU_CODI', this.propuestaEvaluado.PCJU_CODI.toString());
        this.serviceEvaluar.insertFile(this.documentoFile).subscribe(res=>{
          $('#iconoEspera').hide();
          this.documentoFile=null;
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

  onSalir()
  {
    this.router.navigate(['/convocatoria/evaluar']);
  }

}
