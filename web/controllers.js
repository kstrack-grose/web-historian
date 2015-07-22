var http_helper = require('./http-helpers.js');
var archive = require('../helpers/archive-helpers.js');

exports.renderIndex = function(req, res) {
  if(req.method === "GET"){
    http_helper.serveAssets(res, './public/index.html');
  } else if(req.method === "POST") {
    var data = "";
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      var obj = JSON.parse(data);
      archive.addUrlToList(obj.url, function(){
        res.writeHead(302, http_helper.headers);
        res.end();
      });
    });
  } else {
    res.writeHead(405, http_helper.headers);
    res.end();
  }
};