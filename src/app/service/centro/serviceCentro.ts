import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Centro } from 'src/app/entidad/centro/entidad.centro';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class CentroService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getListCentro (centro:Centro):Observable<Centro[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Centro[]>(this.baseUrl + 'prCentro.php',JSON.stringify(centro), {headers});
    }  

}