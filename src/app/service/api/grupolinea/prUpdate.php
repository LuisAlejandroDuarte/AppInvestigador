<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["gli_fech_term"])==null)
    {
      $SQL ="UPDATE sgi_grup_line_inve set 
        gli_fech_inic ='" . $data["gli_fech_inic"] . "',
        gli_fech_term=null,
        gli_line_inve_codi = " . $data["gli_line_inve_codi"] . "
        WHERE gli_codi=" . $data["gli_codi"] ;            
    }
    else
    {      

        $SQL ="UPDATE sgi_grup_line_inve set 
        gli_fech_inic ='" . $data["gli_fech_inic"] . "',
        gli_line_inve_codi = " . $data["gli_line_inve_codi"] . ",
        gli_fech_term='"  . $data["gli_fech_term"] . "'
        WHERE gli_codi=" . $data["gli_codi"] ;           
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>