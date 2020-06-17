<?php
  set_time_limit(0);
  require_once("../database.php");  
   

    if ($_GET["accion"]=='all')
    {
      $SQL="SELECT PCJ.PCJU_CODI,PCJ.PCJU_EVAL_PROP_LINK,PCJ.PCJU_EVAL_PROP_NOMB,PCJ.PCJU_EEVA_CODI, P.PRO_CODI,P.PRO_TEXT, 
      P.PRO_NOMB AS Propuesta,C.CON_CODI, C.CON_DESC AS Convocatoria FROM sgi_prop AS P
       INNER JOIN sgi_prop_conv_juez AS PCJ ON PCJ.PCJU_PCAT_CODI = P.PRO_CODI 
       INNER JOIN sgi_conv AS C ON PCJ.PCJU_CON_CODI = C.CON_CODI 
       WHERE PCJ.PCJU_INV_CODI=" . $_GET['idInvestigador'] . " ORDER BY PCJ.PCJU_CODI ASC";

        $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);     
        return;
    }  


    if ($_GET["accion"]=='select')
    {
      $SQL="SELECT PCJ.PCJU_CODI,PCJ.PCJU_EVAL_PROP_LINK,PCJ.PCJU_EVAL_PROP_NOMB,PCJ.PCJU_EEVA_CODI, P.PRO_CODI,P.PRO_TEXT, 
      P.PRO_NOMB AS Propuesta,C.CON_CODI, C.CON_DESC AS Convocatoria FROM sgi_prop AS P
       INNER JOIN sgi_prop_conv_juez AS PCJ ON PCJ.PCJU_PCAT_CODI = P.PRO_CODI 
       INNER JOIN sgi_conv AS C ON PCJ.PCJU_CON_CODI = C.CON_CODI 
       WHERE PCJ.PCJU_CODI =" . $_GET['id'] ;

        $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);     
        return;
    }  
    
 ?>




