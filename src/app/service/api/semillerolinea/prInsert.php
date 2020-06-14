<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["LIS_FECH_TERM"])==null)
    {
      $SQL ="INSERT INTO sgi_line_inve_semi (LIS_SEMI_CODI,LIS_FECH_INI,LIS_LINE_INVE_CODI ) 
      VALUES (" . $data["LIS_SEMI_CODI"] . ",'" .  str_replace('Z','',$data["LIS_FECH_INI"]) . "',
      " . $data["LIS_LINE_INVE_CODI"] . ")";
    }
    else
    {      
      $SQL ="INSERT INTO sgi_line_inve_semi (LIS_SEMI_CODI ,LIS_FECH_INI,LIS_FECH_TERM,LIS_LINE_INVE_CODI ) 
      VALUES (" . $data["LIS_SEMI_CODI"] . ",'" .  str_replace('Z','',$data["LIS_FECH_INI"]) . "',
      '" .  str_replace('Z','',$data["LIS_FECH_TERM"]) . "'," . $data["LIS_LINE_INVE_CODI"] . ")";
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>