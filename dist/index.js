'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 7990;

_app2.default.listen(port, function () {
  console.log('Running on port ' + port);
});
//# sourceMappingURL=index.js.map