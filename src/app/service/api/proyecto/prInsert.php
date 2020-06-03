<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["gli_fech_term"])==null)
    {
      $SQL ="INSERT INTO sgi_grup_line_inve (gli_grup_codi,gli_fech_inic,gli_line_inve_codi) 
      VALUES (" . $data["gli_grup_codi"] . ",'" . $data["gli_fech_inic"] . "',
      " . $data["gli_line_inve_codi"] . ")";
    }
    else
    {      
      $SQL ="INSERT INTO sgi_grup_line_inve (gli_grup_codi,gli_fech_inic,gli_fech_term,gli_line_inve_codi) 
      VALUES (" . $data["gli_grup_codi"] . ",'" . $data["gli_fech_inic"] . "','" .  $data["gli_fech_term"] . "',
      " . $data["gli_line_inve_codi"] . ")";
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>