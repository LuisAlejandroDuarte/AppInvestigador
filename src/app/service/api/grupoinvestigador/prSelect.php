<?php
  set_time_limit(0);
  require_once("../database.php");  
   

    if ($_GET["accion"]=='all')
    {
      $SQL ="SELECT IV.IGR_CODI,IV.IGR_INVE_IDEN,IV.IGR_FECH_INIC,IV.IGR_FECH_TERM,IV.IGR_TIPO_VINC_CODI,
      CONCAT(I.INV_NOMB,' ',I.INV_APEL) AS nombreInvestigador,TV.TIV_DESC AS nombreTipoVinculacion
      FROM sgi_inve_grup AS IV INNER JOIN sgi_grup AS G ON
      IV.IGR_GRUP_CODI =G.gru_codi INNER JOIN sgi_inve AS I
      ON I.INV_CODI=IV.IGR_INVE_IDEN INNER JOIN sgi_tipo_vinc AS TV ON
      TV.TIV_CODI=IV.IGR_TIPO_VINC_CODI
      WHERE IV.IGR_GRUP_CODI=" . $_GET["idGrupo"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($_GET["accion"]=='select')
    {
        $SQL ="SELECT IV.IGR_CODI,IV.IGR_INVE_IDEN,IV.IGR_FECH_INIC,IV.IGR_FECH_TERM,IV.IGR_TIPO_VINC_CODI,
        CONCAT(I.INV_NOMB,' ',I.INV_APEL) AS nombreInvestigador
        FROM sgi_inve_grup AS IV INNER JOIN sgi_grup AS G ON
        IV.IGR_GRUP_CODI =G.gru_codi INNER JOIN sgi_inve AS I
        ON I.INV_CODI=IV.IGR_INVE_IDEN INNER JOIN sgi_tipo_vinc AS TV ON
        TV.TIV_CODI=IV.IGR_TIPO_VINC_CODI
        WHERE IV.IGR_CODI=" . $_GET["id"];
        $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




