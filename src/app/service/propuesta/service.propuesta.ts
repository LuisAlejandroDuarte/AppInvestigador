import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Propuesta, PropuestaInvestigador } from 'src/app/entidad/propuesta/entidad.propuesta';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };
  

@Injectable()
export class PropouestaService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}    
    getByInvestigador (idinvestigador:number):Observable<Propuesta[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Propuesta[]>(this.baseUrl + 'propuesta/prSelect.php/?accion=ALL&idinvestigador=' + idinvestigador);
    }  

    getByconvocatoria (idConvocatoria:number):Observable<Propuesta[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Propuesta[]>(this.baseUrl + 'propuesta/prSelect.php/?accion=ByConvocatoria&idConvocatoria=' + idConvocatoria);
    }  


    insert (propuesta:Propuesta):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'propuesta/prInsert.php',JSON.stringify(propuesta), {headers});
    }  

    insertInvestigador (propuesta:PropuestaInvestigador[]):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'propuesta/prInsertInvestigador.php',JSON.stringify(propuesta), {headers});
    }  

    

    get (id:number):Observable<Propuesta>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<Propuesta>(this.baseUrl + 'propuesta/prSelect.php/?accion=SELECT&id=' + id);
    }  

    getPropuestaInvestigador (id:number):Observable<PropuestaInvestigador[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<PropuestaInvestigador[]>(this.baseUrl + 'propuesta/prSelect.php/?accion=PropuestaInvestigador&idPropuesta=' + id);
    }  

    getInvestigadorByPropuesta (id:number):Observable<PropuestaInvestigador[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<PropuestaInvestigador[]>(this.baseUrl + 'propuesta/prSelect.php/?accion=InvestigadorByPropuesta&idPropuesta=' + id);
    }  

    

    update (propuesta:Propuesta):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'propuesta/prUpdate.php',JSON.stringify(propuesta), {headers});
    }  

    delete (propuesta:Propuesta):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'propuesta/prDelete.php',JSON.stringify(propuesta), {headers});
    }  

    deleteInvestigador (propuesta:PropuestaInvestigador):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'propuesta/prDeletePropuestaInvestigador.php',JSON.stringify(propuesta), {headers});
    }  

      

    insertDocumentoFile(data:FormData) {
      let headers = new HttpHeaders(); 
      headers = headers.set('Content-Type', 'undefined');
      headers = headers.set('Accept', 'application/json');

      return this.http.post<any>(this.baseUrl + 'propuesta/prDocumentoFile.php',data);
    }

    getDocumentoFile (path:Propuesta):Observable<string>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<string>(this.baseUrl + 'propuesta/prDocumentoGetFile.php',JSON.stringify(path), {headers});
    } 


    insertCartaFile(data:FormData) {
      let headers = new HttpHeaders(); 
      headers = headers.set('Content-Type', 'undefined');
      headers = headers.set('Accept', 'application/json');

      return this.http.post<any>(this.baseUrl + 'propuesta/prCartaFile.php',data);
    }

    getCartaFile (path:Propuesta):Observable<string>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<string>(this.baseUrl + 'propuesta/prCartaGetFile.php',JSON.stringify(path), {headers});
    } 

}