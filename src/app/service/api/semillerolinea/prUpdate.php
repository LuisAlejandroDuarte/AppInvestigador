<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["LIS_FECH_TERM"])==null)
    {
      $SQL ="UPDATE sgi_line_inve_semi set 
        LIS_FECH_INI ='" .  str_replace('Z','',$data["LIS_FECH_INI"]) . "',
        LIS_FECH_TERM=null,
        LIS_LINE_INVE_CODI  = " . $data["LIS_LINE_INVE_CODI"] . "
        WHERE LIS_CODI=" . $data["LIS_CODI"] ;            
    }
    else
    {      

      $SQL ="UPDATE sgi_line_inve_semi set 
      LIS_FECH_INI ='" .  str_replace('Z','',$data["LIS_FECH_INI"]) . "',
      LIS_FECH_TERM='" .  str_replace('Z','',$data["LIS_FECH_TERM"]) . "',
      LIS_LINE_INVE_CODI  = " . $data["LIS_LINE_INVE_CODI"] . "
      WHERE LIS_CODI=" . $data["LIS_CODI"] ;     
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>