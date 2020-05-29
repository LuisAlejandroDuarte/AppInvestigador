import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Centro } from 'src/app/entidad/centro/entidad.centro';
import { Zona } from 'src/app/entidad/zona/entidad.zona';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ZonaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getZonaByCentro (centro:Centro):Observable<Zona>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Zona>(this.baseUrl + 'prZona.php',JSON.stringify(centro), {headers});
    }  

}