
<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $data['accion'];  

    if ($Accion=='ALL')
    {
      $SQL ="SELECT * from sgi_semi";
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($Accion=='SELECT')
    {
      $SQL ="SELECT * from sgi_semi WHERE SEM_CODI =" . $data["SEM_CODI"] ;
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }
 ?>