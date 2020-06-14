
<?php
  set_time_limit(0);
  require_once("../database.php");  
 

  $Accion = $_GET['accion'];  

    if ($Accion=='all')
    {
      $SQL ="SELECT PPS.PPR_CODI,PPS.PPR_SEMI_CODI,PPS.PPR_INVE_CODI,
        PPS.PPR_PROY_CODI,PPS.PPR_PROD_CODI,PPS.PPR_EPD_CODI,PPS.PPR_EPY_CODI,
        PPS.PPR_FECH_INIC,PPS.PPR_FECH_TERM, CONCAT(I.INV_NOMB,' ',I.INV_APEL) AS nombreInvestigador,
        PY.PRO_NOMB AS nombreProyecto,PD.Nombre AS nombreProducto,
        EY.ESPROYS_NOMB AS nombreEstadoProyecto, EP.ESPRODS_NOMB AS nombreEstadoProducto
         from  sgi_proy_prod_semi AS PPS
      INNER JOIN sgi_inve AS I ON I.INV_CODI=PPS.PPR_INVE_CODI
      INNER JOIN sgi_semi AS S ON S.SEM_CODI=PPS.PPR_SEMI_CODI
      INNER JOIN sgi_proy AS PY ON PY.PRO_CODI=PPS.PPR_PROY_CODI
      INNER JOIN sgi_prod AS PD ON PD.id=PPS.PPR_PROD_CODI
      INNER JOIN sgi_esproy_semi AS EY ON EY.ESPROYS_CODI =PPS.PPR_EPY_CODI
      INNER JOIN sgi_esprod_semi AS EP ON EP.ESPRODS_CODI =PPS.PPR_EPD_CODI
      WHERE PPS.PPR_SEMI_CODI =" . $_GET["idSemillero"] ;
      $execute = new  DataBase();
        $result= $execute->executeArraySql($SQL);        
        echo json_encode($result);      
    }

    if ($Accion=='select')
    {
      $SQL ="SELECT PPS.PPR_CODI,PPS.PPR_SEMI_CODI,PPS.PPR_INVE_CODI,
      PPS.PPR_PROY_CODI,PPS.PPR_PROD_CODI,PPS.PPR_EPD_CODI,PPS.PPR_EPY_CODI,
      PPS.PPR_FECH_INIC,PPS.PPR_FECH_TERM, CONCAT(I.INV_NOMB,' ',I.INV_APEL) AS nombreInvestigador,
      PY.PRO_NOMB AS nombreProyecto,PD.Nombre AS nombreProducto,
      EY.ESPROYS_NOMB AS nombreEstadoProyecto, EP.ESPRODS_NOMB AS nombreEstadoProducto
       from  sgi_proy_prod_semi AS PPS
    INNER JOIN sgi_inve AS I ON I.INV_CODI=PPS.PPR_INVE_CODI
    INNER JOIN sgi_semi AS S ON S.SEM_CODI=PPS.PPR_SEMI_CODI
    INNER JOIN sgi_proy AS PY ON PY.PRO_CODI=PPS.PPR_PROY_CODI
    INNER JOIN sgi_prod AS PD ON PD.id=PPS.PPR_PROD_CODI
    INNER JOIN sgi_esproy_semi AS EY ON EY.ESPROYS_CODI =PPS.PPR_EPY_CODI
    INNER JOIN sgi_esprod_semi AS EP ON EP.ESPRODS_CODI =PPS.PPR_EPD_CODI
   WHERE PPS.PPR_CODI =" . $_GET["id"] ;
      $execute = new  DataBase();
        $result= $execute->executeSql($SQL);        
        echo json_encode($result);      
    }
 ?>