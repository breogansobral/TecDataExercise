-- Crear base de datos si no existe (equivalente a esquema en PostgreSQL)
CREATE DATABASE IF NOT EXISTS superheros;
USE superheros;

-- Crear tabla superheros
CREATE TABLE IF NOT EXISTS superheros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    element VARCHAR(255),
    color VARCHAR(255),
    age INT,
    place VARCHAR(255),
    img VARCHAR(255)
) ENGINE=InnoDB;

-- Crear tabla powers
CREATE TABLE IF NOT EXISTS powers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    superhero_id INT,
    power VARCHAR(255),
    FOREIGN KEY (superhero_id) REFERENCES superheros(id)
) ENGINE=InnoDB;

-- Insertar datos de prueba en superheros
INSERT INTO superheros (name, element, color, age, place, img) VALUES
('Hero1', 'Fire', 'Red', 30, 'City1', 'img1.jpg'),
('Hero2', 'Water', 'Blue', 25, 'City2', 'img2.jpg');

-- Insertar datos de prueba en powers
INSERT INTO powers (superhero_id, power) VALUES
(1, 'Flying'),
(1, 'Super Strength'),
(2, 'Invisibility');

