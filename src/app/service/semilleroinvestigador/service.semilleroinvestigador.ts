import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SemilleroInvestigador } from 'src/app/entidad/semilleroinvestigador/entidad.semilleroinvestigador';





const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class SemilleroInvestigadorService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idSemillero:number):Observable<SemilleroInvestigador[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroInvestigador[]>(this.baseUrl + 'semilleroinvestigador/prSelect.php/?idSemillero=' + idSemillero + "&accion=all");
    }  


    insert (semilleroinvestigador:SemilleroInvestigador):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'semilleroinvestigador/prInsert.php',JSON.stringify(semilleroinvestigador), {headers});
    }  

    get (id:number):Observable<SemilleroInvestigador>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<SemilleroInvestigador>(this.baseUrl + 'semilleroinvestigador/prSelect.php/?id=' + id + '&accion=select');
    }  

    delete (semilleroinvestigador:SemilleroInvestigador):Observable<SemilleroInvestigador>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<SemilleroInvestigador>(this.baseUrl + 'semilleroinvestigador/prDelete.php',JSON.stringify(semilleroinvestigador), {headers});
    }  

    update (semilleroinvestigador:SemilleroInvestigador):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'semilleroinvestigador/prUpdate.php',JSON.stringify(semilleroinvestigador), {headers});
    }  



}