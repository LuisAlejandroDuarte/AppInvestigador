<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["DSEM_FECH_TERM"])==null)
    {
      $SQL ="UPDATE sgi_docu_semi set 
        DSEM_NOMB='" . $data["DSEM_NOMB"] . "',
        DSEM_FECH_INIC ='" .  str_replace('Z','',$data["DSEM_FECH_INIC"]) . "',
        DSEM_FECH_TERM=null    
        WHERE DSEM_CODI  =" . $data["DSEM_CODI"] ;            
    }
    else
    {      

      $SQL ="UPDATE sgi_docu_semi set 
      DSEM_NOMB='" . $data["DSEM_NOMB"] . "',
      DSEM_FECH_INIC ='" .  str_replace('Z','',$data["DSEM_FECH_INIC"]) . "',
      DSEM_FECH_TERM='" .  str_replace('Z','',$data["DSEM_FECH_TERM"]) . "'    
      WHERE DSEM_CODI  =" . $data["DSEM_CODI"] ;              
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>