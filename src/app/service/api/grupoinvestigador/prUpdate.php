<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["IGR_FECH_TERM"])==null)
    {
      $SQL ="UPDATE sgi_inve_grup set 
      IGR_INVE_IDEN = " .  $data["IGR_INVE_IDEN"] . ",
      IGR_GRUP_CODI = " .  $data["IGR_GRUP_CODI"] . ",
      IGR_FECH_INIC = '" . $data["IGR_FECH_INIC"] . "',   
      IGR_FECH_TERM = null,  
      IGR_TIPO_VINC_CODI = " . $data["IGR_TIPO_VINC_CODI"] . " 
      WHERE IGR_CODI=" . $data["IGR_CODI"] ;            
    }
    else
    {      

      $SQL ="UPDATE sgi_inve_grup set 
      IGR_INVE_IDEN = " .  $data["IGR_INVE_IDEN"] . ",
      IGR_GRUP_CODI = " .  $data["IGR_GRUP_CODI"] . ",
      IGR_FECH_INIC = '" . $data["IGR_FECH_INIC"] . "',      
      IGR_FECH_TERM = '" . $data["IGR_FECH_TERM"] . "',
      IGR_TIPO_VINC_CODI = " . $data["IGR_TIPO_VINC_CODI"] . " 
      WHERE IGR_CODI=" . $data["IGR_CODI"] ;           
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>