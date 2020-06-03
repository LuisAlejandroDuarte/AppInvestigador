<?php
  set_time_limit(0);
  require_once("../database.php");  
   

    if ($_GET["accion"]=='all')
    {
      $SQL ="SELECT GLI.gli_codi, GLI.gli_fech_inic,GLI.gli_fech_term,GLI.gli_line_inve_codi,LI.lin_desc AS nombreLinea 
      FROM sgi_grup_line_inve AS GLI INNER JOIN sgi_line_inve AS LI ON
      LI.lin_codi=gli.gli_line_inve_codi 
      WHERE GLI.gli_grup_codi=" . $_GET["idGrupo"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($_GET["accion"]=='selectbyinve')
    {
        $SQL ="SELECT P.PRO_NOMB,P.PRO_CODI FROM sgi_proy As P 
        INNER JOIN sgi_proy_inve AS PI ON P.pro_codi = PI.id_proy WHERE 
        PI.id_inve=" . $_GET["id"];        
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




