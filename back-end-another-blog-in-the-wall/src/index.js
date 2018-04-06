import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {init} from './router';

const app = express();
const port = process.env.PORT || 3333;

// Configure the DB

const mongo_options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
};

const configDB = {
  name: process.env.DB || 'blog-posts',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    'database'
  ],
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + configDB.servers + '/' + configDB.name, mongo_options)
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB: ' + error));

// Configure the app

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '1Gb', parameterLimit: 10000000 }));
app.use(bodyParser.json({limit: '1000mb', parameterLimit: 10000000}));

// Add the routes

init(app);

app.listen(port, () => {
  console.log(`Another blog in the wall running on port ${port}`);
});

export default app;