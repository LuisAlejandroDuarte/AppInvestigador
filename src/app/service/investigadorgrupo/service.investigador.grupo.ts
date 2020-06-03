import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvestigadorGrupo } from 'src/app/entidad/investigadorGrupo/investigadorGrupo';




const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class GrupoInvestigadorService {
  baseUrl =environment.apiUrl;
    constructor(
        public http: HttpClient
    ){}
    
    getALL (idGrupo:number):Observable<InvestigadorGrupo[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<InvestigadorGrupo[]>(this.baseUrl + 'grupoinvestigador/prSelect.php/?idGrupo=' + idGrupo + "&accion=all");
    }  


    insert (grupoinvestigador:InvestigadorGrupo):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<any>(this.baseUrl + 'grupoinvestigador/prInsert.php',JSON.stringify(grupoinvestigador), {headers});
    }  

    get (id:number):Observable<InvestigadorGrupo>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.get<InvestigadorGrupo>(this.baseUrl + 'grupoinvestigador/prSelect.php/?id=' + id + '&accion=select');
    }  

    delete (grupoinvestigador:InvestigadorGrupo):Observable<InvestigadorGrupo>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<InvestigadorGrupo>(this.baseUrl + 'grupoinvestigador/prDelete.php',JSON.stringify(grupoinvestigador), {headers});
    }  

    update (grupoinvestigador:InvestigadorGrupo):Observable<boolean>{
      const headers = new HttpHeaders().set('content-type', 'application/json');  
      return this.http.post<boolean>(this.baseUrl + 'grupoinvestigador/prUpdate.php',JSON.stringify(grupoinvestigador), {headers});
    }  



}