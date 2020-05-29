import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from 'src/app/entidad/area/entidad.area';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class AreaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (area:Area):Observable<Area[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Area[]>(this.baseUrl + 'area/prSelect.php',JSON.stringify(area), {headers});
    }  

}