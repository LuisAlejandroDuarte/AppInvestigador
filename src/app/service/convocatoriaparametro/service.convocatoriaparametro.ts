import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConvocatoriaParametro } from 'src/app/entidad/convocatoriaparametro/entidad.convocatoriaparametro';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ConvocatoriaParametroService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}    
    getALL (idConvocatoria:number):Observable<ConvocatoriaParametro[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<ConvocatoriaParametro[]>(this.baseUrl + 'convocatoriaparametro/prSelect.php/?accion=ALL&idConvocatoria=' + idConvocatoria);
    }  


    insert (convocatoriaparametro:ConvocatoriaParametro[]):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'convocatoriaparametro/prInsert.php',JSON.stringify(convocatoriaparametro), {headers});
    }  

    get (id:number):Observable<ConvocatoriaParametro>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<ConvocatoriaParametro>(this.baseUrl + 'convocatoriaparametro/prSelect.php?accion=SELECT&id=' + id);
    }  

    update (convocatoriaparametro:ConvocatoriaParametro):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'convocatoriaparametro/prUpdate.php',JSON.stringify(convocatoriaparametro), {headers});
    }  

    delete (convocatoriaparametro:ConvocatoriaParametro):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'convocatoriaparametro/prDelete.php',JSON.stringify(convocatoriaparametro), {headers});
    }  

      
 

}