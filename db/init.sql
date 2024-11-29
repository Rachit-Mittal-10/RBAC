CREATE DATABASE IF NOT EXISTS rbac;
USE rbac;

CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created TIMESTAMP DEFAULT  CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS role_users_map(
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    PRIMARY KEY(user_id, roe_id)
);

INSERT INTO role (name) VALUES("ADMIN");
INSERT INTO role (name) VALUES("MODERATOR");
INSERT INTO role (name) VALUES("USER");