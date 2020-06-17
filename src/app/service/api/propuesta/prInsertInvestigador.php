<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  $result=true;
  foreach($data as $item=>$valor)
  {
  if ($valor['seleccionado']==true)
    {

      $SQL ="INSERT INTO  sgi_prop_inve (PIN_INVE_CODI,PIN_TGRU_CODI,PIN_PROP_CODI,PIN_TVIN_CODI,PIN_TPRO_CODI,PIN_TESC_CODI)
      VALUES (" . $valor["PIN_INVE_CODI"] . "," . $valor["PIN_TGRU_CODI"] . "," . $valor["PIN_PROP_CODI"] . ",
      " . $valor["PIN_TVIN_CODI"] . "," . $valor["PIN_TPRO_CODI"] . "," . $valor["PIN_TESC_CODI"] . ")";
       
       
      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL);    
    }
  }    
      
      echo json_encode($result);      
    
 ?>