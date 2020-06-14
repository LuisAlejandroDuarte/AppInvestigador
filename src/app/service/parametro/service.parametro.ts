import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametro } from 'src/app/entidad/parametro/entidad.parametro';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ParametroService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}    
    getALL ():Observable<Parametro[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Parametro[]>(this.baseUrl + 'parametro/prSelect.php/?accion=ALL');
    }  


    insert (parametro:Parametro):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'parametro/prInsert.php',JSON.stringify(parametro), {headers});
    }  

    get (id:number):Observable<Parametro>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Parametro>(this.baseUrl + 'parametro/prSelect.php?accion=SELECT&id=' + id);
    }  

    update (parametro:Parametro):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'parametro/prUpdate.php',JSON.stringify(parametro), {headers});
    }  

    delete (parametro:Parametro):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'parametro/prDelete.php',JSON.stringify(parametro), {headers});
    }  

      
 

}