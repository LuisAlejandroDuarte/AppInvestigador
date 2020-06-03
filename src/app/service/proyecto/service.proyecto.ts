import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from 'src/app/entidad/proyecto/entidad.proyecto';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ProyectoService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getByInve (id:number):Observable<Proyecto[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Proyecto[]>(this.baseUrl + 'proyecto/prSelect.php/?id=' + id + "&accion=selectbyinve");
    }  


    insert (grupoLinea:Proyecto):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'proyecto/prInsert.php',JSON.stringify(grupoLinea), {headers});
    }  

    get (id:number):Observable<Proyecto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Proyecto>(this.baseUrl + 'proyecto/prSelect.php/?id=' + id + "&accion=select");
    }  

    delete (grupoLinea:Proyecto):Observable<Proyecto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Proyecto>(this.baseUrl + 'proyecto/prDelete.php',JSON.stringify(grupoLinea), {headers});
    }  

    update (grupoLinea:Proyecto):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'proyecto/prUpdate.php',JSON.stringify(grupoLinea), {headers});
    }  



}