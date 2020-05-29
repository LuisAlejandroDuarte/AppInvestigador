import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../entidad/usuario/entidad.usuario';
import { TipoDocumento, Investigador } from '../../entidad/investigador/entidad.investigador';


const httpOptions = {  
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

  const httpImage = {   
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data'})
  };

@Injectable()
export class InvestigadorService {
    baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}

    getValidar(usuario:Usuario) : Observable<Usuario>{
                   
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<Usuario>(this.baseUrl + 'prInvestigador.php',JSON.stringify(usuario), {headers});
    }

    getTipoDocumento (tipo:TipoDocumento):Observable<TipoDocumento[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<TipoDocumento[]>(this.baseUrl + 'prInvestigador.php',JSON.stringify(tipo), {headers});
    }

    getInvestigador(investigador:Investigador) : Observable<any>{                   
       return this.http.post<any>(this.baseUrl + 'prInvestigador.php',JSON.stringify(investigador), httpOptions);
     }  

     getAll(investigador:Investigador) : Observable<Investigador[]>{                   
      return this.http.post<Investigador[]>(this.baseUrl + 'prInvestigador.php',JSON.stringify(investigador), httpOptions);
    }  

     setInvestigador(investigador:Investigador) {                   
      return this.http.post(this.baseUrl + 'prInvestigador.php',JSON.stringify(investigador), httpOptions);
    }  

    insertFoto(data:FormData) {
      let headers = new HttpHeaders(); 
      headers = headers.set('Content-Type', 'undefined');
      headers = headers.set('Accept', 'application/json');

      return this.http.post<any>(this.baseUrl + 'prFotoInvestigador.php',data);
    }

    getFoto(investigador:Investigador)
    {
      return this.http.post<any>(this.baseUrl + 'prInvestigador.php',JSON.stringify(investigador));
    }

}