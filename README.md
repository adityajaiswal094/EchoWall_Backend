# EchoWall

## Kennect Assignment Backend

## About this application

This application serves as the backend server for the Kennect Assignment Frontend which mimics the feature of a social media application where you can post text posts and comment on posts as well.

## Pre-requisites

1. Download, install and setup postgres v13.11 and pgAdmin 4 in your local system.
2. Make sure to note down the passwords you enter during the setup.
3. After setting up postgres, open command prompt and enter the following command `psql -U postgres -d postgres`.
4. Now to create a new database and two tables for posts and comments enter the queries and commands in the `database.sql` file in database folder as is.

## Getting Started

1. Fork this github repository and clone it into your local system.
2. Open the project in your IDE (eg: VS Code).
3. Create a `.env` file to store all your database config details
   - **DB_USER=postgres** (default)
   - **DB_HOST=localhost** (default)
   - **DB_PORT=5432** (default)
   - **DB_DATABASE=userposts**
   - **DB_PASSWORD=(whatever password you provided while setting up the database in pgAdmin)**
4. Run `npm install` to install all the necessary packages.
5. Run `npm run dev` to run the application.

Note: You can test the APIs using postman.
