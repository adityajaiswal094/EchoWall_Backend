
-- 0. to list all databases
\l

-- 1. create dabatabase
CREATE DATABASE userposts;

-- 2. connect to database
\c userposts

-- 3. create table for storing posts
CREATE TABLE posts(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    content TEXT NOT NULL);

-- to select all from questions table
SELECT * FROM posts;

-- 5. to create a comments table to store all comments
CREATE TABLE comments(
    id SERIAL PRIMARY KEY NOT NULL,
    pid INTEGER REFERENCES posts(id),
    comment TEXT NOT NULL);

-- to select all from comments table
SELECT * FROM comments;