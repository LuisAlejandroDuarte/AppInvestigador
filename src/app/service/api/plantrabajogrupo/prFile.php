<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: PUT, GET, POST");
require_once("../database.php");  
 $Id = json_decode($_POST['pgr_plnt_codi']);
 $response = array();

 if (!file_exists($_SERVER['DOCUMENT_ROOT'] .'/AppInvestigador/PlanTrabajo/')) {
    mkdir($_SERVER['DOCUMENT_ROOT'] .'/AppInvestigador/PlanTrabajo/', 0777, true);
}

 $upload_dir = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigador/PlanTrabajo/';
 $server_url =  $_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'];

 if($_FILES['PLAN'])
 {
  $foto_name = $_FILES["PLAN"]["name"];
  $foto_tmp_name = $_FILES["PLAN"]["tmp_name"];
  $error = $_FILES["PLAN"]["error"];

  if($error > 0){
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "Error al subir la foto!"
    );

  

    echo json_encode($response);      
}
else 
{
    $random_name = $Id . "_" . rand(1000,1000000) . "." . substr($foto_name,strpos($foto_name,".")+1);
    $upload_name = $upload_dir.strtolower($random_name);
    $upload_name = preg_replace('/\s+/', '-', $upload_name);

    if(move_uploaded_file($foto_tmp_name , $upload_name)) {
        $response = array(
            "status" => "success",
            "error" => false,
            "message" => "",
            "url" => $server_url."/".$upload_name
          );

          $SQL="UPDATE  sgi_plnt_grup set pgr_path='" . $random_name . "' WHERE pgr_plnt_codi =" . $Id;

          $execute = new  DataBase();
          $result= $execute->executeUpdateDeleteSql($SQL);

          echo json_encode($response);      
    }else
    {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
        echo json_encode($response);      
    }
   }

 }
 else
 {

 }

 


?>