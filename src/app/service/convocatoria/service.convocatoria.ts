import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Convocatoria } from 'src/app/entidad/convocatoria/entidad.convocatoria';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ConvocatoriaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}    
    getALL ():Observable<Convocatoria[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Convocatoria[]>(this.baseUrl + 'convocatoria/prSelect.php/?accion=ALL');
    }  


    insert (convocatoria:Convocatoria):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'convocatoria/prInsert.php',JSON.stringify(convocatoria), {headers});
    }  

    get (id:number):Observable<Convocatoria>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Convocatoria>(this.baseUrl + 'convocatoria/prSelect.php?accion=SELECT&id=' + id);
    }  

    update (convocatoria:Convocatoria):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'convocatoria/prUpdate.php',JSON.stringify(convocatoria), {headers});
    }  

    delete (convocatoria:Convocatoria):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'convocatoria/prDelete.php',JSON.stringify(convocatoria), {headers});
    }  

      
    insertTextoFile(data:FormData) {
      let headers = new HttpHeaders(); 
      headers = headers.set('Content-Type', 'undefined');
      headers = headers.set('Accept', 'application/json');

      return this.http.post<any>(this.baseUrl + 'convocatoria/prTextoFile.php',data);
    }

    getTextoFile (path:Convocatoria):Observable<string>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<string>(this.baseUrl + 'convocatoria/prTextoGetFile.php',JSON.stringify(path), {headers});
    } 


    insertResoFile(data:FormData) {
      let headers = new HttpHeaders(); 
      headers = headers.set('Content-Type', 'undefined');
      headers = headers.set('Accept', 'application/json');

      return this.http.post<any>(this.baseUrl + 'convocatoria/prResoFile.php',data);
    }

    getResoFile (path:Convocatoria):Observable<string>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<string>(this.baseUrl + 'convocatoria/prResoGetFile.php',JSON.stringify(path), {headers});
    } 

}