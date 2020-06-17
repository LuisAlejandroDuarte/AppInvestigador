-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2020 a las 19:20:15
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `grupogua_investigador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_agno`
--

CREATE TABLE `sgi_agno` (
  `AGN_CODI` int(11) NOT NULL,
  `AGN_DESC` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_agno`
--

INSERT INTO `sgi_agno` (`AGN_CODI`, `AGN_DESC`) VALUES
(2000, '2000'),
(2001, '2001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_area`
--

CREATE TABLE `sgi_area` (
  `ARE_CODI` int(11) NOT NULL,
  `ARE_NOMB` varchar(45) NOT NULL,
  `ARE_GRAN_AREA_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_area`
--

INSERT INTO `sgi_area` (`ARE_CODI`, `ARE_NOMB`, `ARE_GRAN_AREA_CODI`) VALUES
(0, 'AREA1', 1),
(2, 'AREA2', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_atrib`
--

CREATE TABLE `sgi_atrib` (
  `ATR_CODI` int(11) NOT NULL,
  `ATR_DESC` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_atrib`
--

INSERT INTO `sgi_atrib` (`ATR_CODI`, `ATR_DESC`) VALUES
(1, 'PROBLEMATICA'),
(2, 'JUSTIFICACION');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_cent`
--

CREATE TABLE `sgi_cent` (
  `CEN_CODI` int(11) NOT NULL,
  `CEN_NOMB` varchar(25) DEFAULT NULL,
  `CEN_ZONA_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_cent`
--

INSERT INTO `sgi_cent` (`CEN_CODI`, `CEN_NOMB`, `CEN_ZONA_CODI`) VALUES
(1, 'CCAV VALLEDUPAR', 1),
(2, 'CEAD BARRANQUILLA', 1),
(3, 'CCAV CARTAGENA', 1),
(4, 'CEAD SANTA MARTA', 1),
(5, 'CCAV SAHAGUN', 1),
(6, 'CCAV COROZAL', 1),
(7, 'CEAD LA GUAJIRA', 1),
(8, 'CEAD MEDELLIN', 2),
(9, 'CCAV EJE CAFETERO', 2),
(10, 'CCAV QUIBDO', 2),
(11, 'CEAD LA DORADA', 2),
(12, 'CEAD TURBO', 2),
(13, 'CEAD MALAGA', 3),
(14, 'CEAD BUCARAMANGA', 3),
(15, 'CEAD PAMPLONA', 3),
(16, 'CEAD VELEZ', 3),
(17, 'UDR CUCUTA', 3),
(18, 'CEAD OCANA', 3),
(19, 'UDR BARRANCABERMEJA', 3),
(20, 'CEAD TUNJA', 4),
(21, 'CEAD DUITAMA', 4),
(22, 'CEAD SOGAMOSO', 4),
(23, 'CEAD CHIQUINQUIRA', 4),
(24, 'CEAD SOATA', 4),
(25, 'CEAD CUBARA', 4),
(26, 'CEAD BOAVITA', 4),
(27, 'CEAD GARAGOA', 4),
(28, 'CEAD SOCHA', 4),
(29, 'UDR CALI', 6),
(30, 'CEAD PALMIRA', 6),
(31, 'CERES MONTERILLA', 6),
(32, 'CEAD PASTO', 6),
(33, 'CERES EL BORDO - PATIA', 6),
(34, 'CEAD POPAYAN', 6),
(35, 'CEAD SANTANDER QUILICHAO', 6),
(36, 'UDR TUMACO', 6),
(37, 'CERES VALLE DEL GUAMUEZ', 6),
(38, 'CEAD ARBELAEZ', 5),
(39, 'CEAD JOSE ACEVEDO GOMEZ', 5),
(40, 'CEAD FACATATIVA', 5),
(41, 'CEAD GACHETA', 5),
(42, 'CEAD GIRARDOT', 5),
(43, 'CCAV ZIPAQUIRA', 5),
(44, 'CEAD PITALITO', 7),
(45, 'CERES SAN VICENTE DEL CAG', 7),
(46, 'CEAD IBAGUE', 7),
(47, 'CCAV NEIVA', 7),
(48, 'CEAD FLORENCIA', 7),
(49, 'CERES LA PLATA', 7),
(50, 'CERES MARIQUITA', 7),
(51, 'CERES LIBANO', 7),
(52, 'CEAD SAN JOSE DEL GUAVIAR', 8),
(53, 'UDR LETICIA', 8),
(54, 'CERES QUIRON DE CUMARAL', 8),
(55, 'CEAD ACACIAS', 8),
(56, 'CEAD GUAINIA', 8),
(57, 'CEAD PUERTO CARRENO', 8),
(58, 'CEAD YOPAL', 8),
(99, 'N/A', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_conv`
--

CREATE TABLE `sgi_conv` (
  `CON_CODI` int(11) NOT NULL,
  `CON_NUME` varchar(6) NOT NULL,
  `CON_DESC` varchar(45) NOT NULL,
  `CON_TEXT` varchar(300) DEFAULT NULL,
  `CON_TEXT_NOMB` varchar(100) DEFAULT NULL,
  `CON_RESO` varchar(300) DEFAULT NULL,
  `CON_RESO_NOMB` varchar(100) DEFAULT NULL,
  `CON_FECH_INIC` date DEFAULT NULL,
  `CON_FECH_FINA` date DEFAULT NULL,
  `CON_TIPO_CONV_CODI` int(11) NOT NULL,
  `CON_PUNT_TOTA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_conv`
--

INSERT INTO `sgi_conv` (`CON_CODI`, `CON_NUME`, `CON_DESC`, `CON_TEXT`, `CON_TEXT_NOMB`, `CON_RESO`, `CON_RESO_NOMB`, `CON_FECH_INIC`, `CON_FECH_FINA`, `CON_TIPO_CONV_CODI`, `CON_PUNT_TOTA`) VALUES
(142, '999', 'Desc', NULL, NULL, NULL, NULL, '2016-07-29', '2016-07-29', 1, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_conv_para`
--

CREATE TABLE `sgi_conv_para` (
  `PCO_CONV_CODI` int(11) NOT NULL,
  `PCO_PARA_CODI` int(11) NOT NULL,
  `PCO_VALO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_esca_eval`
--

CREATE TABLE `sgi_esca_eval` (
  `EEV_CODI` int(11) NOT NULL,
  `EEV_CALI` int(11) NOT NULL,
  `EEV_PARA_EVAL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_esca_eval`
--

INSERT INTO `sgi_esca_eval` (`EEV_CODI`, `EEV_CALI`, `EEV_PARA_EVAL`) VALUES
(1, 5, 1),
(2, 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_escu`
--

CREATE TABLE `sgi_escu` (
  `ESC_CODI` int(11) NOT NULL,
  `ESC_NOMB` varchar(45) NOT NULL,
  `ESC_SIGL` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_escu`
--

INSERT INTO `sgi_escu` (`ESC_CODI`, `ESC_NOMB`, `ESC_SIGL`) VALUES
(1, 'Ciencias Basicas, Tecnologia e Ingenieria', 'ECBTI'),
(2, 'Ciencias Contables, economicas y negocios', 'ECACEN'),
(3, 'Agrarias y del medio ambiente', 'ECAPMA'),
(4, 'Educacion', 'ECEDU'),
(5, 'Salud', 'ECISALUD'),
(6, 'Sociales, artes y humanidades', 'ECSAH'),
(9, 'EXTERNO', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_esprod_semi`
--

CREATE TABLE `sgi_esprod_semi` (
  `ESPRODS_CODI` int(11) NOT NULL,
  `ESPRODS_NOMB` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_esprod_semi`
--

INSERT INTO `sgi_esprod_semi` (`ESPRODS_CODI`, `ESPRODS_NOMB`) VALUES
(1, 'INICIO'),
(2, 'EN EJECUCION'),
(3, 'TERMINADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_esproy_semi`
--

CREATE TABLE `sgi_esproy_semi` (
  `ESPROYS_CODI` int(11) NOT NULL,
  `ESPROYS_DESC` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_esproy_semi`
--

INSERT INTO `sgi_esproy_semi` (`ESPROYS_CODI`, `ESPROYS_DESC`) VALUES
(1, 'INICIO'),
(2, 'EN EJECUCION'),
(3, 'TERMINADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_gran_area`
--

CREATE TABLE `sgi_gran_area` (
  `GAR_CODI` int(11) NOT NULL,
  `GAR_NOMB` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_gran_area`
--

INSERT INTO `sgi_gran_area` (`GAR_CODI`, `GAR_NOMB`) VALUES
(1, 'Área '),
(3, 'wqds'),
(4, 'rere'),
(5, 'ytyt'),
(6, 'gfdgfgfgf'),
(32, 'gfgf'),
(65, 'ytyt'),
(90, 'hjhjh'),
(890, 'tyjuyikuy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_grup`
--

CREATE TABLE `sgi_grup` (
  `gru_codi` int(11) NOT NULL,
  `gru_codi_colc` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `gru_colc_codi` varchar(15) COLLATE utf8_bin DEFAULT NULL,
  `gru_nomb` varchar(45) COLLATE utf8_bin NOT NULL,
  `gru_inv_codi` int(11) DEFAULT NULL,
  `gru_mess_codi` int(11) DEFAULT NULL,
  `gru_area_codi` int(11) NOT NULL,
  `gru_agno_codi` int(11) DEFAULT NULL,
  `gru_cent_codi` int(11) NOT NULL,
  `gru_cate_colc` varchar(3) COLLATE utf8_bin DEFAULT NULL,
  `gru_aval_inst` tinyint(1) NOT NULL,
  `gru_fech_term` date DEFAULT NULL,
  `gru_fech_ini` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_grup`
--

INSERT INTO `sgi_grup` (`gru_codi`, `gru_codi_colc`, `gru_colc_codi`, `gru_nomb`, `gru_inv_codi`, `gru_mess_codi`, `gru_area_codi`, `gru_agno_codi`, `gru_cent_codi`, `gru_cate_colc`, `gru_aval_inst`, `gru_fech_term`, `gru_fech_ini`) VALUES
(1, '', 'COD COL', 'GRUPO', NULL, NULL, 0, NULL, 2, 'CAT', 0, '0000-00-00', '2015-11-06'),
(2, '', '121343', 'GRUPO NUEEVO', NULL, NULL, 0, NULL, 2, '565', 0, '0000-00-00', '2016-02-01'),
(3, '', '132324', 'grupo2', NULL, NULL, 0, NULL, 2, '454', 0, '0000-00-00', '2016-02-01'),
(4, '', '4535435', 'qwertyu', NULL, NULL, 2, NULL, 3, 'trt', 0, '0000-00-00', '2016-02-14'),
(6, '', '1234324545', 'NUEVO GRUPO', NULL, NULL, 0, NULL, 3, 'rty', 0, '0000-00-00', '2016-02-09'),
(7, '', '456546', 'NUEVO GRUPO2', NULL, NULL, 2, NULL, 2, '767', 0, '0000-00-00', '2016-02-08'),
(8, '', '03234343', 'Grupo Nuevo', 4, NULL, 0, NULL, 2, 'Nue', 0, '0000-00-00', '2016-01-05'),
(9, '', '123', 'Investigadores UNAD', 4, NULL, 0, NULL, 14, 'B', 0, '0000-00-00', '2019-02-01'),
(10, '', '234567', 'GUANE', 4, NULL, 0, NULL, 3, 'A', 0, '0000-00-00', '2019-05-01'),
(11, '', '232323', 'GANE', 4, NULL, 0, NULL, 6, 'A', 0, '0000-00-00', '2019-05-01'),
(12, '', 'COL', 'NUEVO GRUPO2', 3, NULL, 2, NULL, 56, 'CIE', 1, '0000-00-00', '2020-08-03'),
(13, '', 'ccc', 'GRUPO NUEVOS', 3, NULL, 0, NULL, 8, 'sss', 1, '0000-00-00', '2020-05-20'),
(14, '', 'COL', 'GRUPO UCC', 3, NULL, 0, NULL, 4, 'CRE', 1, '0000-00-00', '2020-05-14'),
(15, '', 'xx', 'xxx', 3, NULL, 0, NULL, 3, 'xx', 0, '0000-00-00', '2020-05-07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_grup_line_inve`
--

CREATE TABLE `sgi_grup_line_inve` (
  `gli_codi` int(11) NOT NULL,
  `gli_grup_codi` int(11) NOT NULL,
  `gli_fech_inic` date DEFAULT NULL,
  `gli_fech_term` date DEFAULT NULL,
  `gli_line_inve_codi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_grup_line_inve`
--

INSERT INTO `sgi_grup_line_inve` (`gli_codi`, `gli_grup_codi`, `gli_fech_inic`, `gli_fech_term`, `gli_line_inve_codi`) VALUES
(2, 2, '2016-02-01', NULL, 1),
(3, 3, '2016-02-15', NULL, 1),
(25, 4, '2016-02-10', NULL, 1),
(59, 6, '2016-02-10', NULL, 1),
(75, 7, '2016-02-16', NULL, 1),
(76, 8, '2016-04-06', NULL, 1),
(77, 9, '2019-02-01', NULL, 10),
(78, 10, '2019-05-01', NULL, 10),
(79, 1, '2016-01-05', NULL, 1),
(80, 11, '2019-05-01', NULL, 38),
(107, 12, '2020-01-02', NULL, 1),
(108, 12, '2020-06-19', NULL, 4),
(110, 12, '2020-06-18', NULL, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_grup_proy`
--

CREATE TABLE `sgi_grup_proy` (
  `id` int(11) NOT NULL,
  `id_proy` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_grup` int(11) NOT NULL,
  `id_inve` int(11) NOT NULL,
  `fech_ini` date DEFAULT NULL,
  `fech_term` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_grup_proy`
--

INSERT INTO `sgi_grup_proy` (`id`, `id_proy`, `id_prod`, `id_grup`, `id_inve`, `fech_ini`, `fech_term`) VALUES
(5, 43, 146, 12, 3, '2020-09-25', NULL),
(6, 43, 147, 14, 3, '2020-06-18', '2020-06-27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_grup_semi`
--

CREATE TABLE `sgi_grup_semi` (
  `sgr_codi` int(11) NOT NULL,
  `sgr_grup_codi` int(11) NOT NULL,
  `sgr_semi_codi` int(11) NOT NULL,
  `sgr_fech_inic` date DEFAULT NULL,
  `sgr_fech_term` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_grup_semi`
--

INSERT INTO `sgi_grup_semi` (`sgr_codi`, `sgr_grup_codi`, `sgr_semi_codi`, `sgr_fech_inic`, `sgr_fech_term`) VALUES
(1, 2, 1, '2016-02-13', NULL),
(2, 3, 1, '2016-02-09', NULL),
(24, 4, 1, '2016-02-03', NULL),
(41, 6, 1, '2016-02-17', NULL),
(57, 7, 1, '2016-02-08', NULL),
(58, 8, 1, '2016-04-05', NULL),
(59, 10, 1, '2019-05-02', NULL),
(60, 11, 1, '2019-05-08', NULL),
(63, 12, 1, '2020-06-20', NULL),
(64, 14, 1, '2020-06-18', '2020-06-26'),
(65, 14, 1, '2020-06-10', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_inve`
--

CREATE TABLE `sgi_inve` (
  `INV_CODI` int(11) NOT NULL,
  `INV_IDEN` varchar(20) NOT NULL,
  `INV_TIPO_DOCU_CODI` int(11) NOT NULL,
  `INV_NOMB` varchar(25) NOT NULL,
  `INV_APEL` varchar(25) NOT NULL,
  `INV_LINK_CVLA` varchar(1000) DEFAULT NULL,
  `INV_FECH_NACI` date NOT NULL,
  `INV_CENT_CODI` int(11) DEFAULT NULL,
  `INV_PROG_ACAD_CODI` int(11) DEFAULT NULL,
  `INV_MAIL` varchar(30) DEFAULT NULL,
  `INV_TELE_CELU` varchar(20) DEFAULT NULL,
  `inv_foto` longtext DEFAULT NULL,
  `INV_USER` varchar(100) DEFAULT NULL,
  `INV_PASS` longtext NOT NULL,
  `INV_TIPO` int(11) DEFAULT NULL,
  `INV_CODI_USUA` int(11) NOT NULL,
  `INV_TICA_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_inve`
--

INSERT INTO `sgi_inve` (`INV_CODI`, `INV_IDEN`, `INV_TIPO_DOCU_CODI`, `INV_NOMB`, `INV_APEL`, `INV_LINK_CVLA`, `INV_FECH_NACI`, `INV_CENT_CODI`, `INV_PROG_ACAD_CODI`, `INV_MAIL`, `INV_TELE_CELU`, `inv_foto`, `INV_USER`, `INV_PASS`, `INV_TIPO`, `INV_CODI_USUA`, `INV_TICA_CODI`) VALUES
(3, '91294629', 1, 'Luis Alejandro', 'Duarte Martinez', 'http://scienti.colciencias.gov.co:8081/cvlac/', '1974-01-09', 1, 2, 'ladm4@hotmail.com', '3172191841', '3_348879.jpg', 'admin', '21232f297a57a5a743894a0e4a801fc3', NULL, 2, 1),
(4, '9999999', 1, 'Jose', 'Luis', 'scienti.colciencias.gov.co:8081/cvlac/', '0000-00-00', 2, 2, 'jluis@hotmail.com', '9212132323', '', NULL, '662eaa47199461d01a623884080934ab', NULL, 3, 0),
(5, '102525', 1, 'Juliana', 'García', 'scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000218480', '1993-02-02', 43, 49, 'juliana@unad.edu.co', '3587964', '', NULL, '86784bf64fb0f1354c231ae850569566', NULL, 5, 9),
(6, '002', 1, 'Mercedes', 'Serrano', 'mercedescvlac.com', '1980-05-19', 14, 28, 'mercedes.serrano@unad.edu.co', '3136985478', '', NULL, 'af9fad11d4c8083059f7399ef94f1894', NULL, 7, 2),
(7, '1098769514', 1, 'alejandra', 'duque', 'alejandracvlac.com', '1995-04-12', 14, 29, 'alejandraduque12@unad.edu.co', '3219044521', '', NULL, 'add60c75bfdb8a39b278eed93e09303e', NULL, 8, 3),
(8, '452369854', 1, 'martha', 'hernandez', 'scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000081233', '1982-03-02', 14, 28, 'martha@unad.edu.co', '5682356', '', NULL, '6fe5b9803a8f5225cc4afcc249bec81e', NULL, 9, 4),
(9, '005', 1, 'usuario_05', 'usuario_05', 'xxx', '1986-07-02', 3, 7, 'usuario_05@unad.edu.co', '0505', '', NULL, 'e00fbe374b983f60868f3574f1482b0c', NULL, 10, 1),
(10, '24833141', 1, 'Daemon', 'Rost', 'daemoncvlac.com', '1973-02-06', 14, 48, 'daemon.rost@unad.edu.co', '6972546', '', NULL, '1b677eb82368eacc723e06374213f528', NULL, 11, 2),
(11, '007', 1, 'Carlos', 'usuario_07', 'carloscvlac.com', '1963-05-16', 3, 28, 'cartagena.colombia@pesas.com', '318 71184525', '', NULL, '42310c808377daeeb29175e760eb64ae', NULL, 12, 0),
(12, '122345678', 1, 'usuario_08', 'usuario_08', 'scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000171786', '2000-05-16', 14, 50, 'usuario_08@unad.edu.co', '123456789', '', NULL, 'd53e544b51ff2c4aa6cebeead0df70f3', NULL, 13, 2),
(13, '13999999', 1, 'Jose', 'Ficticio', 'scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000568829', '1984-01-01', 14, 51, 'usuario_09@unad.edu.co', '6351062', '', NULL, '7b9dd06dc9b169372a40f2c0a1abad66', NULL, 14, 2),
(14, '010555', 2, 'tania', 'meneses', 'scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001136461', '1994-03-14', 14, 52, 'tania.meneses@unad.edu.co', '3162445259', '', NULL, '92811196e0a07492bcc62881bc1aa668', NULL, 15, 1),
(15, '011', 1, 'usuario_11', 'usuario_11', 'scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001486301', '2019-05-01', 14, 49, 'usuario_11@unad.edu.co', '1111', '', NULL, 'bba8b08f13bc7f31e4c66a9522c775af', NULL, 16, 2),
(16, '561478', 1, 'Fredy', 'lopez', 'scienti.colciencias.gov.co:8081/cvlac/visualizaer', '1982-07-11', 14, 44, 'pepito.perez@unad.edu.co', '6996633', '', NULL, 'b8effeeaaa71d16607f4101a1cc02cf1', NULL, 17, 1),
(17, '63217886', 1, 'Doris', 'Ardila', 'scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000269387', '2018-11-29', 14, 16, 'usuario_pedro@unad.edu.co', '6357587', '', NULL, '7ac17246f6b71007cd70fbb50462656f', NULL, 18, 2),
(18, '960115246', 1, 'Pepito Pérez', 'Pérez', 'scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0001473033', '2000-05-15', 14, 16, 'pepito.perez@unad.edu.co', '311222888', '', NULL, '703a2b65ba1275813107d13827b4183f', NULL, 19, 2),
(19, '015123456789', 1, 'usuario_15', 'usuario_15', 'usuario_cvlac.com', '1981-05-16', 14, 16, 'usuario_15@unad.edu.co', '015', '', NULL, '81e9574fde9d714764b06e04766f8dfa', NULL, 20, 2),
(20, '1093360421', 1, 'Maria', 'Perez', 'mariacvlac.com', '2019-05-01', 9, 49, 'maria2015@unad.edu.co', '6900560', '', NULL, '000368947e58678a335c0946d71a240a', NULL, 22, 9),
(21, '91279456', 1, 'Jorge Alberto', 'Gomez Serpa', 'file:///C:/Users/jorge.gomez/Documents/1111111111/CvLAC%20-%20Jorge%20Alberto%20Gómez%20Serpa%2022042019.pdf', '1971-07-19', 14, 16, 'jorge.gomez@unad.edu.co', '3015142690', '', NULL, '5af757641ff011132548dd6209d02bd8', NULL, 23, 2),
(22, '2015789', 1, 'Pepita', 'Perez', 'pepitaperezcvla.com', '2001-05-16', 3, 43, 'pepita_perez19@unad.edu.co', '3152480019', '', NULL, 'fe28880f08ad60374c1edc9fb348c8f6', NULL, 24, 1),
(23, '020', 1, 'Mario', 'Perez', 'pedroperez.cvlac.com', '1996-05-01', 10, 50, 'pedroperes@unad.edu.co', '3215698742', '', NULL, 'd15610948cf2806369a1312cfab2507d', NULL, 25, 10),
(24, '987412367', 1, 'Mickey', 'Mouse', 'mickeycvlac.com', '1995-05-16', 5, 31, 'usuario_21@unad.edu.co', '555-103256', '', NULL, '9cfd4d71fba9f709bae3b5b2473f1a7f', NULL, 26, 9),
(25, '022', 1, 'usuario_22', 'usuario_22', 'usuariocvlac.com', '2019-05-16', 14, 37, 'usuario_22@unad.edu.co', '022', '', NULL, '659ce1a246fe5a86b948de2753a4da03', NULL, 27, 2),
(26, '023', 1, 'usuario_23', 'usuario_23', NULL, '2019-05-16', NULL, NULL, 'usuario_23@unad.edu.co', '023', '', NULL, '377bfe6731b7c3f107a7a60904eb7e3c', NULL, 28, 0),
(27, '024', 1, 'usuario_24', 'usuario_24', NULL, '2019-05-16', NULL, NULL, 'usuario_24@unad.edu.co', '024', '', NULL, '44352f3ac31a2d604ee8bfec1368ddc5', NULL, 29, 0),
(28, '025', 1, 'usuario_25', 'usuario_25', NULL, '2019-05-16', NULL, NULL, 'usuario_25@unad.edu.co', '025', '', NULL, '896fa8fd5645b65320641012bc8de40e', NULL, 30, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_inve_grup`
--

CREATE TABLE `sgi_inve_grup` (
  `IGR_CODI` int(11) NOT NULL,
  `IGR_INVE_IDEN` int(11) NOT NULL,
  `IGR_GRUP_CODI` int(20) NOT NULL,
  `igr_line_inve_codi` int(11) DEFAULT NULL,
  `igr_regi_ingr` int(11) DEFAULT NULL,
  `IGR_FECH_INIC` date DEFAULT NULL,
  `IGR_FECH_TERM` date DEFAULT NULL,
  `IGR_TIPO_VINC_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_inve_grup`
--

INSERT INTO `sgi_inve_grup` (`IGR_CODI`, `IGR_INVE_IDEN`, `IGR_GRUP_CODI`, `igr_line_inve_codi`, `igr_regi_ingr`, `IGR_FECH_INIC`, `IGR_FECH_TERM`, `IGR_TIPO_VINC_CODI`) VALUES
(153, 9, 1, 3, 0, '2016-01-27', '2016-02-05', 1),
(154, 3, 2, NULL, NULL, '2016-02-01', NULL, 1),
(155, 9, 2, NULL, 1, '2016-02-08', NULL, 2),
(156, 3, 3, NULL, NULL, '2016-02-01', NULL, 1),
(157, 9, 3, NULL, 1, '2016-02-09', NULL, 3),
(158, 3, 4, NULL, NULL, '2016-02-15', NULL, 1),
(200, 6, 4, NULL, 1, '2016-02-09', NULL, 3),
(201, 9, 4, NULL, 1, '2016-02-15', NULL, 4),
(216, 9, 1, NULL, NULL, '2016-02-02', NULL, 1),
(218, 9, 1, NULL, 1, '2016-02-02', '2016-02-09', 1),
(228, 5, 1, NULL, 1, '2016-02-08', NULL, 2),
(229, 3, 1, NULL, 1, '2016-02-09', NULL, 3),
(230, 9, 6, NULL, NULL, '2016-02-10', NULL, 1),
(240, 7, 6, NULL, 1, '2016-02-09', NULL, 2),
(241, 3, 6, NULL, 1, '2016-02-10', NULL, 3),
(242, 9, 7, NULL, NULL, '2016-02-09', NULL, 1),
(258, 3, 7, NULL, 1, '2016-02-10', NULL, 3),
(260, 7, 8, NULL, 1, '2016-04-04', NULL, 4),
(261, 16, 9, NULL, NULL, '2019-02-01', NULL, 1),
(262, 16, 10, NULL, NULL, '2019-05-01', NULL, 1),
(263, 15, 10, NULL, 1, '2019-05-07', NULL, 4),
(264, 9, 11, NULL, NULL, '2019-05-01', NULL, 1),
(265, 5, 11, NULL, 1, '2019-05-15', NULL, 1),
(271, 7, 12, NULL, NULL, '2020-06-12', NULL, 3),
(272, 4, 14, NULL, NULL, '2020-06-17', '2020-06-26', 2),
(273, 11, 14, NULL, NULL, '2020-06-24', NULL, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_inve_semi`
--

CREATE TABLE `sgi_inve_semi` (
  `INS_CODI` int(11) NOT NULL,
  `INS_INVE_IDEN` int(11) NOT NULL,
  `ins_line_inve_codi` int(11) NOT NULL,
  `INS_SEMI_CODI` int(11) NOT NULL,
  `INS_FECH_INIC` date DEFAULT NULL,
  `INS_FECH_TERM` date DEFAULT NULL,
  `INS_TIPO_VINC_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_inve_semi`
--

INSERT INTO `sgi_inve_semi` (`INS_CODI`, `INS_INVE_IDEN`, `ins_line_inve_codi`, `INS_SEMI_CODI`, `INS_FECH_INIC`, `INS_FECH_TERM`, `INS_TIPO_VINC_CODI`) VALUES
(2, 9, 1, 1, '2016-01-20', '2016-02-04', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_line_inve`
--

CREATE TABLE `sgi_line_inve` (
  `lin_codi` int(11) NOT NULL,
  `lin_desc` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Primary Key';

--
-- Volcado de datos para la tabla `sgi_line_inve`
--

INSERT INTO `sgi_line_inve` (`lin_codi`, `lin_desc`) VALUES
(1, 'Comunicacion y Desarrollo'),
(2, 'Comunicacion y Redes Sociales'),
(3, 'Comunicacion, educacion y tecnologia'),
(4, 'Ciencia, tecnologia y sociedad'),
(5, 'Etica y politica'),
(6, 'Filososfia antigua'),
(7, 'PsicologiÂ­a y construccion de subjetividades'),
(8, 'Emprendimiento social'),
(9, 'Inteligencia competitiva'),
(10, 'Pymes'),
(11, 'Responsabilidad Social Sostenible y Competiti'),
(12, 'Mercadeo Prospectivo de Bienes y Servicios'),
(13, 'Gestion Prospectiva y Estrategica de la Organ'),
(14, 'Cadenas Productivas Agroindustriales'),
(15, 'Juego de Simulacion Gerencial'),
(16, 'Ambiente Laboral de las Organizaciones'),
(17, 'EconomiÂ­a Soc Org Comunitarias'),
(18, 'Gestion Publica'),
(19, 'Estrategias de Internacionalizacion de Empres'),
(20, 'Argumentacion, pedagogia y aprendizaje'),
(21, 'Educacion y desarrollo humano'),
(22, 'Etnoducacion cultura y comunicacion'),
(23, 'Bilinguismo en la educacion a distancia media'),
(24, 'Infancias, Educacion y Diversidad'),
(25, 'Visibilidad, gestion del conocimiento y Educa'),
(26, 'Filosofia y Educacion'),
(27, 'Historia y prospectiva de la Educacion Abiert'),
(28, 'Factores asociados a la calidad de la Educaci'),
(29, 'Pedagogia, Didactica y CurriÂ­culo'),
(30, 'Pedagogias mediadas'),
(31, 'Metabolismo y nutricion animal'),
(32, 'Fisiologia y reproduccion animal '),
(33, 'Biodiversidad y recursos geneticos'),
(34, 'Higiene, profilaxis y comportamiento animal'),
(35, 'Citogenetica'),
(36, 'Desarrollo rural'),
(37, 'BiotecnologiÂ­a'),
(38, 'Agroecologia'),
(39, 'Transformacion de Productos'),
(40, 'Tecnologias Apropiadas'),
(41, 'Ingenieria de Procesos en Alimentos y Biomate'),
(42, 'Gestion de sistemas'),
(43, 'IngenieriÂ­a de software'),
(44, 'Administracion y servicios farmaceuticos'),
(45, 'Promocion de la salud y prevencion de la enfe'),
(46, 'Infraestructura tecnologica y seg redes'),
(47, 'AUTOMATIZACION Y HERRAMIENTAS LOGICAS'),
(48, 'Modelos de Gestion Organizacional'),
(49, 'DISENO Y GESTION DE REDES Y SUMINISTROS'),
(50, 'ANALISIS Y SINTESIS QUIMICA'),
(51, 'Acustica y sistemas de audio'),
(52, 'Telesalud, Bioinformtatica y Biotecnologia'),
(53, 'Epidemiologia, Salud Publica y Familiar'),
(54, 'Desarrollo Educativo y Economico en Salud'),
(55, 'Desarrollo CientiÂ­fico, Clinico y Medico Qui'),
(56, 'Alimentacion, metabolismo'),
(57, 'Reproduccion y mejoramiento'),
(58, 'Biodiversidad y recursos'),
(59, 'Desarrollo rural'),
(60, 'Biotecnologia'),
(61, 'Gestion y manejo ambiental');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_line_inve_semi`
--

CREATE TABLE `sgi_line_inve_semi` (
  `LIS_CODI` int(11) NOT NULL,
  `LIS_SEMI_CODI` int(11) NOT NULL,
  `LIS_LINE_INVE_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_line_inve_semi`
--

INSERT INTO `sgi_line_inve_semi` (`LIS_CODI`, `LIS_SEMI_CODI`, `LIS_LINE_INVE_CODI`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_line_proy`
--

CREATE TABLE `sgi_line_proy` (
  `id_proy` int(11) NOT NULL,
  `id_line` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_mess`
--

CREATE TABLE `sgi_mess` (
  `mes_codi` int(11) NOT NULL,
  `mes_nomb` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Guarda los nombres de los meses';

--
-- Volcado de datos para la tabla `sgi_mess`
--

INSERT INTO `sgi_mess` (`mes_codi`, `mes_nomb`) VALUES
(1, 'Enero'),
(2, 'Febrero'),
(3, 'Marzo'),
(4, 'Abril'),
(5, 'Mayo'),
(6, 'Junio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_nive_form`
--

CREATE TABLE `sgi_nive_form` (
  `NIV_CODI` int(11) NOT NULL,
  `NIV_NOMB` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_nive_form`
--

INSERT INTO `sgi_nive_form` (`NIV_CODI`, `NIV_NOMB`) VALUES
(1, 'SECUNDARIA'),
(2, 'PREGRADO'),
(3, 'ESPECIALIZACION'),
(4, 'MAESTRIA'),
(5, 'DOCTORADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_nive_inve`
--

CREATE TABLE `sgi_nive_inve` (
  `NIN_INV_CODI` int(11) NOT NULL,
  `NIN_NIV_CODI` int(11) NOT NULL,
  `NIN_TITU_OBTE` varchar(100) COLLATE utf8_bin NOT NULL,
  `NIN_INST` varchar(100) COLLATE utf8_bin NOT NULL,
  `NIN_AGNO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_nive_inve`
--

INSERT INTO `sgi_nive_inve` (`NIN_INV_CODI`, `NIN_NIV_CODI`, `NIN_TITU_OBTE`, `NIN_INST`, `NIN_AGNO`) VALUES
(1, 1, 'tÃ­tulo Obtenido', 'InstituciÃ³n', 2014),
(1, 2, 'titulo', 'InstituciÃ³n', 2004),
(1, 3, 'Ingeniero', 'UIS', 2001),
(3, 1, ' srtdsgdf', 'gfg', 4545),
(4, 2, 'Bachiller Comercial', 'ASED', 2004),
(4, 3, 'INGENIRO SISTEMAS', 'UIS', 1991),
(5, 1, 'ghj', 'ghj', 2000),
(6, 3, 'gestion en gestion ambiental', 'Fundacion Área Andina', 2012),
(7, 2, 'ingeniero ambiental', 'unad', 2017),
(8, 3, 'educacion superior a distancia', 'unad', 2017),
(9, 1, 'titulo de Primaria', 'colegio', 1998),
(10, 3, 'hgggj', 'ggj', 2017),
(11, 2, 'Agronomo', 'UDI', 2017),
(14, 4, 'Educación', 'Santo Tomas', 2010),
(15, 3, 'Familia', 'UNAD', 2012),
(16, 1, 'Bachiller Técnico', 'Tecnológico', 1990),
(16, 2, 'Ing. Electricista', 'UIS', 1998),
(16, 4, 'Magister', 'UIS', 1996),
(17, 3, 'ESPECIALISTA FINANZAS', 'UNAD', 2008),
(20, 3, 'especializacion finanzas', 'Universidad autónoma', 2015),
(23, 5, 'Doctor Zoometalurgico', 'Unam', 2001),
(24, 3, 'especialista en agasajos', 'Universidad de la Vida', 2000),
(25, 1, 'bachiller academico', 'Colegio avengers', 2019);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_paco`
--

CREATE TABLE `sgi_paco` (
  `CPA_CODI` int(11) NOT NULL,
  `CPA_NOMB` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_para_eval`
--

CREATE TABLE `sgi_para_eval` (
  `PEV_CODI` int(11) NOT NULL,
  `PEV_DESC` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_para_eval`
--

INSERT INTO `sgi_para_eval` (`PEV_CODI`, `PEV_DESC`) VALUES
(1, 'EXCELENTE'),
(2, 'Bueno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_plnt`
--

CREATE TABLE `sgi_plnt` (
  `plnt_codi` int(11) NOT NULL,
  `plnt_desc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_plnt_grup`
--

CREATE TABLE `sgi_plnt_grup` (
  `pgr_plnt_codi` int(11) NOT NULL,
  `pgr_grup_codi` int(11) NOT NULL,
  `pgr_nombre` varchar(100) NOT NULL,
  `pgr_fech_inic` date DEFAULT NULL,
  `pgr_fech_term` date DEFAULT NULL,
  `pgr_path` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_plnt_grup`
--

INSERT INTO `sgi_plnt_grup` (`pgr_plnt_codi`, `pgr_grup_codi`, `pgr_nombre`, `pgr_fech_inic`, `pgr_fech_term`, `pgr_path`) VALUES
(60, 12, 'Nuevo Plan de trabajo', '2020-06-18', '2020-06-26', '60_549682.pdf'),
(61, 14, 'NUEVO PLAN', '2020-06-18', NULL, '61_372441.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_prod`
--

CREATE TABLE `sgi_prod` (
  `Id` int(11) NOT NULL,
  `Nombre` text COLLATE utf8_bin NOT NULL,
  `id_tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_prod`
--

INSERT INTO `sgi_prod` (`Id`, `Nombre`, `id_tipo`) VALUES
(1, 'REVISTA', 2),
(2, 'TITULOSa', 2),
(3, 'REVISTA', 2),
(4, 'REVISTA', 2),
(5, 'TITULOSa', 2),
(6, 'tÃ­tulo del Libro', 1),
(7, 'LIBRO', 1),
(8, 'LIBRO', 1),
(9, 'REVISTA', 2),
(10, '2342143', 2),
(11, '2342143', 2),
(12, '2342143', 2),
(13, 'werere', 1),
(14, 'eweweqw', 1),
(15, 'eweweqw', 1),
(16, 'eweweqw', 1),
(17, 'eweweqw', 1),
(18, 'eweweqw', 1),
(19, 'eweweqw', 1),
(20, 'eweweqw', 1),
(21, 'eweweqw', 1),
(22, 'eweweqw', 1),
(23, 'eweweqw', 1),
(24, 'eweweqw', 1),
(25, 'eweweqw', 1),
(26, 'CNET', 3),
(27, 'CNET', 3),
(28, 'CNET', 3),
(29, 'CNET', 3),
(30, 'CNET', 3),
(31, 'SW', 3),
(32, 'SWLDd', 3),
(33, 'rererwer', 3),
(34, 'REVIASTY', 2),
(35, 'REVIASTY', 2),
(36, 'rtretrety', 3),
(37, 'REVISTAS NUEVAS', 2),
(38, 'REVISTAS NUEVAS', 2),
(39, 'REVISTAS NUEVAS', 2),
(41, 'CNET', 3),
(42, 'qwerty', 2),
(43, 'qwerty', 2),
(44, 'qwerty', 2),
(45, 'qwerty', 2),
(46, 'qwerty', 2),
(47, 'qwerty', 2),
(48, 'weqwqewqew', 3),
(49, 'qwqewqewqr', 1),
(50, 'CNET', 3),
(51, 'CNET', 3),
(52, 'qwqewqewqr', 1),
(53, 'weqwqewqew', 3),
(54, 'weqwqewqew', 3),
(55, 'weqwqewqew', 3),
(56, 'qwertyu', 1),
(57, 'weqwqewqew', 3),
(58, 'qwertyu', 1),
(59, 'oiiuiiu', 2),
(60, 'qwertyu', 1),
(61, 'qqwewew', 2),
(62, 'qwertyu', 1),
(63, 'rewrew', 2),
(64, 'zxcvcxvcvb', 2),
(65, 'qwewrere', 1),
(66, 'qqwqew', 1),
(67, 'qwewrere', 1),
(68, 'zxcvcxvcvb', 2),
(69, 'fdfdsfdsfds', 2),
(70, 'fdfdsfdsfds', 2),
(71, 'REVISTA', 1),
(72, 'fdfdsfd', 2),
(73, 'fdfdsfd', 2),
(74, 'REVISTA', 1),
(75, 'Microsoft .NET', 3),
(76, 'Microsoft .NET', 3),
(77, 'fdfdsfd', 2),
(78, 'REVISTA', 1),
(79, 'sadsadsds', 1),
(80, 'qwqewqewqr', 1),
(81, '.NET', 3),
(82, 'El acoso del maÃ±ana', 1),
(83, 'edfefdsf', 1),
(84, 'edfefdsf', 1),
(85, 'fdgfdhgf', 2),
(86, 'ertrtrt', 1),
(87, 'fssdfdsfd', 2),
(88, 'aaaaa', 1),
(89, 'bbbbb', 2),
(90, 'aaaaa', 1),
(91, 'bbbbb', 2),
(92, 'revista', 2),
(93, 'revista', 2),
(94, 'fdsfds', 3),
(95, 'LIBRO', 1),
(96, 'REVISTA', 2),
(97, 'QQQQQQ', 1),
(98, 'WWWWW', 2),
(99, 'QQQQQQ', 1),
(100, 'WWWWW', 2),
(101, 'libro nuevo', 1),
(102, 'revista nueva', 2),
(103, 'revista nueva2', 2),
(104, 'libro', 1),
(105, 'retertrtr', 3),
(106, 'yjuyhjh', 1),
(107, 'retertrtr', 3),
(108, 'yjuyhjh', 1),
(109, 'revista', 2),
(110, 'retertrtr', 3),
(111, 'revista', 2),
(112, 'yjuyhjh', 1),
(113, 'werre', 1),
(114, '323232', 2),
(115, 'fdgfdhgf', 2),
(116, 'edfefdsf', 1),
(117, 'yjuyhjh', 1),
(118, 'revista', 2),
(119, 'retertrtr', 3),
(120, 'rdsfd', 1),
(121, 'titulo', 2),
(122, 'titulo', 2),
(123, 'titulo', 2),
(124, 'dddd', 1),
(125, 'xxxxx', 2),
(126, 'ffff', 2),
(127, 'tttttt', 1),
(128, 'Sofw 1', 3),
(129, 'Sofw 1', 3),
(130, 'Sofw 1', 3),
(131, 'Sofw 1', 3),
(132, 'Book 1', 1),
(133, 'one', 1),
(134, 'one', 1),
(135, 'fdsfds', 1),
(136, 'fdsfds', 1),
(137, 'fdsfds', 1),
(138, 'fdsfds', 1),
(139, 'fdsfds', 1),
(140, 'TITULO DEL LIBRO', 1),
(141, 'TITULO', 1),
(142, 'TITULO', 1),
(143, 'TITULO', 1),
(144, 'xxxx', 3),
(146, 'sssddee', 1),
(147, 'eeerrtrrgfrgrg', 3),
(148, 'Articulo 1 ', 2),
(149, 'eeerrtrrgfrgrg', 3),
(150, 'sssddee', 1),
(151, 'one ', 2),
(152, 'werwerwe', 2),
(153, 'identificación de hidrocarburos en agua', 2),
(154, 'Article', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_prod_proy`
--

CREATE TABLE `sgi_prod_proy` (
  `id_proy` int(11) NOT NULL,
  `id_prod` int(11) NOT NULL,
  `id_inve` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `titulo` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_prod_proy`
--

INSERT INTO `sgi_prod_proy` (`id_proy`, `id_prod`, `id_inve`, `fecha`, `titulo`) VALUES
(1, 99, 9, '2016-01-31', 'WWWW'),
(1, 100, 9, '2016-01-15', 'EWEW'),
(29, 152, 8, '2016-02-08', '45325345'),
(29, 153, 8, '2017-02-07', '85697523'),
(33, 93, 9, '2016-02-16', '00001'),
(33, 94, 9, '2015-09-06', 'fdfd'),
(36, 97, 9, '2016-01-31', 'WWWW'),
(36, 98, 9, '2016-01-15', 'EWEW'),
(37, 101, 9, '2015-11-08', '123456'),
(37, 102, 9, '2015-07-07', '6576768'),
(38, 103, 9, '2015-07-07', '6576768'),
(38, 104, 9, '2015-07-07', '898798'),
(39, 125, 9, '2019-05-15', 'xxx'),
(39, 126, 9, '2019-05-15', 'fff'),
(40, 143, 9, '2019-05-15', 'ISBN'),
(43, 146, 5, '2019-05-06', '22w1w112w'),
(43, 147, 5, '2019-05-06', 'dkkdjddjdk'),
(43, 149, 5, '2019-05-06', 'dkkdjddjdk'),
(43, 150, 5, '2019-05-06', '22w1w112w'),
(44, 148, 6, '2019-05-01', '123-456'),
(45, 151, 7, '2019-05-15', '1234-45'),
(46, 154, 16, '2019-05-02', '1452-5896');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_prog_acad`
--

CREATE TABLE `sgi_prog_acad` (
  `PAC_CODI` int(11) NOT NULL,
  `PAC_NOMB` varchar(45) NOT NULL,
  `PAC_ESCU_CODI` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_prog_acad`
--

INSERT INTO `sgi_prog_acad` (`PAC_CODI`, `PAC_NOMB`, `PAC_ESCU_CODI`) VALUES
(1, 'ING. DE ALIMENTOS', 1),
(2, 'ING. INDUSTRIAL', 1),
(3, 'ING. DE SISTEMAS', 1),
(4, 'ING. DE TELECOMUNICACIONES', 1),
(5, 'ING. ELECTRONICA', 1),
(6, 'MAESTRIA GESTION TECNOLOGIA INFORMACION', 1),
(7, 'ESP. PROCESO ALIMENTOS BIOMATERIALES', 1),
(8, 'ESP. SEGURIDAD INFORMATICA', 1),
(9, 'TECN. DE ALIMENTOS', 1),
(10, 'TECN. PRODUCCION DE AUDIO', 1),
(11, 'TECN. AUTOMATIZACION ELECTRONICA', 1),
(12, 'TECN. DESARROLLO DE SOFTWARE', 1),
(13, 'TECN GESTION REDES ACCESO TELECOMUNIC', 1),
(14, 'TECN. LOGISTICA INDUSTRIAL', 1),
(15, 'TECN. SISTEMAS COMUNICACIONES INALAMABRICAS', 1),
(16, 'ADMINISTRACION DE EMPRESAS', 2),
(17, 'ECONOMIA', 2),
(18, 'MAESTRIA EN ADMON ORGANIZACIONES', 2),
(19, 'ESP. GERENCIA ESTRAT MERCADEO', 2),
(20, 'ESP. GESTION PROYECTOS', 2),
(21, 'ESP. GESTION PUBLICA', 2),
(22, 'TECN. GESTION AGROPECUARIA', 2),
(23, 'TECN. GESTION COMERCIAL Y NEGOCIOS', 2),
(24, 'TECN. EMPRESAS ASOCIATIVAS ORG COMUNIT', 2),
(25, 'TECN. GESTION OBRAS CIVILES CONSTRUCCIONES', 2),
(26, 'TECN. GESTION TRANSPORTES', 2),
(27, 'TECN. GESTION INDUSTRIAL', 2),
(28, 'AGRONOMIA', 3),
(29, 'ING. AMBIENTAL', 3),
(30, 'ZOOTECNIA', 3),
(31, 'ESP. BIOTECNOLOGIA AGRARIA', 3),
(32, 'ESP. NUTRICION ANIMAL SOSTENIBLE', 3),
(33, 'TECN. PRODUCCION AGRICOLA', 3),
(34, 'TECN. PRODUCCION ANIMAL', 3),
(35, 'TECN. SANEAMIENTO AMBIENTAL', 3),
(36, 'TECN. SISTEMAS AGROFORESTALES', 3),
(37, 'LIC. ETNOEDUCACION', 4),
(38, 'LIC. FILOSOFIA', 4),
(39, 'LIC. INGLES COMO LENGUA EXTRANJERA', 4),
(40, 'MATEMATICAS', 4),
(41, 'PEDAGOGIA INFANTIL', 4),
(42, 'ESP. EDUCAC. SUPERIOR A DISTANCIA', 4),
(43, 'ESP. EDUCACION, CULTURA Y POLITICA', 4),
(44, 'ESP: PEDAGOG. DESARROLLO APRENDIZAJE AUTONOMO', 4),
(45, 'ADMINISTRACION EN SALUD', 5),
(46, 'TECN. SEGURIDAD Y SALUD EN EL TRABAJO', 5),
(47, 'TECN. REGENCIA FARMACIA', 5),
(48, 'ARTES VISUALES', 6),
(49, 'COMUNICACION SOCIAL', 6),
(50, 'FILOSOFIA', 6),
(51, 'PSICOLOGIA', 6),
(52, 'SOCIOLOGIA', 6),
(53, 'MAESTRIA EN COMUNICACION', 6),
(54, 'MAESTRIA DESARROLLO ALTERNATIVO SOSTENIBLE', 6),
(55, 'MAESTRIA PSICOLOGIA COMUNITARIA', 6),
(99, 'EXTERNO', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_prog_acad_semi`
--

CREATE TABLE `sgi_prog_acad_semi` (
  `PAS_CODI` int(11) NOT NULL,
  `PAS_SEMI_CODI` int(11) NOT NULL,
  `PAS_PACA_CODI` int(11) NOT NULL,
  `PAS_FECH_INI` date NOT NULL,
  `PAS_FECH_TERM` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_prop`
--

CREATE TABLE `sgi_prop` (
  `PRO_CODI` int(11) NOT NULL,
  `PRO_NOMB` varchar(50) NOT NULL,
  `PRO_TEXT` varchar(300) NOT NULL,
  `PRO_TEXT_NOMB` varchar(100) DEFAULT NULL,
  `PRO_LINK_GLAC` text NOT NULL,
  `PRO_LINK_CVLA` text NOT NULL,
  `PRO_CART_AVAL` varchar(300) NOT NULL,
  `PRO_CART_NOMB` varchar(100) NOT NULL,
  `PRO_CONV_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_prop_atrib`
--

CREATE TABLE `sgi_prop_atrib` (
  `PATR_CODI` int(11) NOT NULL,
  `PATR_ATRI_CODI` int(11) NOT NULL,
  `PATR_PROP_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_prop_atrib`
--

INSERT INTO `sgi_prop_atrib` (`PATR_CODI`, `PATR_ATRI_CODI`, `PATR_PROP_CODI`) VALUES
(1, 1, 1),
(3, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_prop_conv_atri`
--

CREATE TABLE `sgi_prop_conv_atri` (
  `PCAT_CODI` int(11) NOT NULL COMMENT 'PropuestaConvocatoriaCodigo',
  `PCAT_PATR_CODI` int(11) NOT NULL,
  `PCAT_CONV_CODI` int(11) NOT NULL,
  `PCAT_FECH` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_prop_conv_atri`
--

INSERT INTO `sgi_prop_conv_atri` (`PCAT_CODI`, `PCAT_PATR_CODI`, `PCAT_CONV_CODI`, `PCAT_FECH`) VALUES
(1, 1, 2, '2016-07-14'),
(2, 3, 2, '2016-07-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_prop_conv_juez`
--

CREATE TABLE `sgi_prop_conv_juez` (
  `PCJU_CODI` int(11) NOT NULL,
  `PCJU_PCAT_CODI` int(11) NOT NULL COMMENT 'PropuestaConvocatoriaAtributo',
  `PCJU_EEVA_CODI` int(11) NOT NULL,
  `PCJU_INV_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_prop_conv_juez`
--

INSERT INTO `sgi_prop_conv_juez` (`PCJU_CODI`, `PCJU_PCAT_CODI`, `PCJU_EEVA_CODI`, `PCJU_INV_CODI`) VALUES
(1, 1, 1, 8),
(2, 2, 2, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_prop_inve`
--

CREATE TABLE `sgi_prop_inve` (
  `PIN_INVE_CODI` int(11) NOT NULL,
  `PIN_PROP_CODI` int(11) NOT NULL,
  `PIN_TVIN_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_proy`
--

CREATE TABLE `sgi_proy` (
  `PRO_CODI` int(11) NOT NULL,
  `PRO_NOMB` varchar(500) COLLATE utf8_bin NOT NULL,
  `PRO_FINA` float NOT NULL,
  `PRO_CON_CODI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_proy`
--

INSERT INTO `sgi_proy` (`PRO_CODI`, `PRO_NOMB`, `PRO_FINA`, `PRO_CON_CODI`) VALUES
(1, 'ddf', 212121, NULL),
(10, 'Nmbre', 12313200, NULL),
(11, 'Nombre2', 23232, NULL),
(12, 'proyecto3', 3456680, NULL),
(13, 'Nuevo Proyecto', 432432, NULL),
(14, 'dasfdsfdsfdsfds', 65465, NULL),
(15, 'yyyyyy', 54354500, NULL),
(16, 'dfdfdgf', 54654700, NULL),
(17, 'Nuevo Presds', 4567990, NULL),
(18, 'sdsfdfd', 45646600, NULL),
(19, 'xxxxxxx', 3343540, NULL),
(20, 'JJ', 780000, NULL),
(21, 'Nuevo Proyecto tree', 300000, NULL),
(22, 'Nuevo Proyecto', 1000000, NULL),
(23, 'Otro Nuevo Proyecto', 84546500, NULL),
(24, 'OTRO PROYECTO NUEVO', 2000000, NULL),
(25, 'NUEVO OTRO De P', 3000000, NULL),
(26, 'PRUEBA de PROYECTO', 5500000, NULL),
(27, 'NUEVA del PROYECTO', 8000000, NULL),
(28, 'Nuevo Proyecto', 90982300, NULL),
(29, 'Nuevo Proyecto', 24324300, NULL),
(30, 'Nuevo Proyecto de Investigacion', 456123, NULL),
(31, 'OTRO PROYECTO NUEVO', 1000000, NULL),
(32, 'proyecto II', 789456000, NULL),
(33, 'Proyecto III', 741852, NULL),
(34, 'PROYECTO IV', 124578, NULL),
(35, 'PROYECTO V', 2342340000, NULL),
(36, 'PROYECTO 6', 123457000, NULL),
(37, 'proyecto xxx', 12324300, NULL),
(38, 'proyecto zzzz', 7894560, NULL),
(39, 'fgfdg2', 45435400, NULL),
(40, 'xzxz', 434343, NULL),
(41, 'yyyyy', 333333, NULL),
(42, 'Emedios', 1000000, NULL),
(43, 'bkgkgkglg', 1225560, NULL),
(44, 'Evaluación del comportamiento del cultivo de cacao a diferentes dosis de fertilizacion', 1000000, NULL),
(45, 'one', 1000000, NULL),
(46, 'Cacao', 2000000, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_proy_inve`
--

CREATE TABLE `sgi_proy_inve` (
  `id_inve` int(11) NOT NULL,
  `id_proy` int(11) NOT NULL,
  `id_grupo` int(11) DEFAULT NULL,
  `id_tipoInvestigador` int(11) DEFAULT NULL,
  `id_convocatoria` int(11) DEFAULT NULL,
  `id_linea` int(11) DEFAULT NULL,
  `id_tipo_prod` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `fecha_ini` date NOT NULL,
  `fecha_ter` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_proy_inve`
--

INSERT INTO `sgi_proy_inve` (`id_inve`, `id_proy`, `id_grupo`, `id_tipoInvestigador`, `id_convocatoria`, `id_linea`, `id_tipo_prod`, `id_producto`, `fecha_ini`, `fecha_ter`) VALUES
(3, 43, 11, 2, 142, 38, NULL, NULL, '2019-02-03', '2019-05-01'),
(3, 44, 4, 4, 142, 1, NULL, NULL, '2019-01-01', '2019-05-10'),
(7, 45, 6, 3, 142, 1, NULL, NULL, '2019-05-15', NULL),
(8, 29, 1, 2, 1, 1, NULL, NULL, '2016-02-08', NULL),
(9, 30, 1, 2, 1, 1, NULL, NULL, '2015-10-04', NULL),
(9, 31, 1, 2, 2, 1, NULL, NULL, '2015-10-04', NULL),
(9, 32, 1, 4, 2, 1, NULL, NULL, '2016-02-09', NULL),
(9, 33, 1, 2, 1, 1, NULL, NULL, '2016-02-09', NULL),
(9, 34, 1, 3, 2, 1, NULL, NULL, '2016-02-08', NULL),
(9, 35, 1, 3, 2, 1, NULL, NULL, '2015-10-04', NULL),
(9, 36, 1, 3, 2, 1, NULL, NULL, '2016-02-07', NULL),
(9, 37, 1, 2, 1, 1, NULL, NULL, '2015-12-06', NULL),
(9, 38, 1, 3, 1, 1, NULL, NULL, '2015-12-01', NULL),
(9, 39, 1, 3, 2, 1, NULL, NULL, '2016-02-15', NULL),
(9, 40, 3, 2, 142, 1, NULL, NULL, '2019-05-07', NULL),
(9, 41, 1, 1, 142, 1, NULL, NULL, '2019-05-01', NULL),
(16, 42, 9, 4, 142, 10, NULL, NULL, '2019-05-01', NULL),
(16, 46, 9, 4, 142, 10, NULL, NULL, '2019-05-01', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_semi`
--

CREATE TABLE `sgi_semi` (
  `SEM_CODI` int(11) NOT NULL,
  `SEM_NOMB` varchar(200) NOT NULL,
  `SEM_INV_CODI` int(11) DEFAULT NULL,
  `SEM_AVAL` tinyint(4) DEFAULT NULL,
  `SEM_FECH_INI` date NOT NULL,
  `SEM_FECH_TERM` date DEFAULT NULL,
  `SEM_MISI` text DEFAULT NULL,
  `SEM_VISI` text DEFAULT NULL,
  `SEM_OBJG` text DEFAULT NULL,
  `SEM_TEMA_INVE` text DEFAULT NULL,
  `SEM_PRPR_ESPE` text DEFAULT NULL,
  `SEM_OBJE` text DEFAULT NULL,
  `SEM_PROP_ACTU` text DEFAULT NULL,
  `SEM_PERT_CADE` text DEFAULT NULL,
  `SEM_ARTI_LINE` text DEFAULT NULL,
  `SEM_PROY_REGI` text DEFAULT NULL,
  `SEM_ESTR_FINA` text DEFAULT NULL,
  `SEM_ESTR_KNOW` text DEFAULT NULL,
  `SEM_ESTR_ELAB_PROD` text DEFAULT NULL,
  `SEM_ESTR_EXTE` text DEFAULT NULL,
  `SEM_ESTR_VINC_ESTU` text DEFAULT NULL,
  `SEM_ALIA_CONV` text DEFAULT NULL,
  `SEM_CENT_CODI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_semi`
--

INSERT INTO `sgi_semi` (`SEM_CODI`, `SEM_NOMB`, `SEM_INV_CODI`, `SEM_AVAL`, `SEM_FECH_INI`, `SEM_FECH_TERM`, `SEM_MISI`, `SEM_VISI`, `SEM_OBJG`, `SEM_TEMA_INVE`, `SEM_PRPR_ESPE`, `SEM_OBJE`, `SEM_PROP_ACTU`, `SEM_PERT_CADE`, `SEM_ARTI_LINE`, `SEM_PROY_REGI`, `SEM_ESTR_FINA`, `SEM_ESTR_KNOW`, `SEM_ESTR_ELAB_PROD`, `SEM_ESTR_EXTE`, `SEM_ESTR_VINC_ESTU`, `SEM_ALIA_CONV`, `SEM_CENT_CODI`) VALUES
(1, 'SEMILLERO', NULL, NULL, '2020-06-09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'gfg', 3, 1, '2020-06-02', NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL),
(3, 'dsdsd', 3, 1, '2020-06-02', NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL),
(4, 'NUEVOsEMILLERO', 3, 1, '2020-06-02', NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL),
(5, 'xxxxx', 3, 1, '2020-04-07', NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL),
(6, 'vvvvv', 3, 0, '2020-06-02', NULL, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', NULL),
(7, 'yyyyyy', 3, 1, '2020-06-04', NULL, 'hghg', 'hghg', '', 'hfghgf', '', 'fhgg', '', '', '', 'hghg', '', '', '', '', '', '', NULL),
(8, 'xcxcxcx', 3, 0, '2020-06-04', NULL, 'cx', 'cxc', '', 'cxc', '', 'cx', '', '', '', 'cx', '', '', '', '', '', '', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_tipo_cargo`
--

CREATE TABLE `sgi_tipo_cargo` (
  `TICA_CODI` int(11) NOT NULL,
  `TICA_NOMB` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_tipo_cargo`
--

INSERT INTO `sgi_tipo_cargo` (`TICA_CODI`, `TICA_NOMB`) VALUES
(1, 'DOCENTE DE PLANTA'),
(2, 'DOCENTE OCASIONAL'),
(3, 'ESTUDIANTE'),
(4, 'FUNCIONARIO ADMINISTRATIVO'),
(9, 'EVALUADOR EXTERNO'),
(10, 'INVESTIGADOR EXTERNO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_tipo_conv`
--

CREATE TABLE `sgi_tipo_conv` (
  `TCO_CODI` int(11) NOT NULL,
  `TCO_DESC` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_tipo_conv`
--

INSERT INTO `sgi_tipo_conv` (`TCO_CODI`, `TCO_DESC`) VALUES
(1, 'Tipo convocatoria Uno'),
(2, 'Tipo Convocatoria 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_tipo_docu`
--

CREATE TABLE `sgi_tipo_docu` (
  `TID_CODI` int(11) NOT NULL,
  `TID_NOMB` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_tipo_docu`
--

INSERT INTO `sgi_tipo_docu` (`TID_CODI`, `TID_NOMB`) VALUES
(1, 'CEDULA'),
(2, 'EXTRANJERIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_tipo_prod`
--

CREATE TABLE `sgi_tipo_prod` (
  `id` int(11) NOT NULL,
  `Descripcion` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_tipo_prod`
--

INSERT INTO `sgi_tipo_prod` (`id`, `Descripcion`) VALUES
(1, 'LIBRO'),
(2, 'REVISTA'),
(3, 'SOFTWARE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_tipo_vinc`
--

CREATE TABLE `sgi_tipo_vinc` (
  `TIV_CODI` int(11) NOT NULL,
  `TIV_DESC` varchar(45) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `sgi_tipo_vinc`
--

INSERT INTO `sgi_tipo_vinc` (`TIV_CODI`, `TIV_DESC`) VALUES
(1, 'Director'),
(2, 'Vinculacion 2'),
(3, 'Investigador Principal'),
(4, 'CoInvestigador'),
(5, 'Tecnico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_user`
--

CREATE TABLE `sgi_user` (
  `USE_CODI` int(11) NOT NULL,
  `USE_IDEN` varchar(100) NOT NULL,
  `USE_NOMB` varchar(50) NOT NULL,
  `USE_APEL` varchar(50) NOT NULL,
  `USE_EMAI` varchar(50) NOT NULL,
  `USE_TELE` varchar(50) NOT NULL,
  `USE_USUA` varchar(30) DEFAULT NULL,
  `USE_CLAV` varchar(50) DEFAULT NULL,
  `USE_COD_TIPO` int(11) NOT NULL,
  `CVLAC` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_user`
--

INSERT INTO `sgi_user` (`USE_CODI`, `USE_IDEN`, `USE_NOMB`, `USE_APEL`, `USE_EMAI`, `USE_TELE`, `USE_USUA`, `USE_CLAV`, `USE_COD_TIPO`, `CVLAC`) VALUES
(1, '000000', 'admin', 'admin', 'admin@admin.com', '11111111', 'admin', '21232f297a57a5a743894a0e4a801fc3', 0, ''),
(2, '91294629', 'LUIS', 'DUARTE', 'lduarte@cdtdegas.com', '3172191841', 'lduarte', 'da14e3c19aea58d5434e731917e82f87', 1, ''),
(3, '9999999', 'Jose', 'Luis', 'jluis@hotmail.com', '9212132323', 'jose', '662eaa47199461d01a623884080934ab', 1, ''),
(4, '91252797', 'Javier', 'Medina', 'javier.medina@unad.edu.co', '3008262656', 'jmedicru', '22ae6e4163951c24e160f2a234fece7d', 0, ''),
(5, '001', 'usuario_01', 'Usuario_01', 'usuario1@unad.edu.co', '0101', 'usuario_01', '86784bf64fb0f1354c231ae850569566', 1, ''),
(6, '91252798', 'Javier', 'Cruz', 'cruz@unad.edu.co', '300', 'cruz', '52c7915d4e0b6d93268b1f63bfd4578b', 0, ''),
(7, '002', 'usuario_02', 'usuario_02', 'usuario2@unad.edu.co', '0202', 'usuario_02', 'af9fad11d4c8083059f7399ef94f1894', 1, ''),
(8, '003', 'usuario_03', 'usuario_03', 'usuario_03@unad.edu.co', '0303', 'usuario_03', 'add60c75bfdb8a39b278eed93e09303e', 1, ''),
(9, '004', 'usuario_04', 'usuario_04', 'usuario_04@unad.edu.co', '0404', 'usuario_04', '6fe5b9803a8f5225cc4afcc249bec81e', 1, ''),
(10, '005', 'usuario_05', 'usuario_05', 'usuario_05@unad.edu.co', '0505', 'usuario_05', 'e00fbe374b983f60868f3574f1482b0c', 1, ''),
(11, '0606', 'usuario_06', 'usuario_06', 'usuario_06@unad.edu.co', '0606', 'usuario_06', '1b677eb82368eacc723e06374213f528', 1, ''),
(12, '007', 'usuario_07', 'usuario_07', 'usuario_07@unad.edu.co', '0707', 'usuario_07', '42310c808377daeeb29175e760eb64ae', 1, ''),
(13, '008', 'usuario_08', 'usuario_08', 'usuario_08@unad.edu.co', '0808', 'usuario_08', 'd53e544b51ff2c4aa6cebeead0df70f3', 1, ''),
(14, '009', 'usuario_09', 'usuario_09', 'usuario_09@unad.edu.co', '0909', 'usuario_09', '7b9dd06dc9b169372a40f2c0a1abad66', 1, ''),
(15, '010', 'usuario_10', 'usuario_10', 'usuario_10@unad.edu.co', '1010', 'usuario_10', '92811196e0a07492bcc62881bc1aa668', 1, ''),
(16, '011', 'usuario_11', 'usuario_11', 'usuario_11@unad.edu.co', '1111', 'usuario_11', 'bba8b08f13bc7f31e4c66a9522c775af', 1, ''),
(17, '012', 'usuario_12', 'usuario_12', 'usuario_12@unad.edu.co', '1212', 'usuario_12', 'b8effeeaaa71d16607f4101a1cc02cf1', 1, ''),
(18, '013', 'usuario_13', 'usuario_13', 'usuario_13@unad.edu.co', '013', 'usuario_13', '7ac17246f6b71007cd70fbb50462656f', 1, ''),
(19, '014', 'usuario_14', 'usuario_14', 'usuario_14@unad.edu.co', '014', 'usuario_14', '703a2b65ba1275813107d13827b4183f', 1, ''),
(20, '015', 'usuario_15', 'usuario_15', 'usuario_15@unad.edu.co', '015', 'usuario_15', '81e9574fde9d714764b06e04766f8dfa', 1, ''),
(21, '016', 'usuario_16', 'usuario_16', 'usuario_16@unad.edu.co', '016', 'usuario_16', 'fd39eb331c35158cf5a718e2432102af', 1, ''),
(22, '017', 'usuario_17', 'usuario_17', 'usuario_17@unad.edu.co', '017', 'usuario_17', '000368947e58678a335c0946d71a240a', 1, ''),
(23, '018', 'usuario_18', 'usuario_18', 'usuario_18@unad.edu.co', '018', 'usuario_18', '5af757641ff011132548dd6209d02bd8', 1, ''),
(24, '019', 'usuario_19', 'usuario_19', 'usuario_19@unad.edu.co', '019', 'usuario_19', 'fe28880f08ad60374c1edc9fb348c8f6', 1, ''),
(25, '020', 'usuario_20', 'usuario_20', 'usuario_20@unad.edu.co', '020', 'usuario_20', 'd15610948cf2806369a1312cfab2507d', 1, ''),
(26, '021', 'usuario_21', 'usuario_21', 'usuario_21@unad.edu.co', '021', 'usuario_21', '9cfd4d71fba9f709bae3b5b2473f1a7f', 1, ''),
(27, '022', 'usuario_22', 'usuario_22', 'usuario_22@unad.edu.co', '022', 'usuario_22', '659ce1a246fe5a86b948de2753a4da03', 1, ''),
(28, '023', 'usuario_23', 'usuario_23', 'usuario_23@unad.edu.co', '023', 'usuario_23', '377bfe6731b7c3f107a7a60904eb7e3c', 1, ''),
(29, '024', 'usuario_24', 'usuario_24', 'usuario_24@unad.edu.co', '024', 'usuario_24', '44352f3ac31a2d604ee8bfec1368ddc5', 1, ''),
(30, '025', 'usuario_25', 'usuario_25', 'usuario_25@unad.edu.co', '025', 'usuario_25', '896fa8fd5645b65320641012bc8de40e', 1, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sgi_zona`
--

CREATE TABLE `sgi_zona` (
  `ZON_CODI` int(11) NOT NULL,
  `ZON_NOMB` varchar(25) NOT NULL,
  `ZON_SIGL` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sgi_zona`
--

INSERT INTO `sgi_zona` (`ZON_CODI`, `ZON_NOMB`, `ZON_SIGL`) VALUES
(1, 'ZONA CARIBE', 'ZCAR'),
(2, 'ZONA OCCIDENTE', 'ZOCC'),
(3, 'ZONA CENTRO ORIENTE', 'ZCORI'),
(4, 'ZONA CENTRO BOYACA', 'ZCBOY'),
(5, 'ZONA CENTRO BOGOTA CUND', 'ZCBC'),
(6, 'ZONA CENTRO SUR', 'ZCSUR'),
(7, 'ZONA SUR', 'ZSUR'),
(8, 'ZONA AMAZONIA ORINOQUIA', 'ZAO'),
(9, 'N/A', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sgi_agno`
--
ALTER TABLE `sgi_agno`
  ADD PRIMARY KEY (`AGN_CODI`);

--
-- Indices de la tabla `sgi_area`
--
ALTER TABLE `sgi_area`
  ADD PRIMARY KEY (`ARE_CODI`),
  ADD KEY `SGI_AREA_GRAN_AREA` (`ARE_GRAN_AREA_CODI`);

--
-- Indices de la tabla `sgi_atrib`
--
ALTER TABLE `sgi_atrib`
  ADD PRIMARY KEY (`ATR_CODI`);

--
-- Indices de la tabla `sgi_cent`
--
ALTER TABLE `sgi_cent`
  ADD PRIMARY KEY (`CEN_CODI`),
  ADD KEY `Ref_SGI_CENT_to_SGI_ZONA` (`CEN_ZONA_CODI`);

--
-- Indices de la tabla `sgi_conv`
--
ALTER TABLE `sgi_conv`
  ADD PRIMARY KEY (`CON_CODI`),
  ADD KEY `Ref_SGI_CONV_to_SGI_TIPO_CONV` (`CON_TIPO_CONV_CODI`);

--
-- Indices de la tabla `sgi_conv_para`
--
ALTER TABLE `sgi_conv_para`
  ADD KEY `PCO_CONV_CODI` (`PCO_CONV_CODI`),
  ADD KEY `PCO_PARA_CODI` (`PCO_PARA_CODI`);

--
-- Indices de la tabla `sgi_esca_eval`
--
ALTER TABLE `sgi_esca_eval`
  ADD PRIMARY KEY (`EEV_CODI`),
  ADD KEY `EEV_PARA_EVAL` (`EEV_PARA_EVAL`);

--
-- Indices de la tabla `sgi_escu`
--
ALTER TABLE `sgi_escu`
  ADD PRIMARY KEY (`ESC_CODI`);

--
-- Indices de la tabla `sgi_esprod_semi`
--
ALTER TABLE `sgi_esprod_semi`
  ADD PRIMARY KEY (`ESPRODS_CODI`);

--
-- Indices de la tabla `sgi_esproy_semi`
--
ALTER TABLE `sgi_esproy_semi`
  ADD PRIMARY KEY (`ESPROYS_CODI`);

--
-- Indices de la tabla `sgi_gran_area`
--
ALTER TABLE `sgi_gran_area`
  ADD PRIMARY KEY (`GAR_CODI`);

--
-- Indices de la tabla `sgi_grup`
--
ALTER TABLE `sgi_grup`
  ADD PRIMARY KEY (`gru_codi`),
  ADD KEY `gru_area_codi` (`gru_area_codi`),
  ADD KEY `gru_agno_codi` (`gru_agno_codi`),
  ADD KEY `gru_cent_codi` (`gru_cent_codi`),
  ADD KEY `gru_mess_codi` (`gru_mess_codi`),
  ADD KEY `index_gru_colc` (`gru_codi_colc`) USING BTREE;

--
-- Indices de la tabla `sgi_grup_line_inve`
--
ALTER TABLE `sgi_grup_line_inve`
  ADD PRIMARY KEY (`gli_codi`),
  ADD KEY `gli_grup_codi` (`gli_grup_codi`),
  ADD KEY `gli_line_inve_codi` (`gli_line_inve_codi`);

--
-- Indices de la tabla `sgi_grup_proy`
--
ALTER TABLE `sgi_grup_proy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proy` (`id_proy`),
  ADD KEY `id_grup` (`id_grup`),
  ADD KEY `id_inve` (`id_inve`),
  ADD KEY `id_prod` (`id_prod`);

--
-- Indices de la tabla `sgi_grup_semi`
--
ALTER TABLE `sgi_grup_semi`
  ADD PRIMARY KEY (`sgr_codi`),
  ADD KEY `sgr_grup_codi` (`sgr_grup_codi`),
  ADD KEY `sgr_semi_codi` (`sgr_semi_codi`);

--
-- Indices de la tabla `sgi_inve`
--
ALTER TABLE `sgi_inve`
  ADD PRIMARY KEY (`INV_CODI`),
  ADD KEY `Ref_SGI_INVE_to_SGI_CENT` (`INV_CENT_CODI`),
  ADD KEY `Ref_SGI_INVE_to_SGI_PROG_ACAD` (`INV_PROG_ACAD_CODI`),
  ADD KEY `Ref_SGI_INVE_to_SGI_TIPO_DOCU` (`INV_TIPO_DOCU_CODI`);

--
-- Indices de la tabla `sgi_inve_grup`
--
ALTER TABLE `sgi_inve_grup`
  ADD PRIMARY KEY (`IGR_CODI`),
  ADD KEY `IGR_INVE_IDEN` (`IGR_INVE_IDEN`),
  ADD KEY `IGR_GRUP_CODI` (`IGR_GRUP_CODI`),
  ADD KEY `IGR_TIPO_VINC_CODI` (`IGR_TIPO_VINC_CODI`);

--
-- Indices de la tabla `sgi_inve_semi`
--
ALTER TABLE `sgi_inve_semi`
  ADD PRIMARY KEY (`INS_CODI`),
  ADD KEY `Ref_SGI_INVE_has_SGI_SEMI_to_SGI_INVE` (`INS_INVE_IDEN`),
  ADD KEY `Ref_SGI_INVE_has_SGI_SEMI_to_SGI_SEMI` (`INS_SEMI_CODI`),
  ADD KEY `SGI_INVE_SEMI_TIPO_VINC` (`INS_TIPO_VINC_CODI`);

--
-- Indices de la tabla `sgi_line_inve`
--
ALTER TABLE `sgi_line_inve`
  ADD PRIMARY KEY (`lin_codi`);

--
-- Indices de la tabla `sgi_line_inve_semi`
--
ALTER TABLE `sgi_line_inve_semi`
  ADD PRIMARY KEY (`LIS_LINE_INVE_CODI`),
  ADD KEY `LIS_SEMI_CODI` (`LIS_SEMI_CODI`);

--
-- Indices de la tabla `sgi_line_proy`
--
ALTER TABLE `sgi_line_proy`
  ADD PRIMARY KEY (`id_proy`,`id_line`),
  ADD KEY `id_line` (`id_line`);

--
-- Indices de la tabla `sgi_mess`
--
ALTER TABLE `sgi_mess`
  ADD PRIMARY KEY (`mes_codi`);

--
-- Indices de la tabla `sgi_nive_form`
--
ALTER TABLE `sgi_nive_form`
  ADD PRIMARY KEY (`NIV_CODI`);

--
-- Indices de la tabla `sgi_nive_inve`
--
ALTER TABLE `sgi_nive_inve`
  ADD PRIMARY KEY (`NIN_INV_CODI`,`NIN_NIV_CODI`),
  ADD KEY `REL_NIV_CODI` (`NIN_NIV_CODI`);

--
-- Indices de la tabla `sgi_paco`
--
ALTER TABLE `sgi_paco`
  ADD PRIMARY KEY (`CPA_CODI`);

--
-- Indices de la tabla `sgi_para_eval`
--
ALTER TABLE `sgi_para_eval`
  ADD PRIMARY KEY (`PEV_CODI`);

--
-- Indices de la tabla `sgi_plnt`
--
ALTER TABLE `sgi_plnt`
  ADD PRIMARY KEY (`plnt_codi`);

--
-- Indices de la tabla `sgi_plnt_grup`
--
ALTER TABLE `sgi_plnt_grup`
  ADD PRIMARY KEY (`pgr_plnt_codi`),
  ADD KEY `pgr_grup_codi` (`pgr_grup_codi`);

--
-- Indices de la tabla `sgi_prod`
--
ALTER TABLE `sgi_prod`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `id_tipo` (`id_tipo`);

--
-- Indices de la tabla `sgi_prod_proy`
--
ALTER TABLE `sgi_prod_proy`
  ADD PRIMARY KEY (`id_proy`,`id_prod`,`id_inve`),
  ADD KEY `id_prod` (`id_prod`),
  ADD KEY `id_inve` (`id_inve`);

--
-- Indices de la tabla `sgi_prog_acad`
--
ALTER TABLE `sgi_prog_acad`
  ADD PRIMARY KEY (`PAC_CODI`),
  ADD KEY `Ref_SGI_PROG_ACAD_to_SGI_ESCU` (`PAC_ESCU_CODI`);

--
-- Indices de la tabla `sgi_prog_acad_semi`
--
ALTER TABLE `sgi_prog_acad_semi`
  ADD PRIMARY KEY (`PAS_CODI`),
  ADD KEY `PAS_PACA_CODI` (`PAS_PACA_CODI`),
  ADD KEY `PAS_SEMI_CODI` (`PAS_SEMI_CODI`);

--
-- Indices de la tabla `sgi_prop`
--
ALTER TABLE `sgi_prop`
  ADD PRIMARY KEY (`PRO_CODI`),
  ADD KEY `PRO_CONV_CODI` (`PRO_CONV_CODI`);

--
-- Indices de la tabla `sgi_prop_atrib`
--
ALTER TABLE `sgi_prop_atrib`
  ADD PRIMARY KEY (`PATR_CODI`),
  ADD KEY `PATR_ATRI_CODI` (`PATR_ATRI_CODI`,`PATR_PROP_CODI`),
  ADD KEY `PATR_ATRI_CODI_2` (`PATR_ATRI_CODI`),
  ADD KEY `PATR_PROP_CODI` (`PATR_PROP_CODI`);

--
-- Indices de la tabla `sgi_prop_conv_atri`
--
ALTER TABLE `sgi_prop_conv_atri`
  ADD PRIMARY KEY (`PCAT_CODI`),
  ADD KEY `PCON_CONV_CODI` (`PCAT_CONV_CODI`),
  ADD KEY `PCON_PATR_CODI` (`PCAT_PATR_CODI`);

--
-- Indices de la tabla `sgi_prop_conv_juez`
--
ALTER TABLE `sgi_prop_conv_juez`
  ADD PRIMARY KEY (`PCJU_CODI`),
  ADD KEY `PCJU_PCAT_CODI` (`PCJU_PCAT_CODI`,`PCJU_EEVA_CODI`,`PCJU_INV_CODI`),
  ADD KEY `PCJU_EEVA_CODI` (`PCJU_EEVA_CODI`),
  ADD KEY `PCJU_INV_CODI` (`PCJU_INV_CODI`);

--
-- Indices de la tabla `sgi_prop_inve`
--
ALTER TABLE `sgi_prop_inve`
  ADD KEY `PIN_PROP_CODI` (`PIN_PROP_CODI`),
  ADD KEY `PIN_CONV_CODI` (`PIN_INVE_CODI`);

--
-- Indices de la tabla `sgi_proy`
--
ALTER TABLE `sgi_proy`
  ADD PRIMARY KEY (`PRO_CODI`),
  ADD KEY `INX_CON_CODI` (`PRO_CON_CODI`);

--
-- Indices de la tabla `sgi_proy_inve`
--
ALTER TABLE `sgi_proy_inve`
  ADD PRIMARY KEY (`id_inve`,`id_proy`),
  ADD KEY `INX_PROY_INVE_PROY` (`id_proy`),
  ADD KEY `id_grupo` (`id_grupo`),
  ADD KEY `id_linea` (`id_linea`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_tipo_prod` (`id_tipo_prod`);

--
-- Indices de la tabla `sgi_semi`
--
ALTER TABLE `sgi_semi`
  ADD PRIMARY KEY (`SEM_CODI`),
  ADD KEY `Ref_SGI_SEMI_to_SGI_CENT` (`SEM_CENT_CODI`),
  ADD KEY `SEM_INV_CODI` (`SEM_INV_CODI`);

--
-- Indices de la tabla `sgi_tipo_conv`
--
ALTER TABLE `sgi_tipo_conv`
  ADD PRIMARY KEY (`TCO_CODI`);

--
-- Indices de la tabla `sgi_tipo_docu`
--
ALTER TABLE `sgi_tipo_docu`
  ADD PRIMARY KEY (`TID_CODI`);

--
-- Indices de la tabla `sgi_tipo_prod`
--
ALTER TABLE `sgi_tipo_prod`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sgi_tipo_vinc`
--
ALTER TABLE `sgi_tipo_vinc`
  ADD PRIMARY KEY (`TIV_CODI`);

--
-- Indices de la tabla `sgi_user`
--
ALTER TABLE `sgi_user`
  ADD PRIMARY KEY (`USE_CODI`);

--
-- Indices de la tabla `sgi_zona`
--
ALTER TABLE `sgi_zona`
  ADD PRIMARY KEY (`ZON_CODI`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sgi_atrib`
--
ALTER TABLE `sgi_atrib`
  MODIFY `ATR_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sgi_conv`
--
ALTER TABLE `sgi_conv`
  MODIFY `CON_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT de la tabla `sgi_esca_eval`
--
ALTER TABLE `sgi_esca_eval`
  MODIFY `EEV_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sgi_esprod_semi`
--
ALTER TABLE `sgi_esprod_semi`
  MODIFY `ESPRODS_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sgi_esproy_semi`
--
ALTER TABLE `sgi_esproy_semi`
  MODIFY `ESPROYS_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sgi_grup`
--
ALTER TABLE `sgi_grup`
  MODIFY `gru_codi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `sgi_grup_line_inve`
--
ALTER TABLE `sgi_grup_line_inve`
  MODIFY `gli_codi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT de la tabla `sgi_grup_proy`
--
ALTER TABLE `sgi_grup_proy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `sgi_grup_semi`
--
ALTER TABLE `sgi_grup_semi`
  MODIFY `sgr_codi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `sgi_inve_grup`
--
ALTER TABLE `sgi_inve_grup`
  MODIFY `IGR_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=274;

--
-- AUTO_INCREMENT de la tabla `sgi_nive_form`
--
ALTER TABLE `sgi_nive_form`
  MODIFY `NIV_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sgi_paco`
--
ALTER TABLE `sgi_paco`
  MODIFY `CPA_CODI` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sgi_para_eval`
--
ALTER TABLE `sgi_para_eval`
  MODIFY `PEV_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sgi_plnt`
--
ALTER TABLE `sgi_plnt`
  MODIFY `plnt_codi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sgi_plnt_grup`
--
ALTER TABLE `sgi_plnt_grup`
  MODIFY `pgr_plnt_codi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `sgi_prog_acad_semi`
--
ALTER TABLE `sgi_prog_acad_semi`
  MODIFY `PAS_CODI` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sgi_prop`
--
ALTER TABLE `sgi_prop`
  MODIFY `PRO_CODI` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sgi_prop_atrib`
--
ALTER TABLE `sgi_prop_atrib`
  MODIFY `PATR_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sgi_prop_conv_atri`
--
ALTER TABLE `sgi_prop_conv_atri`
  MODIFY `PCAT_CODI` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PropuestaConvocatoriaCodigo', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sgi_prop_conv_juez`
--
ALTER TABLE `sgi_prop_conv_juez`
  MODIFY `PCJU_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sgi_proy`
--
ALTER TABLE `sgi_proy`
  MODIFY `PRO_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `sgi_semi`
--
ALTER TABLE `sgi_semi`
  MODIFY `SEM_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `sgi_tipo_vinc`
--
ALTER TABLE `sgi_tipo_vinc`
  MODIFY `TIV_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sgi_user`
--
ALTER TABLE `sgi_user`
  MODIFY `USE_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sgi_grup_line_inve`
--
ALTER TABLE `sgi_grup_line_inve`
  ADD CONSTRAINT `sgi_grup_line_inve_ibfk_1` FOREIGN KEY (`gli_grup_codi`) REFERENCES `sgi_grup` (`gru_codi`),
  ADD CONSTRAINT `sgi_grup_line_inve_ibfk_2` FOREIGN KEY (`gli_line_inve_codi`) REFERENCES `sgi_line_inve` (`lin_codi`);

--
-- Filtros para la tabla `sgi_grup_proy`
--
ALTER TABLE `sgi_grup_proy`
  ADD CONSTRAINT `sgi_grup_proy_ibfk_1` FOREIGN KEY (`id_grup`) REFERENCES `sgi_grup` (`gru_codi`),
  ADD CONSTRAINT `sgi_grup_proy_ibfk_2` FOREIGN KEY (`id_inve`) REFERENCES `sgi_inve` (`INV_CODI`),
  ADD CONSTRAINT `sgi_grup_proy_ibfk_3` FOREIGN KEY (`id_prod`) REFERENCES `sgi_prod` (`Id`),
  ADD CONSTRAINT `sgi_grup_proy_ibfk_4` FOREIGN KEY (`id_proy`) REFERENCES `sgi_proy` (`PRO_CODI`);

--
-- Filtros para la tabla `sgi_grup_semi`
--
ALTER TABLE `sgi_grup_semi`
  ADD CONSTRAINT `sgi_grup_semi_ibfk_1` FOREIGN KEY (`sgr_grup_codi`) REFERENCES `sgi_grup` (`gru_codi`),
  ADD CONSTRAINT `sgi_grup_semi_ibfk_2` FOREIGN KEY (`sgr_semi_codi`) REFERENCES `sgi_semi` (`SEM_CODI`);

--
-- Filtros para la tabla `sgi_inve_grup`
--
ALTER TABLE `sgi_inve_grup`
  ADD CONSTRAINT `sgi_inve_grup_ibfk_1` FOREIGN KEY (`IGR_INVE_IDEN`) REFERENCES `sgi_inve` (`INV_CODI`),
  ADD CONSTRAINT `sgi_inve_grup_ibfk_2` FOREIGN KEY (`IGR_GRUP_CODI`) REFERENCES `sgi_grup` (`gru_codi`),
  ADD CONSTRAINT `sgi_inve_grup_ibfk_3` FOREIGN KEY (`IGR_TIPO_VINC_CODI`) REFERENCES `sgi_tipo_vinc` (`TIV_CODI`);

--
-- Filtros para la tabla `sgi_inve_semi`
--
ALTER TABLE `sgi_inve_semi`
  ADD CONSTRAINT `sgi_inve_semi_ibfk_2` FOREIGN KEY (`INS_INVE_IDEN`) REFERENCES `sgi_inve` (`INV_CODI`),
  ADD CONSTRAINT `sgi_inve_semi_ibfk_3` FOREIGN KEY (`INS_TIPO_VINC_CODI`) REFERENCES `sgi_tipo_vinc` (`TIV_CODI`),
  ADD CONSTRAINT `sgi_inve_semi_ibfk_4` FOREIGN KEY (`INS_SEMI_CODI`) REFERENCES `sgi_semi` (`SEM_CODI`);

--
-- Filtros para la tabla `sgi_line_inve_semi`
--
ALTER TABLE `sgi_line_inve_semi`
  ADD CONSTRAINT `sgi_line_inve_semi_ibfk_1` FOREIGN KEY (`LIS_LINE_INVE_CODI`) REFERENCES `sgi_line_inve` (`lin_codi`),
  ADD CONSTRAINT `sgi_line_inve_semi_ibfk_2` FOREIGN KEY (`LIS_SEMI_CODI`) REFERENCES `sgi_semi` (`SEM_CODI`);

--
-- Filtros para la tabla `sgi_plnt_grup`
--
ALTER TABLE `sgi_plnt_grup`
  ADD CONSTRAINT `sgi_plnt_grup_ibfk_1` FOREIGN KEY (`pgr_grup_codi`) REFERENCES `sgi_grup` (`gru_codi`);

--
-- Filtros para la tabla `sgi_prod`
--
ALTER TABLE `sgi_prod`
  ADD CONSTRAINT `sgi_prod_ibfk_1` FOREIGN KEY (`id_tipo`) REFERENCES `sgi_tipo_prod` (`id`);

--
-- Filtros para la tabla `sgi_prod_proy`
--
ALTER TABLE `sgi_prod_proy`
  ADD CONSTRAINT `sgi_prod_proy_ibfk_1` FOREIGN KEY (`id_inve`) REFERENCES `sgi_inve` (`INV_CODI`),
  ADD CONSTRAINT `sgi_prod_proy_ibfk_2` FOREIGN KEY (`id_prod`) REFERENCES `sgi_prod` (`Id`),
  ADD CONSTRAINT `sgi_prod_proy_ibfk_3` FOREIGN KEY (`id_proy`) REFERENCES `sgi_proy` (`PRO_CODI`);

--
-- Filtros para la tabla `sgi_prog_acad_semi`
--
ALTER TABLE `sgi_prog_acad_semi`
  ADD CONSTRAINT `sgi_prog_acad_semi_ibfk_1` FOREIGN KEY (`PAS_PACA_CODI`) REFERENCES `sgi_prog_acad` (`PAC_CODI`),
  ADD CONSTRAINT `sgi_prog_acad_semi_ibfk_2` FOREIGN KEY (`PAS_SEMI_CODI`) REFERENCES `sgi_semi` (`SEM_CODI`);

--
-- Filtros para la tabla `sgi_proy_inve`
--
ALTER TABLE `sgi_proy_inve`
  ADD CONSTRAINT `sgi_proy_inve_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `sgi_grup` (`gru_codi`),
  ADD CONSTRAINT `sgi_proy_inve_ibfk_2` FOREIGN KEY (`id_inve`) REFERENCES `sgi_inve` (`INV_CODI`),
  ADD CONSTRAINT `sgi_proy_inve_ibfk_3` FOREIGN KEY (`id_linea`) REFERENCES `sgi_line_inve` (`lin_codi`),
  ADD CONSTRAINT `sgi_proy_inve_ibfk_4` FOREIGN KEY (`id_producto`) REFERENCES `sgi_prod` (`Id`),
  ADD CONSTRAINT `sgi_proy_inve_ibfk_5` FOREIGN KEY (`id_proy`) REFERENCES `sgi_proy` (`PRO_CODI`),
  ADD CONSTRAINT `sgi_proy_inve_ibfk_6` FOREIGN KEY (`id_tipo_prod`) REFERENCES `sgi_tipo_prod` (`id`);

--
-- Filtros para la tabla `sgi_semi`
--
ALTER TABLE `sgi_semi`
  ADD CONSTRAINT `sgi_semi_ibfk_1` FOREIGN KEY (`SEM_CENT_CODI`) REFERENCES `sgi_cent` (`CEN_CODI`),
  ADD CONSTRAINT `sgi_semi_ibfk_2` FOREIGN KEY (`SEM_INV_CODI`) REFERENCES `sgi_inve` (`INV_CODI`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
