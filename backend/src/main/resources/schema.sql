CREATE table IF NOT EXISTS users (

    id VARCHAR(25) PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL

);

CREATE table IF NOT EXISTS tasks (

    id VARCHAR(25) PRIMARY KEY,
    userId VARCHAR(25),
    creationTime INTEGER,
    dueTime INTEGER,
    description VARCHAR(500),
    status INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)

);