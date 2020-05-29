<?php
  set_time_limit(0);
  require_once("database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $data['ACCION'];  

    if ($Accion=='listEscuelaByPrograma')
    {
      $SQL ="SELECT * from sgi_escu WHERE esc_codi = " . $data["PAC_ESCU_CODI"] ;
      $execute = new  DataBase();
      $result= $execute->executeArraySql($SQL);        
      echo json_encode($result);      
    }
 ?>