<?php
  set_time_limit(0);
  require_once("../database.php");  

  $Accion = $_GET['accion'];  

    if ($Accion=='ALL')
    {
      $SQL ="SELECT CON_CODI,CON_NUME,CON_DESC,CON_FECH_INIC,CON_FECH_FINA  FROM sgi_conv";      
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
        return;
    }

    if ($Accion=='SELECT')
    {
      $SQL ="SELECT CON_CODI,CON_NUME,CON_DESC,CON_FECH_INIC,CON_FECH_FINA,CON_TEXT,
      CON_TEXT_NOMB,CON_RESO,CON_RESO_NOMB,CON_TIPO_CONV_CODI,CON_PUNT_TOTA
        FROM sgi_conv
       WHERE CON_CODI =" . $_GET["id"] ;
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




