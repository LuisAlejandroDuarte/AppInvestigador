import { Injectable, Output, EventEmitter } from "@angular/core";


@Injectable()
export class NavMenuService {
  isLogueado = false;
 
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  loguearse() {
    this.isLogueado =(localStorage.getItem("logueado")=="0")? false:true;
    this.change.emit(this.isLogueado);
  }
}