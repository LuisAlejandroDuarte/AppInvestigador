<?php
  set_time_limit(0);
  require_once("database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $data['accion'];  

    if ($Accion=='listCentro')
    {
      $SQL ="SELECT * from sgi_cent";
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }
 ?>
