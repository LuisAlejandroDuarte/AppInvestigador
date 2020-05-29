import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/entidad/usuario/entidad.usuario';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class UsuarioService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getUsuario (usuario:Usuario):Observable<Usuario>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Usuario>(this.baseUrl + 'prUsuario.php',JSON.stringify(usuario), {headers});
    }  

}