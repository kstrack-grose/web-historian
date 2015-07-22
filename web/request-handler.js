var path = require('path');
var archive = require('../helpers/archive-helpers');
var http_helper = require('./http-helpers.js');
var urlParser = require('url');
var controllers = require('./controllers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //respond to different 

  var routes = {
    '/': controllers.renderIndex
  };

  var urlParts = urlParser.parse(req.url);
  if (routes[urlParts.pathname]) {
    routes[urlParts.pathname](req, res);
  } else {
    http_helper.return404(req, res);
  }

  //res.end(archive.paths.list);
};
