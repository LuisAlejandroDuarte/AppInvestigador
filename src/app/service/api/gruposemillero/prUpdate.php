<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["sgr_fech_term"])==null)
    {
      $SQL ="UPDATE sgi_grup_semi set 
      sgr_grup_codi  = " .  $data["sgr_grup_codi"] . ",
      sgr_semi_codi = " .  $data["sgr_semi_codi"] . ",
      sgr_fech_inic = '" .  str_replace('Z','',$data["sgr_fech_inic"]) . "',
      sgr_fech_term = null
      WHERE	sgr_codi =" . $data["sgr_codi"] ;            
    }
    else
    {      

      $SQL ="UPDATE sgi_grup_semi set 
      sgr_grup_codi  = " .  $data["sgr_grup_codi"] . ",
      sgr_semi_codi = " .  $data["sgr_semi_codi"] . ",
      sgr_fech_inic = '" .  str_replace('Z','',$data["sgr_fech_inic"]) . "',
      sgr_fech_term = '" .  str_replace('Z','',$data["sgr_fech_term"]) . "'
      WHERE	sgr_codi =" . $data["sgr_codi"] ;         
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>