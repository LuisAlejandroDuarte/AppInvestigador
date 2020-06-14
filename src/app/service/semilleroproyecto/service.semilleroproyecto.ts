import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SemilleroProyectoProducto } from 'src/app/entidad/semilleroproyecto/entidad.semilleroproyecto';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ServiceSemilleroProyectoProducto {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idSemillero:number):Observable<SemilleroProyectoProducto[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroProyectoProducto[]>(this.baseUrl + 'semilleroproyecto/prSelect.php/?idSemillero=' + idSemillero + "&accion=all");
    }  


    insert (semilleroproyecto:SemilleroProyectoProducto):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'semilleroproyecto/prInsert.php',JSON.stringify(semilleroproyecto), {headers});
    }  

    get (id:number):Observable<SemilleroProyectoProducto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroProyectoProducto>(this.baseUrl + 'semilleroproyecto/prSelect.php/?id=' + id + '&accion=select');
    }  

    delete (semilleroproyecto:SemilleroProyectoProducto):Observable<SemilleroProyectoProducto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<SemilleroProyectoProducto>(this.baseUrl + 'semilleroproyecto/prDelete.php',JSON.stringify(semilleroproyecto), {headers});
    }  

    update (semilleroproyecto:SemilleroProyectoProducto):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'semilleroproyecto/prUpdate.php',JSON.stringify(semilleroproyecto), {headers});
    }  



}