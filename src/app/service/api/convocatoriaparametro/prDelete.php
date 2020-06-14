<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
    
      

      $SQL ="DELETE FROM sgi_conv_para  WHERE PCO_CONV_CODI =" . $data["PCO_CONV_CODI"] . " AND 
        PCO_PARA_CODI  =" . $data["PCO_PARA_CODI"] ;            
  
      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>