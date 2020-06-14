import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Semillero } from 'src/app/entidad/semillero/entidad.semillero';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class SemilleroService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL ():Observable<Semillero[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Semillero[]>(this.baseUrl + 'semillero/prSelect.php/?accion=all');
    }  


    insert (semillero:Semillero):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'semillero/prInsert.php',JSON.stringify(semillero), {headers});
    }  

    get (id:number):Observable<Semillero>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Semillero>(this.baseUrl + 'semillero/prSelect.php/?id=' + id + '&accion=select');
    }  

    delete (semillero:Semillero):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'semillero/prDelete.php',JSON.stringify(semillero), {headers});
    }  

    update (semillero:Semillero):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'semillero/prUpdate.php',JSON.stringify(semillero), {headers});
    }  

}