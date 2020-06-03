import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SemilleroGrupo } from 'src/app/entidad/semillerogrupo/entidad.semillerogrupo';





const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ServiceGrupoSemillero {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idGrupo:number):Observable<SemilleroGrupo[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroGrupo[]>(this.baseUrl + 'gruposemillero/prSelect.php/?idGrupo=' + idGrupo + "&accion=all");
    }  


    insert (gruposemillero:SemilleroGrupo):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'gruposemillero/prInsert.php',JSON.stringify(gruposemillero), {headers});
    }  

    get (id:number):Observable<SemilleroGrupo>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroGrupo>(this.baseUrl + 'gruposemillero/prSelect.php/?id=' + id + '&accion=select');
    }  

    delete (gruposemillero:SemilleroGrupo):Observable<SemilleroGrupo>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<SemilleroGrupo>(this.baseUrl + 'gruposemillero/prDelete.php',JSON.stringify(gruposemillero), {headers});
    }  

    update (gruposemillero:SemilleroGrupo):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'gruposemillero/prUpdate.php',JSON.stringify(gruposemillero), {headers});
    }  



}