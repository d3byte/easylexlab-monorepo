const helper = {};

// Generate an array of random indexes
// taking length of passed array accounted

helper.randomInteger = (min, max) => {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

export default helper;
