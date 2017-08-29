import formidable from 'formidable';
import util from 'util';
import fs from 'fs-extra';

const fileController = {};

fileController.uploadFiles = (req, res) => {
  var form = new formidable.IncomingForm();
  console.log(form);
  form.on('end', (fields, files) => {
    console.log(fields);
    /* Temporary location of our uploaded file */
    // var temp_path = this.openedFiles[0].path;
    // /* The file name of the uploaded file */
    // var file_name = this.openedFiles[0].name;
    // /* Location where we want to copy the uploaded file */
    // var new_location = 'uploads/';
    //
    // fs.copy(temp_path, new_location + file_name, function(err) {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log("success!")
    //   }
    // });
  });

  // req.body.files.map(file => {
  //   console.log(file);
  //   if(file.type == 'ava') {
  //     var temp_path_ava = file.file.path;
  //     var ava_name = file.file.name;
  //     fs.copy(temp_path_ava, new_location + ava_name, err => {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log("success!")
  //       }
  //     });
  //   } else {
  //     var temp_path_back = file.file.path;
  //     var back_name = file.file.name;
  //     fs.copy(temp_path_back, new_location + back_name, err => {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log("success!")
  //       }
  //     });
  //   }
  // });
  return res.json({ success: true });
};

export default fileController;
