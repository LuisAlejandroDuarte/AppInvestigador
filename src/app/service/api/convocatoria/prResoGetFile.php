<?php

require_once("../database.php");  
$data= json_decode(file_get_contents("php://input"),TRUE); 
 $path = $data['CON_RESO'];
 $response = array();
 $upload_dir = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigador/Reso/' . $path;
 $server_url ="http://" .  $_SERVER['SERVER_NAME'] . '/AppInvestigador/Reso/' . $path;
 
 echo json_encode($server_url);
 


?>