<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["INS_FECH_TERM"])==null)
    {
      $SQL ="UPDATE sgi_inve_semi set 
      INS_INVE_IDEN  = " .  $data["INS_INVE_IDEN"] . ",
      INS_SEMI_CODI  = " .  $data["INS_SEMI_CODI"] . ",
      INS_FECH_INIC = '" .  str_replace('Z','',$data["INS_FECH_INIC"]) . "',   
      INS_FECH_TERM = null,  
      INS_TIPO_VINC_CODI  = " . $data["INS_TIPO_VINC_CODI"] . " 
      WHERE INS_CODI =" . $data["INS_CODI"] ;              
    }
    else
    {      

      $SQL ="UPDATE sgi_inve_semi set 
      INS_INVE_IDEN  = " .  $data["INS_INVE_IDEN"] . ",
      INS_SEMI_CODI  = " .  $data["INS_SEMI_CODI"] . ",
      INS_FECH_INIC = '" .  str_replace('Z','',$data["INS_FECH_INIC"]) . "',   
      INS_FECH_TERM = '" .  str_replace('Z','',$data["INS_FECH_TERM"]) . "',  
      INS_TIPO_VINC_CODI  = " . $data["INS_TIPO_VINC_CODI"] . " 
      WHERE INS_CODI =" . $data["INS_CODI"] ;           
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>