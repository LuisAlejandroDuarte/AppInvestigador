import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoProducto } from 'src/app/entidad/estadoproducto/entidad.estadoproducto';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class EstadoProductoService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getAll ():Observable<EstadoProducto[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<EstadoProducto[]>(this.baseUrl + 'estadoproducto/prSelect.php/?accion=all');
    }  


    insert (grupoLinea:EstadoProducto):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'estadoproducto/prInsert.php',JSON.stringify(grupoLinea), {headers});
    }  

    get (id:number):Observable<EstadoProducto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<EstadoProducto>(this.baseUrl + 'estadoproducto/prSelect.php/?id=' + id + "&accion=select");
    }  

    delete (grupoLinea:EstadoProducto):Observable<EstadoProducto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<EstadoProducto>(this.baseUrl + 'estadoproducto/prDelete.php',JSON.stringify(grupoLinea), {headers});
    }  

    update (grupoLinea:EstadoProducto):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'estadoproducto/prUpdate.php',JSON.stringify(grupoLinea), {headers});
    }  



}