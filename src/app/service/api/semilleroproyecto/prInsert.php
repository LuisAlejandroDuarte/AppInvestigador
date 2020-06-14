<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["PPR_FECH_TERM"])==null)
    {
      $SQL ="INSERT INTO sgi_proy_prod_semi (PPR_SEMI_CODI,PPR_INVE_CODI,PPR_PROY_CODI,PPR_PROD_CODI,
      PPR_EPD_CODI,PPR_EPY_CODI,PPR_FECH_INIC) 
      VALUES (" . $data["PPR_SEMI_CODI"] . "," . $data["PPR_INVE_CODI"] . ",
      " . $data["PPR_PROY_CODI"] . ", " . $data["PPR_PROD_CODI"] . "," . $data["PPR_EPD_CODI"] . ",
      " . $data["PPR_EPY_CODI"] . ",'" . str_replace('Z','',$data["PPR_FECH_INIC"]) . "')";
    }
    else
    {      

      $SQL ="INSERT INTO sgi_proy_prod_semi (PPR_SEMI_CODI,PPR_INVE_CODI,PPR_PROY_CODI,PPR_PROD_CODI,
      PPR_EPD_CODI,PPR_EPY_CODI,PPR_FECH_INIC,PPR_FECH_TERM) 
      VALUES (" . $data["PPR_SEMI_CODI"] . "," . $data["PPR_INVE_CODI"] . ",
      " . $data["PPR_PROY_CODI"] . ", " . $data["PPR_PROD_CODI"] . "," . $data["PPR_EPD_CODI"] . ",
      " . $data["PPR_EPY_CODI"] . ",'" . str_replace('Z','',$data["PPR_FECH_INIC"]) . "',
      '" . str_replace('Z','',$data["PPR_FECH_TERM"]) . "')";
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>