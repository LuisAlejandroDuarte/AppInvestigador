<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["pgr_fech_term"])==null)
    {
      $SQL ="UPDATE sgi_plnt_grup set 
        pgr_nombre='" . $data["pgr_nombre"] . "',
        pgr_fech_inic ='" . $data["pgr_fech_inic"] . "',
        pgr_fech_term=null    
        WHERE pgr_plnt_codi =" . $data["pgr_plnt_codi"] ;            
    }
    else
    {      

      $SQL ="UPDATE sgi_plnt_grup set 
      pgr_nombre='" . $data["pgr_nombre"] . "',
      pgr_fech_inic ='" . $data["pgr_fech_inic"] . "',
      pgr_fech_term='" . $data["pgr_fech_term"] . "'    
      WHERE pgr_plnt_codi =" . $data["pgr_plnt_codi"] ;              
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>