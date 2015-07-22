var http_helper = require('./http-helpers.js');
var archive = require('../helpers/archive-helpers.js');

var _ = require('underscore');

var fs = require('fs');

var qs = require('querystring');

exports.renderIndex = function(req, res) {
  if(req.method === "GET"){
    http_helper.serveAssets(res, './public/index.html');
  } else if(req.method === "POST") {
    var data = "";
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      var obj = qs.parse(data);

      archive.isUrlArchived(obj.url, function(is){
        if(is){
          var redirectHeaders = _.extend({'Location': '/' + obj.url}, http_helper.headers);
          res.writeHead(302, redirectHeaders);
          res.end();
        } else {
          archive.addUrlToList(obj.url, function(){
            var redirectHeaders = _.extend({'Location': '/loading.html'}, http_helper.headers);
            res.writeHead(302, redirectHeaders);
            res.end();
          });
        }
      })
    });
  } else {
    res.writeHead(405, http_helper.headers);
    res.end();
  }
};