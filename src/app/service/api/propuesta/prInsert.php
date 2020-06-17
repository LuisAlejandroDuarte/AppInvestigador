<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 



      $SQL ="INSERT INTO  sgi_prop (PRO_FECH_REGI,PRO_INVE_CODI,PRO_NOMB,PRO_CONV_CODI)
       VALUES ('" . str_replace('Z','',$data["PRO_FECH_REGI"]) . "'," . $data["PRO_INVE_CODI"] . ",
       '" . $data["PRO_NOMB"] . "',
       " . $data["PRO_CONV_CODI"] . ")";  
       
      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      
      echo json_encode($result);      
    
 ?>