import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import path from 'path';
import cors from 'cors';

import secret from './secret';

import routes from './routes';

mongoose.connect('mongodb://localhost:27017/eng_proj', {
  useMongoClient: true
}, () => {
  console.log('Connected to mongodb');
});

const app = express();

// Public folder
const folder = __dirname + "/app/";

// Middleware
app.use(bodyParser.json());
app.use('/api', routes);
app.use(cors());
// app.use(expressJWT({ secret: secret }).unless({ path: ['api/login', '/'] }));

export default app;
