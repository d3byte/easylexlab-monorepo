import express from 'express';

// Controller imports
import basicConstroller from './controllers/basicController';
import userController from './controllers/userController';
import groupController from './controllers/groupController';

const routes = express();

// Basic routes
routes.get('/', basicConstroller.get);

// User routes
routes.post('/signup', userController.post);

// Group routes
routes.post('/addgroup', groupController.post);
routes.delete('/deletegroup', groupController.delete);
routes.patch('/updategroup', groupController.update);

export default routes;
