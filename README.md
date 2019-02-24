# Cryptoapp

This is a simple web app where you can send message to other people without sending the message itself to the server. 

## Requirements
This app basically has three components:
- frontend written in angular in folder `src`
- express server which offers an API for the frontend to communicate with the database
    - in folder `server`
- MongoDB database for storing the decrypted messages.

## Configuration 
This app requires some configuration. 
### Server
- provide a connection string for your mongodb
    - This connection string should be saved into `server/config.json`. See `sample-config.json` as reference
    - You can also set connection string with the enviroment variable connectionString 
- you can specify a port which is used for the server by set the enviroment variable port, otherwise the default port 8080 is used.

### Client
You also have to provide a url where the backend is reachable. You can specify one for production and one for testing in `src/enviroments` folder.

## Starting
### Frontend
To start the frontend for testing please use `npm run start`. You can build it using `npm run build` and deploy to a location of your choice. 

### Backend
To start the backend, please use: `node server/server.js`. 