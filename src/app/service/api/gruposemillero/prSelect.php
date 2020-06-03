<?php
  set_time_limit(0);
  require_once("../database.php");  
   

    if ($_GET["accion"]=='all')
    {
      $SQL ="SELECT GS.sgr_codi,GS.sgr_fech_inic,GS.sgr_fech_term,S.SEM_NOMB AS nombreSemillero,
      S.SEM_CODI,GS.sgr_semi_codi
      FROM sgi_grup_semi AS GS INNER JOIN sgi_grup AS G ON
      GS.sgr_grup_codi =G.gru_codi INNER JOIN sgi_semi AS S
      ON S.SEM_CODI=GS.sgr_semi_codi 
      WHERE GS.sgr_grup_codi=" . $_GET["idGrupo"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($_GET["accion"]=='select')
    {
        $SQL ="SELECT GS.sgr_codi,GS.sgr_fech_inic,GS.sgr_fech_term,S.SEM_NOMB AS nombreSemillero,
        S.SEM_CODI,GS.sgr_semi_codi
        FROM sgi_grup_semi AS GS INNER JOIN sgi_grup AS G ON
        GS.sgr_grup_codi =G.gru_codi INNER JOIN sgi_semi AS S
        ON S.SEM_CODI=GS.sgr_semi_codi 
        WHERE GS.sgr_codi=" . $_GET["id"];
        $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




