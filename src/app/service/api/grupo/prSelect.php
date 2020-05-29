<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $data['accion'];  

    if ($Accion=='ALL')
    {
      $SQL ="SELECT gru_nomb AS Grupo,gru_codi,gru_fech_ini AS Fecha FROM sgi_grup 
      WHERE gru_inv_codi=" . $data["gru_inv_codi"];
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($Accion=='SELECT')
    {
      $SQL ="SELECT  gru_nomb,gru_fech_ini,gru_cate_colc,gru_colc_codi,gru_aval_inst,
      gru_area_codi,gru_cent_codi FROM sgi_grup WHERE gru_inv_codi=" . $data["gru_inv_codi"] . " AND 
      gru_codi =" . $data["gru_codi"] ;
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
    
 ?>




