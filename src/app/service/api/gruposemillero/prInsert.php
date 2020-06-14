<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["sgr_fech_term"])==null)
    {
      $SQL ="INSERT INTO sgi_grup_semi (sgr_grup_codi,sgr_semi_codi ,sgr_fech_inic) 
      VALUES (" . $data["sgr_grup_codi"] . "," . $data["sgr_semi_codi"] . ",
      '" .  str_replace('Z','',$data["sgr_fech_inic"]) . "')";
    }
    else
    {      

      $SQL ="INSERT INTO sgi_grup_semi (sgr_grup_codi,sgr_semi_codi ,sgr_fech_inic,sgr_fech_term) 
      VALUES (" . $data["sgr_grup_codi"] . "," . $data["sgr_semi_codi"] . ",
      '" .  str_replace('Z','',$data["sgr_fech_inic"]) . "','" .  str_replace('Z','',$data["sgr_fech_term"]) . "')";
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>