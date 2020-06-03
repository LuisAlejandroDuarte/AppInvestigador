import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoProyecto } from 'src/app/entidad/grupoproyecto/grupoproyecto';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ServiceGrupoProyecto {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idGrupo:number):Observable<GrupoProyecto[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<GrupoProyecto[]>(this.baseUrl + 'grupoproyecto/prSelect.php/?idGrupo=' + idGrupo + "&accion=all");
    }  


    insert (grupoproyecto:GrupoProyecto):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'grupoproyecto/prInsert.php',JSON.stringify(grupoproyecto), {headers});
    }  

    get (id:number):Observable<GrupoProyecto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<GrupoProyecto>(this.baseUrl + 'grupoproyecto/prSelect.php/?id=' + id + '&accion=select');
    }  

    delete (grupoproyecto:GrupoProyecto):Observable<GrupoProyecto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<GrupoProyecto>(this.baseUrl + 'grupoproyecto/prDelete.php',JSON.stringify(grupoproyecto), {headers});
    }  

    update (grupoproyecto:GrupoProyecto):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'grupoproyecto/prUpdate.php',JSON.stringify(grupoproyecto), {headers});
    }  



}