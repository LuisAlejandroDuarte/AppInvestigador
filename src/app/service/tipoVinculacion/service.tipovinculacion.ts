import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoVinculacion } from 'src/app/entidad/tipoVinculacion/entidad.tipovinculacion';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class TipoVinculacionService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL ():Observable<TipoVinculacion[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<TipoVinculacion[]>(this.baseUrl + 'tipovinculacion/prSelect.php/?accion=all');
    }  


    insert (grupoLinea:TipoVinculacion):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'tipovinculacion/prInsert.php',JSON.stringify(grupoLinea), {headers});
    }  

    get (id:number):Observable<TipoVinculacion>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<TipoVinculacion>(this.baseUrl + 'tipovinculacion/prSelect.php/?id=' + id + "&accion=select");
    }  

    delete (grupoLinea:TipoVinculacion):Observable<TipoVinculacion>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<TipoVinculacion>(this.baseUrl + 'tipovinculacion/prDelete.php',JSON.stringify(grupoLinea), {headers});
    }  

    update (grupoLinea:TipoVinculacion):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'tipovinculacion/prUpdate.php',JSON.stringify(grupoLinea), {headers});
    }  



}