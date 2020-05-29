<?php
  set_time_limit(0);
  require_once("database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  
  $Accion = $data['accion'];  
    
    if ($Accion=="login")
    {
        $SQL="SELECT u.use_codi,u.use_cod_tipo FROM sgi_user as u WHERE u.USE_USUA = '" . $data['use_usua'] . "' AND u.USE_CLAV='" . $data['use_clav'] . "'";

        $execute = new  DataBase();
        $result= $execute->executeEscalarSql($SQL);
        
        echo json_encode($result);      
        return;
    }