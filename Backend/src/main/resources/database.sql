CREATE
    DATABASE salary_manage;
USE salary_manage;


DROP TABLE IF EXISTS user;
CREATE TABLE user
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE ,
    name     VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS admin;
CREATE TABLE admin
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS salary;
CREATE TABLE salary
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    name           TEXT NOT NULL,
    username       VARCHAR(20) NOT NULL,
    date           TEXT NOT NULL,
    modal_table_type TEXT NOT NULL,
    salary_summary  TEXT,
    salary_detail   TEXT
);
CREATE INDEX usernameIndex USING HASH ON salary(username);