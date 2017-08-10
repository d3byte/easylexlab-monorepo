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
routes.post('/signup', userController.post);
routes.post('/login', userController.login);
routes.post('/groups', expressJWT({ secret }), userController.getGroups);
routes.post('/verifypassword', expressJWT({ secret }), userController.verifyPassword);
routes.patch('/newinfo', expressJWT({ secret }), userController.updateInfo);
routes.patch('/newpassword', expressJWT({ secret }), userController.changePassword);
routes.patch('/addgroup', expressJWT({ secret }), userController.addGroup);
routes.patch('/userresult', expressJWT({ secret }), userController.addResult);
routes.post('/user', expressJWT({ secret }), userController.getUser);

// Group routes
routes.post('/regcode', expressJWT({ secret }), groupController.regCode);
routes.post('/addgroup', expressJWT({ secret }), groupController.post);
routes.delete('/deletegroup', expressJWT({ secret }), groupController.delete);
routes.patch('/addstudent', groupController.addStudent);
routes.post('/getgroups', expressJWT({ secret }), groupController.getGroups);
routes.post('/getgroup', expressJWT({ secret }), groupController.getGroup);
routes.post('/addtest', expressJWT({ secret }), groupController.addTest);

// Stack routes
routes.post('/newstack', expressJWT({ secret }), stackController.post);
routes.post('/gettests', expressJWT({ secret }), stackController.getTests);
routes.post('/gettest', expressJWT({ secret }), stackController.getTest);
routes.patch('/addresult', expressJWT({ secret }), stackController.addResult);

// Notification and message routes
routes.post('/newmsg', expressJWT({ secret }), groupController.newMsg);
routes.post('/getnotifs', expressJWT({ secret }), userController.getNotifications);
routes.post('/readnotifs', expressJWT({ secret }), userController.readNotifs);

export default routes;
