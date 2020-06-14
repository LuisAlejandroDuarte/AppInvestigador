<?php
  set_time_limit(0);
  require_once("../database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 
  
  if (isset($data["PAS_FECH_TERM"])==null)
    {
      $SQL ="UPDATE sgi_semi set SEM_NOMB = '" . $data["SEM_NOMB"] . "', SEM_FECH_INI ='" . str_replace('Z','',$data["SEM_FECH_INI"]) . "',
      SEM_FECH_TERM =null,SEM_AVAL=" . $data["SEM_AVAL"] . ",
      SEM_MISI =  '" . $data["SEM_MISI"] . "',SEM_VISI='" . $data["SEM_VISI"] . "',SEM_OBJG='" . $data["SEM_OBJG"] . "',
      SEM_TEMA_INVE ='" . $data["SEM_TEMA_INVE"] . "',SEM_PRPR_ESPE ='" . $data["SEM_PRPR_ESPE"] . "',
      SEM_OBJE ='" . $data["SEM_OBJE"] . "',SEM_PROP_ACTU = '" . $data["SEM_PROP_ACTU"] . "',
      SEM_PERT_CADE ='" . $data["SEM_PERT_CADE"] . "',SEM_ARTI_LINE ='" . $data["SEM_ARTI_LINE"] . "',
      SEM_PROY_REGI ='" . $data["SEM_PROY_REGI"] . "',SEM_ESTR_FINA ='" . $data["SEM_ESTR_FINA"] . "',
      SEM_ESTR_KNOW ='" . $data["SEM_ESTR_KNOW"] . "',SEM_ESTR_ELAB_PROD ='" . $data["SEM_ESTR_ELAB_PROD"] . "',
      SEM_ESTR_EXTE ='" . $data["SEM_ESTR_EXTE"] . "',SEM_ESTR_VINC_ESTU ='" . $data["SEM_ESTR_VINC_ESTU"] . "',
      SEM_ALIA_CONV ='" . $data["SEM_ALIA_CONV"] . "'  WHERE SEM_CODI = " . $data["SEM_CODI"] ;
      
    }
    else
    {      

      $SQL ="UPDATE sgi_semi set SEM_NOMB = '" . $data["SEM_NOMB"] . "', SEM_FECH_INI ='" . str_replace('Z','',$data["SEM_FECH_INI"]) . "',
      SEM_FECH_TERM ='" . str_replace('Z','',$data["PAS_FECH_TERM"])  . "',SEM_AVAL=" . $data["SEM_AVAL"] . ",
      SEM_MISI =  '" . $data["SEM_MISI"] . "',SEM_VISI='" . $data["SEM_VISI"] . "',SEM_OBJG='" . $data["SEM_OBJG"] . "',
      SEM_TEMA_INVE ='" . $data["SEM_TEMA_INVE"] . "',SEM_PRPR_ESPE ='" . $data["SEM_PRPR_ESPE"] . "',
      SEM_OBJE ='" . $data["SEM_OBJE"] . "',SEM_PROP_ACTU = '" . $data["SEM_PROP_ACTU"] . "',
      SEM_PERT_CADE ='" . $data["SEM_PERT_CADE"] . "',SEM_ARTI_LINE ='" . $data["SEM_ARTI_LINE"] . "',
      SEM_PROY_REGI ='" . $data["SEM_PROY_REGI"] . "',SEM_ESTR_FINA ='" . $data["SEM_ESTR_FINA"] . "',
      SEM_ESTR_KNOW ='" . $data["SEM_ESTR_KNOW"] . "',SEM_ESTR_ELAB_PROD ='" . $data["SEM_ESTR_ELAB_PROD"] . "',
      SEM_ESTR_EXTE ='" . $data["SEM_ESTR_EXTE"] . "',SEM_ESTR_VINC_ESTU ='" . $data["SEM_ESTR_VINC_ESTU"] . "',
      SEM_ALIA_CONV ='" . $data["SEM_ALIA_CONV"] . "'  WHERE SEM_CODI = " . $data["SEM_CODI"] ;    
    }

      $execute = new  DataBase();
      $result= $execute->executeUpdateDeleteSql($SQL);        
      echo json_encode($result);      
    
    
 ?>