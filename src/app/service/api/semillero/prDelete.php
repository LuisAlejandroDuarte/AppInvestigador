<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  $execute = new  DataBase();          
      $SQL ="SELECT *
      FROM sgi_line_inve_semi 
      WHERE LIS_SEMI_CODI=" . $data["SEM_CODI"] ;  
       
      $result= $execute->executeArraySql($SQL);     
      if ($result!=null)
      {
          echo json_encode("existen líneas de investigación");
          return;      
      }


      $SQL ="SELECT *
      FROM sgi_inve_semi
      WHERE INS_SEMI_CODI ="  . $data["SEM_CODI"] ;          
      
      $result= $execute->executeArraySql($SQL);     
      if ($result!=null)
      {
          echo json_encode("existen integrantes");
          return;      
      }

      $SQL ="SELECT *
         from sgi_prog_acad_semi 
      WHERE PAS_SEMI_CODI ="  . $data["SEM_CODI"] ;        
      
      $result= $execute->executeArraySql($SQL);     
      if ($result!=null)
      {
          echo json_encode("existen programas académicos");
          return;      
      }

      $SQL ="SELECT *
       from  sgi_proy_prod_semi
        WHERE PPR_SEMI_CODI =" .  $data["SEM_CODI"] ;        
      
       $result= $execute->executeArraySql($SQL);     
       if ($result!=null)
       {
           echo json_encode("existen proyectos y productos");
           return;      
       }
       

      $SQL ="SELECT * FROM sgi_docu_semi WHERE DSEM_SEM_CODI =" . $data["SEM_CODI"] ;           
      
      $result= $execute->executeArraySql($SQL);     
      if ($result!=null)
      {
          echo json_encode("existen documentos");
          return;      
      }


      $SQL ="SELECT * FROM sgi_grup_semi WHERE sgr_semi_codi  =" . $data["SEM_CODI"] ;           
      
      $result= $execute->executeArraySql($SQL);     
      if ($result!=null)
      {
          echo json_encode("existen en grupos");
          return;      
      }


      $SQL ="DELETE FROM sgi_semi  WHERE 	SEM_CODI=" . $data["SEM_CODI"] ;            
  
      
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>