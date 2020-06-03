<?php
  set_time_limit(0);
  require_once("../database.php");  
   

    if ($_GET["accion"]=='all')
    {
      $SQL ="SELECT PROY.PRO_NOMB As nombreProyecto,PROD.Nombre AS nombreProducto,GP.id,GP.id_inve,GP.id_proy,GP.id_prod,
      concat(I.INV_NOMB, ' ',I.INV_APEL) AS nombreInvestigador,
      PROD.Id As IdProd,PROY.PRO_CODI AS IdProy,GP.fech_ini,GP.fech_term,GP.id_grup AS IdGrupo 
      FROM sgi_grup_proy As GP INNER JOIN sgi_proy As PROY ON PROY.PRO_CODI = GP.id_proy 
       INNER JOIN sgi_prod AS PROD ON PROD.Id=GP.id_prod INNER JOIN sgi_inve AS I ON
       I.INV_CODI=GP.id_inve
      WHERE GP.id_grup=" . $_GET["idGrupo"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($_GET["accion"]=='select')
    {
      $SQL ="SELECT PROY.PRO_NOMB As nombreProyecto,PROD.Nombre AS nombreProducto,GP.id,GP.id_inve,GP.id_proy,GP.id_prod,
      concat(I.INV_NOMB, ' ',I.INV_APEL) AS nombreInvestigador,
      PROD.Id As IdProd,PROY.PRO_CODI AS IdProy,GP.fech_ini,GP.fech_term,GP.id_grup AS IdGrupo 
      FROM sgi_grup_proy As GP INNER JOIN sgi_proy As PROY ON PROY.PRO_CODI = GP.id_proy 
       INNER JOIN sgi_prod AS PROD ON PROD.Id=GP.id_prod INNER JOIN sgi_inve AS I ON
       I.INV_CODI=GP.id_inve
        WHERE  GP.id=" . $_GET["id"];
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




