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
    
    getALL (semillero:Semillero):Observable<Semillero[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Semillero[]>(this.baseUrl + 'semillero/prSelect.php',JSON.stringify(semillero), {headers});
    }  

}