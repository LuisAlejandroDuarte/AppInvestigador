<?php
  set_time_limit(0);
  require_once("../database.php");  

  $Accion = $_GET['accion'];  

    if ($Accion=='ALL')
    {
      $SQL ="SELECT * FROM sgi_tipo_conv";      
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
        return;
    }

    if ($Accion=='SELECT')
    {
      $SQL ="SELECT *
        FROM sgi_tipo_conv
       WHERE TCO_CODI =" . $_GET["id"] ;
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




