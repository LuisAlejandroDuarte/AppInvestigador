import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoProyecto } from 'src/app/entidad/estadoproyecto/entidad.estadoproyecto';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class EstadoProyectoService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getAll ():Observable<EstadoProyecto[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<EstadoProyecto[]>(this.baseUrl + 'estadoproyecto/prSelect.php/?accion=all');
    }  


    insert (grupoLinea:EstadoProyecto):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'estadoproyecto/prInsert.php',JSON.stringify(grupoLinea), {headers});
    }  

    get (id:number):Observable<EstadoProyecto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<EstadoProyecto>(this.baseUrl + 'estadoproyecto/prSelect.php/?id=' + id + "&accion=select");
    }  

    delete (grupoLinea:EstadoProyecto):Observable<EstadoProyecto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<EstadoProyecto>(this.baseUrl + 'estadoproyecto/prDelete.php',JSON.stringify(grupoLinea), {headers});
    }  

    update (grupoLinea:EstadoProyecto):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'estadoproyecto/prUpdate.php',JSON.stringify(grupoLinea), {headers});
    }  



}