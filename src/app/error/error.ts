import { Mensaje, TipoMensaje } from '../entidad/mensaje/entidad.mensaje';
import { ErrorEntidad } from '../entidad/error/entidad.error';




export class ErrorComponent extends Mensaje
{
    /**
     * GenerarMensaje
     */
    public GenerarMensaje(error:ErrorEntidad):Mensaje  {
        
        var mensaje= new Mensaje();
        if (error.status==401)
        {
            error.message="No tiene permisos para ejecutar esta acción";
            
        }
            mensaje.id=error.status;
            mensaje.titulo="Error";
            mensaje.cuerpo=error.message;
            mensaje.tipo=TipoMensaje.Error;
            
        return mensaje;

    }

   

}