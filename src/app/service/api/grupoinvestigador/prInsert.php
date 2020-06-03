<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["IGR_FECH_TERM"])==null)
    {
      $SQL ="INSERT INTO sgi_inve_grup (IGR_INVE_IDEN,IGR_GRUP_CODI,IGR_FECH_INIC,IGR_TIPO_VINC_CODI) 
      VALUES (" . $data["IGR_INVE_IDEN"] . "," . $data["IGR_GRUP_CODI"] . ",
      '" . $data["IGR_FECH_INIC"] . "'," . $data["IGR_TIPO_VINC_CODI"] . ")";
    }
    else
    {      

      $SQL ="INSERT INTO sgi_inve_grup (IGR_INVE_IDEN,IGR_GRUP_CODI,IGR_FECH_INIC,IGR_FECH_TERM,IGR_TIPO_VINC_CODI) 
      VALUES (" . $data["IGR_INVE_IDEN"] . "," . $data["IGR_GRUP_CODI"] . ",
      '" . $data["IGR_FECH_INIC"] . "','" . $data["IGR_FECH_TERM"] . "'," . $data["IGR_TIPO_VINC_CODI"] . ")";  
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>