import fs from 'fs';
import express from 'express';
import expressJWT from 'express-jwt';
import multer from 'multer';
import path from 'path';

import db from './models';

import secret from './secret';

// Controller imports
import basicConstroller from './controllers/basicController';
import userController from './controllers/userController';
import groupController from './controllers/groupController';
import stackController from './controllers/stackController';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

const routes = express();

// Basic routes
routes.get('/', basicConstroller.get);

// User routes
routes.post('/signup', userController.post);
routes.post('/login', userController.login);
routes.post('/groups', expressJWT({ secret }), userController.getGroups);
routes.post('/verifypassword', expressJWT({ secret }), userController.verifyPassword);
routes.post('/recover', userController.recoverPassword);
routes.post('/checktoken', userController.checkToken);
routes.post('/feedback', expressJWT({ secret }), userController.sendFeedback);
routes.patch('/newinfo', expressJWT({ secret }), userController.updateInfo);
routes.post('/upload-image', upload.single('image'), function (req, res) {
    if(req.file.filename) {
        db.User.findById(req.body.userName).then(user => {
            var filePath = `uploads/${user.picUrl}`;
            fs.exists(filePath, exists => {
                if(exists) {
                    fs.unlink(filePath, err => {
                        if (err) {
                            console.log("failed to delete local image: " + err);
                            return
                        }
                        user.picUrl = req.file.filename;
                        user.save().then(() => {
                            return res.json({
                                success: true
                            });
                        })
                    })
                } else {
                    user.picUrl = req.file.filename;
                    user.save().then(() => {
                        return res.json({
                            success: true
                        });
                    })
                }
            });
        }).catch(err => {
            return res.status(500).json({
                message: err
            });
        });
    }
});
routes.patch('/newpassword', expressJWT({ secret }), userController.changePassword);
routes.patch('/addgroup', expressJWT({ secret }), userController.addGroup);
routes.post('/user', expressJWT({ secret }), userController.getUser);
routes.post('/user-mobile', expressJWT({ secret }), userController.getUserMobile);
routes.patch('/words', expressJWT({ secret }), userController.learnWords);
routes.post('/leavegroup', expressJWT({ secret }), userController.leaveGroup);
routes.post('/change-email', expressJWT({ secret }), userController.changeEmail);
routes.post('/getavatar', expressJWT({ secret }), userController.getAvatar);

// Group routes
routes.post('/regcode', expressJWT({ secret }), groupController.regCode);
routes.post('/addgroup', expressJWT({ secret }), groupController.post);
routes.delete('/deletegroup', expressJWT({ secret }), groupController.delete);
routes.patch('/addstudent', groupController.addStudent);
routes.post('/getgroups', expressJWT({ secret }), groupController.getGroups);
routes.post('/getgroup', expressJWT({ secret }), groupController.getGroup);
routes.post('/addtest', expressJWT({ secret }), groupController.addTest);
routes.patch('/changename', expressJWT({ secret }), groupController.changeName);
routes.post('/deletemsg', expressJWT({ secret }), groupController.deleteMsg);
routes.post('/deletegroup', expressJWT({ secret }), groupController.deleteGroup);
routes.post('/removestudent', expressJWT({ secret }), groupController.removeStudent);


// Stack routes
routes.post('/newstack', expressJWT({ secret }), stackController.post);
routes.post('/gettests', expressJWT({ secret }), stackController.getTests);
routes.post('/gettest', expressJWT({ secret }), stackController.getTest);
routes.patch('/addresult', expressJWT({ secret }), stackController.addResult);
routes.patch('/updateresult', expressJWT({ secret }), stackController.updateResult);
routes.post('/removetask', expressJWT({ secret }), stackController.removeStack);


// Notification and message routes
routes.post('/newmsg', expressJWT({ secret }), groupController.newMsg);
routes.post('/getnotifs', expressJWT({ secret }), userController.getNotifications);
routes.post('/removenotif', expressJWT({ secret }), userController.removeNotification);

export default routes;
