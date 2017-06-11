import db from './../models';

const userController = {};

userController.post = (req, res) => {
  const {
    username,
    password,
    group,
    permissions
  } = req.body;

  // Validation

  const user = new db.User({
    username,
    password,
    _group: group,
    permissions
  });

  user.save().then((newUser) => {
    res.status(200).json({
      success: true,
      data: newUser
    });
  }).catch((err) => {
    res.status(500).json({
      message: err
    });
  });
  
};

export default userController;
