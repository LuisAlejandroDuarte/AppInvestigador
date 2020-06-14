<?php
  set_time_limit(0);
  require_once("../database.php");  
   

    if ($_GET["accion"]=='all')
    {
      $SQL ="SELECT SI.INS_CODI,SI.INS_INVE_IDEN,SI.INS_FECH_INIC,SI.INS_FECH_TERM,SI.INS_TIPO_VINC_CODI,
      CONCAT(I.INV_NOMB,' ',I.INV_APEL) AS nombreInvestigador,TV.TIV_DESC AS nombreTipoVinculacion
      FROM sgi_inve_semi AS SI INNER JOIN sgi_semi AS S ON
      SI.INS_SEMI_CODI =S.SEM_CODI INNER JOIN sgi_inve AS I
      ON I.INV_CODI=SI.INS_INVE_IDEN INNER JOIN sgi_tipo_vinc AS TV ON
      TV.TIV_CODI=SI.INS_TIPO_VINC_CODI 
      WHERE SI.INS_SEMI_CODI =" . $_GET["idSemillero"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($_GET["accion"]=='select')
    {
        $SQL ="SELECT SI.INS_CODI,SI.INS_INVE_IDEN,SI.INS_FECH_INIC,SI.INS_FECH_TERM,SI.INS_TIPO_VINC_CODI,
        CONCAT(I.INV_NOMB,' ',I.INV_APEL) AS nombreInvestigador,TV.TIV_DESC AS nombreTipoVinculacion
        FROM sgi_inve_semi AS SI INNER JOIN sgi_semi AS S ON
        SI.INS_SEMI_CODI =S.SEM_CODI INNER JOIN sgi_inve AS I
        ON I.INV_CODI=SI.INS_INVE_IDEN INNER JOIN sgi_tipo_vinc AS TV ON
        TV.TIV_CODI=SI.INS_TIPO_VINC_CODI
        WHERE SI.INS_CODI =" . $_GET["id"];
        $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




