<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["fech_term"])==null)
    {
      $SQL ="INSERT INTO sgi_grup_proy (id_proy,id_prod,id_grup,id_inve,fech_ini) 
      VALUES (" . $data["id_proy"] . "," . $data["id_prod"] . "," . $data["id_grup"] . "," . $data["id_inve"] . ",
      '" .  str_replace('Z','',$data["fech_ini"]) . "')";
    }
    else
    {      
      $SQL ="INSERT INTO sgi_grup_proy (id_proy,id_prod,id_grup,id_inve,fech_ini,fech_term) 
      VALUES (" . $data["id_proy"] . "," . $data["id_prod"] . "," . $data["id_grup"] . "," . $data["id_inve"] . ",
      '" .  str_replace('Z','',$data["fech_ini"]) . "','" .  str_replace('Z','',$data["fech_term"]) . "')";
    }

      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>