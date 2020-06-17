import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Juez } from 'src/app/entidad/juez/entidad.juez';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class JuezService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (juez:Juez):Observable<any[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any[]>(this.baseUrl + 'juez/prSelect.php',JSON.stringify(juez), {headers});
    }  

      
 

    insert (juez:Juez[]):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'juez/prInsert.php',JSON.stringify(juez), {headers});
    }  

    get (juez:Juez):Observable<Juez>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Juez>(this.baseUrl + 'juez/prSelect.php',JSON.stringify(juez), {headers});
    }  

    update (juez:Juez):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'juez/prUpdate.php',JSON.stringify(juez), {headers});
    }  

    delete (juez:Juez):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'juez/prDelete.php',JSON.stringify(juez), {headers});
    }  

}