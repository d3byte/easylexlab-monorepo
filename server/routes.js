import express from 'express';
import expressJWT from 'express-jwt';

import secret from './secret';

// Controller imports
import basicConstroller from './controllers/basicController';
import userController from './controllers/userController';
import groupController from './controllers/groupController';

const routes = express();

// Basic routes
routes.get('/', basicConstroller.get);

// User routes
routes.post('/signup', expressJWT({secret}), userController.post);
routes.post('/login', userController.login);

// Group routes
routes.post('/addgroup', expressJWT({secret}), groupController.post);
routes.delete('/deletegroup', expressJWT({secret}), groupController.delete);
routes.patch('/addstudent', expressJWT({secret}), groupController.addStudent);
routes.post('/getgroups', expressJWT({secret}), groupController.getGroups);
routes.post('/group', expressJWT({secret}), groupController.getGroup);

export default routes;
