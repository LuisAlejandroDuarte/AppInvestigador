import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoConvocatoria } from 'src/app/entidad/tipoconvocatoria/entidad.tipoconvocatoria';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class TipoConvocatoriaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}    
    getALL ():Observable<TipoConvocatoria[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<TipoConvocatoria[]>(this.baseUrl + 'tipoconvocatoria/prSelect.php/?accion=ALL');
    }  


    insert (tipoconvocatoria:TipoConvocatoria):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'tipoconvocatoria/prInsert.php',JSON.stringify(tipoconvocatoria), {headers});
    }  

    get (id:number):Observable<TipoConvocatoria>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<TipoConvocatoria>(this.baseUrl + 'tipoconvocatoria/prSelect.php?accion=SELECT&id=' + id);
    }  

    update (tipoconvocatoria:TipoConvocatoria):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'tipoconvocatoria/prUpdate.php',JSON.stringify(tipoconvocatoria), {headers});
    }  

    delete (tipoconvocatoria:TipoConvocatoria):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'tipoconvocatoria/prDelete.php',JSON.stringify(tipoconvocatoria), {headers});
    }  

}