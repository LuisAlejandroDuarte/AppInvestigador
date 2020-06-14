
<?php

define('DB_SERVER','localhost');
define('DB_NAME','grupogua_investigador');
define('DB_USER','grupogua_jmedicru');
define('DB_PASS','MbCj199803#');


//  define('DB_SERVER','localhost');
//  define('DB_NAME','id13950393_grupogua_investigador');
//  define('DB_USER','id13950393_grupogua_jmedicru');
//  define('DB_PASS','Lu1s@lejandr0');

 class DataBase {

  private static $db;
  private $connection;



  public function executeSql($sql)
  {       
    $this->connection = new mysqli(DB_SERVER ,DB_USER ,DB_PASS ,DB_NAME);
    $resultArray = array(); 

    $resultado = mysqli_query($this->connection,$sql);

    if (mysqli_num_rows($resultado)==0 )                        
       $resultArray=null;                                                            
    else
    {  
      if (mysqli_num_rows($resultado)==1 )                        
          $resultArray=mysqli_fetch_assoc($resultado);                                                            
    }
    
    $this->connection->close();
    return $resultArray;
  }    
  
  public function executeArraySql($sql)
  {       
    $this->connection = new mysqli(DB_SERVER ,DB_USER ,DB_PASS ,DB_NAME);
    $resultArray = array(); 

    $resultado = mysqli_query($this->connection,$sql);

    if (mysqli_num_rows($resultado)==0 )                        
       $resultArray=null;                                                            
    else
    
    {
      while ($tuple= mysqli_fetch_assoc($resultado)) {                        
            $resultArray[] = $tuple;         
        }                     
    }
    $this->connection->close();
    return $resultArray;
  }   

  public function executeInsertSql($sql,$id=false)
  {       
    $this->connection = new mysqli(DB_SERVER ,DB_USER ,DB_PASS ,DB_NAME);
    $resultArray = array(); 

    $resultado = mysqli_query($this->connection,$sql);
     
    
    if($id==true)   $resultado  = mysqli_insert_id($this->connection);
   
    $this->connection->close();
    return $resultado;
  }    

  public function executeUpdateDeleteSql($sql)
  {       
    $this->connection = new mysqli(DB_SERVER ,DB_USER ,DB_PASS ,DB_NAME);
    $resultArray = array(); 

    $resultado = mysqli_query($this->connection,$sql);
          
   
    $this->connection->close();
    return $resultado;
  }    


 }

?>