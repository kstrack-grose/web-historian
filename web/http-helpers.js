var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.isInPublic = function(url, cb){
  fs.exists(path.join(__dirname,'./public') + url, cb);
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

    // send headers with status code 200
    // send file

  res.writeHead(200, this.headers);
  fs.readFile(path.join(__dirname, asset),function(err, html) {
    res.write(html);
    res.end();
    if(callback){
      callback();
    }
  });
};

exports.return404 = function(req, res) {
  res.writeHead(404, this.headers);
  res.end();
};


// As you progress, keep thinking about what helper functions you can put here!
