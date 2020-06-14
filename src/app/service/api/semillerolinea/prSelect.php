<?php
  set_time_limit(0);
  require_once("../database.php");  
   

    if ($_GET["accion"]=='all')
    {
      $SQL ="SELECT SLIS.LIS_CODI, SLIS.LIS_FECH_INI,SLIS.LIS_FECH_TERM,SLIS.LIS_LINE_INVE_CODI,LI.lin_desc AS nombreLinea 
      FROM sgi_line_inve_semi AS SLIS INNER JOIN sgi_line_inve AS LI ON
      LI.lin_codi=SLIS.LIS_LINE_INVE_CODI 
      WHERE SLIS.LIS_SEMI_CODI =" . $_GET["idSemillero"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($_GET["accion"]=='select')
    {
      $SQL ="SELECT SLIS.LIS_CODI, SLIS.LIS_FECH_INI,SLIS.LIS_FECH_TERM,SLIS.LIS_LINE_INVE_CODI,LI.lin_desc AS nombreLinea 
      FROM sgi_line_inve_semi AS SLIS INNER JOIN sgi_line_inve AS LI ON
      LI.lin_codi=SLIS.LIS_LINE_INVE_CODI 
        WHERE SLIS.LIS_CODI=" . $_GET["id"];
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




