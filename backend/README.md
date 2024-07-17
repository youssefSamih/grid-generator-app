# Backend

This project was developed with Nodejs, typescript, graphql and apollo, mongodb.

Important note: create .env file to add env variables like in this example

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/grid_generator
JWT_SECRET=test
```

## Install Dependencies

Run `npm install`

## Development server

Run `npm run dev` for a dev server. the endpoint with websocket will be exposed here `http://localhost:4000/` `ws://localhost:4000/`. The application will automatically reload if you change any under src directory.

## Build

Run `npm start` to build and run the project on production. The build will be stored in the `dist/` directory.
