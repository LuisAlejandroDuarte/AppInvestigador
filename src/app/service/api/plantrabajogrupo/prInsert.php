<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["pgr_fech_term"])==null)
    {
      $SQL ="INSERT INTO sgi_plnt_grup (pgr_grup_codi,pgr_nombre,pgr_fech_inic) 
      VALUES (" . $data["pgr_grup_codi"] . ",'" . $data["pgr_nombre"] . "','" . $data["pgr_fech_inic"] . "')";
    }
    else
    {      
      $SQL ="INSERT INTO sgi_plnt_grup (pgr_grup_codi,pgr_nombre,pgr_fech_inic,pgr_fech_term) 
      VALUES (" . $data["pgr_grup_codi"] . ",'" . $data["pgr_nombre"] . "','" . $data["pgr_fech_inic"] . "',
      '" . $data["pgr_fech_term"] . "')";
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>