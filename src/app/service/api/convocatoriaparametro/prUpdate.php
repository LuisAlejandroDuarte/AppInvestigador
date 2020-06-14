<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  if (isset($data["CON_FECH_FINA"])==null)
  {
    $SQL ="UPDATE sgi_conv set 
        CON_NUME ='" . $data["CON_NUME"] . "',
        CON_DESC='" . $data["CON_DESC"] . "',
        CON_TEXT_NOMB='" . $data["CON_TEXT_NOMB"] . "',
        CON_RESO_NOMB='" . $data["CON_RESO_NOMB"] . "',
        CON_FECH_INIC='" . str_replace('Z','',$data["CON_FECH_INIC"]) . "' ,
        CON_FECH_FINA=null ,
        CON_TIPO_CONV_CODI =" . $data["CON_TIPO_CONV_CODI"] . " ,
        CON_PUNT_TOTA=" . $data["CON_PUNT_TOTA"] . "       
        WHERE CON_CODI= ". $data["CON_CODI"] ;
  }
  else
  {
    $SQL ="UPDATE sgi_conv set 
        CON_NUME ='" . $data["CON_NUME"] . "',
        CON_DESC='" . $data["CON_DESC"] . "',
        CON_TEXT_NOMB='" . $data["CON_TEXT_NOMB"] . "',
        CON_RESO_NOMB='" . $data["CON_RESO_NOMB"] . "',        
        CON_FECH_INIC='" . str_replace('Z','',$data["CON_FECH_INIC"]) . "' ,
        CON_FECH_FINA='" . str_replace('Z','',$data["CON_FECH_FINA"]) . "' ,
        CON_TIPO_CONV_CODI =" . $data["CON_TIPO_CONV_CODI"] . " ,
        CON_PUNT_TOTA=" . $data["CON_PUNT_TOTA"] . "       
        WHERE CON_CODI= ". $data["CON_CODI"] ;
  }
    $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
    echo json_encode($result);      
    


    
 ?>