<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

 

 
    $SQL ="UPDATE sgi_prop set 
        PRO_NOMB ='" . $data["PRO_NOMB"] . "',
        PRO_CONV_CODI=" . $data["PRO_CONV_CODI"] . "   
        WHERE PRO_CODI= " . $data["PRO_CODI"] ;

    $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
    echo json_encode($result);      
    


    
 ?>