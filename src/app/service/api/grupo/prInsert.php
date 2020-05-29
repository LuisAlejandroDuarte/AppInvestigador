<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

      $SQL ="INSERT INTO sgi_grup (gru_nomb,gru_fech_ini,gru_cate_colc,gru_colc_codi,gru_aval_inst,gru_area_codi,gru_cent_codi,
      gru_inv_codi) VALUES ('" . $data["gru_nomb"] . "','" . $data["gru_fech_ini"] . "','" . $data["gru_cate_colc"] . "',
      '" . $data["gru_codi_colc"] . "'," . $data["gru_aval_inst"] . "," . $data["gru_area_codi"] . "," . $data["gru_cent_codi"] . ",
      " . $data["gru_inv_codi"] . ")";
      
      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    


    
 ?>