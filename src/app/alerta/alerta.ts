import {Component,OnInit, Input, Output,EventEmitter, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { Mensaje, Botones } from '../entidad/mensaje/entidad.mensaje';




@Component({
    selector:'app-alerta',
    templateUrl:'./alerta.html',
    styleUrls: ['./alerta.scss']
})

export class AlertaComponent implements OnInit {

   
    @Input() dataAlerta: Mensaje;
    @Output() public boton1 = new EventEmitter<Mensaje>();
    @Output() public boton2 = new EventEmitter<Mensaje>();
   
    @ViewChild('modalAlerta') modalAlert: ElementRef; 
    
    constructor(private render:Renderer2) {

    }
    public ngOnInit()
    {
        
        this.dataAlerta = new Mensaje();
        this.dataAlerta.titulo="";
        this.dataAlerta.itemVentana = "";
        let boton1 = new Botones();
            boton1.visible=false;
            boton1.label=""; 
        let boton2 = new Botones();
            boton2.visible=false;
            boton2.label="";
        this.dataAlerta.botones=[];
       
        this.dataAlerta.botones.push(boton1);
        this.dataAlerta.botones.push(boton2);
    }

    onClicBoton1() {

        this.boton1.emit(this.dataAlerta);
    }

    onClicBoton2() {
        this.boton2.emit(this.dataAlerta);
    }
    
    onChangedMyId(Id: string) {
        this.render.setAttribute(this.modalAlert.nativeElement, 'id' , Id);
    }
}