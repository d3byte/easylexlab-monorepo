import randomize from 'randomatic';

import db from './../models';
import secret from './../secret';
import helper from './helperFunctions';

const groupController = {};

// New group
groupController.post = (req, res) => {
    const {
        name,
        grade
    } = req.body;

    const user = req.user;

    if (user.permissions == "admin" || user.permissions == "teacher") {
        const code = randomize('A0', 5);
        db.Group.findOne({code}, (err, group) => {
            if (err)
                throw err;
            if (group) {
                let index = helper.randomInteger(1, 5);
                var newCode = '';
                for (let i = 0; i < code.length; i++) {
                    if (i != index) {
                        newCode += code[i];
                    } else {
                        newCode += randomize('A0', 1);
                    }
                }
                const group = new db.Group({
                    name,
                    code: newCode,
                    grade,
                    _teacher: user.id
                });
                group.save().then((newGroup) => {
                    return res.status(200).json({
                        success: true,
                        data: newGroup
                    });
                }).catch((err) => {
                    return res.status(500).json({
                        message: err
                    });
                });
            } else {
                const group = new db.Group({
                    name,
                    code,
                    grade,
                    _teacher: user.id
                });

                group.save().then((newGroup) => {
                    return res.status(200).json({
                        success: true,
                        data: newGroup
                    });
                }).catch((err) => {
                    return res.status(500).json({
                        message: err
                    });
                });
            }
        });
    } else {
        return res.status(501).json({
            message: 'Access denied'
        });
    }

};

// Remove group
groupController.delete = (req, res) => {
    const groupId = req.body.groupId;
    const user = req.user;

    if (user.permissions == "admin" || user.permissions == "teacher") {
        db.Group.findByIdAndRemove(groupId).then(() => {
            return res.status(200).json({
                success: true
            });
        }).catch((err) => {
            return res.status(500).json({
                message: err
            });
        });
    } else {
        return res.status(501).json({
            message: 'Access denied'
        });
    }

};

// Add student
groupController.addStudent = (req, res) => {
    const {
        groupCode,
        studentId
    } = req.body;

    db.Group.findOneAndUpdate(
        {code: groupCode},
        {$push: {'_students': studentId}},
    ).then((existingGroup) => {
        return res.status(200).json({
            success: true
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    });

};

// Get groups of teacher
groupController.getGroups = (req, res) => {
    const userId = req.user.id;

    db.Group.find({_teacher: userId}).populate({
        path: '_teacher',
        select: 'name username createdAt _id',
        match: {'isDeleted': false}
    }).populate({
        path: '_tests',
        select: 'name tasks timeToDo _group attempts results'
    }).populate({
        path: '_students',
        select: 'name username',
        match: {'isDeleted': false}
    }).then((groups) => {
        return res.status(200).json({
            success: true,
            data: groups
        });
    }).catch((err) => {
        res.status(500).json({
            message: err
        })
    });

};

// Watch one exact group
groupController.getGroup = (req, res) => {
    const groupId = req.body.groupId;
    db.Group.findById(groupId).populate({
        path: '_students',
        select: '',
        match: {'isDeleted': false}
    }).populate({
        path: '_tests',
        select: 'name tasks timeToDo _group attempts results'
    }).then(group => {
        return res.status(200).json({
            success: true,
            group
        });
    }).catch((err) => {
        res.status(500).json({
            message: err
        });
    });

};

// Stick test to group
groupController.addTest = (req, res) => {
    const {
        groupId,
        stackId
    } = req.body;

    const user = req.user;

    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        db.Stack.findById(stackId).then(stack => {
            db.Group.findById(groupId).then(group => {
                group._tests.push(stack._id);
                group.save().then(suc => {
                    res.status(200).json({success: true});
                }).catch(error => {
                    throw error;
                });
            }).catch(err => {
                throw err;
            });
        }).catch(err => {
            throw err;
        });
    } else res.status(501).json({'error': 'No permissions for this action'});

};

// Registration link
groupController.regCode = (req, res) => {
    const groupId = req.body.groupId;
    const user = req.user;

    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        db.Group.findById(groupId).then(group => {
            return res.json({
                success: true,
                groupCode: group.code
            });
        });
    }
};

groupController.newMsg = (req, res) => {
    const user = req.user;
    const {
        groupId,
        msgText
    } = req.body;


    if (user.permissions == 'teacher' || user.permissions == 'admin') {
        db.User.findById(user.id).then(userAccount => {
            const message = {
                author: userAccount.firstName + " " + userAccount.lastName,
                pic: userAccount.picUrl,
                date: Date.now,
                text: msgText
            };

            const notification = new db.Notification({
                type: 'newMsg',
                _author: userAccount.firstName + " " + userAccount.lastName,
                pic: userAccount.picUrl,
                text: `${userAccount.firstName + " " + userAccount.lastName} прислал(а) вам сообщение.`,
                seen: false
            });

            notification.save().then(notif => {
              db.Group.findByIdAndUpdate(groupId, {
                  $push: { messages: message }
              }).then(group => {
                  db.User.update({ _groups: { $in: [groupId] }},
                      { $push: { notifications: notif } }).then(success => {
                      res.json({ success: true });
                  }).catch(error => {
                      throw error
                  });
              }).catch(err => {
                  throw err
              });
            })
        }).catch(err => {
            throw err
        });
    }
};

export default groupController;
