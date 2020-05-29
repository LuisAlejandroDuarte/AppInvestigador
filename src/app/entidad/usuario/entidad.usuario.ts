export enum Modulo
{
    Administrador=1,
    Investigador=2,
    Grupo=3,
    Propuesta=4,
    Convocatoria=5,
    Semillero=6,
    Evaluador=7
}

export class Usuario
{
    use_codi:number;
    use_iden :string;
    use_nomb:string;
    use_apel:string;
    use_emai:string;
    use_tele:string;
    use_usua:string;
    use_clav:string;
    use_cod_tipo:number;
    cvlac:string;

    inv_codi:number;    
    accion:string;
}

export class logueado
{
    use_codi:number;
    use_cod_tipo:number;
    inv_codi:number;
    modulos:Array<Modulo>
}