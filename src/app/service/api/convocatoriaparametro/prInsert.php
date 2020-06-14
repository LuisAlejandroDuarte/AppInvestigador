<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 


  foreach($data as $item=>$valor)
	{
    if ($valor['seleccionado']==true)
      {
        $SQL ="INSERT INTO  sgi_conv_para (PCO_CONV_CODI ,PCO_PARA_CODI ,PCO_VALO) VALUES 
        (" . $valor["PCO_CONV_CODI"] . "," . $valor["PCO_PARA_CODI"] . "," . $valor["PCO_VALO"] . ")";

        $execute = new  DataBase();
        $result= $execute->executeInsertSql($SQL);        
      }
	}
        
  echo json_encode($result);      
    
 ?>