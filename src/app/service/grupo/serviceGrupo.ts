import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from 'src/app/entidad/grupo/entidad.grupo';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class GrupoService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (grupo:Grupo):Observable<any[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any[]>(this.baseUrl + 'grupo/prSelect.php',JSON.stringify(grupo), {headers});
    }  

      
    byInve (grupo:Grupo):Observable<any[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any[]>(this.baseUrl + 'grupo/prSelect.php',JSON.stringify(grupo), {headers});
    }  

    insert (grupo:Grupo):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'grupo/prInsert.php',JSON.stringify(grupo), {headers});
    }  

    get (grupo:Grupo):Observable<Grupo>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Grupo>(this.baseUrl + 'grupo/prSelect.php',JSON.stringify(grupo), {headers});
    }  

    update (grupo:Grupo):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'grupo/prUpdate.php',JSON.stringify(grupo), {headers});
    }  

    delete (grupo:Grupo):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'grupo/prDelete.php',JSON.stringify(grupo), {headers});
    }  

}