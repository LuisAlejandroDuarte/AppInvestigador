<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  
      $SQL ="DELETE FROM sgi_plnt_grup  WHERE pgr_plnt_codi=" . $data["pgr_plnt_codi"] ;            
  
      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>