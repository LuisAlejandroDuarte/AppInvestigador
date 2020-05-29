import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoLinea } from 'src/app/entidad/lineagrupo/entidad.lineagrupo';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class GrupoLineaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idGrupo:number):Observable<GrupoLinea[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<GrupoLinea[]>(this.baseUrl + 'grupolinea/prSelect.php/?idGrupo=' + idGrupo + "&accion=all");
    }  


    insert (grupoLinea:GrupoLinea):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'grupolinea/prInsert.php',JSON.stringify(grupoLinea), {headers});
    }  

    get (id:number):Observable<GrupoLinea>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<GrupoLinea>(this.baseUrl + 'grupolinea/prSelect.php/?id=' + id + "&accion=select");
    }  

    update (grupoLinea:GrupoLinea):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'grupolinea/prUpdate.php',JSON.stringify(grupoLinea), {headers});
    }  

}