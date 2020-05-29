import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NivelFormacion } from 'src/app/entidad/nivelFormacion/nivelformacion';
import { NivelFormacionInvestigador } from 'src/app/entidad/nivelInvestigador/nivelInvestigador';



@Injectable()
export class ServiceNivelFormacionInvestigador {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    set (nivelFormacionInvestigador:NivelFormacionInvestigador[]):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'prNivelFormacionInvestigador.php',JSON.stringify(nivelFormacionInvestigador), {headers});
    }  


    get (id:number):Observable<NivelFormacionInvestigador[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<any>(this.baseUrl + 'prNivelFormacionInvestigador.php/?id=' + id);
    }  

    delete (nivel:NivelFormacionInvestigador):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'prDeleteNivel.php',JSON.stringify(nivel),{headers});
    }  

}