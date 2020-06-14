import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SemilleroLinea } from 'src/app/entidad/semillerolinea/entidad.semillerolinea';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class SemilleroLineaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idSemillero:number):Observable<SemilleroLinea[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroLinea[]>(this.baseUrl + 'semillerolinea/prSelect.php/?idSemillero=' + idSemillero + "&accion=all");
    }  


    insert (semilleroLinea:SemilleroLinea):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'semillerolinea/prInsert.php',JSON.stringify(semilleroLinea), {headers});
    }  

    get (id:number):Observable<SemilleroLinea>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroLinea>(this.baseUrl + 'semillerolinea/prSelect.php/?id=' + id + "&accion=select");
    }  

    delete (semilleroLinea:SemilleroLinea):Observable<SemilleroLinea>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<SemilleroLinea>(this.baseUrl + 'semillerolinea/prDelete.php',JSON.stringify(semilleroLinea), {headers});
    }  

    update (semilleroLinea:SemilleroLinea):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'semillerolinea/prUpdate.php',JSON.stringify(semilleroLinea), {headers});
    }  



}