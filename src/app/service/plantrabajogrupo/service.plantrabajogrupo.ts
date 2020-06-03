import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanTrabajoGrupo } from 'src/app/entidad/plantrabajogrupo/entidad.plantrabajogrupo';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class PlanTrabajoGrupoService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idGrupo:number):Observable<PlanTrabajoGrupo[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<PlanTrabajoGrupo[]>(this.baseUrl + 'plantrabajogrupo/prSelect.php/?idGrupo=' + idGrupo + "&accion=all");
    }  


    insert (grupoLinea:PlanTrabajoGrupo):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'plantrabajogrupo/prInsert.php',JSON.stringify(grupoLinea), {headers});
    }  

    get (id:number):Observable<PlanTrabajoGrupo>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<PlanTrabajoGrupo>(this.baseUrl + 'plantrabajogrupo/prSelect.php/?id=' + id + "&accion=select");
    }  

    delete (grupoLinea:PlanTrabajoGrupo):Observable<PlanTrabajoGrupo>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<PlanTrabajoGrupo>(this.baseUrl + 'plantrabajogrupo/prDelete.php',JSON.stringify(grupoLinea), {headers});
    }  

    update (grupoLinea:PlanTrabajoGrupo):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'plantrabajogrupo/prUpdate.php',JSON.stringify(grupoLinea), {headers});
    }
    
    insertFile(data:FormData) {
      let headers = new HttpHeaders(); 
      headers = headers.set('Content-Type', 'undefined');
      headers = headers.set('Accept', 'application/json');

      return this.http.post<any>(this.baseUrl + 'plantrabajogrupo/prFile.php',data);
    }

    getFile (path:PlanTrabajoGrupo):Observable<string>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<string>(this.baseUrl + 'plantrabajogrupo/prGetFile.php',JSON.stringify(path), {headers});
    } 


}