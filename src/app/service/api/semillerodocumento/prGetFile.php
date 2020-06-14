<?php

require_once("../database.php");  
$data= json_decode(file_get_contents("php://input"),TRUE); 
 $path = $data['DSEM_PATH'];
 $response = array();
 $upload_dir = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigador/DS/' . $path;
 $server_url ="http://" .  $_SERVER['SERVER_NAME'] . '/AppInvestigador/DS/' . $path;;
 
 echo json_encode($server_url);
 


?>