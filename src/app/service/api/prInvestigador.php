<?php
  set_time_limit(0);
  require_once("database.php");  
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  $Accion = $data['accion'];  
    
    if ($Accion=="login")
    {
        $SQL="SELECT u.use_codi,u.use_cod_tipo,i.inv_codi FROM sgi_user As u INNER JOIN sgi_inve As i on u.use_codi=i.inv_codi_usua WHERE u.USE_USUA = '" . $data['use_usua'] . "' AND u.USE_CLAV='" . $data['use_clav'] . "'";

        $execute = new  DataBase();
        $result= $execute->executeSql($SQL);
        
        echo json_encode($result);      
        return;
    }

    if ($Accion=='listTipoDocumento')
    {
      $SQL ="SELECT * from sgi_tipo_docu";
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);
        
        echo json_encode($result); 
        return;     
    }

    if ($Accion=="GET")
    {
        $SQL="SELECT * FROM  sgi_inve   WHERE inv_codi = " . $data['INV_CODI'] ;

        $execute = new  DataBase();
        $result= $execute->executeSql($SQL);
        
        echo json_encode($result);      
        return;
    }

    if ($Accion=="ALL")
    {
        $SQL="SELECT INV_NOMB,INV_APEL,INV_CODI FROM  sgi_inve ";

        $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);
        
        echo json_encode($result);      
        return;
    }


    if ($Accion=="InsertData")
    {
      $x=$data['INV_TICA_CODI']==null? null: $data['INV_TICA_CODI'];

      $SQL="UPDATE sgi_inve set  INV_TIPO_DOCU_CODI=" . $data['INV_TIPO_DOCU_CODI'] . ",
           INV_NOMB ='" . $data['INV_NOMB'] . "',
           INV_APEL ='" . $data['INV_APEL'] . "',
           INV_FECH_NACI ='" .  str_replace('Z','',$data['INV_FECH_NACI']) . "',
           INV_TELE_CELU ='" . $data['INV_TELE_CELU'] . "',
           INV_MAIL='" . $data['INV_MAIL'] . "',
           INV_CENT_CODI=" . $data['INV_CENT_CODI'] . ",
           INV_PROG_ACAD_CODI=" . $data['INV_PROG_ACAD_CODI'] . ",
           INV_LINK_CVLA='" . $data['INV_LINK_CVLA'] . "',
           INV_TICA_CODI=" . $x . "
           WHERE INV_CODI = " . $data['INV_CODI'] ;

           $execute = new  DataBase();
           $result= $execute->executeUpdateDeleteSql($SQL);
           
           echo json_encode($result);      
           return;           
    }

    if ($Accion=="deleteFoto")
    {
    

      $SQL="UPDATE sgi_inve set  inv_foto=null
           WHERE INV_CODI = " . $data['INV_CODI'] ;

           $execute = new  DataBase();
           $result= $execute->executeUpdateDeleteSql($SQL);
           
           echo json_encode($result);      
           return;           
    }

    if ($Accion=="Foto")
    {

      if (file_exists($_SERVER['DOCUMENT_ROOT'] .'/AppInvestigador/Fotos/')) {
      
      

      $upload_dir = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigador/Fotos/';
      $server_url =  $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] .'/AppInvestigador/Fotos/';
      $SQL="SELECT   inv_foto FROM sgi_inve
           WHERE INV_CODI = " . $data['INV_CODI'] ;

           $execute = new  DataBase();
           $result= $execute->executeSql($SQL);
           
           if ($result['inv_foto']!=null)
           {
            $img_src = $upload_dir . $result['inv_foto'];
           $imgbinary = fread(fopen($img_src, "r"), filesize($img_src));
           $img_str = base64_encode($imgbinary);
          
            header("Content-Type: text/plain");
            echo json_encode($img_str);
           }     
           else
            echo '';

            
           return;   
      }     
      else
      return null;   
    }

    if ($Accion=="CENTRO")
    {
      $SQL="SELECT CEN_NOMB FROM sgi_cent WHERE CEN_CODI=" . $data["INV_CENT_CODI"];
      $execute = new  DataBase();
      $result= $execute->executeSql($SQL);
      
      echo json_encode($result);      
      return;
    }
    
    if ($Accion=="ZONA")
    {
      $SQL="SELECT Z.ZON_NOMB FROM sgi_cent As C INNER JOIN sgi_zona AS Z ON C.CEN_ZONA_CODI=Z.ZON_CODI  
        WHERE C.CEN_CODI=" . $data["INV_CENT_CODI"];
      $execute = new  DataBase();
      $result= $execute->executeSql($SQL);
      
      echo json_encode($result);      
      return;
    }



    if ($Accion=="PROGRAMA")
    {
      $SQL="SELECT PAC_NOMB FROM  sgi_prog_acad WHERE PAC_CODI=" . $data["INV_PROG_ACAD_CODI"];
      $execute = new  DataBase();
      $result= $execute->executeSql($SQL);
      
      echo json_encode($result);      
      return;
    }
    
    if ($Accion=="ESCUELA")
    {
      $SQL="SELECT E.ESC_NOMB FROM sgi_prog_acad As P INNER JOIN sgi_escu AS E ON P.PAC_ESCU_CODI=E.ESC_CODI  
        WHERE P.PAC_CODI=" . $data["INV_PROG_ACAD_CODI"];
      $execute = new  DataBase();
      $result= $execute->executeSql($SQL);
      
      echo json_encode($result);      
      return;
    }

 ?>
