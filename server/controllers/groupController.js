import db from './../models';
import secret from './../secret';

const groupController = {};

// New group
groupController.post = (req, res) => {
  const {
    name,
    grade
  } = req.body;

  const user = req.user;

  if(user.permissions == "admin" || user.permissions == "teacher") {
    const group = new db.Group({
      name,
      grade,
      _teacher: user._id
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
    return res.status(501).json({
      message: 'Access denied'
    });
  }

};

// Remove group
groupController.delete = (req, res) => {
  const groupId = req.body.groupId;
  const user = req.user;

  if(user.permissions == "admin" || user.permissions == "teacher") {
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
    groupId,
    studentId
  } = req.body;

  const user = req.user;

  if(user.permissions == "admin" || user.permissions == "teacher") {
    db.Group.findByIdAndUpdate(
      groupId,
      { $push: {'_students': studentId }},
    ).then((existingGroup) => {
      return res.status(200).json({
        success: true,
        existingGroup
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

// Get groups of teacher
groupController.getGroups = (req, res) => {
  const userId = req.user.id;

  db.Group.find({_teacher: userId}).populate({
    path: '_teacher',
    select: 'username createdAt -_id',
    match: {'isDeleted': false}
  }).populate({
    path: '_students',
    select: 'username',
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
    select: 'username createdAt',
    match: {'isDeleted': false}
  }).then((group) => {
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

  if(user.permissions == 'teacher' || user.permissions == 'admin') {
    db.Stack.findById(stackId).then(stack => {
      db.Group.findById(groupId).then(group => {
        group._tests.push(stack._id);
        group.save().then(suc => {
          res.status(200).json({ success: true });
        }).catch(error => {
          throw error;
        });
      }).catch(err => {
        throw err;
      });
    }).catch(err => {
      throw err;
    });
  } else res.status(501).json({'error':'No permissions for this action'});

};

// Registration link
groupController.regLink = (req, res) => {
  const groupId = req.body.groupId;
  const user = req.user;

  if(user.permissions == 'teacher' || user.permissions == 'admin') {
    var url = 'reg&id=' + groupId;
    // Encoding
    url = encodeURI(url);
    var b = new Buffer(url);
    var encUri = b.toString('base64');
    console.log('Encoded: ', encUri);
    // Decoding
    var bd = new Buffer(encUri, 'base64');
    var decoded = bd.toString();
    console.log('Decoded: ', decoded);
  }
};

export default groupController;
