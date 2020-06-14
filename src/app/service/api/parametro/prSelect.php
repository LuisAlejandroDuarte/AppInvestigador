<?php
  set_time_limit(0);
  require_once("../database.php");  

  $Accion = $_GET['accion'];  

    if ($Accion=='ALL')
    {
      $SQL ="SELECT CPA_CODI,CPA_NOMB  FROM sgi_paco";      
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
        return;
    }

    if ($Accion=='SELECT')
    {
      $SQL ="SELECT CPA_CODI,CPA_NOMB  FROM sgi_paco     
       WHERE CPA_CODI =" . $_GET["id"] ;
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




