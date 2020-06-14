<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 


if (isset($data["CON_FECH_FINA"])==null)
    {
      $SQL ="INSERT INTO  sgi_conv (CON_NUME,CON_DESC,CON_TEXT_NOMB,CON_RESO_NOMB,CON_FECH_INIC,
      CON_TIPO_CONV_CODI,CON_PUNT_TOTA) VALUES ('" . $data["CON_NUME"] . "','" . $data["CON_DESC"] . "','" . $data["CON_TEXT_NOMB"] . "',
      '" . $data["CON_RESO_NOMB"] . "','" . str_replace('Z','',$data["CON_FECH_INIC"]) . "',
      " . $data["CON_TIPO_CONV_CODI"] . "," . $data["CON_PUNT_TOTA"] . ")";
    }
    else
    {
      $SQL ="INSERT INTO  sgi_conv (CON_NUME,CON_DESC,CON_TEXT_NOMB,CON_RESO_NOMB,CON_FECH_INIC,CON_FECH_FINA,
      CON_TIPO_CONV_CODI,CON_PUNT_TOTA) VALUES ('" . $data["CON_NUME"] . "','" . $data["CON_DESC"] . "','" . $data["CON_TEXT_NOMB"] . "',
      '" . $data["CON_RESO_NOMB"] . "','" . str_replace('Z','',$data["CON_FECH_INIC"]) . "',
      '" . str_replace('Z','',$data["CON_FECH_FINA"]) . "'," . $data["CON_TIPO_CONV_CODI"] . ",
      " . $data["CON_PUNT_TOTA"] . ")";
    }
          
      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
 ?>