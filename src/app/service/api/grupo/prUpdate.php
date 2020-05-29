<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

    $SQL ="UPDATE sgi_grup set 
        gru_nomb ='" . $data["gru_nomb"] . "',
        gru_fech_ini='" . $data["gru_fech_ini"] . "' ,
        gru_cate_colc='" . $data["gru_cate_colc"] . "' ,
        gru_colc_codi='" . $data["gru_codi_colc"] . "' ,
        gru_aval_inst='" . $data["gru_aval_inst"] . "' ,
        gru_area_codi=" . $data["gru_area_codi"] . " ,
        gru_cent_codi=" . $data["gru_cent_codi"] . " ,
        gru_inv_codi= ". $data["gru_inv_codi"] . " 
    WHERE gru_codi= ". $data["gru_codi"] . "" ;
    $execute = new  DataBase();
    $result= $execute->executeUpdateDeleteSql($SQL);        
    echo json_encode($result);      
    


    
 ?>