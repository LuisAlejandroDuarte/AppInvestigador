<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  $result=true;
  foreach($data as $item=>$valor)
	{
    if ($valor['seleccionado']==true)
      {
        $SQL ="INSERT INTO  sgi_prop_conv_juez (PCJU_PCAT_CODI ,PCJU_CON_CODI ,PCJU_INV_CODI) VALUES 
        (" . $valor["PCJU_PCAT_CODI"] . "," . $valor["PCJU_CON_CODI"] . "," . $valor["PCJU_INV_CODI"] . ")";

        $execute = new  DataBase();
        $result= $execute->executeInsertSql($SQL);        
      }
	}
        
  echo json_encode($result);      
    
 ?>