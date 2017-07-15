const helper = {};

// Generate an array of random indexes
// taking length of passed array accounted
helper.randomIndexes = max => {
  var array = [];
  if(max != 1) {
    for(let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * max + 1);
      array.push(index);
    }
  } else array.push(0);
  return array;
};

// Count length of a passed array
// It is specified for randomizing of pairs to pick for a test
helper.count = array => {
  var length = 0;
  for(var item of array) {
    length += item.content.length;
  }
  length = length / array.length;
  return length;
};

// Validator function
helper.checkContents = tasks => {
  var allGood = true;
  for(var task of tasks) {
    if(!allGood)
      break;
    for(var pair of task.content) {
      if(pair.key.trim().length == 0 || pair.value.trim().length == 0) {
        allGood = false;
        break;
      }
    }
  }
  return allGood;
};

helper.crypt = (str, k) => {
  var enc = "";
  for (var i = 0; i < str.length; i++) {
    // create block
    var a = str.charCodeAt(i);
    // bitwise XOR
    var b = a ^ k;
    enc += String.fromCharCode(b);
  }
  return enc;
};

export default helper;
