
export class Investigador
{
    INV_CODI:number;
    INV_IDEN:string;
    INV_TIPO_DOCU_CODI:number;
    INV_NOMB:string;
    INV_APEL:string;
    INV_LINK_CVLA:string;
    INV_FECH_NACI:Date;
    INV_CENT_CODI:number;
    INV_PROG_ACAD_CODI:number;
    INV_MAIL :string;
    INV_TELE_CELU:string;
    INV_FOTO:string;
    INV_USER:string;
    INV_PASS:string;
    INV_TIPO:number;
    INV_CODI_USUA:number;
    INV_TICA_CODI?:number;    
    PAC_ESCU_CODI:number;
    INV_ESC_CODI:number;

    accion:string;
}

export class TipoDocumento
{
    TID_CODI:number;
    TID_NOMB:string;

    accion:string;
}
export class  Evaluador {
    Nombre:string;
    Cargo:string;
    Programa:string;
    Escuela:string;
    INV_CODI:number;
    TICA_CODI:number;
    ESC_CODI:number;
    PAC_NOMB:number;
    PCJU_CODI :number

    seleccionado:boolean;
}

