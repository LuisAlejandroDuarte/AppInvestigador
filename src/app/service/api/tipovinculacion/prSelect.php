<?php
  set_time_limit(0);
  require_once("../database.php");  


 

    if ($_GET["accion"]=='all')
    {
      $SQL ="SELECT TIV_CODI,TIV_DESC FROM sgi_tipo_vinc";   
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($_GET["accion"]=='select')
    {
      $SQL ="SELECT TIV_CODI,TIV_DESC FROM sgi_tipo_vinc 
      WHERE TIV_CODI=" . $data["TIV_CODI"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);   
    }
    
 ?>




