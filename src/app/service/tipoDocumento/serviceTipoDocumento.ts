import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from 'src/app/entidad/investigador/entidad.investigador';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class TipoDocumentoService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getListTipoDocumento (tipoDocumento:TipoDocumento):Observable<TipoDocumento[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<TipoDocumento[]>(this.baseUrl + 'prTipoDocumento.php',JSON.stringify(tipoDocumento), {headers});
    }  

}