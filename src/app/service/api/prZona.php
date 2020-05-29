<?php
  set_time_limit(0);
  require_once("database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $data['accion'];  

    if ($Accion=='listZonaByCentro')
    {
      $SQL ="SELECT * from sgi_zona WHERE zon_codi=" . $data["CEN_ZONA_CODI"];
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
 ?>