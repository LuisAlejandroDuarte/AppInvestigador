import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertaComponent } from 'src/app/alerta/alerta';
import { Mensaje } from 'src/app/entidad/mensaje/entidad.mensaje';
import { FormBuilder } from '@angular/forms';

declare const $: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  dataAlert:Mensaje;
  showData:boolean=true;
  titleEstado:string;

  formUsuario = this.form.group({    
    id:[''],      
    identificacion:[''],
    nombre: [''],
    apellido: [''],
    direccion: [''],
    telefono: [''],
    email: ['',],
    login:['']     
  });
  @ViewChild(AlertaComponent) alerta: AlertaComponent;
  constructor(private form: FormBuilder){}
  ngOnInit()
  {

  }

  onClicBoton1(event)
  {

  }

  onClicBoton2(event)
  {
    
  }

  onRestablecerClave()
  {

  }

  showFormCreacion()
  {

  }

  onClicGuardar()
  {

  }

  goBack()
  {
    
  }
}
