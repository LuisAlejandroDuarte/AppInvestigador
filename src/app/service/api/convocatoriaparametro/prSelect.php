<?php
  set_time_limit(0);
  require_once("../database.php");  

  $Accion = $_GET['accion'];  

    if ($Accion=='ALL')
    {
      $SQL ="SELECT CP.PCO_VALO,CP.PCO_PARA_CODI, CPA_CODI,CPA_NOMB,P.CPA_NOMB AS nombreParametro FROM sgi_paco AS P inner join sgi_conv_para AS CP ON
      CP.PCO_PARA_CODI=P.CPA_CODI WHERE CP.PCO_CONV_CODI =" . $_GET["idConvocatoria"] ;      
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
        return;
    }

    if ($Accion=='SELECT')
    {
      $SQL ="SELECT CPA_CODI,CPA_NOMB,P.CPA_NOMB AS nombreParametro FROM sgi_paco AS P inner join sgi_conv_para AS CP ON
      CP.PCO_PARA_CODI=P.CPA_CODI
       WHERE CP.PCO_CONV_CODI  =" . $_GET["idConvocatoria"] .  " AND  CP.PCO_PARA_CODI =" . $_GET["idParametro"] ;
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




