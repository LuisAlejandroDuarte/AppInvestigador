import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Programa } from 'src/app/entidad/programa/entidad.programa';
import { Escuela } from 'src/app/entidad/escuela/entidad.escuela';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class EscuelaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getListEscuelaByPrograma (programa:Programa):Observable<Escuela[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Escuela[]>(this.baseUrl + 'prEscuela.php',JSON.stringify(programa), {headers});
    }  

}