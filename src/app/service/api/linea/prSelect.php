<?php
  set_time_limit(0);
  require_once("../database.php");  


    if (isset($_GET['Accion']))    
    {
      if ($_GET['Accion']=='ALL')
      {
      $SQL ="SELECT * from sgi_line_inve";
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
      }
    }
 ?>