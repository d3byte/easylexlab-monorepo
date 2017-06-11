  const basicConstroller = {};

  basicConstroller.get = (req, res) => {
    res.json({
      message: 'Welcome to our api!'
    });
  };

  export default basicConstroller;
