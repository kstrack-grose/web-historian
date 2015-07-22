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
  var reqPath = urlParts.pathname;
  console.log("Hendeling ", req.method, " for ", req.url);
  if (routes[reqPath]) {
    routes[reqPath](req, res);
  } else {
    http_helper.isInPublic(reqPath, function(is) {
      if (is) {
        http_helper.serveAssets(res, './public' + reqPath);
      } else {
        archive.isUrlArchived(reqPath, function(is) {
          if (is) {
            http_helper.serveAssets(res, './../archives/sites' + reqPath);
          } else {
            archive.isUrlInList(reqPath, function(is) {
              if (is) {
                http_helper.serveAssets(res, './public/loading.html');
              } else {
                http_helper.return404(req, res);
              }
            });
          }
        });
      }
    });
  }
};

