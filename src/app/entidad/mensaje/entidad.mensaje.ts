enum Tema {
    primary=0,
    accent=1,
    warn=2
}
export enum  TipoMensaje {
    Informacion=0,
    Advertencia=1,
    Error=2,
    CondicionSINO=3

}

export class Botones {
    label:string;
    tema: Tema;
    visible:boolean;
}

export class Mensaje
{
    id:number;
    itemVentana:string;
    titulo:String;
    nVentana:string;
    cuerpo:string;
    pie:String;
    tipo:TipoMensaje;
    botones:Botones[];

    
    constructor  (mensaje?:Mensaje)
    { 

        if (mensaje==null)
        {
            this.id = 0;
            this.titulo="";
            this.nVentana="iVentana";
            this.cuerpo="";
            this.pie="";
            this.tipo=TipoMensaje.Advertencia;
            this.botones= new Array(2); 
            this.botones[0] = new Botones;  
            this.botones[0].label="Aceptar";
            this.botones[0].visible=true;

            this.botones[1] = new Botones();            
           this.botones[1].visible=false;
        }
        else
        {

            switch(mensaje.tipo)
            {
                case TipoMensaje.Advertencia: {
                    mensaje.botones= new Array(2);
                    mensaje.botones[0] = new Botones();                    
                    mensaje.botones[0].label="Aceptar";
                    mensaje.botones[0].visible =true;  

                    mensaje.botones[1] = new Botones();             
                    mensaje.botones[1].label="";
                    mensaje.botones[1].visible =false;               
                    break;    
                }
                case TipoMensaje.Error: {
                    mensaje.botones= new Array(2);
                    mensaje.botones[0] = new Botones();                    
                    mensaje.botones[0].label="Aceptar";
                    mensaje.botones[0].visible =true;

                    mensaje.botones[1] = new Botones();                    
                    mensaje.botones[1].label="";
                    mensaje.botones[1].visible =false;    
                    
                    break;
                }

                case TipoMensaje.Informacion :
                {
                    mensaje.botones= new Array(2);
                    mensaje.botones[0] = new Botones();      
                    mensaje.botones[0].label="Aceptar";
                    mensaje.botones[0].visible =true;

                    mensaje.botones[1] = new Botones();                    
                    mensaje.botones[1].label="";
                    mensaje.botones[1].visible =false;    

                    break;
                }

                case TipoMensaje.CondicionSINO :
                {
                    mensaje.botones= new Array(2);

                    mensaje.botones[0] = new Botones();     
                    mensaje.botones[0].label="Si";
                    mensaje.botones[0].visible =true;

                    mensaje.botones[1] = new Botones();     
                    mensaje.botones[1].label="No";
                    mensaje.botones[1].visible =true;
                    break;
                }

            }

            this.id = mensaje.id;
            this.titulo=mensaje.titulo;
            this.nVentana=mensaje.nVentana;
            this.cuerpo=mensaje.cuerpo;
            this.pie=mensaje.pie;
            this.tipo=mensaje.tipo;
            this.botones=mensaje.botones;
        }
     }
}

