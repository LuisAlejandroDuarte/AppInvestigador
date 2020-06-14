<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  

      $SQL ="INSERT INTO sgi_esprod_semi (ESPRODS_NOMB) 
      VALUES ('" . $data["ESPRODS_NOMB"] . "')";


      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>