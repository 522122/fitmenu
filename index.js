var c = require('cheerio');
var request = require("request");
var iconv = require('iconv-lite');
var slackify = require('slackify-html');


var config = require('./config.js');
//test3

request({
    uri: config.restaurantUri,
}, function(e, r, b) {

    if ( e === null ) {
        var $ = c.load(b, { decodeEntities: false });

        var menu = $('#collapse-2 > .card-body');

        var text = config.targetUsers +
                     slackify(menu.html())
                     .replace(/\(\)/g, '')
                     .replace(/\//g,'')
                     .replace(/\n\s*\n/g, '\n');

        var postData = { text:text };

        console.log(postData);

        request.post({
            url: config.webhoockUri,
            json: postData
        }, function(error, response, body){
            console.log(body);
        });
    }
});
