var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, {encoding:'utf8'}, function(err, data) {
    if (err) throw err;
    var arr = data.split('\n');
    cb(arr);
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(urls){
    if(urls.indexOf(url) !== -1){
      callback(true);
    } else {
      callback(false);
    }
  })
};

exports.addUrlToList = function(url, callback){
  exports.isUrlInList(url,function(is){
    if(!is){
      fs.appendFile(exports.paths.list, url + '\n', function(err){
        if(err) throw err;
        //exports.downloadUrl(url); (Cody was cheating)
        callback();
      });
    }else {
      callback();
    }
  });
};

exports.isUrlArchived = function(url, callback){
  fs.exists(exports.paths.archivedSites + '/' + url, callback);
};

exports.downloadUrl = function(url){
  var options = {};
  options.url = url;

  if(options.url !== ""){
    httpRequest.get(options, exports.paths.archivedSites + '/' + url, function(err){
      if(err) throw err;
    });
  }

  
};

exports.downloadUrls = function(array){
  array.forEach(exports.downloadUrl);
};
