import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import path from 'path';

import secret from './secret';

import routes from './routes';

mongoose.connect('mongodb://localhost:27017/eng_proj', () => {
  console.log('Connected to mongodb');
});

const app = express();

// Public folder
const folder = __dirname + "/app/";

app.get('/', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});

app.use('/', express.static(folder));

// Middleware
app.use(bodyParser.json()); 
app.use('/api', routes);
// app.use(expressJWT({ secret: secret }).unless({ path: ['api/login', '/'] }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

export default app;
