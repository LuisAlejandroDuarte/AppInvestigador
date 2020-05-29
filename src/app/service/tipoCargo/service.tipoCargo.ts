import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoCargo } from 'src/app/entidad/tipoCargo/entidad.tipoCargo';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class TipoCargoService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getListTipoCargo (tipoCargo:TipoCargo):Observable<TipoCargo[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<TipoCargo[]>(this.baseUrl + 'prTipoCargo.php',JSON.stringify(tipoCargo), {headers});
    }  

}