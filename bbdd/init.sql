-- Crear base de datos si no existe (equivalente a esquema en PostgreSQL)
CREATE DATABASE IF NOT EXISTS tu_base_de_datos;
USE tu_base_de_datos;

CREATE TABLE IF NOT EXISTS `superhero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `element` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `place` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `power` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `power` varchar(255) NOT NULL,
  `superheroId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_power_superhero` (`superheroId`),
  CONSTRAINT `fk_power_superhero` FOREIGN KEY (`superheroId`) REFERENCES `superhero` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Insertando superhéroes
INSERT INTO `superhero` (`name`, `element`, `color`, `age`, `place`, `img`) VALUES
('Superhero 1', 'Fuego', 'Rojo', 30, 'Ciudad 1', 'prueba.png'),
('Superhero 2', 'Agua', 'Azul', 25, 'Ciudad 2', 'prueba.png');

-- Asumiendo que los IDs de los superhéroes insertados son 1 y 2, insertamos sus poderes
INSERT INTO `power` (`power`, `superheroId`) VALUES
('Volar', 1),
('Super fuerza', 1),
('Invisibilidad', 2);


