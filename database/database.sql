-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS todo_db;

-- Use the newly created database
USE todo_db;

-- Create the todos table if it does not exist
CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
