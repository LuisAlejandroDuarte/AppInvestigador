<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["PAS_FECH_TERM"])==null)
    {
      $SQL ="INSERT INTO sgi_prog_acad_semi (PAS_SEMI_CODI,PAS_PACA_CODI,PAS_FECH_INI) 
      VALUES (" . $data["PAS_SEMI_CODI"] . "," . $data["PAS_PACA_CODI"] . ",
      '" . $data["PAS_FECH_INI"] . "')";
    }
    else
    {      

      $SQL ="INSERT INTO sgi_prog_acad_semi (PAS_SEMI_CODI,PAS_PACA_CODI,PAS_FECH_INI,PAS_FECH_TERM) 
      VALUES (" . $data["PAS_SEMI_CODI"] . "," . $data["PAS_PACA_CODI"] . ",
      '" . $data["PAS_FECH_INI"] . "','" . $data["PAS_FECH_TERM"] . "')";
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>