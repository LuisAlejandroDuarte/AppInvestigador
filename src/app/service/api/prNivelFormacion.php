<?php
  set_time_limit(0);
  require_once("database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  if ($data==null)
        $Accion=$_GET["ACCION"];
    else        
        $Accion = $data['ACCION'];  

  

    if ($Accion=='list')
    {
      $SQL ="SELECT * from sgi_nive_form";
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }
 ?>