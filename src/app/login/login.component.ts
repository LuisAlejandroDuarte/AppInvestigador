import { Component, OnInit, ViewChild } from '@angular/core';
import { InvestigadorService } from '../service/investigador/serviceInvestigador';
import { Router, ActivatedRoute } from '@angular/router';
import { Mensaje, TipoMensaje } from '../entidad/mensaje/entidad.mensaje';
import { Usuario, Modulo, logueado } from '../entidad/usuario/entidad.usuario';
import { ErrorComponent } from '../error/error';
import { Md5 } from 'ts-md5';
import { AlertaComponent } from '../alerta/alerta';
import { LoginService } from './service';
import { UsuarioService } from '../service/usuario/service.usuario';

declare const $: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private investigadorService:InvestigadorService, 
    private router: Router,private route:ActivatedRoute, private loginservice:LoginService,private serviceUsuario:UsuarioService
    ){}
    @ViewChild(AlertaComponent) alerta: AlertaComponent;
  user:string;
  pass:string; 
  mensaje:Mensaje;
  headText:string;  
  onClickValidarUsuario()
  {
    let usuario = new Usuario;
    if (this.user!=undefined && this.pass!=undefined)
    {    
        usuario.use_usua= this.user;    
        usuario.accion="login";
        let passEncrypt = new Md5().appendStr(this.pass).end();
        usuario.use_clav=passEncrypt.toString();
        $('#iconoEspera').show();


        if (this.route.snapshot.params.id==1)
          {
            this.serviceUsuario.getUsuario(usuario).subscribe(res=>{
              if (res==null)
                {
                  let mensaje =new Mensaje();
                  mensaje.tipo=TipoMensaje.Advertencia;
                  this.mensaje = new Mensaje(mensaje);
                  this.mensaje.tipo=TipoMensaje.Error;
                  this.mensaje.titulo="Validando usuario";
                  this.mensaje.cuerpo="El usuario o la contraseña no corresponden";
                  this.mensaje.nVentana="IdError";         
                  this.alerta.onChangedMyId("IdError");
                  $('#iconoEspera').hide();
                  setTimeout(()=>{
                      $('#IdError').show();     
                    });
                }
                else
                {

                  if (res.use_cod_tipo==1)
                  {
                    let mensaje =new Mensaje();
                    mensaje.tipo=TipoMensaje.Advertencia;
                    this.mensaje = new Mensaje(mensaje);
                    this.mensaje.tipo=TipoMensaje.Error;
                    this.mensaje.titulo="Validando usuario";
                    this.mensaje.cuerpo="No es usuario administrador";
                    this.mensaje.nVentana="IdError";         
                    this.alerta.onChangedMyId("IdError");
                    $('#iconoEspera').hide();
                    setTimeout(()=>{
                        $('#IdError').show();     
                        return;
                      });
                  }
                  else
                  {

                  let user= new logueado();
                  user.use_cod_tipo=res.use_cod_tipo;
                  user.use_codi=res.use_codi;                  
                  user.modulos=Array<Modulo>(2);                  
                    user.modulos[0]=1;
                    user.modulos[1]=5;

                    localStorage.setItem("user",JSON.stringify(user));

                    this.router.navigate(['/administrar/1']);  
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
          }
          
        if (this.route.snapshot.params.id==2)
        {
          
          this.investigadorService.getValidar(usuario).subscribe(result=>{
            
            if (result==null)
            {
              let mensaje =new Mensaje();
              mensaje.tipo=TipoMensaje.Advertencia;
              this.mensaje = new Mensaje(mensaje);
              this.mensaje.tipo=TipoMensaje.Error;
              this.mensaje.titulo="Validando Investigador";
              this.mensaje.cuerpo="El usuario o la contraseña no corresponden";
              this.mensaje.nVentana="IdError";         
              this.alerta.onChangedMyId("IdError");
              $('#iconoEspera').hide();
              setTimeout(()=>{
                  $('#IdError').show();     
                });
            }
            else
            {
              let user= new logueado();
              user.use_cod_tipo=result.use_cod_tipo;
              user.use_codi=result.use_codi;    
              user.inv_codi=result.inv_codi;                            
              user.modulos=Array<Modulo>(5);                  
                user.modulos[0]=2;
                user.modulos[1]=3;
                user.modulos[2]=4;
                user.modulos[3]=6;
                user.modulos[4]=7;
                $('#iconoEspera').hide();
                localStorage.setItem("user",JSON.stringify(user));
                this.router.navigate(['/investigador',result.inv_codi]);  
            }
          },error=> {
            $('#iconoEspera').hide();            
            var errorComponent = new ErrorComponent();            
            this.mensaje =errorComponent.GenerarMensaje(error);          
            this.mensaje.nVentana="IdError";
            this.alerta.onChangedMyId("IdError");                      
            $('#IdError').show();  
          });
        }  

        if (this.route.snapshot.params.id==3)
        {
          this.investigadorService.getValidar(usuario).subscribe(result=>{
            
            if (result==null)
            {
              let mensaje =new Mensaje();
              mensaje.tipo=TipoMensaje.Advertencia;
              this.mensaje = new Mensaje(mensaje);
              this.mensaje.tipo=TipoMensaje.Error;
              this.mensaje.titulo="Validando grupo";
              this.mensaje.cuerpo="El usuario o la contraseña no corresponden";
              this.mensaje.nVentana="IdError";         
              this.alerta.onChangedMyId("IdError");
              $('#iconoEspera').hide();
              setTimeout(()=>{
                  $('#IdError').show();     
                });
            }
            else
            {
              $('#iconoEspera').hide();
              let user= new logueado();
              user.use_cod_tipo=result.use_cod_tipo;
              user.use_codi=result.use_codi;     
              user.inv_codi=result.inv_codi;                                         
              user.modulos=Array<Modulo>(5);                  
                user.modulos[0]=2;
                user.modulos[1]=3;
                user.modulos[2]=4;
                user.modulos[3]=6;
                user.modulos[4]=7;
                localStorage.setItem("user",JSON.stringify(user));
                this.router.navigate(['/grupo',result.inv_codi]);  
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

        if (this.route.snapshot.params.id==4)
        {
          this.investigadorService.getValidar(usuario).subscribe(result=>{
            
            if (result==null)
            {
              let mensaje =new Mensaje();
              mensaje.tipo=TipoMensaje.Advertencia;
              this.mensaje = new Mensaje(mensaje);
              this.mensaje.tipo=TipoMensaje.Error;
              this.mensaje.titulo="Validando grupo";
              this.mensaje.cuerpo="El usuario o la contraseña no corresponden";
              this.mensaje.nVentana="IdError";         
              this.alerta.onChangedMyId("IdError");
              $('#iconoEspera').hide();
              setTimeout(()=>{
                  $('#IdError').show();     
                });
            }
            else
            {
              $('#iconoEspera').hide();
              let user= new logueado();
              user.use_cod_tipo=result.use_cod_tipo;
              user.use_codi=result.use_codi;   
              user.inv_codi=result.inv_codi;                                           
              user.modulos=Array<Modulo>(5);                  
                user.modulos[0]=2;
                user.modulos[1]=3;
                user.modulos[2]=4;
                user.modulos[3]=6;
                user.modulos[4]=7;
                localStorage.setItem("user",JSON.stringify(user));
                this.router.navigate(['/semillero',result.inv_codi]);  
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

        if (this.route.snapshot.params.id==5)       
        {
          this.serviceUsuario.getUsuario(usuario).subscribe(res=>{
            if (res==null)
              {
                let mensaje =new Mensaje();
                mensaje.tipo=TipoMensaje.Advertencia;
                this.mensaje = new Mensaje(mensaje);
                this.mensaje.tipo=TipoMensaje.Error;
                this.mensaje.titulo="Validando usuario";
                this.mensaje.cuerpo="El usuario o la contraseña no corresponden";
                this.mensaje.nVentana="IdError";         
                this.alerta.onChangedMyId("IdError");
                $('#iconoEspera').hide();
                setTimeout(()=>{
                    $('#IdError').show();     
                  });
              }
              else
              {
  
                if (res.use_cod_tipo==1)
                {
                  let mensaje =new Mensaje();
                  mensaje.tipo=TipoMensaje.Advertencia;
                  this.mensaje = new Mensaje(mensaje);
                  this.mensaje.tipo=TipoMensaje.Error;
                  this.mensaje.titulo="Validando usuario";
                  this.mensaje.cuerpo="No es usuario administrador";
                  this.mensaje.nVentana="IdError";         
                  this.alerta.onChangedMyId("IdError");
                  $('#iconoEspera').hide();
                  setTimeout(()=>{
                      $('#IdError').show();     
                      return;
                    });
                }
                else
                {
  
                let user= new logueado();
                user.use_cod_tipo=res.use_cod_tipo;
                user.use_codi=res.use_codi;                  
                user.modulos=Array<Modulo>(2);                  
                  user.modulos[0]=1;
                  user.modulos[1]=5;
  
                  localStorage.setItem("user",JSON.stringify(user));
  
                  this.router.navigate(['/convocatoria/gestion']);  
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
        }  

   
    }
    else
    {
      let mensaje =new Mensaje();
      mensaje.tipo=TipoMensaje.Advertencia;
      this.mensaje = new Mensaje(mensaje);
      this.mensaje.tipo=TipoMensaje.Informacion;
      this.mensaje.titulo="Validando Investigador";
      this.mensaje.cuerpo="Faltan Datos en usuario o clave";
      this.mensaje.nVentana="IdError";         
      this.alerta.onChangedMyId("IdError");
      $('#iconoEspera').hide();
      setTimeout(()=>{
        $('#IdError').show();     
      });
    }
  }

  public ngOnInit() {
    $('#iconoEspera').hide();
    if (this.route.snapshot.params.id==1)
    {
      this.headText="Administrador";
    }    
    if (this.route.snapshot.params.id==2)
    {
      this.headText="Investigador";
    }    
    if (this.route.snapshot.params.id==3)
    {
      this.headText="Grupos";
    }    
    if (this.route.snapshot.params.id==4)
    {
      this.headText="Semillero";
    }  
    
    if (this.route.snapshot.params.id==5)
    {
      this.headText="Convocatoria gestión";
    }  
  }

  onClicBoton1(event){  
    if (event.nVentana=="IdError")
            $('#IdError').hide();

  }

  onClicBoton2(event) {

  }

  Salir() {
    this.router.navigate(["/menu"]);  
  }

}
