import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from '../login/service';
import { logueado } from '../entidad/usuario/entidad.usuario';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router:Router,private loginservice:LoginService
    


  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {



    if (localStorage.getItem("user")!=null)
    {
      let user:logueado =JSON.parse(localStorage.getItem("user"));

      if (state.url=="/administrar/1" && user.use_cod_tipo==1){
        localStorage.removeItem("user");
        this.router.navigate(['/login',1]);        
        return false;
      }
      if (state.url=="/investigador/0" && user.use_cod_tipo==0){
        localStorage.removeItem("user");
        this.router.navigate(['/login',2]);        
        return false;
      }
      
      if (state.url=="/grupo/0" && user.use_cod_tipo==0){
        localStorage.removeItem("user");
        this.router.navigate(['/login',3]);        
        return false;
      }

      if (state.url=="/semillero/0" && user.use_cod_tipo==0){
        localStorage.removeItem("user");
        this.router.navigate(['/login',4]);        
        return false;
      }

      return true;
      
    }
    else{
     
   
      if (state.url=="/administrar/1"){
        this.router.navigate(['/login',1]);        
      }
      if (state.url=="/investigador/0"){
        this.router.navigate(['/login',2]);        
      }  
      if (state.url=="/grupo/0"){
        this.router.navigate(['/login',3]);        
      }  
      if (state.url=="/semillero/0"){
        this.router.navigate(['/login',4]);        
      }  
      return false;
    }
  }
}
