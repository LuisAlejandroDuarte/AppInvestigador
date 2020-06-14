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
        fech_ini ='" .  str_replace('Z','',$data["fech_ini"]) . "' ,  
        fech_term =null                         
        WHERE id=" . $data["id"] ;            
    }
    else
    {      

      $SQL ="UPDATE sgi_grup_proy set 
      id_proy =" . $data["id_proy"] . ",        
      id_prod =" . $data["id_prod"] . ",
      id_inve =" . $data["id_inve"] . ",
      fech_ini ='" .  str_replace('Z','',$data["fech_ini"]) . "', 
      fech_term ='" .  str_replace('Z','',$data["fech_term"]) . "'              
      WHERE id=" . $data["id"] ;           
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>