
<?php
  set_time_limit(0);
  require_once("../database.php");  
  

  $Accion = $_GET['accion'];  

    if ($Accion=='all')
    {
      $SQL ="SELECT * from sgi_semi";
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($Accion=='select')
    {
      $SQL ="SELECT * from sgi_semi WHERE SEM_CODI =" . $_GET["id"] ;
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
 ?>