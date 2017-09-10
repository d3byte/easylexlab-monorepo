import randomize from 'randomatic';
import moment from 'moment';

import db from './../models';
import secret from './../secret';
import helper from './helperFunctions';
moment.locale('ru');

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
                authorId: userAccount._id,
                id: randomize('*', 15),
                author: userAccount.firstName + " " + userAccount.lastName,
                pic: userAccount.picUrl,
                text: msgText,
                date: moment().format('LL')
            };

            const notification = {
                type: 'newMsg',
                authorId: userAccount._id,
                author: userAccount.firstName + " " + userAccount.lastName,
                pic: userAccount.picUrl,
                text: `${userAccount.firstName + " " + userAccount.lastName} отправил сообщение.`,
                seen: false,
                date: moment().format('LL'),
                id: randomize('0A', 10)
            };


            db.Group.findByIdAndUpdate(groupId, {
                $push: { messages: message }
            }).then(group => {
                db.User.update({ _groups: { $in: [groupId] }},
                    { $push: { notifications: notification }}, {
                      multi: true
                    }).then(success => {
                    res.json({ success: true, message });
                }).catch(error => {
                    throw error
                });
            }).catch(err => {
                throw err
            });
        }).catch(err => {
            throw err
        });
    }
};

groupController.changeName = (req, res) => {
  const {
    groupId,
    name
  } = req.body;
  const user = req.user;

  if(user.permissions == 'teacher' || user.permissions == 'admin') {
    db.Group.findByIdAndUpdate(groupId, { $set: { name } }).then(success => {
      return res.json({ success: true });
    });
  }
};

groupController.deleteMsg = (req, res) => {
  const {
    groupId,
    msgId
  } = req.body;
  const user = req.user;

  if(user.permissions == 'teacher' || user.permissions == 'admin') {
    db.Group.findById(groupId).then(group => {
      group.messages = group.messages.filter(item => item.id != msgId);
      group.save().then(s => res.json({ success: true }));
    });
  }
};

groupController.deleteGroup = (req, res) => {
  const groupId = req.body.groupId;
  const user = req.user;

  if(user.permissions == 'teacher' || user.permissions == 'admin') {
    db.Group.findByIdAndRemove(groupId).then(success => res.json({ success }));
  }
};

groupController.removeStudent = (req, res) => {
  const {
    groupId,
    userId
  } = req.body;
  const user = req.user;

  if(user.permissions == 'teacher' || user.permissions == 'admin') {
    db.Group.findByIdAndUpdate(groupId, {
      $pull: { '_students': userId }
    }).then(success => { res.json({ success: true }) });
  }
};

export default groupController;
