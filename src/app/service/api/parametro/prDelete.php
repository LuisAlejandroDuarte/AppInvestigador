<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
    
        $SQL ="SELECT *
        FROM sgi_grup_line_inve 
        WHERE gli_grup_codi=" . $data["gru_codi"] ;
        $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);     
        if ($result!=null)
        {
            echo json_encode("existen líneas de grupo");
            return;      
        }

      $SQL ="SELECT *
      FROM sgi_inve_grup WHERE IGR_GRUP_CODI=" . $data["gru_codi"] ;
      $execute = new  DataBase();
      $result= $execute->executeArraySql($SQL);     
      if ($result!=null)
      {
          echo json_encode("existen investigadores");
          return;      
      }

      $SQL ="SELECT *
      FROM sgi_grup_semi 
      WHERE sgr_grup_codi=" .  $data["gru_codi"] ;
        $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);     
        if ($result!=null)
        {
            echo json_encode("existen semilleros");
            return;      
        }

        $SQL ="SELECT  *
        FROM sgi_grup_proy 
        WHERE id_grup=" .   $data["gru_codi"] ;  
        $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);     
        if ($result!=null)
        {
            echo json_encode("existen productos");
            return;      
        }
      
        
        $SQL ="SELECT * FROM sgi_plnt_grup WHERE pgr_grup_codi=" .  $data["gru_codi"] ;  
        $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);     
        if ($result!=null)
        {
            echo json_encode("existe plan de trabajo");
            return;      
        }
      

      $SQL ="DELETE FROM sgi_grup  WHERE gru_codi=" . $data["gru_codi"] ;            
  
      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>