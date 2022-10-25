 DROP DATABASE app_tools;
 CREATE DATABASE app_tools;
 USE app_tools;
 CREATE TABLE users(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     id_number VARCHAR(10) NOT NULL UNIQUE,
	 name VARCHAR(100) NOT NULL,
	 email VARCHAR (100) NOT NULL UNIQUE,
	 password VARCHAR (100) NOT NULL,
     status BOOLEAN DEFAULT FALSE,
     creation_date DATE,
	 token VARCHAR (200),
     reset_date_password DATE,
	 createdAt DATETIME,
	 updatedAt DATETIME,
	 PRIMARY KEY (id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 CREATE TABLE roles(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     rol_name VARCHAR(100) NOT NULL UNIQUE,
     description VARCHAR(150),
     createdAt DATETIME,
	 updatedAt DATETIME,
     PRIMARY KEY (id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
 INSERT INTO roles (rol_name, description, createdAt, updatedAt) VALUES ('SUPER USUARIO','Acceso a todos los módulos de la aplicación', CURDATE(), CURDATE());
 INSERT INTO roles (rol_name, description, createdAt, updatedAt) VALUES ('ADMINISTRADOR','Acceso a todos los módulos de la aplicación, pero no puede asignar roles ni permisos', CURDATE(), CURDATE());
 INSERT INTO roles (rol_name, description, createdAt, updatedAt) VALUES ('MODIFICADOR','Modifica estado de Empleadores, Trabajadores y Beneficiarios', CURDATE(), CURDATE());
 INSERT INTO roles (rol_name, description, createdAt, updatedAt) VALUES ('CONSULTOR AVANZADO','Consulta y exporta información', CURDATE(), CURDATE());
 INSERT INTO roles (rol_name, description, createdAt, updatedAt) VALUES ('CONSULTOR BÁSICO','Puede consultar información, pero no puede exportar', CURDATE(), CURDATE());
 
  CREATE TABLE users_roles(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     fk_id_user BIGINT UNSIGNED,
     fk_id_rol BIGINT UNSIGNED,
	 createdAt DATETIME,
	 updatedAt DATETIME,	 
     CONSTRAINT fk_users_roles_users FOREIGN KEY(fk_id_user) REFERENCES users (id),
     CONSTRAINT fk_users_roles_roles FOREIGN KEY(fk_id_rol) REFERENCES roles (id),
	 CONSTRAINT unk_users_roles UNIQUE (fk_id_user, fk_id_rol),
     PRIMARY KEY (id)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;

 
 
 CREATE TABLE cards_type_files(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     code CHAR(3),
     description VARCHAR(150),
     operation_type CHAR(1),
     PRIMARY KEY (id)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;

 INSERT INTO cards_type_files (code, description, operation_type) VALUES('CLI','SOLICITUD DE GENERACIÓN DE TARJETAS','1');
 INSERT INTO cards_type_files (code, description, operation_type) VALUES('ACT','ACTUALIZACIÓN DE DATOS','1');
 INSERT INTO cards_type_files (code, description, operation_type) VALUES('REA','NOTIFICACIÓN DE GENERACIÓN DE TARJETAS','2');
 INSERT INTO cards_type_files (code, description, operation_type) VALUES('LCL','NOTIFICACIÓN DE RECHAZOS EN LA SOLICITUD DE GENERACIÓN DE TARJETAS (ERROR LOG)','2');
 INSERT INTO cards_type_files (code, description, operation_type) VALUES('CAR','SOLICITUD DE CARGUE MONETARIO','1');
 INSERT INTO cards_type_files (code, description, operation_type) VALUES('LCR','NOTIFICACIÓN DE RECHAZOS DE CARGA DE VALORES (ERROR LOG)','2');
 INSERT INTO cards_type_files (code, description, operation_type) VALUES('BLO','SOLICITUD DE BLOQUEOS O DESBLOQUEOS DE TARJETAS','1');
 INSERT INTO cards_type_files (code, description, operation_type) VALUES('LBL','NOTIFICACIÓN DE RECHAZOS DE SOLICITUD DE BLOQUEOS O DESBLOQUEOS DE TARJETAS (ERROR LOG) ','2');
 CREATE TABLE cards_file_headers(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     fk_id_type_file BIGINT UNSIGNED,
     company_code CHAR(2) NOT NULL,
     process_date CHAR(8) NOT NULL,
     record_counter VARCHAR(6) NOT NULL,
     iin_extended VARCHAR(12) NOT NULL,
     card_type CHAR(1) DEFAULT '2',
     total_value VARCHAR(15),
     semicolon VARCHAR(11),
     filename VARCHAR(40),
     PRIMARY KEY (id),
     CONSTRAINT fk_cards_file_headers_type_files FOREIGN KEY(fk_id_type_file) REFERENCES cards_type_files (id)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;
 CREATE TABLE cards_news(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     new CHAR(1) NOT NULL,
     description VARCHAR(120),
     PRIMARY KEY (id)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;
 INSERT INTO cards_news(new, description) VALUES ('I','CREACIÓN DEL TARJETA HABIENTE EN LA BASE DE DATOS');
 INSERT INTO cards_news(new, description) VALUES ('P','ACTUALIZACIÓN DE LOS DATOS PERSONALES DEL TARJETA HABIENTE');
 INSERT INTO cards_news(new, description) VALUES ('T','ACTUALIZACIÓN DE LOS DATOS QUE IDENTIFICAN EL TIPO DE AFILIACIÓN DE TARJETA HABIENTE');
 INSERT INTO cards_news(new, description) VALUES ('U','SOLICITUD NUEVO REGISTRO DE TARJETA, DEBIDO LA NECESIDAD DE REALIZAR CAMBIOS EN LOS DATOS PERSONALES Y/O DE AFILIACIÓN');
 INSERT INTO cards_news(new, description) VALUES ('D','BORRADO DE TARJETA HABIENTE');
 INSERT INTO cards_news(new, description) VALUES ('R','REEXPEDICIÓN DE TARJETA PARA EL TARJETA HABIENTE');
 CREATE TABLE cards_generation_request(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     fk_id_file BIGINT UNSIGNED,
     fk_id_news BIGINT UNSIGNED,
     unique_customer_code VARCHAR(25),
     id_type CHAR(1),
     id_number CHAR(20),
     family_group_identifier CHAR(2),
     names VARCHAR(50),
     surnames VARCHAR(50),
     full_name VARCHAR(50),
     phone_number VARCHAR(15),
     email VARCHAR(100),
     address VARCHAR(100),
     city_code CHAR(5),
     customer_type CHAR(2),
     affiliate_id_type CHAR(1),
     affiliate_identification_number VARCHAR(20),
     PRIMARY KEY (id),
     CONSTRAINT fk_card_request_files FOREIGN KEY(fk_id_file) REFERENCES cards_file_headers (id),
     CONSTRAINT fk_card_request_news FOREIGN KEY(fk_id_news) REFERENCES cards_news (id)
 )ENGINE=InnoDB DEFAULT charset=utf8;

 CREATE TABLE cards_rejection_concept(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     code CHAR(3),
     concept VARCHAR(100),
     PRIMARY KEY (id)
 )ENGINE=InnoDB DEFAULT charset=utf8; 
 INSERT INTO cards_rejection_concept(code, concept) VALUES ('000','ERROR AL DESCOMPRIMIR Y/O VERIFICAR ESTRUCTURA DEL ARCHIVO A VALIDAR');
 INSERT INTO cards_rejection_concept(code, concept) VALUES ('001','ERROR EN EL REGISTRO DE CONTROL');
 INSERT INTO cards_rejection_concept(code, concept) VALUES ('002','CAMPO FORMATO INCORRECTO');
 INSERT INTO cards_rejection_concept(code, concept) VALUES ('003','REGISTRO REPETIDO');
 INSERT INTO cards_rejection_concept(code, concept) VALUES ('004','ERROR EN LA BASE DE DATOS');

 CREATE TABLE cards_rejection_concept_details(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
     fk_id_rejection_concept BIGINT UNSIGNED,
     code CHAR(3),
     concept VARCHAR(150),
     scope CHAR(1), 
     PRIMARY KEY (id),
     CONSTRAINT fk_card_rejection_concept_details FOREIGN KEY(fk_id_rejection_concept) REFERENCES cards_rejection_concept (id)
 )ENGINE=InnoDB DEFAULT charset=utf8;


INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('1','000','ERROR AL DESCOMPRIMIR EL ARCHIVO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('1','000','ERROR AL CARGAR EL ARCHIVO. ','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('1','000','NO SE HA CARGADO NINGUN REGISTRO. ','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('1','000','DEBE REVISAR LA LONGITUD DE LOS CAMPOS DEL ARCHIVO Y/O ESTRUCTURA DEL MISMO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('2','001','ARCHIVO NO CONTIENE UN REGISTRO DE CONTROL VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('2','001','FORMATO DE FECHA NO VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('2','001','NUMERO DE REGISTROS NO COINCIDE CON EL REGISTRO DE CONTROL.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','NOVEDAD NO VALIDA.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','TIPO DE IDENTIFICACION NO VALIDA.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','NUMERO DE IDENTIFICACION NO VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','NOMBRE, APELLIDO Y/O NOMBRE PARA REALCE NO PUEDEN SER NULOS.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','NOMBRE PARA REALCE NO ES VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','EL FORMATO DEL NOMBRE NO ES VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','EL FORMATO DEL APELLIDO NO ES VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','CODIGO DE CIUDAD NO VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','TIPO DE CLIENTE NO VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','TIPO DE IDENTIFICACION DEL AFILIADO NO VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','NUMERO DE IDENTIFICACION DEL AFILIADO NO VALIDO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','INFORMACION DEL AFILIADO NO ES VALIDA.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','LINEA DE CREDITO NO VALIDO.','1');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','EL MONTO NO ES VALIDO.','1');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','TIPO DE IDENTIFICACION DEL AFILIADO NO VALIDO.','1');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','NUMERO DE IDENTIFICACION DEL AFILIADO NO VALIDO.','1');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('3','002','BOLSILLO REPETIDO.','1');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('4','003','REGISTRO REPETIDO','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('5','004','INFORMACION DEL AFILIADO NO ES VALIDA.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('5','004','CODIGO UNICO DEL CLIENTE YA SE ENCUENTRA EN LA BASE DE DATOS. (Creación del cliente).','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('5','004','CODIGO UNICO DEL CLIENTE NO SE ENCUENTRA EN LA BASE DE DATOS. (Actualización de los datos del cliente).','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('5','004','CLIENTE YA SE ENCUENTRA EN LA BASE DE DATOS.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('5','004','NO EXISTE EL CLIENTE EN LA BASE DE DATOS.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('5','004','CLIENTE YA FUE ELIMINADO.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('5','004','NO EXISTE UNA TARJETA ASOCIADA A ESTE CLIENTE. (Reexpediciones).','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('5','004','EL CLIENTE TIENE VARIOS TIPOS DE AFILIACION.','0');
INSERT INTO cards_rejection_concept_details(fk_id_rejection_concept, code, concept, scope) VALUES('5','004','EL CLIENTE TIENE BENEFICIARIOS DEPENDIENTES.','0');
CREATE TABLE menu(
     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, 
     label VARCHAR(100) NOT NULL,
     icon VARCHAR(100),
     route VARCHAR(150) NOT NULL,
     father INT(11) NOT NULL,
     order INT(11) NOT NULL,
     created_at DATETIME NULL DEFAULT NULL,
     updated_at DATETIME NULL DEFAULT NULL,
     PRIMARY KEY (id)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;