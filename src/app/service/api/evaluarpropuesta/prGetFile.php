<?php

require_once("../database.php");  
$data= json_decode(file_get_contents("php://input"),TRUE); 
 $path = $data['PCJU_EVAL_PROP_LINK'];
 $response = array();
 $upload_dir = $_SERVER['DOCUMENT_ROOT'] .'/AppInvestigador/Eval/' . $path;
 $server_url ="http://" .  $_SERVER['SERVER_NAME'] . '/AppInvestigador/Eval/' . $path;
 
 echo json_encode($server_url);
 


?>