<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

      $SQL ="INSERT INTO sgi_tipo_vinc (TIV_DESC) VALUES (" . $data["TIV_DESC"] . ")";
      
      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    


    
 ?>