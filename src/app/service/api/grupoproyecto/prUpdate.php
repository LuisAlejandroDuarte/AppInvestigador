<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["fech_term"])==null)
    {
      $SQL ="UPDATE sgi_grup_proy set 
        id_proy =" . $data["id_proy"] . ",        
        id_prod =" . $data["id_prod"] . ",
        id_inve =" . $data["id_inve"] . ",
        fech_ini ='" . $data["fech_ini"] . "' ,  
        fech_term =null                         
        WHERE id=" . $data["id"] ;            
    }
    else
    {      

      $SQL ="UPDATE sgi_grup_proy set 
      id_proy =" . $data["id_proy"] . ",        
      id_prod =" . $data["id_prod"] . ",
      id_inve =" . $data["id_inve"] . ",
      fech_ini ='" . $data["fech_ini"] . "', 
      fech_term ='" . $data["fech_term"] . "'              
      WHERE id=" . $data["id"] ;           
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>