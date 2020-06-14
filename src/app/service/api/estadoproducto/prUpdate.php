<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
 

  $SQL ="UPDATE sgi_esprod_semi set 
  ESPRODS_NOMB ='" . $data["ESPROYS_NOMB"] . "'
  WHERE ESPRODS_CODI =" . $data["ESPRODS_CODI"] ;          
    

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>