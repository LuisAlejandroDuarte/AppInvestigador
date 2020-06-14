<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["pgr_fech_term"])==null)
    {
      $SQL ="UPDATE sgi_plnt_grup set 
        pgr_nombre='" . $data["pgr_nombre"] . "',
        pgr_fech_inic ='" .  str_replace('Z','',$data["pgr_fech_inic"]) . "',
        pgr_fech_term=null    
        WHERE pgr_plnt_codi =" . $data["pgr_plnt_codi"] ;            
    }
    else
    {      

      $SQL ="UPDATE sgi_plnt_grup set 
      pgr_nombre='" . $data["pgr_nombre"] . "',
      pgr_fech_inic ='" .  str_replace('Z','',$data["pgr_fech_inic"]) . "',
      pgr_fech_term='" .  str_replace('Z','',$data["pgr_fech_term"]) . "'    
      WHERE pgr_plnt_codi =" . $data["pgr_plnt_codi"] ;              
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>