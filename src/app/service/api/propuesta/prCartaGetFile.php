<?php

require_once("../database.php");  
$data= json_decode(file_get_contents("php://input"),TRUE); 
 $path = $data['PRO_LINK_CVLA'];
 $response = array();
 $upload_dir = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigador/Carta/' . $path;
 $server_url ="http://" .  $_SERVER['SERVER_NAME'] . '/AppInvestigador/Carta/' . $path;;
 
 echo json_encode($server_url);
 


?>