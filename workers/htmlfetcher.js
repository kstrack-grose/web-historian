#! /usr/local/bin/node

var path = require('path');
var archive = require(path.join(__dirname, '../helpers/archive-helpers.js'));
var fs = require('fs');

archive.readListOfUrls(function(array) {
  fs.writeFile(path.join(__dirname, '../archives/sites.txt'), '', function(){console.log('Done!');});
  archive.downloadUrls(array);
});
