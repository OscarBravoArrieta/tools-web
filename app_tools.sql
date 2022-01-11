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
     PRIMARY KEY (id),	 
     CONSTRAINT fk_users_roles_users FOREIGN KEY(fk_id_user) REFERENCES users (id),
     CONSTRAINT fk_users_roles_roles FOREIGN KEY(fk_id_rol) REFERENCES roles (id),
	 CONSTRAINT unk_users_roles UNIQUE (fk_id_user, fk_id_rol)
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;