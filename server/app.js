import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import path from 'path';
import cors from 'cors';
import qt from 'quickthumb';

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

app.get('/', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/signup/student', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/signup/teacher', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/profile/msg', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/group/:id', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/group/:id/newtask', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/settings', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/profile/newgroup', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/stats', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/forgotpassword', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/recover/:token', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/info/rules', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});
app.get('/task/:id', (req, res) => {
    res.sendFile(path.join(folder + "index.html"));
});

app.use(qt.static(__dirname + '/'));
app.use('/', express.static(folder));
app.use('/signup', express.static(folder));
app.use('/signup/student', express.static(folder));
app.use('/signup/teacher', express.static(folder));
app.use('/profile', express.static(folder));
app.use('/group', express.static(folder));
app.use('/group/:id', express.static(folder));
app.use('/task', express.static(folder));
app.use('/task/:id', express.static(folder));
app.use('/recover', express.static(folder));
app.use('/recover/:token', express.static(folder));
app.use('/info', express.static(folder));
app.use('/info/rules', express.static(folder));

// Middleware
// var whitelist = ['http://cf82612.tmweb.ru', 'http://easylexlab.ru'];
// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }
// app.use(cors(corsOptions));
app.use(cors());
app.use('/api', routes);
// app.use(expressJWT({ secret: secret }).unless({ path: ['api/login', '/'] }));

export default app;
