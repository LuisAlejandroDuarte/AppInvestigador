<?php
  set_time_limit(0);
  require_once("database.php");  
  header("Access-Control-Allow-Methods: PUT, GET, POST");
  $data= json_decode(file_get_contents("php://input"),TRUE); 

  if ($data!=null)
  {
    foreach($data as $item)
    {
      $valor =$item;

      if ($item['seleccionado']==true)
      {
        $SQL ="INSERT INTO sgi_nive_inve (NIN_INV_CODI,NIN_NIV_CODI,NIN_TITU_OBTE, NIN_INST,NIN_AGNO)  VALUES 
        (" . $item['NIN_INV_CODI'] . ", " . $item['NIN_NIV_CODI'] . ",' "  . $item['NIN_TITU_OBTE'] . "',
        '"  . $item['NIN_INST'] . "'," . $item['NIN_AGNO'] . ")";

        $execute = new  DataBase();
          $result= $execute->executeInsertSql($SQL);     
      }
    }
    echo json_encode($result); 
  } 
  else
  {
    if ($_GET["id"]!=null)
    {
      $SQL="SELECT * FROM sgi_nive_inve WHERE NIN_INV_CODI=" . $_GET["id"];
      $execute = new  DataBase();
      $result= $execute->executeArraySql($SQL);
      
      echo json_encode($result); 
      return;     
    }
  }




     

 ?>