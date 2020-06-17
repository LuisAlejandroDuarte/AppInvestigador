<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
    
      $SQL ="DELETE FROM sgi_prop_inve  
      WHERE PIN_INVE_CODI  =" . $data["PIN_INVE_CODI"] . " AND PIN_PROP_CODI =" . $data["PIN_PROP_CODI"];            
  
      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>