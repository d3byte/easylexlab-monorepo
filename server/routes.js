import express from 'express';
import expressJWT from 'express-jwt';

import secret from './secret';

// Controller imports
import basicConstroller from './controllers/basicController';
import userController from './controllers/userController';
import groupController from './controllers/groupController';
import stackController from './controllers/stackController';

const routes = express();

// Basic routes
routes.get('/', basicConstroller.get);

// User routes
routes.post('/signup', expressJWT({secret}), userController.post);
routes.post('/login', userController.login);

// Group routes
routes.post('/reglink', expressJWT({secret}), groupController.regLink);
routes.post('/addgroup', expressJWT({secret}), groupController.post);
routes.delete('/deletegroup', expressJWT({secret}), groupController.delete);
routes.patch('/addstudent', expressJWT({secret}), groupController.addStudent);
routes.post('/getgroups', expressJWT({secret}), groupController.getGroups);
routes.post('/getgroup', expressJWT({secret}), groupController.getGroup);
routes.post('/addtest', expressJWT({secret}), groupController.addTest);

// Stack routes
routes.post('/newstack', expressJWT({secret}), stackController.post);
routes.post('/gettests', expressJWT({secret}), stackController.getTests);

export default routes;
