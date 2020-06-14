<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
 

    $SQL ="UPDATE sgi_esproy_semi set 
    ESPROYS_DESC ='" . $data["ESPROYS_DESC"] . "'
    WHERE ESPROYS_CODI =" . $data["ESPROYS_CODI"] ;           
    

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>