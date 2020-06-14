import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SemilleroDocumento } from 'src/app/entidad/semillerodocumento/entidad.semillerodocumento';




const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ServiceSemilleroDocumento {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idSemillero:number):Observable<SemilleroDocumento[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroDocumento[]>(this.baseUrl + 'semillerodocumento/prSelect.php/?idSemillero=' + idSemillero + "&accion=all");
    }  


    insert (semillerodocumento:SemilleroDocumento):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'semillerodocumento/prInsert.php',JSON.stringify(semillerodocumento), {headers});
    }  

    get (id:number):Observable<SemilleroDocumento>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroDocumento>(this.baseUrl + 'semillerodocumento/prSelect.php/?id=' + id + "&accion=select");
    }  

    delete (semillerodocumento:SemilleroDocumento):Observable<SemilleroDocumento>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<SemilleroDocumento>(this.baseUrl + 'semillerodocumento/prDelete.php',JSON.stringify(semillerodocumento), {headers});
    }  

    update (semillerodocumento:SemilleroDocumento):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'semillerodocumento/prUpdate.php',JSON.stringify(semillerodocumento), {headers});
    }
    
    insertFile(data:FormData) {
      let headers = new HttpHeaders(); 
      headers = headers.set('Content-Type', 'undefined');
      headers = headers.set('Accept', 'application/json');

      return this.http.post<any>(this.baseUrl + 'semillerodocumento/prFile.php',data);
    }

    getFile (path:SemilleroDocumento):Observable<string>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<string>(this.baseUrl + 'semillerodocumento/prGetFile.php',JSON.stringify(path), {headers});
    } 


}