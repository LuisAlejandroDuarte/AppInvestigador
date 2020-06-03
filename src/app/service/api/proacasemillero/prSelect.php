<?php
  set_time_limit(0);
  require_once("../database.php");  
   

    if ($_GET["accion"]=='all')
    {
      $SQL ="SELECT PAS.PAS_CODI, PAS.PAS_FECH_INI,PAS.PAS_FECH_TERM,PAS.PAS_SEMI_CODI,PAS.PAS_PACA_CODI,
      S.PAC.NOMB AS nombreProgramaAcademico
      FROM sgi_prog_acad_semi AS PAS INNER JOIN sgi_prog_acad AS PA ON
      PA.PAC_CODI =PAS.PAS_PACA_CODI INNER JOIN sgi_semi AS S
      ON S.SEM_CODI=PAS.PAS_SEMI_CODI 
      WHERE S.SEM_CODI=" . $_GET["idSemillero"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($_GET["accion"]=='select')
    {
      $SQL ="SELECT PAS.PAS_CODI, PAS.PAS_FECH_INI,PAS.PAS_FECH_TERM,PAS.PAS_SEMI_CODI,PAS.PAS_PACA_CODI,
      S.PAC.NOMB AS nombreProgramaAcademico
      FROM sgi_prog_acad_semi AS PAS INNER JOIN sgi_prog_acad AS PA ON
      PA.PAC_CODI =PAS.PAS_PACA_CODI INNER JOIN sgi_semi AS S
      ON S.SEM_CODI=PAS.PAS_SEMI_CODI 
        WHERE PAS.PAS_CODI=" . $_GET["id"];
        $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




