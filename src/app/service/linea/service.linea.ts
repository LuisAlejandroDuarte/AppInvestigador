import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Linea } from 'src/app/entidad/linea/entidad.linea';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class LineaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL ():Observable<Linea[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Linea[]>(this.baseUrl + 'linea/prSelect.php/?Accion=ALL');
    }  

}