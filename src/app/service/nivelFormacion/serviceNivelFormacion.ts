import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NivelFormacion } from 'src/app/entidad/nivelFormacion/nivelformacion';



@Injectable()
export class ServiceNivelFormacion {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getList ():Observable<NivelFormacion[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json'); 
      let get:string="LISTA"; 
      return this.http.get<NivelFormacion[]>(this.baseUrl + 'prNivelFormacion.php/?ACCION=list');
    }  

}