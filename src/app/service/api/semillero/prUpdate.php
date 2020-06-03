<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["PAS_FECH_TERM"])==null)
    {
      $SQL ="UPDATE sgi_prog_acad_semi set 
      PAS_PACA_CODI  = " .  $data["PAS_PACA_CODI"] . ",     
      PAS_FECH_INI = '" . $data["PAS_FECH_INI"] . "',
      PAS_FECH_TERM = null
      WHERE	PAS_CODI =" . $data["PAS_CODI"] ;            
    }
    else
    {      

      $SQL ="UPDATE sgi_prog_acad_semi set 
      PAS_PACA_CODI  = " .  $data["PAS_PACA_CODI"] . ",     
      PAS_FECH_INI = '" . $data["PAS_FECH_INI"] . "',
      PAS_FECH_TERM = '" . $data["PAS_FECH_TERM"] . "'
      WHERE	PAS_CODI =" . $data["PAS_CODI"] ;           
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>