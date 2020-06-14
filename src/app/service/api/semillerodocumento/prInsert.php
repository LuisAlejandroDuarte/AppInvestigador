<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["DSEM_FECH_TERM"])==null)
    {
      $SQL ="INSERT INTO sgi_docu_semi (DSEM_SEM_CODI,DSEM_NOMB,DSEM_FECH_INIC) 
      VALUES (" . $data["DSEM_SEM_CODI"] . ",'" . $data["DSEM_NOMB"] . "','" .  str_replace('Z','',$data["DSEM_FECH_INIC"]) . "')";
    }
    else
    {      
      $SQL ="INSERT INTO sgi_docu_semi (DSEM_SEM_CODI,DSEM_NOMB,DSEM_FECH_INIC,DSEM_FECH_TERM) 
      VALUES (" . $data["DSEM_SEM_CODI"] . ",'" . $data["DSEM_NOMB"] . "','" .  str_replace('Z','',$data["DSEM_FECH_INIC"]) . "',
      '" .  str_replace('Z','',$data["DSEM_FECH_TERM"]) . "')";
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>