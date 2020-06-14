import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProgramaAcademicoSemillero } from 'src/app/entidad/proacasemillero/entidad.proacasemillero';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ServiceSemilleroPrograma {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idSemillero:number):Observable<ProgramaAcademicoSemillero[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<ProgramaAcademicoSemillero[]>(this.baseUrl + 'semilleroprograma/prSelect.php/?idSemillero=' + idSemillero + "&accion=all");
    }  


    insert (semilleroprograma:ProgramaAcademicoSemillero):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'semilleroprograma/prInsert.php',JSON.stringify(semilleroprograma), {headers});
    }  

    get (id:number):Observable<ProgramaAcademicoSemillero>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<ProgramaAcademicoSemillero>(this.baseUrl + 'semilleroprograma/prSelect.php/?id=' + id + '&accion=select');
    }  

    delete (semilleroprograma:ProgramaAcademicoSemillero):Observable<ProgramaAcademicoSemillero>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<ProgramaAcademicoSemillero>(this.baseUrl + 'semilleroprograma/prDelete.php',JSON.stringify(semilleroprograma), {headers});
    }  

    update (semilleroprograma:ProgramaAcademicoSemillero):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'semilleroprograma/prUpdate.php',JSON.stringify(semilleroprograma), {headers});
    }  



}