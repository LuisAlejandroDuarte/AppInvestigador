<?php
  set_time_limit(0);
  require_once("../database.php");  
   

    if ($_GET["accion"]=='all')
    {
      $SQL ="SELECT * FROM sgi_docu_semi WHERE DSEM_SEM_CODI =" . $_GET["idSemillero"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($_GET["accion"]=='select')
    {
      $SQL ="SELECT * FROM sgi_docu_semi WHERE DSEM_CODI  =" . $_GET["id"];
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




