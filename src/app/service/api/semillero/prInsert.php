<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 


  $SQL ="INSERT INTO sgi_semi (SEM_NOMB,SEM_INV_CODI,SEM_AVAL,SEM_FECH_INI,SEM_MISI,SEM_VISI,SEM_OBJG,SEM_TEMA_INVE,SEM_PRPR_ESPE,
      SEM_OBJE,SEM_PROP_ACTU,SEM_PERT_CADE,SEM_ARTI_LINE,SEM_PROY_REGI,SEM_ESTR_FINA,SEM_ESTR_KNOW,SEM_ESTR_ELAB_PROD,
      SEM_ESTR_EXTE,SEM_ESTR_VINC_ESTU,SEM_ALIA_CONV) VALUES ('" . $data["SEM_NOMB"] . "'," . $data["SEM_INV_CODI"] . ",
      " . $data["SEM_AVAL"] . ",'" . str_replace('Z','',$data["SEM_FECH_INI"]) . "',
      '" . $data["SEM_MISI"] . "','" . $data["SEM_VISI"] . "',
      '" . $data["SEM_OBJG"] . "','" . $data["SEM_TEMA_INVE"] . "','" . $data["SEM_PRPR_ESPE"] . "','" . $data["SEM_OBJE"] . "',
      '" . $data["SEM_PROP_ACTU"] . "','" . $data["SEM_PERT_CADE"] . "','" . $data["SEM_ARTI_LINE"] . "','" . $data["SEM_PROY_REGI"] . "',
      '" . $data["SEM_ESTR_FINA"] . "','" . $data["SEM_ESTR_KNOW"] . "','" . $data["SEM_ESTR_ELAB_PROD"] . "','" . $data["SEM_ESTR_EXTE"] . "',
      '" . $data["SEM_ESTR_VINC_ESTU"] . "','" . $data["SEM_ALIA_CONV"] . "')";


      $execute = new  DataBase();
      $result= $execute->executeInsertSql($SQL,true);        
      echo json_encode($result);      
    
    
 ?>