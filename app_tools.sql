 DROP DATABASE app_tools;
 CREATE DATABASE app_tools;
 USE app_tools;
 CREATE TABLE users(
     id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
     id_number VARCHAR(10) NOT NULL UNIQUE,
	 name VARCHAR(100) NOT NULL,
	 email VARCHAR (100) NOT NULL UNIQUE,
	 password VARCHAR (100) NOT NULL,
     status BOOLEAN,
     creation_date DATE,
	 token VARCHAR (200),
     reset_date_password DATE,
	 createdAt DATETIME,
	 updatedAt DATETIME,
	 PRIMARY KEY (id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 CREATE TABLE roles(
     id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
     rol_name VARCHAR(100) NOT NULL UNIQUE,
     description VARCHAR(150),
     PRIMARY KEY (id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
 INSERT INTO roles (rol_name, description) VALUES ('SUPER USUARIO','Acceso a todos los módulos de la aplicación');
 INSERT INTO roles (rol_name, description) VALUES ('ADMINISTRADOR','Acceso a todos los módulos de la aplicación, pero no puede asignar roles ni permisos');
 INSERT INTO roles (rol_name, description) VALUES ('MODIFICADOR','Modifica estado de Empleadores, Trabajadores y Beneficiarios');
 INSERT INTO roles (rol_name, description) VALUES ('CONSULTOR AVANZADO','Consulta y exporta información');
 INSERT INTO roles (rol_name, description) VALUES ('CONSULTOR BÁSICO','Puede consultar información, pero no puede exportar');
 
  CREATE TABLE users_roles(
     id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
     fk_id_user INT(10) UNSIGNED,
     fk_id_rol INT(10) UNSIGNED,     
     PRIMARY KEY (id) ,
     CONSTRAINT fk_users_roles_users FOREIGN KEY(fk_id_user) REFERENCES users (id),
     CONSTRAINT fk_users_roles_roles FOREIGN KEY(fk_id_rol) REFERENCES roles (id)
 );