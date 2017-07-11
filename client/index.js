'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 12345;

_app2.default.listen(PORT, function () {
    console.log('App listening on port ' + PORT + '!');
});