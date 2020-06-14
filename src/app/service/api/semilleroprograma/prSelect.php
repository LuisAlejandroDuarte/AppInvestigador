
<?php
  set_time_limit(0);
  require_once("../database.php");  
 

  $Accion = $_GET['accion'];  

    if ($Accion=='all')
    {
      $SQL ="SELECT PAS.PAS_CODI,PAS.PAS_SEMI_CODI,PAS.PAS_PACA_CODI,PAS.PAS_FECH_INI,PAS.PAS_FECH_TERM,
      PA.PAC_NOMB AS nombreProgramaAcademico
         from sgi_prog_acad_semi AS PAS 
      INNER JOIN sgi_semi AS S ON S.SEM_CODI=PAS.PAS_SEMI_CODI
      INNER JOIN sgi_prog_acad AS PA ON PA.PAC_CODI=PAS.PAS_PACA_CODI
      WHERE PAS.PAS_SEMI_CODI =" . $_GET["idSemillero"] ;
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($Accion=='select')
    {
      $SQL ="SELECT PAS.PAS_CODI,PAS.PAS_SEMI_CODI,PAS.PAS_PACA_CODI,PAS.PAS_FECH_INI,PAS.PAS_FECH_TERM,
       PA.PAC_NOMB AS nombreProgramaAcademico
      from sgi_prog_acad_semi AS PAS 
   INNER JOIN sgi_semi AS S ON S.SEM_CODI=PAS.PAS_SEMI_CODI
   INNER JOIN sgi_prog_acad AS PA ON PA.PAC_CODI=PAS.PAS_PACA_CODI
   WHERE PAS.PAS_CODI =" . $_GET["id"] ;
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
 ?>