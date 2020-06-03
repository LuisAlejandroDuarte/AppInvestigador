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

    if ($_GET["accion"]=='selectbyproyecto')
    {
        $SQL ="SELECT P.nombre,P.Id FROM sgi_prod_proy As PP INNER JOIN sgi_prod AS P ON P.Id = PP.id_prod WHERE 
         PP.id_proy =" . $_GET["id"];        
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




