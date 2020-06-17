export class Propuesta
{
    PRO_CODI :number;
    PRO_INVE_CODI:number;
    PRO_FECH_REGI:Date;
    PRO_NOMB:string;
    PRO_TEXT:string;
    PRO_TEXT_NOMB:string;
    PRO_LINK_GLAC:string;
    PRO_LINK_CVLA:string;
    PRO_CART_AVAL:string;
    PRO_CART_NOMB:string;
    PRO_CONV_CODI :number;

    accion:string;
}

export class  PropuestaInvestigador {
    
    PIN_INVE_CODI :number;
    PIN_TPRO_CODI :number;
    PIN_TESC_CODI :number;
    PIN_TGRU_CODI :number;
    PIN_PROP_CODI :number;
    PIN_TVIN_CODI:number;    

    nombreInvestigador:string;
    Rol:string;
    Grupo:string;
    escuela:string;
    programa:string;
    seleccionado:boolean;
    accion:string;

    
}