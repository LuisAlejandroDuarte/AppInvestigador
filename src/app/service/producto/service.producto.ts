import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/entidad/producto/entidad.producto';




const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ProductoService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getByProyecto (id:number):Observable<Producto[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Producto[]>(this.baseUrl + 'producto/prSelect.php/?id=' + id + "&accion=selectbyproyecto");
    }  


    insert (grupoLinea:Producto):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'proyecto/prInsert.php',JSON.stringify(grupoLinea), {headers});
    }  

    get (id:number):Observable<Producto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Producto>(this.baseUrl + 'proyecto/prSelect.php/?id=' + id + "&accion=select");
    }  

    delete (grupoLinea:Producto):Observable<Producto>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Producto>(this.baseUrl + 'proyecto/prDelete.php',JSON.stringify(grupoLinea), {headers});
    }  

    update (grupoLinea:Producto):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'proyecto/prUpdate.php',JSON.stringify(grupoLinea), {headers});
    }  



}