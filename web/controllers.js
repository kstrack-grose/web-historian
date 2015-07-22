var http_helper = require('./http-helpers.js');

exports.renderIndex = function(req, res) {
  http_helper.serveAssets(res, './web/public/index.html');
};