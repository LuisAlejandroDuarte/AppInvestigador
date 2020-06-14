<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["INS_FECH_TERM"])==null)
    {
      $SQL ="INSERT INTO sgi_inve_semi (INS_INVE_IDEN,INS_SEMI_CODI,INS_FECH_INIC,INS_TIPO_VINC_CODI) 
      VALUES (" . $data["INS_INVE_IDEN"] . "," . $data["INS_SEMI_CODI"] . ",'" .  str_replace('Z','',$data["INS_FECH_INIC"]) . "',
      " . $data["INS_TIPO_VINC_CODI"] . ")";
    }
    else
    {      
      $SQL ="INSERT INTO sgi_inve_semi (INS_INVE_IDEN,INS_SEMI_CODI,INS_FECH_INIC,INS_FECH_TERM,INS_TIPO_VINC_CODI) 
      VALUES (" . $data["INS_INVE_IDEN"] . "," . $data["INS_SEMI_CODI"] . ",'" .  str_replace('Z','',$data["INS_FECH_INIC"]) . "',
      '" .  str_replace('Z','',$data["INS_FECH_TERM"]) . "'," . $data["INS_TIPO_VINC_CODI"] . ")";
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>