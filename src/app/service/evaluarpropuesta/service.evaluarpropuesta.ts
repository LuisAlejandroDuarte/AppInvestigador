import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EvaluarPropuesta } from 'src/app/entidad/evaluarpropuesta/entidad.evaluarpropuesta';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class EvaluarPropuestaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getAll (idInvestigador:number):Observable<EvaluarPropuesta[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<EvaluarPropuesta[]>(this.baseUrl + 'evaluarpropuesta/prSelect.php/?accion=all&idInvestigador=' + idInvestigador);
    }  
  
    get(id:number):Observable<EvaluarPropuesta>{
        const headers = new HttpHeaders().set('content-type', 'application/json');  
        return this.http.get<EvaluarPropuesta>(this.baseUrl + 'evaluarpropuesta/prSelect.php/?accion=select&id=' + id);
      }  
    


    update (evaluadorPropuesta:EvaluarPropuesta):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'evaluarpropuesta/prUpdate.php',JSON.stringify(evaluadorPropuesta), {headers});
    }  


    insertFile(data:FormData) {
        let headers = new HttpHeaders(); 
        headers = headers.set('Content-Type', 'undefined');
        headers = headers.set('Accept', 'application/json');
  
        return this.http.post<any>(this.baseUrl + 'evaluarpropuesta/prFile.php',data);
      }
  
      getFile (path:EvaluarPropuesta):Observable<string>{
        const headers = new HttpHeaders().set('content-type', 'application/json');  
        return this.http.post<string>(this.baseUrl + 'evaluarpropuesta/prGetFile.php',JSON.stringify(path), {headers});
      } 



}