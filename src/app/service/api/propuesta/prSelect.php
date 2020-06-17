<?php
  set_time_limit(0);
  require_once("../database.php");  
  $server_urlDocu = "'" . "http://" .  $_SERVER['SERVER_NAME'] . '/AppInvestigador/Docu/' . "'";
  $server_urlCarta ="'" . "http://" .  $_SERVER['SERVER_NAME'] . '/AppInvestigador/Carta/' . "'";
  $Accion = $_GET['accion'];  

    if ($Accion=='ALL')
    {
      $SQL ="SELECT P.PRO_CODI,P.PRO_NOMB,C.CON_DESC,P.PRO_TEXT,P.PRO_TEXT_NOMB,P.PRO_CART_AVAL,P.PRO_CART_NOMB   
       FROM sgi_prop AS P INNER JOIN sgi_conv AS C  ON C.CON_CODI=P.PRO_CONV_CODI  
       WHERE P.PRO_INVE_CODI=" . $_GET["idinvestigador"] ;
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
        return;
    }

    if ($Accion=='ByConvocatoria')
    {
      $SQL ="SELECT PRO_CODI,PRO_NOMB
       FROM sgi_prop WHERE PRO_CONV_CODI=" . $_GET["idConvocatoria"];
       
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
        return;
    }

    if ($Accion=='SELECT')
    {
      $SQL ="SELECT P.PRO_CODI,P.PRO_NOMB,C.CON_DESC,P.PRO_TEXT,P.PRO_TEXT_NOMB,
      P.PRO_CART_AVAL,P.PRO_CART_NOMB,P.PRO_CONV_CODI,concat($server_urlDocu,PRO_LINK_GLAC) AS PRO_LINK_GLAC,
      concat($server_urlCarta,PRO_LINK_CVLA) AS PRO_LINK_CVLA
      FROM sgi_prop AS P INNER JOIN sgi_conv AS C  ON C.CON_CODI=P.PRO_CONV_CODI  
       WHERE P.PRO_CODI=" . $_GET["id"] ;
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
        return;
    }

    if ($Accion=='PropuestaInvestigador')
    {
      $SQL="SELECT I.INV_CODI AS idInvestigador, concat(I.INV_NOMB,' ',I.INV_APEL) AS nombreInvestigador, PI.PIN_INVE_CODI,
       TV.TIV_CODI AS PIN_TVIN_CODI,TV.TIV_DESC AS Rol,G.gru_codi AS PIN_TGRU_CODI,G.gru_nomb As Grupo,I.INV_PROG_ACAD_CODI AS PIN_TPRO_CODI ,PA.PAC_ESCU_CODI AS PIN_TESC_CODI ,
       PA.PAC_NOMB AS programa,E.ESC_NOMB AS escuela 
       FROM sgi_prop_inve AS PI INNER JOIN sgi_inve AS I ON PI.PIN_INVE_CODI=I.INV_CODI  INNER JOIN sgi_tipo_vinc As TV ON TV.TIV_CODI = PI.PIN_TVIN_CODI 
       LEFT JOIN sgi_grup As G ON G.gru_codi=PI.PIN_TGRU_CODI INNER JOIN sgi_prog_acad AS PA ON PA.PAC_CODI=I.INV_PROG_ACAD_CODI
       INNER JOIN sgi_escu AS E ON 
       E.ESC_CODI=PA.PAC_ESCU_CODI WHERE PI.PIN_PROP_CODI =" . $_GET["idPropuesta"];

      $execute = new  DataBase();
      $result= $execute->executeArraySql($SQL);        
      echo json_encode($result);      
      return;

    }

    if ($Accion=="InvestigadorByPropuesta")
        {
          $SQL="SELECT concat(I.INV_NOMB,' ',I.INV_APEL) AS Investigador,TV.TIV_DESC AS Rol,PA.PAC_NOMB As Programa,I.INV_CODI AS PIN_INVE_CODI,
          E.ESC_NOMB As Escuela,G.gru_nomb AS Grupo FROM sgi_prop_inve AS PI INNER JOIN sgi_inve AS I  
          ON  I.INV_CODI = PI.PIN_INVE_CODI INNER JOIN sgi_prog_acad AS PA ON PA.PAC_CODI =PI.PIN_TPRO_CODI 
          INNER JOIN sgi_escu AS E ON E.ESC_CODI = PI.PIN_TESC_CODI INNER JOIN sgi_tipo_vinc As TV ON TV.TIV_CODI=PI.PIN_TVIN_CODI 
          INNER JOIN sgi_prog_acad AS P ON P.PAC_CODI=PI.PIN_TPRO_CODI INNER JOIN sgi_grup AS G ON PI.PIN_TGRU_CODI=G.gru_codi 
          WHERE PI.PIN_PROP_CODI =" . $_GET["idPropuesta"];
             $execute = new  DataBase();
             $result= $execute->executeArraySql($SQL);        
             echo json_encode($result);      
             return;
        }
    
 ?>




