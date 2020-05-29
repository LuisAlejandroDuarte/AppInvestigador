import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class LoginService {

    @Output() change: EventEmitter<string> = new EventEmitter();



    changeTipo(tipo:number)
    {
        switch (tipo) {
            case 1:
                this.change.emit("Administrador");            
                break;
            case 2:
                this.change.emit("Convocatoria");                
                break;

            default:
                break;
        }
    }

}