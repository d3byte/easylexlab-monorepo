import db from './../models';
import secret from './../secret';

const groupController = {};

// New group
groupController.post = (req, res) => {
  const {
    name,
    grade
  } = req.body;

  const userId = req.user.id;

  db.Group.findOne({name}, (err, group) => {
    if(err)
      res.json({message: err});
    else if(group)
      res.json({ succes: false });
    else {
      db.User.findById(userId, (err, user) => {
        if (err)
          res.json({message: err});
        if (user) {
          let userPerm = user.permissions;

          let checked = (userPerm == "admin" || userPerm == "teacher" ? true : false);

          if(checked) {
            const group = new db.Group({
              name,
              grade,
              _teacher: userId
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
        } else
          console.log("No users found with that ID");
      });
    }
  });

};

// Remove group
groupController.delete = (req, res) => {
  const groupId = req.body.groupId;
  const userId = req.user.id;

  db.User.findById(userId, (err, user) => {
    if (err)
      res.json({message: err});
    if (user) {
      let userPerm = user.permissions;

      let checked = (userPerm == "admin" || userPerm == "teacher" ? true : false);

      if(checked) {
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
    } else
      console.log("No users found with that ID");
  });

};

// Add student
groupController.addStudent = (req, res) => {
  const {
    groupId,
    studentId
  } = req.body;

  const userId = req.user.id;

  db.User.findById(userId, (err, user) => {
    if (err)
      res.json({message: err});
    if (user) {
      let userPerm = user.permissions;

      let checked = (userPerm == "admin" || userPerm == "teacher" ? true : false);

      if(checked) {
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
    } else
      console.log("No users found with that ID");
  });

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
  const groupId = req.params.id;

  db.Group.findById(groupId).populate({
    path: '_students',
    select: 'username createdAt',
    match: {'isDeleted': false}
  }).then((group) => {
    return res.status(200).json({
      success: true,
      data: group
    })
  }).catch((err) => {
    res.status(500).json({
      message: err
    })
  });

};

export default groupController;
