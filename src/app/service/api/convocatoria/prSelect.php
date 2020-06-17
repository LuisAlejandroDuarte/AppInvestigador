<?php
  set_time_limit(0);
  require_once("../database.php");  
  $server_urlTexto = "'" . "http://" .  $_SERVER['SERVER_NAME'] . '/AppInvestigador/Texto/' . "'";
  $server_urlResolucion ="'" . "http://" .  $_SERVER['SERVER_NAME'] . '/AppInvestigador/Reso/' . "'";
  $Accion = $_GET['accion'];  

    if ($Accion=='ALL')
    {
      $SQL ="SELECT CON_CODI,CON_NUME,CON_DESC,CON_FECH_INIC,CON_FECH_FINA,TC.TCO_DESC AS nombreTipoConvocatoria,
        concat($server_urlTexto,C.CON_TEXT) AS CON_TEXT,concat($server_urlResolucion,C.CON_RESO) AS CON_RESO, CON_PUNT_TOTA
        FROM sgi_conv AS C 
      inner join sgi_tipo_conv AS TC ON TC.TCO_CODI=C.CON_TIPO_CONV_CODI";      
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

    if ($Accion=="ConvocatoriaByJuez")
    {
      $SQL="SELECT I.INV_CODI,concat(I.INV_NOMB,' ',I.INV_APEL) As Nombre,PCJ.PCJU_PCAT_CODI,C.TICA_NOMB As Cargo,C.TICA_CODI,PA.PAC_NOMB As Programa,PCJ.PCJU_CODI,
       PA.PAC_CODI,E.ESC_NOMB AS Escuela,E.ESC_CODI,'I' As Estado  FROM  sgi_prop_conv_juez AS PCJ INNER JOIN sgi_inve AS I ON I.INV_CODI=PCJ.PCJU_INV_CODI 
       LEFT JOIN sgi_tipo_cargo AS C ON  C.TICA_CODI=I.INV_TICA_CODI INNER JOIN sgi_prog_acad AS PA ON PA.PAC_CODI = I.INV_PROG_ACAD_CODI INNER JOIN
       sgi_escu As E ON E.ESC_CODI=PA.PAC_ESCU_CODI WHERE 
       PCJ.PCJU_CON_CODI ="  . $_GET["id"] . " AND PCJ.PCJU_PCAT_CODI=" .  $_GET["idPropuesta"] ;

      $execute = new  DataBase();
      $result= $execute->executeArraySql($SQL);        
      echo json_encode($result);      
      return;
      
    }

    
 ?>




