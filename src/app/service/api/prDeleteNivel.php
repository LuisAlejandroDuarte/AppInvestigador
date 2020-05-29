<?php
  set_time_limit(0);
  require_once("database.php");  
  header("Access-Control-Allow-Methods: PUT, GET, POST");
  $data= json_decode(file_get_contents("php://input"),TRUE); 


    $SQL="DELETE FROM sgi_nive_inve WHERE NIN_INV_CODI =" . $data["NIN_INV_CODI"] . " AND NIN_NIV_CODI =" . $data["NIN_NIV_CODI"];
    $execute = new  DataBase();
    $result= $execute->executeUpdateDeleteSql($SQL);
    
    echo json_encode($result); 
    return;     
  

     

 ?>